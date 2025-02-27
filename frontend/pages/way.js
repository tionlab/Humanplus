import { useRouter } from "next/router";
import styles from "../styles/SMain.module.css";
import MapContainer from "../components/wayMap";

export default function S_Main() {
    const router = useRouter();
    const { username, num } = router.query;

    const handleBackClick = () => {
        router.push({
            pathname: "/smain",
            query: { username: username, num: AddNum },
        });
    };

    const processedNum = num ? num : 0;
    const AddNum = parseInt(processedNum) + 1;
    const end = "작업 마치기";

    return (
        <div>
            <div className={styles.name}>
                <a>폐지 지원대</a>
            </div>
            <div className={styles.bar}>
                <a>오늘의 작업량 : {processedNum}개</a>
            </div>
            <div className={styles.container}>
                <title>폐지 지원대</title>
                <MapContainer />
                <div className={styles.hint}>
                    <a onClick={handleBackClick}>{end}</a>
                </div>
            </div>
        </div>
    );
}
