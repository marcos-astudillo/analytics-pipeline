import { Router } from "express";
import { ingestEvent } from "../controllers/event.controller";

const router = Router();

/**
 * @openapi
 * /v1/events:
 *   post:
 *     summary: Ingest event
 *     description: Receives an analytics event and queues it for processing
 *     tags:
 *       - Events
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - event_id
 *               - type
 *               - user_id
 *               - ts
 *               - props
 *             properties:
 *               event_id:
 *                 type: string
 *                 example: "evt123"
 *               type:
 *                 type: string
 *                 example: "page_view"
 *               user_id:
 *                 type: string
 *                 example: "u_1"
 *               ts:
 *                 type: string
 *                 format: date-time
 *                 example: "2026-03-24T17:00:00.000Z"
 *               props:
 *                 type: object
 *                 example: { "path": "/home" }
 *     responses:
 *       202:
 *         description: Accepted
 *       400:
 *         description: Bad request, invalid or missing fields
 */
router.post("/v1/events", ingestEvent);

export default router;
