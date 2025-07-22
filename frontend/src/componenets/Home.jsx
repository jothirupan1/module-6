import React from 'react';
import { Link } from 'react-router-dom';
import "./Home.css";



function Home() {
  const name = localStorage.getItem("name");
  const role = localStorage.getItem("role");

  return (
  <div>
     <div className="banner">
     <div className="container pt-5 text-center">
      <h1 className="mb-4 text-light fw-bold pt-5">Welcome ,Explore the world together with us </h1>
      
      <div className="row justify-content-center">
        <div className="col-md-4 mb-3">
          <Link to="/flights" className="btn btn-primary w-100">
            View Flights
          </Link>
        </div>

        <div className="col-md-4 mb-3">
          <Link to="/bookings" className="btn btn-success w-100">
            My Bookings
          </Link>
        </div>

        {role === "admin" && (
          <div className="col-md-4 mb-3">
            <Link to="/Admindashbord" className="btn btn-warning w-100">
              Admin Dashboard
            </Link>
          </div>
        )}
      </div>
    </div>
   </div>
    
    <div className=" about pt-5">
       <div>
         <center>
             <h1>About Flight 360</h1>

          <p className=' mt-5 pt-5 para'>  Flight 360 is a next-generation airline company dedicated to transforming the way the world experiences air travel. With a strong commitment to safety, innovation, and customer satisfaction, we aim to provide seamless, affordable, and comfortable flying experiences across domestic and international routes. Backed by a team of aviation professionals and tech experts, Flight 360 blends cutting-edge technology with personalized service to ensure every journey is smooth from takeoff to landing. Whether you're flying for business or leisure, Flight 360 is here to elevate your travel experience—one flight at a time.</p>
      
         </center>

            <footer className="bg-dark py-4 mt-5">
      <div className="container">
        <div className="row justify-content-center align-items-center">
          <div className="col-md-6 text-center">
            <p className="mb-2">&copy; {new Date().getFullYear()} Flight360 All rights reserved.</p>
          
          </div>
        </div>
      </div>
    </footer>
          </div>
    </div>
  
    </div>
  );
}

export default Home;
