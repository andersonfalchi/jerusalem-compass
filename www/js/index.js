document.addEventListener('deviceready', function () {
  var compassHeading, jerusalemHeading, canvas, ctx;

  var getCompassHeading = function() {
    navigator.compass.watchHeading(function(heading) {
      compassHeading = heading.magneticHeading;
    }, function(err) {
      alert("Could not get compass heading. Error " + err.code + ".");
    }, { frequency: 50 });
  };

  var getJerusalemHeading = function() {
    var devicePos, jerusalemPos;

    navigator.geolocation.getCurrentPosition(function(pos) {
      jerusalemHeading = (function(lat1, lng1, lat2, lng2) {
        return Math.atan2(Math.sin(lng2-lng1)*Math.cos(lat2), Math.cos(lat1)*Math.sin(lat2) - Math.sin(lat1)*Math.cos(lat2)*Math.cos(lng2-lng1))/(Math.PI/180);
      })(pos.coords.latitude, pos.coords.longitude, 31.778107, 35.236014);

      /*
      devicePos = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
      jerusalemPos = new google.maps.LatLng(31.778107, 35.236014);
      jerusalemHeading = google.maps.geometry.spherical.computeHeading(devicePos, jerusalemPos);
      */
    }, function (err) {
      alert("Could not get your current position.\nError " + err.code + ": " + err.message);
    });
  };

  var setup = function() {
    canvas = document.getElementById("canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    ctx = canvas.getContext("2d");
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 4;
    ctx.lineCap = "round";
    ctx.font = "30px Roboto, sans-serif";
    ctx.textAlign = "center";
  };

  var draw = function() {
    var theta, width, height, radius;

    theta = (function(n, m) {
        return ((n % m) + m) % m;
    })(compassHeading - jerusalemHeading, 360);
    width = canvas.width;
    height = canvas.height;
    radius = Math.min(width, height)/3;

    // Background
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, width, height);

    // Jerusalem text
    ctx.fillStyle = "#fff";
    ctx.fillText("Jerusalem", width / 2, height / 2);
    ctx.fillText(Math.floor(theta), width / 2, height / 2 + 40);

    // Compass circle
    ctx.beginPath();
    ctx.arc(width / 2, height / 2, radius, 0, 2 * Math.PI);
    ctx.stroke();

    // "North" line
    /*
    ctx.save();
    ctx.translate(width / 2, height / 2);
    ctx.rotate(Math.PI * jerusalemHeading / 180);
    ctx.moveTo(0, -radius - 15);
    ctx.lineTo(0, -radius + 15);
    ctx.stroke();
    ctx.restore();
    */
    ctx.moveTo(width / 2, height / 2 - radius - 15);
    ctx.lineTo(width / 2, height / 2 - radius + 15);
    ctx.stroke();

    // Red dot
    ctx.save();
    ctx.translate(width / 2, height / 2);
    ctx.rotate(Math.PI * theta / 180);
    // ctx.rotate(Math.PI * theta / 180);
    ctx.fillStyle = "#ff0000";
    ctx.beginPath();
    ctx.arc(0, -radius, 7, 0, 2 * Math.PI);
    ctx.fill();
    ctx.restore();
  };

  (function() {
    getCompassHeading();
    getJerusalemHeading();
    setup();
    setInterval(draw, 50);
  })();

}, false);
