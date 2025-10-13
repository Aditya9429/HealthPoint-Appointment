import express from 'express'
import cors from 'cors'
import connectDb from './config/db.js';
import connectcloudinary from './config/cloudinary.js';
import adminRouter from './router/AdminRouter.js';
import doctorRouter from './router/doctorroute.js';
import 'dotenv/config'
import userRouter from './router/userRoute.js';

const app = express();
const port = process.env.PORT || 4000
connectDb();
connectcloudinary()
app.use(express.json());
app.use(cors())
app.use('/api/admin', adminRouter)
app.use('/api/doctor', doctorRouter)
app.use('/api/user', userRouter);

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})