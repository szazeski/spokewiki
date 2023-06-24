import style from './style.css';
import data from '../../data/data.json';
import SpokeArticle from "../../components/spokeArticle";
import {useState} from "preact/hooks";

const Queue = ({onPlaying, onQueue}) => {

    async function calculate() {
        if (navigator.storage && navigator.storage.estimate) {
            const quota = await navigator.storage.estimate();
            // quota.usage -> Number of bytes used.
            // quota.quota -> Maximum number of bytes available.
            const percentageUsed = (quota.usage / quota.quota) * 100;
            const mbUsaged = quota.usage / 1024 / 1024;
            showResult(`You've used ${mbUsaged.toFixed(1)}mb ${percentageUsed.toFixed(1)}% of the available storage.`);
        } else {
            showResult("Storage Manager API is not supported")
        }
    }

    const [listOfArticles, setListOfArticles] = useState([]);

    function getCachedFiles() {
        caches.open("offline-mp3").then((cache) => {
            cache.keys().then((keys) => {
                showCount(`${keys.length} file(s) cached`);
                let results = keys.map(k => {
                    let entry = data.articles.filter(d => {
                        return d.urlAudio === k.url;
                    });
                    return (
                        <SpokeArticle
                            data={entry[0]}
                            onPlaying={onPlaying}
                            onQueue={onQueue}
                            showNewOnly={false}
                        />
                    );
                });
                // Temp fix to stop infinite cycles
                if (listOfArticles.length !== results.length) {
                    setListOfArticles(results);
                }
            });
        });
    }

    function clearCache() {
        caches.delete("offline-mp3");
        window.location = '/queue#cleared';
    }

    function showResult(text) {
        document.querySelector("#used").innerHTML = text;
    }

    function showCount(text) {
        document.querySelector("#output").innerHTML = text;
    }

    getCachedFiles();
    calculate();

    return (
        <div className={style.queue}>

            <div id="files">{listOfArticles}</div>

            <input className={style.ClearCache} type="button" value="Clear Cache" onClick={clearCache}/>
            <div id="used">-</div>
            <div id="output">-</div>

        </div>
    );
}

export default Queue;
