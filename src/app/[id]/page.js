"use client";

import React from "react";
import { useRouter } from "next/navigation";
import ListHeader from "@/components/list/ListHeader";
import ListForm from "@/components/list/ListForm";
import NamesList from "@/components/list/NamesList";
import PageFooter from "@/components/layout/PageFooter";
import { useListData } from "@/hooks/useListData";

export default function ListPage({ params }) {
  const router = useRouter();
  const { id } = React.use(params);

  // Custom hook to handle list data and operations
  const {
    list,
    expired,
    expiryDate,
    isCopied,
    addUserToList,
    copyUrlToClipboard,
  } = useListData(id, router);

  if (!id) {
    return null;
  }

  return (
    <div>
      <div className="flex flex-col md:justify-evenly md:flex-row md:items-center max-w-3xl mx-auto p-6 screen-height gap-16">
        <div className="mt-8 md:mt-0 md:w-auto flex flex-col">
          <ListHeader id={id} expired={expired} expiryDate={expiryDate} />

          {!expired && (
            <ListForm
              onSubmit={addUserToList}
              isCopied={isCopied}
              onCopy={copyUrlToClipboard}
            />
          )}
        </div>

        {list.length > 0 && <NamesList list={list} />}
      </div>
      <PageFooter />
    </div>
  );
}
