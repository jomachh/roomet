import modalStyles from "../../styles/modal";

export default function Signin({
  closeModal,
  onCreateUser,
  showError,
  setName,
  setEmail,
  setConfirmEmail,
  setPassword,
  setConfirmPassword,
  setAcceptTerms,
  accepTerms,
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
          Crear cuenta
        </h2>
        <div className="mb-4">
          <div className="input_label">Nombre</div>
          <form className="relative py-2 bd-width rounded bd-grey-light shadow-md-light">
            <input
              id="where"
              type="text"
              placeholder="Juan Perez"
              className="input-search"
              onChange={(e) => setName(e.target.value)}
            ></input>
          </form>
        </div>
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
          <div className="input_label">confirmar correo</div>
          <form className="relative py-2 bd-width rounded bd-grey-light shadow-md-light">
            <input
              id="where"
              type="text"
              placeholder="tunombre@gmail.com"
              className="input-search"
              onChange={(e) => setConfirmEmail(e.target.value)}
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
          <div className="input_label">confirmar contraseña</div>
          <form className="relative py-2 bd-width rounded bd-grey-light shadow-md-light">
            <input
              id="where"
              type="password"
              placeholder="**********"
              className="input-search"
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></input>
          </form>
        </div>
        <div className="mb-4">
          <form className="mb-2">
            <input
              type="checkbox"
              onChange={() => {
                setAcceptTerms(!accepTerms);
              }}
            />
            <label className="text-xs px-2">
              Aceptar <a href="">términos y condiciones</a> de uso.
            </label>
          </form>
          {showError ? (
            <div className="mb-2 error-text text-xs">
              Ha ocurrido un error, intenta nuevamente.
            </div>
          ) : null}
          {accepTerms ? (
            <button
              className="w-full rounded btn border"
              onClick={onCreateUser}
            >
              Crear
            </button>
          ) : null}
        </div>
      </div>
      <style jsx>{modalStyles}</style>
    </div>
  );
}
