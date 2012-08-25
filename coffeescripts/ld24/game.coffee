window.LD24 ?= {}
window.LD24.Game = class Game
  framesPerSecond: 60
  constructor: (@canvas) ->
    @screen = new LD24.Screen @canvas
    @scene  = new LD24.Scenes.GameScene this, @screen

    @setupTickLoop()
    @setupRenderLoop()

    jwerty.key 'p', =>
      @pause()

  setupTickLoop: ->
    @tickLoop = every 1000 / @framesPerSecond, =>
      @tick()

  setupRenderLoop: ->
    @renderLoop = every 1000 / @framesPerSecond, =>
      @render()

  tick: ->
    @scene.tick()

  render: ->
    @screen.clear()    
    @scene.render()

  pause: ->
    clearInterval @tickLoop
    clearInterval @renderLoop