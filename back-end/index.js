import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import sequelize from "./src/config/dbsetup.js";
import { createDefaultUser } from "./src/utils/createDefaultUser.js";

import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

// Models (import để Sequelize biết các bảng)
import User from "./src/models/User.js";
import Household from "./src/models/Household.js";
import Vehicle from "./src/models/Vehicle.js";
import FeeCollection from "./src/models/FeeCollection.js";
import FeeDetail from "./src/models/FeeDetail.js";
import FeeType from "./src/models/FeeType.js";
import Resident from "./src/models/Resident.js";
import HouseholdHistory from "./src/models/HouseholdHistory.js";
import ResidentHistory from "./src/models/ResidentHistory.js";
import TemporaryAbsence from "./src/models/TemporaryAbsence.js";
import TemporaryResidence from "./src/models/TemporaryResidence.js";

// Import routes
import UserRoutes from "./src/routes/UserRoutes.js";
import HouseholdRoutes from "./src/routes/HouseholdRoutes.js";
import ResidentRoutes from "./src/routes/ResidentRoutes.js";
import FeeTypeRoutes from "./src/routes/FeeTypeRoutes.js";
import FeeDetailRoutes from "./src/routes/FeeDetailRoutes.js";
import FeeCollectionRoutes from "./src/routes/FeeCollectionRoutes.js";
import VehicleRoutes from "./src/routes/VehicleRoutes.js";
import HouseholdHistoryRoutes from "./src/routes/HouseholdHistoryRoutes.js";
import TemporaryAbsenceRoutes from "./src/routes/TemporaryAbsenceRoutes.js";
import TemporaryResidenceRoutes from "./src/routes/TemporaryResidenceRoutes.js";
import StatisticsRoutes from "./src/routes/StatisticsRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Cấu hình Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'KTPM Project API - Quản lý chung cư',
      version: '2.0.0',
      description: 'API hoàn chỉnh cho hệ thống quản lý chung cư (Hộ khẩu + Thu phí)',
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
      },
    ],
  },
  apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Accept all origins
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(helmet({
  contentSecurityPolicy: false,
}));
app.use(morgan("dev"));

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Test route
app.get("/", (req, res) => {
  res.json({
    message: "API đang chạy...",
    version: "2.0.0",
    documentation: `http://localhost:${PORT}/api-docs`
  });
});

// Routes
app.use("/api/users", UserRoutes);
app.use("/api/households", HouseholdRoutes);
app.use("/api/residents", ResidentRoutes);
app.use("/api/fee-type", FeeTypeRoutes);
app.use("/api/fee-detail", FeeDetailRoutes);
app.use("/api/fee-collection", FeeCollectionRoutes);
app.use("/api/vehicle", VehicleRoutes);
app.use("/api/household-history", HouseholdHistoryRoutes);
app.use("/api/temporary-absence", TemporaryAbsenceRoutes);
app.use("/api/temporary-residence", TemporaryResidenceRoutes);
app.use("/api/statistics", StatisticsRoutes);
app.use("/api/household-history", HouseholdHistoryRoutes);
app.use("/api/temporary-absence", TemporaryAbsenceRoutes);
app.use("/api/temporary-residence", TemporaryResidenceRoutes);
app.use("/api/statistics", StatisticsRoutes);

// Khởi động server
(async () => {
  try {
    // Tạo người dùng mặc định
    await createDefaultUser();

    app.listen(PORT, () => {
      console.log(`✅ Server đang chạy tại http://localhost:${PORT}`);
      console.log(`📚 Swagger UI: http://localhost:${PORT}/api-docs`);
      console.log(`🔧 Môi trường: ${process.env.NODE_ENV || 'development'}`);
    });
  } catch (error) {
    console.error("❌ Lỗi khởi động server:", error);
  }
})();