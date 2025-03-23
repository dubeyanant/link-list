import React from "react";
import { AlertIcon } from "../ui/icons";

export default function ListHeader({ id, expiryDate }) {
  return (
    <>
      <h1 className={"font-bold text-2xl md:text-5xl"}>Join List</h1>
      <span className="text-sm mt-1 text-neutral-500">{id}</span>
      <div className="flex gap-1 text-red-100 text-sm mt-1 items-center">
        <AlertIcon />
        <span>List expires on {expiryDate}</span>
      </div>
    </>
  );
}
