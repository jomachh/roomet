import { useRouter } from "next/router";
import { useState } from "react";
import Layout from "../../components/Layout";
import Section from "../../components/home/Section";
import fb from "../../firebase.config";
import Search from "../../public/assets/search.svg";

export default function City({ rooms }) {
  const [searchText, setSearchText] = useState("");
  const router = useRouter();
  const { city } = router.query;
  return (
    <Layout title={`Roomet - ${city}`}>
      <div className="bg-turquey p-4">
        <div className="container bg-white relative px-2 py-2 bd-width rounded bd-grey-light shadow-md-light">
          <Search fill="rgb(96, 111, 123)" width={20} height={20} />
          <input
            id="where"
            type="text"
            placeholder={city}
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
      <Section title="Resultados de la busqueda" rooms={rooms} />
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
        `}
      </style>
    </Layout>
  );
}

export async function getStaticPaths() {
  return {
    paths: [{ params: { city: "city" } }],
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const firebase = await fb();
  const db = firebase.firestore();

  let rooms = await new Promise((resolve, reject) => {
    db.collection("rooms")
      .orderBy("location_name")
      .startAt(params.city)
      .endAt(params.city + "\uf8ff")
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
        console.log(data);
        resolve(data);
      })
      .catch((err) => {
        reject(err.toString());
      });
  });
  return { props: { rooms } };
}
