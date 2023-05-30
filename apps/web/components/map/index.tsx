import React from "react";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const index = () => {
  return (
    <div>
      <MapContainer
        center={[51.505, -0.09]}
        zoom={13}
        style={{ height: "400px" }}
      >
        {/* Map Layers */}
        <TileLayer
          attribution='Map data &copy; <a href="https://www.locationiq.com/">LocationIQ</a>'
          url={`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`}
        />
        {/* Markers */}
        <Marker position={[51.505, -0.09]}>
          <Popup>Popup content</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default index;
