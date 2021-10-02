import EndCallSVG from "svg/EndCall/EndCall.svg";
import ScreenSVG from "svg/Screen.svg";
import styles from "components/second-panel/SecondPanelVoice/SecondPanelVoice.module.css";
import ButtonComponent from "components/ButtonComponent";
import {useMediasoup} from "mediasoup/ReactMediasoupProvider";

function Button() {
    return (<ButtonComponent className={styles.button}>
        <ScreenSVG/>
        <span>Video</span>
    </ButtonComponent>);
}

function SecondPanelVoiceComponent() {

    const {producer, consumers} = useMediasoup();

    function endCall() {
        consumers.forEach(consumer => {
            consumer.consumer.close();
        });
        producer?.close();
    }

    return (
        <div className={styles.div}>
            <div className={styles.firstRow}>
                <span className={styles.rtcStatus}>RTC Connecting</span>
                <ButtonComponent className={styles.endCallButton} onClick={endCall}>
                    <EndCallSVG/>
                </ButtonComponent>
            </div>
            <div className={styles.secondRow}>
                <Button/>
                <Button/>
            </div>
        </div>
    );
}

export default SecondPanelVoiceComponent;