import React from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "../utils/leaflet-icon-fix";

// Custom component to handle map view updates
const MapUpdater = ({ coordinates }: { coordinates: [number, number] }) => {
  const map = useMap();

  // Update map view when coordinates change
  React.useEffect(() => {
    map.setView(coordinates, 15);
  }, [coordinates, map]);

  return null;
};

interface MapViewProps {
  coordinates: [number, number];
  name: string;
  address: string;
  phone: string;
}

const MapView: React.FC<MapViewProps> = ({
  coordinates,
  name,
  address,
  phone,
}) => {
  return (
    <div style={{ height: "100%", width: "100%" }}>
      <MapContainer
        center={coordinates}
        zoom={15}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
      >
        {/* This component will update the map view when coordinates change */}
        <MapUpdater coordinates={coordinates} />

        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={coordinates}>
          <Popup>
            <div className="p-1">
              <h3 className="font-bold">{name}</h3>
              <p className="text-sm">{address}</p>
              <p className="text-sm">{phone}</p>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapView;
