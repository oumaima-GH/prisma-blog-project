const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "Failed to fetch users", message: error.message });
    }
}

// Get user by ID
const getUserById = async (req, res) => {
    const userId = parseInt(req.params.userId);
    if (isNaN(userId)) {
        return res.status(400).json({ error: "Invalid user ID" });
    }
    
    try {
        const user = await prisma.user.findUnique({
            where: { id: userId },
        });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ error: "Failed to fetch user", message: error.message });
    }
}

// Create user
const createUser = async (req, res) => {
    try {
        const { name, email, profilePicture, role, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ error: "Name, email, and password are required" });
        }
        const user = await prisma.user.create({
            data: { name, email, profilePicture, role, password },
        });
        res.status(201).json(user);
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ error: "Failed to create user", message: error.message });
    }
}

// Update user
const updateUser = async (req, res) => {
    const userId = parseInt(req.params.userId);
    if (isNaN(userId)) {
        return res.status(400).json({ error: "Invalid user ID" });
    }
    
    try {
        const { name, email, profilePicture, role } = req.body;
        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: { name, email, profilePicture, role },
        });
        res.status(200).json(updatedUser);
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ error: "Failed to update user", message: error.message });
    }
}

// Delete user
const deleteUser = async (req, res) => {
    const userId = parseInt(req.params.userId);
    if (isNaN(userId)) {
        return res.status(400).json({ error: "Invalid user ID" });
    }
    
    try {
        await prisma.user.delete({
            where: { id: userId },
        });
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ error: "Failed to delete user", message: error.message });
    }
}


module.exports = { getAllUsers, getUserById, createUser, updateUser, deleteUser };
