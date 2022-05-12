/* global document, google */
import {GoogleMapsOverlay as DeckOverlay} from '@deck.gl/google-maps';
import {GeoJsonLayer, ArcLayer} from '@deck.gl/layers';

// source: Natural Earth http://www.naturalearthdata.com/ via geojson.xyz
const AIR_PORTS =
  'https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_10m_airports.geojson';

const GOOGLE_MAPS_API_KEY =
  import.meta.env.VITE_MAPS_API_KEY;
const GOOGLE_MAPS_API_URL = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&v=beta`;

function loadScript(url) {
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = url;
  const head = document.querySelector('head');
  head.appendChild(script);
  return new Promise(resolve => {
    script.onload = resolve;
  });
}

async function main() {
  await loadScript(GOOGLE_MAPS_API_URL);

  const map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 50, lng: -5},
    zoom: 3,
    disableDefaultUI: true
  });

  const overlay = new DeckOverlay({
    layers: [
      new GeoJsonLayer({
        id: 'airports',
        data: AIR_PORTS,
        // Styles
        filled: true,
        pointRadiusMinPixels: 2,
        pointRadiusScale: 2000,
        getPointRadius: f => 11 - f.properties.scalerank,
        getFillColor: [200, 0, 80, 180]
      })
    ]
  });

  overlay.setMap(map);

  const mapContainer = document.querySelector('.map-container');
  const buttonContainer = document.querySelector('.buttons');

  buttonContainer.addEventListener('click', ev => {
    const {mapSize, zoom = map.getZoom()} = ev.target.dataset;

    mapContainer.style.width = mapSize === 'default' ? '' : `${mapSize}px`;
    google.maps.event.trigger(map, 'resize');
    map.setZoom(Number(zoom));
  });
}

main();
