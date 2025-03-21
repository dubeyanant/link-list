"use client";

import { useRouter } from "next/navigation";
import { supabase } from "../supabase";
import { nanoid } from "nanoid";

export default function Home() {
  const router = useRouter();

  const createList = async () => {
    const listId = nanoid();
    console.log("Creating list with ID:", listId);

    const { data, error } = await supabase
      .from("lists")
      .insert([{ id: listId, users: [] }])
      .select();

    if (error) {
      console.error("Failed to create list:", error);
      return;
    }

    console.log("List created successfully:", data);
    router.push(`/${listId}`);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Welcome to Link List</h1>
      <button
        onClick={createList}
        style={{ padding: "10px 20px", fontSize: "16px" }}
      >
        Create List
      </button>
    </div>
  );
}
