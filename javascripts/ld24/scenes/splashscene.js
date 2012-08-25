// Generated by CoffeeScript 1.3.3
var SplashScene, _base, _ref, _ref1,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

if ((_ref = window.LD24) == null) {
  window.LD24 = {};
}

if ((_ref1 = (_base = window.LD24).Scenes) == null) {
  _base.Scenes = {};
}

window.LD24.Scenes.SplashScene = SplashScene = (function(_super) {

  __extends(SplashScene, _super);

  function SplashScene(game, screen) {
    var _this = this;
    this.game = game;
    this.screen = screen;
    this.selectPrevItem = __bind(this.selectPrevItem, this);

    this.selectNextItem = __bind(this.selectNextItem, this);

    this.zoom = 1;
    this.scrollX = 0;
    this.scrollY = 0;
    this.player = new LD24.Mobs.Player(this.game, this, this.screen);
    this.player.scale = this.player.toScale = 0.7;
    this.player.x = 200;
    this.player.y = 125;
    this.player.speedRotation = 0.5;
    this.particles = [];
    this.generateParticles();
    this.selectedMenuItem = $('.menu .active');
    jwerty.key('↓', this.selectNextItem);
    jwerty.key('↑', this.selectPrevItem);
    jwerty.key('enter', function(e) {
      $(document).unbind('.jwerty');
      if (_this.selectedMenuItem.hasClass('campaign')) {
        _this.game.loadCampaign();
      }
      if (_this.selectedMenuItem.hasClass('endless')) {
        return _this.game.loadEndless();
      }
    });
    $('.menu li').mouseenter(function() {
      $('.menu li').removeClass('active');
      return $(this).addClass('active');
    });
    $('.campaign').click(function() {
      return _this.game.loadCampaign();
    });
    $('.endless').click(function() {
      return _this.game.loadEndless();
    });
    jwerty.key('↑,↑,↓,↓,←,→,←,→,B,A', function() {});
  }

  SplashScene.prototype.selectNextItem = function() {
    var nextItem;
    nextItem = this.selectedMenuItem.next('li');
    if (!(nextItem.length > 0)) {
      nextItem = $('.menu li').first();
    }
    $('.menu li').removeClass('active');
    nextItem.addClass('active');
    return this.selectedMenuItem = nextItem;
  };

  SplashScene.prototype.selectPrevItem = function() {
    var prevItem;
    prevItem = this.selectedMenuItem.prev('li');
    if (!(prevItem.length > 0)) {
      prevItem = $('.menu li').last();
    }
    $('.menu li').removeClass('active');
    prevItem.addClass('active');
    return this.selectedMenuItem = prevItem;
  };

  SplashScene.prototype.generateParticles = function() {
    var i, particle, _i, _results;
    _results = [];
    for (i = _i = 0; _i < 50; i = ++_i) {
      particle = new LD24.Particle(this.game, this, this.screen);
      particle.x = Math.random() * this.screen.width;
      particle.y = Math.random() * this.screen.height;
      particle.scale = Math.random();
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

  SplashScene.prototype.tick = function() {
    var particle, _i, _len, _ref2, _results;
    this.player.tick();
    _ref2 = this.particles;
    _results = [];
    for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
      particle = _ref2[_i];
      _results.push(particle.tick());
    }
    return _results;
  };

  SplashScene.prototype.render = function() {
    var particle, _i, _len, _ref2, _results;
    this.renderBackground();
    this.player.render();
    _ref2 = this.particles;
    _results = [];
    for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
      particle = _ref2[_i];
      _results.push(particle.render());
    }
    return _results;
  };

  SplashScene.prototype.renderBackground = function() {
    this.screen.save();
    this.screen.context.fillStyle = 'rgb(10,14,30)';
    this.screen.context.fillRect(0, 0, this.screen.width, this.screen.height);
    return this.screen.restore();
  };

  SplashScene.prototype.terminate = function(callback) {
    var _this = this;
    $('canvas').fadeOut('slow');
    return $('.splash').fadeOut('slow', function() {
      return typeof callback === "function" ? callback() : void 0;
    });
  };

  return SplashScene;

})(EventEmitter);
