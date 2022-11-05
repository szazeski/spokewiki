import {h} from 'preact';
import {Router} from 'preact-router';

import Header from './header';

// Code-splitting is automated for `routes` directory
import Home from '../routes/home';
import Profile from '../routes/profile';
import Article from "../routes/article";
import ReactAudioPlayer from "react-audio-player";

const App = () => (
    <div id="app">
        <Header/>
        <Router>
            <Home path="/"/>
            <Article path="/article/:stub"/>
            <Profile path="/profile/" user="me"/>
            <Profile path="/profile/:user"/>
        </Router>
        <ReactAudioPlayer
            src="my_audio_file.ogg"
            autoPlay
            controls
        />
    </div>
)

export default App;
