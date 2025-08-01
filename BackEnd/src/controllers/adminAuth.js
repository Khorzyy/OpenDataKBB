import Admin from '../models/Admin.js';
import jwt from 'jsonwebtoken';

export const loginAdmin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(401).json({ error: 'Admin tidak ditemukan' });
        }

        const isMatch = await admin.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Password salah' });
        }

        const token = jwt.sign(
            { id: admin._id, email: admin.email },
            process.env.JWT_SECRET,
            { expiresIn: '2h' }
        );

        res.json({ message: 'Login berhasil', token });
    } catch (err) {
        console.error('Login gagal:', err);
        res.status(500).json({ error: 'Terjadi kesalahan saat login' });
    }
};

export const registerAdmin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ error: 'Email sudah terdaftar' });
        }

        const newAdmin = new Admin({ email, password });
        await newAdmin.save();

        res.status(201).json({ message: 'Admin berhasil didaftarkan' });
    } catch (err) {
        console.error('Register gagal:', err);
        res.status(500).json({ error: 'Terjadi kesalahan saat registrasi' });
    }
};

