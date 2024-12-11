import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet"; // Import leaflet for custom marker (if needed)

const MadhyaPradeshMap = ({ alertLocation }) => {
  const mpCenter = [23.473324, 77.947998]; // Center of Madhya Pradesh
  const zoomLevel = 7; // Appropriate zoom level for MP

  // Default marker for when alertLocation is not provided
  const location = alertLocation || { latitude: 23.473324, longitude: 77.947998 };

  return (
    <div className="w-full h-[400px]">
      <MapContainer
        center={mpCenter}
        zoom={zoomLevel}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {/* Marker for the alert location */}
        <Marker position={[location.latitude, location.longitude]}>
          <Popup>
            <strong>Alert Location</strong>
            <br />
            Latitude: {location.latitude}
            <br />
            Longitude: {location.longitude}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MadhyaPradeshMap;
