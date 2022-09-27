let ip_address = "";

// Get Map and store Lat and Long in Map
var map = L.map("map").setView([51.505, -0.09], 13);

// Place Map Tile
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: "© OpenStreetMap",
  minZoom: 6,
  zoomControl: false,
}).addTo(map);

L.control
  .zoom({
    position: "bottomright",
  })
  .addTo(map);

$(document).ready(function () {
  $("#search").on("input", function (e) {
    ip_address = e.target.value;
  });

  $("#btn").click(function () {
    getLocation();
  });
});

async function getLocation() {
  try {
    await fetch(
      `https://geo.ipify.org/api/v2/country,city?apiKey=at_x2c2TfdhTzKZh5pONbIgx1iHWYwnE&ipAddress=${ip_address}&domain=${ip_address}`
    )
      .then((res) => res.json())
      .then((data) => {
        let lat = data.location.lat;
        let long = data.location.lng;
        $("#ip").html(data.ip);
        $("#location").html(
          `${data.location.region}, ${data.location.country} ${data.location.postalCode}`
        );
        $("#timezone").html("UTC " + data.location.timezone);
        $("#isp").html(data.isp);
        goToLocation(lat, long);
      });
  } catch (err) {
    console.log(err);
  }
}

$.getJSON("https://api.ipify.org?format=jsonp&callback=?", function (data) {
  ip_address = data.ip;
  getLocation();
});

function goToLocation(latitude, longitude) {
  // Get Map and store Lat and Long in Map
  map.panTo([latitude, longitude]);
  // Add the marker icon
  myIcon = L.icon({
    iconUrl: "./images/icon-location.svg",
    iconSize: [40, 50],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
  });

  L.marker([latitude, longitude], { icon: myIcon }).addTo(map);
}
