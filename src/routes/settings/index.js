import style from './style.css';
import {setDark, setLight, setPrimaryColor, setValue} from "../../components/storage";
import {useMatomo} from "@datapunt/matomo-tracker-react";
import {useEffect} from "preact/hooks";

const Settings = (props) => {

    const {trackEvent} = useMatomo();
    const MAX_SPEED = 25; //  2.5x
    const MIN_SPEED = 5;  //  0.5x

    function setThemeColor(obj) {
        let rgb = obj.target.style.backgroundColor;
        setPrimaryColor(rgb);
        trackEvent({category: 'Settings', action: 'Primary Color', name: rgb});
    }

    function clickLight() {
        setValue("autoMode", false);
        setLight();
        trackEvent({category: 'Settings', action: 'Light/Dark', name: "Light"});
    }

    function clickDark() {
        setValue("autoMode", false);
        setDark();
        trackEvent({category: 'Settings', action: 'Light/Dark', name: "Dark"});
    }

    function clickAuto() {
        setValue("autoMode", true);
        trackEvent({category: 'Settings', action: 'Light/Dark', name: "Auto"});
    }

    function changeSpeed(delta) {
        let newSpeed = parseInt(props.playbackSpeed, 10) + delta;
        if (newSpeed < MIN_SPEED) {
            newSpeed = MIN_SPEED;
        }
        if (newSpeed > MAX_SPEED) {
            newSpeed = MAX_SPEED;
        }
        props.onPlaybackSpeedChange(newSpeed);
    }

    function increaseSpeed() {
        changeSpeed(1)
    }

    function decreaseSpeed() {
        changeSpeed(-1)
    }

    function toggleAnalytics() {
        if (localStorage.getItem("analytics") === "true") {
            localStorage.setItem("analytics", "false");
        } else {
            localStorage.setItem("analytics", "true");
        }
    }

    function getDisableAnalytics() {
        return localStorage.getItem("analytics") === "true";
    }

    const {trackPageView} = useMatomo()
    useEffect(() => {
        trackPageView();
    }, []);

    return (
        <div class={style.settings}>
            <div className={style.category}>App Color</div>
            <div class={style.theme}>
                <span style="background-color:#57129d" onClick={setThemeColor}>Purple</span>
                <span style="background-color:#000" onClick={setThemeColor}>Black</span>
                <span style="background-color:#333" onClick={setThemeColor}>Grey</span>
                <span style="background-color:#0072ff" onClick={setThemeColor}>Blue</span>
                <span style="background-color:#c1121f" onClick={setThemeColor}>Red</span>
                <span style="background-color:#c44900" onClick={setThemeColor}>Orange</span>
                <span style="background-color:#00a651" onClick={setThemeColor}>Green</span>
            </div>

            <div className={style.category}>Light/Dark Mode</div>
            <div className={style.lightdark}>
                <span
                    style="background-color:rgba(255,255,255,.9); color:black;"
                    onClick={clickLight}>Light</span>
                <span
                    style="background-color:rgba(255,255,255,.1)"
                    onClick={clickDark}>Dark</span>
                <span
                    style="background:linear-gradient(135deg, rgba(255,255,255,0.1) 49%, rgba(255,255,255,0.9) 51%);); "
                    onClick={clickAuto}>Auto</span>
            </div>

            <div className={style.category}>Default Speed</div>
            <div className={style.speed}>
                <button onClick={decreaseSpeed}>-</button>
                {props.playbackSpeed / 10}x
                <button onClick={increaseSpeed}>+</button>
            </div>

            <div className={style.category}>Analytics</div>
            <div>
                <label>
                    <input type="checkbox" checked={getDisableAnalytics} onChange={toggleAnalytics}/>
                    Disable analytics
                </label>
            </div>
            <p class={style.disclaimer}>Spokewiki use a self-hosted matomo analytics to record which articles are
                started, finished, what color
                users pick and default speed. This info is not shared with any 3rd party and used only by developers to
                improve this app. Matomo masks all IPs and honors Do Not Track requests.</p>

        </div>
    );
}

export default Settings;
