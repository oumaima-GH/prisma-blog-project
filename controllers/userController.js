const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany({
            // relationLoadStrategy: "join",
            include: { articles: true, comments: true }
        });
        res.status(200).json({
            status: "success",
            data: users
        });
    } catch (error) {
       
        res.status(500).json({
             message: error.message,
             });
    }
}

// Get user by ID
const getUserById = async (req, res) => {
    const authorId = parseInt(req.params.authorId);
    try {
        const user = await prisma.user.findUnique({
            include: { article: true},
            where: {
                id: authorId,
            },
        });
        res.status(200).json(user);
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ error: "Failed to fetch user", message: error.message});
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
        res.status(500).json({ error: "Failed to create user", message: error.message});
    }
}

// Update user by ID
const updateUser = async (req, res) => {
    const authorId = parseInt(req.params.authorId);
    try {
        const { name, email, password, role } = req.body;
        const updatedUser = await prisma.user.update({
            where: {
                id: authorId,
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
        res.status(500).json({ error: "Failed to update user", message: error.message});
    }
}

// Delete user by ID
const deleteUser = async (req, res) => {
    const authorId = parseInt(req.params.authorIdId);
    try {
        await prisma.user.delete({
            where: {
                id: authorId,
            },
        });
        res.status(204).send(); 
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ error: "Failed to delete user", message: error.message});
    }
}

module.exports = { getAllUsers, getUserById, createUser, updateUser, deleteUser };
