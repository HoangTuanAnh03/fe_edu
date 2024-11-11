import Header from "@/app/(manager)/components/header/Header";
import SideBar from "@/app/(manager)/components/sidebar/SideBar";
import React from "react";

export default function ManagerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen w-full">
      <SideBar />
      <div className="flex flex-col flex-1">
        <Header />
        <div>{children}</div>
      </div>
    </div>
  );
}
