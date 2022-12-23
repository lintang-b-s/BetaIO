// buat mencari koordinat pengguna

let map="ss";
const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };

  let crd = 0;
  let lat =0;
  let long = 0;

  //yang undefined di sininya anjir
  function success(pos) {
    crd = pos.coords;
   

    return [crd.longitude, crd.latitude];
  }
  
  navigator.geolocation.getCurrentPosition(position => { 
    // console.log('js biasa latitude: ', position.coords.latitude);
    // console.log('jsbiasa longitude:', position.coords.longitude);
    lat =  position.coords.latitude;
    long =  position.coords.longitude;

    const coordinates = document.getElementById('coordinates')
  const koordinat1 = document.getElementById('koor1');
  const koordinat2 = document.getElementById('koor2');
  const typekoord = document.getElementById("typecoord");


    
    function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
    }
    /* Get the coordinate of the search result */
    // console.log('geolocate:', geolocate.options.geolocation.getCurrentPosition(success,error,options))

    const userCoordinate = [long, lat];

    const bounds = [
      [110.31690969576937, -7.843088122030792], // Southwest coordinates
      [110.45391365019611, -7.7294930298637325] // Northeast coordinates
      ];

   


    mapboxgl.accessToken = mapToken;
  map = new mapboxgl.Map({
  container: 'map', // container ID
  style: 'mapbox://styles/mapbox/streets-v11', // style URL
  center: userCoordinate, // starting position [lng, lat]
  zoom: 15 ,// starting zoom
  maxBounds: bounds 
});

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



// const geocoder = new MapboxGeocoder({
//   accessToken: mapToken,
//   mapboxgl: mapboxgl,
//   marker: true,
//   bbox: [110.3306814047222, -7.839425629947886, 110.42831473711401, -7.751932983787974]
// });

// const marker = new mapboxgl.Marker({
//   draggable: true
//   })
//   .setLngLat(userCoordinate)
//   .addTo(map);
runPage(lat, long);


  function createMarker(latitude, longitude, map){
		var markerOptions = {
			draggable: true
		}
		return new mapboxgl.Marker(markerOptions)
			.setLngLat([longitude, latitude])
			.addTo(map);
	}


function monitorGeocoder(geocoder, marker){
  geocoder.on('result', function(e) {
    var geoLat = e.result.geometry.coordinates[1];
    var geoLng =  e.result.geometry.coordinates[0];
    var city = e.result.place_name;

    koordinat1.setAttribute('value', `${geoLng}` );
      koordinat2.setAttribute('value', `${geoLat}`);
      typekoord.setAttribute('value', 'Point');

    updatePage(geoLat, geoLng, city , marker);
  });
}


function updatePage(latitude, longitude, city, marker){

  marker.setLngLat([longitude, latitude]);
}

// const geocoder = function createGeocoder(){
//   return new MapboxGeocoder({
//     accessToken: mapToken,
//     mapboxgl: mapboxgl,
//     marker: false,
//     bbox: [110.3306814047222, -7.839425629947886, 110.42831473711401, -7.751932983787974]
//   });

// }

// map.addControl(geocoder);

function createGeocoder() {
  return new MapboxGeocoder({
    accessToken: mapToken,
    mapboxgl: mapboxgl,
    marker: false,
    bbox: [110.3306814047222, -7.839425629947886, 110.42831473711401, -7.751932983787974]
  });
}










map.addControl(new mapboxgl.NavigationControl());


// const geolocate = new mapboxgl.GeolocateControl({
// positionOptions: {
// enableHighAccuracy: true
// },
// // When active the map will receive updates to the device's location as it changes.
// trackUserLocation: true,
// // Draw an arrow next to the location dot to indicate which direction the device is heading.
// showUserHeading: true
// })

// map.addControl(geolocate);

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

  function getCityName(lat,lng){
		// ** NOTE ** I updated the reverseGeocode method to update the city instead of street address. Checkout geocoder-utils **
		reverseGeocode({lat: lat, lng: lng}, mapToken).then(function (result) {
			return result
		});
	}




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
      // road-minor-case

      // road-path



  /* Weather forecast*/

 
  
}); //batas map.on('load)




   
  



function runPage(latitude, longitude){
		

		var marker = createMarker(latitude, longitude, map);

		var geocoder = createGeocoder();
		map.addControl(geocoder);

		monitorGeocoder(geocoder, marker);

    function onDragEnd() {
      const lngLat = marker.getLngLat();
      coordinates.style.display = 'block';
      coordinates.innerHTML = `Longitude: ${lngLat.lng}<br />Latitude: ${lngLat.lat}`;
      // koordinat1.innerHTML = `${lngLat.lng}`;
      // koordinat2.innerHTML = `${lngLat.lat}`
      koordinat1.setAttribute('value', `${lngLat.lng}` );
      koordinat2.setAttribute('value', `${lngLat.lat}`);
      typekoord.setAttribute('value', 'Point');

      var city = getCityName(newLat, newLng)
			updatePage(newLat, newLng, city, marker);
    
    
      }
      
       
      marker.on('dragend', onDragEnd);
    

		
	

	}



  }); //batas navigator
  
  // fitur search

  


