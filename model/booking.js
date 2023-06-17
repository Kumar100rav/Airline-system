import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  username: { type: String, required: true },
  flightNumber: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
});

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;
