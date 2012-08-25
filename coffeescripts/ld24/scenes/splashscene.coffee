window.LD24 ?= {}
window.LD24.Scenes ?= {}
window.LD24.Scenes.SplashScene = class SplashScene extends EventEmitter
  constructor: (@game, @screen) ->
    @zoom = 1
    @scrollX = 0
    @scrollY = 0

    @player = new LD24.Mobs.Player @game, this, @screen
    @player.scale = @player.toScale = 0.7

    @player.x = 200
    @player.y = 125

    @player.speedRotation = 0.5

    @particles = []
    @generateParticles()

    jwerty.key '↑,↑,↓,↓,←,→,←,→,B,A', =>
      alert "LOL KONAMI"

  generateParticles: ->
    for i in [0...50]
      particle = new LD24.Particle @game, this, @screen
      particle.x = Math.random() * @screen.width
      particle.y = Math.random() * @screen.height

      particle.scale = Math.random()

      # For parallax effect
      particle.scrollX = @scrollX
      particle.scrollY = @scrollY

      particle.speedX = particle.toSpeedX = Math.random() * 0.05
      if Math.round(Math.random()) is 0
        particle.speedX *= -1
      particle.speedY = particle.toSpeedY = Math.random() * 0.05
      if Math.round(Math.random()) is 0
        particle.speedY *= -1

      @particles.push particle
  
  tick: ->
    @player.tick()
    for particle in @particles
      particle.tick()

  render: ->
    @renderBackground()
    @player.render()

    for particle in @particles
      particle.render()

  renderBackground: ->
    @screen.save()

    @screen.context.fillStyle = 'rgb(10,14,30)'
    @screen.context.fillRect 0, 0, @screen.width, @screen.height

    @screen.restore()