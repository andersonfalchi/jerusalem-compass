document.addEventListener 'deviceready', () ->
  compassHeading = jerusalemHeading = null

  computeHeading = (lat1, lng1, lat2, lng2) ->
    Math.atan2(Math.sin(lng2 - lng1) * Math.cos(lat2),
      Math.cos(lat1) * Math.sin(lat2) -
      Math.sin(lat1) * Math.cos(lat2) * Math.cos(lng2 - lng1))/
      (Math.PI / 180)

  navigator.compass.watchHeading (heading) ->
    compassHeading = heading.magneticHeading
  , (err) ->
    computeHeading = 0
    alert 'Error: Could not get compass heading.'
  , {frequency: 50}

  navigator.geolocation.getCurrentPosition (pos) ->
    jerusalemHeading = computeHeading pos.coords.latitude, pos.coords.longitude,
      31.778107, 35.236014
  , (err) ->
    jerusalemHeading = 0
    alert 'Error: Could not get your position.'

  canvas = document.getElementById 'canvas'
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  ctx = canvas.getContext '2d'
  ctx.strokeStyle = '#fff'
  ctx.lineWidth = 4
  ctx.lineCap = 'round'
  ctx.font = '30px Roboto, sans-serif'
  ctx.textAlign = 'center'

  setInterval () ->

    theta = (compassHeading - jerusalemHeading) %% 360
    width = canvas.width
    height = canvas.height
    radius = Math.min(width, height)/3

    # Background
    ctx.fillStyle = '#000'
    ctx.fillRect 0, 0, width, height

    # Jerusalem text
    ctx.fillStyle = '#fff'
    ctx.fillText 'Jerusalem', width / 2, height / 2
    ctx.fillText Math.floor(theta), width / 2, height / 2 + 40

    # Compass circle
    ctx.beginPath()
    ctx.arc width / 2, height / 2, radius, 0, 2 * Math.PI
    ctx.stroke()

    # "North" line
    ctx.moveTo width / 2, height / 2 - radius - 15
    ctx.lineTo width / 2, height / 2 - radius + 15
    ctx.stroke()

    # Red dot
    ctx.save()
    ctx.translate width / 2, height / 2
    ctx.rotate theta * (Math.PI / 180)
    ctx.fillStyle = '#ff0000'
    ctx.beginPath()
    ctx.arc 0, -radius, 7, 0, 2 * Math.PI
    ctx.fill()
    ctx.restore()

  , 50

, false
