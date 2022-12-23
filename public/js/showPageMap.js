const bounds = [
  [110.31690969576937, -7.843088122030792], // Southwest coordinates
  [110.45391365019611, -7.7294930298637325] // Northeast coordinates
  ];


mapboxgl.accessToken = mapToken;
  const map = new mapboxgl.Map({
  container: 'map', // container ID
  style: 'mapbox://styles/mapbox/streets-v11', // style URL
  center: place.geometry.coordinates, // starting position [lng, lat]
  zoom: 15, // starting zoom
  maxBounds: bounds
});

map.addControl(new mapboxgl.NavigationControl());
map.addControl(
  new mapboxgl.GeolocateControl({
  positionOptions: {
  enableHighAccuracy: true
  },
  // When active the map will receive updates to the device's location as it changes.
  trackUserLocation: true,
  // Draw an arrow next to the location dot to indicate which direction the device is heading.
  showUserHeading: true
  })
  );

new mapboxgl.Marker()
  .setLngLat(place.geometry.coordinates)
  .setPopup(
    new mapboxgl.Popup({ offset: 25 })
      .setHTML(
        `<strong><h6>${place.title}</h6></strong>
        <img class="img-fluid" src="${place.images[0].url}" alt="gambar place">  </img>
        <ul>
          <li>type: ${place.type} </li>
          <li>flora: ${place.flora} </li>
          <li>fauna: ${place.fauna} </li>
          <li>makanan: ${place.makanan} </li>
          <li>habitant: ${place.habitant} </li>
          <li id="air">sumber air: ${place.sumberAir} </li>
        </ul>
       `
      )
  )
  .addTo(map);


// menacri rute terpendek dari 2 tempat

const directions = new MapboxDirections({
  accessToken: mapToken,
  unit: 'metric',
  profile: 'mapbox/driving',
  alternatives: false,
  geometries: 'geojson',
  alternatives: true,
  controls: { instructions: false },
  flyTo: false
  
});

map.addControl(directions, 'top-left');
map.scrollZoom.enable();



// jalan clearaence

const clearances = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-84.47426, 38.06673]
      },
      properties: {
        clearance: "13' 2"
      }
    }
  ]
}


const obstacle = turf.buffer(clearances, 0.25, { units: 'kilometers' });
  let bbox = [0, 0, 0, 0];
  let polygon = turf.bboxPolygon(bbox);


