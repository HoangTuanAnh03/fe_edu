import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

export default function ChatBox({
  messages,
  role,
}: {
  messages: IMessage[];
  role: string;
}) {
  return (
    <div
      id="chat-box"
      className="h-full  border border-b border-gray-300 rounded-lg"
    >
      <ScrollArea className="h-full px-4">
        <div>
          {messages.map((msg, index) => (
            <div
              key={index}
              className={
                "flex mb-1.5" +
                (msg.sender_type === role ? " justify-end" : " justify-start")
              }
            >
              <div
                className={
                  "w-fit px-3 py-2 rounded-full text-sm " +
                  (msg.sender_type === role
                    ? "bg-[#0084ff] text-white"
                    : "bg-[#e6e7e8] text-black")
                }
              >
                {msg.message}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
