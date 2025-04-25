import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

// This hook helps reset the map view when coordinates change
const useMapReset = (coordinates: [number, number]) => {
  const map = useMap();
  
  useEffect(() => {
    if (map) {
      map.setView(coordinates, 15);
    }
  }, [coordinates, map]);
  
  return null;
};

export default useMapReset;
