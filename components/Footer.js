export default function Footer() {
  return (
    <div className="footer">
      <div className=" bg-white border-top bd-grey-light">
        <div className="container">
          <section className="py-6 f1 mb-3">
            <div style={{ maxWidth: 453 }}>
              <p className="mb-2 text-3xl title semi-bold">Roomet</p>
              <p className="mb-2 text-grey-dark">
                Descubre casas y apartamentos privados, perfectos para cualquier
                ocasión.
              </p>
            </div>
            <div>
              <p className="mb-2 text-lg title semi-bold">Producto</p>
              <a className="mb-2 text-grey-dark no-underline ancle">Solución</a>
            </div>
            <div
              style={{ display: "flex", width: 177, flexDirection: "column" }}
            >
              <p className="mb-2 text-lg title semi-bold">Más información</p>
              <a className="mb-2 text-grey-dark no-underline ancle">Contacto</a>
              <a className="mb-2 text-grey-dark no-underline ancle">
                Términos de servicio
              </a>
              <a className="mb-2 text-grey-dark no-underline ancle">
                Cookies y políticas de privacidad
              </a>
            </div>
          </section>
        </div>
        <div className=" bg-turquey py-4">
          <div className="container">
            <div style={{ color: "white" }}>
              Una aplicación pinolera, ¡Que se rinda tu madre!
            </div>
          </div>
        </div>
      </div>

      <style jsx>
        {`
          .footer {
            position: relative;
          }
          .container {
            width: 80%;
            max-width: 1200px;
            min-width: 768px;
            margin-right: auto;
            margin-left: auto;
            padding-right: 1rem;
            padding-left: 1rem;
          }
          .border-top {
            border-top-width: 1.5px;
            border-top-style: solid;
            border-top-color: rgb(218, 225, 231);
          }
          .title {
            color: #3d4852;
          }
          .ancle {
            cursor: pointer;
            &:hover {
              color: #3d4852;
            }
          }
          .f1 {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
          }
        `}
      </style>
    </div>
  );
}
