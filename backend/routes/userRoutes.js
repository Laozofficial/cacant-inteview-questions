const express = require('express');
const router = express.Router();

const authGuard = require('../middleware/auth');
const {
    getAllUsers,
    storeUser,
    loginUser,
    getProfile,
    getUserByEmail
} = require('../controller/userController');

router.get('/', authGuard, getProfile); // i used an auth middleware here
router.post('/store-user', storeUser);
router.post('/login', loginUser);
router.get('/users', getAllUsers);
router.get('/users/:email', authGuard, getUserByEmail);

module.exports = router;