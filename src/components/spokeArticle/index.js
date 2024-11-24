import style from './style.css';
import {h} from 'preact';
import playsvg from '../../assets/icons/play.svg';
import queuesvg from "../../assets/icons/queue.svg";
import downloadsvg from "../../assets/icons/download.svg";
import linksvg from "../../assets/icons/link.svg";
import archivesvg from "../../assets/icons/archive.svg";
import {filterArticlesByTag} from "../toolbox";

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
        console.log(`play:${data.stub} (${data.urlAudio})`);
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

    function getTagsForClasses() {
        return data.tags.map(i => i.replaceAll(" ", "-")).join(" ");
    }

    function displayCategoryTags() {
        if (data.tags.length === 0) {
            return
        }
        return data.tags.map(t => {
            return <a href={getCategoryLink(t)} class={style.category} onClick={() => filterArticlesByTag(t)}>{t}</a>
        });
    }

    function getCategoryLink(t) {
        return `#/category/${t.replaceAll(" ", "-")}`;
    }

    const classes = `${getTagsForClasses()} SpokeArticle ${style.spokeArticle}`

    return (
        <div class={classes}>
            <div class={getListenStatus()}>
                {displayCategoryTags()}
                <a href={getUrl()}><h2>{data.title}</h2></a>
                <p>{data.shortDescription}</p>

                <div class={style.box}>

                    <div class={style.flex}>
                        <a href="#play" onClick={play}><img src={playsvg} alt="" />PLAY</a>
                        <a href="#queue" onClick={queue}><img src={queuesvg} alt="" />queue</a>
                        <a href={data.urlAudio} target="_blank" rel="noreferrer"><img src={downloadsvg} alt="" />mp3</a>
                        <a href={data.urlWikipedia} target="_blank" rel="noreferrer"><img src={linksvg} alt="" />wikipedia</a>
                        <a href="#mark" onClick={togglePlayed}><img src={archivesvg} alt="" />archive</a>
                    </div>

                    <div class={style.bottomline}>
                        <span>{data.durationMin} min</span>
                        <span>{data.filesize} mb</span>
                        recorded <strong>{data.dateRecorded}</strong>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SpokeArticle;
