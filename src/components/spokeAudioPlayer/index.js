import H5AudioPlayer, {RHAP_UI} from "react-h5-audio-player";
import style from "./style.css";
import {useMatomo} from "@datapunt/matomo-tracker-react";
import {useEffect} from "preact/hooks";

const SpokePlayer = ({src, title, playbackSpeed, onStop, onPlaybackSpeedChange}) => {

    const {trackEvent} = useMatomo();

    useEffect(() => {
        setPlayerSpeed();
    }, [playbackSpeed]);

    function onStart() {
        setPlayerSpeed();
        trackEvent({category: 'Audio', action: 'Start', name: title})
    }

    function onEnd() {
        console.log("end - marked finished")
        localStorage.setItem(src, new Date().toISOString());
        onStop();
        trackEvent({category: 'Audio', action: 'Finished', name: title});
    }

    function onPause() {
        console.log("pause - save time position");
    }

    function setPlayerSpeed() {
        const player = document.getElementsByTagName("audio");
        const newSpeed = playbackSpeed / 10;
        if (player != null && player[0].playbackRate !== newSpeed) {
            console.log("speed", newSpeed);
            player[0].playbackRate = newSpeed;
            trackEvent({category: 'Audio', action: 'Speed', name: newSpeed});
        }
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
                    <button class={style.SpokeAudioPlayerSpeed}
                            onClick={() => onPlaybackSpeedChange(10)}>1.0x</button>,
                    <button class={style.SpokeAudioPlayerSpeed}
                            onClick={() => onPlaybackSpeedChange(12)}>1.2x</button>,
                    <button class={style.SpokeAudioPlayerSpeed}
                            onClick={() => onPlaybackSpeedChange(15)}>1.5x</button>,
                    <span> {playbackSpeed / 10}x</span>
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
