import express from 'express'
import upload from '../middlewares/Multer.js';
import { addDoctor, loginAdmin, allDoctors, appointmentsAdmin, appointmentCancel, adminDashboard } from '../controllers/AdminController.js';
import { changeAvailability } from '../controllers/DoctorController.js';
import authAdmin from '../middlewares/authmiddleware.js';

const adminRouter = express.Router();


adminRouter.post('/add-doctor', authAdmin, upload.single('image'), addDoctor)
adminRouter.post('/login', loginAdmin)
adminRouter.post('/all-doctors', authAdmin, allDoctors);
adminRouter.post('/change-availablity', authAdmin, changeAvailability);
adminRouter.get('/appointments', authAdmin, appointmentsAdmin)
adminRouter.post('/cancel-appointment', authAdmin, appointmentCancel)
adminRouter.get('/dashboard', authAdmin, adminDashboard)

export default adminRouter