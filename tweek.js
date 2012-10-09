var events = require('events'),
    util = require('util');

function Tweek (stream, options) {
  var self = this;
  var defaults = {
    maxTweeks: 5,
    checkInterval: 1000,
    patience: 3000,
    emitEvent: 'tweek',
    listenForEvent: 'data'
  }
  this.options = options || {};

  this.options.maxTweeks = this.options.maxTweeks || defaults.maxTweeks;
  this.options.checkInterval = this.options.checkInterval || defaults.checkInterval;
  this.options.patience = this.options.patience || defaults.patience;
  this.options.emitEvent = this.options.emitEvent || defaults.emitEvent;
  this.options.listenForEvent = this.options.listenForEvent || defaults.listenForEvent;

  events.EventEmitter.call(this);

  this.stream = stream;
  this.tweeks = 0;
  this.lastActive = new Date();

  this.interval = setInterval(function () { self.runCheck() }, self.options.checkInterval);

  this.stream.on(this.options.listenForEvent, function () {
    self.activity();
  });

  this.stream.on('end', function () {
    clearInterval(self.interval);
  });
}

util.inherits(Tweek, events.EventEmitter);

Tweek.prototype.runCheck = function runCheck () {
  var now = new Date();
  if (now.valueOf() - this.lastActive.valueOf() > this.options.patience) {
    this.tweek();
  }
}

Tweek.prototype.activity = function activity () {
  this.lastActive = new Date();
  if (this.tweeks > 0) {
    this.untweek(this.tweeks);
    this.tweeks = 0;
  }
}

Tweek.prototype.tweek = function tweek () {
  this.tweeks++;
  if (this.tweeks <= this.options.maxTweeks) {
    this.stream.emit(this.options.emitEvent, { n: this.tweeks, lastActive: this.lastActive });
  }
}

Tweek.prototype.untweek = function untweek (n) {
  this.stream.emit('untweek', { n: n });
}

module.exports = Tweek;