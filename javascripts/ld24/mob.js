// Generated by CoffeeScript 1.3.3
var Mob, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

if ((_ref = window.LD24) == null) {
  window.LD24 = {};
}

window.LD24.Mob = Mob = (function(_super) {

  __extends(Mob, _super);

  Mob.prototype.spriteW = 256;

  Mob.prototype.spriteH = 256;

  Mob.prototype.spriteX = 0;

  Mob.prototype.spriteY = 0;

  function Mob(game, scene, screen) {
    this.game = game;
    this.scene = scene;
    this.screen = screen;
    this.scale = 0.01 + Math.random() * 0.03;
    this.toScale = this.scale;
    this.x = 0;
    this.y = 0;
    this.speedX = 0;
    this.speedY = 0;
    this.toSpeedX = 0;
    this.toSpeedY = 0;
    this.maxSpeed = 0.1;
    this.absorbed = false;
    this.absorbing = false;
    this.absorbingMob = null;
    this.rotation = 0;
    this.speedRotation = Math.random() * 0.5;
  }

  Mob.prototype.tick = function() {
    if (this.absorbingMob == null) {
      this.speedX += (this.toSpeedX - this.speedX) / 20;
      this.speedY += (this.toSpeedY - this.speedY) / 20;
      this.x += this.speedX;
      this.y += this.speedY;
    } else {
      if (this.absorbingMob) {
        this.toX = this.absorbingMob.x;
        this.toY = this.absorbingMob.y;
      }
      this.x += (this.toX - this.x) / 10;
      this.y += (this.toY - this.y) / 10;
    }
    this.scale += (this.toScale - this.scale) / 10;
    if (this.scale < 0.01) {
      this.emit("absorbed");
      this.remove();
    }
    return this.rotation += this.speedRotation;
  };

  Mob.prototype.render = function() {
    var finalH, finalW, finalX, finalY;
    finalW = this.spriteW * this.scale * this.scene.zoom;
    finalH = this.spriteH * this.scale * this.scene.zoom;
    finalX = (this.x * this.scene.zoom - finalW / 2) - this.scene.scrollX;
    finalY = (this.y * this.scene.zoom - finalH / 2) - this.scene.scrollY;
    this.screen.render(0, 0, 256, 256, finalX, finalY, finalW, finalH);
    return this.screen.render(256, 0, 256, 256, finalX, finalY, finalW, finalH, this.rotation * (Math.PI / 180));
  };

  Mob.prototype.intersects = function(mob) {
    var d, dx, dy;
    dx = Math.abs(this.x - mob.x);
    dy = Math.abs(this.y - mob.y);
    d = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
    if (d > mob.spriteW * mob.scale / 2 + this.spriteW * this.scale / 2) {
      return false;
    }
    return true;
  };

  Mob.prototype.absorbedBy = function(mob) {
    this.absorbed = true;
    this.absorbingMob = mob;
    return this.toScale = 0;
  };

  Mob.prototype.remove = function() {
    return this.removed = true;
  };

  Mob.prototype.absorb = function(mob) {
    var _this = this;
    if (!this.absorbing) {
      this.toScale = this.scale + mob.scale / 2;
      this.absorbing = true;
      mob.once('absorbed', function() {
        return _this.absorbing = false;
      });
      return mob.absorbedBy(this);
    }
  };

  return Mob;

})(EventEmitter);
