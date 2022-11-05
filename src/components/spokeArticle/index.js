import {h} from 'preact';

import style from './style.css';

const SpokeArticle = ({data}) => {

    function play() {
        console.log("playing " + data.stub);
        App.SetAudioUrl(data.urlAudio);
        App.SetAudioTitle(data.title);
    }

    function queue() {
        console.log("queueing" + data.stub);
    }

    return (
        <div class={style.spokeArticle}>
            <a href={"./article/".concat("", data.slug)}>
                <div>
                    <h2>{data.title}</h2>
                    <p>{data.shortDescription}</p>
                </div>

                <div class={style.box}>
                    <div>{data.durationMin} min (10mb)</div>
                    <div><a href="#playnow" onClick={play}>play now</a> | <a href="#queue" onClick={queue}>queue</a>
                    </div>
                </div>
            </a>
        </div>
    );
}

export default SpokeArticle;
