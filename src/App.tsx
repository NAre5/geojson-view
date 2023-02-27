import React, { useState } from 'react';
import { Map, View } from 'ol';
import GeoJSON from 'ol/format/GeoJSON';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { OSM, Vector as VectorSource } from 'ol/source';
import { Style, Fill, Stroke } from 'ol/style';

import './index.css';

const App = () => {
  const [geojsonText, setGeojsonText] = useState('');

  const mapRef = React.useRef<HTMLDivElement>(null);

  const handleGeoJsonTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setGeojsonText(event.target.value);
  };

  const handleMapLoad = () => {
    if (mapRef.current !== null) {
      const source = new VectorSource({
        features: new GeoJSON().readFeatures(geojsonText),
      });

      const vectorLayer = new VectorLayer({
        source,
        style: new Style({
          fill: new Fill({
            color: 'rgba(255, 255, 255, 0.2)',
          }),
          stroke: new Stroke({
            color: '#ffcc33',
            width: 2,
          }),
        }),
      });

      const map = new Map({
        target: mapRef.current,
        layers: [
          new TileLayer({
            source: new OSM(),
          }),
          vectorLayer,
        ],
        view: new View({
          center: [0, 0],
          zoom: 2,
        }),
      });
    }
  };

  return (
    <div className="app">
      <div className="editor">
        <h2>GeoJSON Text Editor</h2>
        <textarea value={geojsonText} onChange={handleGeoJsonTextChange} />
      </div>
      <div className="map-container" ref={mapRef} onLoad={handleMapLoad}>
        <p>
          The map will appear here once you have entered some GeoJSON text and clicked the "Load
          Map" button.
        </p>
      </div>
    </div>
  );
};

export default App;
