# Phone number extractor

### Background
For a recent project I was asked to extract phone numbers from online adverts. Easy piecy I thought to my self!
Let's just use regular expressions and identify common patterns. I soon realised that users write phone numbers in so many different ways it will make your head spin!
After researcing local classified sites I literally found every possible combination imaginable - including number to letter substitution and intended obfuscation.
Some numbers included international prefixes which can also be written in quite a few different ways.

Here are some examples of how many ways a user could write the Australian mobile number 0430 123 456:

- 0430 123 456
- 430 123 456
- 043 123 456
- 0430123456 
- 00610430123 456 
- (04)301 234 56
- +61430123456
- 0430-123-456
- 04 30 12 34 45
- 0 4 3 0 1 2 3 4 4 5

Some users are obfuscating their phone numbers intentionally:

- O4;30;l23;456
- O;4;3;O;12;3;4;56
- O-4-3 O12-3;.;4;56.

And now consider that you will have to extract above numbers from arbitrary text strings like this one:

"Hello my name is Susan and I've had my own business since 2011. I'm 5 foot 9 and I make $200,000 per year and live in postcode 2027. Call me on 0434.123.456 between 9 and 5 and ask for a quote on my '1000 ways to succeed' book series"

To tackle this problem head on you need to use machine learning and entity extraction for natural language processing. 
There are a few projects and libraries out there. One is OpenNLP the other is the Stanford Natural Language Processing Group.

These projects are big and complex, not built in Node.js and as far as I can tell can't recognise phone numbers.
Also I was not interested in spending oodles of time fishing phone numbers from adverts.

This solution is built on removing non numerical characters from strings, iterating through the numbers and applying simple rules.
The system works well for most combinations.

Features:

- Extract phone numbers from arbitrary string
- Read most formats including intentionally obfuscated numbers
  
TODO:

- Add support for other countries
  
### Installation

```sh
$ npm install phone-number-extractor
```
  
# Examples


```js
    loaderItem.getResult().html()   
```

### Unit tests
Located in /test

To run the tests:
npm test 

### Limitations


License
----

MIT
