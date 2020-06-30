import Layout from "../../../components/Layout";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import firebase from "firebase";
import cookie from "js-cookie";
import Search from "../../../public/assets/search.svg";
import fb from "../../../firebase.config";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export default function Room({ details, services }) {
  const [userData, setUserData] = useState();
  const [searchText, setSearchText] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [rooms, setRooms] = useState("");
  const [beds, setBeds] = useState("");
  const [baths, setBaths] = useState("");
  const [guests, setGuests] = useState("");
  const [servs, setServs] = useState([]);
  const router = useRouter();

  const { room } = router.query;

  const validateSession = () => {
    if (cookie.get("user")) {
      setUserData(JSON.parse(cookie.get("user")));
    } else {
      router.push("/");
    }
  };

  useEffect(() => {
    validateSession();
  }, []);

  useEffect(() => {
    if (details) {
      setTitle(details.title);
      setDescription(details.description);
      setImage(details.imageUrl);
      setLocation(details.location);
      setPrice(details.price);
      setRooms(details.meta.bedrooms);
      setBaths(details.meta.baths);
      setBeds(details.meta.beds);
      setGuests(details.meta.guests);
      setServs(details.services);
    }
  }, details);

  const updateDoc = async () => {
    const firebase = await fb();
    const db = firebase.firestore();
    const uid = userData.uid;

    const data = {
      title,
      description,
      price,
      featured_image: image,
      location,
      location_name: location.toLowerCase(),
      services: servs,
      userId: uid,
      meta: {
        baths: parseInt(baths),
        bedrooms: parseInt(rooms),
        beds: parseInt(beds),
        guests: parseInt(guests),
      },
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    };

    db.collection("rooms")
      .doc(room)
      .update(data)
      .then(() => {
        MySwal.fire(
          "Confirmado",
          "Se ha actualizado tu propiedad",
          "success"
        ).then(() => {
          router.push(`/${room}`, undefined, {
            shallow: true,
          });
        });
      })
      .catch((error) => {
        MySwal.fire("Ups", `Ha ocurrido un error: ${error}`, "error");
      });
  };

  return (
    <Layout title="Roomet">
      <div className="bg-turquey p-4">
        <div className="container bg-white relative px-2 py-2 bd-width rounded bd-grey-light shadow-md-light">
          <Search fill="rgb(96, 111, 123)" width={20} height={20} />
          <input
            id="where"
            type="text"
            placeholder="Managua, Nicaragua"
            className="input-search"
            onChange={(e) => {
              setSearchText(e.target.value.toLowerCase());
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                router.push(`/search/${searchText}`, undefined, {
                  shallow: true,
                });
              }
            }}
          ></input>
        </div>
      </div>
      {details ? (
        <div>
          <div className="container">
            <h1 className="text-3xl font-light text-grey-darkest mb-3 bold">
              Editar propiedad
            </h1>
            <form>
              <div className="mb-4">
                <div className="input_label">titulo</div>
                <form className="bg-white relative py-2 bd-width rounded bd-grey-light shadow-md-light">
                  <input
                    type="text"
                    placeholder={details.title}
                    value={title}
                    className="input-search"
                    onChange={(e) => setTitle(e.target.value)}
                  ></input>
                </form>
              </div>
              <div className="mb-4">
                <div className="input_label">description</div>
                <form>
                  <textarea
                    cols={5}
                    rows={10}
                    type="text"
                    value={description}
                    style={{
                      borderWidth: 1,
                      borderStyle: "solid",
                      borderColor: "rgb(218, 225, 231)",
                      width: "100%",
                      margin: 0,
                      paddingLeft: 10,
                      paddingRight: 10,
                    }}
                    className="input-search bg-white relative py-2 bd-width rounded bd-grey-light shadow-md-light"
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </form>
              </div>
              <div className="mb-4">
                <div className="input_label">Imagen</div>
                <form>
                  <input
                    cols={5}
                    rows={10}
                    type="text"
                    value={image}
                    placeholder={details.imageUrl}
                    style={{
                      borderWidth: 1,
                      borderStyle: "solid",
                      borderColor: "rgb(218, 225, 231)",
                      width: "100%",
                      margin: 0,
                      paddingLeft: 10,
                      paddingRight: 10,
                    }}
                    className="input-search bg-white relative py-2 bd-width rounded bd-grey-light shadow-md-light"
                    onChange={(e) => setImage(e.target.value)}
                  ></input>
                </form>
              </div>
              <div className="mb-4">
                <div className="input_label">Ubicación</div>
                <form>
                  <input
                    cols={5}
                    rows={10}
                    type="text"
                    value={location}
                    placeholder={details.location}
                    style={{
                      borderWidth: 1,
                      borderStyle: "solid",
                      borderColor: "rgb(218, 225, 231)",
                      width: "100%",
                      margin: 0,
                      paddingLeft: 10,
                      paddingRight: 10,
                    }}
                    className="input-search bg-white relative py-2 bd-width rounded bd-grey-light shadow-md-light"
                    onChange={(e) => setLocation(e.target.value)}
                  ></input>
                </form>
              </div>
              <div>
                <div className="input_label">Servicios</div>
                <div className="flex mb-4 space-between full-w">
                  {services
                    ? services.map((service, index) => {
                        return (
                          <form key={index}>
                            <input
                              type="checkbox"
                              value={service}
                              checked={servs.includes(service) ? true : false}
                              onChange={() => {
                                if (servs.includes(service)) {
                                  setServs(
                                    servs.filter((item) => item !== service)
                                  );
                                } else {
                                  setServs((servs) => [...servs, service]);
                                }
                              }}
                            />{" "}
                            <label>{service}</label>
                          </form>
                        );
                      })
                    : null}
                </div>
              </div>

              <div className="mb-4 full-w flex space-between">
                <div>
                  <div className="input_label">precio</div>
                  <div className="flex align-items">
                    <div style={{ marginRight: 10 }}>$</div>
                    <form>
                      <input
                        style={{
                          borderWidth: 1,
                          borderStyle: "solid",
                          borderColor: "rgb(218, 225, 231)",
                          width: "100%",
                          margin: 0,
                          paddingLeft: 10,
                          paddingRight: 10,
                        }}
                        className="input-search bg-white relative py-2 bd-width rounded bd-grey-light shadow-md-light"
                        type="text"
                        value={price}
                        placeholder={details.price}
                        onChange={(e) => setPrice(e.target.value)}
                      ></input>
                    </form>
                  </div>
                </div>
                <div>
                  <div className="input_label">Habitaciones</div>
                  <div className="flex align-items">
                    <form>
                      <input
                        style={{
                          borderWidth: 1,
                          borderStyle: "solid",
                          borderColor: "rgb(218, 225, 231)",
                          width: "100%",
                          margin: 0,
                          paddingLeft: 10,
                          paddingRight: 10,
                        }}
                        className="input-search bg-white relative py-2 bd-width rounded bd-grey-light shadow-md-light"
                        type="text"
                        value={rooms}
                        placeholder={details.meta.bedrooms}
                        onChange={(e) => setRooms(e.target.value)}
                      ></input>
                    </form>
                  </div>
                </div>
                <div>
                  <div className="input_label">Baños</div>
                  <div className="flex align-items">
                    <form>
                      <input
                        style={{
                          borderWidth: 1,
                          borderStyle: "solid",
                          borderColor: "rgb(218, 225, 231)",
                          width: "100%",
                          margin: 0,
                          paddingLeft: 10,
                          paddingRight: 10,
                        }}
                        className="input-search bg-white relative py-2 bd-width rounded bd-grey-light shadow-md-light"
                        type="text"
                        value={baths}
                        placeholder={details.meta.baths}
                        onChange={(e) => setBaths(e.target.value)}
                      ></input>
                    </form>
                  </div>
                </div>
                <div>
                  <div className="input_label">Camas</div>
                  <div className="flex align-items">
                    <form>
                      <input
                        style={{
                          borderWidth: 1,
                          borderStyle: "solid",
                          borderColor: "rgb(218, 225, 231)",
                          width: "100%",
                          margin: 0,
                          paddingLeft: 10,
                          paddingRight: 10,
                        }}
                        className="input-search bg-white relative py-2 bd-width rounded bd-grey-light shadow-md-light"
                        type="text"
                        value={beds}
                        placeholder={details.meta.beds}
                        onChange={(e) => setBeds(e.target.value)}
                      ></input>
                    </form>
                  </div>
                </div>
                <div>
                  <div className="input_label">Huéspedes</div>
                  <div className="flex align-items">
                    <form>
                      <input
                        style={{
                          borderWidth: 1,
                          borderStyle: "solid",
                          borderColor: "rgb(218, 225, 231)",
                          width: "100%",
                          margin: 0,
                          paddingLeft: 10,
                          paddingRight: 10,
                        }}
                        className="input-search bg-white relative py-2 bd-width rounded bd-grey-light shadow-md-light"
                        type="text"
                        value={guests}
                        placeholder={guests}
                        onChange={(e) => setGuests(e.target.value)}
                      ></input>
                    </form>
                  </div>
                </div>
              </div>
            </form>
            <button
              onClick={() => {
                updateDoc();
              }}
              className="semi-bold rounded btn_yellow_black mb-4"
            >
              Actualizar
            </button>
          </div>
        </div>
      ) : null}
      <style jsx>
        {`
          .container {
            width: 80%;
            max-width: 1200px;
            min-width: 768px;
            margin-right: auto;
            margin-left: auto;
            padding-right: 1rem;
            padding-left: 1rem;
          }
          .btn_yellow_black {
            width: 100%;
            cursor: pointer;
            padding: 0.5rem 1rem 0.5rem 1rem;
            font-size: 100%;
            background: #f2d024;
            border-width: 1px;
            color: #684f1d;
            border-color: #f2d024;
            border-style: solid;
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

  let services = await new Promise((resolve, reject) => {
    db.collection("services")
      .get()
      .then((snapshot) => {
        let data = [];
        snapshot.forEach((doc) => {
          data.push(doc.data().name);
        });
        console.log(data);

        resolve(data);
      })
      .catch((err) => {
        reject(err.toString());
      });
  });

  return { props: { details, services } };
}
