import Link from "next/link";
import Login from "./modal/Login";
import { useState } from "react";

export default function NavBar() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="bg-white">
      <div className="navBar">
        <Link href="/">
          <a className="semi-bold text-black text-lg no-underline">Roomet</a>
        </Link>
        <div className="auth_buttons">
          <button
            onClick={() => setShowModal(!showModal)}
            className="btn_outline_rounded semi-bold rounded mr-2"
          >
            Iniciar sesión
          </button>
          <button
            onClick={() => console.log(showModal)}
            className="semi-bold rounded btn_yellow_black"
          >
            Registrarse
          </button>
        </div>
      </div>
      {showModal ? <Login closeModal={() => setShowModal(!showModal)} /> : null}
      <style jsx>
        {`
          .navBar {
            width: 80%;
            max-width: 1200px;
            min-width: 768px;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            padding: 20px 40px 20px 40px;
            margin: 0;
            margin-right: auto;
            margin-left: auto;
            padding-right: 1rem;
            padding-left: 1rem;
          }

          .auth_buttons {
            display: flex;
            flex-direction: row;
          }
          .btn_outline_rounded {
            cursor: pointer;
            padding: 0.5rem 1rem 0.5rem 1rem;
            font-size: 100%;
            background: transparent;
            border-width: 1px;
            color: #38a89d;
            border-color: #38a89d;
            border-style: solid;
          }
          .btn_yellow_black {
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
    </div>
  );
}
