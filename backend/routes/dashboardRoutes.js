import express from 'express';
import {
  getDashboardStats,
  getEmployeeWorkload
} from '../controllers/dashboardController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// All routes require authentication
router.use(protect);

router.get('/stats', getDashboardStats);
router.get('/employee-workload', getEmployeeWorkload);

export default router;