map.on('load', function() {

  map.getStyle().layers
      
  console.log('map layer (sebelum di remove): ', map.getStyle().layers)
  if (map.getLayer('state-label')) { map.removeLayer('state-label') };
  if (map.getLayer('poi-label')) { map.removeLayer('poi-label') };
  if (map.getLayer('country-label')) { map.removeLayer('country-label') };
  if (map.getLayer('transit-label')) { map.removeLayer('transit-label') };
  if (map.getLayer('airport-label')) { map.removeLayer('airport-label') };
  if (map.getLayer('settlement-label')) { map.removeLayer('settlement-label') };
  if (map.getLayer('settlement-subdivision-label')) { map.removeLayer('settlement-subdivision-label') };
  if (map.getLayer('road-label')) { map.removeLayer('road-label') };
  if (map.getLayer('road-number-shield')) { map.removeLayer('road-number-shield') };
  if (map.getLayer('road-pedestrian')) { map.removeLayer('road-pedestrian') };
  if (map.getLayer('road-minor')) { map.removeLayer('road-minor') };
  if (map.getLayer('road-street')) { map.removeLayer('road-street') };
  if (map.getLayer('road-steps')) { map.removeLayer('road-steps') };
  if (map.getLayer('road-pedestrian-polygon-fill')) { map.removeLayer('road-pedestrian-polygon-fill') };
  if (map.getLayer('road-pedestrian-polygon-pattern')) { map.removeLayer('road-pedestrian-polygon-pattern') };
  if (map.getLayer('road-path')) { map.removeLayer('road-path') };
  if (map.getLayer('road-secondary-tertiary')) { map.removeLayer('road-secondary-tertiary') };
  if (map.getLayer('road-secondary-tertiary-case')) { map.removeLayer('road-secondary-tertiary-case') };
  // road secondry masih jalan utama yang lumayan besar

  if (map.getLayer('road-street-case')) { map.removeLayer('road-street-case') };
  if (map.getLayer('road-pedestrian-case')) { map.removeLayer('road-pedestrian-case') };
  if (map.getLayer('road-minor-case')) { map.removeLayer('road-minor-case') };
  if (map.getLayer('road-rail')) { map.removeLayer('road-rail') };
  if (map.getLayer('road-rail-tracks')) { map.removeLayer('road-rail-tracks') };
  if (map.getLayer('road-minor-low')) { map.removeLayer('road-minor-low') };
  if (map.getLayer('road-street-low')) { map.removeLayer('road-street-low') };
  // if (map.getLayer('water-line-label')) { map.removeLayer('water-line-label') };
  if (map.getLayer('water-point-label')) { map.removeLayer('water-point-label') };
  if (map.getLayer('bridge-path-bg')) { map.removeLayer('bridge-path-bg') };
  if (map.getLayer('bridge-steps-bg')) { map.removeLayer('bridge-steps-bg') };
  if (map.getLayer('bridge-pedestrian-case')) { map.removeLayer('bridge-pedestrian-case') };
  if (map.getLayer('bridge-street-minor-low')) { map.removeLayer('bridge-street-minor-low') };
  if (map.getLayer('bridge-street-minor-case')) { map.removeLayer('bridge-street-minor-case') };
  if (map.getLayer('bridge-primary-secondary-tertiary-case')) { map.removeLayer('bridge-primary-secondary-tertiary-case') };
  if (map.getLayer('bridge-major-link-case')) { map.removeLayer('bridge-major-link-case') };
  if (map.getLayer('bridge-motorway-trunk-case')) { map.removeLayer('bridge-motorway-trunk-case') };
  if (map.getLayer('bridge-construction')) { map.removeLayer('bridge-construction') };
  if (map.getLayer('bridge-path')) { map.removeLayer('bridge-path') };
  if (map.getLayer('bridge-steps')) { map.removeLayer('bridge-steps') };
  if (map.getLayer('bridge-major-link')) { map.removeLayer('bridge-major-link') };
  if (map.getLayer('bridge-street-minor')) { map.removeLayer('bridge-street-minor') };
  if (map.getLayer('bridge-street-minor')) { map.removeLayer('bridge-street-minor') };
  if (map.getLayer('bridge-oneway-arrow-blue')) { map.removeLayer('bridge-oneway-arrow-blue') };
  if (map.getLayer('bridge-motorway-trunk')) { map.removeLayer('bridge-motorway-trunk') };
  if (map.getLayer('bridge-rail')) { map.removeLayer('bridge-rail') };
  if (map.getLayer('bridge-rail-tracks')) { map.removeLayer('bridge-rail-tracks') };
  if (map.getLayer('bridge-major-link-2-case')) { map.removeLayer('bridge-major-link-2-case') };
  if (map.getLayer('bridge-motorway-trunk-2-case')) { map.removeLayer('bridge-motorway-trunk-2-case') };
  if (map.getLayer('bridge-motorway-trunk-2')) { map.removeLayer('bridge-motorway-trunk-2') };
  if (map.getLayer('bridge-oneway-arrow-white')) { map.removeLayer('bridge-oneway-arrow-white') };
  if (map.getLayer('aerialway')) { map.removeLayer('aerialway') };
  if (map.getLayer('bridge-pedestrian')) { map.removeLayer('bridge-pedestrian') };
  if (map.getLayer('bridge-primary-secondary-tertiary')) { map.removeLayer('bridge-primary-secondary-tertiary') };
  if (map.getLayer('bridge-major-link-2')) { map.removeLayer('bridge-major-link-2') };
  if (map.getLayer('aerialway')) { map.removeLayer('aerialway') };

      // road-path

  map.addSource('theRoute', {
    type: 'geojson',
    data: {
    type: 'Feature'
    }
    });

    map.addLayer({
      id: 'theRoute',
      type: 'line',
      source: 'theRoute',
      layout: {
      'line-join': 'round',
      'line-cap': 'round'
      },
      paint: {
      'line-color': '#cccccc',
      'line-opacity': 0.5,
      'line-width': 13,
      'line-blur': 0.5
      }
      });

    // Source and layer for the bounding box
map.addSource('theBox', {
  type: 'geojson',
  data: {
  type: 'Feature'
  }
  });

  map.addLayer({
    id: 'theBox',
    type: 'fill',
    source: 'theBox',
    layout: {},
    paint: {
    'fill-color': '#FFC300',
    'fill-opacity': 0.5,
    'fill-outline-color': '#FFC300'
    }
    });




    /* Weather forecast*/

    function geocode(search, token) {
      var baseUrl = 'https://api.mapbox.com';
      var endPoint = '/geocoding/v5/mapbox.places/';
      return fetch(baseUrl + endPoint + encodeURIComponent(search) + '.json' + "?" + 'access_token=' + token)
        .then(function(res) {
          return res.json();
          // to get all the data from the request, comment out the following three lines...
        }).then(function(data) {
          return data.features[0].center;
        });
    }
    


    function reverseGeocode(coordinates, token) {
      var baseUrl = 'https://api.mapbox.com';
      var endPoint = '/geocoding/v5/mapbox.places/';
      return fetch(baseUrl + endPoint + coordinates.lng + "," + coordinates.lat + '.json' + "?" +'types=poi&'+ 'access_token=' + token)
        .then(function(res) {
          return res.json();
        })
        // to get all the data from the request, comment out the following three lines...
        .then(function(data) {
          for(var i = 0; i < data.features.length; i++){
            if(data.features[i].place_type[0] === "place"){
              console.log('data.features: direversegeocode ', data.features[i]);
              return data.features[i].place_name;
            }
          }
          console.log('data.features: direversegeocode ', data.features[0])
          return data.features[0].place_name;
        
        });
    }

    console.log('coordinat place: ', place.geometry.coordinates)
    var startingLat =  place.geometry.coordinates[1];
    var startingLng = place.geometry.coordinates[0];
  
    //On initial load set city name
    getCityName(startingLat, startingLng);
  
    //On initial run the page
    runPage(startingLat, startingLng)
  
    // Creates map with mapOptions
    
    let weatherRow = document.getElementById('weather-row');
    // let currentCity = document.getElementById('current-city');
    
    
  
  
  
  
  
    //Creates marker
    // function createMarker(latitude, longitude, map){
    //   var markerOptions = {
    //     draggable: true
    //   }
    //   return new mapboxgl.Marker(markerOptions)
    //     .setLngLat([longitude, latitude])
    //     .addTo(map);
    // }
  
    // When a click event occurs on a feature in
          // the unclustered-point layer, open a popup at
          // the location of the feature, with
          // description HTML from its properties.
          function monitorGeocoder(){
          map.on('click', place.geometry.coordinates, function (e) {
            // const { popUpMarkup } = e.features[0].properties;
            // const coordinates = e.features[0].geometry.coordinates;
            console.log('geomtery: utk weather: ',e.features[0].geometry.coordinates[1])
            console.log('propersties di weatehr: ', e.features[0].properties.location)
  
            var geoLat= e.features[0].geometry.coordinates[1];
            var geoLng =  e.features[0].geometry.coordinates[0];
            
            var { weather } = e.features[0].properties.location;
            
            var loc = getCityName(geoLat, geoLng);
  
            updatePage(geoLat, geoLng, loc)
            
  
          
  
  
  
        });
      }
  
  
    //Updates the page dynamically with geocoder results
    function updatePage(latitude, longitude, weather){
      getWeather(latitude, longitude);
  
      $('#current-city').html(weather);
  
   
    }
  
    function getCityName(lat,lng){
      // ** NOTE ** I updated the reverseGeocode method to update the city instead of street address. Checkout geocoder-utils **
      reverseGeocode({lat: lat, lng: lng}, mapToken).then(function (result) {
        
        $('#current-city').html(result);
        
      });
    }
  
  
    function loopThroughWeeklyForecast(data){
      var html = '';
  
      for(var i = 0; i < 5; i++){
        html += '<div class="col-12 col-lg-2" id="weather-card">';
        html += createWeatherCard(data[i])
        html += '</div>';
      }
  
      return html;
    }
  
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString
    // https://stackoverflow.com/questions/4822852/how-to-get-the-day-of-week-and-the-month-of-the-year
    // https://stackoverflow.com/questions/1056728/where-can-i-find-documentation-on-formatting-a-date-in-javascript
    function convertTimestampToDate(timestamp){
      var theDate = new Date(timestamp * 1000);
      var options = {  weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      return theDate.toLocaleDateString('en-us', options);
    }
  
  
    function extractWeatherData(data){
      return {
       tempMin: data.temp.min,
       tempMax: data.temp.max,
       tempMorn: data.temp.morn,
       tempNight: data.temp.night,
       tempDay: data.temp.day,
       tempEve: data.temp.eve,
       humidity: data.humidity,
       pressure: data.pressure,
       wind: data.wind_speed,
       description: data.weather[0].description,
       icon: data.weather[0].icon,
       timestamp: data.dt
      }
    }
  
    function FtoC(fahrenheit){
      var fTemp = fahrenheit;
      var fToCel = (fTemp - 32) * 5 / 9;
      return fToCel.toFixed(2);
    }
  
    function createWeatherCard(data){
      var weather = extractWeatherData(data);
  
      var html = '';
      html += '<div class="card h-100">';
      html += '<div class="card-header text-center">';
      html += '<p>' + convertTimestampToDate(weather.timestamp) + '</p>';
      html += '</div>';
      html += '<div class="card-block">';
      html += '<div class="card-body">';
      html += '<h5 class="card-title text-center">temperatur min/max: '+ FtoC(weather.tempMin) + '&#176; C / ' + FtoC(weather.tempMax) +'&#176; C</h5>';
      html += '<img class="mx-auto d-block" src="http://openweathermap.org/img/w/' + weather.icon+ '.png" alt="">';
      console.log("coba url weather: "+'<img class="mx-auto d-block" src="http://openweathermap.org/img/w/' + weather.icon+ '.png" alt="">')
      html += '<p class="card-text"><span class="font-weight-bold">Pagi: </span>'+ FtoC(weather.tempMorn) +'&#176; C</p>';
      html += '<p class="card-text"><span class="font-weight-bold">Siang: </span>'+ FtoC(weather.tempDay) +'&#176; C</p>';
      html += '<p class="card-text"><span class="font-weight-bold">Sore: </span>'+ FtoC(weather.tempEve)+'&#176; C</p>';
      html += '<p class="card-text"><span class="font-weight-bold">Malam: </span>'+ FtoC(weather.tempNight) +'&#176; C</p>';
      html += '<p class="card-text"><span class="font-weight-bold">Description: </span>'+ weather.description +'</p>';
      html += '<p class="card-text"><span class="font-weight-bold">Humidity: </span>' + weather.humidity + '</p>';
      html += '<p class="card-text"><span class="font-weight-bold">Wind: </span>' + weather.wind + '</p>';
      html += '</div>';
      html += '</div>';
      html += '</div>';
  
      return html;
    }
  
  
    function getWeather(latitude, longitude){
      $.get("https://api.openweathermap.org/data/3.0/onecall", {
        appid: "08f757ba1eb9909745e792c139d9672b",
        lat:    latitude,
        lon:   longitude,
        units: "imperial",
        exclude: "minutely,alerts"
      }).done(function(data) {
        $('#weather-row').html(loopThroughWeeklyForecast(data.daily));
  
        // weatherRow.innerHTML = loopThroughWeeklyForecast(data.daily)
      });
    }
  
  
    function runPage(latitude, longitude){
      getWeather(latitude, longitude);
  
  
      // var geocoder = createGeocoder();
      // var marker = createMarker(latitude, longitude, map);
      // map.addControl(geocoder);
  
      monitorGeocoder();
  
      //https://docs.mapbox.com/mapbox-gl-js/example/drag-a-marker/
      // function onDragEnd(){
      //   var lngLat = marker.getLngLat();
      //   var newLng = lngLat.lng;
      //   var newLat = lngLat.lat;
  
      //   var city = getCityName(newLat, newLng)
      //   console.log('city dari getcityname: ', city)
      //   updatePage(newLat, newLng, city, marker);
      //   // getWeather(newLat, newLng);
      // }
  
      // marker.on('dragend', onDragEnd);
  
    }
    
  }); //batas map.on('load)






    let counter = 0;
    const maxAttempts = 50;
    let emoji = '';
    let collision = '';
    let detail = '';




    directions.on('clear', () => {
      map.setLayoutProperty('theRoute', 'visibility', 'none');
      map.setLayoutProperty('theBox', 'visibility', 'none');
       
      counter = 0;
      reports.innerHTML = '';
      });
     
      
    directions.on('route', (event) => {
      // Hide the route and box by setting the opacity to zero
      map.setLayoutProperty('theRoute', 'visibility', 'none');
      map.setLayoutProperty('theBox', 'visibility', 'none');
       
      if (counter >= maxAttempts) {
      noRoutes(reports);
      } else {
      // Make each route visible
      for (const route of event.route) {
      // Make each route visible
      map.setLayoutProperty('theRoute', 'visibility', 'visible');
      map.setLayoutProperty('theBox', 'visibility', 'visible');
       
      // Get GeoJSON LineString feature of route
      const routeLine = polyline.toGeoJSON(route.geometry);
       
      // Create a bounding box around this route
      // The app will find a random point in the new bbox
      bbox = turf.bbox(routeLine);
      polygon = turf.bboxPolygon(bbox);
       
      // Update the data for the route
      // This will update the route line on the map
      map.getSource('theRoute').setData(routeLine);
       
      // Update the box
      map.getSource('theBox').setData(polygon);
       
      const clear = turf.booleanDisjoint(obstacle, routeLine);
       
      if (clear === true) {
      collision = 'does not intersect any obstacles!';
      detail = `takes ${(route.duration / 60).toFixed(
      0
      )} minutes and avoids`;
      emoji = '✔️';
      map.setPaintProperty('theRoute', 'line-color', '#74c476');
      // Hide the box
      map.setLayoutProperty('theBox', 'visibility', 'none');
      // Reset the counter
      counter = 0;
      } else {
      // Collision occurred, so increment the counter
      counter = counter + 1;
      // As the attempts increase, expand the search area
      // by a factor of the attempt count
      polygon = turf.transformScale(polygon, counter * 0.01);
      bbox = turf.bbox(polygon);
      collision = 'is bad.';
      detail = `takes ${(route.duration / 60).toFixed(
      0
      )} minutes and hits`;
      emoji = '⚠️';
      map.setPaintProperty('theRoute', 'line-color', '#de2d26');
       
      // Add a randomly selected waypoint to get a new route from the Directions API
      const randomWaypoint = turf.randomPoint(1, { bbox: bbox });
      directions.setWaypoint(
      0,
      randomWaypoint['features'][0].geometry.coordinates
      );
      }
      // Add a new report section to the sidebar
      addCard(counter, reports, clear, detail);
      }
      }
      });
   

    

