// Generated by CoffeeScript 1.3.3
var EventEmitter, default_max_listeners, isArray;

isArray = Array.isArray || function(obj) {
  return obj.constructor.toString().indexOf("Array") !== -1;
};

default_max_listeners = 10;

EventEmitter = (function() {

  function EventEmitter() {}

  EventEmitter.prototype.setMaxListeners = function(n) {
    return this._events.maxListeners = n;
  };

  EventEmitter.prototype.emit = function(type) {
    var args, handler, listener, listeners, _i, _len, _ref, _ref1, _ref2, _ref3, _results;
    if (type === 'error') {
      if (!isArray(((_ref = this._events) != null ? _ref.error : void 0) != null) || !((_ref1 = this._events) != null ? _ref1.error.length : void 0)) {
        if (arguments[1] instanceof Error) {
          throw arguments[1];
        } else {
          throw new Error(arguments[1].code);
        }
        return false;
      }
    }
    handler = (_ref2 = this._events) != null ? _ref2[type] : void 0;
    if (!((_ref3 = this._events) != null ? _ref3[type] : void 0)) {
      return false;
    }
    if (typeof handler === 'function') {
      switch (arguments.length) {
        case 1:
          handler.call(this);
          break;
        case 2:
          handler.call(this, arguments[1]);
          break;
        case 3:
          handler.call(this, arguments[2]);
          break;
        default:
          args = Array.prototype.slice.call(arguments, 1);
          handler.apply(this, args);
      }
      return true;
    } else if (isArray(handler)) {
      args = Array.prototype.slice.call(arguments, 1);
      listeners = handler.slice();
      _results = [];
      for (_i = 0, _len = listeners.length; _i < _len; _i++) {
        listener = listeners[_i];
        _results.push(listener.apply(this, args));
      }
      return _results;
    } else {
      return false;
    }
  };

  EventEmitter.prototype.addListener = function(type, listener) {
    var m;
    if (typeof listener !== 'function') {
      throw new Error('addListener only takes instances of Function');
    }
    this._events || (this._events = {});
    this.emit('newListener', type, listener);
    if (!this._events[type]) {
      this._events[type] = listener;
    } else if (isArray(this._events[type])) {
      if (!this._events[type].warned) {
        m = 0;
        if (this._events.maxListeners !== void 0) {
          m = this._events.maxListeners;
        } else {
          m = default_max_listeners;
        }
        if (m && m > 0 && this._events[type].length > m) {
          this._events[type].warned = true;
          console.error("warning: possible EventEmitter memory" + ("leak detected. " + this._events[type].length + " listeners"));
          console.trace();
        }
      }
      this._events[type].push(listener);
    } else {
      this._events[type] = [this._events[type], listener];
    }
    return this;
  };

  EventEmitter.prototype.on = EventEmitter.prototype.addListener;

  EventEmitter.prototype.once = function(type, listener) {
    var g,
      _this = this;
    g = function() {
      _this.removeListener(type, g);
      return listener.apply(_this, arguments);
    };
    this.on(type, g);
    return this;
  };

  EventEmitter.prototype.removeListener = function(type, listener) {
    var i, list, _ref;
    if (typeof listener !== 'function') {
      throw new Error('removeListener only takes instances of Function');
    }
    list = (_ref = this._events) != null ? _ref[type] : void 0;
    if (!list) {
      return this;
    }
    if (isArray(list)) {
      i = list.indexOf(listener);
      if (i < 0) {
        return this;
      }
      list.splice(i, 1);
      if (list.length === 0) {
        delete this._events[type];
      }
    } else if (this._events[type] === listener) {
      delete this._events[type];
    }
    return this;
  };

  EventEmitter.prototype.removeAllListeners = function(type) {
    var _ref;
    if (type && ((_ref = this._events) != null ? _ref[type] : void 0)) {
      this._events[type] = null;
    }
    return this;
  };

  EventEmitter.prototype.listeners = function(type) {
    var _base;
    this._events || (this._events = {});
    (_base = this._events)[type] || (_base[type] = []);
    if (!isArray(this._events[type])) {
      this._events[type] = [this._events[type]];
    }
    return this._events[type];
  };

  return EventEmitter;

})();
