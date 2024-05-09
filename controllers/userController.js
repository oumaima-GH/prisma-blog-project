const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "Failed to fetch users" });
    }
}

// Get user by ID
const getUserById = async (req, res) => {
    const userId = parseInt(req.params.userId);
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: userId,
            },
        });
        res.status(200).json(user);
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ error: "Failed to fetch user" });
    }
}

// Create user
const createUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password,
                role,
            },
        });
        res.status(201).json(user);
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ error: "Failed to create user" });
    }
}

// Update user by ID
const updateUser = async (req, res) => {
    const userId = parseInt(req.params.userId);
    try {
        const { name, email, password, role } = req.body;
        const updatedUser = await prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                name,
                email,
                password,
                role,
            },
        });
        res.status(200).json(updatedUser);
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ error: "Failed to update user" });
    }
}

// Delete user by ID
const deleteUser = async (req, res) => {
    const userId = parseInt(req.params.userId);
    try {
        await prisma.user.delete({
            where: {
                id: userId,
            },
        });
        res.status(204).send(); 
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ error: "Failed to delete user" });
    }
}

module.exports = { getAllUsers, getUserById, createUser, updateUser, deleteUser };