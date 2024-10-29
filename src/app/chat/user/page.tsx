"use client";
import React, { useEffect, useState } from "react";
import { connectToUserChat, sendMessageToAdmin } from "@/utils/SocketService";
import ChatBox from "@/app/components/ChatBox";
import {
  decodeJWT,
  getAccessTokenFormLocalStorage,
  getRefreshTokenFormLocalStorage,
} from "@/lib/utils";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import chatApiRequest from "@/apiRequests/chat";

export default function UserChatPage() {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [messageInput, setMessageInput] = useState("");

  useEffect(() => {
    const accessToken = getRefreshTokenFormLocalStorage();
    const userId = decodeJWT(accessToken ?? "").uid;

    connectToUserChat((message: IMessage) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    }, userId);
    const fetchRequest = async () => {
      const usersRes = await chatApiRequest.sMessage(userId);
      setMessages(usersRes.payload.data!);
    };
    fetchRequest()
  }, []);

  const handleSendMessage = () => {
    if (!messageInput) return;
    const userId = decodeJWT(getAccessTokenFormLocalStorage() ?? "").uid
    const newMessage: IMessage = {
      id: 0,
      sender_type: "USER",
      user_id: userId,
      user_name: "user",
      message: messageInput,
      admin_id: "",
      admin_name:"",
      timestamp: new Date().toISOString(),
    };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    sendMessageToAdmin(userId, messageInput);
    setMessageInput("");
  };

  return (
    <div className="max-w-5xl mx-auto  rounded-lg shadow-lg shadow-black/10">
      <h3 className="h-[56px] flex  items-center text-2xl font-bold text-[#050505] p-4">
        Trò chuyện với quản trị viên
      </h3>
      <div className="h-full flex flex-col">
        <div className="h-[calc(100vh-63px-56px-56px)]"><ChatBox messages={messages} role={"USER"} /></div>
        <div className=" h-[56px] flex items-center gap-4">
          <Input onKeyDown={(e) => e.key === "Enter" && handleSendMessage()} value={messageInput} onChange={(e) => setMessageInput(e.target.value)} type="text" placeholder="Aa" />
          <Button onClick={handleSendMessage} variant="outline">SEND</Button>
        </div>
      </div>
    </div>
  );
}