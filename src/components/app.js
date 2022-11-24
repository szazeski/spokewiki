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
import {createInstance, MatomoProvider} from "@datapunt/matomo-tracker-react";


const App = () => {

    if (typeof window !== "undefined") {
        let autoMode = getValue("autoMode", "false");
        if (autoMode === "true") {
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

    const instance = createInstance({
        urlBase: 'https://stats.spokewiki.com',
        siteId: 6,
        heartBeat: { // optional, enabled by default
            active: true, // optional, default value: true
            seconds: 10 // optional, default value: `15
        },
        linkTracking: false, // optional, default value: true
        configurations: { // optional, default value: {}
            // any valid matomo configuration, all below are optional
            //disableCookies: true,
            //setSecureCookie: true,
            setRequestMethod: 'POST'
        }
    })

    return (
        <div id="app">
            <MatomoProvider value={instance}>
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
            </MatomoProvider>
        </div>
    );
}

export default App;
