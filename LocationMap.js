import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for Leaflet icon issues in Next.js
// This is necessary because of how Next.js handles assets
const DefaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

// Custom sunset marker icon with an orange color
const SunsetIcon = L.icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

export default function LocationMap({ locations }) {
  const router = useRouter();

  // Calculate center of the map based on all locations
  const getMapCenter = () => {
    // If no locations, default to a global view
    if (!locations || locations.length === 0) {
      return [20, 0];
    }
    
    // If only one location, center on it
    if (locations.length === 1) {
      return [locations[0].coordinates.lat, locations[0].coordinates.lng];
    }
    
    // Otherwise, calculate average
    const lats = locations.map(loc => loc.coordinates.lat);
    const lngs = locations.map(loc => loc.coordinates.lng);
    return [
      lats.reduce((a, b) => a + b, 0) / lats.length,
      lngs.reduce((a, b) => a + b, 0) / lngs.length
    ];
  };

  const navigateToLocation = (id) => {
    router.push(`/location/${id}`);
  };

  return (
    <div className="mt-12 mb-16">
      <h2 className="text-xl font-light tracking-wide uppercase mb-6 text-center">Explore My Sunset Locations</h2>
      
      <div className="map-container border border-gray-100 rounded-sm overflow-hidden" style={{ height: '500px' }}>
        <MapContainer 
          center={getMapCenter()} 
          zoom={2} 
          style={{ height: '100%', width: '100%' }}
          scrollWheelZoom={false}
          worldCopyJump={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {locations.map((location) => (
            <Marker
              key={location.id}
              position={[location.coordinates.lat, location.coordinates.lng]}
              icon={SunsetIcon}
            >
              <Popup>
                <div className="p-1">
                  <h3 className="font-medium text-sm mb-1">{location.name}</h3>
                  <p className="text-xs text-gray-500 mb-2">{location.viewpoint}</p>
                  <button 
                    onClick={() => navigateToLocation(location.id)}
                    className="text-xs text-blue-600 hover:text-blue-800"
                  >
                    View details →
                  </button>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
      
      <div className="text-center mt-4">
        <p className="text-sm text-gray-500">Click on a location marker to see details</p>
      </div>
    </div>
  );
} 