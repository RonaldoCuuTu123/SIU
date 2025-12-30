import Household from "../models/Household.js";

//CRUD household
export const getAllHouseholds = async () => {
  return await Household.findAll();
};

export const getHouseholdById = async (id) => {
  return await Household.findByPk(id);
};

export const createHousehold = async (householdData) => {
  return await Household.create(householdData);
};

export const updateHousehold = async (id, updateData) => {
  const household = await Household.findByPk(id);
  if (!household) return null;
  await household.update(updateData);
  return household;
};

export const deleteHousehold = async (id) => {
  const household = await Household.findByPk(id);
  if (!household) return null;
  await household.destroy();
  return true;
};

export const findHouseholdByRoomNumber = async (roomNumber) => {
  return await Household.findOne({ where: { RoomNumber: roomNumber } });
};

import sequelize from "../config/dbsetup.js";
import HouseholdHistory from "../models/HouseholdHistory.js";
import Resident from "../models/Resident.js";

export const splitHousehold = async (originalHouseholdId, newRoomNumber, newHouseholdHead, residentIds, Notes) => {
  const transaction = await sequelize.transaction();

  try {
    const originalHousehold = await Household.findByPk(originalHouseholdId);
    if (!originalHousehold) {
      throw new Error('Không tìm thấy hộ gốc');
    }

    // Tạo hộ mới
    const newHousehold = await Household.create({
      RoomNumber: newRoomNumber,
      Street: originalHousehold.Street,
      Ward: originalHousehold.Ward,
      District: originalHousehold.District,
      Type: originalHousehold.Type,
      HouseholdHead: newHouseholdHead,
      Members: residentIds.length,
      Notes: Notes || `Tách từ hộ ${originalHousehold.RoomNumber}`
    }, { transaction });

    // Chuyển cư dân
    await Resident.update(
      { HouseholdID: newHousehold.HouseholdID },
      {
        where: { ResidentID: residentIds },
        transaction
      }
    );

    // Cập nhật số thành viên hộ gốc
    const remainingMembers = await Resident.count({
      where: { HouseholdID: originalHouseholdId }
    });

    await originalHousehold.update(
      { Members: remainingMembers },
      { transaction }
    );

    // Ghi lịch sử
    await HouseholdHistory.create({
      HouseholdID: originalHouseholdId,
      ChangeType: 'Thay đổi thông tin khác',
      ChangeContent: `Tách hộ thành hộ mới ${newRoomNumber}`,
      ChangeDate: new Date(),
      Notes: `${residentIds.length} thành viên được chuyển sang hộ mới`
    }, { transaction });

    await transaction.commit();
    return newHousehold;

  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};