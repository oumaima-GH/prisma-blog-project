const router = require('express').Router();
const authMiddleware  = require('../middleware/authMiddleware');


const { getAllUsers, getUserById, createUser, updateUser, deleteUser } = require('../controllers/userController');

//get all users
router.route('/users').get( getAllUsers).post(createUser);

//get user by id
router.route('/users/:userId').get(getUserById).put(updateUser).delete(deleteUser);

module.exports = router;

