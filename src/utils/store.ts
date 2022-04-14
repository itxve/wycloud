export function storeIt<T>(key: string, data: T) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function getIt<T>(key: string): T {
  return JSON.parse(localStorage.getItem(key) ?? "{}") as T;
}

export function removeIt(key: string) {
  return localStorage.removeItem(key);
}
