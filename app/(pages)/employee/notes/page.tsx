"use client";

import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { getSelfId, getSelfIdCustomer } from "@/app/lib/user";
import Advices from "@/app/back/models/advices";
import { createNote, getNote } from "@/app/lib/dbhelper/notes";

export default function NotesPage() {
  const [notes, setNotes] = useState<Advices[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const customerId = (await getSelfId()).toString();
      const data = await getNote(customerId);

      if (data) {
        setNotes(data);
      } else {
        const newNotes: Advices[] = [];
        await createNote(customerId, newNotes);
        setNotes(newNotes);
      }
    } catch (error) {
      console.error("Error fetching notes:", error);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        dataSource={notes}
        loading={loading}
        size="middle"
        rowKey={(record) => record.title}
      />
    </>
  );
}
