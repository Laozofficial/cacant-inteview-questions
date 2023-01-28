const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('./../models/userModel');
const {
    v4: uuidv4
} = require('uuid');
const generateToken = require('../utils/generateToken');


/*
    @get all users on the platform
*/
const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find();

    const response = {
        'successful': true,
        'data': users
    };
    res.status(200).json(response);
});

/*
    @get your own profile informatino
    guarded by an auth middleware
*/
const getProfile = asyncHandler(async (req, res) => {
    const profile = await User.findById(req.user.id);
    if (profile) {
        const response = {
            'status': 'successful',
            'user': profile
        };
        res.status(200).json(response);
    }
});


/*
    @register a new user
    @a post request
*/
const storeUser = asyncHandler(async (req, res) => {
    const {
        firstName,
        lastName,
        email,
        password
    } = req.body;

    if (!firstName || !lastName || !email || !password) {
        const response = {
            'error': 'Please fill in all required fields'
        };
        res.status(400).json(response);
    }

    const findUser = await User.findOne({
        email
    }); // check if user already exist on the db
    if (findUser) {
        const response = {
            'error': 'User already exist'
        };
        res.status(400).json(response);
    }

    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
        firstName: firstName,
        lastName: lastName,
        email: email,
        userId: uuidv4(),
        password: encryptedPassword
    });

    if (user) {
        const response = {
            'successful': 'true',
            'id': user._id,
            'uuid': user.uuid,
            'email': user.email,
            'firstName': user.firstName,
            'lastName': user.lastName
        };
        res.status(201).json(response);
    } else {
        const response = {
            'error': 'Invalid user submission'
        };
        res.status(400).json(response);
    }

});


/*
    @login a user and generate tokens
*/
const loginUser = asyncHandler(async (req, res) => {
    const {
        email,
        password
    } = req.body;
    const user = await User.findOne({
        email
    });

    if (user && (await bcrypt.compare(password, user.password))) {
        const response = {
            'successful': true,
            _id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            token: generateToken(user._id),
        };
        res.status(200).json(response);
    } else {
        const response = {
            'error': 'Invalid Credentials '
        };
        res.status(400).json(response);
    }
});

/*
    @get a single user information
*/
const getUserByEmail = asyncHandler(async (req, res) => {
    const email = req.params.email;
    const user = await User.findOne({
        email
    });

    if (user) {
        const response = {
            'successful': true,
            'data': user
        };

        res.status(200).json(response);
    }
    const response = {
        'successful': false,
        'error': 'cannot find user'
    };
    res.status(400).json(response);
});

module.exports = {
    getAllUsers,
    storeUser,
    loginUser,
    getProfile,
    getUserByEmail,
};