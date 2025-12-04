"use server";

import { sendEmail } from "@/lib/nodemailer";
import prisma from "@/lib/prisma";

export async function createContact(data: {
  name: string;
  email: string;
  country: string;
  message: string;
}) {
  try {
      // 1. Store in database
    const savedContact = await prisma.contact.create({
      data,
    });

    // 2. Email to Admin
    await sendEmail({
      to: process.env.NODEMAILER_USER!,
      subject: `New Contact Message from ${data.name}`,
      text: `
        <h2>New Contact Submission</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Country:</strong> ${data.country}</p>
        <p><strong>Message:</strong><br/>${data.message}</p>
      `,
    });

    // 3. Auto-reply to User
    await sendEmail({
      to: data.email,
      subject: "Thank you for contacting us!",
      text: `
        <h2>Hi ${data.name},</h2>

        <p>Thank you for reaching out! 👋</p>

        <p>We have received your message and our team will get back to you within 24–48 hours.</p>

        <p>Best regards,</p>
        <p><strong>Newstletter Team</strong></p>
      `,
    });

    return savedContact;
  } catch (error) {
    console.log("Contact creation failed:", error);
    throw new Error("Failed to create contact. Please try again later.");
  }
}

// GET ALL CONTACTS
export async function getAllContacts() {
  try {
    return await prisma.contact.findMany();
  } catch (error) {
    console.log(error);
    throw new Error("Failed to get contacts. Please try again later.");
  }
}

// DELETE CONTACT
export async function deleteContact(id: string) {
  try {
    return await prisma.contact.delete({
      where: { id },
    });
  } catch (error) {
    console.log(error);
    throw new Error("Failed to delete contact. Please try again later.");
  }
}
