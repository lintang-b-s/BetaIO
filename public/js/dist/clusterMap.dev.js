"use strict";

var _ref;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var bounds = [[110.31690969576937, -7.843088122030792], // Southwest coordinates
[110.45391365019611, -7.7294930298637325] // Northeast coordinates
];
mapboxgl.accessToken = mapToken;
var map = new mapboxgl.Map({
  container: 'cluster-map',
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [110.370529, -7.797068],
  zoom: 12,
  maxBounds: bounds
});
map.addControl(new mapboxgl.NavigationControl()); //   const { JSDOM } = require( "jsdom" );
// const { window } = new JSDOM( "" );
// const $ = require( "jquery" )( window );
// buat melacak lokasi pengguna
//  map.addControl(   
//     new mapboxgl.GeolocateControl({
//     positionOptions: {
//     enableHighAccuracy: true
//     },
//     // When active the map will receive updates to the device's location as it changes.
//     trackUserLocation: true,
//     // Draw an arrow next to the location dot to indicate which direction the device is heading.
//     showUserHeading: true   
//     })

places.features.forEach(function (place, i) {
  place.id = i;
});
console.log(places); // menacri rute terpendek dari 2 tempat

var directions = new MapboxDirections((_ref = {
  accessToken: mapToken,
  unit: 'metric',
  profile: 'mapbox/driving',
  alternatives: false,
  geometries: 'geojson',
  controls: {
    instructions: false
  }
}, _defineProperty(_ref, "alternatives", true), _defineProperty(_ref, "language", 'id'), _defineProperty(_ref, "flyTo", false), _ref));
map.addControl(directions, 'top-left');
map.scrollZoom.enable(); // jalan clearaence

