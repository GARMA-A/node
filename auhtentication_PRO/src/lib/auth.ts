import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/drizzle/db";
import { nextCookies } from "better-auth/next-js";
export const auth = betterAuth({
  emailAndPassword: {
    enabled: true

  },
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 60 * 5
    }
  },
  plugins: [nextCookies()],
  database: drizzleAdapter(db, {

    provider: "pg",
  }),
});
