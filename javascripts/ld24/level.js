// Generated by CoffeeScript 1.3.3
var Level, _ref,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

if ((_ref = window.LD24) == null) {
  window.LD24 = {};
}

window.LD24.Level = Level = (function(_super) {

  __extends(Level, _super);

  function Level(game, scene, screen) {
    this.game = game;
    this.scene = scene;
    this.screen = screen;
    this.playerGotAbsorbed = __bind(this.playerGotAbsorbed, this);

    this.playerAbsorbedMob = __bind(this.playerAbsorbedMob, this);

    this.progressDoneDisplayer = $('.progress .done');
    this.levelNumDisplayer = $('.level');
    this.scene.player.on('absorb', this.playerAbsorbedMob);
    this.scene.player.on('absorbed', this.playerGotAbsorbed);
  }

  Level.prototype.playerAbsorbedMob = function(scale) {
    var percentDone;
    percentDone = Math.round(100 / this.goalScale * scale);
    percentDone = Math.min(percentDone, 100);
    this.progressDoneDisplayer.stop().animate({
      width: percentDone + '%'
    }, 'fast');
    if (percentDone >= 100) {
      return this.won();
    }
  };

  Level.prototype.playerGotAbsorbed = function(absorbingMob) {
    return this.lost(absorbingMob);
  };

  Level.prototype.won = function() {
    this.game.hideInfoBox();
    return this.emit('win');
  };

  Level.prototype.lost = function(absorbingMob) {
    this.game.hideInfoBox();
    if (absorbingMob instanceof LD24.Mobs.Bad) {
      return this.emit('lost', 'You ran into a red particle. It absorbed you.');
    } else {
      return this.emit('lost');
    }
  };

  Level.prototype.addNormalMobs = function(count, scale) {
    var i, mob, _i, _results;
    _results = [];
    for (i = _i = 0; 0 <= count ? _i < count : _i > count; i = 0 <= count ? ++_i : --_i) {
      mob = new LD24.Mob(this.game, this.scene, this.screen);
      mob.x = Math.random() * this.screen.width;
      mob.y = Math.random() * this.screen.height;
      mob.scale = mob.toScale = scale;
      mob.speedX = mob.toSpeedX = Math.random() * mob.maxSpeed;
      if (Math.round(Math.random()) === 0) {
        mob.speedX *= -1;
      }
      mob.speedY = mob.toSpeedY = Math.random() * mob.maxSpeed;
      if (Math.round(Math.random()) === 0) {
        mob.speedY *= -1;
      }
      _results.push(this.scene.mobs.push(mob));
    }
    return _results;
  };

  Level.prototype.addSpeedPowerUps = function(count, scale, x, y) {
    var i, mob, _i, _results;
    _results = [];
    for (i = _i = 0; 0 <= count ? _i < count : _i > count; i = 0 <= count ? ++_i : --_i) {
      mob = new LD24.Mobs.PowerUpSpeed(this.game, this.scene, this.screen);
      mob.x = x || (Math.random() * this.screen.width);
      mob.y = y || (Math.random() * this.screen.height);
      mob.scale = mob.toScale = scale;
      mob.speedX = mob.toSpeedX = Math.random() * mob.maxSpeed;
      if (Math.round(Math.random()) === 0) {
        mob.speedX *= -1;
      }
      mob.speedY = mob.toSpeedY = Math.random() * mob.maxSpeed;
      if (Math.round(Math.random()) === 0) {
        mob.speedY *= -1;
      }
      _results.push(this.scene.mobs.push(mob));
    }
    return _results;
  };

  Level.prototype.addAttractionPowerUps = function(count, scale, x, y) {
    var i, mob, _i, _results;
    _results = [];
    for (i = _i = 0; 0 <= count ? _i < count : _i > count; i = 0 <= count ? ++_i : --_i) {
      mob = new LD24.Mobs.PowerUpAttraction(this.game, this.scene, this.screen);
      mob.x = x || (Math.random() * this.screen.width);
      mob.y = y || (Math.random() * this.screen.height);
      mob.scale = mob.toScale = scale;
      mob.speedX = mob.toSpeedX = Math.random() * mob.maxSpeed;
      if (Math.round(Math.random()) === 0) {
        mob.speedX *= -1;
      }
      mob.speedY = mob.toSpeedY = Math.random() * mob.maxSpeed;
      if (Math.round(Math.random()) === 0) {
        mob.speedY *= -1;
      }
      _results.push(this.scene.mobs.push(mob));
    }
    return _results;
  };

  Level.prototype.addProtectionPowerUps = function(count, scale, x, y) {
    var i, mob, _i, _results;
    _results = [];
    for (i = _i = 0; 0 <= count ? _i < count : _i > count; i = 0 <= count ? ++_i : --_i) {
      mob = new LD24.Mobs.PowerUpProtection(this.game, this.scene, this.screen);
      mob.x = x || (Math.random() * this.screen.width);
      mob.y = y || (Math.random() * this.screen.height);
      mob.scale = mob.toScale = scale;
      mob.speedX = mob.toSpeedX = Math.random() * mob.maxSpeed;
      if (Math.round(Math.random()) === 0) {
        mob.speedX *= -1;
      }
      mob.speedY = mob.toSpeedY = Math.random() * mob.maxSpeed;
      if (Math.round(Math.random()) === 0) {
        mob.speedY *= -1;
      }
      _results.push(this.scene.mobs.push(mob));
    }
    return _results;
  };

  Level.prototype.addBadMobs = function(count, scale) {
    var i, mob, _i, _results;
    _results = [];
    for (i = _i = 0; 0 <= count ? _i < count : _i > count; i = 0 <= count ? ++_i : --_i) {
      mob = new LD24.Mobs.Bad(this.game, this.scene, this.screen);
      mob.x = Math.random() * this.screen.width;
      mob.y = Math.random() * this.screen.height;
      mob.scale = mob.scaleTo = scale;
      mob.speedX = mob.toSpeedX = Math.random() * mob.maxSpeed;
      if (Math.round(Math.random()) === 0) {
        mob.speedX *= -1;
      }
      mob.speedY = mob.toSpeedY = Math.random() * mob.maxSpeed;
      if (Math.round(Math.random()) === 0) {
        mob.speedY *= -1;
      }
      _results.push(this.scene.mobs.push(mob));
    }
    return _results;
  };

  Level.prototype.terminate = function() {
    this.scene.player.removeListener('absorb', this.playerAbsorbedMob);
    return this.scene.player.removeListener('absorbed', this.playerGotAbsorbed);
  };

  return Level;

})(EventEmitter);
