import { LevelCreateRequest, LevelResponse } from "@/types/level";
import http from "@/utils/api";

const levelApiRequest = {
  sGetById: (id : number) =>
    http.get<IBackendRes<LevelResponse>>(`levels/${id}`),

  sGetAll: (spec : IModelSpecificationRequest, page: IModelPaginateRequest) =>
    http.get<IBackendRes<IModelPaginate<LevelResponse>>>(`levels?${spec.filter ?? "filter=" + spec.filter + "&"}page=${page.page}&size=${page.size}&sort=${page.sort}`),
  
  sCreate: (body : LevelCreateRequest) =>
    http.post<IBackendRes<LevelResponse>>("levels", body),

  // sEdit: (body : LevelCreateRequest) =>
  //   http.post<IBackendRes<LevelResponse>>("levels", body),

  // sDelete: (body : LevelCreateRequest) =>
  //   http.post<IBackendRes<LevelResponse>>("levels", body),
};

export default levelApiRequest;
