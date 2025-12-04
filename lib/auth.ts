import { APIError, betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { sendEmail } from "./nodemailer";
import { createAuthMiddleware } from "better-auth/api";
import z from "zod";
import prisma from "./prisma";

const passwordSchema = z
  .string()
  .min(1, { message: "Password is required" })
  .min(8, { message: "Password must be at least 8 characters" })
  .regex(/[^A-Za-z0-9]/, {
    message: "Password must contain at least one special character",
  });

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  // socialProviders: {
  //   google: {
  //     clientId: process.env.GOOGLE_CLIENT_ID!,
  //     clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  //   },
  //   github: {
  //     clientId: process.env.GITHUB_CLIENT_ID!,
  //     clientSecret: process.env.GITHUB_CLIENT_SECRET!,
  //   },
  // },
  emailAndPassword: {
    enabled: true,
    async sendResetPassword({ user, url }) {
      await sendEmail({
        to: user.email,
        subject: "Reset your password",
        text: `Click here to reset your password: ${url}`,
      });
    },
  },
  emailVerification: {
    sendOnSignUp: true,
    expiresIn: 60 * 60, // 1 hour
    autoSignInAfterVerification: true,
    async sendVerificationEmail({ user, url }) {
      await sendEmail({
        to: user.email,
        subject: "Verify your email",
        text: `<p>Click here to verify your email: <a href="${url}">Verify email</a></p> `,
      });
    },
  },
  user: {
    changeEmail: {
      enabled: true,
      expiresIn: 60 * 60, // 1 hour
      async sendChangeEmailVerification({ user, newEmail, url }) {
        await sendEmail({
          to: user.email,
          subject: "Verify your new email",
          text: `Your email has been changed to ${newEmail}. Click the link to approve the change: ${url}`,
        });
      },
    },
    additionalFields: {
      role: {
        type: ["SUPERADMIN", "ADMIN", "USER"],
        input: false,
      },
      hasWebsitePermission: {
        type: "boolean",
        input: false,
      },
      isBanned: {
        type: "boolean",
        input: false,
      },
      subscriptions: {
        type: "string",
        input: false,
      },
    },
  },
  hooks: {
    before: createAuthMiddleware(async (ctx) => {
      if (
        ctx.path === "/sign-up/email" ||
        ctx.path === "/reset-password" ||
        ctx.path === "/change-password"
      ) {
        const password = ctx.body.password || ctx.body.newPassword;
        const { error } = passwordSchema.safeParse(password);
        if (error) {
          throw new APIError("BAD_REQUEST", {
            message: "Password not strong enough",
          });
        }
      }
    }),
    after: createAuthMiddleware(async (ctx) => {
      if (ctx.path === "/sign-up/email") {
        const email = ctx.body.email;
        const userAdmin = process.env.ADMIN_EMAILS;
        const isAdmin =
          userAdmin && userAdmin.split(",").includes(ctx.body.email);

        if (isAdmin) {
          await prisma.user.update({
            where: { email: ctx.body.email },
            data: { role: "SUPERADMIN", hasWebsitePermission: true },
          });

          await sendEmail({
            to: ctx.body.email,
            subject: "Welcome to the Newstletter platform",
            text: `You have been granted superadmin access to the platform. Please login to the platform to continue.
            <a href="${process.env.BETTER_AUTH_URL}/sign-in">Login</a>`,
          });
        } else {
          sendEmail({
            to: email,
            subject: "Welcome to the Newstletter platform",
            text: `Welcome to the Newstletter platform. Please wait for the admin to approve your request.
            `,
          });
        }
      }
    }),
  },
});

export type Session = typeof auth.$Infer.Session;
export type User = typeof auth.$Infer.Session.user;
