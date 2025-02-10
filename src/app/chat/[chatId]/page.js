"use client";

import { useParams } from "next/navigation";
import Chat from "@/components/Chat";
import Navabar from "@/components/Navbar";

export default function ChatPage() {

  const { chatId } = useParams();

  return (
    <>
      <Navabar />
      <Chat chatId={chatId} />
    </>
  );
}
