import express from 'express';
import { getWarehouseById, getWarehouses, registerWarehouse } from '../controllers/warehouseController';
import { uploadMultipleImages } from '../middleware/uploadMiddleware';

const router = express.Router();

// Here, uploadMultipleImages middleware will process the files before the controller
router.post('/register', uploadMultipleImages, registerWarehouse);
router.get('/', getWarehouses);
router.get('/:id', getWarehouseById);

export default router;