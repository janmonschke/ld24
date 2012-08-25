// Generated by CoffeeScript 1.3.3
var BadMob, _base, _ref, _ref1,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

if ((_ref = window.LD24) == null) {
  window.LD24 = {};
}

if ((_ref1 = (_base = window.LD24).Mobs) == null) {
  _base.Mobs = {};
}

window.LD24.Mobs.Bad = BadMob = (function(_super) {

  __extends(BadMob, _super);

  function BadMob(game, scene, screen) {
    this.game = game;
    this.scene = scene;
    this.screen = screen;
    BadMob.__super__.constructor.call(this, this.game, this.scene, this.screen);
    this.scale = this.toScale = Math.random() * 0.2;
  }

  BadMob.prototype.render = function() {
    var context, finalH, finalW, finalX, finalY, i, _i;
    finalW = this.spriteW * this.scale * this.scene.zoom;
    finalH = this.spriteH * this.scale * this.scene.zoom;
    finalX = (this.x * this.scene.zoom - finalW / 2) - this.scene.scrollX;
    finalY = (this.y * this.scene.zoom - finalH / 2) - this.scene.scrollY;
    this.screen.render(256 * 2, 0, 256, 256, finalX, finalY, finalW, finalH);
    this.screen.save();
    context = this.screen.context;
    context.strokeStyle = 'rgba(255, 0, 0, 0.1)';
    context.lineWidth = 3;
    context.beginPath();
    context.moveTo(finalW / 6 + finalX + Math.random() * finalW / 3 * 2, finalH / 6 + finalY + Math.random() * finalH / 3 * 2);
    for (i = _i = 0; _i < 30; i = ++_i) {
      context.lineTo(finalW / 6 + finalX + Math.random() * finalW / 3 * 2, finalH / 6 + finalY + Math.random() * finalH / 3 * 2);
    }
    context.closePath();
    context.stroke();
    return this.screen.restore();
  };

  BadMob.prototype.canBeAbsorbedBy = function(mob) {
    return false;
  };

  return BadMob;

})(LD24.Mobs.Mote);