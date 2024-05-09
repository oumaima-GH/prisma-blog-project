const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get all articles
const getAllArticles = async (req, res) => {
    try {
        const articles = await prisma.article.findMany();
        res.status(200).json(articles);
    } catch (error) {
        console.error("Error fetching articles:", error);
        res.status(500).json({ error: "Failed to fetch articles" });
    }
}

// Get article by ID
const getArticleById = async (req, res) => {
    const articleId = parseInt(req.params.articleId);
    try {
        const article = await prisma.article.findUnique({
            where: {
                id: articleId,
            },
        });
        res.status(200).json(article);
    } catch (error) {
        console.error("Error fetching article:", error);
        res.status(500).json({ error: "Failed to fetch article" });
    }
}

// Create article
const createArticle = async (req, res) => {
    try {
        const { title, content, image, role, userId } = req.body;

        const existingUser = await prisma.user.findUnique({
            where: {
                id: parseInt(userId)
            }
        });

        if (!existingUser) {
            return res.status(404).json({ error: "User not found" });
        }

        const article = await prisma.article.create({
            data: {
                title,
                content,
                image,
                role,
                authorId: parseInt(userId),
            }
        });

        res.status(201).json(article);
    } catch (error) {
        console.error("Error creating article:", error);
        res.status(500).json({ error: "Failed to create article" });
    }
}

// Update article by ID
const updateArticle = async (req, res) => {
    const articleId = parseInt(req.params.articleId);
    try {
        const { title, content, image, role } = req.body;
        const updatedArticle = await prisma.article.update({
            where: {
                id: articleId,
            },
            data: {
                title,
                content,
                image,
                role,
            },
        });
        res.status(200).json(updatedArticle);
    } catch (error) {
        console.error("Error updating article:", error);
        res.status(500).json({ error: "Failed to update article" });
    }
}

// Delete article by ID
const deleteArticle = async (req, res) => {
    const articleId = parseInt(req.params.articleId);
    try {
        await prisma.article.delete({
            where: {
                id: articleId,
            },
        });
        res.status(204).send(); 
    } catch (error) {
        console.error("Error deleting article:", error);
        res.status(500).json({ error: "Failed to delete article" });
    }
}

module.exports = { getAllArticles, getArticleById, createArticle, updateArticle, deleteArticle };
