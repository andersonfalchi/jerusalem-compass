(function() {
  var modulo = function(a, b) { return (+a % (b = +b) + b) % b; };

  document.addEventListener('deviceready', function() {
    var canvas, compassHeading, computeHeading, ctx, jerusalemHeading;
    compassHeading = jerusalemHeading = null;
    computeHeading = function(lat1, lng1, lat2, lng2) {
      return Math.atan2(Math.sin(lng2 - lng1) * Math.cos(lat2), Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(lng2 - lng1)) / (Math.PI / 180);
    };
    navigator.compass.watchHeading(function(heading) {
      return compassHeading = heading.magneticHeading;
    }, function(err) {
      computeHeading = 0;
      return alert('Error: Could not get compass heading.');
    }, {
      frequency: 50
    });
    navigator.geolocation.getCurrentPosition(function(pos) {
      return jerusalemHeading = computeHeading(pos.coords.latitude, pos.coords.longitude, 31.778107, 35.236014);
    }, function(err) {
      jerusalemHeading = 0;
      return alert('Error: Could not get your position.');
    });
    canvas = document.getElementById('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx = canvas.getContext('2d');
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    ctx.font = '30px Roboto, sans-serif';
    ctx.textAlign = 'center';
    return setInterval(function() {
      var height, radius, theta, width;
      theta = modulo(compassHeading - jerusalemHeading, 360);
      width = canvas.width;
      height = canvas.height;
      radius = Math.min(width, height) / 3;
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, width, height);
      ctx.fillStyle = '#fff';
      ctx.fillText('Jerusalem', width / 2, height / 2);
      ctx.fillText(Math.floor(theta), width / 2, height / 2 + 40);
      ctx.beginPath();
      ctx.arc(width / 2, height / 2, radius, 0, 2 * Math.PI);
      ctx.stroke();
      ctx.moveTo(width / 2, height / 2 - radius - 15);
      ctx.lineTo(width / 2, height / 2 - radius + 15);
      ctx.stroke();
      ctx.save();
      ctx.translate(width / 2, height / 2);
      ctx.rotate(theta * (Math.PI / 180));
      ctx.fillStyle = '#ff0000';
      ctx.beginPath();
      ctx.arc(0, -radius, 7, 0, 2 * Math.PI);
      ctx.fill();
      return ctx.restore();
    }, 50);
  }, false);

}).call(this);

//# sourceMappingURL=index.js.map
