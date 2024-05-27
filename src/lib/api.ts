import createClient, { type Middleware } from "openapi-fetch";
import type { paths } from "./schema";

const throwOnError: Middleware = {
  async onResponse(res) {
    if (res.status >= 400) {
      const body = res.headers.get("content-type")?.includes("json")
        ? await res.clone().json()
        : await res.clone().text();
      throw new Error(body);
    }
    return undefined;
  },
};

const client = createClient<paths>({
  baseUrl: process.env.NEXT_PUBLIC_BACKEND_API_URL,
});

client.use(throwOnError);

export default client;
