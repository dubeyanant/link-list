"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../supabase";

export default function ListPage({ params }) {
  const router = useRouter();
  const { id } = React.use(params);
  const [name, setName] = useState("");
  const [list, setList] = useState([]);
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    async function fetchList() {
      const { data, error } = await supabase
        .from("lists")
        .select("*")
        .eq("id", id)
        .single();

      if (error || !data) return router.push("/");

      const currentTime = new Date();
      const expiryTime = new Date(data.expires_at);

      if (currentTime > expiryTime) {
        setExpired(true);
      } else {
        setList(data.users);
      }
    }

    fetchList();

    // Subscribe to live updates
    const subscription = supabase
      .channel(`list-${id}`)
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "lists",
          filter: `id=eq.${id}`,
        },
        (payload) => {
          setList(payload.new.users);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [id]);

  const handleSubmit = async () => {
    if (!name.trim() || expired) return;

    const { data } = await supabase
      .from("lists")
      .select("*")
      .eq("id", id)
      .single();

    if (!data) return;

    const updatedUsers = [...data.users, { name, timestamp: Date.now() }];
    updatedUsers.sort((a, b) => a.timestamp - b.timestamp);

    await supabase.from("lists").update({ users: updatedUsers }).eq("id", id);
    setList(updatedUsers);
    setName("");
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>{expired ? "This List Has Expired" : "Join List"}</h1>
      {!expired && (
        <>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
          />
          <button onClick={handleSubmit}>Join</button>
        </>
      )}
      <h2>List of Names</h2>
      <ul>
        {list.map((user, index) => (
          <li key={index}>
            {user.name} - <small>{formatDate(user.timestamp)}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}
