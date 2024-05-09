const router = require('express').Router();
const { getAllCategories, getCategoryById, createCategory, updateCategory, deleteCategory } = require('../controllers/categoryController');

//get all categories
router.route('/categories').get(getAllCategories).post(createCategory);

//get category by id
router.route('/categories/:categoryId').get(getCategoryById).put(updateCategory).delete(deleteCategory);

//create category
// router.post('/categories', createCategory);

module.exports = router;
