import React, { useState, useEffect } from "react";
import {
    GoogleMap,
    LoadScript,
    Polyline,
    Marker,
} from "@react-google-maps/api";
import axios from "axios";
import styles from "../styles/Map.module.css";
import { useRouter } from "next/router";

const TmapPage = () => {
    const router = useRouter();
    const { username, lat, lng } = router.query;
    const [routes, setRoutes] = useState(null);
    const [map, setMap] = useState(null);
    const [userLocation, setUserLocation] = useState(null);

    const fetchRoutes = (
        roundedLat,
        roundedLng,
        roundedQueryLat,
        roundedQueryLng
    ) => {
        const data = {
            startX: roundedLng,
            startY: roundedLat,
            endX: roundedQueryLng,
            endY: roundedQueryLat,
            startName: encodeURIComponent("출발지"),
            endName: encodeURIComponent("도착지"),
        };

        const headers = {
            "Content-Type": "application/json",
            appKey: process.env.NEXT_PUBLIC_TMAP_API_KEY,
        };

        axios
            .post(
                "https://apis.openapi.sk.com/tmap/routes/pedestrian?version=1",
                data,
                { headers }
            )
            .then((response) => {
                setRoutes(response.data);
                console.log("Tmap API Response:", response.data);
            })
            .catch((error) => {
                console.error("Tmap API Error", error);
            });
    };

    useEffect(() => {
        if (lat && lng) {
            if (typeof window !== "undefined" && navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const userLat = position.coords.latitude;
                        const userLng = position.coords.longitude;
                        setUserLocation({ lat: userLat, lng: userLng });

                        const roundedLat = userLat.toFixed(6);
                        const roundedLng = userLng.toFixed(6);
                        const roundedQueryLat = parseFloat(lat).toFixed(6);
                        const roundedQueryLng = parseFloat(lng).toFixed(6);

                        console.log(roundedLat, roundedQueryLat);

                        fetchRoutes(
                            roundedLat,
                            roundedLng,
                            roundedQueryLat,
                            roundedQueryLng
                        );
                    },
                    (error) => {
                        console.error("Geolocation error:", error);
                    }
                );
            }
        }
    }, [lat, lng]);

    useEffect(() => {
        const script = document.createElement("script");
        script.src = `https://apis.openapi.sk.com/tmap/jsv2?version=1&appKey=${process.env.NEXT_PUBLIC_TMAP_API_KEY}`;
        script.async = true;
        document.body.appendChild(script);
    }, []);

    const drawRoutes = () => {
        if (routes && map) {
            const path = [];

            routes.features.forEach((feature) => {
                if (feature.geometry.type === "LineString") {
                    feature.geometry.coordinates.forEach((coordinates) => {
                        path.push({ lat: coordinates[1], lng: coordinates[0] });
                    });
                }
            });

            return (
                <Polyline
                    path={path}
                    options={{ strokeColor: "#0000FF", strokeWeight: 6 }}
                />
            );
        }
        return null;
    };

    const center = userLocation || {
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
        <div>
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
                    center={center}
                    onLoad={(map) => setMap(map)}
                    options={{
                        minZoom: 14,
                        disableDefaultUI: true,
                        streetViewControl: false,
                        zoomControl: false,
                        clickableIcons: false,
                        styles: mapStyles,
                    }}
                >
                    <Marker
                        className={styles.here}
                        position={userLocation}
                        icon={{
                            url: "./images/here.png",
                        }}
                    />
                    <Marker
                        className={styles.markers}
                        position={{
                            lat: parseFloat(lat),
                            lng: parseFloat(lng),
                        }}
                        icon={{
                            url: "./images/able.png",
                        }}
                    />
                    {drawRoutes()}
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

export default TmapPage;
