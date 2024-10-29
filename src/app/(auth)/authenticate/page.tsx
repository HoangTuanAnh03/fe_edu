"use client";
import authApiRequest from "@/apiRequests/auth";
import { useAppStore } from "@/components/app-provider";
import { toast } from "@/hooks/use-toast";
import { decodeJWT, getAccessTokenFormLocalStorage } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { useEffect } from "react";

export default function Authentication() {
  const router = useRouter();
  const setRole = useAppStore((state) => state.setRole);
  const isCalledRef = React.useRef(false);

  useEffect(() => {
    const authCodeRegex = /code=([^&]+)/;
    const isMatch = window.location.href.match(authCodeRegex);
    const authCode = isMatch ? isMatch[1] : "";

    if (!isMatch) {
      router.push("/login");
    }

    const outbound = async (code: string) => {
      const res = await authApiRequest.outbound(code);
  
      if (res.status === 200) {
        toast({
          title: "Đăng nhập thành công bằng Google.",
        });
        const accessToken = getAccessTokenFormLocalStorage();
        if (accessToken) {
          const role = decodeJWT(accessToken).scope;
          setRole(role);
        }
        router.push("/");
      } else {
        toast({
          variant: "destructive",
          title: "Có lỗi xẩy ra!",
        });
        router.push("/login");
      }
    }

    if (isCalledRef.current) return;

    outbound(authCode);
    isCalledRef.current = true;
  }, []);

  return (
    <div className="w-full h-lvh flex flex-col justify-center items-center">
      <Loader2 className="h-[50px] w-[50px] text-blue-600 animate-spin" />
      <div className="mt-4">Authenticate ...</div>
    </div>
  );
}
