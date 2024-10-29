import http from "@/utils/api";
import { ForgotPasswordBodyType } from "@/schemaValidations/user.schema";

const userApiRequest = {
  sForgotPassword: (body: ForgotPasswordBodyType) =>
    http.post<IBackendRes<any>>("/users/forgotPassword", body),
};

export default userApiRequest;
