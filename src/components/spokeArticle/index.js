import style from './style.css';

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
        return "/article/" + data.stub;
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
                    <div>{data.durationMin} min ({data.filesize}mb) - recorded {data.dateRecorded}</div>
                    <div>
                        <a href="#playnow" onClick={play}>play now</a>
                        <a href="#queue" onClick={queue}>queue</a>
                        <a href={data.urlAudio} target="_blank">mp3</a>
                        <a href={data.urlWikipedia} target="_blank">wikipedia</a>
                        <a href="#mark" onClick={togglePlayed}>archive</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SpokeArticle;
