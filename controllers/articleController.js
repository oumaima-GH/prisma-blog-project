const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const path = require('path');

// Get all articles
const getAllArticles = async (req, res) => {
    try {
        const articles = await prisma.article.findMany({
            include: { author: true }
        });

        // Map through articles and construct image URLs
        const articlesWithImageURLs = articles.map(article => ({
            ...article,
            imageUrl: article.image ? path.join('/uploads', article.image) : null,
        }));

        res.status(200).json({
            status: 'success',
            count: articlesWithImageURLs.length,
            articles: articlesWithImageURLs
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
};

// Get article by ID
const getArticleById = async (req, res) => {
    const articleId = parseInt(req.params.articleId);
    try {
        const article = await prisma.article.findUnique({
            include: { author: true },
            where: { id: articleId },
        });
        if (!article) {
            return res.status(404).json({ status: 'fail', message: 'Article not found' });
        }
        // Construct image URL if image exists
        const imageUrl = article.image ? path.join('/uploads', article.image) : null;
        res.status(200).json({
            status: 'success',
            data: {
                ...article,
                imageUrl: imageUrl,
            }
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
};

// Create article
const createArticle = async (req, res) => {
    try {
      const { title, content } = req.body;
      const author = req.user;
  
     
      let image;
      if (req.file) {
        image = req.file.filename.replace(/\\/g, '/');
      }
  
      if (!title || !content || !author) {
        return res.status(400).json({
          status: 'fail',
          message: 'Title, content, and author are required',
        });
      }
  
      const newArticle = await prisma.article.create({
        data: {
          title,
          image,
          content,
          authorId: author.id,
        },
        include: { author: true, categories: true },
      });
  
      res.status(201).json({
        status: 'success',
        data: newArticle,
      });
    } catch (error) {
      res.status(400).json({
        status: 'fail',
        message: error.message,
      });
    }
  };
// Update article by ID
const updateArticle = async (req, res) => {
    const articleId = parseInt(req.params.articleId);
    try {
        const { title, content } = req.body;

        let image;
        if (req.file) {
            image = req.file.filename.replace(/\\/g, '/');
        }

        const updatedArticle = await prisma.article.update({
            where: { id: articleId },
            data: { title, content, image },
            include: { author: true, categories: true }
        });

        res.status(200).json({
            status: "success",
            data: updatedArticle
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message
        });
    }
}

// Delete article by ID
const deleteArticle = async (req, res) => {
    const articleId = parseInt(req.params.articleId);
    try {
        const deletedArticle = await prisma.article.delete({
            where: { id: articleId }
        });

        res.status(204).json({
            status: "success",
            data: deletedArticle
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message
        });
    }
}

module.exports = { getAllArticles, getArticleById, createArticle, updateArticle, deleteArticle };
