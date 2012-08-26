// Generated by CoffeeScript 1.3.3
var Player, _base, _ref, _ref1,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

if ((_ref = window.LD24) == null) {
  window.LD24 = {};
}

if ((_ref1 = (_base = window.LD24).Mobs) == null) {
  _base.Mobs = {};
}

window.LD24.Mobs.Player = Player = (function(_super) {

  __extends(Player, _super);

  function Player(game, scene, screen) {
    this.game = game;
    this.scene = scene;
    this.screen = screen;
    Player.__super__.constructor.call(this, this.game, this.scene, this.screen);
    this.totalMaxSpeed = this.maxSpeed = 3;
    this.powerupSpeed = false;
    this.powerupSpeedEndTick = 0;
    this.handleKeyboard();
    this.opacity = 1.0;
    this["protected"] = true;
    this.protectedEndTick = 60 * 2;
  }

  Player.prototype.tick = function() {
    Player.__super__.tick.call(this);
    if (this.powerupSpeed && this.tickCount > this.powerupSpeedEndTick) {
      this.maxSpeed = this.totalMaxSpeed;
      this.powerupSpeed = false;
    }
    if (this["protected"] && this.tickCount > this.protectedEndTick) {
      return this["protected"] = false;
    }
  };

  Player.prototype.render = function() {
    var finalH, finalW, finalX, finalY;
    Player.__super__.render.call(this);
    finalW = this.spriteW * this.scale * this.scene.zoom;
    finalH = this.spriteH * this.scale * this.scene.zoom;
    finalX = (this.x * this.scene.zoom - finalW / 2) - this.scene.scrollX;
    finalY = (this.y * this.scene.zoom - finalH / 2) - this.scene.scrollY;
    return this.screen.render(0, 256, 256, 256, finalX - this.speedX * 2 * this.scene.zoom, finalY - this.speedY * 2 * this.scene.zoom, finalW, finalH);
  };

  Player.prototype.absorb = function(mob) {
    if (!this.absorbing && mob.canBeAbsorbedBy(this)) {
      this.toScale = this.scale + mob.scale / 2;
      mob.absorbedBy(this);
      this.emit('absorb', this.toScale);
      return this.game.sounds.playSound('absorb');
    }
  };

  Player.prototype.canBeAbsorbedBy = function(mob) {
    if (this["protected"]) {
      return false;
    }
    if (mob instanceof LD24.Mobs.Bad) {
      return true;
    }
    if (this.scale > mob.scale) {
      return false;
    }
    return true;
  };

  Player.prototype.handleKeyboard = function() {
    var _this = this;
    $(document).keydown(function(e) {
      if (jwerty.is('down', e) || jwerty.is('s', e)) {
        return _this.toSpeedY = 1 * _this.maxSpeed;
      } else if (jwerty.is('up', e) || jwerty.is('w', e)) {
        return _this.toSpeedY = -1 * _this.maxSpeed;
      } else if (jwerty.is('left', e) || jwerty.is('a', e)) {
        return _this.toSpeedX = -1 * _this.maxSpeed;
      } else if (jwerty.is('right', e) || jwerty.is('d', e)) {
        return _this.toSpeedX = 1 * _this.maxSpeed;
      }
    });
    return $(document).keyup(function(e) {
      if (jwerty.is('down', e) || jwerty.is('up', e) || jwerty.is('w', e) || jwerty.is('s', e)) {
        _this.toSpeedY = 0;
      }
      if (jwerty.is('left', e) || jwerty.is('right', e) || jwerty.is('a', e) || jwerty.is('d', e)) {
        return _this.toSpeedX = 0;
      }
    });
  };

  return Player;

})(LD24.Mob);
