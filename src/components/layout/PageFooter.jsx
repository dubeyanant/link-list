import React from "react";
import Link from "next/link";

export default function PageFooter() {
  return (
    <footer className="text-center text-neutral-500 h-10 flex items-center justify-center">
      made with ❤️ by&nbsp;
      <Link
        href="https://anantdubey.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:underline"
      >
        Anant
      </Link>
    </footer>
  );
}
