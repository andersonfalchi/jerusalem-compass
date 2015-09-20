var devicePos, jerusalemPos, jerusalemHeading;

devicePos = new google.maps.LatLng(40.777683, -73.983496);

jerusalemPos = new google.maps.LatLng(31.778107, 35.236014);

jerusalemHeading = google.maps.geometry.spherical.computeHeading(devicePos, jerusalemPos);

console.log(jerusalemHeading);


var heading = function(lat1, lng1, lat2, lng2) {
  return Math.atan2(Math.sin(lng2-lng1)*Math.cos(lat2), Math.cos(lat1)*Math.sin(lat2) - Math.sin(lat1)*Math.cos(lat2)*Math.cos(lng2-lng1))/(Math.PI/180);
};

console.log(heading(devicePos.lat(), devicePos.lng(), jerusalemPos.lat(), jerusalemPos.lng()));

var tehran = new google.maps.LatLng(35.687891, 51.316173);
console.log(google.maps.geometry.spherical.computeHeading(tehran, devicePos));
console.log(heading(tehran.lat(), tehran.lng(), devicePos.lat(), devicePos.lng()));


/*
var angleFromCoordinate = function(lat1, lng1, lat2, lng2) {
  var dLon, y, x, bearing;

  dLon = lng2 - lng1;
  y = Math.sin(dLon) * Math.cos(lat2);
  x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);

  bearing = Math.atan2(y, x);
  bearing = 180*bearing/Math.PI;
//   bearing = (bearing + 360) % 360;
  return bearing;
};

console.log(angleFromCoordinate(devicePos.lat(), devicePos.lng(), jerusalemPos.lat(), jerusalemPos.lng()));
*/
