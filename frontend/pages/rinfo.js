import { useRouter } from "next/router";
import styles from "../styles/RInfo.module.css";

export default function Info() {
    const router = useRouter();
    const { username, ruser, date, ima } = router.query;
    const handleBackClick = () => {
        router.push({
            pathname: "/rmain",
            query: { username: username },
        });
    };

    const score = 2030;

    return (
        <div className={styles.container}>
            <title>폐지지원대</title>
            <div className={styles.name}>
                <a>폐지 지원대</a>
            </div>
            <div className={styles.bar}>
                <a className={styles.user}>{username}</a>
                <br></br>
                <a className={styles.score}>점수 : {score}</a>
            </div>
            <div className={styles.title}>{ruser}님이 신고하신 폐지에요!</div>
            <div className={styles.sub_title}>
                {date}에<br></br>등록됐어요
            </div>
            <img className={styles.img} src={ima} />
            <div className={styles.back}>
                <a onClick={handleBackClick}>돌아가기</a>
            </div>
        </div>
    );
}
