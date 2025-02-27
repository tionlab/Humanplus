import { useRouter } from "next/router";
import styles from "../styles/Load.module.css";

export default function Index() {
    const router = useRouter();
    if (process.browser) {
        setTimeout(function () {
            router.push(`/login`);
        }, 3000);
    }

    return (
        <div className={styles.container}>
            <title>폐지지원대</title>
            <a>잠시만 기다려주세요...</a>
        </div>
    );
}
