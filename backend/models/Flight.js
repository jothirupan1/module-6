const express= require("express");
const { default: mongoose } = require("mongoose");

const flightschema = new mongoose.Schema({
     image:{
     type: String
    },

    flightNumber: {
    type: String,
    required: true,
    unique: true
  },
  flightName: {
    type: String,
    required: true
  },
  from: {
    type: String,
    required: true
  },
  to: {
    type: String,
    required: true
  },
  journeyDateTime: {
    type: Date,
    required: true
  },
  price: {
  type: Number,
    required: true

}

})

const Flight = mongoose.model('flights',flightschema);

module.exports=Flight;