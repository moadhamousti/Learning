const express = require('express');
const router = express.Router();
const cors = require('cors');
const { registerUser, test, getProfile, logoutUser, loginUser } = require('../controllers/authCotroller');
const { isAuthenticated } = require('../middlewares/requireAuth');

//middleware
router.use(
    cors({
        credentials: true,
        origin: 'https://e-learning-rosy-sigma.vercel.app',
    })
);

// Routes
router.get('/', test)
router.post('/register', registerUser)
router.post('/login', isAuthenticated, loginUser)
router.get('/profile', getProfile)
router.post('/logout', logoutUser);


module.exports = {
    test,
    registerUser,
    loginUser,
    getProfile,
    logoutUser,
    getProfile
};

module.exports = router
