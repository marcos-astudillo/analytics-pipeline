import { Router } from "express";
import { getDailyMetrics } from "../controllers/metrics.controller";

const router = Router();

/**
 * @openapi
 * /v1/metrics:
 *   get:
 *     summary: Get daily metrics
 *     responses:
 *       200:
 *         description: List of daily metrics
 */
router.get("/v1/metrics", getDailyMetrics);

export default router;
