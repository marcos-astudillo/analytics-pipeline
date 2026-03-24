import express from "express";
import dotenv from "dotenv";
import { requestLogger } from "./middlewares/requestLogger";


dotenv.config();

const app = express();
app.use(requestLogger);

app.use(express.json());

app.get("/health", (_, res) => {
  res.status(200).json({ status: "ok" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
