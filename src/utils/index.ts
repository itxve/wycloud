export type User =
  | {
      avatarUrl: string;
      nickname: string;
      //cookie :用于本地文件上传
      cookie: string;
      backgroundUrl: string;
      signature: string;
      userId: number;
    }
  | undefined;

export type LoginUser = {};
const uKey = "user";

export function storeUser(user: User) {
  localStorage.setItem(uKey, JSON.stringify(user));
}

export function getUser(): User {
  return JSON.parse(localStorage.getItem(uKey) ?? "{}") as User;
}

export function clearUser() {
  return localStorage.removeItem(uKey);
}
