"use client";

import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabase";
import {
  uniqueNamesGenerator,
  adjectives,
  colors,
  animals,
} from "unique-names-generator";
import Link from "next/link";
import { LinkIcon } from "@/components/icons";

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
          <LinkIcon />
          <span className="ml-2">Create List</span>
        </Link>
      </div>
    </div>
  );
}
