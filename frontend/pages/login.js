import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "../styles/Login.module.css";

export default function Login() {
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState(undefined);
    let recognition;
    let hasClickedMicrophone = false;
    const router = useRouter();
    const handleStartClick = () => {
        router.push({
            pathname: "/start",
            query: { username: transcript },
        });
    };

    useEffect(() => {
        if (
            !("SpeechRecognition" in window) &&
            !("webkitSpeechRecognition" in window)
        ) {
            alert("Web Speech API를 지원하지 않는 브라우저입니다.");
            return;
        }
    }, []);

    const toggleListening = () => {
        if (!hasClickedMicrophone) {
            hasClickedMicrophone = true;
        }
        if (isListening) {
            stopListening();
        } else {
            startListening();
        }
    };

    const startListening = () => {
        setIsListening(true);

        recognition =
            new window.webkitSpeechRecognition() ||
            new window.SpeechRecognition();
        recognition.lang = "ko-KR";

        recognition.onresult = (event) => {
            const result = event.results[0][0].transcript;

            const cleanedTranscript = result.replace(
                /[\s!@#$%^&*()_+{}\[\]:;<>,.?~\\/\\-]/g,
                ""
            );
            let finalTranscript = cleanedTranscript;
            if (cleanedTranscript.length > 7) {
                finalTranscript = cleanedTranscript.slice(0, 7);
            }
            setTranscript(finalTranscript);

            if (cleanedTranscript.length >= 7) {
                stopListening();
            }
        };

        recognition.onend = () => {
            if (isListening) {
                startListening();
            }
        };

        recognition.start();
    };

    const stopListening = () => {
        setIsListening(false);

        if (recognition) {
            recognition.stop();
        }
    };

    const subTitleText = isListening
        ? "듣고있어요! \n 말씀해주세요!"
        : hasClickedMicrophone
        ? "원하시는 이름이 맞나요? \n 아니라면 다시 한번 \n 버튼을 눌러 말해주세요!"
        : "앱에서 사용할 이름을 \n 마이크 버튼을 눌러 \n 말해주세요!";

    return (
        <div>
            <div className={styles.name}>
                <a>폐지 지원대</a>
            </div>
            <div className={styles.container}>
                <title>폐지 지원대</title>
                <div className={styles.main_title}>
                    <h1>
                        폐지 지원대에<br></br>오신걸 환영합니다!
                    </h1>
                    <hr className={styles.main_hr} />
                </div>
                <div className={styles.sub_title}>
                    <a dangerouslySetInnerHTML={{ __html: subTitleText }} />
                </div>
                <input
                    className={styles.nickname}
                    value={transcript}
                    maxLength="8"
                />
                <div className={styles.mic}>
                    <img
                        src="../images/mic.png"
                        alt="마이크 버튼"
                        onClick={toggleListening}
                    />
                </div>
                <div className={styles.final_title}>
                    <a>
                        실명이 아니어도 괜찮아요!<br></br>다시 누르면 다시 쓸 수
                        있어요!
                    </a>
                </div>
                <div className={styles.sel} onClick={handleStartClick}>
                    <a>결정하기</a>
                </div>
            </div>
        </div>
    );
}
