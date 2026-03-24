import { Request, Response } from "express";
import { eventSchema } from "../models/event.schema";
import { EventService } from "../services/event.service";

const eventService = new EventService();

export const ingestEvent = async (req: Request, res: Response) => {
    console.log("BODY:", req.body);
  try {
    const parsed = eventSchema.parse(req.body);

    await eventService.ingestEvent(parsed);

    return res.status(202).json({ status: "accepted" });
  } catch (error: any) {
    return res.status(400).json({
      error: "Invalid event payload",
      details: error.errors || error.message,
    });
  }
};
