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


const App = () => {

    if (typeof window !== "undefined") {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.body.classList.add("darkmode");
        } else {
            document.body.classList.remove("darkmode");
        }
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
