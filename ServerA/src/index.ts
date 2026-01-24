import express, { ErrorRequestHandler } from "express";
import { AppDataSource } from "./data-source";
import compression from "compression";

const app = express();

app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const start = async () => {
  try {
    // ✅ Wait for DB connection
    await AppDataSource.initialize();
    console.log("✅ Database connected");

    // ✅ Health check
    app.get("/health", (req, res) => {
      res.json({ status: 200, data: "good" });
    });

    // ❌ routes go here (AFTER DB is ready)

    // ✅ Global error handler (must be last)
    const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
      console.error(err.stack);

      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    };

    app.use(errorHandler);

    app.listen(3000, () => {
      console.log("🚀 Server running on port 3000");
    });
  } catch (error) {
    console.error("❌ Failed to start application", error);
    process.exit(1); // ⛔ kill app if DB fails
  }
};

start();