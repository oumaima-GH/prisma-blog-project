const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get all comments
const getAllComments = async (req, res) => {
    try {
        const comments = await prisma.comment.findMany();
        res.status(200).json(comments);
    } catch (error) {
        console.error("Error fetching comments:", error);
        res.status(500).json({ error: "Failed to fetch comments" });
    }
}

// Get comments by article ID
const getCommentsByArticleId = async (req, res) => {
    const articleId = parseInt(req.params.articleId);
    try {
        const comments = await prisma.comment.findMany({
            where: {
                articleId: articleId,
            },
        });
        res.status(200).json(comments);
    } catch (error) {
        console.error("Error fetching comments for article:", error);
        res.status(500).json({ error: "Failed to fetch comments for article" });
    }
}

// Create comment
const createComment = async (req, res) => {
    try {
        const { content, userId, articleId } = req.body;

        const existingUser = await prisma.user.findUnique({
            where: {
                id: parseInt(userId)
            }
        });

        if (!existingUser) {
            return res.status(404).json({ error: "User not found" });
        }

        const existingArticle = await prisma.article.findUnique({
            where: {
                id: parseInt(articleId)
            }
        });

        if (!existingArticle) {
            return res.status(404).json({ error: "Article not found" });
        }

        const comment = await prisma.comment.create({
            data: {
                content,
                userId: parseInt(userId),
                articleId: parseInt(articleId),
            }
        });

        res.status(201).json(comment);
    } catch (error) {
        console.error("Error creating comment:", error);
        res.status(500).json({ error: "Failed to create comment" });
    }
}

// Update comment
const updateComment = async (req, res) => {
    const commentId = parseInt(req.params.commentId);
    try {
        const { content } = req.body;
        const updatedComment = await prisma.comment.update({
            where: {
                id: commentId,
            },
            data: {
                content,
            },
        });
        res.status(200).json(updatedComment);
    } catch (error) {
        console.error("Error updating comment:", error);
        res.status(500).json({ error: "Failed to update comment" });
    }
}

// Delete comment
const deleteComment = async (req, res) => {
    const commentId = parseInt(req.params.commentId);
    try {
        await prisma.comment.delete({
            where: {
                id: commentId,
            },
        });
        res.status(204).send(); 
    } catch (error) {
        console.error("Error deleting comment:", error);
        res.status(500).json({ error: "Failed to delete comment" });
    }
}

module.exports = { getAllComments, getCommentsByArticleId, createComment, updateComment, deleteComment };
