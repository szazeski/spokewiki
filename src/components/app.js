import {Router} from 'preact-router';

import Header from './header';
import 'react-h5-audio-player/lib/styles.css';
import Home from '../routes/home';
import Profile from '../routes/profile';
import Article from "../routes/article";
import SpokeAudioPlayer from "./spokeAudioPlayer";
import {useState} from "preact/hooks";


const App = () => {

    const [playing, setPlaying] = useState({urlAudio: "", title: ""});

    return (
        <div id="app">
            <Header/>
            <Router>
                <Home
                    path="/"
                    onPlaying={setPlaying}
                />
                <Article path="/article/:stub"/>
                <Profile path="/profile/" user="me"/>
                <Profile path="/profile/:user"/>
            </Router>
            <SpokeAudioPlayer
                src={playing.urlAudio}
                title={playing.title}
            />
        </div>
    );
}

export default App;
