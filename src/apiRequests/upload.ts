import { UploadImageResponse } from "@/types/upload";
import http from "@/utils/api";

const uploadApiRequest = {
  sLevelImage: (formData: FormData) =>
    http.post<IBackendRes<UploadImageResponse>>("/upload/level", formData),
};

export default uploadApiRequest;
