import mongoose from 'mongoose';

const flightSchema = new mongoose.Schema({
  flightNumber: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
});

const Flight = mongoose.model('Flight', flightSchema);

export default Flight;
