"use client";
import { AvatarOption } from "@/app/(manager)/components/header/Avatar";
import { ChatIcon } from "@/app/(manager)/components/header/Chat";
import { useAppStore } from "@/components/app-provider";

export default function Header() {
  const name = useAppStore((state) => state.name);

  return (
    <div className="flex items-center justify-between bg-[#f7d6d6] h-[56px] px-4">
      <div></div>
      <div className=" flex gap-4 items-center">
        <ChatIcon />
        <AvatarOption />
      </div>
    </div>
  );
}
