# Phone number extractor

Extract and match phone numbers from arbitrary text strings from e.g websites, forums posts and online classifieds. While we got a great library for international phone number validation and formatting e.g [Google libPhoneNumber](https://github.com/googlei18n/libphonenumber) my library is able to identify possible phone number candidates by examining free text of any length.

Features:
- Extract phone number candidates from free text
- Extract numbers with / without international prefixes (e.g +61)
- Detects almost any imaginable way of writing a phone number
- Detect obfuscated phone numbers
- Examples included
- Unit tested

### Background
For a recent project I was asked to extract phone numbers from online adverts.
At first it seemed like a trivial task, but I soon realised that users write phone numbers in so many different ways it will make your head spin!
After researching local classified sites I literally found every possible combination imaginable - including with / without international prefix, number-to-letter substitution, intended obfuscation, varying block size, brackets, spaces, dashes - you name it!
Easy for humans to recognise, but pretty hard for a computer.

My system attacks the problem by removing all non numeric characters from a string input, putting the numbers into an array, iterating through the array and applying regular expressions combined with specific detection rules.

This module does a great job of capturing a vast array of various formats of valid phone numbers while avoiding false positives (not quite true for US phone numbers, please read the "limitations" section below).

## Examples

Extract phone number candidates from a single string
```js
const extractor = require('phone-number-extractor');

extractor.getCandidates(
    "Air Conditioned, Power Steering, SUPER DOOPER LOW KLM's @ 78,238, SET AND FORGET REGO Until June 2016!!, Power Mirrors, Tinted Windows, Central Locking, CD Mp3/AUX/USB AM/FM Stereo, Bluetooth Connectivity, Partial Leather Interior, Dual SRS Air Bags, In Cabin Roll Bar, Rear Tow Bar Accessory, EFS Lift Kit Upgrade, Side Steps,  Added Essential Upgrades: - Shovel - Farm Jack - Sand Ladder - CB Radio (Oricom) - Brand New Mud Tyres with Sunraysia Rims - Dual Front ARB LED Spot Lights (2 x 185W) - Front Bull Bar - Full Length Top Luggage Rack - Fire Extinguisher - Rear Cabin Cage - Genuine Snorkel - Fuel Cans A STEAL at This Price! What a GEM! This Is a Must See!!! Immaculate Condition Inside & Out, Nothing To Spend!!!  Enquire Today!! DO NOT MISS OUT! We offer: *5 Year Unlimited Klms Warranty Plus 24/7 Roadside Service Australia Wide (terms & conditions apply) *100% clear title includes -No Accident History (no written off) -No Encumbrance Owing (no money owing) *Trades-Ins & Test Drive Available *Extended Trading Hours: Open 7 Days A Week: -Mon-Fri 9am - 5:30 pm -Sat 9am- 5pm -Sun 10am - 4pm (after hour appointments available) *Contact Us For On 0254 123 123 + click to reveal *Website: http://www.stevesautoworld.com.au *Find Us On Facebook & Like Our Page, https://www.facebook.com/steves.autoworld",
    'AU'
)

.then(function(res){
    console.log(res); // [ '0254123123' ]
})

.catch(function(err){
    throw err;
});
```

### Extract phone number candidates from multiple string
```js
const extractor = require('phone-number-extractor')
    , Promise = require('bluebird');

var texts = [
   "Air Conditioned, Power Steering, SUPER DOOPER LOW KLM's @ 78,238, SET AND FORGET REGO Until June 2016!!, Power Mirrors, Tinted Windows, Central Locking, CD Mp3/AUX/USB AM/FM Stereo, Bluetooth Connectivity, Partial Leather Interior, Dual SRS Air Bags, In Cabin Roll Bar, Rear Tow Bar Accessory, EFS Lift Kit Upgrade, Side Steps,  Added Essential Upgrades: - Shovel - Farm Jack - Sand Ladder - CB Radio (Oricom) - Brand New Mud Tyres with Sunraysia Rims - Dual Front ARB LED Spot Lights (2 x 185W) - Front Bull Bar - Full Length Top Luggage Rack - Fire Extinguisher - Rear Cabin Cage - Genuine Snorkel - Fuel Cans A STEAL at This Price! What a GEM! This Is a Must See!!! Immaculate Condition Inside & Out, Nothing To Spend!!!  Enquire Today!! DO NOT MISS OUT! We offer: *5 Year Unlimited Klms Warranty Plus 24/7 Roadside Service Australia Wide (terms & conditions apply) *100% clear title includes -No Accident History (no written off) -No Encumbrance Owing (no money owing) *Trades-Ins & Test Drive Available *Extended Trading Hours: Open 7 Days A Week: -Mon-Fri 9am - 5:30 pm -Sat 9am- 5pm -Sun 10am - 4pm (after hour appointments available) *Contact Us For On 0254 123 123 + click to reveal *Website: http://www.stevesautoworld.com.au *Find Us On Facebook & Like Our Page, https://www.facebook.com/steves.autoworld"
 , "Sliding door, screen door and 2 windows. Pulled out of a granny flat. $200. Pick up Kambah. 0398 432 432 or 03-98 777-777"
 , "Secure undercover car spaces available for long term rental. Access is by security fob 24⁄7. The space is in a high security complex on Campbell Street Surry Hills, a very short walk to Taylor Square, Bourke and Crown Streets. $370 per month. Call (04)34.432.112 between 9am and 5pm."
];

var tasks = [];

texts.forEach(function(text){
    tasks.push(
        extractor.getCandidates(text, 'AU')
    )
});

Promise.all(tasks)
    .spread(function(result1, result2, result3){
        console.log(result1); // [ '0254123123' ]
        console.log(result2); // [ '0398432432', '0398777777' ]
        console.log(result3); // [ '0434432112' ]
    })

    .catch(function(err){
        throw err;
    });
```

### Format results using [GoogleLibPhoneNumber](https://github.com/googlei18n/libphonenumber)
```js
const extractor = require('phone-number-extractor');

extractor.getCandidates(
    "Air Conditioned, Power Steering, SUPER DOOPER LOW KLM's @ 78,238, SET AND FORGET REGO Until June 2016!!, Power Mirrors, Tinted Windows, Central Locking, CD Mp3/AUX/USB AM/FM Stereo, Bluetooth Connectivity, Partial Leather Interior, Dual SRS Air Bags, In Cabin Roll Bar, Rear Tow Bar Accessory, EFS Lift Kit Upgrade, Side Steps,  Added Essential Upgrades: - Shovel - Farm Jack - Sand Ladder - CB Radio (Oricom) - Brand New Mud Tyres with Sunraysia Rims - Dual Front ARB LED Spot Lights (2 x 185W) - Front Bull Bar - Full Length Top Luggage Rack - Fire Extinguisher - Rear Cabin Cage - Genuine Snorkel - Fuel Cans A STEAL at This Price! What a GEM! This Is a Must See!!! Immaculate Condition Inside & Out, Nothing To Spend!!!  Enquire Today!! DO NOT MISS OUT! We offer: *5 Year Unlimited Klms Warranty Plus 24/7 Roadside Service Australia Wide (terms & conditions apply) *100% clear title includes -No Accident History (no written off) -No Encumbrance Owing (no money owing) *Trades-Ins & Test Drive Available *Extended Trading Hours: Open 7 Days A Week: -Mon-Fri 9am - 5:30 pm -Sat 9am- 5pm -Sun 10am - 4pm (after hour appointments available) *Contact Us For On 0254 123 123 + click to reveal *Website: http://www.stevesautoworld.com.au *Find Us On Facebook & Like Our Page, https://www.facebook.com/steves.autoworld",
    'AU',
    true // Set this param to true for advanced result formatting options
)

.then(function(res){
    console.log(res);
})

.catch(function(err){
    throw err;
});
```

This will produce:

```js
[
    {
        input: '0254123123',
        countryCode: 'AU',
        isPossibleNumber: true,
        isPossibleNumberWithReason: 'IS_POSSIBLE',
        isNumberValid: true,
        formatted: '(02) 5412 3123',
        national: '(02) 5412 3123',
        international: '+61 2 5412 3123'
    }
]
```

### TODO
- Add support for more countries (currently we got US, AU)
- Add support for business numbers (prefix 1300, 1800)

### Installation
```sh
$ npm install phone-number-extractor
```

### Unit tests
```sh
npm test 
```

### Limitations

- US phone numbers are difficult to distinguish from any other 10 digit number simply because of the large amount of US area codes (currently 343+)

- This software cannot capture every single combination imaginable. Especially number-to-letter substitution is difficult to detect e.g O4!4.Ol2;341 (= 0414 012 341). In my experience very few users write their phone number this way. From a programming point of view it would be possible to cover for edge cases like above, but I have chosen not to.

- Business numbers prefix 1300 and 1800 are currently not supported.

### Issues, bug reports
[https://github.com/ChristianRich/phone-number-extractor/issues](https://github.com/ChristianRich/phone-number-extractor/issues)

### Homepage
[https://github.com/ChristianRich/phone-number-extractor](https://github.com/ChristianRich/phone-number-extractor)

### My blog
[http://chrisrich.io](http://chrisrich.io)

### License
MIT
