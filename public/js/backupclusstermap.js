// geocoder.on('result', (event) => {
          //   /* Get the coordinate of the search result */
          //   const searchResult = event.result.geometry;
          //   console.log('event result geometry searching:', event.result.geometry.coordinates)
  
          //   /**
          //    * Calculate distances:
          //    * For each store, use turf.disance to calculate the distance
          //    * in miles between the searchResult and the store. Assign the
          //    * calculated value to a property called `distance`.
          //    */
          //   const options = { units: 'miles' };
          //   for (const place of places.features) {
          //     place.distance = turf.distance(
          //       searchResult,
          //       place.geometry,
          //       options
          //     );
          //   }
  
          //   /**
          //    * Sort places by distance from closest to the `searchResult`
          //    * to furthest.
          //    */
          //   places.features.sort((a, b) => {
          //     if (a.distance > b.distance) {
          //       return 1;
          //     }
          //     if (a.distance < b.distance) {
          //       return -1;
          //     }
          //     return 0; // a must be equal to b
          //   });
  
          //   /**
          //    * Rebuild the listings:
          //    * Remove the existing listings and build the location
          //    * list again using the newly sorted places.
          //    */
          //   const listings = document.getElementById('listings');
          //   while (listings.firstChild) {
          //     listings.removeChild(listings.firstChild);
          //   }
          //   buildPlaceList(places);
  
          //   /* Open a popup for the closest store. */
          //   createPopUp(places.features[0]);
  
          //   /** Highlight the listing for the closest store. */
          //   const activeListing = document.getElementById(
          //     `listing-${places.features[0].id}`
          //   );
          //   activeListing.classList.add('active');
  
          //   /**
          //    * Adjust the map camera:
          //    * Get a bbox that contains both the geocoder result and
          //    * the closest store. Fit the bounds to that bbox.
          //    */
          //   const bbox = getBbox(places, 0, searchResult);
          //   map.fitBounds(bbox, {
          //     padding: 100
          //   });
          // });
