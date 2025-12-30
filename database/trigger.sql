USE Quan_ly_thu_phi;

DELIMITER $$

/* Khi thay đổi HouseholdHead, cập nhật tên trong Residents */
CREATE TRIGGER trg_update_household_head
AFTER UPDATE ON Households
FOR EACH ROW
BEGIN
  IF NEW.HouseholdHead <> OLD.HouseholdHead THEN
    UPDATE Residents
    SET FullName = NEW.HouseholdHead
    WHERE HouseholdID = NEW.HouseholdID
      AND Relationship = 'Chủ hộ';
  END IF;
END$$

DELIMITER;