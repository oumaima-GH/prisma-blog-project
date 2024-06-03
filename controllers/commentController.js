// const { PrismaClient } = require('@prisma/client');
// const prisma = new PrismaClient();

// // Get all comments
// const getAllComments = async (req, res) => {
//     try {
//         const comments = await prisma.comment.findMany({
//             // relationLoadStrategy: "join",
//             include: { author: true, article: true }
//         });
//         res.status(200).json(comments);
//     } catch (error) {
//         console.error("Error fetching comments:", error);
//         res.status(500).json({ error: "Failed to fetch comments", message: error.message });
//     }
// }

// // Get comments by article ID
// const getCommentsByArticleId = async (req, res) => {
//     const articleId = parseInt(req.params.articleId);
//     try {
//         const comments = await prisma.comment.findMany({
//             include: { author: true, article: true },
//             where: {
//                 articleId: articleId,
//             },
//         });
//         res.status(200).json(comments);
//     } catch (error) {
//         console.error("Error fetching comments for article:", error);
//         res.status(500).json({ error: "Failed to fetch comments for article", message: error.message});
//     }
// }

// // Create comment
// const createComment = async (req, res) => {
//     try {
//         const { content, email, authorId, articleId } = req.body;

//         const existingUser = await prisma.user.findUnique({
//             where: {
//                 id: parseInt(authorId)
//             }
//         });

//         if (!existingUser) {
//             return res.status(404).json({ error: "User not found", message: error.message});
//         }

//         const existingArticle = await prisma.article.findUnique({
//             where: {
//                 id: parseInt(articleId)
//             }
//         });

//         if (!existingArticle) {
//             return res.status(404).json({ error: "Article not found", message: error.message});
//         }

//         const comment = await prisma.comment.create({
//             data: {
//                 content,
//                 email,
//                 authorId: parseInt(authorId),
//                 articleId: parseInt(articleId),
//             },
//             include: { author: true, article: true }
//         });

//         res.status(201).json(comment);
//     } catch (error) {
//         console.error("Error creating comment:", error);
//         res.status(500).json({ error: "Failed to create comment", message: error.message});
//     }
// }

// // Update comment
// const updateComment = async (req, res) => {
//     const commentId = parseInt(req.params.commentId);
//     try {
//         const { content } = req.body;
//         const updatedComment = await prisma.comment.update({
//             where: {
//                 id: commentId,
//             },
//             data: {
//                 content,
//             },
//         });
//         res.status(200).json(updatedComment);
//     } catch (error) {
//         console.error("Error updating comment:", error);
//         res.status(500).json({ error: "Failed to update comment", message: error.message});
//     }
// }

// // Delete comment
// const deleteComment = async (req, res) => {
//     const commentId = parseInt(req.params.commentId);
//     try {
//         await prisma.comment.delete({
//             where: {
//                 id: commentId,
//             },
//         });
//         res.status(204).send(); 
//     } catch (error) {
//         console.error("Error deleting comment:", error);
//         res.status(500).json({ error: "Failed to delete comment", message: error.message});
//     }
// }

// module.exports = { getAllComments, getCommentsByArticleId, createComment, updateComment, deleteComment };

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get all comments
const getAllComments = async (req, res) => {
    try {
        const comments = await prisma.comment.findMany({
            include: { author: true, article: true }
        });
        res.status(200).json(comments);
    } catch (error) {
        console.error("Error fetching comments:", error);
        res.status(500).json({ error: "Failed to fetch comments", message: error.message });
    }
}

// Get comments by article ID
const getCommentsByArticleId = async (req, res) => {
    const articleId = parseInt(req.params.articleId);
    try {
        const comments = await prisma.comment.findMany({
            include: { author: true, article: true },
            where: { articleId: articleId },
        });
        res.status(200).json(comments);
    } catch (error) {
        console.error("Error fetching comments for article:", error);
        res.status(500).json({ error: "Failed to fetch comments for article", message: error.message });
    }
}

// Create comment
const createComment = async (req, res) => {
    try {
        const { content, email, authorId, articleId } = req.body;

        const existingUser = await prisma.user.findUnique({
            where: { id: parseInt(authorId) }
        });

        if (!existingUser) {
            return res.status(404).json({ error: "User not found" });
        }

        const existingArticle = await prisma.article.findUnique({
            where: { id: parseInt(articleId) }
        });

        if (!existingArticle) {
            return res.status(404).json({ error: "Article not found" });
        }

        const comment = await prisma.comment.create({
            data: {
                content,
                email,
                authorId: parseInt(authorId),
                articleId: parseInt(articleId),
            },
            include: { author: true, article: true }
        });

        res.status(201).json(comment);
    } catch (error) {
        console.error("Error creating comment:", error);
        res.status(500).json({ error: "Failed to create comment", message: error.message });
    }
}

// Update comment
const updateComment = async (req, res) => {
    const commentId = parseInt(req.params.commentId);
    try {
        const { content } = req.body;
        const updatedComment = await prisma.comment.update({
            where: { id: commentId },
            data: { content },
        });
        res.status(200).json(updatedComment);
    } catch (error) {
        console.error("Error updating comment:", error);
        res.status(500).json({ error: "Failed to update comment", message: error.message });
    }
}

// Delete comment
const deleteComment = async (req, res) => {
    const commentId = parseInt(req.params.commentId);
    try {
        await prisma.comment.delete({
            where: { id: commentId },
        });
        res.status(200).json({ message: "Comment deleted successfully" });
    } catch (error) {
        console.error("Error deleting comment:", error);
        res.status(500).json({ error: "Failed to delete comment", message: error.message });
    }
}


module.exports = { getAllComments, getCommentsByArticleId, createComment, updateComment, deleteComment };
