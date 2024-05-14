const { PrismaClient } = require('@prisma/client');
const { join } = require('@prisma/client/runtime/library');
const prisma = new PrismaClient();

// Get all articles
const getAllArticles = async (req, res) => {
    try {
        const articles = await prisma.article.findMany(
            {
            //     relationLoadStrategy: "join",
                include: { users: true }
            }
        );
        
        res.status(200).json(articles);
    } catch (error) {
        console.error("Error fetching articles:", error);
        res.status(500).json({ error: "Failed to fetch articles", Message: error.message });
    }
}

// Get article by ID
const getArticleById = async (req, res) => {
    const articleId = parseInt(req.params.articleId);
    try {
        const article = await prisma.article.findUnique({
            include: { users: true },
            where: {
                id: articleId,
            },
        });
        res.status(200).json(article);
    } catch (error) {
        console.error("Error fetching article:", error);
        res.status(500).json({ error: "Failed to fetch article", message: error.message});
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
            return res.status(404).json({ error: "User not found", message: error.message});
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
        res.status(500).json({ error: "Failed to create article", message: error.message});
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
        res.status(500).json({ error: "Failed to update article", message: error.message});
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
        res.status(500).json({ error: "Failed to delete article", message: error.message});
    }
}

module.exports = { getAllArticles, getArticleById, createArticle, updateArticle, deleteArticle };
