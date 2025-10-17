import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/UserModal.js";
import doctorModel from "../models/doctomodel.js";
import e, { application } from "express";
import appointmentModel from "../models/appointmentmodel.js";
import Razorpay from 'razorpay';
import { v2 as cloudinary } from "cloudinary"


const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: "Missing details" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: "Enter a valid email" });
    }

    if (password.length < 8) {
      return res.status(400).json({ success: false, message: "Password must be at least 8 characters" });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "Email already registered" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel(
      {
        name,
        email,
        password: hashPassword
      });
    const user = await newUser.save();

    const token = jwt.sign({
      id: user._id
    },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1d" }
    );

    res.status(201).json({
      success: true,
      message: "Registration successful",
      token
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User doesn't exist"
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY);

    res.status(200).json({
      success: true,
      message: "Login Successfully",
      token
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};


const getProfile = async (req, res) => {
  try {
    const userId = req.user;
    const userData = await userModel.findById(userId).select('-password');

    res.json({
      success: true,
      userData
    })
  }
  catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error" + error.message
    });
  }
}

// const updateProfile = async (req, res) => {
//   try {
//     const userId = req.user;
//     const { name, phone, address, dob, gender } = req.body;
//     const imageFile = req.file;

//     if (!name || !phone || !address || !dob) {
//       return res.status(400).json({
//         success: false,
//         message: "Data missing"
//       })
//     }
//     await userModel.findByIdAndUpdate(userId, { name, phone, address: JSON.parse(address), dob, gender })
//     if (imageFile) {
//       const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: 'image' })
//       const imageURL = imageUpload.secure_url;
//       await userModel.findByIdAndDelete(userId, { image: imageURL })
//     }
//     res.status(200).json({
//       success: true,
//       message: "Profile Updated"
//     })

//   }
//   catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Server error" + error.message
//     })
//   }
// }
const updateProfile = async (req, res) => {
  try {
    const userId = req.user;
    const { name, phone, address, dob, gender } = req.body;
    const imageFile = req.file;

    if (!name || !phone || !address || !dob) {
      return res.status(400).json({ success: false, message: "Data missing" });
    }

    let updateData = {
      name,
      phone,
      address: JSON.parse(address),
      dob,
      gender
    };

    if (imageFile) {
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: 'image' });
      updateData.image = imageUpload.secure_url;
    }

    const updatedUser = await userModel.findByIdAndUpdate(userId, updateData, { new: true });

    res.status(200).json({
      success: true,
      message: "Profile Updated",
      userData: updatedUser
    });

  } catch (error) {
    res.status(500).json({ success: false, message: "Server error: " + error.message });
  }
};


const bookAppointment = async (req, res) => {
  try {
    const userId = req.user
    const { docId, slotDate, slotTime } = req.body;
    const docData = await doctorModel.findById(docId).select('-password');

    if (!docData.available) {
      return res.json({
        success: false,
        messgage: "Doctor not availabel"
      })
    }

    let slot_booked = docData.slot_booked;

    if (slot_booked[slotDate]) {
      if (slot_booked[slotDate].includes(slotTime)) {
        return res.json({
          success: false,
          messgage: "Slots not availabel"
        })
      }
      else {
        slot_booked[slotDate].push(slotTime)
      }
    } else {
      slot_booked[slotDate] = [];
      slot_booked[slotDate].push(slotTime)
    }
    const userData = await userModel.findById(userId).select('-password');
    delete docData.slot_booked

    const appointmentData = {
      userId,
      docId,
      userData,
      docData,
      amount: docData.fees,
      slotTime,
      slotDate,
      date: Date.now()
    }

    const newAppointment = new appointmentModel(appointmentData);
    await newAppointment.save()


    await doctorModel.findByIdAndUpdate(docId, { slot_booked });
    res.json({ success: true, message: 'Appointment Booked' })
  }
  catch (error) {
    res.json({
      success: false,
      message: error.message
    })
  }
}
const listAppointment = async (req, res) => {
  try {
    const userId = req.user;

    const appointments = await appointmentModel.find({ userId }) // latest first

    res.status(200).json({
      success: true,
      appointments
    });

  } catch (error) {
    res.json({
      success: false,
      message: error.message
    });
  }
};

const cancelAppointment = async (req, res) => {
  try {

    const userId = req.user;

    const { appointmentId } = req.body

    const appointmentData = await appointmentModel.findById(appointmentId);

    if (appointmentData.userId !== userId) {
      return res.json({
        success: false,
        message: "Unauthrozied action"
      })
    }
    await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true })

    const { docId, slotDate, slotTime } = appointmentData

    const doctorData = await doctorModel.findById(docId)

    let slot_booked = doctorData.slot_booked;

    slot_booked[slotDate] = slot_booked[slotDate].filter(e => e !== slotTime)

    await doctorModel.findByIdAndUpdate(docId, { slot_booked })

    res.json({
      success: true,
      message: "Appointment Cancelled"
    })
  }
  catch (error) {
    res.json({
      success: false,
      message: error.message
    })
  }
}

// const razorpayInstance = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET
// }
// )

// const paymentRazorpay = async (req, res) => {

//   try {
//     const appointmentId = req.user;
//     const appointmentData = await appointmentModel.findById(appointmentId);
//     if (!appointmentData || appointmentData.cancelled) {
//       return res.json({
//         success: false,
//         message: "Appointment Cancelled or not found "
//       })
//     }
//     const options = {
//       amount: appointmentData.amount * 100,
//       currency: process.env.CURRENCY,
//       recipet: appointmentId

//     }

//     const order = await razorpayInstance.orders.create(options);
//     res.json({
//       success: true,
//       order
//     })
//   }



//   catch (error) {
//     res.json({
//       success: false,
//       message: error.message
//     })
//   }
// }


//   const verifyRazorpay = async (req, res) => {
//     try {
//       const { razorpay_order_id } = req.body;
//       const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);

//       if (orderInfo.status === 'paid') {
//         await appointmentModel.findByIdAndUpdate(orderInfo.receipt, { payment: true })
//         res.json({
//           success: true,
//           message: "Payment Successfull"
//         })
//       } else {
//         res.json({
//           success: false,
//           message: "Payment failed"
//         })
//       }
//     }
//     catch (error) {
//       res.json({
//         success: false,
//         message: error.message
//       })
//     }
//   }

export { registerUser, loginUser, getProfile, updateProfile, bookAppointment, listAppointment, cancelAppointment };
