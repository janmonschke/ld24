// Generated by CoffeeScript 1.3.3
var Sounds, _ref;

if ((_ref = window.LD24) == null) {
  window.LD24 = {};
}

window.LD24.Sounds = Sounds = (function() {

  function Sounds(game) {
    var _this = this;
    this.game = game;
    soundManager.setup({
      debug: false,
      url: 'assets/swf/',
      onready: function() {
        return _this.loadSounds();
      }
    });
  }

  Sounds.prototype.loadSounds = function() {
    var file, name, options, sound, _ref1, _results;
    this.sounds = {
      absorb: {
        files: ['absorb_1', 'absorb_2', 'absorb_3'],
        sounds: []
      }
    };
    _ref1 = this.sounds;
    _results = [];
    for (name in _ref1) {
      options = _ref1[name];
      _results.push((function() {
        var _i, _len, _ref2, _results1;
        _ref2 = options.files;
        _results1 = [];
        for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
          file = _ref2[_i];
          sound = soundManager.createSound({
            id: file,
            url: ['assets/audio/' + file + '.mp3', 'assets/audio/' + file + '.aac', 'assets/audio/' + file + '.ogg'],
            autoLoad: true,
            autoPlay: false
          });
          _results1.push(options.sounds.push(sound));
        }
        return _results1;
      })());
    }
    return _results;
  };

  Sounds.prototype.playSound = function(id) {
    var sounds;
    sounds = this.sounds[id].sounds;
    return _.shuffle(sounds)[0].play();
  };

  return Sounds;

})();
