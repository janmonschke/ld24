// Generated by CoffeeScript 1.3.3
var Particle, _ref;

if ((_ref = window.LD24) == null) {
  window.LD24 = {};
}

window.LD24.Particle = Particle = (function() {

  Particle.prototype.spriteW = 32;

  Particle.prototype.spriteH = 32;

  function Particle(game, scene, screen) {
    this.game = game;
    this.scene = scene;
    this.screen = screen;
    this.x = 0;
    this.y = 0;
    this.speedX = 0;
    this.speedY = 0;
    this.scrollX = 0;
    this.scrollY = 0;
    this.scale = Math.random() * 0.3;
    this.opacity = Math.random() * 0.5;
  }

  Particle.prototype.tick = function() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x > this.screen.width) {
      this.x = -32 * this.scale;
    }
    if (this.x < -32 * this.scale) {
      this.x = this.screen.width;
    }
    if (this.y > this.screen.height) {
      this.y = -32 * this.scale;
    }
    if (this.y < -32 * this.scale / 2) {
      return this.y = this.screen.height;
    }
  };

  Particle.prototype.render = function() {
    var finalH, finalW, finalX, finalY;
    finalW = 32 * this.scene.zoom * this.scale;
    finalH = 32 * this.scene.zoom * this.scale;
    finalX = this.x * this.scene.zoom - this.scene.scrollX;
    finalY = this.y * this.scene.zoom - this.scene.scrollY;
    this.screen.save();
    this.screen.context.globalAlpha = this.opacity;
    this.screen.render(768, 0, 32, 32, finalX, finalY, finalW, finalH);
    return this.screen.restore();
  };

  return Particle;

})();
