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
    this.generateMobs();
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
    this.toScrollX -= (this.screen.width / 2 * this.zoom) - (this.screen.width / 2 * this.toZoom);
    return this.toScrollY -= (this.screen.height / 2 * this.zoom) - (this.screen.height / 2 * this.toZoom);
  };

  GameScene.prototype.zoomIn = function() {
    this.toZoom = Math.min(5, this.toZoom + 1);
    this.toScrollX += (this.screen.width / 2 * this.toZoom) - (this.screen.width / 2 * this.zoom);
    return this.toScrollY += (this.screen.height / 2 * this.toZoom) - (this.screen.height / 2 * this.zoom);
  };

  GameScene.prototype.generateMobs = function() {
    var i, mob, _i, _j, _k, _results;
    for (i = _i = 0; _i < 60; i = ++_i) {
      mob = new LD24.Mobs.Mote(this.game, this, this.screen);
      mob.x = Math.random() * this.screen.width;
      mob.y = Math.random() * this.screen.height;
      mob.speedX = mob.toSpeedX = Math.random() * mob.maxSpeed;
      if (Math.round(Math.random()) === 0) {
        mob.speedX *= -1;
      }
      mob.speedY = mob.toSpeedY = Math.random() * mob.maxSpeed;
      if (Math.round(Math.random()) === 0) {
        mob.speedY *= -1;
      }
      this.mobs.push(mob);
    }
    for (i = _j = 0; _j < 2; i = ++_j) {
      mob = new LD24.Mobs.PowerUp(this.game, this, this.screen);
      mob.x = Math.random() * this.screen.width;
      mob.y = Math.random() * this.screen.height;
      mob.speedX = mob.toSpeedX = Math.random() * mob.maxSpeed;
      if (Math.round(Math.random()) === 0) {
        mob.speedX *= -1;
      }
      mob.speedY = mob.toSpeedY = Math.random() * mob.maxSpeed;
      if (Math.round(Math.random()) === 0) {
        mob.speedY *= -1;
      }
      this.mobs.push(mob);
    }
    _results = [];
    for (i = _k = 0; _k < 5; i = ++_k) {
      mob = new LD24.Mobs.Bad(this.game, this, this.screen);
      mob.x = Math.random() * this.screen.width;
      mob.y = Math.random() * this.screen.height;
      mob.speedX = mob.toSpeedX = Math.random() * mob.maxSpeed;
      if (Math.round(Math.random()) === 0) {
        mob.speedX *= -1;
      }
      mob.speedY = mob.toSpeedY = Math.random() * mob.maxSpeed;
      if (Math.round(Math.random()) === 0) {
        mob.speedY *= -1;
      }
      _results.push(this.mobs.push(mob));
    }
    return _results;
  };

  GameScene.prototype.tick = function() {
    var mob, otherMob, _i, _len, _ref2, _results;
    this.zoom += (this.toZoom - this.zoom) / 10;
    this.scrollX += (this.toScrollX - this.scrollX) / 10;
    this.scrollY += (this.toScrollY - this.scrollY) / 10;
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
    _ref2 = this.mobs;
    _results = [];
    for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
      mob = _ref2[_i];
      if (mob.removed) {
        this.mobs = _.without(this.mobs, mob);
      } else {
        mob.tick();
      }
      _results.push((function() {
        var _j, _len1, _ref3, _results1;
        _ref3 = this.mobs;
        _results1 = [];
        for (_j = 0, _len1 = _ref3.length; _j < _len1; _j++) {
          otherMob = _ref3[_j];
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
    var mob, _i, _len, _ref2, _results;
    this.renderBackground();
    _ref2 = this.mobs;
    _results = [];
    for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
      mob = _ref2[_i];
      if (mob.x * this.zoom - (mob.spriteW * mob.scale * this.zoom) / 2 < this.scrollX + this.screen.width && mob.x * this.zoom + (mob.spriteW * mob.scale * this.zoom) / 2 > this.scrollX && mob.y * this.zoom + (mob.spriteH * mob.scale * this.zoom) / 2 > this.scrollY && mob.y * this.zoom - (mob.spriteH * mob.scale * this.zoom) / 2 < this.scrollY + this.screen.height) {
        _results.push(mob.render());
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
