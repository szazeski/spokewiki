import {Router} from 'preact-router';

import Header from './header';
import 'react-h5-audio-player/lib/styles.css';
import Home from '../routes/home';
import Profile from '../routes/profile';
import Article from "../routes/article";
import H5AudioPlayer from "react-h5-audio-player";


const App = () => {

    addEventListener("spokewiki-play", (event) => {
        console.log("spokewiki-play");
        console.log(event);

        audioUrl = event.audiourl;
        audioTitle = event.audiourl;
    })

    let audioTitle = "title";
    let audioUrl = "https://media.spokewiki.com/crowd-crush.7fd4b3b3-99f0-4f1b-871c-204e19e0f4ff.mp3";

    return (
        <div id="app">
            <Header/>
            <Router>
                <Home path="/"/>
                <Article path="/article/:stub"/>
                <Profile path="/profile/" user="me"/>
                <Profile path="/profile/:user"/>
            </Router>
            <H5AudioPlayer
                header={audioTitle}
                preload="none"
                src={audioUrl}
            />
        </div>
    );
}

export default App;
