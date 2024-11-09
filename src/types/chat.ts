// types/chat.ts

export interface IBackendRes<T> {
  message: string;
  code: number | string;
  data?: T;
}

export interface IModelPaginate<T> {
  meta: {
    current: number;
    pageSize: number;
    pages: number;
    total: number;
  };
  result: T[];
}

export interface IUserChat {
  user_id: string;
  user_name: string;
  image: string;
  admin_id: string;
  admin_name: string;
  message: string;
  sender_type: string;
  timestamp: string;
  status: string;
}

export interface IMessage {
  id: number;
  user_id: string;
  admin_id: string;
  message: string;
  sender_type: string;
  timestamp: string;
  status: string;
  type: string;
  reply: IReply | null;
}

export interface IMessageRequest {
  access_token: string;
  message: string;
  type: string;
  id: number | null;
}

export interface IReply {
  id: number;
  sender_id: string;
  message: string;
}

export interface IUserInChat {
  user_id: string;
  user_name: string;
  image: string;
}

export interface ConversationResponse {
  users: IUserInChat[];
  messages: IMessage[];
}
