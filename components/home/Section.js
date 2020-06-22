import RoomBox from "../RoomBox";

export default function Section({ title, rooms, showMore, customMsg }) {
  console.log(rooms);
  return (
    <div className="container py-6">
      <h1 className="text-3xl font-light text-grey-darkest mb-3">{title}</h1>
      <div className="grid-container mb-8">
        {rooms == undefined ? (
          <p>{customMsg ? customMsg : "No hay cuartos en esta sección"}</p>
        ) : (
          rooms.map((room, index) => {
            return (
              <RoomBox
                key={index}
                id={room.id}
                title={room.title}
                imageUrl={room.imageUrl}
                price={room.price}
              />
            );
          })
        )}
      </div>
      {showMore ? (
        <div className="text-center">
          <a className="py-3 px-12 bg-yellow-dark no-underline text-yellow-darker text-lg rounded">
            Mostrar todos
          </a>
        </div>
      ) : null}

      <style jsx>
        {`
          .container {
            width: 80%;
            max-width: 1200px;
            min-width: 768px;
            margin-right: auto;
            margin-left: auto;
            padding-right: 1rem;
            padding-left: 1rem;
          }
        `}
      </style>
    </div>
  );
}
