import authApiRequest from "@/apiRequests/auth";
import { decodeJWT } from "@/lib/utils";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const code = (await request.json()) as string;
  const { payload } = await authApiRequest.sVerifyRegister(code!);
  const cookieStore = cookies();

  if (payload.code === 200) {
    const { access_token, refresh_token } = payload.data!;
    const decodedAccessToken = decodeJWT(access_token);
    const decodedRefreshToken = decodeJWT(refresh_token);

    cookieStore.set("accessToken", access_token, {
      path: "/",
      httpOnly: true,
      sameSite: true,
      secure: true,
      expires: new Date(decodedAccessToken.exp * 1000),
    });
    cookieStore.set("refreshToken", refresh_token, {
      path: "/",
      httpOnly: true,
      sameSite: true,
      secure: true,
      expires: new Date(decodedRefreshToken.exp * 1000),
    });
  }
  return Response.json(payload, {
    status: 200,
  });
}