import { useState } from "react";
import { useRouter } from "next/router";
import firebase from "firebase";
import cookie from "js-cookie";
import Layout from "../../components/Layout";
import Search from "../../public/assets/search.svg";
import fb from "../../firebase.config";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export default function New({ services }) {
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

  const clearTexts = () => {
    setTitle("");
    setDescription("");
    setLocation("");
    setPrice("");
    setImage("");
    setRooms("");
    setBeds("");
    setBaths("");
    setGuests("");
    setServs([]);
  };

  const publish = async () => {
    try {
      const fireb = await fb();
      const db = fireb.firestore();

      const user = cookie.get("user") ? JSON.parse(cookie.get("user")) : null;
      const uid = user ? user.uid : null;
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
        publishedAt: firebase.firestore.FieldValue.serverTimestamp(),
      };

      db.collection("rooms")
        .add(data)
        .then((docRef) => {
          console.log(docRef.id);
          clearTexts();
          MySwal.fire("Confirmado", "Se ha publicado tu propiedad", "success");
        });
    } catch (error) {
      MySwal.fire("Ups", `Ha ocurrido un error: ${error}`, "error");
    }
  };
  return (
    <Layout title="Roomet - Nueva casa">
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
      <div>
        <div className="container">
          <h1 className="text-3xl font-light text-grey-darkest mb-3 bold">
            Publicar nueva propiedad
          </h1>
          <form>
            <div className="mb-4">
              <div className="input_label">titulo</div>
              <form className="bg-white relative py-2 bd-width rounded bd-grey-light shadow-md-light">
                <input
                  type="text"
                  placeholder="Hermosa casa"
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
                  placeholder="https://images.unsplash.com/photo-1432303492674-642e9d0944b"
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
                  placeholder="Managua, Nicaragua"
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
                      placeholder="100"
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
                      placeholder="2"
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
                      placeholder="1"
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
                      placeholder="2"
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
                      placeholder="2"
                      onChange={(e) => setGuests(e.target.value)}
                    ></input>
                  </form>
                </div>
              </div>
            </div>
          </form>
          <button
            onClick={() => {
              publish();
            }}
            className="semi-bold rounded btn_yellow_black mb-4"
          >
            Publicar
          </button>
        </div>
      </div>
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

export async function getStaticProps() {
  const firebase = await fb();
  const db = firebase.firestore();

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

  return { props: { services } };
}
