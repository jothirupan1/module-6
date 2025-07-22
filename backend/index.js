const express =require('express');
const app=express();
app.use(express.json());

const mongoose =require('mongoose');
const jwt =require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cors =require('cors');
app.use(cors());

const dbconnection = require('./config/dbconnection');
const Users = require('./models/User');
const Flight = require('./models/Flight');
const Booking =require('./models/Booking')
const authorization = require('./midlleware/authorization');

const jwt_key='james';

app.post('/flights',authorization(['admin']),async(req,res)=>{
    try{
        const create = await Flight.create(req.body);
        res.status(201).json({message:"created"});
    }catch(err){
        console.error(err);
    }
})
app.post('/book', authorization(['passenger']), async (req, res) => {
  try {
    const { flightId, journeyDate, seats } = req.body;
    const userId = req.user?.id; 


    if (!flightId || !journeyDate || !seats || !userId) {
      return res.status(400).json({ message: "Missing booking info" });
    }

    const flightExists = await Flight.exists({ _id: flightId });
    if (!flightExists) {
      return res.status(404).json({ message: "Flight not found" });
    }

    const booking = await Booking.create({
      userId,
      flightId,
      journeyDate,
      seats,
    });

    res.status(201).json({ message: "Booking successful", booking });

  } catch (err) {
    console.error("Booking failed:", err.message);
    res.status(500).json({ message: "Booking failed" });
  }
});

app.get('/flights', authorization(['admin', 'passenger']), async (req, res) => {
  try {
    const { from, to, date } = req.query;
    const query = {};

    if (from) query.from = { $regex: from, $options: 'i' };
    if (to) query.to = { $regex: to, $options: 'i' };
  

    const flights = await Flight.find(query);
    res.status(200).json(flights);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching flights' });
  }
});

// Passenger's booking fetch
app.get('/bookings', authorization(['passenger']), async (req, res) => {
  try {
    const userId = req.user.id;

    const bookings = await Booking.find({ userId }).populate('flightId');
    res.status(200).json(bookings);
  } catch (err) {
    console.error("Fetch bookings failed:", err.message);
    res.status(500).json({ message: 'Failed to fetch bookings' });
  }
});


app.get('/admin/bookings', authorization(['admin']), async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('flightId')
      .populate('userId', 'name email');

    res.status(200).json(bookings);
  } catch (err) {
    console.error("Admin fetch bookings failed:", err);
    res.status(500).json({ message: 'Failed to fetch bookings' });
  }
});
// Approve booking
app.put('/admin/bookings/:id/approve', async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(req.params.id, { status: 'approved' }, { new: true });
    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: 'Failed to approve booking' });
  }
});

// Reject booking
app.put('/admin/bookings/:id/reject', async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(req.params.id, { status: 'rejected' }, { new: true });
    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: 'Failed to reject booking' });
  }
});





app.put('/flights/:id',authorization(['admin']),async(req,res)=>{
    try{
        const update = await Flight.findByIdAndUpdate(req.params.id ,req.body ,{new:true})
        res.status(201).json({message:"updated"})
    }
    catch(err){
        console.error(err);
    }
})

app.delete('/flights/:id',authorization(['admin']),async(req,res)=>{
    try{
        const remove = await Flight.findByIdAndDelete(req.params.id)
        res.status(200).json({message:"deleted"})
    }
    catch(err){
        console.log(err)
    }
})

app.post('/register', async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const existingUser = await Users.findOne({ email }); 

    if (existingUser) {
      return res.status(400).json({ message: "This email is already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new Users({
      name,
      email,
      password: hashedPassword,
      role,
    });

    await newUser.save();
    res.status(201).json({ message: "Registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Registration failed" });
  }
});


app.post('/login',async(req,res)=>{
    const {name,email,password}=req.body

    try{
        const user = await Users.findOne({ email });
        if(!user){
            return res.status(400).json({message:"You're not registerd "})
        }
        const checkpassword = await bcrypt.compare(password,user.password);
        if(!checkpassword){
            return res.status(400).json({message:"Incorrect password"})
        }
        const token= jwt.sign({usersId:user.id,role:user.role},
            jwt_key,{expiresIn:"1h"}
        )

        res.status(200).json({message:"logined successfully",token,role:user.role})
    }catch(err){
        console.error(err)
        res.status(400).json({message:"Login failed"})
    }
})

app.listen(3001,()=>{
    dbconnection();
    console.log('server is running bro')
})