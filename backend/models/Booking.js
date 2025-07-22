const mongoose = require('mongoose');


const bookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Userdetail',
    required: true
  },
 flightId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "flights", 
  required: true
},
  journeyDate: {
    type: String,
    required: true
  },
  seats: {
    type: Number,
    required: true
  },
  status: {
  type: String,
  enum: ['pending', 'approved', 'rejected'],
  default: 'pending'
}

}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
