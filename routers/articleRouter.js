const router = require('express').Router();


const { getAllArticles, getArticleById, createArticle, updateArticle, deleteArticle } = require('../controllers/articleController');

//get all articles
router.route('/articles').get(getAllArticles).post(createArticle);

//get article by id
// router.get('/articles/:articleId', getArticleById);

router.route('/articles/:articleId').get(getArticleById).put(updateArticle).delete(deleteArticle);

// router.post('/articles', createArticle);

module.exports = router;