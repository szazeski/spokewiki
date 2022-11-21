import H5AudioPlayer, {RHAP_UI} from "react-h5-audio-player";
import style from "./style.css";
import {getValue} from "../storage";
import {useMatomo} from "@datapunt/matomo-tracker-react";

const SpokePlayer = ({src, title, onStop}) => {

    const {trackEvent} = useMatomo()
    let playbackSpeed = getValue("playbackSpeed", 1);

    function onStart() {
        setSpeed(playbackSpeed);
        trackEvent({category: 'Audio', action: 'Start', name: title})
    }

    function onEnd() {
        console.log("end - marked finished")
        localStorage.setItem(src, new Date().toISOString());
        onStop();
        trackEvent({category: 'Audio', action: 'Finished', name: title})
    }

    function onPause() {
        console.log("pause - save time position")
    }

    function setSpeed(speed) {
        playbackSpeed = speed;
        localStorage.setItem("playbackSpeed", speed);
        const player = document.getElementsByTagName("audio");
        if (player != null) {
            player[0].playbackRate = speed;
        }
        trackEvent({category: 'Audio', action: 'Speed', name: speed})
    }

    return (
        <H5AudioPlayer
            header={title}
            autoPlay={false}
            autoPlayAfterSrcChange={true}
            src={src}
            layout="stacked-reverse"
            onPlay={onStart}
            onPause={onPause}
            onEnded={onEnd}
            customAdditionalControls={
                [
                    <button class={style.SpokeAudioPlayerSpeed} onClick={() => setSpeed(1)}>1.0x</button>,
                    <button class={style.SpokeAudioPlayerSpeed} onClick={() => setSpeed(1.2)}>1.2x</button>,
                    <button class={style.SpokeAudioPlayerSpeed} onClick={() => setSpeed(1.5)}>1.5x</button>,
                ]
            }
            customVolumeControls={[]}
            customControlsSection={
                [
                    RHAP_UI.ADDITIONAL_CONTROLS,
                    RHAP_UI.MAIN_CONTROLS,
                    RHAP_UI.VOLUME_CONTROLS,
                ]
            }
            customProgressBarSection={
                [
                    RHAP_UI.CURRENT_TIME,
                    RHAP_UI.PROGRESS_BAR,
                    RHAP_UI.DURATION
                ]
            }
            style={style.SpokeAudioPlayer}
        />
    )
}


export default SpokePlayer;
