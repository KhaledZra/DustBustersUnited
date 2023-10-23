const API_URL = process.env.EXPO_PUBLIC_API_URL;
if (!API_URL) {
  throw new Error(
    "Missing env var: EXPO_PUBLIC_API_URL... Please set it in the .env-file"
  );
}

export async function apiFetch(
  endpoint: string,
  postData: any = {},
  options: RequestInit = {},
  timeout = 5000
): Promise<any> {
  let isPost = Object.keys(postData).length > 0;
  if (isPost) {
    if (!options.method) {
      options.method = "POST";
    }
    options.body = JSON.stringify(postData, null, 2);
    options.headers = {
      ...options.headers,
      Accept: "application/json",
      "Content-Type": "application/json",
    };
  }
  // if Endpoint doesn't begin with /, and the API_URL doesn't end with /, add a / in between!
  if (endpoint[0] !== "/" && API_URL![API_URL!.length - 1] !== "/")
    endpoint = "/" + endpoint;

  console.log("[apiClient.ts] ::", options.method, API_URL + endpoint);
  if (options.body) {
    console.log("[POST Body] ::", options.body);
  }
  return Promise.race([
    fetch(API_URL + endpoint, options).catch((e) => {
      console.log("[apiClient.ts] Error: ", e);
    }),
    new Promise((_, reject) =>
      setTimeout(
        () => reject(new Error(`timeout ${API_URL + endpoint}`)),
        timeout
      )
    ),
  ]);
}
