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

export default router;