const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
// const dotenv = require('dotenv');
// dotenv.config();

const prisma = new PrismaClient();

const register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        const existingUser = await prisma.user.findUnique({
            where: { email }
        });

        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role
            }
        });

        const token = jwt.sign({ userId: user.id, role: user.role }, 'SECRET_KEY', { expiresIn: '24h' });

        res.status(201).json({ token, user });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ error: "Failed to register user", message: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await prisma.user.findUnique({
            where: { email }
        });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        const token = jwt.sign({ userId: user.id, role: user.role }, 'SECRET_KEY', { expiresIn: '24h' });

        // res.status(200).json({ token, user });
        res.status(200).json({
            message: 'logged in successfully',
            token
        })
    } catch (error) {
        console.error("Error logging in user:", error);
        res.status(500).json({ error: "Failed to login user", message: error.message });
    }
};

module.exports = { register, login };
