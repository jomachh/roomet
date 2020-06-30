import Head from "next/head";
import NavBar from "./NavBar";
import Footer from "./Footer";
import Bot from "./bot/chat";
import globalStyles from "../styles/global";

export default function Layout({ children, title }) {
  return (
    <div className="container">
      <Head>
        <title>{title}</title>
      </Head>
      <NavBar />
      {children}
      <Bot />
      <Footer />
      <style jsx global>
        {globalStyles}
      </style>
      <style jsx>
        {`
          .container {
            min-height: 100vh;
            display: flex;
            flex: 1 0 auto;
            flex-direction: column;
          }
        `}
      </style>
    </div>
  );
}
