// Generated by CoffeeScript 1.3.3
var Level3, _base, _ref, _ref1,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

if ((_ref = window.LD24) == null) {
  window.LD24 = {};
}

if ((_ref1 = (_base = window.LD24).Levels) == null) {
  _base.Levels = {};
}

window.LD24.Levels.Level3 = Level3 = (function(_super) {

  __extends(Level3, _super);

  Level3.prototype.name = 'Level 3';

  Level3.prototype.subname = 'No! Bad particle!';

  function Level3(game, scene, screen) {
    var i, mob, scale, _i, _j, _k, _l, _len, _ref2;
    this.game = game;
    this.scene = scene;
    this.screen = screen;
    Level3.__super__.constructor.call(this, this.game, this.scene, this.screen);
    this.levelNumDisplayer.text(this.name);
    this.game.showInfoBox('Red particles are bad! They absorb you, even if they\'re smaller than you.');
    for (i = _i = 0; _i < 30; i = ++_i) {
      scale = 0.01 + Math.random() * 0.03;
      this.addNormalMobs(1, scale);
    }
    for (i = _j = 0; _j < 30; i = ++_j) {
      scale = 0.01 + Math.random() * 0.1;
      this.addNormalMobs(1, scale);
    }
    for (i = _k = 0; _k < 5; i = ++_k) {
      scale = 0.01 + Math.random() * 0.1;
      this.addBadMobs(1, scale);
    }
    this.goalScale = 0;
    _ref2 = this.scene.mobs;
    for (_l = 0, _len = _ref2.length; _l < _len; _l++) {
      mob = _ref2[_l];
      this.goalScale += mob.scale / 5;
    }
  }

  return Level3;

})(LD24.Level);
