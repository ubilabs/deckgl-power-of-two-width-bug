# deck.gl bug: rendering stops at certain zoom-levels for power-of-two map sizes

[Live Example](https://storage.ubidev.net/deckgl-power-of-two-width-bug/index.html)

For combinations of zoom/map-size where the width of the maptiles in pixels
matches the width of the map in the dom, rendering stops working.

Example:

- a map at zoom-level 3 wont render when map-size is 2048px
- at zoom-level 2, rendering fails for a width of 1024px

Moving the map around will sometimes result in a working rendering.

## running this example

To run the example locally, you need a google-maps API key.

    npm install
    VITE_MAPS_API_KEY="<google maps API key>" npm start
