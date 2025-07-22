import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './mybooking.css';

function Mybooking() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:3001/bookings', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBookings(res.data);
      } catch (err) {
        console.error('Failed to fetch bookings:', err.response?.data || err.message);
      }
    };

    fetchBookings();
  }, []);

  return (
  <div className="container my-5">
  <h2 className="text-center mb-4 text-success">My Bookings</h2>

  {bookings.length === 0 ? (
    <p className="text-center text-muted">No bookings found.</p>
  ) : (
    <div className="row">
      {bookings.map((booking) => (
        <div className="col-md-6 mb-4" key={booking._id}>
          <div className="card shadow-sm border-0 h-100 my-booking-card">
            {booking.flightId?.image && (
              <img
                src={booking.flightId.image}
                alt={booking.flightId.flightName}
                className="card-img-top"
                style={{ height: '200px', objectFit: 'cover', borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }}
              />
            )}
            <div className="card-body">
              <h5 className="card-title text-primary">{booking.flightId?.flightName}</h5>
              <p><strong>From:</strong> <span className="badge bg-warning">{booking.flightId?.from}</span></p>
              <p><strong>To:</strong> <span className="badge bg-success">{booking.flightId?.to}</span></p>
              <p><strong>Date:</strong> {booking.journeyDate}</p>
              <p><strong>Seats:</strong> {booking.seats}</p>
              <p><strong>Price/Seat:</strong> ₹{booking.flightId?.price}</p>
              <p className="fw-bold text-success">
                Total: ₹{booking.seats * booking.flightId?.price}
              </p>
              {booking.status === 'approved' && <p className="text-success">Your booking is confirmed!</p>}
{booking.status === 'rejected' && <p className="text-danger">Your booking was rejected.</p>}

            </div>
          </div>
        </div>
      ))}
    </div>
  )}
  
            <footer className="bg-light  py-4 mt-5">
      <div className="container">
        <div className="row justify-content-center align-items-center">
          <div className="col-md-6 text-center">
            <p className="mb-2">&copy; {new Date().getFullYear()} Flight360 All rights reserved.</p>
          
          </div>
        </div>
      </div>
    </footer>
</div>

  );
}

export default Mybooking;
