import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Admindashbord() {
  const [bookings, setBookings] = useState([]);


const updateStatus = async (id, action) => {
  try {
    const token = localStorage.getItem('token');
    await axios.put(`http://localhost:3001/admin/bookings/${id}/${action}`, {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // Refresh bookings
    setBookings((prev) =>
      prev.map((booking) =>
        booking._id === id ? { ...booking, status: action === 'approve' ? 'approved' : 'rejected' } : booking
      )
    );
  } catch (err) {
    console.error(`Failed to ${action} booking:`, err.response?.data || err.message);
  }
};


  useEffect(() => {
    const fetchAdminBookings = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:3001/admin/bookings', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBookings(res.data);
      } catch (err) {
        console.error('Failed to fetch admin bookings:', err.response?.data || err.message);
      }
    };

    fetchAdminBookings();
  }, []);

  return (
<div className="container my-5">
  <h2 className="text-center mb-4 text-primary">Admin Dashboard - All Bookings</h2>

  {bookings.length === 0 ? (
    <p className="text-center text-muted">No bookings available.</p>
  ) : (
    <div className="row">
      {bookings.map((booking) => (
        <div className="col-md-6 mb-4" key={booking._id}>
          <div className="card shadow-sm border-0 h-100 admin-booking-card">
            <div className="card-body">
              <h5 className="card-title text-dark mb-3">
                 Passenger: <span className="text-primary">{booking.userId?.name}</span>
              </h5>
              <p><strong>Email:</strong> {booking.userId?.email}</p>
              <hr />
              <p><strong> Flight:</strong> {booking.flightId?.flightName}</p>
              <p>
                <strong>From:</strong> <span className="badge bg-warning">{booking.flightId?.from}</span>{' '}
                <strong>To:</strong> <span className="badge bg-success">{booking.flightId?.to}</span>
              </p>
              <p><strong>Date:</strong> {booking.journeyDate}</p>
              <p><strong>Seats Booked:</strong> {booking.seats}</p>
              <p><strong>Price/Seat:</strong> ₹{booking.flightId?.price}</p>
              <p className="fw-bold text-success">
                Total: ₹{booking.seats * booking.flightId?.price}
              </p>
              <p>
  <strong>Status:</strong>{' '}
  <span className={`badge ${
    booking.status === 'approved' ? 'bg-success' :
    booking.status === 'rejected' ? 'bg-danger' : 'bg-secondary'
  }`}>
    {booking.status}
  </span>
</p>

{booking.status === 'pending' && (
  <div className="mt-3 d-flex gap-2">
    <button className="btn btn-success btn-sm" onClick={() => updateStatus(booking._id, 'approve')}>Approve</button>
    <button className="btn btn-danger btn-sm" onClick={() => updateStatus(booking._id, 'reject')}>Reject</button>
  </div>
)}

            </div>
          </div>
        </div>
      ))}
    </div>
  )}
</div>

  );
}

export default Admindashbord;
