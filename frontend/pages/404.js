import { useRouter } from "next/router";
import styles from "../styles/404.module.css";

export default function Error() {
    const router = useRouter();
    const handleBackClick = () => {
        router.push("/");
    };

    return (
        <div className={styles.container}>
            <title>폐지지원대</title>
            <div className={styles.name}>
                <a>폐지 지원대</a>
            </div>
            <div className={styles.alert}>
                <a>
                    이런!<br></br>이곳은 존재 하지 않는 페이지 입니다!<br></br>
                    현재 폐지 지원대는 개발 중에 있음으로<br></br>서비스가
                    불안정함을 알려드립니다.
                </a>
            </div>
            <div className={styles.back}>
                <a onClick={handleBackClick}>돌아가기</a>
            </div>
        </div>
    );
}
