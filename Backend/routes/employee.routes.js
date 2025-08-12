import express from 'express';
import {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
  getEmployeesByCompanyId
} from '../controllers/employee.controller.js';
import { upload } from '../middleware/multer.middleware.js';

const router = express.Router();

router.route("/").post(
  upload.fields([
    { name: "avatar", maxCount: 1 },
  ]),
  createEmployee);
router.get('/', getAllEmployees);
router.get('/:id', getEmployeeById);
router.put('/:id', updateEmployee);
router.delete('/:id', deleteEmployee);
router.get('/company/:companyId', getEmployeesByCompanyId);

export default router;
