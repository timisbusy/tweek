# tweek


Adds inactivity events to node.js stream objects.
![alt text](http://images.wikia.com/southpark/it/images/3/36/Tweek.JPG "Tweek")


## install
```
  npm install tweek
```
## use
```
  var Tweek = require('tweek');

  var myStream = createMyAmazingStream();

  var options = { patience: 5000, checkInterval: 2000 };
  
  new Tweek(myStream, options);
  
  myStream.on('tweek', function (tweek) {
    console.log('tweeked this many times: ', tweek.n);
  });
```

This will check every 2 seconds to see that the stream has not been inactive for more than 5 seconds.

## supertweek, supertweek

You can also set up a second tweek on your stream (if you want to say, send an email on your first tweek, and try reconnecting after a longer period). Adding to the above:
```
  var options2 = { patience: 25000, checkInterval: 10000, emitEvent: 'supertweek' }
  new Tweek(myStream, options2);
  
  myStream.on('supertweek', function (tweek) {
    console.log('superTweeeeeeeek!');
  });
```
## optional parameters

You can use the following in your options object:

### patience (ms)

How much inactivity can this tweek handle? (default: 3000)

### checkInterval (ms)

How often does this tweek check for new activity? (default: 1000)

### maxTweeks (int)

How many tweeks should we send you? (default: 5)

### emitEvent

What event should I fire? (default: 'tweek')

### listenForEvent

What event should I listen for? Allows for non-stream event emitters. (default: 'data')

### verbosity

Should I log a bunch of stuff about what I'm doing? (default: 0, ie. No. Please no logs.)