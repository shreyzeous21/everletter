"use server";

import { Role } from "@/lib/generated/prisma/enums";
import { getServerSession } from "@/lib/getServerSession";
import { sendEmail } from "@/lib/nodemailer";
import prisma from "@/lib/prisma";

// ---------------------- GET CURRENT USER --------------------------
async function getCurrentUser() {
  const session = await getServerSession();
  if (!session) throw new Error("Unauthorized");

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
  });

  if (!user) throw new Error("Unauthorized");
  return user;
}

// ---------------------- GET ALL USERS --------------------------
export async function getAllUsers() {
  try {
    return await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        hasWebsitePermission: true,
        isBanned: true,
        subscriptions: true,
      },
    });
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get users. Please try again later.");
  }
}

// ---------------------- BAN / UNBAN USER --------------------------
export async function toggleBanUser(id: string) {
  try {
    const currentUser = await getCurrentUser();
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) throw new Error("User not found.");

    // RULES
    if (currentUser.role === Role.USER) {
      throw new Error("You are not authorized to modify ban status.");
    }

    if (currentUser.role === Role.ADMIN && user.role === Role.SUPERADMIN) {
      throw new Error("Admins cannot ban a Super Admin.");
    }

    if (currentUser.id === id) {
      throw new Error("You cannot ban yourself.");
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: { isBanned: !user.isBanned },
    });

    try {
      await sendEmail({
        to: updatedUser.email,
        subject: "Account Ban Status Updated",
        text: `Your account has been ${
          updatedUser.isBanned ? "banned" : "unbanned"
        }.`,
      });
    } catch (e) {
      console.error("Ban email failed:", e);
    }

    return updatedUser;
  } catch (error: any) {
    console.error(error);
    throw new Error(error.message || "Failed to toggle ban user.");
  }
}

// ---------------------- WEBSITE PERMISSION --------------------------
export async function toggleWebsitePermission(id: string) {
  try {
    const currentUser = await getCurrentUser();
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) throw new Error("User not found.");

    // RULES
    if (currentUser.role === Role.USER) {
      throw new Error("You are not authorized to modify website permissions.");
    }

    if (currentUser.role === Role.ADMIN && user.role === Role.SUPERADMIN) {
      throw new Error("Admins cannot change Super Admin permissions.");
    }

    if (currentUser.id === id) {
      throw new Error("You cannot change your own permission.");
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: { hasWebsitePermission: !user.hasWebsitePermission },
    });

    try {
      await sendEmail({
        to: updatedUser.email,
        subject: "Website Permission Updated",
        text: `Your website permission has been ${
          updatedUser.hasWebsitePermission ? "granted" : "revoked"
        }.\nLogin: ${process.env.BETTER_AUTH_URL}/sign-in`,
      });
    } catch (e) {
      console.error("Permission email failed:", e);
    }

    return updatedUser;
  } catch (error: any) {
    console.error(error);
    throw new Error(error.message || "Failed to toggle permission.");
  }
}

// ---------------------- DELETE USER --------------------------
export async function deleteUser(id: string) {
  try {
    const currentUser = await getCurrentUser();
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) throw new Error("User not found.");

    // RULES
    if (currentUser.role !== Role.SUPERADMIN) {
      throw new Error("Only Super Admin can delete users.");
    }

    if (currentUser.id === id) {
      throw new Error("Super Admin cannot delete themselves.");
    }

    return await prisma.user.delete({ where: { id } });
  } catch (error: any) {
    console.error(error);
    throw new Error(error.message || "Failed to delete user.");
  }
}

// ---------------------- CHANGE USER ROLE --------------------------
export async function changeUserRole(id: string, role: Role) {
  try {
    const currentUser = await getCurrentUser();
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) throw new Error("User not found.");

    if (user.role === role) throw new Error("User already has this role.");

    // RULES
    if (currentUser.role === Role.USER) {
      throw new Error("You are not authorized to change roles.");
    }

    if (currentUser.role === Role.ADMIN) {
      if (user.role === Role.SUPERADMIN) {
        throw new Error("Admins cannot change SuperAdmin role.");
      }
      if (role === Role.SUPERADMIN) {
        throw new Error("Admins cannot promote to SuperAdmin.");
      }
    }

    if (currentUser.id === id) {
      throw new Error("You cannot change your own role.");
    }

    return await prisma.user.update({
      where: { id },
      data: { role },
    });
  } catch (error: any) {
    console.error(error);
    throw new Error(error.message || "Failed to change user role.");
  }
}
