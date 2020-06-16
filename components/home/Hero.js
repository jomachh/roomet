import Search from "../../public/assets/search.svg";

export default function Hero() {
  return (
    <section className="hero bg-cover bg-center bg-black py-6">
      <div className="container">
        <div className="section_form bg-white shadow-md w-1\/2 p-4">
          <h1 className="text-4xl text-grey-darknest mb-2 font-light">
            Encuentra tu habitación perfecta en Roomet
          </h1>
          <h2 className="text-base text-grey-dark mb-6 font-normal">
            Descubre casas y apartamentos privados, perfectos para cualquier
            ocasión.
          </h2>
          <form>
            <div className="mb-4">
              <label htmlFor="where" className="input_label">
                Tu ubicación
              </label>
              <div className="relative px-2 py-2 bd-width rounded bd-grey-light shadow-md-light">
                <Search fill="rgb(96, 111, 123)" width={20} height={20} />
                <input
                  id="where"
                  type="text"
                  placeholder="Managua, Nicaragua"
                  className="input-search"
                ></input>
              </div>
            </div>
            <button className="semi-bold w-full text-yellow-darker py-6 px-2 bg-yellow-dark rounded">
              Buscar
            </button>
          </form>
        </div>
      </div>
      <style jsx>
        {`
          .hero {
            min-height: 450px;
            background-image: url(https://images.unsplash.com/photo-1504202302068-15fc2055f7f9?auto=format&fit=crop&ixid=eyJhcHBfaWQiOjEyMDd9&ixlib=rb-1.2.1&q=80&w=1330);
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
          .section_form {
          }
        `}
      </style>
    </section>
  );
}
