// Generated by CoffeeScript 1.3.3
var PowerUpAttractionMob, _base, _ref, _ref1,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

if ((_ref = window.LD24) == null) {
  window.LD24 = {};
}

if ((_ref1 = (_base = window.LD24).Mobs) == null) {
  _base.Mobs = {};
}

window.LD24.Mobs.PowerUpAttraction = PowerUpAttractionMob = (function(_super) {

  __extends(PowerUpAttractionMob, _super);

  function PowerUpAttractionMob(game, scene, screen) {
    this.game = game;
    this.scene = scene;
    this.screen = screen;
    PowerUpAttractionMob.__super__.constructor.call(this, this.game, this.scene, this.screen);
  }

  PowerUpAttractionMob.prototype.absorbedBy = function(mob) {
    PowerUpAttractionMob.__super__.absorbedBy.call(this, mob);
    mob.powerupAttraction = true;
    mob.powerupAttractionEndTick = mob.tick + 60 * 10;
    return mob.attraction = 10;
  };

  PowerUpAttractionMob.prototype.render = function() {
    var finalH, finalW, finalX, finalY;
    finalW = this.spriteW * this.scale * this.scene.zoom;
    finalH = this.spriteH * this.scale * this.scene.zoom;
    finalX = (this.x * this.scene.zoom - finalW / 2) - this.scene.scrollX;
    finalY = (this.y * this.scene.zoom - finalH / 2) - this.scene.scrollY;
    this.screen.render(256, 512, 256, 256, finalX, finalY, finalW, finalH);
    return this.screen.render(0, 512, 256, 256, finalX - this.speedX * 10, finalY - this.speedY * 10, finalW, finalH, this.borderRotation * (Math.PI / 180));
  };

  return PowerUpAttractionMob;

})(LD24.Mobs.PowerUp);