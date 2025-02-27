import { useRouter } from "next/router";
import styles from "../styles/SMain.module.css";
import MapContainer from "../components/Map";

export default function S_Main() {
    const router = useRouter();
    const { num } = router.query;

    const processedNum = num ? num : 0;
    const hint = "폐지를 클릭하여\n시작 해보세요!";

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
                    <a>{hint}</a>
                </div>
            </div>
        </div>
    );
}
