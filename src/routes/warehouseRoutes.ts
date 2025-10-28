import express from 'express';
import { registerWarehouse } from '../controllers/warehouseController';
import { uploadMultipleImages } from '../middleware/uploadMiddleware';

const router = express.Router();

// Here, uploadMultipleImages middleware will process the files before the controller
router.post('/register', uploadMultipleImages, registerWarehouse);

export default router;