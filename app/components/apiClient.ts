import { config } from "./config";

export const apiClient = {
  async post(url: string, body: any) {
    if (config.useMock) {
      console.log(`[MOCK MODE] Mock POST to ${url} with body:`, body);
      if (url.includes("/api/auth/login")) {
        return { status: 200, json: async () => ({ token: "mock-token", message: "Login successful" }) };
      }
    }
    return await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      credentials: "include",
    });
  },
};
