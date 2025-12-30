import { DataTypes } from "sequelize";
import sequelize from "../config/dbsetup.js";

const Household = sequelize.define("Household", {
  HouseholdID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  RoomNumber: {
    type: DataTypes.STRING(20),
    allowNull: false,
    unique: true
  },
  Street: {
    type: DataTypes.STRING(100)
  },
  Ward: {
    type: DataTypes.STRING(50)
  },
  District: {
    type: DataTypes.STRING(50)
  },
  Type: {
    type: DataTypes.ENUM('Đơn', 'Đôi'),
    allowNull: false
  },
  HouseholdHead: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  Members: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  HasVehicle: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  Notes: {
    type: DataTypes.TEXT
  }
}, {
  tableName: "Households",
  timestamps: false
});

export default Household;