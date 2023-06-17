import express from 'express';
const router = express.Router();

import Flight from '../model/flight.js';
import Booking from '../model/booking.js';

// Admin login page
router.get('/login', (req, res) => {
  res.render('adminLogin', { message: req.flash('error') });
});

// Admin login
router.post('/login', (req, res) => {
  // Authenticate the admin and redirect to the admin dashboard
  // Replace with your authentication logic
});

// Admin dashboard
router.get('/dashboard', async (req, res) => {
  try {
    const flights = await Flight.find();
    const bookings = await Booking.find();
    res.render('adminDashboard', { flights, bookings });
  } catch (error) {
    req.flash('error', 'An error occurred. Please try again.');
    res.redirect('/admin/login');
  }
});

// Admin add flight page
router.get('/add-flight', (req, res) => {
  res.render('addFlight', { message: req.flash('error') });
});

// Admin add flight
router.post('/add-flight', async (req, res) => {
  try {
    const flight = new Flight({
      flightNumber: req.body.flightNumber,
      date: req.body.date,
      time: req.body.time,
    });
    await flight.save();
    res.redirect('/admin/dashboard');
  } catch (error) {
    req.flash('error', 'An error occurred. Please try again.');
    res.redirect('/admin/add-flight');
  }
});

// Admin remove flight
router.post('/remove-flight', async (req, res) => {
  try {
    await Flight.deleteOne({ _id: req.body.flightId });
    res.redirect('/admin/dashboard');
  } catch (error) {
    req.flash('error', 'An error occurred. Please try again.');
    res.redirect('/admin/dashboard');
  }
});

export default router;
