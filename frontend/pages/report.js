import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import styles from "../styles/Report.module.css";
import PreMapContainer from "../components/PreMap";

export default function R_Main() {
    const router = useRouter();
    const { username, lat, lng } = router.query;
    const [address, setAddress] = useState("");
    const [photoData, setPhotoData] = useState(null);
    const videoRef = useRef(null);
    const score = 2030;
    const handleBackClick = () => {
        router.push({
            pathname: "/rmain",
            query: { username: username },
        });
    };

    const formatCurrentDate = () => {
        const now = new Date();
        const dateOptions = {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "numeric",
            minute: "numeric",
        };
        const formattedDate = new Intl.DateTimeFormat(
            "ko-KR",
            dateOptions
        ).format(now);
        return formattedDate;
    };

    const addReport = async () => {
        const formattedDate = formatCurrentDate();
        const data = {
            user: username,
            date: formattedDate,
            lat: lat,
            lng: lng,
            state: "able",
        };

        try {
            if (photoData) {
                const base64Parts = photoData.split(";base64,");
                const contentType = base64Parts[0].split(":")[1];
                const raw = window.atob(base64Parts[1]);
                const blob = new Blob(
                    [
                        new Uint8Array(raw.length).map((_, i) =>
                            raw.charCodeAt(i)
                        ),
                    ],
                    { type: contentType }
                );

                const imageName = `image_${Date.now()}.png`;

                const apiKey = process.env.NEXT_PUBLIC_IMGSTORAGE_API_KEY;
                const formData = new FormData();
                formData.append("key", apiKey);
                formData.append("image", blob, imageName);

                const imgbbResponse = await fetch(
                    "https://api.imgbb.com/1/upload",
                    {
                        method: "POST",
                        body: formData,
                    }
                );

                if (imgbbResponse.ok) {
                    const imgbbData = await imgbbResponse.json();
                    const imgLink = imgbbData.data.url;

                    data.image = imgLink;
                } else {
                    const result = await imgbbResponse.json();
                    console.error(
                        "Failed to upload image to ImgBB:",
                        result.error
                    );
                }
            }

            const response = await fetch(
                process.env.NEXT_PUBLIC_BACKEND_SERVER_INPUT,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                }
            );

            if (response.ok) {
                router.push("/rmain");
            } else {
                console.error("Failed to save data on the server");
            }
        } catch (error) {
            console.error("Error saving data:", error);
            alert("핀 추가에 오류가 생겼습니다..\nErrorCode: ERT01");
        }
    };
    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: true,
            });
            videoRef.current.srcObject = stream;
            videoRef.current.play();
        } catch (error) {
            console.error("Error starting camera:", error);
        }
    };

    useEffect(() => {
        startCamera();

        if (lat && lng) {
            const reverseGeocode = async () => {
                try {
                    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
                    const response = await fetch(
                        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`
                    );

                    if (response.ok) {
                        const data = await response.json();
                        if (data.results && data.results.length > 0) {
                            const formattedAddress =
                                data.results[0].formatted_address;
                            const addressWithoutKorea =
                                formattedAddress.replace("대한민국", "");
                            setAddress(addressWithoutKorea.trim());
                        } else {
                            setAddress("Address not found");
                        }
                    } else {
                        setAddress("Error fetching address");
                    }
                } catch (error) {
                    setAddress("Error fetching address");
                    console.error(error);
                }
            };
            reverseGeocode();
        }
    }, [lat, lng]);

    const capturePhoto = async () => {
        try {
            const canvas = document.createElement("canvas");
            canvas.width = videoRef.current.videoWidth;
            canvas.height = videoRef.current.videoHeight;
            const context = canvas.getContext("2d");
            context.drawImage(
                videoRef.current,
                0,
                0,
                canvas.width,
                canvas.height
            );

            const base64Data = canvas.toDataURL("image/jpeg");
            setPhotoData(base64Data);
        } catch (error) {
            console.error("Error capturing photo:", error);
        }
    };

    return (
        <div className={styles.container}>
            <PreMapContainer />
            <title>폐지지원대</title>
            <div className={styles.name}>
                <a>폐지 지원대</a>
            </div>
            <div className={styles.bar}>
                <a className={styles.user}>{username}</a>
                <br></br>
                <a className={styles.score}>점수 : {score}</a>
            </div>
            <div className={styles.main_title}>핀 추가하기</div>
            <div className={styles.title}>
                {address || "Fetching address..."}
            </div>
            <div className={styles.camera}>
                <video
                    ref={videoRef}
                    autoPlay
                    muted
                    style={{ width: "90%", height: "180px" }}
                />
            </div>

            <div className={styles.pic}>
                {photoData && (
                    <img
                        src={photoData}
                        alt="Captured Photo"
                        style={{ width: "90%", height: "180px" }}
                    />
                )}
            </div>
            <div className={styles.shot}>
                <a onClick={capturePhoto}>사진 찍기</a>
            </div>
            <div className={styles.add}>
                <a onClick={addReport}>추가하기</a>
            </div>
            <div className={styles.back}>
                <a onClick={handleBackClick}>돌아가기</a>
            </div>
        </div>
    );
}