var clearances = {
  type: 'FeatureCollection',
  features: [{
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [-84.47426, 38.06673]
    },
    properties: {
      clearance: "13' 2"
    }
  }]
};
var obstacle = turf.buffer(clearances, 0.25, {
  units: 'kilometers'
});
var bbox = [0, 0, 0, 0];
var polygon = turf.bboxPolygon(bbox);
map.on('load', function () {
  map.getStyle().layers;
  console.log('map layer (sebelum di remove): ', map.getStyle().layers);

  if (map.getLayer('state-label')) {
    map.removeLayer('state-label');
  }

  ;

  if (map.getLayer('poi-label')) {
    map.removeLayer('poi-label');
  }

  ;

  if (map.getLayer('country-label')) {
    map.removeLayer('country-label');
  }

  ;

  if (map.getLayer('transit-label')) {
    map.removeLayer('transit-label');
  }

  ;

  if (map.getLayer('airport-label')) {
    map.removeLayer('airport-label');
  }

  ;

  if (map.getLayer('settlement-label')) {
    map.removeLayer('settlement-label');
  }

  ;

  if (map.getLayer('settlement-subdivision-label')) {
    map.removeLayer('settlement-subdivision-label');
  }

  ;

  if (map.getLayer('road-label')) {
    map.removeLayer('road-label');
  }

  ;

  if (map.getLayer('road-number-shield')) {
    map.removeLayer('road-number-shield');
  }

  ;

  if (map.getLayer('road-pedestrian')) {
    map.removeLayer('road-pedestrian');
  }

  ;

  if (map.getLayer('road-minor')) {
    map.removeLayer('road-minor');
  }

  ;

  if (map.getLayer('road-street')) {
    map.removeLayer('road-street');
  }

  ;

  if (map.getLayer('road-steps')) {
    map.removeLayer('road-steps');
  }

  ;

  if (map.getLayer('road-pedestrian-polygon-fill')) {
    map.removeLayer('road-pedestrian-polygon-fill');
  }

  ;

  if (map.getLayer('road-pedestrian-polygon-pattern')) {
    map.removeLayer('road-pedestrian-polygon-pattern');
  }

  ;

  if (map.getLayer('road-path')) {
    map.removeLayer('road-path');
  }

  ;

  if (map.getLayer('road-secondary-tertiary')) {
    map.removeLayer('road-secondary-tertiary');
  }

  ;

  if (map.getLayer('road-secondary-tertiary-case')) {
    map.removeLayer('road-secondary-tertiary-case');
  }

  ; // road secondry masih jalan utama yang lumayan besar

  if (map.getLayer('road-street-case')) {
    map.removeLayer('road-street-case');
  }

  ;

  if (map.getLayer('road-pedestrian-case')) {
    map.removeLayer('road-pedestrian-case');
  }

  ;

  if (map.getLayer('road-minor-case')) {
    map.removeLayer('road-minor-case');
  }

  ;

  if (map.getLayer('road-rail')) {
    map.removeLayer('road-rail');
  }

  ;

  if (map.getLayer('road-rail-tracks')) {
    map.removeLayer('road-rail-tracks');
  }

  ;

  if (map.getLayer('road-minor-low')) {
    map.removeLayer('road-minor-low');
  }

  ;

  if (map.getLayer('road-street-low')) {
    map.removeLayer('road-street-low');
  }

  ; // if (map.getLayer('water-line-label')) { map.removeLayer('water-line-label') };

  if (map.getLayer('water-point-label')) {
    map.removeLayer('water-point-label');
  }

  ;

  if (map.getLayer('bridge-path-bg')) {
    map.removeLayer('bridge-path-bg');
  }

  ;

  if (map.getLayer('bridge-steps-bg')) {
    map.removeLayer('bridge-steps-bg');
  }

  ;

  if (map.getLayer('bridge-pedestrian-case')) {
    map.removeLayer('bridge-pedestrian-case');
  }

  ;

  if (map.getLayer('bridge-street-minor-low')) {
    map.removeLayer('bridge-street-minor-low');
  }

  ;

  if (map.getLayer('bridge-street-minor-case')) {
    map.removeLayer('bridge-street-minor-case');
  }

  ;

  if (map.getLayer('bridge-primary-secondary-tertiary-case')) {
    map.removeLayer('bridge-primary-secondary-tertiary-case');
  }

  ;

  if (map.getLayer('bridge-major-link-case')) {
    map.removeLayer('bridge-major-link-case');
  }

  ;

  if (map.getLayer('bridge-motorway-trunk-case')) {
    map.removeLayer('bridge-motorway-trunk-case');
  }

  ;

  if (map.getLayer('bridge-construction')) {
    map.removeLayer('bridge-construction');
  }

  ;

  if (map.getLayer('bridge-path')) {
    map.removeLayer('bridge-path');
  }

  ;

  if (map.getLayer('bridge-steps')) {
    map.removeLayer('bridge-steps');
  }

  ;

  if (map.getLayer('bridge-major-link')) {
    map.removeLayer('bridge-major-link');
  }

  ;

  if (map.getLayer('bridge-street-minor')) {
    map.removeLayer('bridge-street-minor');
  }

  ;

  if (map.getLayer('bridge-street-minor')) {
    map.removeLayer('bridge-street-minor');
  }

  ;

  if (map.getLayer('bridge-oneway-arrow-blue')) {
    map.removeLayer('bridge-oneway-arrow-blue');
  }

  ;

  if (map.getLayer('bridge-motorway-trunk')) {
    map.removeLayer('bridge-motorway-trunk');
  }

  ;

  if (map.getLayer('bridge-rail')) {
    map.removeLayer('bridge-rail');
  }

  ;

  if (map.getLayer('bridge-rail-tracks')) {
    map.removeLayer('bridge-rail-tracks');
  }

  ;

  if (map.getLayer('bridge-major-link-2-case')) {
    map.removeLayer('bridge-major-link-2-case');
  }

  ;

  if (map.getLayer('bridge-motorway-trunk-2-case')) {
    map.removeLayer('bridge-motorway-trunk-2-case');
  }

  ;

  if (map.getLayer('bridge-motorway-trunk-2')) {
    map.removeLayer('bridge-motorway-trunk-2');
  }

  ;

  if (map.getLayer('bridge-oneway-arrow-white')) {
    map.removeLayer('bridge-oneway-arrow-white');
  }

  ;

  if (map.getLayer('aerialway')) {
    map.removeLayer('aerialway');
  }

  ;

  if (map.getLayer('bridge-pedestrian')) {
    map.removeLayer('bridge-pedestrian');
  }

  ;

  if (map.getLayer('bridge-primary-secondary-tertiary')) {
    map.removeLayer('bridge-primary-secondary-tertiary');
  }

  ;

  if (map.getLayer('bridge-major-link-2')) {
    map.removeLayer('bridge-major-link-2');
  }

  ;

  if (map.getLayer('aerialway')) {
    map.removeLayer('aerialway');
  }

  ; // road-minor-case
  // road-path

  console.log('map layer (setelah di remove): ', map.getStyle().layers); // Add a new source from our GeoJSON data and
  // set the 'cluster' option to true. GL-JS will
  // add the point_count property to your source data.

  map.addSource('places', {
    type: 'geojson',
    // Point to GeoJSON data. This example visualizes all M1.0+ earthquakes
    // from 12/22/15 to 1/21/16 as logged by USGS' Earthquake hazards program.
    data: places,
    // 'https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson',
    cluster: true,
    clusterMaxZoom: 14,
    // Max zoom to cluster points on
    clusterRadius: 50 // Radius of each cluster when clustering points (defaults to 50)

  });
  map.addLayer({
    id: 'clusters',
    type: 'circle',
    source: 'places',
    filter: ['has', 'point_count'],
    paint: {
      // Use step expressions (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
      // with three steps to implement three types of circles:
      //   * Blue, 20px circles when point count is less than 100
      //   * Yellow, 30px circles when point count is between 100 and 750
      //   * Pink, 40px circles when point count is greater than or equal to 750
      'circle-color': ['step', ['get', 'point_count'], 'red', 10, 'orange', 30, 'yellow'],
      'circle-radius': ['step', ['get', 'point_count'], 20, 10, 30, 30, 40]
    }
  });
  map.addLayer({
    id: 'cluster-count',
    type: 'symbol',
    source: 'places',
    filter: ['has', 'point_count'],
    layout: {
      'text-field': '{point_count_abbreviated}',
      'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
      'text-size': 12
    }
  });
  map.addLayer({
    id: 'unclustered-point',
    type: 'circle',
    source: 'places',
    filter: ['!', ['has', 'point_count']],
    paint: {
      'circle-color': '#11b4da',
      'circle-radius': 7,
      'circle-stroke-width': 1,
      'circle-stroke-color': '#fff'
    }
  }); // inspect a cluster on click

  map.on('click', 'clusters', function (e) {
    var features = map.queryRenderedFeatures(e.point, {
      layers: ['clusters']
    });
    var clusterId = features[0].properties.cluster_id;
    map.getSource('places').getClusterExpansionZoom(clusterId, function (err, zoom) {
      if (err) return;
      map.easeTo({
        center: features[0].geometry.coordinates,
        zoom: zoom
      });
    });
  }); // When a click event occurs on a feature in
  // the unclustered-point layer, open a popup at
  // the location of the feature, with
  // description HTML from its properties.

  map.on('click', 'unclustered-point', function (e) {
    var popUpMarkup = e.features[0].properties.popUpMarkup;
    var coordinates = e.features[0].geometry.coordinates.slice();
    console.log('props location: dari uncluestered: ', e.features[0].properties); // Ensure that if the map is zoomed out such that
    // multiple copies of the feature are visible, the
    // popup appears over the copy being pointed to.

    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
      coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }

    new mapboxgl.Popup().setLngLat(coordinates).setHTML(popUpMarkup).addTo(map);
  });
  map.on('mouseenter', 'clusters', function () {
    map.getCanvas().style.cursor = 'pointer';
  });
  map.on('mouseleave', 'clusters', function () {
    map.getCanvas().style.cursor = '';
  }); // menambah logic

  var geocoder = new MapboxGeocoder({
    accessToken: mapToken,
    mapboxgl: mapboxgl,
    marker: true,
    bbox: [110.3306814047222, -7.839425629947886, 110.42831473711401, -7.751932983787974]
  }); // -7.787258302535999, 110.3306814047222
  // -7.803199010398939, 110.42831473711401
  // min y -7.839425629947886, 110.3540841509897
  // maxy -7.751932983787974, 110.37840106715822

  console.log('sebelum buildplaceelist: ', places);
  buildPlaceList(places);
  map.addControl(geocoder, 'top-right');
  addMarkers();

  function getBbox(sortedPlaces, storeIdentifier, searchResult) {
    var lats = [sortedPlaces.features[storeIdentifier].geometry.coordinates[1], searchResult.coordinates[1]];
    var lons = [sortedPlaces.features[storeIdentifier].geometry.coordinates[0], searchResult.coordinates[0]];
    var sortedLons = lons.sort(function (a, b) {
      if (a > b) {
        return 1;
      }

      if (a.distance < b.distance) {
        return -1;
      }

      return 0;
    });
    var sortedLats = lats.sort(function (a, b) {
      if (a > b) {
        return 1;
      }

      if (a.distance < b.distance) {
        return -1;
      }

      return 0;
    });
    return [[sortedLons[0], sortedLats[0]], [sortedLons[1], sortedLats[1]]];
  }

  function addMarkers() {
    /* For each feature in the GeoJSON object above: */
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      var _loop = function _loop() {
        var marker = _step.value;

        /* Create a div element for the marker. */
        var el = document.createElement('div');
        /* Assign a unique `id` to the marker. */

        el.id = "marker-".concat(marker.id);
        /* Assign the `marker` class to each marker for styling. */

        el.className = 'marker';
        /**
         * Create a marker using the div element
         * defined above and add it to the map.
         **/

        new mapboxgl.Marker(el, {
          offset: [0, -23]
        }).setLngLat(marker.geometry.coordinates).addTo(map);
        /**
         * Listen to the element and when it is clicked, do three things:
         * 1. Fly to the point
         * 2. Close all other popups and display popup for clicked store
         * 3. Highlight listing in sidebar (and remove highlight for all other listings)
         **/

        el.addEventListener('click', function (e) {
          flyToPlace(marker);
          createPopUp(marker);
          var activeItem = document.getElementsByClassName('active');
          e.stopPropagation();

          if (activeItem[0]) {
            activeItem[0].classList.remove('active');
          }

          var listing = document.getElementById("listing-".concat(marker.id));
          listing.classList.add('active');
        });
      };

      for (var _iterator = places.features[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        _loop();
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator["return"] != null) {
          _iterator["return"]();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  }

  var filterEl = document.getElementById('feature-filter'); //   function normalize(string) {
  //     return string.trim().toLowerCase();
  // }

  function buildPlaceList(places) {
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = places.features[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var place = _step2.value;

        /* Add a new listing section to the sidebar. */
        var listings = document.getElementById('listings');
        var listing = listings.appendChild(document.createElement('div'));
        /* Assign a unique `id` to the listing. */

        listing.id = "listing-".concat(place.id);
        /* Assign the `item` class to each listing for styling. */

        listing.className = 'item';
        /* Add the link to the individual listing created above. */

        var link = listing.appendChild(document.createElement('a'));
        link.className = 'title';
        link.id = "link-".concat(place.id);
        link.innerHTML = "".concat(place.title); //   filterEl.parentNode.style.display = 'block';
        //   if (place === 0 && filterEl.value !== '') {
        //     empty.textContent = 'No results found';
        //     listing.appendChild(empty);
        // }

        /* Add details to the individual listing. */

        var details = listing.appendChild(document.createElement('div'));
        details.innerHTML = "".concat(place.location);

        if (place.type) {
          details.innerHTML += " &middot; ".concat(place.type);
        }

        if (place.distance) {
          var roundedDistance = Math.round(place.distance * 100) / 100;
          details.innerHTML += "<div><strong>".concat(roundedDistance, " miles away</strong></div>");
        }
        /**
         * Listen to the element and when it is clicked, do four things:
         * 1. Update the `currentFeature` to the place associated with the clicked link
         * 2. Fly to the point
         * 3. Close all other popups and display popup for clicked place
         * 4. Highlight listing in sidebar (and remove highlight for all other listings)
         **/


        link.addEventListener('click', function () {
          var _iteratorNormalCompletion3 = true;
          var _didIteratorError3 = false;
          var _iteratorError3 = undefined;

          try {
            for (var _iterator3 = places.features[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
              var feature = _step3.value;

              if (this.id === "link-".concat(feature.id)) {
                flyToPlace(feature);
                createPopUp(feature);
              }
            }
          } catch (err) {
            _didIteratorError3 = true;
            _iteratorError3 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
                _iterator3["return"]();
              }
            } finally {
              if (_didIteratorError3) {
                throw _iteratorError3;
              }
            }
          }

          var activeItem = document.getElementsByClassName('active');

          if (activeItem[0]) {
            activeItem[0].classList.remove('active');
          }

          this.parentNode.classList.add('active');
        });
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
          _iterator2["return"]();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }
  } //   filterEl.addEventListener('keyup', (e) => {
  //     const value = normalize(e.target.value);
  //     // Filter visible features that match the input value.
  //     const filtered = [];
  //     for (const feature of places.features) {
  //       console.log("name di feature: ", feature.name)
  //         const name = normalize(feature.name);
  //         const code = normalize(feature.type);
  //         if (name.includes(value) || code.includes(value)) {
  //             filtered.push(feature);
  //         }
  //     }
  //     // Populate the sidebar with filtered results
  //     // renderListings(filtered);
  //     // Set the filter to populate features into the layer.
  //     if (filtered.length) {
  //         map.setFilter('unclustered-point', [
  //             'match',
  //             ['get', 'type'],
  //             filtered.map((feature) => {
  //                 return feature.properties.type;
  //             }),,
  //             true,
  //             false
  //         ]);
  //     }
  // });


  function flyToPlace(currentFeature) {
    map.flyTo({
      center: currentFeature.geometry.coordinates,
      zoom: 15
    });
  }
  /**
    * Create a Mapbox GL JS `Popup`.
    **/


  function createPopUp(currentFeature) {
    var popUps = document.getElementsByClassName('mapboxgl-popup'); // const { popUpMarkup } = currentFeature.features[0].properties;

    if (popUps[0]) popUps[0].remove();
    var popup = new mapboxgl.Popup({
      closeOnClick: false
    }).setLngLat(currentFeature.geometry.coordinates).setHTML("<h5>".concat(currentFeature.title, "</h5><h5>").concat(currentFeature.location, "</h5> <h5>sejauh ").concat(currentFeature.distance, " miles</h5>\n                  <ul>\n                    <li>type: ").concat(currentFeature.type, " </li>\n                    <li>flora: ").concat(currentFeature.flora, " </li>\n                    <li>fauna: ").concat(currentFeature.fauna, " </li>\n                    <li>makanan: ").concat(currentFeature.makanan, " </li>\n                    <li>habitant: ").concat(currentFeature.habitant, " </li>\n                    <li id=\"air\">sumber air: ").concat(currentFeature.sumberAir, " </li>\n\n                  </ul>\n                  \n                  ")).addTo(map);
  } //   map.on('click', 'unclustered-point', function (e) {
  //     const { popUpMarkup } = e.features[0].properties;
  //     const coordinates = e.features[0].geometry.coordinates.slice();
  //     // Ensure that if the map is zoomed out such that
  //     // multiple copies of the feature are visible, the
  //     // popup appears over the copy being pointed to.
  //     while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
  //         coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
  //     }
  //     new mapboxgl.Popup()
  //         .setLngLat(coordinates)
  //         .setHTML(popUpMarkup)
  //         .addTo(map);
  // });
  // mencari rute terpendek


  map.addLayer({
    id: 'clearances',
    type: 'fill',
    source: {
      type: 'geojson',
      data: obstacle
    },
    layout: {},
    paint: {
      'fill-color': '#f03b20',
      'fill-opacity': 0.5,
      'fill-outline-color': '#f03b20'
    }
  });
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
  }); // Source and layer for the bounding box

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
  var geolocate = new mapboxgl.GeolocateControl({
    positionOptions: {
      enableHighAccuracy: true
    },
    // When active the map will receive updates to the device's location as it changes.
    trackUserLocation: true,
    // Draw an arrow next to the location dot to indicate which direction the device is heading.
    showUserHeading: true
  });
  map.addControl(geolocate);
  geolocate.on('geolocate', function () {
    console.log("geolocate telah dilakukan"); // buat mencari jarak terdekat dari lokasi pengguna ke lokasi lain

    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };
    var crd = 0;
    var lat = 0;
    var _long = 0; //yang undefined di sininya anjir

    function success(pos) {
      crd = pos.coords;
      return [crd.longitude, crd.latitude];
    }

    navigator.geolocation.getCurrentPosition(function (position) {
      // console.log('js biasa latitude: ', position.coords.latitude);
      // console.log('jsbiasa longitude:', position.coords.longitude);
      lat = position.coords.latitude;
      _long = position.coords.longitude;
      console.log('coba latitude longitude', lat, "  ", _long);

      function error(err) {
        console.warn("ERROR(".concat(err.code, "): ").concat(err.message));
      }
      /* Get the coordinate of the search result */
      // console.log('geolocate:', geolocate.options.geolocation.getCurrentPosition(success,error,options))


      var searchResult = [_long, lat];
      console.log('search result gps: ', searchResult);
      /**
       * Calculate distances:
       * For each store, use turf.disance to calculate the distance
       * in miles between the searchResult and the store. Assign the
       * calculated value to a property called `distance`.
       */

      var optionss = {
        units: 'miles'
      };
      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = places.features[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var place = _step4.value;
          console.log('nama place di bukan map.onload: ', place.name);
          place.distance = turf.distance(searchResult, place.geometry, optionss);
        }
        /**
         * Sort places by distance from closest to the `searchResult`
         * to furthest.
         */

      } catch (err) {
        _didIteratorError4 = true;
        _iteratorError4 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion4 && _iterator4["return"] != null) {
            _iterator4["return"]();
          }
        } finally {
          if (_didIteratorError4) {
            throw _iteratorError4;
          }
        }
      }

      places.features.sort(function (a, b) {
        if (a.distance > b.distance) {
          return 1;
        }

        if (a.distance < b.distance) {
          return -1;
        }

        return 0; // a must be equal to b
      });
      /**
       * Rebuild the listings:
       * Remove the existing listings and build the location
       * list again using the newly sorted places.
       */

      var empty = document.createElement('p'); //  filterEl.parentNode.style.display = 'block';
      //  if (places.length === 0 && filterEl.value !== '') {
      //   empty.textContent = 'No results found';
      //   listings.appendChild(empty);
      //  }

      var listings = document.getElementById('listings');

      while (listings.firstChild) {
        listings.removeChild(listings.firstChild);
      }

      buildPlaceList(places);
      /* Open a popup for the closest store. */

      createPopUp(places.features[0]);
      /** Highlight the listing for the closest store. */

      var activeListing = document.getElementById("listing-".concat(places.features[0].id));
      activeListing.classList.add('active');
      /**
       * Adjust the map camera:
       * Get a bbox that contains both the geocoder result and
       * the closest store. Fit the bounds to that bbox.
       */

      var bbox = getBbox(places, 0, searchResult);
      map.fitBounds(bbox, {
        padding: 100
      });

      function buildPlaceList(places) {
        var _iteratorNormalCompletion5 = true;
        var _didIteratorError5 = false;
        var _iteratorError5 = undefined;

        try {
          for (var _iterator5 = places.features[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
            var normalize = function normalize(string) {
              return string.trim().toLowerCase();
            };

            var place = _step5.value;

            /* Add a new listing section to the sidebar. */
            var _listings = document.getElementById('listings');

            var listing = _listings.appendChild(document.createElement('div'));
            /* Assign a unique `id` to the listing. */


            listing.id = "listing-".concat(place.id);
            /* Assign the `item` class to each listing for styling. */

            listing.className = 'item';
            /* Add the link to the individual listing created above. */

            var link = listing.appendChild(document.createElement('a'));
            link.className = 'title';
            link.id = "link-".concat(place.id);
            link.innerHTML = "".concat(place.title);
            /* Add details to the individual listing. */

            var details = listing.appendChild(document.createElement('div'));
            details.innerHTML = "".concat(place.location);
            console.log('coba img url: ', place.images[0].url);

            if (place.type) {
              details.innerHTML += " &middot; ".concat(place.type);
            }

            if (place.distance) {
              var roundedDistance = Math.round(place.distance * 100) / 100;
              details.innerHTML += "<div><strong>".concat(roundedDistance, " miles away</strong></div>");
            }

            console.log("places di load: ", places); // menngisi filter di searchbox
            // filterEl.addEventListener('keyup', (e) => {
            //   const value = normalize(e.target.value);
            //   // Filter visible features that match the input value.
            //   const filtered = [];
            //   for (const feature of places.features) {
            //     console.log('feature di filter.name: ', feature.name)
            //       const name = normalize(feature.name);
            //       const loc = normalize(feature.location);
            //       if (name.includes(value) || loc.includes(value)) {
            //           filtered.push(feature);
            //       }
            //   }
            //   // Populate the sidebar with filtered results
            //   // renderListings(filtered);
            //   buildPlaceList(filtered);
            // Set the filter to populate features into the layer.
            //     if (filtered.length) {
            //         map.setFilter('unclustered-point', [
            //             'match',
            //             ['get', 'location'],
            //             filtered.map((feature) => {
            //                 return feature.location;
            //             }),
            //             true,
            //             false
            //         ]);
            //     }
            // });

            /**
             * Listen to the element and when it is clicked, do four things:
             * 1. Update the `currentFeature` to the place associated with the clicked link
             * 2. Fly to the point
             * 3. Close all other popups and display popup for clicked place
             * 4. Highlight listing in sidebar (and remove highlight for all other listings)
             **/

            link.addEventListener('click', function () {
              var _iteratorNormalCompletion6 = true;
              var _didIteratorError6 = false;
              var _iteratorError6 = undefined;

              try {
                for (var _iterator6 = places.features[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
                  var feature = _step6.value;

                  if (this.id === "link-".concat(feature.id)) {
                    flyToPlace(feature);
                    createPopUp(feature);
                  }
                }
              } catch (err) {
                _didIteratorError6 = true;
                _iteratorError6 = err;
              } finally {
                try {
                  if (!_iteratorNormalCompletion6 && _iterator6["return"] != null) {
                    _iterator6["return"]();
                  }
                } finally {
                  if (_didIteratorError6) {
                    throw _iteratorError6;
                  }
                }
              }

              var activeItem = document.getElementsByClassName('active');

              if (activeItem[0]) {
                activeItem[0].classList.remove('active');
              }

              this.parentNode.classList.add('active');
            });
          }
        } catch (err) {
          _didIteratorError5 = true;
          _iteratorError5 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion5 && _iterator5["return"] != null) {
              _iterator5["return"]();
            }
          } finally {
            if (_didIteratorError5) {
              throw _iteratorError5;
            }
          }
        }
      }
      /**
       * Create a Mapbox GL JS `Popup`.
       **/


      function createPopUp(currentFeature) {
        var popUps = document.getElementsByClassName('mapboxgl-popup'); // const { popUpMarkup } = currentFeature.features[0].properties;

        if (popUps[0]) popUps[0].remove();
        var popup = new mapboxgl.Popup({
          closeOnClick: false
        }).setLngLat(currentFeature.geometry.coordinates).setHTML("<h5>".concat(currentFeature.title, "</h5><h5>").concat(currentFeature.location, "</h5> <h5>sejauh ").concat(currentFeature.distance, " miles</h5>\n                     <img class=\"img-fluid\" src=\"").concat(currentFeature.images[0].url, "\" alt=\"gambar place\">  </img>\n                    <ul>\n                      <li>type: ").concat(currentFeature.type, " </li>\n                      <li>flora: ").concat(currentFeature.flora, " </li>\n                      <li>fauna: ").concat(currentFeature.fauna, " </li>\n                      <li>makanan: ").concat(currentFeature.makanan, " </li>\n                      <li>habitant: ").concat(currentFeature.habitant, " </li>\n                      <li id=\"air\">sumber air: ").concat(currentFeature.sumberAir, " </li>\n  \n                    </ul>\n                    \n                    ")).addTo(map);
      }

      function getBbox(sortedPlaces, storeIdentifier, searchResult) {
        console.log('latitude di get bbox: ', searchResult[1]);
        var lats = [sortedPlaces.features[storeIdentifier].geometry.coordinates[1], searchResult[1]];
        var lons = [sortedPlaces.features[storeIdentifier].geometry.coordinates[0], searchResult[0]];
        var sortedLons = lons.sort(function (a, b) {
          if (a > b) {
            return 1;
          }

          if (a.distance < b.distance) {
            return -1;
          }

          return 0;
        });
        var sortedLats = lats.sort(function (a, b) {
          if (a > b) {
            return 1;
          }

          if (a.distance < b.distance) {
            return -1;
          }

          return 0;
        });
        return [[sortedLons[0], sortedLats[0]], [sortedLons[1], sortedLats[1]]];
      }

      function addMarkers() {
        /* For each feature in the GeoJSON object above: */
        var _iteratorNormalCompletion7 = true;
        var _didIteratorError7 = false;
        var _iteratorError7 = undefined;

        try {
          var _loop2 = function _loop2() {
            var marker = _step7.value;

            /* Create a div element for the marker. */
            var el = document.createElement('div');
            /* Assign a unique `id` to the marker. */

            el.id = "marker-".concat(marker.id);
            /* Assign the `marker` class to each marker for styling. */

            el.className = 'marker';
            /**
             * Create a marker using the div element
             * defined above and add it to the map.
             **/

            new mapboxgl.Marker(el, {
              offset: [0, -23]
            }).setLngLat(marker.geometry.coordinates).addTo(map);
            /**
             * Listen to the element and when it is clicked, do three things:
             * 1. Fly to the point
             * 2. Close all other popups and display popup for clicked store
             * 3. Highlight listing in sidebar (and remove highlight for all other listings)
             **/

            el.addEventListener('click', function (e) {
              flyToPlace(marker);
              createPopUp(marker);
              var activeItem = document.getElementsByClassName('active');
              e.stopPropagation();

              if (activeItem[0]) {
                activeItem[0].classList.remove('active');
              }

              var listing = document.getElementById("listing-".concat(marker.id));
              listing.classList.add('active');
            });
          };

          for (var _iterator7 = places.features[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
            _loop2();
          }
        } catch (err) {
          _didIteratorError7 = true;
          _iteratorError7 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion7 && _iterator7["return"] != null) {
              _iterator7["return"]();
            }
          } finally {
            if (_didIteratorError7) {
              throw _iteratorError7;
            }
          }
        }
      }

      function flyToPlace(currentFeature) {
        map.flyTo({
          center: currentFeature.geometry.coordinates,
          zoom: 15
        });
      }
    });
  }); // batas geolocate

  /* Weather forecast*/
  // fungsi untuk menambahkan weather forecast
  // long,lat : 110.3751748, -7.7573033

  function geocode(search, token) {
    var baseUrl = 'https://api.mapbox.com';
    var endPoint = '/geocoding/v5/mapbox.places/';
    return fetch(baseUrl + endPoint + encodeURIComponent(search) + '.json' + "?" + 'access_token=' + token).then(function (res) {
      return res.json(); // to get all the data from the request, comment out the following three lines...
    }).then(function (data) {
      return data.features[0].center;
    });
  }

  function reverseGeocode(coordinates, token) {
    var baseUrl = 'https://api.mapbox.com';
    var endPoint = '/geocoding/v5/mapbox.places/';
    return fetch(baseUrl + endPoint + coordinates.lng + "," + coordinates.lat + '.json' + "?" + 'types=poi&' + 'access_token=' + token).then(function (res) {
      return res.json();
    }) // to get all the data from the request, comment out the following three lines...
    .then(function (data) {
      for (var i = 0; i < data.features.length; i++) {
        if (data.features[i].place_type[0] === "place") {
          console.log('data.features: direversegeocode ', data.features[i]);
          return data.features[i].place_name;
        }
      }

      console.log('data.features: direversegeocode ', data.features[0]);
      return data.features[0].place_name;
    });
  }

  var startingLat = -7.7573033;
  var startingLng = 110.3751748; //On initial load set city name

  getCityName(startingLat, startingLng); //On initial run the page

  runPage(startingLat, startingLng); // Creates map with mapOptions

  var weatherRow = document.getElementById('weather-row'); // let currentCity = document.getElementById('current-city');
  //Creates marker

  function createMarker(latitude, longitude, map) {
    var markerOptions = {
      draggable: true
    };
    return new mapboxgl.Marker(markerOptions).setLngLat([longitude, latitude]).addTo(map);
  } // When a click event occurs on a feature in
  // the unclustered-point layer, open a popup at
  // the location of the feature, with
  // description HTML from its properties.


  function monitorGeocoder(marker) {
    map.on('click', 'unclustered-point', function (e) {
      // const { popUpMarkup } = e.features[0].properties;
      // const coordinates = e.features[0].geometry.coordinates;
      console.log('geomtery: utk weather: ', e.features[0].geometry.coordinates[1]);
      console.log('propersties di weatehr: ', e.features[0].properties.location);
      var geoLat = e.features[0].geometry.coordinates[1];
      var geoLng = e.features[0].geometry.coordinates[0];
      var weather = e.features[0].properties.location.weather;
      var loc = getCityName(geoLat, geoLng);
      updatePage(geoLat, geoLng, loc, marker);
    });
  } //Updates the page dynamically with geocoder results


  function updatePage(latitude, longitude, weather, marker) {
    getWeather(latitude, longitude);
    $('#current-city').html(weather);
    marker.setLngLat([longitude, latitude]);
  }

  function getCityName(lat, lng) {
    // ** NOTE ** I updated the reverseGeocode method to update the city instead of street address. Checkout geocoder-utils **
    reverseGeocode({
      lat: lat,
      lng: lng
    }, mapToken).then(function (result) {});
  }

  function loopThroughWeeklyForecast(data) {
    var html = '';

    for (var i = 0; i < 5; i++) {
      html += '<div class="col-12 col-lg-2" id="weather-card">';
      html += createWeatherCard(data[i]);
      html += '</div>';
    }

    return html;
  } // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString
  // https://stackoverflow.com/questions/4822852/how-to-get-the-day-of-week-and-the-month-of-the-year
  // https://stackoverflow.com/questions/1056728/where-can-i-find-documentation-on-formatting-a-date-in-javascript


  function convertTimestampToDate(timestamp) {
    var theDate = new Date(timestamp * 1000);
    var options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    return theDate.toLocaleDateString('en-us', options);
  }

  function extractWeatherData(data) {
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
    };
  }

  function FtoC(fahrenheit) {
    var fTemp = fahrenheit;
    var fToCel = (fTemp - 32) * 5 / 9;
    return fToCel.toFixed(2);
  }

  function createWeatherCard(data) {
    var weather = extractWeatherData(data);
    var html = '';
    html += '<div class="card h-100">';
    html += '<div class="card-header text-center">';
    html += '<p>' + convertTimestampToDate(weather.timestamp) + '</p>';
    html += '</div>';
    html += '<div class="card-block">';
    html += '<div class="card-body">';
    html += '<h5 class="card-title text-center">temperatur min/max: ' + FtoC(weather.tempMin) + '&#176; C / ' + FtoC(weather.tempMax) + '&#176; C</h5>';
    html += '<img class="mx-auto d-block" src="http://openweathermap.org/img/w/' + weather.icon + '.png" alt="">';
    console.log("coba url weather: " + '<img class="mx-auto d-block" src="http://openweathermap.org/img/w/' + weather.icon + '.png" alt="">');
    html += '<p class="card-text"><span class="font-weight-bold">Pagi: </span>' + FtoC(weather.tempMorn) + '&#176; C</p>';
    html += '<p class="card-text"><span class="font-weight-bold">Siang: </span>' + FtoC(weather.tempDay) + '&#176; C</p>';
    html += '<p class="card-text"><span class="font-weight-bold">Sore: </span>' + FtoC(weather.tempEve) + '&#176; C</p>';
    html += '<p class="card-text"><span class="font-weight-bold">Malam: </span>' + FtoC(weather.tempNight) + '&#176; C</p>';
    html += '<p class="card-text"><span class="font-weight-bold">Description: </span>' + weather.description + '</p>';
    html += '<p class="card-text"><span class="font-weight-bold">Humidity: </span>' + weather.humidity + '</p>';
    html += '<p class="card-text"><span class="font-weight-bold">Wind: </span>' + weather.wind + '</p>';
    html += '</div>';
    html += '</div>';
    html += '</div>';
    return html;
  }

  function getWeather(latitude, longitude) {
    $.get("https://api.openweathermap.org/data/3.0/onecall", {
      appid: "08f757ba1eb9909745e792c139d9672b",
      lat: latitude,
      lon: longitude,
      units: "imperial",
      exclude: "minutely,alerts"
    }).done(function (data) {
      $('#weather-row').html(loopThroughWeeklyForecast(data.daily)); // weatherRow.innerHTML = loopThroughWeeklyForecast(data.daily)
    });
  }

  function runPage(latitude, longitude) {
    getWeather(latitude, longitude); // var geocoder = createGeocoder();

    var marker = createMarker(latitude, longitude, map); // map.addControl(geocoder);

    monitorGeocoder(marker); //https://docs.mapbox.com/mapbox-gl-js/example/drag-a-marker/

    function onDragEnd() {
      var lngLat = marker.getLngLat();
      var newLng = lngLat.lng;
      var newLat = lngLat.lat;
      var city = getCityName(newLat, newLng);
      console.log('city dari getcityname: ', city);
      updatePage(newLat, newLng, city, marker); // getWeather(newLat, newLng);
    }

    marker.on('dragend', onDragEnd);
  }
}); // batas map.on('load)

