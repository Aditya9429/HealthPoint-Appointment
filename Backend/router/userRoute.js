import express from 'express'
import { registerUser, loginUser, getProfile, updateProfile, bookAppointment, listAppointment, cancelAppointment, paymentRazorpay, verifyRazorpay } from '../controllers/userController.js';
import authuser from '../middlewares/authuser.js';
import upload from '../middlewares/Multer.js';

const userRouter = express.Router();
userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/get-profile', authuser, getProfile)
userRouter.post('/update-profile', upload.single('image'), authuser, updateProfile)
userRouter.post('/book-appointment', authuser, bookAppointment);
userRouter.get('/appointments',authuser, listAppointment)
userRouter.post('/cancel-appointment', authuser,cancelAppointment);
userRouter.post('/payment-razorpay',authuser,paymentRazorpay)
userRouter.post('/verify-razorpay',authuser,verifyRazorpay)

export default userRouter