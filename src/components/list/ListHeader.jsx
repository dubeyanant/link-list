import React from "react";

export default function ListHeader({ id, expired, expiryDate }) {
  return (
    <>
      <h1
        className={`font-bold ${
          expired ? "text-red-500 text-2xl" : "text-2xl md:text-5xl text-white"
        }`}
      >
        {expired ? "This List Has Expired" : "Join List"}
      </h1>
      <span className="text-sm mt-1 text-neutral-500">{id}</span>
      <span className="text-sm mt-1 text-red-100">
        List expires on {expiryDate}
      </span>
    </>
  );
}
