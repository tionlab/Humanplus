import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import styles from "../styles/Map.module.css";

const MapContainer = () => {
    const router = useRouter();
    const { username, num } = router.query;
    const handleMarkerClick = (marker) => {
        router.push({
            pathname: "/info",
            query: {
                username: username,
                ruser: marker.user,
                date: marker.date,
                lat: marker.lat,
                lng: marker.lng,
                state: marker.state,
                ima: marker.image,
                num: num,
            },
        });
    };
    const [userLocation, setUserLocation] = useState(null);
    const [markers, setMarkers] = useState([]);

    useEffect(() => {
        fetch(process.env.NEXT_PUBLIC_BACKEND_SERVER_OUTPUT, {
            method: "GET",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setMarkers(data);
            })
            .catch((error) => console.error("Error fetching markers:", error));

        if (typeof window !== "undefined" && navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const userLat = position.coords.latitude;
                    const userLng = position.coords.longitude;
                    setUserLocation({ lat: userLat, lng: userLng });
                },
                (error) => {
                    console.error("Geolocation error:", error);
                }
            );
        }
    }, []);

    const defaultCenter = userLocation || {
        lat: 37.554988,
        lng: 126.924321,
    };

    const mapStyles = [
        {
            elementType: "geometry",
            stylers: [
                {
                    color: "#ebe3cd",
                },
            ],
        },
        {
            elementType: "labels.text.fill",
            stylers: [
                {
                    color: "#523735",
                },
            ],
        },
        {
            elementType: "labels.text.stroke",
            stylers: [
                {
                    color: "#f5f1e6",
                },
            ],
        },
        {
            featureType: "administrative",
            elementType: "geometry.stroke",
            stylers: [
                {
                    color: "#c9b2a6",
                },
            ],
        },
        {
            featureType: "administrative.land_parcel",
            elementType: "geometry.stroke",
            stylers: [
                {
                    color: "#dcd2be",
                },
            ],
        },
        {
            featureType: "administrative.land_parcel",
            elementType: "labels.text.fill",
            stylers: [
                {
                    color: "#ae9e90",
                },
            ],
        },
        {
            featureType: "landscape.natural",
            elementType: "geometry",
            stylers: [
                {
                    color: "#dfd2ae",
                },
            ],
        },
        {
            featureType: "poi",
            elementType: "geometry",
            stylers: [
                {
                    color: "#dfd2ae",
                },
            ],
        },
        {
            featureType: "poi",
            elementType: "labels.text.fill",
            stylers: [
                {
                    color: "#93817c",
                },
            ],
        },
        {
            featureType: "poi.park",
            elementType: "geometry.fill",
            stylers: [
                {
                    color: "#a5b076",
                },
            ],
        },
        {
            featureType: "poi.park",
            elementType: "labels.text.fill",
            stylers: [
                {
                    color: "#447530",
                },
            ],
        },
        {
            featureType: "road",
            elementType: "geometry",
            stylers: [
                {
                    color: "#f5f1e6",
                },
            ],
        },
        {
            featureType: "road.arterial",
            elementType: "geometry",
            stylers: [
                {
                    color: "#fdfcf8",
                },
            ],
        },
        {
            featureType: "road.highway",
            elementType: "geometry",
            stylers: [
                {
                    color: "#f8c967",
                },
            ],
        },
        {
            featureType: "road.highway",
            elementType: "geometry.stroke",
            stylers: [
                {
                    color: "#e9bc62",
                },
            ],
        },
        {
            featureType: "road.highway.controlled_access",
            elementType: "geometry",
            stylers: [
                {
                    color: "#e98d58",
                },
            ],
        },
        {
            featureType: "road.highway.controlled_access",
            elementType: "geometry.stroke",
            stylers: [
                {
                    color: "#db8555",
                },
            ],
        },
        {
            featureType: "road.local",
            elementType: "labels.text.fill",
            stylers: [
                {
                    color: "#806b63",
                },
            ],
        },
        {
            featureType: "transit.line",
            elementType: "geometry",
            stylers: [
                {
                    color: "#dfd2ae",
                },
            ],
        },
        {
            featureType: "transit.line",
            elementType: "labels.text.fill",
            stylers: [
                {
                    color: "#8f7d77",
                },
            ],
        },
        {
            featureType: "transit.line",
            elementType: "labels.text.stroke",
            stylers: [
                {
                    color: "#ebe3cd",
                },
            ],
        },
        {
            featureType: "transit.station",
            elementType: "geometry",
            stylers: [
                {
                    color: "#dfd2ae",
                },
            ],
        },
        {
            featureType: "water",
            elementType: "geometry.fill",
            stylers: [
                {
                    color: "#b9d3c2",
                },
            ],
        },
        {
            featureType: "water",
            elementType: "labels.text.fill",
            stylers: [
                {
                    color: "#92998d",
                },
            ],
        },
    ];

    const handleUserLocationButtonClick = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const userLat = position.coords.latitude;
                    const userLng = position.coords.longitude;
                    setUserLocation({ lat: userLat, lng: userLng });
                },
                (error) => {
                    console.error("Geolocation error:", error);
                }
            );
        }
    };

    return (
        <div style={{ margin: 0, padding: 0 }}>
            <LoadScript
                googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
            >
                <GoogleMap
                    mapContainerStyle={{
                        left: -8,
                        height: "100vh",
                        width: "100vw",
                    }}
                    zoom={16}
                    center={defaultCenter}
                    options={{
                        minZoom: 14,
                        disableDefaultUI: true,
                        streetViewControl: false,
                        zoomControl: false,
                        clickableIcons: false,
                        styles: mapStyles,
                    }}
                >
                    {markers.map((marker, index) => (
                        <Marker
                            className={styles.markers}
                            key={Math.random()}
                            position={{ lat: marker.lat, lng: marker.lng }}
                            icon={{
                                url: `./images/${marker.state}.png`,
                            }}
                            onClick={() => handleMarkerClick(marker)}
                        />
                    ))}
                    <Marker
                        className={styles.here}
                        position={userLocation}
                        icon={{
                            url: "./images/here.png",
                        }}
                    />
                </GoogleMap>
            </LoadScript>
            <a
                className={styles.userlocationbutton}
                onClick={handleUserLocationButtonClick}
            >
                현재 위치로 이동
            </a>
        </div>
    );
};

export default MapContainer;
