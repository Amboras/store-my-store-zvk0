import Medusa from "@medusajs/js-sdk"

export const medusaClient = new Medusa({
  baseUrl: process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000",
  publishableKey: process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY,
  debug: process.env.NODE_ENV === "development",
  auth: {
    type: "jwt",
    jwtTokenStorageMethod: "local",
    jwtTokenStorageKey: "medusa_auth_token",
  },
  globalHeaders: {
    ...(process.env.NEXT_PUBLIC_STORE_ID
      ? { "X-Store-Environment-ID": process.env.NEXT_PUBLIC_STORE_ID }
      : {}),
  },
})

