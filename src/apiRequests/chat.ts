import http from "@/utils/api";

const chatApiRequest = {
  sGetAllUserIdsAndLatestMessage: () =>
    http.get<IBackendRes<IUserChat[]>>("infoChat/users/getAllUserIdsAndLatestMessage"),

  sMessage: (userId: string) =>
    http.get<IBackendRes<IMessage[]>>(`infoChat/messages/${userId}`),
};

export default chatApiRequest;
