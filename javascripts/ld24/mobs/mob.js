// Generated by CoffeeScript 1.3.3
var JUMPSTATE_FALLING, JUMPSTATE_JUMPING, Mob, _base, _ref, _ref1,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

JUMPSTATE_JUMPING = 1;

JUMPSTATE_FALLING = 2;

if ((_ref = window.LD24) == null) {
  window.LD24 = {};
}

if ((_ref1 = (_base = window.LD24).Mobs) == null) {
  _base.Mobs = {};
}

window.LD24.Mobs.Mob = Mob = (function() {

  Mob.prototype.spriteX = 16;

  Mob.prototype.spriteY = 0;

  Mob.prototype.spriteW = 16;

  Mob.prototype.spriteH = 16;

  function Mob(game, scene, screen) {
    this.game = game;
    this.scene = scene;
    this.screen = screen;
    this.jump = __bind(this.jump, this);

    this.x = 0;
    this.y = this.screen.height - this.scene.fragment.floorHeight - this.spriteH;
    this.removed = false;
    this.jumpThreshold = 0;
    this.jumpState = null;
    this.jumpThresholdMax = 5;
    this.jumpThresholdReduction = 20;
    this.jumpThresholdTolerance = 0.3;
    this.gravity = 1;
  }

  Mob.prototype.tick = function() {
    if (this.jumpState === JUMPSTATE_JUMPING) {
      this.jumpThreshold -= this.jumpThreshold / this.jumpThresholdReduction;
      this.y -= this.jumpThreshold;
      if (this.jumpThreshold <= this.jumpThresholdTolerance && this.jumpState === JUMPSTATE_JUMPING) {
        this.jumpState = JUMPSTATE_FALLING;
        this.jumpThreshold = 0;
      }
    }
    this.y += this.gravity;
    if (this.y >= this.screen.height - this.scene.fragment.floorHeight - this.spriteH) {
      this.y = this.screen.height - this.scene.fragment.floorHeight - this.spriteH;
      return this.jumpState = null;
    }
  };

  Mob.prototype.render = function() {
    return this.screen.render(this.spriteX, this.spriteY, this.spriteW, this.spriteH, this.x + this.scene.offsetX, this.y);
  };

  Mob.prototype.remove = function() {
    return this.removed = true;
  };

  Mob.prototype.intersects = function(mob) {
    if (this.x + this.spriteW < mob.x || this.x > mob.x + mob.spriteW || this.y + this.spriteH < mob.y || this.y > mob.y + mob.spriteH) {
      return false;
    }
    return true;
  };

  Mob.prototype.jump = function() {
    if (!this.jumpState) {
      this.jumpThreshold = this.jumpThresholdMax;
      return this.jumpState = JUMPSTATE_JUMPING;
    }
  };

  return Mob;

})();