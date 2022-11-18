import {h} from 'preact';
import style from './style.css';

const Settings = () => {

    let root = document.documentElement;

    function setThemeColor(color) {
        console.log(color.target.style.backgroundColor);
        setColor(color.target.style.backgroundColor);
    }

    function setColor(rgb) {
        root.style.setProperty('--primary', rgb);
        let metaThemeColor = document.querySelector("meta[name=theme-color]");
        metaThemeColor.setAttribute("content", rgb);
    }

    return (
        <div class={style.settings}>
            <p>coming soon...</p>
            <div>App Color</div>
            <div class={style.theme}>
                <span style="background-color:#57129d" onClick={setThemeColor}>Purple</span>
                <span style="background-color:#333" onClick={setThemeColor}>Grey</span>
                <span style="background-color:#0000ff" onClick={setThemeColor}>Blue</span>
            </div>
            <p>Light/Dark Mode : Auto</p>
            <p>Default Speed: 1.5x</p>
            <div>Never show :
                <span class={style.topic}>Politics</span>
                <span class={style.topic}>Crypto</span>
            </div>
        </div>
    );
}

export default Settings;
