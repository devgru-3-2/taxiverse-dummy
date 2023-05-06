const mongoose = require("mongoose");

const CurrentRideSchema = new mongoose.Schema({
   username: { type: String },
   to: { type: String },
   from: { type: String },
   dist: { type: String },
   dura: { type: String },
   range: [{ type: Number }], // array of two numbers representing the lower limit and upper limit
   status: { type: String },
   bids: [{
      value: { type: Number },
      bidder: { type: String },
      vehicle: { type: String },
      vehicleNo: { type: String }
   }],
   finalBidder: { type: String },
   finalValue: { type: String },
   createdAt: { 
      type: Date, 
      default: Date.now, 
      get: (createdAt) => {
         const date = new Date(createdAt);
         const options = { timeZone: "Asia/Kolkata", hour12: false };
         return date.toLocaleString("en-US", options);
      }
   }
});

const CurrentRide = mongoose.model("CurrentRide", CurrentRideSchema);
module.exports = CurrentRide;
