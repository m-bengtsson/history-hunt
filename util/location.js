const GOOGLE_API_KEY = "AIzaSyBcZET5wKbIYGhaarszcjYhoj5HbpXfXSg";

/* const googleApi = "https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&key=YOUR_API_KEY" */

// URI för Image
export const createLocationUrl = (pinnedLocation) => {
   const firstLocation = pinnedLocation[0];
   const stringFirstLocation = `${firstLocation?.latitude}, ${firstLocation?.longitude}`

   const markers = pinnedLocation.map(
      (location) => `${location.latitude},${location.longitude}`
   );
   const markersString = markers.join("|");

   return `https://maps.googleapis.com/maps/api/staticmap?center=${stringFirstLocation}&zoom=12&size=400x200&maptype=roadmap&markers=color:red%7Clabel:S%7C${markersString}&key=${GOOGLE_API_KEY}`;
};
