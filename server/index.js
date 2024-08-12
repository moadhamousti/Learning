const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected...'))
.catch((err) => console.log('Database not connected', err));

// Middlewares
app.use(express.json({ limit: '50mb' })); // Increase payload limit
app.use(express.urlencoded({ limit: '50mb', extended: true })); // Increase payload limit
app.use(cookieParser());

// Configure CORS middleware
app.use(cors({
    origin: 'https://e-learning-rosy-sigma.vercel.app', // Replace with your frontend URL
    credentials: true // Allow credentials
}));

// Add debugging middleware
app.use((req, res, next) => {
    console.log('Incoming request:', req.method, req.url);
    console.log('Cookies:', req.cookies); // Log cookies for debugging
    next();
});

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/courses', require('./routes/coursesRoute'));
app.use('/api/form', require('./routes/formRoutes')); // Ensure this matches your API calls
app.use('/', require('./routes/dashboardRoutes'));
app.use('/api', require('./routes/userRoutes'));

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Server Error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
});

const port = process.env.PORT || 8000; // Use PORT from environment variables if available
app.listen(port, () => console.log(`Server is running on port ${port}`));
