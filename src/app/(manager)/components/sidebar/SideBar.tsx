"use client";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoHomeOutline } from "react-icons/io5";
import { IconContext } from "react-icons/lib";
import { FaRegFileWord, FaRegUser } from "react-icons/fa";
import { GiLevelEndFlag } from "react-icons/gi";
import { MdTopic } from "react-icons/md";

type Item = {
  title: string;
  link: string;
  icon: React.ReactNode;
};

const sidebarItems: Item[] = [
  {
    title: "Dash Board",
    link: "/dashboard",
    icon: <IoHomeOutline />,
  },
  {
    title: "Users",
    link: "/users",
    icon: <FaRegUser />,
  },
  {
    title: "Levels",
    link: "/levels",
    icon: <GiLevelEndFlag />,
  },
  {
    title: "Topics",
    link: "/topics",
    icon: <MdTopic />,
  },
  {
    title: "Words",
    link: "/words",
    icon: <FaRegFileWord />,
  },
];

export default function SideBar() {
  const [itemCurrent, setItemCurrent] = useState<Item>();

  useEffect(() => {
    const href = "/" + window.location.href.split("/")[3];
    setItemCurrent(sidebarItems.find((item) => item.link === href)!);

  }, []);

  return (
    <div className=" w-[250px] bg-slate-50">
      <div className="h-[56px] flex items-center justify-center ">
        <Image src={"/logo_black.png"} width={100} height={100} alt="Logo" />
      </div>
      <Separator />
      <div className="p-4 flex flex-col gap-1">
        {sidebarItems.map((item, index) => (
          <Link
            onClick={() => setItemCurrent(item)}
            key={index}
            href={item.link}
            className={`flex gap-4 items-center px-4 py-2 hover:bg-[#f7e6e6] cursor-pointer rounded-md
               ${item === itemCurrent ? "bg-red-200" : ""}
            `}
          >
            <IconContext.Provider
              value={{
                size: "20px",
                color: item === itemCurrent ? "#ed1b2f" : "gray",
              }}
            >
              {item.icon}
            </IconContext.Provider>
            <div
              className={`flex 
               ${item === itemCurrent ? "text-[#ed1b2f]" : "text-gray-500"}
            `}
            >
              {item.title}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
