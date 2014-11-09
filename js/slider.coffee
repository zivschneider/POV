TimePeriod = (assets) ->
  @assets = assets
  @mapPosition = null
  @zoomLevel = null

Scroller = () ->

  @currentloction = null
  @buildLocation = () ->
  @zoom = false

  @init = () ->
    @past = new TimePeriod(window._assets.past)
    @present = new TimePeriod(window._assets.present)
    @future = new TimePeriod(window._assets.future)
    @currentloction = @present
    @buildLocation()

  @init()


window.Scroller = Scroller

$(document).on 'ready', () ->
  $body = $('body')
  $container = $('.container')
  $slider = $('#slider')
  currentTime = 'present'

  getSliderVal = () ->
    $slider.slider('value')

  $(document).on 'keydown', (e) ->
    # left arrow
    if e.keyCode == 37
      moveLeft()
    # right arrow
    if e.keyCode == 39
      moveRight()

  $slider.slider
    value: 50
    min: 0
    max: 99
    animate: 400
    step: 1
    stop: (e, ui) ->
      setTimeout moveSlider, 10

  moveLeft = () ->
    value = getSliderVal() - 34
    $slider.slider('value', value)
    moveSlider()

  moveRight = () ->
    value = getSliderVal() + 34
    $slider.slider('value', value)
    moveSlider()

  $(document).on 'chicago.future', (e) ->
    $container
      .animate({opacity: 0 }, 400, () ->
                  $container.css({backgroundImage: 'url(../img/future.jpg)'}).animate({opacity: 1 }, 400)
               )
    currentTime = 'future'

  $(document).on 'chicago.present', (e) ->
    $container
      .animate({opacity: 0 }, 400, () ->
                  $container.css({backgroundImage: 'url(../img/present.jpg)'}).animate({opacity: 1 }, 400)
               )
    currentTime = 'present'

  $(document).on 'chicago.past', (e) ->
    $container
      .animate({opacity: 0 }, 400, () ->
                  $container.css({backgroundImage: 'url(../img/past.jpg)'}).animate({opacity: 1 }, 400)
               )
    currentTime = 'past'

  moveSlider = () ->
    value = getSliderVal()
    if value > 66 
      $slider.slider('value', 100)
      if currentTime != 'future'
        $(document).trigger('chicago.future')
    else if value < 67 && value > 33 
      $slider.slider('value', 50)
      if currentTime != 'present'
        $(document).trigger('chicago.present')
    else if value <= 33 
      $slider.slider('value', 0)
      if currentTime != 'past'
        $(document).trigger('chicago.past')
