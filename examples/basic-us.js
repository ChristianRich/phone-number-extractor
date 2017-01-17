const extractor = require('../lib/extractor');

extractor.getCandidates(
    'Private or shared furnished rooms in Jersey city.Approx 10-25 mins to World Trade or Midtown.Steps from bus or walk to train.Weekly rent is $100 for shared,$150 private or $225 for double occupancy.Couples welcome.Shared bath and kitchen.Originally an Airbnb rental for a few years.Safe area,next to laundry,food,shopping,bank,ATM,restaurant,mall etc.Steps from bus stop or walk to train.one and a half week refundable deposit. Contact Jack 201 344 7358.',
    'US'
)

.then(function(res){
    console.log(res); // [ '2013447358' ]
})

.catch(function(err){
    throw err;
});
