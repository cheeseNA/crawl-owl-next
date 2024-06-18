import createClient, { type Middleware } from "openapi-fetch";
import type { paths } from "./schema";
import { auth } from "@/firebase/firebase";

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

const fetchRequestInterceptor: Middleware = {
  async onRequest(req, _options) {
    if (auth.currentUser === null) {
      return req;
    }
    const token = await auth.currentUser.getIdToken();
    if (!token) {
      return req;
    }
    req.headers.set("Authorization", `Bearer ${token}`);
    return req;
  },
};

const fetchResponseInterceptor: Middleware = {
  async onResponse(res, _options) {
    if (res.status === 401) {
      console.log("Sign out because of 401");
      await auth.signOut();
    }
    return res;
  },
};

const client = createClient<paths>({
  baseUrl: process.env.NEXT_PUBLIC_BACKEND_API_URL,
});

client.use(throwOnError);
client.use(fetchRequestInterceptor);
client.use(fetchResponseInterceptor);

export default client;
