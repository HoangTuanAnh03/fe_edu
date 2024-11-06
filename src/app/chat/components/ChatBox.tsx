"use client";
import React, { useEffect, useImperativeHandle, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
import { decodeJWT, getAccessTokenFormLocalStorage } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

interface ChatBoxRef {
  removeReply: () => void;
}

interface ChatBoxProps {
  messages: IMessage[];
  role: string;
  setReplyId: (replyId: number) => void;
}

const ChatBox = React.forwardRef<ChatBoxRef, ChatBoxProps>(
  ({ messages, role, setReplyId }, ref) => {
    const [messageReply, setMessageReply] = useState<IMessage | null>(null);
    const [userId, setUserId] = useState<string | null>(null);

    useImperativeHandle(ref, () => ({
      removeReply: () => {
        setMessageReply(null);
        setReplyId(0);
      },
    }));

    const handleReply = (msg: IMessage) => {
      setMessageReply(msg);
      setReplyId(msg.id);
    };

    const handleCloseReply = () => {
      setMessageReply(null);
      setReplyId(0);
    };

    useEffect(() => {
      setUserId(decodeJWT(getAccessTokenFormLocalStorage()!).uid);
    }, []);

    return (
      <div
        id="chat-box"
        className="flex flex-col h-full border border-b border-gray-300 rounded-lg"
      >
        <ScrollArea className=" p-4">
          <div>
            {messages.map((msg, index) => (
              <div className="group" key={index}>
                {msg.reply && (
                  <div
                    className={
                      "flex flex-col -mb-4 text-[#65676b] mt-4" +
                      (msg.sender_type === role ? " items-end" : " items-start")
                    }
                  >
                    <div className="text-xs px-3 flex gap-2">
                      <span>
                        <Image
                          src={"/share.svg"}
                          height={11}
                          width={11}
                          alt=""
                        />
                      </span>
                      {(msg.sender_type === "USER" && msg.user_id === userId) ||
                      (msg.sender_type === "ADMIN" && msg.admin_id === userId)
                        ? msg.reply.sender_id === userId
                          ? "Bạn đã trả lời chính mình"
                          : `Bạn đã trả lời ${msg.reply.sender_name}`
                        : msg.reply.sender_id === userId
                        ? `${
                            msg.sender_type === "USER" && msg.user_id !== userId
                              ? msg.user_name
                              : msg.admin_name
                          }  đã trả lời Bạn`
                        : `${
                            msg.sender_type === "USER"
                              ? msg.user_name
                              : msg.admin_name
                          }  đã trả lời ${
                            [msg.admin_id, msg.user_id].includes(
                              msg.reply.sender_id
                            )
                              ? "chính mình"
                              : msg.reply.sender_name
                          }`}
                    </div>
                    <div
                      className={
                        "w-fit px-3 py-2  text-xs bg-[#00000008] " +
                        (msg.sender_type === role
                          ? "rounded-t-[18px] rounded-br-[4px]  rounded-bl-[18px]"
                          : "rounded-t-[18px] rounded-bl-[4px]  rounded-br-[18px]")
                      }
                    >
                      <div className="pb-3">{msg.reply.message}</div>
                    </div>
                  </div>
                )}

                <div
                  className={
                    " flex flex-row  justify-start gap-2 " +
                    (msg.sender_type === role ? " flex-row-reverse" : "")
                  }
                >
                  <div
                    className={
                      " w-fit px-3 py-2 rounded-full text-sm " +
                      (msg.sender_type === role
                        ? "bg-[#0084ff] text-white"
                        : "bg-[#e6e7e8] text-black")
                    }
                  >
                    {msg.message}
                  </div>
                  <div className="items-center hidden group-hover:flex">
                    <div className="p-1.5 rounded-full hover:bg-[#ebebeb]">
                      <Image src={"/share.svg"} height={16} width={16} alt="" />
                    </div>
                    <div
                      className="p-1.5 rounded-full hover:bg-[#ebebeb]"
                      onClick={() => handleReply(msg)}
                    >
                      <Image src={"/share.svg"} height={16} width={16} alt="" />
                    </div>
                    <div className="p-1.5 rounded-full hover:bg-[#ebebeb]">
                      <Image src={"/share.svg"} height={16} width={16} alt="" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
        {messageReply && (
          <div>
            <Separator />
            <div className="px-4 pt-2 pb-1 flex justify-between items-center">
              <div>
                <div className="text-sm text-[#050505] text-bold">
                  {messageReply.sender_type === "USER"
                    ? messageReply.user_id === userId
                      ? "Đang trả lời chính mình"
                      : "Đang trả lời " + messageReply.user_name
                    : messageReply.admin_id === userId
                    ? "Đang trả lời chính mình"
                    : "Đang trả lời " + messageReply.user_name}
                </div>
                <div className="text-xs text-[#65676B]">
                  {messageReply.message}
                </div>
              </div>
              <div
                className="h-fit p-1.5 rounded-full hover:bg-[#ebebeb]"
                onClick={handleCloseReply}
              >
                <Image src={"/close.svg"} height={16} width={16} alt="" />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
);

export default ChatBox;
