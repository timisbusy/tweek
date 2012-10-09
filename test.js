var Stream = require('stream').Stream,
    Tweek = require('./index');

var stream1 = new Stream();

stream1.writable = true;
stream1.readable = true;

stream1.write = function (data) {
  this.emit('data', data);
  this.emit('interaction', data);
  return true;
}

stream1.destroy = function () {
  clearInterval(this.interval);
  this.emit('end');
}

var tweek = new Tweek(stream1, { patience: 4000, checkInterval: 2000, listenForEvent: 'interaction' });

var tweek = new Tweek(stream1, { patience: 2000, checkInterval: 1000, emitEvent: 'supertweek' });

stream1.interval = setInterval(function () {
  var write = Math.random() > .8;
  if (write) {
    stream1.write('jam', 'utf8');
  }
}, 1000);

stream1.on('data', function (data) {
  console.log(data);
});

stream1.on('error', function (error) {
  console.log(error);
});

stream1.on('end', function () {
  console.log('ended');
});

stream1.on('tweek', function (tdata) {
  console.log('tweek!');
  console.log(tdata);
  if (tdata.n === 5) {
    stream1.destroy();
  }
});

stream1.on('supertweek', function (tdata) {
  console.log('super tweek');
  console.log(tdata);
});

stream1.on('untweek', function (tdata) {
  console.log('untweek');
  console.log(tdata);
});
