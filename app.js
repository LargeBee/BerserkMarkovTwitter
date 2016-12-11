var TwitterPackage = require('twitter');
var MarkovChain = require('markovchain');
var fs = require('fs');
var quotes = new MarkovChain(fs.readFileSync('./quotes.txt', 'utf8'));
var chainSize;

var min = 10;
var max = 20;
var minutes = 10;

var useUpperCase = function(wordList) {
  var tmpList = Object.keys(wordList).filter(function(word) {
    return word[0] >= 'A' && word[0] <= 'Z'
  })
  return tmpList[~~(Math.random()*tmpList.length)]
}


the_interval = minutes * 60 * 1000;
setInterval(function() {
  console.log("Changing bio...");
  chainSize = Math.floor(Math.random()*(max-min+1)+min);
  var quote = quotes.start(useUpperCase).end(chainSize-1).process()
  Twitter.post('account/update_profile', {description: quote},  function(error){
    if(error){
      console.log(error);
    }
    console.log("New profile bio: " + quote)
  });
}, the_interval);

var secret = {
  consumer_key: 'consumer key',
  consumer_secret: 'consumer secret',
  access_token_key: 'token key',
  access_token_secret: 'token secret'
}
var Twitter = new TwitterPackage(secret);
var recieveName;


Twitter.stream('statuses/filter', {track: '#BerserkMarkov'}, function(stream) {
  console.log("READY")
  stream.on('data', function(tweet) {
    console.log("\nUser: @" + tweet.user.screen_name + "\nSent: " + tweet.text);
    recieveName = "@" + tweet.user.screen_name;
    chainSize = Math.floor(Math.random()*(max-min+1)+min);
    Twitter.post('statuses/update', {status: recieveName + ' ' + quotes.start(useUpperCase).end(chainSize-1).process()},  function(error, tweet, response){
      if(error){
        console.log(error);
      }
      console.log("Reply: " + tweet.text);
    });
  });

  stream.on('error', function(error) {
    console.log(error);
  });
});
