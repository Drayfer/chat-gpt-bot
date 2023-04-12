"use client";

import Menu from "@/components/menu/Menu";
import { useAppSelector } from "@/hooks/redux";
import { useState } from "react";

export default function Sidebar() {
  const { chatSession, model, currentChat, isLoadUserInfo } = useAppSelector(
    (state) => ({
      chatSession: state.chat.session,
      model: state.chat.model,
      currentChat: state.chat.currentChat,
      isLoadUserInfo: state.messages.loading,
    })
  );
  const [isOpen, setIsopen] = useState(true);

  return (
    <div className="h-screen text-[#D1D5DA] bg-transparent w-[378px]">
      <Menu setIsOpenMenu={setIsopen} isOpenMenu={isOpen} />
    </div>
  );
}
