import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function getCurrentUser() {
  try {
    const token = (await cookies()).get("token")?.value;

    if (!token) return null;

    const payload = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as {
      userId: string;
      email: string;
      role: string;
    };

    return payload;
  } catch {
    return null;
  }
}