import React, { useState } from "react";
import Link from "next/link";
import { CheckIcon, CopyIcon } from "@/components/ui/icons";

export default function ListForm({ onSubmit, isCopied, onCopy }) {
  const [name, setName] = useState("");

  const handleSubmit = () => {
    onSubmit(name);
    setName("");
  };

  const handleChange = (e) => {
    const filteredValue = e.target.value.replace(/[^a-zA-Z ]/g, "");
    setName(filteredValue);
  };

  return (
    <>
      <input
        type="text"
        value={name}
        onChange={handleChange}
        placeholder="Enter Your Name"
        className="mt-4 p-2 rounded-md border border-zinc-800 outline-none"
        maxLength={25}
        pattern="[A-Za-z ]+"
      />
      <div className="mt-4 flex gap-2">
        <Link
          href=""
          onClick={handleSubmit}
          className="items-center px-4 py-2 w-fit rounded-xl font-bold text-base border border-zinc-800 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-zinc-900"
        >
          Join List
        </Link>
        <Link
          href=""
          onClick={onCopy}
          className="items-center p-2 rounded-xl font-bold text-base border border-zinc-800 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-zinc-900"
        >
          {isCopied ? <CheckIcon /> : <CopyIcon />}
        </Link>
      </div>
    </>
  );
}
