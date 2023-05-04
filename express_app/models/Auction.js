
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
   finalValue: { type: String }
});

const CurrentRide = mongoose.model("CurrentRide", CurrentRideSchema);
module.exports = CurrentRide;
