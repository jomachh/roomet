import modalStyles from "../../styles/modal";
import DatePicker from "react-datepicker";

export default function Reserve({
  closeModal,
  reserve,
  showError,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  price,
  userData,
  setCard,
}) {
  const diffBetweenDates = () => {
    const diff = endDate.getTime() - startDate.getTime();
    const diffInDays = diff / (1000 * 3600 * 24);
    return diffInDays;
  };

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
        <div className="mb-4">
          <div className="input_label">llegada</div>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
          />
        </div>
        <div className="mb-4">
          <div className="input_label">salida</div>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
          />
        </div>
        <div className="mb-4">
          <div className="input_label">
            Precio: ${diffBetweenDates() * price}
          </div>
        </div>
        <div className="input_label">Método de pago</div>
        <select onChange={(e) => setCard(e.target.value)}>
          <option>- - - -</option>
          {userData
            ? userData.cards
                .filter((card) => card !== "")
                .map((card, index) => {
                  if (card) {
                    return (
                      <option key={index} value={card}>
                        {card}
                      </option>
                    );
                  } else {
                    return <option value="0">Agregar método de pago</option>;
                  }
                })
            : null}
          {/* <option value="1">Agregar nueva tarjeta</option> */}
        </select>
        <div className="mb-4">
          {showError ? (
            <div className="mb-2 error-text text-xs">
              Ha ocurrido un error, intenta nuevamente.
            </div>
          ) : null}
          <button className="w-full rounded btn border" onClick={reserve}>
            Reservar
          </button>
        </div>
      </div>
      <style jsx>{modalStyles}</style>
    </div>
  );
}
