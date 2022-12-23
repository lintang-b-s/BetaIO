const bounds = [
  [110.31690969576937, -7.843088122030792], // Southwest coordinates
  [110.45391365019611, -7.7294930298637325] // Northeast coordinates
  ];

  
  mapboxgl.accessToken = mapToken;
    const map = new mapboxgl.Map({
        container: 'cluster-map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [110.370529,-7.797068],
        zoom: 12,
        maxBounds: bounds 
    });
 
    map.addControl(new mapboxgl.NavigationControl());

  //   const { JSDOM } = require( "jsdom" );
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


    

    


      
    places.features.forEach((place, i) => {
      place.id = i;
    })
    console.log(places)




    // menacri rute terpendek dari 2 tempat

    const directions = new MapboxDirections({
      accessToken: mapToken,
      unit: 'metric',
      profile: 'mapbox/driving',
      alternatives: false,
      geometries: 'geojson',
      controls: { instructions: false },
      alternatives: true,
      // bbox: [110.3306814047222, -7.839425629947886, 110.42831473711401, -7.751932983787974],
      language: 'id',
      
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



    map.on('load', function () {

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


      console.log('map layer (setelah di remove): ', map.getStyle().layers)
        // Add a new source from our GeoJSON data and
        // set the 'cluster' option to true. GL-JS will
        // add the point_count property to your source data.
        map.addSource('places', {
            type: 'geojson',
            // Point to GeoJSON data. This example visualizes all M1.0+ earthquakes
            // from 12/22/15 to 1/21/16 as logged by USGS' Earthquake hazards program.
            data: places,
                // 'https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson',
            cluster: true,
            clusterMaxZoom: 14, // Max zoom to cluster points on
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
                'circle-color': [
                    'step',
                    ['get', 'point_count'],
                    'red',
                    10,
                    'orange',
                    30,
                    'yellow',
                ],
                'circle-radius': [
                    'step',
                    ['get', 'point_count'],
                    20,
                    10,
                    30,
                    30,
                    40
                ]
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
        });

        // inspect a cluster on click
        map.on('click', 'clusters', function (e) {
            const features = map.queryRenderedFeatures(e.point, {
                layers: ['clusters']
            });
            const clusterId = features[0].properties.cluster_id;
          
            map.getSource('places').getClusterExpansionZoom(
                clusterId,
                function (err, zoom) {
                    if (err) return;

                    map.easeTo({
                        center: features[0].geometry.coordinates,
                        zoom: zoom
                    });
                }
            );
        });

        // When a click event occurs on a feature in
        // the unclustered-point layer, open a popup at
        // the location of the feature, with
        // description HTML from its properties.
        map.on('click', 'unclustered-point', function (e) {
            const { popUpMarkup } = e.features[0].properties;
            const coordinates = e.features[0].geometry.coordinates.slice();
            console.log('props location: dari uncluestered: ', e.features[0].properties)
         
            

            // Ensure that if the map is zoomed out such that
            // multiple copies of the feature are visible, the
            // popup appears over the copy being pointed to.
            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            }

            new mapboxgl.Popup()
                .setLngLat(coordinates)
                .setHTML(popUpMarkup)
                .addTo(map);



        });

        map.on('mouseenter', 'clusters', function () {
            map.getCanvas().style.cursor = 'pointer';
        });
        map.on('mouseleave', 'clusters', function () {
            map.getCanvas().style.cursor = '';
        });

        // menambah logic
      


        const geocoder = new MapboxGeocoder({
            accessToken: mapToken,
            mapboxgl: mapboxgl,
            marker: true,
            bbox: [110.3306814047222, -7.839425629947886, 110.42831473711401, -7.751932983787974]
          });

          // -7.787258302535999, 110.3306814047222
          // -7.803199010398939, 110.42831473711401
          // min y -7.839425629947886, 110.3540841509897
          // maxy -7.751932983787974, 110.37840106715822

          console.log('sebelum buildplaceelist: ', places)
          buildPlaceList(places);
          map.addControl(geocoder, 'top-right');
          addMarkers();


       
          
          




          
          function getBbox(sortedPlaces, storeIdentifier, searchResult) {
            const lats = [
              sortedPlaces.features[storeIdentifier].geometry.coordinates[1],
              searchResult.coordinates[1]
            ];
            const lons = [
              sortedPlaces.features[storeIdentifier].geometry.coordinates[0],
              searchResult.coordinates[0]
            ];
            const sortedLons = lons.sort((a, b) => {
              if (a > b) {
                return 1;
              }
              if (a.distance < b.distance) {
                return -1;
              }
              return 0;
            });
            const sortedLats = lats.sort((a, b) => {
              if (a > b) {
                return 1;
              }
              if (a.distance < b.distance) {
                return -1;
              }
              return 0;
            });
            return [
              [sortedLons[0], sortedLats[0]],
              [sortedLons[1], sortedLats[1]]
            ];
          }



          function addMarkers() {
            /* For each feature in the GeoJSON object above: */
            for (const marker of places.features) {
              /* Create a div element for the marker. */
              const el = document.createElement('div');
              /* Assign a unique `id` to the marker. */
              el.id = `marker-${marker.id}`;
              /* Assign the `marker` class to each marker for styling. */
              el.className = 'marker';
    
              /**
               * Create a marker using the div element
               * defined above and add it to the map.
               **/
              new mapboxgl.Marker(el, { offset: [0, -23] })
                .setLngLat(marker.geometry.coordinates)
                .addTo(map);
    
              /**
               * Listen to the element and when it is clicked, do three things:
               * 1. Fly to the point
               * 2. Close all other popups and display popup for clicked store
               * 3. Highlight listing in sidebar (and remove highlight for all other listings)
               **/
              el.addEventListener('click', (e) => {
                flyToPlace(marker);
                createPopUp(marker);
                const activeItem = document.getElementsByClassName('active');
                e.stopPropagation();
                if (activeItem[0]) {
                  activeItem[0].classList.remove('active');
                }
                const listing = document.getElementById(
                  `listing-${marker.id}`
                );
                listing.classList.add('active');
              });
            }
          }


          const filterEl = document.getElementById('feature-filter');

        //   function normalize(string) {
        //     return string.trim().toLowerCase();
        // }

          function buildPlaceList(places) {
            for (const place of places.features) {
              /* Add a new listing section to the sidebar. */
              const listings = document.getElementById('listings');
              const listing = listings.appendChild(document.createElement('div'));
              /* Assign a unique `id` to the listing. */
              listing.id = `listing-${place.id}`;
              /* Assign the `item` class to each listing for styling. */
              listing.className = 'item';
    
              /* Add the link to the individual listing created above. */
              const link = listing.appendChild(document.createElement('a'));
              
              link.className = 'title';
              link.id = `link-${place.id}`;
              link.innerHTML = `${place.title}`;
              
            //   filterEl.parentNode.style.display = 'block';
            //   if (place === 0 && filterEl.value !== '') {
            //     empty.textContent = 'No results found';
            //     listing.appendChild(empty);
            // }

              /* Add details to the individual listing. */
              const details = listing.appendChild(document.createElement('div'));
              details.innerHTML = `${place.location}`;
              if (place.type) {
                details.innerHTML += ` &middot; ${place.type}`;
              }
              if (place.distance) {
                const roundedDistance =
                  Math.round(place.distance * 100) / 100;
                details.innerHTML += `<div><strong>${roundedDistance} miles away</strong></div>`;
              }
    
              /**
               * Listen to the element and when it is clicked, do four things:
               * 1. Update the `currentFeature` to the place associated with the clicked link
               * 2. Fly to the point
               * 3. Close all other popups and display popup for clicked place
               * 4. Highlight listing in sidebar (and remove highlight for all other listings)
               **/
              link.addEventListener('click', function () {
                for (const feature of places.features) {
                  if (this.id === `link-${feature.id}`) {
                    flyToPlace(feature);
                    createPopUp(feature);
                  }
                }
                const activeItem = document.getElementsByClassName('active');
                if (activeItem[0]) {
                  activeItem[0].classList.remove('active');
                }
                this.parentNode.classList.add('active');
              });
            }
          }


        //   filterEl.addEventListener('keyup', (e) => {
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
              const popUps = document.getElementsByClassName('mapboxgl-popup');
              // const { popUpMarkup } = currentFeature.features[0].properties;
              if (popUps[0]) popUps[0].remove();

              const popup = new mapboxgl.Popup({ closeOnClick: false })
                .setLngLat(currentFeature.geometry.coordinates)
                .setHTML(
                  `<h5>${currentFeature.title}</h5><h5>${currentFeature.location}</h5> <h5>sejauh ${currentFeature.distance} miles</h5>
                  <ul>
                    <li>type: ${currentFeature.type} </li>
                    <li>flora: ${currentFeature.flora} </li>
                    <li>fauna: ${currentFeature.fauna} </li>
                    <li>makanan: ${currentFeature.makanan} </li>
                    <li>habitant: ${currentFeature.habitant} </li>
                    <li id="air">sumber air: ${currentFeature.sumberAir} </li>

                  </ul>
                  
                  `
                )
                .addTo(map);
            }

          //   map.on('click', 'unclustered-point', function (e) {
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





       

        



    const geolocate = new mapboxgl.GeolocateControl({
      positionOptions: {
      enableHighAccuracy: true
      },
      // When active the map will receive updates to the device's location as it changes.
      trackUserLocation: true,
      // Draw an arrow next to the location dot to indicate which direction the device is heading.
      showUserHeading: true   
      })
    
    map.addControl(geolocate);

    geolocate.on('geolocate', () => {
      console.log("geolocate telah dilakukan");




      // buat mencari jarak terdekat dari lokasi pengguna ke lokasi lain


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





              console.log('coba latitude longitude', lat,"  ", long)
              function error(err) {
                console.warn(`ERROR(${err.code}): ${err.message}`);
              }
              /* Get the coordinate of the search result */
              // console.log('geolocate:', geolocate.options.geolocation.getCurrentPosition(success,error,options))
          
              const searchResult = [long, lat];
  
              console.log('search result gps: ', searchResult)
      
              /**
               * Calculate distances:
               * For each store, use turf.disance to calculate the distance
               * in miles between the searchResult and the store. Assign the
               * calculated value to a property called `distance`.
               */
              const optionss = { units: 'miles' };
              for (const place of places.features) {
                console.log('nama place di bukan map.onload: ', place.name)
                place.distance = turf.distance(
                  searchResult,
                  place.geometry,
                  optionss
                );
              }
  
              /**
               * Sort places by distance from closest to the `searchResult`
               * to furthest.
               */
              places.features.sort((a, b) => {
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
               const empty = document.createElement('p');
              //  filterEl.parentNode.style.display = 'block';
              //  if (places.length === 0 && filterEl.value !== '') {
              //   empty.textContent = 'No results found';
              //   listings.appendChild(empty);
              //  }
              const listings = document.getElementById('listings');
              while (listings.firstChild) {
                listings.removeChild(listings.firstChild);
              }
              buildPlaceList(places);
  
              /* Open a popup for the closest store. */
              createPopUp(places.features[0]);
  
              /** Highlight the listing for the closest store. */
              const activeListing = document.getElementById(
                `listing-${places.features[0].id}`
              );
              activeListing.classList.add('active');
  
              /**
               * Adjust the map camera:
               * Get a bbox that contains both the geocoder result and
               * the closest store. Fit the bounds to that bbox.
               */
              const bbox = getBbox(places, 0, searchResult);
              map.fitBounds(bbox, {
                padding: 100
              });
            
  
              function buildPlaceList(places) {
                for (const place of places.features) {
                  /* Add a new listing section to the sidebar. */
                  const listings = document.getElementById('listings');
                  const listing = listings.appendChild(document.createElement('div'));
                  /* Assign a unique `id` to the listing. */
                  listing.id = `listing-${place.id}`;
                  /* Assign the `item` class to each listing for styling. */
                  listing.className = 'item';
        
                  /* Add the link to the individual listing created above. */
                  const link = listing.appendChild(document.createElement('a'));
                  
                  link.className = 'title';
                  link.id = `link-${place.id}`;
                  link.innerHTML = `${place.title}`;

        
                  /* Add details to the individual listing. */
                  const details = listing.appendChild(document.createElement('div'));
                  details.innerHTML = `${place.location}`;
                 
                 
                  console.log('coba img url: ',place.images[0].url )
                  if (place.type) {
                    details.innerHTML += ` &middot; ${place.type}`;
                  }
                 
                  if (place.distance) {
                    const roundedDistance =
                      Math.round(place.distance * 100) / 100;
                    details.innerHTML += `<div><strong>${roundedDistance} miles away</strong></div>`;
                  }


                  function normalize(string) {
                    return string.trim().toLowerCase();
                }

                console.log("places di load: ", places)

                // menngisi filter di searchbox
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
                    for (const feature of places.features) {
                      if (this.id === `link-${feature.id}`) {
                        flyToPlace(feature);
                        createPopUp(feature);
                      }
                    }
                    const activeItem = document.getElementsByClassName('active');
                    if (activeItem[0]) {
                      activeItem[0].classList.remove('active');
                    }
                    this.parentNode.classList.add('active');
                  });
                }
              }
  
  
  
              /**
               * Create a Mapbox GL JS `Popup`.
               **/
               function createPopUp(currentFeature) {
                const popUps = document.getElementsByClassName('mapboxgl-popup');
                // const { popUpMarkup } = currentFeature.features[0].properties;
                if (popUps[0]) popUps[0].remove();
  
                const popup = new mapboxgl.Popup({ closeOnClick: false })
                  .setLngLat(currentFeature.geometry.coordinates)
                  .setHTML(
                    `<h5>${currentFeature.title}</h5><h5>${currentFeature.location}</h5> <h5>sejauh ${currentFeature.distance} miles</h5>
                     <img class="img-fluid" src="${currentFeature.images[0].url}" alt="gambar place">  </img>
                    <ul>
                      <li>type: ${currentFeature.type} </li>
                      <li>flora: ${currentFeature.flora} </li>
                      <li>fauna: ${currentFeature.fauna} </li>
                      <li>makanan: ${currentFeature.makanan} </li>
                      <li>habitant: ${currentFeature.habitant} </li>
                      <li id="air">sumber air: ${currentFeature.sumberAir} </li>
  
                    </ul>
                    
                    `
                  )
                  .addTo(map);
              }
  
  
              function getBbox(sortedPlaces, storeIdentifier, searchResult) {
                console.log('latitude di get bbox: ',searchResult[1])
                const lats = [
                  sortedPlaces.features[storeIdentifier].geometry.coordinates[1],
                  searchResult[1]
                ];
                const lons = [
                  sortedPlaces.features[storeIdentifier].geometry.coordinates[0],
                  searchResult[0]
                ];
                const sortedLons = lons.sort((a, b) => {
                  if (a > b) {
                    return 1;
                  }
                  if (a.distance < b.distance) {
                    return -1;
                  }
                  return 0;
                });
                const sortedLats = lats.sort((a, b) => {
                  if (a > b) {
                    return 1;
                  }
                  if (a.distance < b.distance) {
                    return -1;
                  }
                  return 0;
                });
                return [
                  [sortedLons[0], sortedLats[0]],
                  [sortedLons[1], sortedLats[1]]
                ];
              }
            


              function addMarkers() {
                /* For each feature in the GeoJSON object above: */
                for (const marker of places.features) {
                  /* Create a div element for the marker. */
                  const el = document.createElement('div');
                  /* Assign a unique `id` to the marker. */
                  el.id = `marker-${marker.id}`;
                  /* Assign the `marker` class to each marker for styling. */
                  el.className = 'marker';
        
                  /**
                   * Create a marker using the div element
                   * defined above and add it to the map.
                   **/
                  new mapboxgl.Marker(el, { offset: [0, -23] })
                    .setLngLat(marker.geometry.coordinates)
                    .addTo(map);
        
                  /**
                   * Listen to the element and when it is clicked, do three things:
                   * 1. Fly to the point
                   * 2. Close all other popups and display popup for clicked store
                   * 3. Highlight listing in sidebar (and remove highlight for all other listings)
                   **/
                  el.addEventListener('click', (e) => {
                    flyToPlace(marker);
                    createPopUp(marker);
                    const activeItem = document.getElementsByClassName('active');
                    e.stopPropagation();
                    if (activeItem[0]) {
                      activeItem[0].classList.remove('active');
                    }
                    const listing = document.getElementById(
                      `listing-${marker.id}`
                    );
                    listing.classList.add('active');
                  });
                }
              }



              function flyToPlace(currentFeature) {
                map.flyTo({
                  center: currentFeature.geometry.coordinates,
                  zoom: 15
                });
              }
            
              

            });







            
            

           

    })
    // batas geolocate

    /* Weather forecast*/

             // fungsi untuk menambahkan weather forecast
      // long,lat : 110.3751748, -7.7573033


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


      var startingLat =  -7.7573033;
	var startingLng = 110.3751748;

	//On initial load set city name
	getCityName(startingLat, startingLng);

	//On initial run the page
	runPage(startingLat, startingLng)

	// Creates map with mapOptions
	
  let weatherRow = document.getElementById('weather-row');
  // let currentCity = document.getElementById('current-city');
	
	





  //Creates marker
	function createMarker(latitude, longitude, map){
		var markerOptions = {
			draggable: true
		}
		return new mapboxgl.Marker(markerOptions)
			.setLngLat([longitude, latitude])
			.addTo(map);
	}

  // When a click event occurs on a feature in
        // the unclustered-point layer, open a popup at
        // the location of the feature, with
        // description HTML from its properties.
        function monitorGeocoder(marker){
        map.on('click', 'unclustered-point', function (e) {
          // const { popUpMarkup } = e.features[0].properties;
          // const coordinates = e.features[0].geometry.coordinates;
          console.log('geomtery: utk weather: ',e.features[0].geometry.coordinates[1])
          console.log('propersties di weatehr: ', e.features[0].properties.location)

          var geoLat= e.features[0].geometry.coordinates[1];
          var geoLng =  e.features[0].geometry.coordinates[0];
          
          var { weather } = e.features[0].properties.location;
          
          var loc = getCityName(geoLat, geoLng);

          updatePage(geoLat, geoLng, loc, marker)
          

        



      });
    }


	//Updates the page dynamically with geocoder results
	function updatePage(latitude, longitude, weather, marker){
		getWeather(latitude, longitude);

		$('#current-city').html(weather);

		marker.setLngLat([longitude, latitude]);
	}

	function getCityName(lat,lng){
		// ** NOTE ** I updated the reverseGeocode method to update the city instead of street address. Checkout geocoder-utils **
		reverseGeocode({lat: lat, lng: lng}, mapToken).then(function (result) {
      
			
      
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
    var marker = createMarker(latitude, longitude, map);
		// map.addControl(geocoder);

		monitorGeocoder(marker);

		//https://docs.mapbox.com/mapbox-gl-js/example/drag-a-marker/
		function onDragEnd(){
			var lngLat = marker.getLngLat();
			var newLng = lngLat.lng;
			var newLat = lngLat.lat;

			var city = getCityName(newLat, newLng)
      console.log('city dari getcityname: ', city)
			updatePage(newLat, newLng, city, marker);
			// getWeather(newLat, newLng);
		}

		marker.on('dragend', onDragEnd);

	}
        



    });

// batas map.on('load)




      let counter = 0;
      const maxAttempts = 50;
      let emoji = '';
      let collision = '';
      let detail = '';


      directions.on('clear', () => {
        map.setLayoutProperty('theRoute', 'visibility', 'none');
        map.setLayoutProperty('theBox', 'visibility', 'none');

        counter = 0;

      });



      directions.on('route', (event) => {
        // Hide the route and box by setting the opacity to zero
        map.setLayoutProperty('theRoute', 'visibility', 'none');
        map.setLayoutProperty('theBox', 'visibility', 'none');

        if (counter >= maxAttempts) {
          
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
           
          }
        }
      });
    



     













