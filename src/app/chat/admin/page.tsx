"use client";
import React, { useEffect, useState } from "react";
import { connectToAdminChat, sendMessageToUser } from "@/utils/SocketService";
import UserList from "@/app/components/UserList";
import ChatBox from "@/app/components/ChatBox";
import chatApiRequest from "@/apiRequests/chat";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { decodeJWT, getAccessTokenFormLocalStorage } from "@/lib/utils";

export default function AdminChatPage() {
  const [users, setUsers] = useState<IUserChat[]>([]);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [messageInput, setMessageInput] = useState("");

  const fetchMessages = (userId: string) => {
    setCurrentUserId(userId);
    const fetchRequest = async () => {
      const usersRes = await chatApiRequest.sMessage(userId);
      setMessages(usersRes.payload.data!);
    };
    fetchRequest();
  };

  const handleSendMessage = () => {
    if (messageInput && currentUserId) {
      sendMessageToUser(currentUserId, messageInput);
      setMessageInput("");
    }
  };
  const handleMessageReceived = (message: IMessage) => {
    console.log("🚀 ~ handleMessageReceived ~ message:", message);
    const uid = decodeJWT(getAccessTokenFormLocalStorage() ?? "").uid;

    setMessages((prev) => [...prev, message]);
    setUsers((prevUsers) => {
      const existingUser = prevUsers.find(
        (user) => user.user_id === message.user_id
      );
      const updatedUser: IUserChat = {
        user_id: message.user_id,
        user_name: message.user_name,
        admin_id: message.admin_id,
        admin_name: message.admin_name,
        message: message.message,
        sender_type: message.sender_type,
        timestamp: message.timestamp,
      };

      const updatedUsers = existingUser
        ? prevUsers.filter((user) => user.user_id !== message.user_id)
        : [...prevUsers];
      return [updatedUser, ...updatedUsers];
    });
  };

  useEffect(() => {
    const fetchRequest = async () => {
      const usersRes = await chatApiRequest.sGetAllUserIdsAndLatestMessage();
      setUsers(usersRes.payload.data!);
    };
    fetchRequest();

    connectToAdminChat(handleMessageReceived);
  }, []);

  return (
    <div className="flex h-[calc(100vh-64px)] bg-gray-100">
      <div className="flex-1 max-w-[360px]">
        <UserList users={users} onSelectUser={fetchMessages} />
      </div>
      <div className="flex-1 flex-col mr-2 ">
        <div className=" h-[64px] w-fit flex items-center">
          <div className="m-[6px] flex w-full hover:bg-[#e6e7e8] rounded-[8px]">
            <div className="m-2">
              <Avatar className="">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
            <div className="h-full w-fit p-[6px] flex flex-col justify-center">
              <div className=" font-bold mb-1 text-[14px]">
                {/* {user.user_name} */}
                Hoàng Tuấn Anh
              </div>
              <div className=" font-normal text-[#65676b] text-[12px]">
                Hoạt động 42 phút trước
              </div>
            </div>
          </div>
        </div>
        <div className="h-[calc(100vh-64px-64px-56px)]">
          <ChatBox messages={messages} role={"ADMIN"} />
        </div>
        <div className=" h-[56px] flex items-center gap-4">
          <Input
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            type="text"
            placeholder="Aa"
          />
          <Button onClick={handleSendMessage} variant="outline">
            SEND
          </Button>
        </div>
      </div>
    </div>
  );
}
