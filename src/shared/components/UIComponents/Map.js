// import React, { useRef , useEffect} from "react";
// import "./Map.css";

// const Map = ({ center, zoom }) => {
//     const mapRef = useRef(null);
//     const [mapError, setMapError] = React.useState(null);

//     useEffect(() => {
//       if (!window.google || !window.google.maps) {
//         setMapError('Google Maps API not loaded');
//         return;
//       }

//       try {
//         const map = new window.google.maps.Map(mapRef.current, {
//           center: center,
//           zoom: zoom
//         });

//         new window.google.maps.Marker({
//           position: center,
//           map: map
//         });
//       } catch (error) {
//         setMapError('Failed to initialize map: ' + error.message);
//       }
//     }, [center, zoom]);

//     if (mapError) {
//       return <div>Error: {mapError}</div>;
//     }

//     return (
//       <div
//         ref={mapRef}
//         style={{
//           width: '100%',
//           height: '100%',
//           minHeight: '300px'
//         }}
//       ></div>
//     );
//   };

//   export default Map;

// without google map use of overlay:-
import React, { useRef, useEffect } from 'react';
import './Map.css';

const Map = ({ center, zoom, classname }) => {
  const mapRef = useRef();

  useEffect(() => {
    if (!window.ol) {
      console.error('OpenLayers not loaded');
      return;
    }

    const map = new window.ol.Map({
      target: mapRef.current,
      layers: [
        new window.ol.layer.Tile({
          source: new window.ol.source.OSM(),
        }),
      ],
      view: new window.ol.View({
        center: window.ol.proj.fromLonLat([center.lng, center.lat]),
        zoom: zoom,
      }),
    });

    return () => map.setTarget(undefined);
  }, [center, zoom]);

  return (
    <div
      ref={mapRef}
      className={`map ${classname || ''}`}
    />
  );
};

export default Map;


