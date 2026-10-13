import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getMyToken() {
    const cookieStore = await cookies();
    const sessionToken =
        cookieStore.get("next-auth.session-token")?.value ??
        cookieStore.get("__Secure-next-auth.session-token")?.value;

    if (!sessionToken) {
        return null;
    }

    const secret = process.env.AUTH_SECRET;
    if (!secret) {
        throw new Error("AUTH_SECRET is not configured.");
    }

    const token = await decode({ token: sessionToken, secret });
    return typeof token?.token === "string" ? token.token : null;
}