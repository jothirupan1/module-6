import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Flights() {
  const [flights, setFlights] = useState([]);
  const [error, setError] = useState(null);
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState('');
  const navigate = useNavigate();

  const fetchFlights = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError("User not authenticated.");
        return;
      }

      let url = 'http://localhost:3001/flights';
      const query = [];
      if (from) query.push(`from=${from}`);
      if (to) query.push(`to=${to}`);
      if (query.length > 0) url += '?' + query.join('&');

      const res = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (Array.isArray(res.data)) {
        setFlights(res.data);
        setError(null);
      } else {
        setError("Unexpected response from server.");
        console.error("Expected array, got:", res.data);
      }
    } catch (err) {
      setError("Failed to fetch flights.");
      console.error("Error fetching flights:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchFlights();
  }, []);

  const handleBook = (flight) => {
    navigate('/book', { state: { flight } });
  };

  const handleSearch = () => {
    fetchFlights();
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Available Flights</h2>
{/* Search Filters */}
<div className="row mb-4">
  <div className="col">
    <div className="d-flex gap-3">
      <input
        type="text"
        placeholder="From"
        className="form-control"
        style={{ maxWidth: "200px" }}
        value={from}
        onChange={(e) => setFrom(e.target.value)}
      />

      <input
        type="text"
        placeholder="To"
        className="form-control"
        style={{ maxWidth: "200px" }}
        value={to}
        onChange={(e) => setTo(e.target.value)}
      />

      <button className="btn btn-primary" onClick={handleSearch}>
        Search Flights
      </button>
    </div>
  </div>
</div>



      {/* Error Display */}
      {error && <p className="text-danger text-center">{error}</p>}

      {/* Flight Cards */}
      {!error && flights.length === 0 ? (
        <p className="text-center">No flights available.</p>
      ) : (
        <div className="row">
          {flights.map((flight) => (
            <div className="col-md-4 mb-4" key={flight._id}>
              <div className="card h-100 border-0 shadow-lg flight-card">
                {flight.image && (
                  <img
                    src={flight.image}
                    alt={flight.flightName}
                    className="card-img-top rounded-top"
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                )}
                <div className="card-body">
                  <h5 className="card-title fw-bold text-primary">{flight.flightName}</h5>
                  <p className="card-text">
                    <strong>From:</strong> <span className="badge bg-secondary">{flight.from}</span>
                  </p>
                  <p className="card-text">
                    <strong>To:</strong> <span className="badge bg-secondary">{flight.to}</span>
                  </p>
                  <p className="card-text">
                    <strong>Date:</strong>{' '}
                    <span>{new Date(flight.journeyDateTime).toLocaleString()}</span>
                  </p>
                  <p className="card-text">
                    <strong>Price:</strong>{' '}
                    <span className="text-success fw-bold">₹{flight.price}</span>
                  </p>
                  <button
                    className="btn btn-outline-primary w-100 fw-semibold"
                    onClick={() => handleBook(flight)}
                  >
                    Book Now
                  </button>
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

export default Flights;
