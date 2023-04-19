function calculateFare(dist, locality) {
    const bf = 40; // Set the base fare to a constant value of 40
    let total_fare = 0;
  
    // Calculate the fare for the first kilometer
    total_fare = bf + cpk;
  
    // Check if the total fare is less than the minimum fare
    //if (total_fare < min_fare) {
      //total_fare = min_fare;
    //}
  
    // Set the cost per kilometer based on the distance
    if (dist <= 5) {
      cpk = 10;
    } else if (dist <= 10) {
      cpk = 8;
    } else if (dist <= 15) {
      cpk = 7;
    } else {
      cpk = 7;
    }
  
    // Calculate the total fare based on the distance and cost per kilometer
    total_fare += cpk * dist;
  
    // Adjust the fare based on locality
    if (locality === 'suburb') {
      total_fare *= 1.05; // Increase fare by 5%
    } else if (locality === 'countryside') {
      total_fare *= 0.95; // Decrease fare by 5%
    }
  
    // Calculate the price range based on a percentage of the calculated fare
    const upper_limit = total_fare * 1.2; // Set the upper limit to 120% of the calculated fare
    const price_range = [total_fare, upper_limit];
  
    // Return the optimal cost range as an array
    return price_range;
  }
    

  
  module.exports = {
    calculateFare
  };
  