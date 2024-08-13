const express = require('express');
const router = express.Router();
const cors = require('cors');
const { registerUser, test, getProfile, logoutUser, loginUser } = require('../controllers/authCotroller');
const { requireAuth } = require('../middlewares/requireAuth');

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
router.post('/login', requireAuth, loginUser); // This will block logged-in users from accessing login
router.get('/profile', requireAuth, getProfile); // Ensure profile is protected
router.post('/logout', requireAuth, logoutUser);


module.exports = {
    test,
    registerUser,
    loginUser,
    getProfile,
    logoutUser,
    getProfile
};

module.exports = router
