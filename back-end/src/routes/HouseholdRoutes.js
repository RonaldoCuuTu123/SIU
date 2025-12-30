import express from 'express';
import * as householdController from '../controllers/HouseholdController.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Households
 *     description: Quản lý hộ gia đình
 */

/**
 * @swagger
 * /api/households/get-all-households:
 *   get:
 *     summary: Lấy danh sách tất cả hộ gia đình
 *     tags: [Households]
 *     responses:
 *       200:
 *         description: Thành công
 */
router.get('/get-all-households', householdController.getAllHouseholds);

/**
 * @swagger
 * /api/households/create-household:
 *   post:
 *     summary: Tạo hộ gia đình mới
 *     tags: [Households]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               RoomNumber:
 *                 type: string
 *               Type:
 *                 type: string
 *                 enum: [Đơn, Đôi]
 *               HouseholdHead:
 *                 type: string
 *               Members:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Tạo thành công
 */
router.post('/create-household', householdController.createHousehold);

router.get('/get-household-by-id/:id', householdController.getHouseholdById);
router.put('/update-household/:id', householdController.updateHousehold);
router.delete('/delete-household/:id', householdController.deleteHousehold);
router.post('/find-household-by-room-number', householdController.findHouseholdByRoomNumber);


/**
 * @swagger
 * /api/households/split-household:
 *   post:
 *     summary: Tách hộ khẩu
 *     tags: [Households]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               originalHouseholdId:
 *                 type: integer
 *                 description: ID hộ gốc
 *               newRoomNumber:
 *                 type: string
 *                 description: Số phòng mới
 *               newHouseholdHead:
 *                 type: string
 *                 description: Tên chủ hộ mới
 *               residentIds:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 description: Danh sách ID cư dân chuyển sang hộ mới
 *               Notes:
 *                 type: string
 *     responses:
 *       201:
 *         description: Tách hộ thành công
 */
router.post('/split-household', householdController.splitHousehold);

// ============================================
export default router;