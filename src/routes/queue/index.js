import style from './style.css';

const Queue = () => {

    async function calculate() {
        if (navigator.storage && navigator.storage.estimate) {
            const quota = await navigator.storage.estimate();
            // quota.usage -> Number of bytes used.
            // quota.quota -> Maximum number of bytes available.
            const percentageUsed = (quota.usage / quota.quota) * 100;
            const mbUsaged = quota.usage / 1024 / 1024;
            showResult(`You've used ${mbUsaged.toFixed(1)}mb ${percentageUsed.toFixed(3)}% of the available storage.`);
        } else {
            showResult("Storage Manager API is not supported")
        }
    }

    function getCachedFiles() {
        caches.open("offline-mp3").then((cache) => {
            cache.keys().then((keys) => {
                console.log(keys);
                document.querySelector("#output").innerHTML = keys.length + " files cached";
                document.querySelector("#files").innerHTML = keys.map(k => k.url).toString();
            });
        });
    }

    function clearCache() {
        caches.delete("offline-mp3");
        window.location = '/';
    }

    function showResult(text) {
        document.querySelector("#output").innerHTML = text;
    }

    getCachedFiles();

    return (
        <div class={style.queue}>

            <p>coming soon...</p>

            <div id="output">-</div>

            <div id="files">-</div>


            <input type="button" value="Clear Cache" onClick={clearCache}/>

        </div>
    );
}

export default Queue;