var counter = 0;
var maxAttempts = 50;
var emoji = '';
var collision = '';
var detail = '';
directions.on('clear', function () {
  map.setLayoutProperty('theRoute', 'visibility', 'none');
  map.setLayoutProperty('theBox', 'visibility', 'none');
  counter = 0;
});
directions.on('route', function (event) {
  // Hide the route and box by setting the opacity to zero
  map.setLayoutProperty('theRoute', 'visibility', 'none');
  map.setLayoutProperty('theBox', 'visibility', 'none');

  if (counter >= maxAttempts) {} else {
    // Make each route visible
    var _iteratorNormalCompletion8 = true;
    var _didIteratorError8 = false;
    var _iteratorError8 = undefined;

    try {
      for (var _iterator8 = event.route[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
        var route = _step8.value;
        // Make each route visible
        map.setLayoutProperty('theRoute', 'visibility', 'visible');
        map.setLayoutProperty('theBox', 'visibility', 'visible'); // Get GeoJSON LineString feature of route

        var routeLine = polyline.toGeoJSON(route.geometry); // Create a bounding box around this route
        // The app will find a random point in the new bbox

        bbox = turf.bbox(routeLine);
        polygon = turf.bboxPolygon(bbox); // Update the data for the route
        // This will update the route line on the map

        map.getSource('theRoute').setData(routeLine); // Update the box

        map.getSource('theBox').setData(polygon);
        var clear = turf.booleanDisjoint(obstacle, routeLine);

        if (clear === true) {
          collision = 'does not intersect any obstacles!';
          detail = "takes ".concat((route.duration / 60).toFixed(0), " minutes and avoids");
          emoji = '✔️';
          map.setPaintProperty('theRoute', 'line-color', '#74c476'); // Hide the box

          map.setLayoutProperty('theBox', 'visibility', 'none'); // Reset the counter

          counter = 0;
        } else {
          // Collision occurred, so increment the counter
          counter = counter + 1; // As the attempts increase, expand the search area
          // by a factor of the attempt count

          polygon = turf.transformScale(polygon, counter * 0.01);
          bbox = turf.bbox(polygon);
          collision = 'is bad.';
          detail = "takes ".concat((route.duration / 60).toFixed(0), " minutes and hits");
          emoji = '⚠️';
          map.setPaintProperty('theRoute', 'line-color', '#de2d26'); // Add a randomly selected waypoint to get a new route from the Directions API

          var randomWaypoint = turf.randomPoint(1, {
            bbox: bbox
          });
          directions.setWaypoint(0, randomWaypoint['features'][0].geometry.coordinates);
        } // Add a new report section to the sidebar

      }
    } catch (err) {
      _didIteratorError8 = true;
      _iteratorError8 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion8 && _iterator8["return"] != null) {
          _iterator8["return"]();
        }
      } finally {
        if (_didIteratorError8) {
          throw _iteratorError8;
        }
      }
    }
  }
});