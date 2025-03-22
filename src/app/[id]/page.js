"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabase";
import Link from "next/link";
import { CheckIcon, CopyIcon } from "@/components/icons";

export default function ListPage({ params }) {
  const router = useRouter();
  const { id } = React.use(params);
  const [name, setName] = useState("");
  const [list, setList] = useState([]);
  const [expired, setExpired] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [expiryDate, setExpiryDate] = useState("");

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

      setExpiryDate(formatExpiryDate(expiryTime));
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

  const formatExpiryDate = (timestamp) => {
    const date = new Date(timestamp);

    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "short" });

    return `${day} ${month}`;
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);

    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "short" });
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    const pad = (num) => num.toString().padStart(2, "0");

    return `${day} ${month} ${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  };

  const copyUrlToClipboard = () => {
    const url = `${window.location.origin}/${id}`;
    navigator.clipboard
      .writeText(url)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      })
      .catch((err) => {
        console.error("Failed to copy URL:", err);
      });
  };

  return (
    <div className="flex flex-col justify-evenly md:flex-row md:items-center max-w-3xl mx-auto p-6 md:h-screen gap-16">
      <div className="mt-8 md:mt-0 md:w-auto flex flex-col">
        <h1
          className={`font-bold ${
            expired
              ? "text-red-500 text-2xl"
              : "text-2xl md:text-5xl text-white"
          }`}
        >
          {expired ? "This List Has Expired" : "Join List"}
        </h1>
        <span className="text-sm mt-1 text-neutral-500">{id}</span>
        <span className="text-sm mt-1 text-red-100">
          List expires on {expiryDate}
        </span>
        {!expired && (
          <>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                const filteredValue = e.target.value.replace(/[^a-zA-Z ]/g, "");
                setName(filteredValue);
              }}
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
                onClick={copyUrlToClipboard}
                className="items-center p-2 rounded-xl font-bold text-base border border-zinc-800 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-zinc-900"
              >
                {isCopied ? <CheckIcon /> : <CopyIcon />}
              </Link>
            </div>
          </>
        )}
      </div>

      {list.length > 0 && (
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
      )}
    </div>
  );
}
