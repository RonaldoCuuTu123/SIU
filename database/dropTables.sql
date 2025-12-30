-- ============================================
-- Script xóa tất cả bảng cũ
-- Chạy trước khi import schema mới
-- ============================================

USE Quan_ly_thu_phi;

-- Disable foreign key checks để có thể xóa theo thứ tự bất kỳ
SET FOREIGN_KEY_CHECKS = 0;

SET SQL_SAFE_UPDATES = 0;

-- Xóa tất cả các bảng nếu tồn tại (theo thứ tự dependency)
DROP TABLE IF EXISTS FeeDetails;

DROP TABLE IF EXISTS FeeCollections;

DROP TABLE IF EXISTS Vehicles;

DROP TABLE IF EXISTS TemporaryAbsence;

DROP TABLE IF EXISTS TemporaryResidence;

DROP TABLE IF EXISTS ResidentHistory;

DROP TABLE IF EXISTS HouseholdHistory;

DROP TABLE IF EXISTS Residents;

DROP TABLE IF EXISTS FeeTypes;

DROP TABLE IF EXISTS Households;

DROP TABLE IF EXISTS Users;

-- Enable foreign key checks lại
SET FOREIGN_KEY_CHECKS = 1;

SET SQL_SAFE_UPDATES = 1;

-- Xác nhận xóa thành công
SELECT "✓ Tất cả bảng cũ đã được xóa thành công!" AS Message;