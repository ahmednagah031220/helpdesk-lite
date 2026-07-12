export type NotificationEvent = "assigned" | "resolved";

export function notify(event: NotificationEvent, ticket: { id: string; title: string }) {
  // Stub: swap for email/Slack later
  console.log(`[notify:${event}] Ticket ${ticket.id}: ${ticket.title}`);
}
