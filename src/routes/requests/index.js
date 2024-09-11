import style from './style.css';
import {h} from "preact";
import {useEffect} from "preact/hooks";
import {useMatomo} from "@datapunt/matomo-tracker-react";

function clearResultList() {
    let resultList = document.getElementById("result-list");
    resultList.innerHTML = '';
    return resultList;
}

const RequestArticle = () => {

    const {trackPageView} = useMatomo()
    useEffect(() => {
        trackPageView()
    }, [])

    let searching = false;
    let requestQueue = [];


    function clearRequestBox() {
        let textInput = document.getElementById("requestInput");
        textInput.value = "";
    }

    function searchFor() {
        let textInput = document.getElementById("requestInput");

        console.log("searchFor", textInput.value);

        if (searching || textInput.value.length === 0) {
            return;
        }

        searching = true;
        fetch(`https://en.wikipedia.org/w/api.php?action=opensearch&search=${textInput.value}&limit=10&namespace=0&format=json&origin=*

`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                searching = false;
                showWikipediaResults(data);
            })
            .catch(error => {
                console.log(error);
            })
    }

    /*
     Show Results are from wikipedia opensearch apoi
[
  "app",
  [ "App", "Appendicitis" ],
  [ "", "" ],
  ["https://en.wikipedia.org/wiki/App","https://en.wikipedia.org/wiki/Appendicitis"]
]

*/

    function showWikipediaResults(data) {
        console.log("showWikipediaResults");
        let resultList = clearResultList();

        if (data[1].length === 0) {
            return
        }

        for (let i = 0; i < data[1].length; i++) {
            let li = document.createElement("li");
            li.innerText = data[1][i];
            let button = document.createElement("button");
            button.innerText = "Request";
            button.onclick = () => {
                makeRequestFor(data[1][i], data[3][i])
            };
            li.appendChild(button);
            resultList.appendChild(li);
        }
    }

    function showRequested() {
        let resultList = clearResultList();

        if (requestQueue === undefined) {
            return
        }

        if (requestQueue.length === 0) {
            return
        }

        for (let i = 0; i < requestQueue.length; i++) {
            let li = document.createElement("li");
            let a = document.createElement('a');
            a.href = requestQueue[i].url.replaceAll('en.wikipedia.', 'en.m.wikipedia.');
            a.text = requestQueue[i].title;
            li.appendChild(a);
            //let button = document.createElement("button");
            // button.innerText = "Vote";
            // button.onclick = () => {
            //     makeRequestFor(data[1][i], data[3][i])
            // };
            // li.appendChild(button);
            resultList.appendChild(li);
        }
    }

    function makeRequestFor(title, url) {
        let urlApi = `https://api.spokewiki.com/request`;
        fetch(urlApi, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({title, url}),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                clearRequestBox();
                loadRequests();
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }


    function loadRequests() {
        console.log("loadrequests()");

        fetch('https://api.spokewiki.com/request')
            .then(response => response.json())
            .then(data => {
                requestQueue = data.requests;
                showRequested();

            })
            .catch(error => {
                console.error('loadRequests Error:', error);
            });
    }

    loadRequests();     // onload

    return (
        <div className={style.requestArticle}>

            <div className={style.spacer} />

            <label>
                Request New articles from Wikipedia:
                <br />
                <input id="requestInput" class={style.inputRequest} type="text" autoComplete='no'
                       onChange={() => searchFor()} />
            </label>


            <div className={style.autocompletebox}>
                <ul id="result-list" />
            </div>

            <div className={style.noarticles}>
                no articles found
            </div>
        </div>
    );
}

export default RequestArticle;
