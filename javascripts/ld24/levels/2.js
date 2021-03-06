// Generated by CoffeeScript 1.3.3
var Level2, _base, _ref, _ref1,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

if ((_ref = window.LD24) == null) {
  window.LD24 = {};
}

if ((_ref1 = (_base = window.LD24).Levels) == null) {
  _base.Levels = {};
}

window.LD24.Levels.Level2 = Level2 = (function(_super) {

  __extends(Level2, _super);

  Level2.prototype.name = 'Level 2';

  Level2.prototype.subname = 'Determined to Fight';

  function Level2(game, scene, screen) {
    var i, mob, scale, _i, _j, _k, _len, _ref2;
    this.game = game;
    this.scene = scene;
    this.screen = screen;
    this.playerGotAbsorbed = __bind(this.playerGotAbsorbed, this);

    this.playerAbsorbedMob = __bind(this.playerAbsorbedMob, this);

    Level2.__super__.constructor.call(this, this.game, this.scene, this.screen);
    this.levelNumDisplayer.text(this.name);
    this.game.showInfoBox('Be careful: Bigger particles can absorb you as well. Try getting bigger than them to absorb them.');
    for (i = _i = 0; _i < 30; i = ++_i) {
      scale = 0.01 + Math.random() * 0.03;
      this.addNormalMobs(1, scale);
    }
    for (i = _j = 0; _j < 30; i = ++_j) {
      scale = 0.01 + Math.random() * 0.1;
      this.addNormalMobs(1, scale);
    }
    this.goalScale = 0;
    _ref2 = this.scene.mobs;
    for (_k = 0, _len = _ref2.length; _k < _len; _k++) {
      mob = _ref2[_k];
      this.goalScale += mob.scale / 5;
    }
    this.scene.player.on('absorb', this.playerAbsorbedMob);
    this.scene.player.on('absorbed', this.playerGotAbsorbed);
  }

  Level2.prototype.playerAbsorbedMob = function(scale) {
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

  Level2.prototype.playerGotAbsorbed = function() {
    return this.lost();
  };

  Level2.prototype.won = function() {
    this.game.hideInfoBox();
    return this.emit('win');
  };

  Level2.prototype.lost = function() {
    this.game.hideInfoBox();
    return this.emit('lost');
  };

  Level2.prototype.terminate = function() {
    return this.scene.player.removeListener('absorb', this.playerAbsorbedMob);
  };

  return Level2;

})(LD24.Level);
