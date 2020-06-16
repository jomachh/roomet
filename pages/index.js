import Layout from "../components/Layout";
import Hero from "../components/home/Hero";
import Section from "../components/home/Section";
import fb from "../firebase.config";

export default function HomePage({ rooms }) {
  return (
    <Layout title="Roomet">
      <Hero />
      <Section title="Explorar" rooms={rooms} showMore />
    </Layout>
  );
}

export async function getStaticProps() {
  const firebase = await fb();
  const db = firebase.firestore();

  let rooms = await new Promise((resolve, reject) => {
    db.collection("rooms")
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
