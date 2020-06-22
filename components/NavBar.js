import Link from "next/link";
import Login from "./modal/Login";
import Signin from "./modal/Signin";
import cookie from "js-cookie";
import { useState } from "react";
import { useRouter } from "next/router";
import fb from "../firebase.config";
import Exit from "../public/assets/exit_to_app.svg";
import Add from "../public/assets/add.svg";

export default function NavBar({ userData }) {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignin, setShowSignin] = useState(false);
  const [showError, setShowError] = useState(false);
  const [accepTerms, setAccepTerms] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();

  const validateData = (type) => {
    if (type == "login") {
      if (email !== "" && email.includes("@") && password !== "") {
        return true;
      } else return false;
    } else if (type == "signin") {
      if (
        email !== "" &&
        email.includes("@") &&
        password !== "" &&
        confirmPassword !== "" &&
        password == confirmPassword &&
        confirmEmail !== "" &&
        email == confirmEmail &&
        name !== ""
      ) {
        return true;
      } else return false;
    }
  };

  const loginWithEmail = async () => {
    try {
      const firebase = await fb();
      const auth = firebase.auth();
      const db = firebase.firestore();

      if (validateData("login")) {
        auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(() => {
          return auth
            .signInWithEmailAndPassword(email, password)
            .then((user) => {
              db.collection("users")
                .doc(user.user.uid)
                .get()
                .then((doc) => {
                  const user_ = {
                    displayName: doc.data().name,
                    uid: user.user.uid,
                    token: user.user.getIdToken,
                    email: doc.data().email,
                    cards: doc.data().cards,
                  };
                  console.log(user);
                  cookie.set("user", JSON.stringify(user_), { expires: 2 });
                  router.reload();
                  setShowError(false);
                });
            });
        });
      } else {
        setShowError(true);
      }
    } catch (error) {
      setShowError(true);
    }
  };

  const createUserWithEmail = async () => {
    try {
      const firebase = await fb();
      const auth = firebase.auth();
      const db = firebase.firestore();

      if (validateData("signin")) {
        auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(() => {
          return auth
            .createUserWithEmailAndPassword(email, password)
            .then((user) => {
              user.user
                .updateProfile({
                  displayName: name,
                })
                .then(() => {
                  const userData = {
                    displayName: name,
                    uid: user.user.uid,
                    token: user.user.getIdToken,
                    email: email,
                    cards: [],
                  };
                  cookie.set("user", JSON.stringify(userData), { expires: 2 });
                  db.collection("users")
                    .doc(user.user.uid)
                    .set({
                      name,
                      email,
                      cards: [""],
                    })
                    .then((docRef) => {
                      console.log(docRef);
                      router.reload();
                    });
                })
                .catch((err) => {
                  console.log("FirebaseError", err);
                  setShowError(true);
                });
            });
        });
      } else {
        setShowError(true);
      }
    } catch (error) {
      setShowError(true);
    }
  };

  const closeSession = async () => {
    try {
      const firebase = await fb();
      const auth = firebase.auth();

      auth.signOut().then(() => {
        cookie.remove("user");
        router.reload();
      });
    } catch (error) {
      console.log(error);
    }
  };
  const user = cookie.get("user") ? JSON.parse(cookie.get("user")) : null;

  return (
    <div className="bg-white">
      <div className="navBar">
        <Link href="/">
          <a className="semi-bold text-black text-lg no-underline">Roomet</a>
        </Link>
        {user ? (
          <div style={{}} className="flex align-items center-self auth_buttons">
            <div
              onClick={() => {
                router.push(`/house/new`, undefined, {
                  shallow: true,
                });
              }}
              className="pointer mx-4"
            >
              <Add fill="#000" width={20} height={20} />
            </div>
            <div
              onClick={() => {
                router.push(`/profile`, undefined, {
                  shallow: true,
                });
              }}
              className="overflow-hidden mx-2 pointer"
            >
              <img
                style={{ width: 30, height: 30, borderRadius: 20 }}
                src="https://png.pngtree.com/png-vector/20190919/ourmid/pngtree-user-login-or-authenticate-icon-on-gray-background-flat-icon-ve-png-image_1742031.jpg"
              />
            </div>
            <div
              onClick={() => {
                router.push(`/profile`, undefined, {
                  shallow: true,
                });
              }}
              className="pointer"
            >
              <div>{user.displayName}</div>
              <div className="text-xs text-grey-dark">En línea</div>
            </div>
            <div
              onClick={() => {
                closeSession();
              }}
              className="pointer mx-4"
            >
              <Exit fill="#000" width={20} height={20} />
            </div>
          </div>
        ) : (
          <div className="auth_buttons">
            <button
              onClick={() => setShowLogin(!showLogin)}
              className="btn_outline_rounded semi-bold rounded mr-2"
            >
              Iniciar sesión
            </button>
            <button
              onClick={() => setShowSignin(!showSignin)}
              className="semi-bold rounded btn_yellow_black"
            >
              Registrarse
            </button>
          </div>
        )}
      </div>
      {showLogin ? (
        <Login
          closeModal={() => setShowLogin(!showLogin)}
          onAuthClick={() => loginWithEmail()}
          showError={showError}
          setEmail={setEmail}
          setPassword={setPassword}
        />
      ) : null}
      {showSignin ? (
        <Signin
          closeModal={() => setShowSignin(!showSignin)}
          onCreateUser={() => createUserWithEmail()}
          showError={showError}
          setName={setName}
          setEmail={setEmail}
          setConfirmEmail={setConfirmEmail}
          setPassword={setPassword}
          setConfirmPassword={setConfirmPassword}
          setAcceptTerms={setAccepTerms}
          accepTerms={accepTerms}
        />
      ) : null}

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
