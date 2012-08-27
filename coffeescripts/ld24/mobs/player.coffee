window.LD24 ?= {}
window.LD24.Mobs ?= {}
window.LD24.Mobs.Player = class Player extends LD24.Mob
  constructor: (@game, @scene, @screen) ->
    super @game, @scene, @screen

    @totalMaxSpeed = @maxSpeed = 1

    @powerupSpeed = false
    @powerupSpeedEndTick = 0


    @handleInput()

    @opacity = 1.0

    @protected = true
    @protectedEndTick = 60*2

    @absorbable = true # we use that to "lock" the player as soon as he wins

  tick: -> 
    super()

    if @powerupSpeed and @tickCount > @powerupSpeedEndTick
      @maxSpeed = @totalMaxSpeed
      @powerupSpeed = false

    if @protected and @tickCount > @protectedEndTick
      @protected = false

  render: ->
    super()

    finalW = @spriteW * @scale * @scene.zoom
    finalH = @spriteH * @scale * @scene.zoom
    finalX = (@x * @scene.zoom - finalW / 2) - @scene.scrollX
    finalY = (@y * @scene.zoom - finalH / 2) - @scene.scrollY

    @screen.save()
    if @opacity isnt 1
      @screen.context.globalAlpha = @opacity

    @screen.render 0, 256, 256, 256, finalX - @speedX * 2 * @scene.zoom, finalY - @speedY * 2 * @scene.zoom, finalW, finalH

    @screen.restore()

  absorb: (mob) ->
    if not @absorbing and mob.canBeAbsorbedBy(@)
      @toScale = @scale + mob.scale / 2
      mob.absorbedBy @

      @emit 'absorb', @toScale
      @game.sounds.playSound 'absorb'

  canBeAbsorbedBy: (mob) ->
    if @protected or !@absorbable
      return false

    if mob instanceof LD24.Mobs.Bad
      return true

    if @scale > mob.scale
      return false
    return true

  handleInput: ->
    @up = false
    @left = false
    @down = false
    @right = false

    @handleKeyboard()
    @handleTouch()

  handleKeyboard: ->
    $(document).keydown (e) =>
      if jwerty.is('down', e) or jwerty.is('s', e)
        @pressDown()
      else if jwerty.is('up', e) or jwerty.is('w', e)
        @pressUp()
      else if jwerty.is('left', e) or jwerty.is('a', e)
        @pressLeft()
      else if jwerty.is('right', e) or jwerty.is('d', e)
        @pressRight()

    $(document).keyup (e) =>
      if jwerty.is('down', e) or 
        jwerty.is('s', e)
          @releaseDown()

      if jwerty.is('up', e) or
        jwerty.is('w', e)
          @releaseUp()

      if jwerty.is('left', e) or
        jwerty.is('a', e)
          @releaseLeft()

      if jwerty.is('right', e) or 
        jwerty.is('d', e)
          @releaseRight()

  handleTouch: ->
    $(@screen.canvas).mousemove (event) =>
      @releaseAll()
      lr = @x
      du = @y
      if event.offsetX > lr # right half
        @pressRight()
        if event.offsetY > du # right down
          @pressDown()
        else # right up
          @pressUp()
      else # left half
        @pressLeft()
        if event.offsetY > du # left down
          @pressDown()
        else # left up
          @pressUp()

    $(@screen.canvas).mouseup =>
      @releaseAll()

  pressDown: ->
    @toSpeedY = 1 * @maxSpeed
    @down = true

  pressUp: ->
    @toSpeedY = -1 * @maxSpeed
    @up = true

  pressLeft: ->
    @toSpeedX = -1 * @maxSpeed
    @left = true

  pressRight: ->
    @toSpeedX = 1 * @maxSpeed
    @right = true

  releaseDown: ->
    @toSpeedY = 0
    if @up
      @toSpeedY = -1 * @maxSpeed
    @down = false

  releaseUp: ->
    @toSpeedY = 0
    if @down
      @toSpeedY = @maxSpeed
    @up = false

  releaseLeft: ->
    @toSpeedX = 0
    if @right
      @toSpeedX = @maxSpeed
    @left = false

  releaseRight: ->
    @toSpeedX = 0
    if @left
      @toSpeedX = -1 * @maxSpeed
    @right = false

  releaseAll: ->
    @releaseDown()
    @releaseUp()
    @releaseLeft()
    @releaseRight()