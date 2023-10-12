const API_URL = process.env.EXPO_PUBLIC_API_URL;
if (!API_URL)
  throw new Error(
    "Missing env var: EXPO_PUBLIC_API_URL.. Please set it in .env file",
  );

export async function apiFetch(
  endpoint: string,
  options: RequestInit = {},
  timeout = 5000,
): Promise<any> {
  return Promise.race([
    fetch(API_URL + endpoint, options),
    new Promise((_, reject) =>
      setTimeout(
        () => reject(new Error(`timeout ${API_URL + endpoint}`)),
        timeout,
      ),
    ),
  ]);
}
