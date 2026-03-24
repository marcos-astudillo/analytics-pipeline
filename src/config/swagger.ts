import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Analytics Pipeline API",
      version: "1.0.0",
      description: `
        Analytics Pipeline backend.
        Collects events, processes metrics, and provides daily aggregates.
        GitHub: https://github.com/marcos-astudillo/analytics-pipeline
        Portfolio: https://www.marcosastudillo.com 
      `,
    },
    servers: [
      {
        url: process.env.BASE_URL || "http://localhost:3000",
      },
    ],
  },
  apis: ["./src/routes/*.ts", "./src/models/*.ts"],
};

export const swaggerSpec = swaggerJsdoc(options);
