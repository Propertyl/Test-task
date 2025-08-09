import { useEffect, useRef, useState } from "react";
import getLocation from "../../functions/getISSInfo";
import type { LocationOnMap } from "../../types/global";
import { getMainContext } from "../Main/MainContext";
import ComponentLoading from "../Loadings/ComponentLoading";
import './ISS-Location.css';
import getCurrentTime from "../../functions/getUTCTime";

let interval:number | null = null;

const ISSLocation = () => {
  const {setLocationIsEarned,locationIsEarned} = getMainContext();
  const [location, setLocation] = useState<LocationOnMap | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<google.maps.Map | null>(null);
  const markerInstance = useRef<google.maps.Marker | null>(null);
  const handleLocationUpdate = useRef(getLocation<LocationOnMap | null>(setLocation, 'https://corsproxy.io/?http://api.open-notify.org/iss-now.json'));

  useEffect(() => {
    const getISSLocation = handleLocationUpdate.current();

    interval = setInterval(() => {
      getISSLocation();
    },5000);

    return () => {
      if(interval) {
        clearInterval(interval);
      }
    }
  },[]);

  useEffect(() => {
    if (location && mapRef.current && window.google) {
      const latLng = {
        lat: parseFloat(location.iss_position.latitude),
        lng: parseFloat(location.iss_position.longitude),
      };

      if (!mapInstance.current) {
        mapInstance.current = new google.maps.Map(mapRef.current, {
          zoom: 7,
          center: latLng,
        });

        markerInstance.current = new google.maps.Marker({
          position: latLng,
          map: mapInstance.current,
          title: "ISS here!",
        });
      } else {
        mapInstance.current.setCenter(latLng);
        if (markerInstance.current) {
          markerInstance.current.setPosition(latLng);
        }
      }
    }
  },[location]);

  useEffect(() => {
    if(location && !locationIsEarned) {
      setLocationIsEarned(true);
    }
  },[location,locationIsEarned]);

  return (
    <>
      { location?.iss_position ?
        <div className="container iss-location-map-section">
          <div className="location-info container">
            <div className="location-info-block">
              <i className="location-info-text">Latitude:{location.iss_position.latitude}</i>
              <i className="location-info-text">Longitude:{location.iss_position.longitude}</i>
              </div>
            <div className="location-info-block">Time: {getCurrentTime()}</div>
          </div>
          <div className="iss-location-map" ref={mapRef}>
            {mapRef.current?.childElementCount === 0 && <ComponentLoading/>}
          </div>
        </div>
        : <ComponentLoading/>
      }
    </>
  )
}

export default ISSLocation;
