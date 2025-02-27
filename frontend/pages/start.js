import { useRouter } from "next/router";
import styles from "../styles/Start.module.css";

export default function Start() {
    const router = useRouter();
    const { username } = router.query;
    const handleBackClick = () => {
        router.push("/login");
    };
    const handleSClick = () => {
        router.push({
            pathname: "/smain",
            query: { username: username },
        });
    };
    const handleRClick = () => {
        router.push({
            pathname: "/rmain",
            query: { username: username },
        });
    };
    return (
        <div>
            <div className={styles.name}>
                <a>폐지 지원대</a>
            </div>
            <div className={styles.container}>
                <title>폐지 지원대</title>
                <div className={styles.nick_welcome}>
                    <h1>
                        {username} 님을<br></br>환영합니다!
                    </h1>
                    <hr className={styles.main_hr} />
                </div>
                <div className={styles.sub_title} onClick={handleSClick}>
                    <a>
                        폐지 수거<br></br>시작하기
                    </a>
                </div>
                <div className={styles.ment}>
                    <a>
                        폐지를 신고하기 위해서 오셨나요?<br></br>아래 버튼을
                        클릭하세요!
                    </a>
                </div>
                <div className={styles.sel} onClick={handleRClick}>
                    <a>
                        폐지 신고자<br></br>활동 시작하기
                    </a>
                </div>
                <div className={styles.back} onClick={handleBackClick}>
                    <a>뒤로가기</a>
                </div>
            </div>
        </div>
    );
}
