import modalStyles from "../../styles/modal";

export default function Login({ closeModal }) {
  return (
    <div className="modal">
      <div className="p-3 modal-content rounded shadow-md border bd-grey-light">
        <div
          style={{
            alignSelf: "flex-end",
            fontSize: 20,
            padding: 5,
            cursor: "pointer",
          }}
          onClick={() => closeModal()}
        >
          x
        </div>
        <h2 className="text-center mb-6 title semi-bold text-grey-darknest">
          Bienvenido a Roomet
        </h2>
        <div className="mb-4">
          <div className="input_label">correo</div>
          <form className="relative py-2 bd-width rounded bd-grey-light shadow-md-light">
            <input
              id="where"
              type="text"
              placeholder="tunombre@gmail.com"
              className="input-search"
            ></input>
          </form>
        </div>
        <div className="mb-4">
          <div className="input_label">contraseña</div>
          <form className="relative py-2 bd-width rounded bd-grey-light shadow-md-light">
            <input
              id="where"
              type="password"
              placeholder="**********"
              className="input-search"
            ></input>
          </form>
        </div>
        <div className="mb-4">
          <button className="w-full rounded btn border">Iniciar sesión</button>
        </div>
      </div>
      <style jsx>{modalStyles}</style>
    </div>
  );
}
