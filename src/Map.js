import React from "react";
import {
  GoogleMap,
  Marker,
  Polyline,
  useJsApiLoader
} from "@react-google-maps/api";

const Map = () => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "" // PUT YOUR API KEY HERE
  });

  const [map, setMap] = React.useState(null);
  const onLoad = React.useCallback(function callback(map) {
    // map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);
  const containerStyle = {
    width: "100vw",
    height: "100vh",
    background: "green"
  };

  // Hook for center
  const [center, setCenter] = React.useState({
    lat: 44.087585,
    lng: -39.899556
  });

  // Hook for infoWindow coordinate

  // Hook for polyline path
  const [path, setPath] = React.useState([]);
  const [loadPolyline, setLoadPolyline] = React.useState([]);

  // console.log(path);

  // Options for polyline
  const options = {
    strokeColor: "#FF0000",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#FF0000",
    fillOpacity: 0.35,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
    geodesic: false,
    zIndex: 1
  };

  // Hook for the location per click on the MAP
  const [location, setLocation] = React.useState({
    markers: [
      {
        title: "The marker`s title will appear as a tooltip.",
        name: "",
        position: null
      }
    ]
  });

  // Hook for clicking on a marker to show an active marker
  // const [activeMarker, setActiveMarker] = React.useState(null);

  // console.log(activeMarker);

  // Function when clicking on the MAP
  const mapClicked = (e) => {
    // setActiveMarker(null);
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    const markerLoc = { lat: lat, lng: lng };
    const markerCoordinate = `lat: ${lat} lng: ${lng}`;
    setPath((previousState) => [...previousState, { lat: lat, lng: lng }]);
    setCenter({ lat: lat, lng: lng });
    setLocation((previousState) => {
      return {
        markers: [
          ...previousState.markers,
          {
            title: "",
            name: markerCoordinate,
            position: markerLoc
          }
        ]
      };
    });
  };

  // function when clicking on a marker
  // const markerClicked = (markers, key) => {
  //   if (key === activeMarker) {
  //     return;
  //   }
  // const lat = markers.position.lat;
  // const lng = markers.position.lng;
  // var markerCoordinate = `lat: ${lat} lng: ${lng}`;
  // setActiveMarker(key);
  // setCoordinate(markerCoordinate);
  // };

  // handle rightclick
  const handleRightClick = () => {
    setLocation({
      markers: [
        {
          title: "The marker`s title will appear as a tooltip.",
          name: "",
          position: null
        }
      ]
    });
    setLoadPolyline([]);
    setPath([]);
  };

  //handle doubleclicks
  const handleDoubleClick = (e) => {
    setLoadPolyline(path);
  };

  // Marker Icons settings
  // const iconSettings = {
  //   url:
  //     "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
  //   // This marker is 20 pixels wide by 32 pixels high.
  //   size: (20, 32),
  //   // The origin for this image is (0, 0).
  //   origin: (0, 0),
  //   // The anchor for this image is the base of the flagpole at (0, 32).
  //   anchor: (0, 32)
  // };

  //Loads the MAP
  return isLoaded ? (
    <div style={{ padding: "10px" }}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={3}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onClick={mapClicked}
      >
        {location.markers.map((markers, key) => (
          <Marker
            icon={
              "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"
            }
            key={key}
            title={markers.title}
            name={markers.name}
            position={markers.position}
            // onClick={() => markerClicked(markers, key)}
            onRightClick={handleRightClick}
            onDblClick={handleDoubleClick}
          >
            {/* {activeMarker === key ? (
              <InfoWindow
                onCloseClick={() => setActiveMarker(null)}
                options={{ maxWidth: 200 }}
              >
                <div>{coordinate}</div>
              </InfoWindow>
            ) : null} */}
          </Marker>
        ))}
        <Polyline path={loadPolyline} options={options} />
      </GoogleMap>
    </div>
  ) : (
    <></>
  );
};

export default Map;
