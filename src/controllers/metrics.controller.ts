import { Request, Response } from "express";
import { prisma } from "../config/prisma";

export const getDailyMetrics = async (req: Request, res: Response) => {
  try {
    const metrics = await prisma.aggDailyMetrics.findMany({
      orderBy: { date: "desc" },
    });
    res.json(metrics);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch metrics" });
  }
};
