// Generated by CoffeeScript 1.3.3
var GameScene, _base, _ref, _ref1;

if ((_ref = window.LD24) == null) {
  window.LD24 = {};
}

if ((_ref1 = (_base = window.LD24).Scenes) == null) {
  _base.Scenes = {};
}

window.LD24.Scenes.GameScene = GameScene = (function() {

  function GameScene(game, screen) {
    var _this = this;
    this.game = game;
    this.screen = screen;
    this.player = new LD24.Mobs.Player(this.game, this, this.screen);
    this.player.x = this.screen.width / 2;
    this.player.y = this.screen.height / 2;
    this.player.scale = 0.04;
    this.player.toScale = this.player.scale;
    this.zoom = 5;
    this.toZoom = this.zoom;
    this.scrollX = this.screen.width / 2 * this.zoom - this.screen.width / 2;
    this.toScrollX = this.scrollX;
    this.scrollY = this.screen.height / 2 * this.zoom - this.screen.height / 2;
    this.toScrollY = this.scrollY;
    this.mobs = [this.player];
    this.particles = [];
    this.level = new LD24.Levels.Level1(this.game, this, this.screen);
    this.generateParticles();
    $(document).keydown(function(e) {
      switch (e.keyCode) {
        case 189:
          return _this.zoomOut();
        case 187:
          return _this.zoomIn();
      }
    });
  }

  GameScene.prototype.zoomOut = function() {
    this.toZoom = Math.max(1, this.toZoom - 1);
    this.toScrollX = this.scrollX / this.zoom * this.toZoom;
    return this.toScrollY = this.scrollY / this.zoom * this.toZoom;
  };

  GameScene.prototype.zoomIn = function() {
    this.toZoom = Math.min(5, this.toZoom + 1);
    this.toScrollX = this.scrollX / this.zoom * this.toZoom;
    return this.toScrollY = this.scrollY / this.zoom * this.toZoom;
  };

  GameScene.prototype.generateParticles = function() {
    var i, particle, _i, _results;
    _results = [];
    for (i = _i = 0; _i < 500; i = ++_i) {
      particle = new LD24.Particle(this.game, this, this.screen);
      particle.x = Math.random() * this.screen.width;
      particle.y = Math.random() * this.screen.height;
      particle.scrollX = this.scrollX;
      particle.scrollY = this.scrollY;
      particle.speedX = particle.toSpeedX = Math.random() * 0.05;
      if (Math.round(Math.random()) === 0) {
        particle.speedX *= -1;
      }
      particle.speedY = particle.toSpeedY = Math.random() * 0.05;
      if (Math.round(Math.random()) === 0) {
        particle.speedY *= -1;
      }
      _results.push(this.particles.push(particle));
    }
    return _results;
  };

  GameScene.prototype.tick = function() {
    var mob, otherMob, particle, _i, _j, _len, _len1, _ref2, _ref3, _results;
    this.zoom += (this.toZoom - this.zoom) / 10;
    this.scrollX += (this.toScrollX - this.scrollX) / 10;
    this.scrollY += (this.toScrollY - this.scrollY) / 10;
    _ref2 = this.particles;
    for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
      particle = _ref2[_i];
      particle.tick();
    }
    if (this.player.y * this.zoom - this.player.spriteH / 2 * this.zoom * this.player.scale < this.scrollY + 50) {
      this.toScrollY = this.player.y * this.zoom - this.player.spriteH / 2 * this.zoom * this.player.scale - 50;
    } else if (this.player.y * this.zoom + this.player.spriteH / 2 * this.zoom * this.player.scale > this.scrollY + this.screen.height - 50) {
      this.toScrollY = this.player.y * this.zoom - this.screen.height + this.player.spriteH / 2 * this.zoom * this.player.scale + 50;
    }
    if (this.player.x * this.zoom - this.player.spriteW / 2 * this.zoom * this.player.scale < this.scrollX + 50) {
      this.toScrollX = this.player.x * this.zoom - this.player.spriteW / 2 * this.zoom * this.player.scale - 50;
    } else if (this.player.x * this.zoom + this.player.spriteW / 2 * this.zoom * this.player.scale > this.scrollX + this.screen.width - 50) {
      this.toScrollX = this.player.x * this.zoom - this.screen.width + this.player.spriteW / 2 * this.zoom * this.player.scale + 50;
    }
    this.toScrollX = Math.min(this.toScrollX, this.screen.width * this.zoom - this.screen.width);
    this.toScrollX = Math.max(this.toScrollX, 0);
    this.toScrollY = Math.min(this.toScrollY, this.screen.height * this.zoom - this.screen.height);
    this.toScrollY = Math.max(this.toScrollY, 0);
    _ref3 = this.mobs;
    _results = [];
    for (_j = 0, _len1 = _ref3.length; _j < _len1; _j++) {
      mob = _ref3[_j];
      if (mob.removed) {
        this.mobs = _.without(this.mobs, mob);
      } else {
        mob.tick();
      }
      _results.push((function() {
        var _k, _len2, _ref4, _results1;
        _ref4 = this.mobs;
        _results1 = [];
        for (_k = 0, _len2 = _ref4.length; _k < _len2; _k++) {
          otherMob = _ref4[_k];
          if (mob.intersects(otherMob) && otherMob !== mob && !otherMob.absorbed) {
            _results1.push(mob.absorb(otherMob));
          } else {
            _results1.push(void 0);
          }
        }
        return _results1;
      }).call(this));
    }
    return _results;
  };

  GameScene.prototype.render = function() {
    var arrowRotation, arrowX, arrowY, distX, distY, distanceMax, distanceMin, mob, particle, spriteY, _i, _j, _len, _len1, _ref2, _ref3, _results;
    this.renderBackground();
    _ref2 = this.particles;
    for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
      particle = _ref2[_i];
      if (particle.x * this.zoom - this.scrollX < this.screen.width && particle.x * this.zoom - this.scrollX + particle.spriteW * particle.scale * this.zoom > 0 && particle.y * this.zoom - this.scrollY + particle.spriteH * particle.scale * this.zoom > 0 && particle.y * this.zoom - this.scrollY < this.screen.height) {
        particle.render();
      }
    }
    _ref3 = this.mobs;
    _results = [];
    for (_j = 0, _len1 = _ref3.length; _j < _len1; _j++) {
      mob = _ref3[_j];
      if (mob.x * this.zoom - (mob.spriteW * mob.scale * this.zoom) / 2 < this.scrollX + this.screen.width && mob.x * this.zoom + (mob.spriteW * mob.scale * this.zoom) / 2 > this.scrollX && mob.y * this.zoom + (mob.spriteH * mob.scale * this.zoom) / 2 > this.scrollY && mob.y * this.zoom - (mob.spriteH * mob.scale * this.zoom) / 2 < this.scrollY + this.screen.height) {
        mob.render();
      }
      if (mob instanceof LD24.Mobs.Bad || mob instanceof LD24.Mobs.PowerUp) {
        distX = Math.abs(mob.x - (this.scrollX + this.screen.width / 2) / this.zoom);
        distY = Math.abs(mob.y - (this.scrollY + this.screen.height / 2) / this.zoom);
        this.game.debug(Math.round(distX) + ',' + Math.round(distY) + ' // ' + Math.round(this.screen.width / 2) + ',' + Math.round(this.screen.height / 2));
        distanceMin = distX < this.screen.width / 2 / this.zoom + mob.spriteW * mob.scale && distY < this.screen.height / 2 / this.zoom + mob.spriteW * mob.scale;
        distanceMax = distX < this.screen.width / this.zoom + mob.spriteW * mob.scale && distY < this.screen.height / this.zoom + mob.spriteW * mob.scale;
        if (!distanceMin && distanceMax) {
          arrowX = (mob.x * this.zoom) - this.scrollX;
          arrowX = Math.max(arrowX, 0);
          arrowX = Math.min(arrowX, this.screen.width - 38);
          arrowY = (mob.y * this.zoom) - this.scrollY;
          arrowY = Math.max(arrowY, 0);
          arrowY = Math.min(arrowY, this.screen.height - 25);
          distX = (mob.x * this.zoom) - (this.scrollX + this.screen.width / 2);
          distY = (mob.y * this.zoom) - (this.scrollY + this.screen.height / 2);
          arrowRotation = Math.atan2(distY, distX);
          if (mob instanceof LD24.Mobs.Bad) {
            spriteY = 32 + 25;
          } else if (mob instanceof LD24.Mobs.PowerUp) {
            spriteY = 32;
          }
          _results.push(this.screen.render(768, spriteY, 38, 25, arrowX, arrowY, null, null, arrowRotation));
        } else {
          _results.push(void 0);
        }
      } else {
        _results.push(void 0);
      }
    }
    return _results;
  };

  GameScene.prototype.renderBackground = function() {
    this.screen.save();
    this.screen.context.fillStyle = 'rgb(10,14,30)';
    this.screen.context.fillRect(0, 0, this.screen.width, this.screen.height);
    return this.screen.restore();
  };

  return GameScene;

})();
