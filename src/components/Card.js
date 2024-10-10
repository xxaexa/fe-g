import React from "react";
import Link from "next/link";

const Card = ({ data, type }) => {
  return (
    <Link href={`/dashboard/${type}/${data.id}`} key={data.id}>
      <div className="rounded cursor-pointer">
        <div className="border w-full h-32">
          <h2 className="font-bold pb-1 pl-1">{data.email}</h2>
          <h2 className="font-bold pb-1 pl-1">{data.first_name}</h2>
          <h2 className="font-bold pb-1 pl-1">{data.id}</h2>
          <h2 className="font-bold pb-1 pl-1">{data.last_name}</h2>
        </div>
        <h2 className="font-bold py-2">{data.username}</h2>
      </div>
    </Link>
  );
};

export default Card;
