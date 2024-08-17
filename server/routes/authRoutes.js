const express = require('express');
const router = express.Router();
const cors = require('cors');
const { registerUser, test, getProfile, logoutUser, loginUser } = require('../controllers/authCotroller');
const { isAuthenticated } = require('../middlewares/requireAuth');
const authMiddleware = require('../middlewares/authMiddleware');

//middleware
router.use(
    cors({
        credentials: true,
        origin: 'https://learning-cm37.onrender.com',
    })
);

// Routes
router.get('/', test)
router.post('/register', registerUser)
router.post('/login', isAuthenticated, loginUser)
router.get('/profile', authMiddleware, getProfile);
router.post('/logout', authMiddleware, logoutUser);


module.exports = {
    test,
    registerUser,
    loginUser,
    getProfile,
    logoutUser,
    getProfile
};

module.exports = router
