import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Analytics Pipeline API",
      version: "1.0.0",
      description: `
This API collects events from multiple producers, stores them, and exposes aggregated metrics.

GitHub: https://github.com/marcos-astudillo/analitics-pipeline
Portfolio: https://www.marcosastudillo.com
      `,
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Local dev server",
      },
    ],
  },
  apis: ["./src/routes/*.ts"],
};

export const swaggerSpec = swaggerJsdoc(options);
