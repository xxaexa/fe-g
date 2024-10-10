import React from "react";
import Link from "next/link";

const Card = ({ data, type }) => {
  return (
    <Link href={`/dashboard/${type}/${data.id}`} key={data.id}>
      <div className="rounded cursor-pointer">
        <div className="border w-full h-32 relative overflow-hidden">
          <img
            src={data.image}
            alt={data.title}
            className="w-full h-full object-cover"
          />
        </div>
        <h2 className="font-bold py-2">{data.title}</h2>
      </div>
    </Link>
  );
};

export default Card;
