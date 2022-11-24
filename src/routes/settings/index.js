import {h} from 'preact';
import style from './style.css';
import {getValue, setDark, setLight, setPrimaryColor, setValue} from "../../components/storage";
import {useMatomo} from "@datapunt/matomo-tracker-react";
import {useEffect, useState} from "preact/hooks";

const Settings = () => {

    let PlaySpeed = parseFloat(getSpeed());
    const [PlaybackSpeed, setPlaybackSpeed] = useState(PlaySpeed.toFixed(1));

    function setThemeColor(obj) {
        let rgb = obj.target.style.backgroundColor;
        setPrimaryColor(rgb);
    }

    function clickLight() {
        setValue("autoMode", false);
        setLight();
    }

    function clickDark() {
        setValue("autoMode", false);
        setDark();
    }

    function clickAuto() {
        setValue("autoMode", true);
    }

    function getSpeed() {
        return getValue("playbackSpeed", "1.0");
    }

    function changeSpeed(delta) {
        PlaySpeed = PlaySpeed + delta;
        if (PlaySpeed < 0.5) {
            PlaySpeed = 0.5;
        }
        if (PlaySpeed > 2) {
            PlaySpeed = 2.0;
        }
        setPlaybackSpeed(PlaySpeed.toFixed(1));
        setValue("playbackSpeed", PlaybackSpeed);
    }

    function increaseSpeed() {
        changeSpeed(0.1)
    }

    function decreaseSpeed() {
        changeSpeed(-0.1)
    }

    const {trackPageView} = useMatomo()
    useEffect(() => {
        trackPageView()
    }, [])

    return (
        <div class={style.settings}>
            <div className={style.category}>App Color</div>
            <div class={style.theme}>
                <span style="background-color:#57129d" onClick={setThemeColor}>Purple</span>
                <span style="background-color:#333" onClick={setThemeColor}>Grey</span>
                <span style="background-color:#0072ff" onClick={setThemeColor}>Blue</span>
                <span style="background-color:#c1121f" onClick={setThemeColor}>Red</span>
                <span style="background-color:#c44900" onClick={setThemeColor}>Orange</span>
            </div>

            <div className={style.category}>Light/Dark Mode</div>
            <div className={style.lightdark}>
                <span style="background-color:rgba(255,255,255,.9); color:black;" onClick={clickLight}>Light</span>
                <span style="background-color:rgba(255,255,255,.1)" onClick={clickDark}>Dark</span>
                <span
                    style="background:linear-gradient(180deg, rgba(255,255,255,0.1) 49%, rgba(255,255,255,0.9) 51%);)"
                    onClick={clickAuto}>Auto</span>
            </div>

            <div className={style.category}>Default Speed</div>
            <div className={style.speed}>
                <button onClick={decreaseSpeed}>-</button>
                {PlaybackSpeed}x
                <button onClick={increaseSpeed}>+</button>
            </div>

        </div>
    );
}

export default Settings;
