import doctorModel from '../models/doctomodel.js';
import appointmentModel from '../models/appointmentmodel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const changeAvailability = async (req, res) => {
    try {
        const { docId } = req.params; // get from middleware
        const doctorData = await doctorModel.findById(docId);
        await doctorModel.findByIdAndUpdate(docId, { available: !doctorData.available });
        res.json({ success: true, message: "Availability changed" });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
};

const doctorList = async (req, res) => {
    try {
        const doctors = await doctorModel.find({}).select('-password -email');
        if (!doctors || doctors.length === 0) {
            return res.status(404).json({ success: false, message: "No doctor found" });
        }
        res.json({ success: true, doctors });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
};

// Doctor login
const loginDoctor = async (req, res) => {
    try {
        const { email, password } = req.body;
        const doctor = await doctorModel.findOne({ email });
        if (!doctor) return res.json({ success: false, message: "Invalid credentials" });

        const isMatch = await bcrypt.compare(password, doctor.password);
        if (!isMatch) return res.json({ success: false, message: "Invalid credentials" });

        const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET_KEY);
        res.json({ success: true, token });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
};

// Get doctor's appointments
const appointmentsDoctor = async (req, res) => {
    try {
        const { docId } = req.params;
        const appointments = await appointmentModel.find({ docId });
        res.json({ success: true, appointments });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
};

// Mark appointment complete
const appointmentComplete = async (req, res) => {
    try {
        const { docId } = req.params;
        const { appointmentId } = req.body;
        const appointmentData = await appointmentModel.findById(appointmentId);

        if (appointmentData && appointmentData.docId.toString() === docId) {
            await appointmentModel.findByIdAndUpdate(appointmentId, { isCompleted: true });
            return res.json({ success: true, message: "Appointment Completed" });
        }
        res.json({ success: false, message: "Mark Failed" });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
};

// Cancel appointment
const appointmentCancel = async (req, res) => {
    try {
        const { docId } = req.params;
        const { appointmentId } = req.body;
        const appointmentData = await appointmentModel.findById(appointmentId);

        if (appointmentData && appointmentData.docId.toString() === docId) {
            await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });
            return res.json({ success: true, message: "Appointment Cancelled" });
        }
        res.json({ success: false, message: "Cancel Failed" });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
};

// Doctor dashboard
const doctorDashboard = async (req, res) => {
    try {
        const { docId } = req.params;
        const appointments = await appointmentModel.find({ docId });

        let earnings = 0;
        appointments.forEach(item => {
            if (item.isCompleted || item.payment) earnings += item.amount;
        });

        const patients = [...new Set(appointments.map(item => item.userId.toString()))];

        const dashData = {
            earnings,
            appointments: appointments.length,
            patients: patients.length,
            latestAppointments: appointments.reverse().slice(0, 5)
        };

        res.json({ success: true, dashData });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
};

// Doctor profile
const doctorProfile = async (req, res) => {
    try {
        const { docId } = req.params;
        const profileData = await doctorModel.findById(docId).select('-password');
        res.json({ success: true, profileData });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
};

const updateDoctorProfile = async (req, res) => {
    try {
        const { docId } = req.params;
        const { fees, address, available } = req.body;
        await doctorModel.findByIdAndUpdate(docId, { fees, address, available });
        res.json({ success: true, message: "Profile Updated" });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
};

export {
    changeAvailability,
    doctorList,
    loginDoctor,
    appointmentsDoctor,
    appointmentComplete,
    appointmentCancel,
    doctorDashboard,
    doctorProfile,
    updateDoctorProfile
};
