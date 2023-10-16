const API_URL = process.env.EXPO_PUBLIC_API_URL;
if (!API_URL)
  throw new Error(
    "Missing env var: EXPO_PUBLIC_API_URL.. Please set it in .env file"
  );

export async function apiFetch(
  endpoint: string,
  postData: any = {},
  options: RequestInit = {},
  timeout = 5000
): Promise<any> {
  console.log("postData", postData);
  let isPost = Object.keys(postData).length > 0;
  if (isPost) {
    options.body = JSON.stringify(postData);
    options.method = "POST";
    options.headers = {
      ...options.headers,
      Accept: "application/json",
      "Content-Type": "application/json",
    };
  }
  return Promise.race([
    fetch(API_URL + endpoint, options),
    new Promise((_, reject) =>
      setTimeout(
        () => reject(new Error(`timeout ${API_URL + endpoint}`)),
        timeout
      )
    ),
  ]);
}
