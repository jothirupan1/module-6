const express= require('express');
const { default: mongoose } = require('mongoose');

const usersSchema = new mongoose.Schema({
    name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['admin', 'passenger'],
    default: 'passenger'
  }
})

const Userdetails = mongoose.model('Userdetail',usersSchema);
module.exports=Userdetails;