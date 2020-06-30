import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import cookie from "js-cookie";
import Layout from "../components/Layout";
import Section from "../components/home/Section";
import fb from "../firebase.config";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export default function Profile() {
  const [userData, setUserData] = useState();
  const [selectProfileData, setSelectProfileData] = useState(true);
  const [selectPaymentMethods, setSelectPaymentMethods] = useState(false);
  const [selectChangePassword, setSelectChangePassword] = useState(false);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [actualPassword, setActualPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [rooms, setRooms] = useState([]);

  const router = useRouter();

  const validateSession = () => {
    if (cookie.get("user")) {
      setUserData(JSON.parse(cookie.get("user")));
    } else {
      router.push("/");
    }
  };

  useEffect(() => {
    validateSession();
    console.log("Estuviste aquí");
  }, []);

  useEffect(() => {
    const getRooms = async () => {
      const firebase = await fb();
      const db = firebase.firestore();
      db.collection("rooms")
        .where("userId", "==", userData.uid)
        .get()
        .then((snapshot) => {
          let data = [];
          snapshot.forEach((doc) => {
            data.push(
              Object.assign({
                id: doc.id,
                title: doc.data().title,
                location: doc.data().location,
                price: doc.data().price,
                imageUrl: doc.data().featured_image,
              })
            );
          });
          setRooms(data);
        })
        .catch((error) => {
          MySwal.fire("Ups", `Ha ocurrido un error: ${error}`, "error");
        });
    };

    if (userData) {
      getRooms();
    }
  }, userData);

  const editProfile = async () => {
    try {
      const fireb = await fb();
      const db = fireb.firestore();

      const uid = userData.uid;
      const card = `**** **** **** ${cardNumber.substr(12)}`;
      // const cards = [...userData.cards, card];

      db.collection("users")
        .doc(uid)
        .update({ name: newName, email: newEmail })
        .then(() => {
          MySwal.fire(
            "Confirmado",
            "Se ha actualizado tu perfil",
            "success"
          ).then(() => {
            router.reload();
          });
          const data = {
            displayName: newName,
            uid: userData.uid,
            token: userData.token,
            email: newEmail,
            cards: userData.cards,
          };
          cookie.set("user", JSON.stringify(data), { expires: 2 });
        });
    } catch (error) {
      MySwal.fire("Ups", `Ha ocurrido un error: ${error}`, "error");
    }
  };

  const addCard = async () => {
    try {
      const fireb = await fb();
      const db = fireb.firestore();

      const uid = userData.uid;
      const card = `**** **** **** ${cardNumber.substr(12)}`;
      // const cards = [...userData.cards, card];
      db.collection("users")
        .doc(uid)
        .update({ cards: fireb.firestore.FieldValue.arrayUnion(card) })
        .then(() => {
          MySwal.fire(
            "Confirmado",
            "Se ha agregado tu tarjeta",
            "success"
          ).then(() => {
            router.reload();
          });
          const data = {
            displayName: userData.displayName,
            uid: userData.uid,
            token: userData.token,
            email: userData.email,
            cards: [...userData.cards, card],
          };
          cookie.set("user", JSON.stringify(data), { expires: 2 });
        });
    } catch (error) {
      MySwal.fire("Ups", `Ha ocurrido un error: ${error}`, "error");
    }
  };

  return userData ? (
    <Layout title={`Roomet - ${userData.displayName}`}>
      <Section title="Tus publicaciones" rooms={rooms} />
      <div className="container bg-white border bd-grey-light my-4 shadow-md rounded flex">
        <div className="left bd-grey-light">
          <div
            onClick={() => {
              if (!selectProfileData) {
                setSelectPaymentMethods(false);
                setSelectProfileData(true);
                setSelectChangePassword(false);
              }
            }}
            className={`text-base title semi-bold p-3 pointer hover no-selectable ${
              selectProfileData ? "selected" : null
            }`}
          >
            Editar perfil
          </div>
          {/* <div
            onClick={() => {
              if (!selectChangePassword) {
                setSelectPaymentMethods(false);
                setSelectProfileData(false);
                setSelectChangePassword(true);
              }
            }}
            className={`text-base title semi-bold p-3 pointer hover no-selectable ${
              selectChangePassword ? "selected" : null
            }`}
          >
            Cambiar contraseña
          </div> */}
          <div
            onClick={() => {
              if (!selectPaymentMethods) {
                setSelectPaymentMethods(true);
                setSelectProfileData(false);
                setSelectChangePassword(false);
              }
            }}
            className={`text-base title semi-bold p-3 pointer hover no-selectable ${
              selectPaymentMethods ? "selected" : null
            }`}
          >
            Métodos de pago
          </div>
        </div>
        <div className="right p-3">
          {selectProfileData ? (
            <div>
              <div className="input_label mb-2">Nombre</div>
              <input
                cols={5}
                rows={10}
                type="text"
                placeholder={userData.displayName}
                style={{
                  borderWidth: 1,
                  borderStyle: "solid",
                  borderColor: "rgb(218, 225, 231)",
                  width: "100%",
                  margin: 0,
                  marginBottom: 20,
                  paddingLeft: 10,
                  paddingRight: 10,
                }}
                className="input-search bg-white relative py-2 bd-width rounded bd-grey-light "
                onChange={(e) => setNewName(e.target.value)}
              />
              <div className="input_label mb-2">Email</div>
              <input
                cols={5}
                rows={10}
                type="email"
                placeholder={userData.email}
                style={{
                  borderWidth: 1,
                  borderStyle: "solid",
                  borderColor: "rgb(218, 225, 231)",
                  width: "100%",
                  margin: 0,
                  marginBottom: 20,
                  paddingLeft: 10,
                  paddingRight: 10,
                }}
                className="input-search bg-white relative py-2 bd-width rounded bd-grey-light "
                onChange={(e) => setNewEmail(e.target.value)}
              />
              <button
                onClick={() => editProfile()}
                className="btn p-3 border pointer"
              >
                Guardar
              </button>
            </div>
          ) : selectChangePassword ? (
            <div>
              <div className="input_label mb-2">Contraseña actual</div>
              <input
                type="password"
                placeholder="********"
                style={{
                  borderWidth: 1,
                  borderStyle: "solid",
                  borderColor: "rgb(218, 225, 231)",
                  width: "100%",
                  margin: 0,
                  marginBottom: 20,
                  paddingLeft: 10,
                  paddingRight: 10,
                }}
                className="input-search bg-white relative py-2 bd-width rounded bd-grey-light "
                onChange={(e) => setActualPassword(e.target.value)}
              />
              <div className="input_label mb-2">Nueva contraseña</div>
              <input
                type="password"
                placeholder="********"
                style={{
                  borderWidth: 1,
                  borderStyle: "solid",
                  borderColor: "rgb(218, 225, 231)",
                  width: "100%",
                  margin: 0,
                  marginBottom: 20,
                  paddingLeft: 10,
                  paddingRight: 10,
                }}
                className="input-search bg-white relative py-2 bd-width rounded bd-grey-light "
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <div className="input_label mb-2">Confirmar Nueva contraseña</div>
              <input
                type="password"
                placeholder="********"
                style={{
                  borderWidth: 1,
                  borderStyle: "solid",
                  borderColor: "rgb(218, 225, 231)",
                  width: "100%",
                  margin: 0,
                  marginBottom: 20,
                  paddingLeft: 10,
                  paddingRight: 10,
                }}
                className="input-search bg-white relative py-2 bd-width rounded bd-grey-light "
                onChange={(e) => setConfirmNewPassword(e.target.value)}
              />
              <button className="btn p-3 border pointer">Guardar</button>
            </div>
          ) : selectPaymentMethods ? (
            <div>
              <div className="input_label mb-2">Tarjetas registradas</div>
              {userData.cards
                .filter((card) => card !== "")
                .map((card, index) => {
                  return <div className="input_label mb-2">{card}</div>;
                })}
              <div style={{ marginTop: 20 }} className="input_label mb-2">
                Agregar nueva tarjeta de crédito o débito
              </div>
              <div className="input_label mb-2">número de tarjeta</div>
              <input
                type="text"
                placeholder="**** **** **** ****"
                style={{
                  borderWidth: 1,
                  borderStyle: "solid",
                  borderColor: "rgb(218, 225, 231)",
                  width: "100%",
                  margin: 0,
                  marginBottom: 20,
                  paddingLeft: 10,
                  paddingRight: 10,
                }}
                className="input-search bg-white relative py-2 bd-width rounded bd-grey-light "
                onChange={(e) => setCardNumber(e.target.value)}
              />
              <div className="input_label mb-2">titular de la tarjeta </div>
              <input
                type="text"
                placeholder={userData.displayName}
                style={{
                  borderWidth: 1,
                  borderStyle: "solid",
                  borderColor: "rgb(218, 225, 231)",
                  width: "100%",
                  margin: 0,
                  marginBottom: 20,
                  paddingLeft: 10,
                  paddingRight: 10,
                }}
                className="input-search bg-white relative py-2 bd-width rounded bd-grey-light "
                onChange={(e) => setNewPassword(e.target.value)}
              />

              <div className="flex">
                <div style={{ marginRight: 5 }}>
                  <div className="input_label mb-2">fecha de vencimiento</div>
                  <div className="flex align-items">
                    <input
                      type="text"
                      placeholder="MM"
                      style={{
                        borderWidth: 1,
                        borderStyle: "solid",
                        borderColor: "rgb(218, 225, 231)",
                        width: "50px",
                        margin: 0,
                        marginBottom: 20,
                        paddingLeft: 10,
                        paddingRight: 10,
                      }}
                      className="input-search bg-white relative py-2 bd-width rounded bd-grey-light "
                      onChange={(e) => setConfirmNewPassword(e.target.value)}
                    />
                    <div
                      style={{ fontSize: 20, marginLeft: 5, marginRight: 5 }}
                    >
                      /
                    </div>
                    <input
                      type="text"
                      placeholder="AA"
                      style={{
                        borderWidth: 1,
                        borderStyle: "solid",
                        borderColor: "rgb(218, 225, 231)",
                        width: "50px",
                        margin: 0,
                        marginBottom: 20,
                        paddingLeft: 10,
                        paddingRight: 10,
                      }}
                      className="input-search bg-white relative py-2 bd-width rounded bd-grey-light "
                      onChange={(e) => setConfirmNewPassword(e.target.value)}
                    />
                  </div>
                </div>
                <div style={{ marginLeft: 25 }}>
                  <div className="input_label mb-2">CVV</div>
                  <input
                    type="text"
                    placeholder="111"
                    style={{
                      borderWidth: 1,
                      borderStyle: "solid",
                      borderColor: "rgb(218, 225, 231)",
                      width: "50px",
                      margin: 0,
                      marginBottom: 20,
                      paddingLeft: 10,
                      paddingRight: 10,
                    }}
                    className="input-search bg-white relative py-2 bd-width rounded bd-grey-light "
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                  />
                </div>
              </div>
              <button
                onClick={() => addCard()}
                className="btn p-3 border pointer"
              >
                Guardar
              </button>
            </div>
          ) : null}
        </div>
      </div>

      <style jsx>
        {`
          .container {
            height: 67vh;
            width: 80%;
            max-width: 1200px;
            min-width: 768px;
            margin-right: auto;
            margin-left: auto;
          }
          .left {
            width: 30%;
            border-right-width: 1px;
            border-right-style: solid;
          }
          .selected {
            background: #f7f7f7;
            border-left-width: 3px;
            border-left-style: solid;
            border-left-color: black;
          }
          .hover {
            &:hover {
              background: #f7f7f7;
              border-left-width: 3px;
              border-left-style: solid;
              border-left-color: grey;
            }
          }
          .right {
            width: 70%;
          }
        `}
      </style>
    </Layout>
  ) : (
    <div></div>
  );
}
