"use server";

import prisma from "@/lib/prisma";

export async function getTotalUsers() {
  try {
    return await prisma.user.findMany();
  } catch (error: any) {
    console.error(error);
    throw new Error("Failed to get total users. Please try again later.");
  }
}

export async function getTotalSubscriptions() {
  try {
    const subscriptions = await prisma.subscription.findMany({
      include: {
        payment: true,
        user: true,
      },
    });
    console.log(subscriptions);
    return subscriptions;
  } catch (error: any) {
    console.error(error);
    throw new Error(
      "Failed to get total subscriptions. Please try again later."
    );
  }
}

export async function getTotalTemplate() {
  try {
    return await prisma.template.findMany();
  } catch (error: any) {
    console.error(error);
    throw new Error("Failed to get total templates. Please try again later.");
  }
}
