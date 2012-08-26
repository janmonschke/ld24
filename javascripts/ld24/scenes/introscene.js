// Generated by CoffeeScript 1.3.3
var IntroScene, _base, _ref, _ref1,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

if ((_ref = window.LD24) == null) {
  window.LD24 = {};
}

if ((_ref1 = (_base = window.LD24).Scenes) == null) {
  _base.Scenes = {};
}

window.LD24.Scenes.IntroScene = IntroScene = (function(_super) {

  __extends(IntroScene, _super);

  function IntroScene(game, screen) {
    var _this = this;
    this.game = game;
    this.screen = screen;
    this.intro = $('.intro');
    after(1000, function() {
      return _this.intro.find('.filsh-media').fadeIn('slow', function() {
        return _this.intro.find('.filsh-media .logo').animate({
          width: 130,
          opacity: 0,
          left: '+=5',
          top: '+=5'
        }, "fast", function() {
          return _this.intro.find('.filsh-media .mob').animate({
            width: 142,
            opacity: 1,
            left: '-=5',
            top: '-=5'
          }, "fast", function() {
            return _this.intro.find('.filsh-media .text').fadeOut('fast', function() {
              return _this.intro.find('.filsh-media .mob').animate({
                left: $('.intro').width(),
                opacity: 0
              }, 'slow', function() {
                return after(500, function() {
                  return _this.intro.find('.ld').fadeIn('slow', function() {
                    return after(1500, function() {
                      return _this.intro.find('.ld').fadeOut('slow', function() {
                        $.cookie('abs_intro_seen', '1');
                        return _this.game.loadSplash();
                      });
                    });
                  });
                });
              });
            });
          });
        });
      });
    });
  }

  IntroScene.prototype.terminate = function(callback) {
    var _this = this;
    return $('.intro').fadeOut('slow', function() {
      return typeof callback === "function" ? callback() : void 0;
    });
  };

  IntroScene.prototype.tick = function() {};

  IntroScene.prototype.render = function() {};

  return IntroScene;

})(EventEmitter);
