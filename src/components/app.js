import {Router} from 'preact-router';

import Header from './header';
import 'react-h5-audio-player/lib/styles.css';
import Home from '../routes/home';
import Profile from '../routes/profile';
import Article from "../routes/article";
import SpokeAudioPlayer from "./spokeAudioPlayer";
import {useState} from "preact/hooks";
import Settings from "../routes/settings";
import Queue from "../routes/queue";
import {getValue, loadColors, setDark, setLight} from "./storage";


const App = () => {

    if (typeof window !== "undefined") {
        let autoMode = getValue("autoMode", false);
        if (autoMode) {
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                console.log("auto mode enabled, setting to dark");
                setDark()
            } else {
                console.log("auto mode enabled, setting to light");
                setLight()
            }
        }
        loadColors();
    }

    const [playing, setPlaying] = useState({urlAudio: "", title: ""});
    const [queue, setQueue] = useState({queue: []});

    function onStop() {
        if (queue.length > 0) {
            console.log("queuing next track");
        }
    }

    return (
        <div id="app">
            <Header/>
            <Router>
                <Home path="/" onPlaying={setPlaying} onQueue={setQueue} showOnlyNew={true}/>
                <Home path="/all" onPlaying={setPlaying} onQueue={setQueue} showOnlyNew={false}/>
                <Article path="/article/:stub" onPlaying={setPlaying}/>
                <Queue path="/queue"/>
                <Settings path={"/settings"}/>
                <Profile path="/profile/" user="me"/>
            </Router>
            <SpokeAudioPlayer
                src={playing.urlAudio}
                title={playing.title}
                onStop={onStop}
            />
        </div>
    );
}

export default App;
