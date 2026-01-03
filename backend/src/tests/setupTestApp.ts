import express from "express";
import bodyParser from "body-parser";
import { registerHandler } from "../controllers/auth.controller.js";

export function createTestApp() {
  const app = express();

  // Parse JSON request body
  app.use(bodyParser.json());

  // Test route
  app.post("/auth/register", registerHandler);

  return app;
}
