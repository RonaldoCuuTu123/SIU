import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import sequelize from "./src/config/dbsetup.js";
import { createDefaultUser } from "./src/utils/createDefaultUser.js";

// --- THÊM 2 DÒNG NÀY ---
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

// Model
import User from "./src/models/User.js";
import Household from "./src/models/Household.js";
import Vehicle from "./src/models/Vehicle.js";
import FeeCollection from "./src/models/FeeCollection.js";
import FeeDetail from "./src/models/FeeDetail.js";
import FeeType from "./src/models/FeeType.js";
import Resident from "./src/models/Resident.js";

// import routes
import UserRoutes from "./src/routes/UserRoutes.js";
import HouseholdRoutes from "./src/routes/HouseholdRoutes.js";
import ResidentRoutes from "./src/routes/ResidentRoutes.js";
import FeeTypeRoutes from "./src/routes/FeeTypeRoutes.js";
import FeeDetailRoutes from "./src/routes/FeeDetailRoutes.js";
import FeeCollectionRoutes from "./src/routes/FeeCollectionRoutes.js";
import VehicleRoutes from "./src/routes/VehicleRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// --- THÊM CẤU HÌNH SWAGGER TẠI ĐÂY ---
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'KTPM Project API',
      version: '1.0.0',
      description: 'Tài liệu API cho hệ thống quản lý chung cư',
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
      },
    ],
  },
  // Đường dẫn đến các file chứa route để Swagger quét thông tin
  apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
// ---------------------------------------

// Accepct all origins
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
  contentSecurityPolicy: false, // Tắt CSP để giao diện Swagger hiển thị đúng
}));
app.use(morgan("dev"));

// --- KÍCH HOẠT ROUTE SWAGGER TẠI ĐÂY ---
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Test route
app.get("/", (req, res) => {
  res.json({ data: "API is running..." });
});

// Routes
app.use("/api/users", UserRoutes);
app.use("/api/households", HouseholdRoutes);
app.use("/api/residents", ResidentRoutes);
app.use("/api/fee-type", FeeTypeRoutes);
app.use("/api/fee-detail", FeeDetailRoutes);
app.use("/api/fee-collection", FeeCollectionRoutes);
app.use("/api/vehicle", VehicleRoutes);

// Tạo bảng và chạy server
(async () => {
  try {
    // Tạo người dùng mặc định
    await createDefaultUser();

    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
      console.log(`Swagger UI available at http://localhost:${PORT}/api-docs`);
    });
  } catch (error) {
    console.error("Lỗi khởi động server:", error);
  }
})();