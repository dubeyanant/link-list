"use client";

import { useRouter } from "next/navigation";
import { supabase } from "../supabase";
import {
  uniqueNamesGenerator,
  adjectives,
  colors,
  animals,
} from "unique-names-generator";
import Link from "next/link";

export default function Home() {
  const router = useRouter();

  const createList = async () => {
    const listId = uniqueNamesGenerator({
      dictionaries: [adjectives, colors, animals],
      separator: "-",
      length: 3,
    });

    const { error } = await supabase
      .from("lists")
      .insert([{ id: listId, users: [] }])
      .select();

    if (error) {
      console.error("Failed to create list:", error);
      return;
    }

    router.push(`/${listId}`);
  };

  return (
    <div
      style={{
        background:
          "radial-gradient(circle, rgba(30,30,30,1) 0%, rgba(0,0,0,1) 100%)",
      }}
    >
      <div className="flex flex-col items-center justify-center h-screen max-w-5xl mx-auto p-6">
        <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold text-center">
          <span className="text-shine">
            Create a list, share it, get live updates.
          </span>
        </h1>
        <Link
          href=""
          onClick={createList}
          className="flex items-center mt-8 px-6 py-3 rounded-xl font-bold text-base md:text-2xl border border-zinc-800 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:bg-zinc-800"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="size-5 md:size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"
            />
          </svg>

          <span className="ml-2">Create List</span>
        </Link>
      </div>
    </div>
  );
}
