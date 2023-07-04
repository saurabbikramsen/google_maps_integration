"use client";

import {
  CircleF,
  GoogleMap,
  InfoWindow,
  MarkerF,
  useLoadScript,
} from "@react-google-maps/api";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import Image from "next/image";

function ViewService() {
  const [selectedMarker, setSelectedMarker] = useState<any>(null);

  const handleMarkerClick = (marker: any) => {
    setSelectedMarker(marker);
  };

  const handleInfoWindowClose = () => {
    setSelectedMarker(null);
  };

  const category = "plumbing";
  const marker = [];
  const libraries = useMemo(() => ["places"], []);
  const mapCenter = useMemo(() => ({ lat: 28.13091763, lng: 84.0966657 }), []);

  const url = "http://localhost:8000/vendor";
  const [vendors, setVendors] = useState<any>([]);

  useEffect(() => {
    axios
      .get(`${url}`)
      .then(function (response) {
        setVendors(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const mapOptions = useMemo<google.maps.MapOptions>(
    () => ({
      disableDefaultUI: false,
      clickableIcons: true,
      scrollwheel: true,
    }),
    []
  );

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    libraries: libraries as any,
  });
  console.log(process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string);

  if (!isLoaded) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {/*<div className={styles.sidebar}>*/}
      {/*  <p>This is Sidebar...</p>*/}
      {/*</div>*/}
      <GoogleMap
        options={mapOptions}
        zoom={13}
        center={mapCenter}
        mapTypeId={google.maps.MapTypeId.ROADMAP}
        mapContainerStyle={{ width: "100%", height: "950px" }}
        onLoad={(map) => console.log("Map Loaded")}
      >
        {vendors.map((vendor: any, index: number) => {
          return (
            <MarkerF
              key={index}
              position={{
                lat: vendor.location?.latitude,
                lng: vendor.location?.longitude,
              }}
              icon={{
                url: "https://www.svgrepo.com/show/271920/plumbering-water-supply.svg",
                scaledSize: new google.maps.Size(40, 40),
              }}
              onClick={() => {
                handleMarkerClick(vendor);
              }}
              onLoad={() => console.log("Marker Loaded")}
            />
          );
        })}
        {selectedMarker && (
          <InfoWindow
            position={{
              lat: selectedMarker.location?.latitude,
              lng: selectedMarker.location?.longitude,
            }}
            onCloseClick={handleInfoWindowClose}
          >
            <div>
              <Image
                width={30}
                height={30}
                src={"/plumbing.svg"}
                alt={"nothing"}
              />
              <p className="text-center text-lg font-extrabold">
                {selectedMarker.name}
              </p>
              <p>{selectedMarker.contact}</p>
              <button className="bg-violet-400 py-1 px-2 mt-2 rounded-md text-white font-mono">
                BookNow
              </button>
            </div>
          </InfoWindow>
        )}

        <CircleF
          center={mapCenter}
          radius={5000}
          onLoad={() => console.log("Circle Load...")}
          options={{
            fillColor: 5000 > 1000 ? "green" : "red",
            strokeColor: 5000 > 1000 ? "green" : "red",
            strokeOpacity: 0.6,
          }}
        />
      </GoogleMap>
    </div>
  );
}

export default ViewService;
