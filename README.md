# A Markov Chain Twitter Bot
I used to have a twitter bot that used this for berserk stuff but the quote file can be replaced with anything

## SETUP
Node.js must be installed on your system if it isn't go here [NodeJs](https://nodejs.org/en/)

Make sure all the packages are installed via command line
```
npm install twitter
npm install markovchain
```

Replace these keys with your own from the twitter api
```
var secret = {
  consumer_key: 'consumer key',
  consumer_secret: 'consumer secret',
  access_token_key: 'token key',
  access_token_secret: 'token secret'
}
```

Change the ``'./quotes.txt'`` to the path leading to your quotes file
```
var quotes = new MarkovChain(fs.readFileSync('./quotes.txt', 'utf8'));
```

You may want to edit these values to the desired effect
``min`` and ``max`` are the minimum and maximum number of words in the markov chain.
``minutes`` is the interval in which the bot updates it's bio to a markov chain
```
var min = 10;
var max = 20;
var minutes = 10;
```

Another value to edit is the hashtag the bot listens for, try and make it unique.
just change the ``#MarkovChain`` text to your desire
```
Twitter.stream('statuses/filter', {track: '#MarkovChain'}, function(stream) {
```

## USE
The bot should all be setup now, all you need to do is open command line to the directory ``app.js`` is in and do the command
```
node app.js
```
And now your bot should be up and running ready to make markov chains
