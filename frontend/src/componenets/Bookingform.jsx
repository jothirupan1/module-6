import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Bookingform() {
  const location = useLocation();
  const navigate = useNavigate();
  const { flight } = location.state || {};

  const [journeyDate, setJourneyDate] = useState('');
  const [seats, setSeats] = useState(1);
  const [error, setError] = useState('');

  if (!flight) {
    return <p className="text-center text-danger mt-5">No flight selected.</p>;
  }

  const handleBooking = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Please log in to book a flight.');
        return;
      }

      const res = await axios.post(
        'http://localhost:3001/book',
        {
          flightId: flight._id,
          journeyDate,
          seats,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(' Flight booked successfully!');
      navigate('/mybooking');
    } catch (err) {
      console.error("Booking Error:", err.response?.data || err.message);
      setError(err.response?.data?.message || 'Failed to book flight.');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4 fw-bold">Book Your Flight</h2>

      <div className="card shadow p-4">
        <h4>{flight.flightName}</h4>
        <p>From: {flight.from}</p>
        <p>To: {flight.to}</p>
        <p>Date: {new Date(flight.journeyDateTime).toLocaleString()}</p>
        <p>Price: ₹{flight.price} per seat</p>

        <form onSubmit={handleBooking}>
          <div className="mb-3">
            <label className="form-label">Journey Date</label>
            <input
              type="date"
              className="form-control"
              value={journeyDate}
              onChange={(e) => setJourneyDate(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Number of Seats</label>
            <input
              type="number"
              className="form-control"
              value={seats}
              min={1}
              max={10}
             onChange={(e) => setSeats(parseInt(e.target.value))}

              required
            />
          </div>

          {error && <p className="text-danger">{error}</p>}

          <button type="submit" className="btn btn-primary w-100">Confirm Booking</button>
        </form>
      </div>
    </div>
  );
}

export default Bookingform;
