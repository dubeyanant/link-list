import React from "react";
import Link from "next/link";

export default function PageFooter() {
  return (
    <footer className="text-center mt-8 mb-4 text-neutral-500">
      made with ❤️ by{" "}
      <Link
        href="https://anantdubey.com/"
        className="text-blue-500 hover:underline"
      >
        Anant
      </Link>
    </footer>
  );
}
