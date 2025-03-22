import { useState, useEffect } from "react";
import { supabase } from "@/utils/supabase";
import { formatExpiryDate, formatDate } from "@/utils/dateFormatters";

export function useListData(id, router) {
  const [name, setName] = useState("");
  const [list, setList] = useState([]);
  const [expired, setExpired] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [expiryDate, setExpiryDate] = useState("");

  useEffect(() => {
    if (!id) return;

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
  }, [id, router]);

  const addUserToList = async (newName) => {
    if (!newName.trim() || expired) return;

    const { data } = await supabase
      .from("lists")
      .select("*")
      .eq("id", id)
      .single();

    if (!data) return;

    const updatedUsers = [
      ...data.users,
      { name: newName, timestamp: Date.now() },
    ];
    updatedUsers.sort((a, b) => a.timestamp - b.timestamp);

    await supabase.from("lists").update({ users: updatedUsers }).eq("id", id);
    setList(updatedUsers);
    setName("");
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

  return {
    name,
    setName,
    list,
    expired,
    isCopied,
    expiryDate,
    addUserToList,
    copyUrlToClipboard,
    formatDate,
  };
}
