export {};
// https://bobbyhadz.com/blog/typescript-make-types-global#declare-global-types-in-typescript

declare global {
  type IBackendRes<T> = {
    message: string;
    code: number | string;
    data?: T;
  }

  type IModelPaginate<T> = {
    meta: {
      current: number;
      pageSize: number;
      pages: number;
      total: number;
    };
    result: T[];
  }
}