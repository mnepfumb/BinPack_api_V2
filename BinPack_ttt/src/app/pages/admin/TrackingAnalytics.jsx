// import { Fragment } from 'react';
import React from 'react';
// import {  useState } from "react";
import {
  useJsApiLoader,
  GoogleMap,
//   Marker,
//   InfoWindow,
} from "@react-google-maps/api";
import { CircularProgress } from '@mui/material'


const center = {
	lat: -26.2041,
	lng: 28.0473
};

const TrackingAnalytics = () => {

	const { isLoaded } = useJsApiLoader({
	  id: "google-map-script",
	  googleMapsApiKey: "AIzaSyCQvYXL_fWTxQddv4sHBGDuC8ICJC6SIXE",
	});

	return isLoaded ? (
	  <>
		<GoogleMap
		  center={center}
		  zoom={8}
		  mapContainerStyle={{ width: "100%", height: "100vh" }}
		  options={{
			zoomControl: false,
			streetViewControl: false,
			mapTypeControl: false,
			fullscreenControl: false,
		  }}
		  
		>
		</GoogleMap>
	  </>
	) : (
		<CircularProgress className="progress" />
	);
};

export default TrackingAnalytics;