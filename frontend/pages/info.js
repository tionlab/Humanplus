import { useRouter } from "next/router";
import styles from "../styles/Info.module.css";

export default function Info() {
    const router = useRouter();
    const { username, ruser, date, lat, lng, state, ima, num } = router.query;
    const handleBackClick = () => {
        router.push({
            pathname: "/smain",
            query: { username: username, num: num },
        });
    };
    const handleWayClick = () => {
        router.push({
            pathname: "/way",
            query: { username: username, lat: lat, lng: lng, num: num },
        });
    };

    const processedNum = num ? num : 0;
    return (
        <div className={styles.container}>
            <title>폐지지원대</title>
            <div className={styles.name}>
                <a>폐지 지원대</a>
            </div>
            <div className={styles.bar}>
                <a>오늘의 작업량 : {processedNum}개</a>
            </div>
            <div className={styles.title}>{ruser}님이 신고하신 폐지에요!</div>
            <div className={styles.sub_title}>
                {date}에<br></br>등록됐어요
            </div>
            <img className={styles.img} src={ima} />
            <div className={styles.start}>
                <a onClick={handleWayClick}>작업 시작하기</a>
            </div>
            <div className={styles.back}>
                <a onClick={handleBackClick}>돌아가기</a>
            </div>
        </div>
    );
}
