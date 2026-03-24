import express from "express";
import dotenv from "dotenv";
import { requestLogger } from "./middlewares/requestLogger";
import eventRoutes from "./routes/event.routes";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger";
import metricsRoutes from "./routes/metrics.routes";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(requestLogger);
app.use(eventRoutes);
app.use(metricsRoutes);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/health", (_, res) => {
  res.status(200).json({ status: "ok" });
});

const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV !== "test") {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

export default app;