import { Router } from "express";
import { getDailyMetrics } from "../controllers/metrics.controller";

const router = Router();

/**
 * @openapi
 * /v1/metrics:
 *   get:
 *     summary: Get daily metrics
 *     description: Returns an array of daily metrics collected by the analytics pipeline
 *     tags:
 *       - Metrics
 *     responses:
 *       200:
 *         description: List of daily metrics
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   date:
 *                     type: string
 *                     format: date
 *                     example: "2026-03-24"
 *                   total_events:
 *                     type: number
 *                     example: 123
 */
router.get("/v1/metrics", getDailyMetrics);

export default router;
