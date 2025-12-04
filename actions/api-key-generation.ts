import prisma from "@/lib/prisma";
import { randomBytes } from "crypto";

export async function generateApiKey(userId: string) {
  const key = randomBytes(32).toString("hex");

  await prisma.apiKey.create({
    data: {
      key,
      userId,
    },
  });
}
