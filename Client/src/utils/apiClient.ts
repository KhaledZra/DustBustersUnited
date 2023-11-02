import { ImagePickerAsset } from "expo-image-picker";

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
  if (!options.method) options.method = isPost ? "POST" : "GET";
  if (isPost) {
    options.body = JSON.stringify(postData, null, 2);
    options.headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...options.headers,
    };
  }
  // Add a slash if needed
  // This allows you to mess up both the API_URL and the endpoint, and still get a valid URL :p
  if (endpoint[0] !== "/" && API_URL![API_URL!.length - 1] !== "/")
    endpoint = "/" + endpoint;

  console.log("[apiClient.ts] ::", options.method, API_URL + endpoint);
  if (options.body) {
    console.log("[Body] ::", options.body);
  }
  return Promise.race([
    fetch(API_URL + endpoint, options)
      .then((response) => {
        if (response.status >= 400)
          throw new Error(
            `\n endpoint:\t ${(options.method, endpoint)}` +
              `\n status:\t ${response.status}` +
              `\n statusText:\t ${response.statusText}\n`
          );
        return response;
      })
      .catch((e) => {
        console.log("[apiClient.ts]", e);
      }),
    new Promise((_, reject) =>
      setTimeout(
        () => reject(new Error(`timeout ${API_URL + endpoint}`)),
        timeout
      )
    ),
  ]);
}

export async function apiSendImage(
  endpoint: string,
  image: ImagePickerAsset
): Promise<any> {
  const url = API_URL + endpoint;

  // Add a slash if needed
  // This allows you to mess up both the API_URL and the endpoint, and still get a valid URL :p
  if (endpoint[0] !== "/" && API_URL![API_URL!.length - 1] !== "/")
    endpoint = "/" + endpoint;

  const method = "POST";
  const headers = { "Content-Type": "multipart/form-data" };
  const body = new FormData();

  body.append("file", {
    uri: image.uri,
    name: "image.jpg",
    type: "image/jpeg",
  } as any);

  console.log("[apiClient.ts] ::", method, url);
  console.log("[Body] ::", body);
  return fetch(url, { method, body, headers });
}
