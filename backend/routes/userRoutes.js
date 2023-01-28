const express = require('express');
const router = express.Router();

const authGuard = require('../middleware/auth');
const {
    getAllUsers,
    storeUser,
    loginUser,
    getProfile,
    getUserByEmail,
    updateUser
} = require('../controller/userController');

router.get('/', authGuard, getProfile); // i used an auth middleware here
router.post('/store-user', storeUser);
router.post('/login', loginUser);
router.get('/users', getAllUsers);
router.get('/users/:email', authGuard, getUserByEmail);
router.post('/update/:email', authGuard, updateUser)

module.exports = router;