/* eslint-disable */

const locations = JSON.parse(document.querySelector('#map').dataset.locations);

mapboxgl.accessToken =
  'pk.eyJ1Ijoiam9zZW12Y2VycXVlaXJhIiwiYSI6ImNqeXk0bXJ5cDAwZ3EzZHBiZmJxdGVkZHEifQ.dvUm7QcT_by7ZxJHKGYDug';
const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/josemvcerqueira/cjyy4r34a015e1cp60aukbmm5',
  scrollZoom: false,
});

const bounds = new mapboxgl.LngLatBounds();

locations.forEach(location => {
  // Create market
  const el = document.createElement('div');
  el.className = 'marker';

  // Add market
  new mapboxgl.Marker({
    element: el,
    anchor: 'bottom',
  })
    .setLngLat(location.coordinates)
    .addTo(map);

  // Add popup
  new mapboxgl.Popup({
    offset: 30,
  })
    .setLngLat(location.coordinates)
    .setHTML(`<p>Day ${location.day}: ${location.description}</p>`)
    .addTo(map);

  // Extend map bounds to include current location
  bounds.extend(location.coordinates);
});

map.fitBounds(bounds, {
  padding: {
    top: 150,
    bottom: 150,
    left: 50,
    right: 50,
  },
});
