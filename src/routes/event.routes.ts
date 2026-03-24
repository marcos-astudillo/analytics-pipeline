import { Router } from "express";
import { ingestEvent } from "../controllers/event.controller";

const router = Router();

/**
 * @openapi
 * /v1/events:
 *   post:
 *     summary: Ingest event
 *     responses:
 *       202:
 *         description: Accepted
 */
router.post("/v1/events", ingestEvent);

export default router;
