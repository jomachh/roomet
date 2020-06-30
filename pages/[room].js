import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import cookie from "js-cookie";
import Layout from "../components/Layout";
import Reserve from "../components/modal/Reserve";
import fb from "../firebase.config";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export default function Room({ details }) {
  const router = useRouter();
  const [userData, setUserData] = useState();
  const [showFullText, setShowFullText] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [card, setCard] = useState("");

  const validateSession = () => {
    if (cookie.get("user")) {
      setUserData(JSON.parse(cookie.get("user")));
    } else {
      console.log("F");
    }
  };
  const { room } = router.query;

  useEffect(() => {
    validateSession();
    console.log("Estuviste aquí");
  }, []);

  const reserve = async () => {
    try {
      const firebase = await fb();
      const db = firebase.firestore();

      db.collection("bookings")
        .where("endDate", ">=", startDate)
        .get()
        .then((snapShot) => {
          if (snapShot.empty) {
            db.collection("bookings")
              .add({
                userId: userData.uid,
                startDate: firebase.firestore.Timestamp.fromDate(startDate),
                endDate: firebase.firestore.Timestamp.fromDate(endDate),
                card: card,
              })
              .then(() => {
                setShowModal(false);
                MySwal.fire(
                  "Confirmado",
                  "Se ha realizado tu reserva",
                  "success"
                );
              });
          } else {
            MySwal.fire(
              "Ups",
              `La propiedad se encuentra ocupada, intenta con otra fecha`,
              "error"
            );
          }
        });
    } catch (error) {
      MySwal.fire("Ups", `Ha ocurrido un error: ${error}`, "error");
    }
  };

  return (
    <Layout title={`Roomet - ${details ? details.title : null}`}>
      {details ? (
        <div className="container">
          <div className="flex">
            <div>
              <div className="pr-3 py-3 overflow-hidden">
                <img className="house-image shadow-md" src={details.imageUrl} />
              </div>
              <div className="flex center-self text-grey-darknest mb-2">
                Habitaciones: {details.meta.bedrooms} · Camas:{" "}
                {details.meta.beds} · Baños: {details.meta.baths} · Huéspedes:{" "}
                {details.meta.guests}
              </div>
            </div>
            <div style={{ maxWidth: "50%" }}>
              <div className="m-2 text-3xl title semi-bold">
                {details.title}
              </div>
              <div className="m-2 text-xs text-grey-dark">
                {details.location} · {details.userName}
              </div>
              <div className="m-2 text-2xl text-grey-dark four-lines">
                {details.description}
              </div>
              {!showFullText ? (
                <div
                  onClick={() => {
                    setShowFullText(!showFullText);
                  }}
                  className="m-2 mb-3 no-selectable pointer"
                >
                  Ver más
                </div>
              ) : (
                <div
                  onClick={() => {
                    setShowFullText(!showFullText);
                  }}
                  className="m-2 mb-3 no-selectable pointer"
                >
                  Ver menos
                </div>
              )}
              <div className="m-2 text-lg title semi-bold">Servicios</div>
              <div className="m-2 grid">
                {details.services.map((service, index) => {
                  if (index <= 5) {
                    return (
                      <span
                        className={`mb-2 text-grey-darknest item-${index + 1}`}
                      >
                        • {service}
                      </span>
                    );
                  }
                })}
              </div>
              <div className="m-2  text-lg title semi-bold">Precio</div>
              <div className={`m-2 mb-4 text-grey-darknest bold`}>
                ${details.price} por noche
              </div>
              {showModal ? (
                <Reserve
                  closeModal={() => setShowModal(!showModal)}
                  startDate={startDate}
                  endDate={endDate}
                  setStartDate={setStartDate}
                  setEndDate={setEndDate}
                  price={details.price}
                  userData={userData}
                  setCard={setCard}
                  reserve={() => reserve()}
                />
              ) : null}
              <div>
                <button
                  onClick={() => {
                    if (userData) {
                      if (userData.displayName == details.userName) {
                        router.push(`/profile/edit/${room}`, undefined, {
                          shallow: true,
                        });
                      } else {
                        setShowModal(!showModal);
                      }
                    } else {
                      MySwal.fire(
                        "Ups",
                        `Debes iniciar sesión para realizar una reserva.`,
                        "error"
                      );
                    }
                  }}
                  className="rounded bg-yellow-dark text-yellow-darker w-full py-3 pointer"
                >
                  {userData
                    ? userData.displayName == details.userName
                      ? "Editar"
                      : "Reservar"
                    : "Reservar"}
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>Cargando</div>
      )}
      <style jsx>
        {`
          .house-image {
            max-height: 360px;
            object-fit: scale-down;
          }
          .container {
            height: 67vh;
            width: 80%;
            max-width: 1200px;
            min-width: 768px;
            margin-right: auto;
            margin-left: auto;
            padding-right: 1rem;
            padding-left: 1rem;
          }
          .four-lines {
            display: -webkit-box;
            -webkit-line-clamp: ${showFullText ? "none" : 4};
            line-clamp: ${showFullText ? "none" : 4};
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
          .grid {
            display: grid;
            grid-template-columns: 50% 50%;
            grid-template-rows: 30px 30px 30px;
            grid-template-areas:
              "item-1" "item-2"
              "item-3" "item-4"
              "item-5" "item-6";
          }
          .item-1 {
            grid-area: item-1;
          }
        `}
      </style>
    </Layout>
  );
}

export async function getStaticPaths() {
  return {
    paths: [{ params: { room: "kjUgl77mrTpb5Mc07sux" } }],
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const firebase = await fb();
  const db = firebase.firestore();

  let details = await new Promise((resolve, reject) => {
    db.collection("rooms")
      .doc(params.room)
      .get()
      .then((doc) => {
        db.collection("users")
          .doc(doc.data().userId)
          .get()
          .then((user) => {
            let data = {
              id: doc.id,
              title: doc.data().title,
              location: doc.data().location,
              price: doc.data().price,
              imageUrl: doc.data().featured_image,
              meta: doc.data().meta,
              services: doc.data().services,
              description: doc.data().description,
              userName: user.data().name,
            };
            console.log(data);

            resolve(data);
          })
          .catch((err) => {
            reject(err.toString());
          });
      })
      .catch((err) => {
        reject(err.toString());
      });
  });

  return { props: { details } };
}
