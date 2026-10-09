/**
 * Notification orchestration module.
 * Coordinates email sending and webhook dispatching for appointment events.
 */

import { prisma } from "./prisma";
import {
  sendAppointmentReceivedEmail,
  sendNewAppointmentNotification,
  sendAppointmentConfirmedEmail,
  sendThankYouEmail,
} from "./email";
import { dispatchWebhook, createWebhookPayload } from "./webhook";

/**
 * Handle notifications when a new appointment is created.
 */
export async function notifyAppointmentCreated(appointmentId: string): Promise<void> {
  const appointment = await prisma.appointment.findUnique({
    where: { id: appointmentId },
    include: { service: true },
  });

  if (!appointment) return;

  const settings = await prisma.settings.findUnique({
    where: { id: "default" },
  });

  const businessName = settings?.businessName || "Service Auto";
  const ownerEmail = settings?.businessEmail;
  const dateStr = appointment.preferredDate.toLocaleDateString("ro-RO", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Send confirmation to client (if email provided)
  if (appointment.clientEmail) {
    await sendAppointmentReceivedEmail(
      appointment.clientEmail,
      appointment.clientName,
      appointment.service.name,
      dateStr,
      appointment.preferredTime,
      businessName
    );
  }

  // Notify owner/service
  if (ownerEmail) {
    await sendNewAppointmentNotification(
      ownerEmail,
      appointment.clientName,
      appointment.clientPhone,
      appointment.clientEmail,
      `${appointment.carBrand} ${appointment.carModel}`,
      appointment.service.name,
      dateStr,
      appointment.preferredTime,
      appointment.notes
    );
  }

  // Dispatch webhook
  await dispatchWebhook(createWebhookPayload("appointment.created", appointment));
}

/**
 * Handle notifications when an appointment is confirmed.
 */
export async function notifyAppointmentConfirmed(appointmentId: string): Promise<void> {
  const appointment = await prisma.appointment.findUnique({
    where: { id: appointmentId },
    include: { service: true },
  });

  if (!appointment || !appointment.clientEmail) return;

  const settings = await prisma.settings.findUnique({
    where: { id: "default" },
  });

  const businessName = settings?.businessName || "Service Auto";
  const dateStr = (appointment.confirmedDate || appointment.preferredDate).toLocaleDateString("ro-RO", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  await sendAppointmentConfirmedEmail(
    appointment.clientEmail,
    appointment.clientName,
    appointment.service.name,
    dateStr,
    appointment.confirmedTime || appointment.preferredTime,
    businessName,
    settings?.businessPhone || "",
    settings?.businessAddress || ""
  );

  await dispatchWebhook(createWebhookPayload("appointment.confirmed", appointment));
}

/**
 * Handle notifications when an appointment is completed.
 */
export async function notifyAppointmentCompleted(appointmentId: string): Promise<void> {
  const appointment = await prisma.appointment.findUnique({
    where: { id: appointmentId },
    include: { service: true },
  });

  if (!appointment || !appointment.clientEmail) return;

  const settings = await prisma.settings.findUnique({
    where: { id: "default" },
  });

  const businessName = settings?.businessName || "Service Auto";

  await sendThankYouEmail(
    appointment.clientEmail,
    appointment.clientName,
    businessName,
    settings?.googleReviewUrl || ""
  );

  // Mark review email as sent
  await prisma.appointment.update({
    where: { id: appointmentId },
    data: { reviewSent: true },
  });

  await dispatchWebhook(createWebhookPayload("appointment.completed", appointment));
}
