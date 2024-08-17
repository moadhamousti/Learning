const express = require('express');
const { requireAdmin } = require('../middlewares/auth'); // Import authentication middleware
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const authenticateUser = require('../middlewares/authenticateUser');
const router = express.Router();

// Fetch all users
router.get('/users', requireAdmin, async (req, res) => {
    try {
        const users = await User.find({}, 'name email isAdmin image'); // Fetch necessary fields
        res.json(users);
    } catch (err) {
        console.error('Error fetching users:', err);
        res.status(500).json({ error: 'Something went wrong' });
    }
});

// Fetch user count
router.get('/users/count', requireAdmin, async (req, res) => {
    try {
        const userCount = await User.countDocuments();
        res.json(userCount); // Return count
    } catch (err) {
        console.error('Error fetching user count:', err);
        res.status(500).json({ error: 'Something went wrong' });
    }
});

// Fetch user by ID
router.get('/users/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        console.error('Error fetching user:', err);
        res.status(500).json({ error: 'Something went wrong' });
    }
});

// Delete user by ID
router.delete('/users/:userId', requireAdmin, async (req, res) => {
    try {
        const userId = req.params.userId;
        const deletedUser = await User.findByIdAndDelete(userId);
        if (!deletedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({ message: 'User deleted successfully' });
    } catch (err) {
        console.error('Error deleting user:', err);
        res.status(500).json({ error: 'Something went wrong' });
    }
});

// Update user by ID
router.put('/users/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const { name, email, isAdmin, password, image } = req.body;

        const updateData = { name, email, isAdmin, image };

        if (password) {
            updateData.password = await bcrypt.hash(password, 10); // Hash password if provided
        }

        const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(updatedUser);
    } catch (err) {
        console.error('Error updating user:', err);
        res.status(500).json({ error: 'Something went wrong' });
    }
});

// Create a new user
router.post('/users', async (req, res) => {
    try {
        const { name, email, password, isAdmin, image } = req.body;

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ name, email, password: hashedPassword, isAdmin, image });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (err) {
        console.error('Error adding user:', err);
        res.status(500).json({ error: 'Failed to add user' });
    }
});

// Fetch current user
router.get('/user/me', authenticateUser, async (req, res) => {
    try {
        const userId = req.user.id; // Assuming req.user is populated by the authenticateToken middleware
        const user = await User.findById(userId).select('name email image'); // Select fields to return

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(user);
    } catch (err) {
        console.error('Error fetching current user:', err);
        res.status(500).json({ error: 'Something went wrong' });
    }
});


// Update current user by ID
router.put('/user/me', authenticateUser, async (req, res) => {
    try {
        const userId = req.user.id; // Get the user ID from the authenticated token
        const { name, email, image, password } = req.body;

        // Prepare fields for update
        const updateFields = {
            name,
            email,
            image
        };

        // Hash the password if provided
        if (password) {
            updateFields.password = await bcrypt.hash(password, 10);
        }

        // Find and update the user by ID
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            updateFields,
            { new: true } // Return the updated document
        ).select('name email image'); // Select only the fields you need

        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({ message: 'User updated successfully', user: updatedUser });
    } catch (err) {
        console.error('Error updating user:', err);
        res.status(500).json({ error: 'Server error' });
    }
});


router.put('/users/:email', async (req, res) => {
    try {
      const email = req.params.email;
      const { name, email: newEmail, image, password } = req.body;
  
      // Update user by email
      const updatedUser = await User.findOneAndUpdate(
        { email: email },
        {
          name: name, // Update with new name or keep the same
          email: newEmail, // Update with new email or keep the same
          image: image, // Update with new image or keep the same
          ...(password && { password: await bcrypt.hash(password, 10) }) // Hash password if provided
        },
        { new: true } // Return the updated user
      );
  
      if (!updatedUser) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      res.json({ message: 'User updated successfully', user: updatedUser });
    } catch (err) {
      console.error('Error updating user:', err);
      res.status(500).json({ error: 'Server error' });
    }
  });
  
  

module.exports = router;
