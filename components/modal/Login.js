import modalStyles from "../../styles/modal";

export default function Login({
  closeModal,
  onAuthClick,
  showError,
  setEmail,
  setPassword,
}) {
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
              onChange={(e) => setEmail(e.target.value)}
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
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </form>
        </div>
        <div className="mb-4">
          {showError ? (
            <div className="mb-2 error-text text-xs">
              Ha ocurrido un error, intenta nuevamente.
            </div>
          ) : null}
          <button className="w-full rounded btn border" onClick={onAuthClick}>
            Iniciar sesión
          </button>
        </div>
      </div>
      <style jsx>{modalStyles}</style>
    </div>
  );
}
