// Generated by CoffeeScript 1.3.3
var GameScene, _base, _ref, _ref1;

if ((_ref = window.LD24) == null) {
  window.LD24 = {};
}

if ((_ref1 = (_base = window.LD24).Scenes) == null) {
  _base.Scenes = {};
}

window.LD24.Scenes.Game = GameScene = (function() {

  function GameScene(game, screen) {
    this.game = game;
    this.screen = screen;
    this.offsetX = 0;
    this.tickCount = 0;
    this.fragment = new LD24.Fragments.Basic(this.game, this, this.screen);
    this.player = new LD24.Mobs.Player(this.game, this, this.screen);
    this.mobs = [];
  }

  GameScene.prototype.render = function() {
    var mob, _i, _len, _ref2, _results;
    this.fragment.render();
    this.player.render();
    _ref2 = this.mobs;
    _results = [];
    for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
      mob = _ref2[_i];
      _results.push(mob.render());
    }
    return _results;
  };

  GameScene.prototype.tick = function() {
    var mob, _i, _len, _ref2;
    this.offsetX -= 1;
    this.player.x = this.offsetX * -1 + 20;
    this.fragment.tick();
    this.player.tick();
    if (this.tickCount % 20 === 0) {
      if (Math.floor(Math.random() * 10) === 0) {
        mob = new LD24.Mobs.Mob(this.game, this, this.screen);
        mob.x = this.offsetX * -1 + this.screen.width;
        this.mobs.push(mob);
      }
    }
    _ref2 = this.mobs;
    for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
      mob = _ref2[_i];
      if (mob.x < this.offsetX * -1 - 16) {
        mob.remove();
      }
      if (mob.removed) {
        this.mobs = _.without(this.mobs, mob);
      }
      mob.tick();
      if (this.player.intersects(mob)) {
        this.game.pause();
      }
    }
    return this.tickCount++;
  };

  return GameScene;

})();
