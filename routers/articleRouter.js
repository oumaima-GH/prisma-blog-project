// const router = require('express').Router();
 


// const { getAllArticles, getArticleById, createArticle, updateArticle, deleteArticle } = require('../controllers/articleController');

// //get all articles
// router.route('/articles').get(getAllArticles).post(createArticle);

// //get article by id
// // router.get('/articles/:articleId', getArticleById);

// router.route('/articles/:articleId').get(getArticleById).put(updateArticle).delete(deleteArticle);

// // router.post('/articles', createArticle);

// module.exports = router;


const express = require('express');
// const multer = require('../middleware/multerMiddleware');
const { getAllArticles, getArticleById, createArticle, updateArticle, deleteArticle } = require('../controllers/articleController');
const upload = require('../middleware/multerMiddleware');

const router = express.Router();

router.get('/articles', getAllArticles);
router.get('/articles/:articleId', getArticleById);
router.post('/articles', upload.single('file'), createArticle);
router.patch('/articles/:articleId', upload.single('file'), updateArticle); 
router.delete('/articles/:articleId', deleteArticle);

module.exports = router;
