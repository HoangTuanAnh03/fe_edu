"use client";
import React, { useEffect, useRef, useState } from "react";
import { connectToUserChat, sendMessageToAdmin } from "@/utils/SocketService";
import ChatBox from "@/app/chat/components/ChatBox";
import {
  decodeJWT,
  getAccessTokenFormLocalStorage,
  getRefreshTokenFormLocalStorage,
} from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import chatApiRequest from "@/apiRequests/chat";
import InputContainer from "@/app/chat/components/Input";

interface ChatBoxRef {
  removeReply: () => void;
}

interface InputContainerRef {
  focusInput: () => void;
}

export default function UserChatPage() {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [userId, setUserId] = useState("");
  const [replyId, setReplyId] = useState<number>(0);
  const chatBoxRef = useRef<ChatBoxRef>(null);
  const inputContainerRef = useRef<InputContainerRef>(null);

  const handlerSetReplyId = (id: number) => {
    setReplyId(id);
    inputContainerRef.current?.focusInput();
  };

  const handleSendMessage = (messageInput: string) => {
    if (!messageInput || !userId) return;

    const messageRequest: IMessageRequest = {
      access_token: getAccessTokenFormLocalStorage()!,
      message: messageInput,
      type: replyId === 0 ? "SENT" : "REPLY",
      id: replyId,
    };

    if (messageInput.trim()) {
      sendMessageToAdmin(userId, messageRequest);
      setReplyId(0);
      chatBoxRef.current?.removeReply();
    }
  };

  useEffect(() => {
    const userId = decodeJWT(getAccessTokenFormLocalStorage()!).uid;
    setUserId(userId);

    connectToUserChat((message: IMessage) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    }, userId);
    const fetchRequest = async () => {
      const usersRes = await chatApiRequest.sMessage(userId);
      setMessages(usersRes.payload.data!);
    };
    fetchRequest();
  }, []);

  return (
    <div className="max-w-5xl mx-auto  rounded-lg shadow-lg shadow-black/10">
      <h3 className="h-[56px] flex  items-center text-2xl font-bold text-[#050505] p-4">
        Trò chuyện với quản trị viên
      </h3>
      <div className="h-full flex flex-col">
        <div className="h-[calc(100vh-63px-56px-56px)]">
          <ChatBox
            ref={chatBoxRef}
            messages={messages}
            setReplyId={handlerSetReplyId}
            role={"USER"}
          />
        </div>
        <div className=" h-[56px] flex items-center">
          <InputContainer
            ref={inputContainerRef}
            handleSendMessage={handleSendMessage}
          />
        </div>
      </div>
    </div>
  );
}
