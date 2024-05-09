const router = require('express').Router();

const { getAllComments, getCommentsByArticleId, createComment, updateComment, deleteComment } = require('../controllers/commentController');

router.route('/comments').get(getAllComments).post(createComment);

router.route('/comments/:articleId').get(getCommentsByArticleId).put(updateComment).delete(deleteComment);

module.exports = router;