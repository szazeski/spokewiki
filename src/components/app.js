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
import {cacheAsset, getBool, getValue, loadColors, removeCacheAsset, setDark, setLight} from "./storage";
import {createInstance, MatomoProvider} from "@datapunt/matomo-tracker-react";
import Podcast from "../routes/podcast";


function loadLightDarkMode() {
    if (typeof window !== "undefined") {
        let autoMode = getValue("autoMode", "false");
        if (autoMode === "true") {
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                console.log("auto mode enabled, setting to dark");
                setDark();
            } else {
                console.log("auto mode enabled, setting to light");
                setLight();
            }
        }
        loadColors();
    }
}

function setupMatomoAnalytics() {
    let disableAnalytics = localStorage.getItem("analytics") === "true";
    const instance = createInstance({
        urlBase: 'https://stats.spokewiki.com',
        siteId: 6,
        configurations: {
            disableCookies: disableAnalytics,
            //setSecureCookie: true,
            setRequestMethod: 'POST'
        }
    })
    return instance;
}


const App = () => {

    loadLightDarkMode();
    const instance = setupMatomoAnalytics();
    const [playing, setPlaying] = useState({urlAudio: "", title: ""});
    const [queue, setQueue] = useState([]);
    const [playbackSpeed, setPlaybackSpeed] = useState(getValue("playbackSpeed", 10));

    function onStop() {
        if (queue.length > 0) {
            console.log("queuing next track");
        }
        if (getBool("removeFromCacheAfterPlay")) {
            removeCacheAsset(playing.urlAudio);
        }
    }

    function setSpeed(speed) {
        setPlaybackSpeed(speed);
        localStorage.setItem("playbackSpeed", speed);
    }

    function AddQueue(data, front = false) {
        if (front) {
            console.log("Add Front Queue: ", data.title);
            setQueue(queue.unshift({title: data.title, urlAudio: data.urlAudio}));
        } else {
            console.log("Add Back Queue: ", data.title);
            setQueue(queue.push({title: data.title, urlAudio: data.urlAudio}));
        }
        cacheAsset(data.urlAudio);
        localStorage.setItem("queue", queue);
    }

    function PlayNext() {
        let stub = queue.pop();
    }


    return (
        <div id="app">
            <MatomoProvider value={instance}>
                <Header/>
                <Router>
                    <Home
                        path="/"
                        onPlaying={setPlaying}
                        onQueue={AddQueue}
                        showOnlyNew={true}
                    />
                    <Home
                        path="/all"
                        onPlaying={setPlaying}
                        onQueue={AddQueue}
                        showOnlyNew={false}
                    />
                    <Article
                        path="/article/:stub"
                        onPlaying={setPlaying}
                    />
                    <Queue
                        path="/queue"
                        onPlaying={setPlaying}
                        onQueue={AddQueue}
                    />
                    <Settings
                        path="/settings"
                        playbackSpeed={playbackSpeed}
                        onPlaybackSpeedChange={setSpeed}
                    />
                    <Podcast
                        path="/podcast"
                    />
                    <Profile
                        path="/profile/" user="me"
                    />
                </Router>
                <SpokeAudioPlayer
                    src={playing.urlAudio}
                    title={playing.title}
                    onStop={onStop}
                    playbackSpeed={playbackSpeed}
                    onPlaybackSpeedChange={setSpeed}
                />
            </MatomoProvider>
        </div>
    );
}

export default App;
