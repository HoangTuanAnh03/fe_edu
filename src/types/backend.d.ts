export {};
// https://bobbyhadz.com/blog/typescript-make-types-global#declare-global-types-in-typescript

declare global {
  interface IBackendRes<T> {
    message: string;
    code: number | string;
    data?: T;
  }

  interface IModelPaginate<T> {
    meta: {
      current: number;
      pageSize: number;
      pages: number;
      total: number;
    };
    result: T[];
  }

  interface IUserChat {
    user_id: string;
    user_name: string;
    admin_id: string;
    admin_name: string;
    message: string;
    sender_type: string;
    timestamp: string;
  }

  interface IMessage {
    id: number;
    user_id: string;
    user_name: string;
    admin_id: string;
    admin_name: string;
    message: string;
    sender_type: string;
    timestamp: string;
  }
  
}
