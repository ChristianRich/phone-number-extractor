# Phone number extractor

Extract phone numbers from arbitrary text.

Features:
- Extract multiple phone number formats across different countries
- Extract numbers with / without international prefixes (e.g 0061 and +61)
- Extract almost any imaginable format of valid phone numbers
- Extract obfuscated phone numbers
- Unit tested
- Examples enclosed

### Background
For a recent project I was asked to extract phone numbers from online adverts.
At first it seemed like a trivial task, but I soon realised that users write phone numbers in so many different ways it will make your head spin!
After researching local classified sites I literally found every possible combination imaginable - including with / without international prefix, number-to-letter substitution, intended obfuscation and varying block size.

My system attacks the problem by removing all non numeric characters, putting the numbers into an array, iterating through the array and applying regular expressions combined with manual detection rules that are applied per country.
This module does a great job of capturing a vast array of various formats of valid phone numbers while avoiding false positives.

## Examples

### Basic
Extraction from a single string
```js
var Extractor = require('phone-number-extractor');
var myText = "Air Conditioned, Power Steering, SUPER DOOPER LOW KLM's @ 78,238, SET AND FORGET REGO Until June 2016!!, Power Mirrors, Tinted Windows, Central Locking, CD Mp3/AUX/USB AM/FM Stereo, Bluetooth Connectivity, Partial Leather Interior, Dual SRS Air Bags, In Cabin Roll Bar, Rear Tow Bar Accessory, EFS Lift Kit Upgrade, Side Steps,  Added Essential Upgrades: - Shovel - Farm Jack - Sand Ladder - CB Radio (Oricom) - Brand New Mud Tyres with Sunraysia Rims - Dual Front ARB LED Spot Lights (2 x 185W) - Front Bull Bar - Full Length Top Luggage Rack - Fire Extinguisher - Rear Cabin Cage - Genuine Snorkel - Fuel Cans A STEAL at This Price! What a GEM! This Is a Must See!!! Immaculate Condition Inside & Out, Nothing To Spend!!!  Enquire Today!! DO NOT MISS OUT! We offer: *5 Year Unlimited Klms Warranty Plus 24/7 Roadside Service Australia Wide (terms & conditions apply) *100% clear title includes -No Accident History (no written off) -No Encumbrance Owing (no money owing) *Trades-Ins & Test Drive Available *Extended Trading Hours: Open 7 Days A Week: -Mon-Fri 9am - 5:30 pm -Sat 9am- 5pm -Sun 10am - 4pm (after hour appointments available) *Contact Us For On 0254 123 123 + click to reveal *Website: http://www.stevesautoworld.com.au *Find Us On Facebook & Like Our Page, https://www.facebook.com/steves.autoworld";

new Extractor(myText, 'au')
    .run(function(res){
        console.log(res); // [ '0254123123' ]
    });
```

### Async
 Async extraction from multiple strings
```js
var Extractor = require('phone-number-extractor')
    , async = require('async')
    , _ = require('lodash');

var text = [

    // First string
    "Air Conditioned, Power Steering, SUPER DOOPER LOW KLM's @ 78,238, SET AND FORGET REGO Until June 2016!!, Power Mirrors, Tinted Windows, Central Locking, CD Mp3/AUX/USB AM/FM Stereo, Bluetooth Connectivity, Partial Leather Interior, Dual SRS Air Bags, In Cabin Roll Bar, Rear Tow Bar Accessory, EFS Lift Kit Upgrade, Side Steps,  Added Essential Upgrades: - Shovel - Farm Jack - Sand Ladder - CB Radio (Oricom) - Brand New Mud Tyres with Sunraysia Rims - Dual Front ARB LED Spot Lights (2 x 185W) - Front Bull Bar - Full Length Top Luggage Rack - Fire Extinguisher - Rear Cabin Cage - Genuine Snorkel - Fuel Cans A STEAL at This Price! What a GEM! This Is a Must See!!! Immaculate Condition Inside & Out, Nothing To Spend!!!  Enquire Today!! DO NOT MISS OUT! We offer: *5 Year Unlimited Klms Warranty Plus 24/7 Roadside Service Australia Wide (terms & conditions apply) *100% clear title includes -No Accident History (no written off) -No Encumbrance Owing (no money owing) *Trades-Ins & Test Drive Available *Extended Trading Hours: Open 7 Days A Week: -Mon-Fri 9am - 5:30 pm -Sat 9am- 5pm -Sun 10am - 4pm (after hour appointments available) *Contact Us For On 0254 123 123 + click to reveal *Website: http://www.stevesautoworld.com.au *Find Us On Facebook & Like Our Page, https://www.facebook.com/steves.autoworld",
 
    // 2nd string
    "Sliding door, screen door and 2 windows. Pulled out of a granny flat. $200. Pick up Kambah. 0398 432 432 or 03-98 777-777",
 
    // 3rd string
    "Secure undercover car spaces available for long term rental. Access is by security fob 24⁄7. The space is in a high security complex on Campbell Street Surry Hills, a very short walk to Taylor Square, Bourke and Crown Streets. $370 per month. Call (04)34.432.112 between 9am and 5pm."
];

async.map(text, function(str, callback){

    // Create a new Extractor instance per string examined
    new Extractor(str, 'au')
        .run(function(res){
            callback(null, res);
        });

}, function(err, res){
    var results = _.flatten(res);
    console.log(results); // [ '0254123123', '0398432432', '0398777777', '0434432112' ]
});
```

Be aware that duplicates are not removed from the result. This is intentional and by design.
If you want to remove duplicates:
```js
    // In the callback
    var unique = _.unique(_.flatten(res));
```
### TODO
- Add support for more countries
  
### Installation
```sh
$ npm install phone-number-extractor
```

### Unit tests
Located in /test. To run:
```sh
npm test 
```

### Limitations
This software cannot capture every single combination imaginable. Especially number-to-letter substitution is difficult to detect e.g:
- O4!4.Ol2;341 (= 0414 012 341)

In my experience very few users write their phone number this way. From a programming point of view it would be possible to cover for edge cases like above, but I have chosen not to.

### Issues, bug reports
https://github.com/ChristianRich/phone-number-extractor/issues

### Homepage
https://github.com/ChristianRich/phone-number-extractor

### License
MIT
