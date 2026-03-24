import { z } from "zod";

export const eventSchema = z.object({
  event_id: z.string().uuid(),
  type: z.string().min(1),
  user_id: z.string().optional(),
  ts: z.string().datetime(),
  props: z.record(z.string(), z.any()),
});

export type EventInput = z.infer<typeof eventSchema>;
