import {h} from 'preact';
import style from './style.css';
import {getValue, setDark, setLight, setPrimaryColor, setValue} from "../../components/storage";

const Settings = () => {

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

    return (
        <div class={style.settings}>
            <p>coming soon...</p>
            <div>App Color</div>
            <div class={style.theme}>
                <span style="background-color:#57129d" onClick={setThemeColor}>Purple</span>
                <span style="background-color:#333" onClick={setThemeColor}>Grey</span>
                <span style="background-color:#0072ff" onClick={setThemeColor}>Blue</span>
                <span style="background-color:#e63946" onClick={setThemeColor}>Red</span>

            </div>
            <div>Light/Dark Mode</div>
            <div className={style.lightdark}>
                <span style="background-color:rgba(255,255,255,.9); color:black;" onClick={clickLight}>Light</span>
                <span style="background-color:rgba(255,255,255,.1)" onClick={clickDark}>Dark</span>
                <span
                    style="background:linear-gradient(180deg, rgba(255,255,255,0.88) 46%, rgba(255,255,255,0.06) 52%);)"
                    onClick={clickAuto}>Auto</span>
            </div>
            <div>Default Speed</div>
            <div>{getSpeed()}x</div>
            <div>Never show</div>
            <div>
                <span class={style.topic}>Politics</span>
                <span class={style.topic}>Crypto</span>
            </div>
        </div>
    );
}

export default Settings;
