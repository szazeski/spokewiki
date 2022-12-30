import style from './style.css';
import playsvg from '../../assets/icons/play.svg';
import queuesvg from "../../assets/icons/queue.svg";
import downloadsvg from "../../assets/icons/download.svg";
import linksvg from "../../assets/icons/link.svg";
import archivesvg from "../../assets/icons/archive.svg";

const SpokeArticle = ({data, onPlaying, onQueue, showNewOnly}) => {

    let listened = false;
    if (typeof window !== "undefined") {
        let status = localStorage.getItem(data.urlAudio)
        if (status != null) {
            listened = true;
        }
    }

    if (showNewOnly && listened) {
        return
    }

    function play() {
        console.log("play" + data.stub);
        console.log("url:" + data.urlAudio);
        document.title = data.title;
        onPlaying(data);
    }

    function queue() {
        onQueue(data);
    }

    function togglePlayed() {
        if (localStorage.getItem(data.urlAudio) == null) {
            localStorage.setItem(data.urlAudio, new Date().toISOString());
        } else {
            localStorage.removeItem(data.urlAudio);
        }
    }

    function getUrl() {
        return `/article/${data.stub}`;
    }

    function getListenStatus() {
        if (listened) {
            return style.listened;
        }
        return "";
    }

    return (
        <div class={style.spokeArticle}>
            <div class={getListenStatus()}>
                <a href={getUrl()}><h2>{data.title}</h2></a>
                <p>{data.shortDescription}</p>

                <div class={style.box}>

                    <div class={style.flex}>
                        <a href="#play" onClick={play}><img src={playsvg} alt=""/>PLAY</a>
                        <a href="#queue" onClick={queue}><img src={queuesvg} alt=""/>queue</a>
                        <a href={data.urlAudio} target="_blank"><img src={downloadsvg} alt=""/>mp3</a>
                        <a href={data.urlWikipedia} target="_blank"><img src={linksvg} alt=""/>wikipedia</a>
                        <a href="#mark" onClick={togglePlayed}><img src={archivesvg} alt=""/>archive</a>
                    </div>

                    <div>{data.durationMin} min ({data.filesize}mb) - recorded <strong>{data.dateRecorded}</strong>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SpokeArticle;
