import React from "react";
import { formatDate } from "@/utils/dateFormatters";

export default function NamesList({ list }) {
  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-2">List of Names</h2>
      <ul className="w-full">
        {list.map((user, index) => (
          <li
            key={index}
            className="mb-2 mt-4 flex justify-between gap-4 w-full relative after:content-[''] after:absolute after:bottom-[-0.5rem] after:left-0 after:w-full after:h-[1px] after:bg-gradient-to-r after:from-transparent after:via-gray-300 after:to-transparent"
          >
            <span className="break-words overflow-hidden min-w-0 w-full">
              {user.name}
            </span>
            <span className="whitespace-nowrap flex-shrink-0">
              {formatDate(user.timestamp)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
