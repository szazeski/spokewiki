import {h} from 'preact';
import style from './style.css';

const Settings = () => {

    return (
        <div class={style.settings}>
            <p>coming soon...</p>
            <p>App Color : <span className={style.topic}>Purple</span></p>
            <p>Light/Dark Mode : Auto</p>
            <p>Default Speed: 1.5x</p>
            <div>Never show :
                <span class={style.topic}>Politics</span>
                <span className={style.topic}>Crypto</span>
            </div>
        </div>
    );
}

export default Settings;
