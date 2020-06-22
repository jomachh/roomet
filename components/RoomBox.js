import { useRouter } from "next/router";

export default function RoomBox({ id, imageUrl, title, price }) {
  const router = useRouter();
  return (
    <div
      onClick={() => {
        router.push(`/${id}`);
      }}
      className="house-card mb-3"
    >
      <div className="house-image relative overflow-hidden">
        <img className="w-full absolute" src={imageUrl} />
      </div>
      <div className="house-content bg-white p-3 border rounded bd-grey-light">
        <div className="bold mb-2">{title}</div>
        <div className="text-xs">
          <span className="bold">${price}</span> por noche
        </div>
      </div>
      <style jsx>
        {`
          .house-card {
            cursor: pointer;
            color: black;
            height: 237px;
            width: 235px;
            line-height: 18px;
            margin-right: 15px;
            margin-bottom: 12px;
          }
          .house-image {
            height: 150px;
          }
          .house-content {
          }
        `}
      </style>
    </div>
  );
}
