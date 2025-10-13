import validator from 'validator';
import bcrypt from 'bcrypt';
import { v2 as cloudinary } from 'cloudinary';
import doctorModal from '../models/doctomodel.js';
import jwt from 'jsonwebtoken';
import doctorModel from '../models/doctomodel.js';
import appointmentModel from '../models/appointmentmodel.js';
import userModel from '../models/UserModal.js';

async function addDoctor(req, res) {
  try {
    const { name, email, password, fees, address, about, experience, degree, speciality } = req.body;
    const imageFile = req.file;

    if (!name || !email || !password || !fees || !address || !about || !experience || !degree || !imageFile || !speciality) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format"
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password length must be at least 8 characters"
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
    const imageUrl = imageUpload.secure_url;


    const doctorData = {
      name,
      email,
      password: hashPassword,
      fees,
      address: JSON.parse(address),
      about,
      experience,
      degree,
      speciality,
      image: imageUrl,
      date: Date.now()
    };


    const newDoctor = await doctorModal.create(doctorData);

    return res.status(201).json({
      success: true,
      message: "Doctor added successfully",
      data: newDoctor
    });

  } catch (error) {
    console.error("Error in addDoctor:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
}

async function loginAdmin(req, res) {
  try {
    const { email, password } = req.body;

    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      const token = jwt.sign({ email }, process.env.JWT_SECRET_KEY, { expiresIn: "1d" });

      return res.status(200).json({
        success: true,
        message: "Login successful",
        token
      });
    }

    return res.status(401).json({
      success: false,
      message: "Invalid credentials"
    });

  } catch (error) {
    console.error("Error in loginAdmin:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
}

const allDoctors = async (req, res) => {
  try {
    const doctors = await doctorModal.find({}).select('-password')
    res.json({ success: true, doctors })
  }
  catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message })
  }
}

const appointmentsAdmin = async (req, res) => {
  try {
    const appointments = await appointmentModel
      .find({})
      .populate("docId", "name image speciality")
      .populate("userId", "name image age");

    if (!appointments || appointments.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No appointments found",
      });
    }

    res.status(200).json({
      success: true,
      appointments,
    });
  } catch (error) {
    console.error("Error fetching appointments:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


const appointmentCancel = async (req, res) => {
  try {

    const { appointmentId } = req.body;

    const appointmentData = await appointmentModel.findById(appointmentId, { cancelled: true });

    await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true })
    const { docId, slotDate, slotTime } = appointmentData
    const doctorData = await doctorModel.findById(docId)
    let slots_booked = doctorData.slots_booked;
    slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime)
    await doctorModel.findByIdAndUpdate(docId, { slots_booked })

    res.json({
      success: false,
      message: error.message
    })
  }
  catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message
    })
  }
}

const adminDashboard = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}) 
    const users = await userModel.find({});
    const appointments = await appointmentModel.find({});

    const dashData = {
      doctors: doctors.length,
      appointments: appointments.length,
      patients: users.length,
      latestAppointments: appointments.reverse().slice(0, 5),
    };

    res.json({ success: true, dashData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { addDoctor, loginAdmin, allDoctors, appointmentsAdmin, appointmentCancel, adminDashboard };
