import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const MadhyaPradeshMap = ({ alertLocation, villageName }) => {
  // Default center for Madhya Pradesh
//   const mpCenter = [23.473324, 77.947998];
  // Default zoom level for Madhya Pradesh
  const mpZoom = 7;

  // Center and zoom level for the full map of India
  const indiaCenter = [20.5937, 78.9629];
  const indiaZoom = 5;

  // Set the location and zoom level based on whether there is an alert location
  const center = alertLocation ? [alertLocation.latitude, alertLocation.longitude] : indiaCenter;
  const zoom = alertLocation ? mpZoom : indiaZoom;

  return (
    <div className="w-full aspect-video"> {/* aspect-video class provides a 16:9 ratio */}
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {/* Conditionally render Marker if alertLocation is provided */}
        {alertLocation && (
          <Marker position={[alertLocation.latitude, alertLocation.longitude]}>
            <Popup>
              <strong>Alert Location</strong>
              <br />
              Latitude: {alertLocation.latitude}
              <br />
              Longitude: {alertLocation.longitude}
              <br />
              <strong>Village:</strong> {villageName || "Unknown"}
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
};

export default MadhyaPradeshMap;
