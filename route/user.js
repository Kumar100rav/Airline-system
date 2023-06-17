import express from 'express';
import passport from 'passport';

import User from '../model/user.js';

const router = express.Router();

// User login page
router.get('/login', (req, res) => {
  res.render('login', { message: req.flash('error') });
});

// User login
router.post('/login', passport.authenticate('local', {
  successRedirect: '/user/bookings',
  failureRedirect: '/user/login',
  failureFlash: true,
}));

// User registration page
router.get('/register', (req, res) => {
  res.render('register', { message: req.flash('error') });
});

// User registration
router.post('/register', async (req, res) => {
  try {
    const user = new User({
      username: req.body.username,
      password: req.body.password,
    });
    await user.save();
    res.redirect('/user/login');
  } catch (error) {
    req.flash('error', 'Failed to register. Please try again.');
    res.redirect('/user/register');
  }
});

// User bookings page
router.get('/bookings', (req, res) => {
  // Retrieve and render the user's bookings
  // Replace with your code
});

// User logout
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/user/login');
});

export default router;
