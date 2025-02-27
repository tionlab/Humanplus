import { useRouter } from "next/router";
import styles from "../styles/RMain.module.css";
import MapContainer from "../components/rMap";
import { useEffect, useState } from "react";

export default function R_Main() {
    const router = useRouter();
    const { username } = router.query;
    const [userLat, setUserLat] = useState(null);
    const [userLng, setUserLng] = useState(null);
    const score = 2030;
    const handleReportClick = () => {
        router.push({
            pathname: "/report",
            query: { username: username, lat: userLat, lng: userLng },
        });
    };

    useEffect(() => {
        if (typeof window !== "undefined" && navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const userLat = position.coords.latitude;
                    const userLng = position.coords.longitude;
                    setUserLat(userLat);
                    setUserLng(userLng);
                },
                (error) => {
                    console.error("Geolocation error:", error);
                }
            );
        }
    }, []);

    return (
        <div>
            <div className={styles.name}>
                <a>폐지 지원대</a>
            </div>
            <div className={styles.bar}>
                <a className={styles.user}>{username}</a>
                <br></br>
                <a className={styles.score}>점수 : {score}</a>
            </div>
            <div className={styles.container}>
                <title>폐지 지원대</title>
                <MapContainer />
                <div className={styles.report}>
                    <a onClick={handleReportClick}>
                        <img src="./images/Report.png" />
                    </a>
                </div>
            </div>
        </div>
    );
}
