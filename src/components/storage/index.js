import data from '../../data/data.json';

export function getValue(key, defaultValue) {
    if (typeof window !== 'undefined') {
        return localStorage.getItem(key) || defaultValue;
    }
    return defaultValue
}

export function getBool(key) {
    if (typeof window !== 'undefined') {
        let value = localStorage.getItem(key)?.toLowerCase()
        return value === "true"
    }
    return false
}

export function setValue(key, value) {
    if (typeof window !== 'undefined') {
        localStorage.setItem(key, value);
    }
}

export function setPrimaryColor(rgb) {
    document.documentElement.style.setProperty('--primary', rgb);
    setValue("primary", rgb);
    setMetaThemeColor(rgb);
}

export function getPrimaryColor() {
    return getValue("primary", DEFAULT_PRIMARY_COLOR);
}

export function setInverseColor(rgb, textColor) {
    let root = document.documentElement;
    root.style.setProperty('--primary-inverse', rgb);
    setValue("primary-inverse", rgb);
    root.style.setProperty('--text', textColor);
    setValue("text-color", textColor);
}

export function setDark() {
    setValue("theme", "dark");
    setInverseColor("rgba(255,255,255,.15)", "rgba(255,255,255,.85)");
}

export function setLight() {
    setValue("theme", "light");
    setInverseColor("rgba(255,255,255,.85)", "rgba(0,0,0,.85)");
}

const DEFAULT_PRIMARY_COLOR = "rgb(87, 18, 157)"; // Purple

function setMetaThemeColor(primaryColor) {
    let metaThemeColor = document.querySelector("meta[name=theme-color]");
    if (metaThemeColor === null) {
        return;
    }
    metaThemeColor.setAttribute("content", primaryColor);
    if (getValue("theme", "light") === "light") {
        setLight();
    } else {
        setDark();
    }
}

export function loadColors() {
    let root = document.documentElement;
    let primaryColor = getValue("primary", DEFAULT_PRIMARY_COLOR);
    root.style.setProperty('--primary', primaryColor);

    setMetaThemeColor(primaryColor);
}

const DURATION_1_HOUR = 3600000;

export function refreshCache() {
    if (typeof window !== "undefined") {
        localStorage.removeItem("lastUpdated");
        localStorage.removeItem("articles");
        getArticles();
    }
}

export function getArticles() {
    if (typeof window !== "undefined") {
        let shouldFetch = false;
        let articleString = localStorage.getItem("articles");
        let lastUpdatedString = localStorage.getItem("lastUpdated");
        let lastUpdated = new Date(lastUpdatedString);

        if (articleString === null) {
            shouldFetch = true;
        } else if (lastUpdated === null) {
            shouldFetch = true;
        } else if (new Date - lastUpdated > DURATION_1_HOUR) {
            shouldFetch = true;
        } else if (articleString === "undefined") {
            shouldFetch = true;
            localStorage.removeItem("articles");
            localStorage.removeItem("lastUpdated");
        }

        if (shouldFetch) {
            console.log("fetching data.json")

            // TODO check etag in the request

            fetch("https://api.spokewiki.com/data.json").then((response) => {
                // validate response
                if (!response.ok) {
                    throw new Error("Failed to fetch data.json");
                }
                // get etag from response
                let etag = response.headers.get("etag");
                localStorage.setItem("articles-future-etag", etag);
                // "1687a-673ec65e-199bbfabbee2054a;br" hostinger has weird etags....

                return response.json();

            }).then((data) => {

                if (data !== undefined) {

                    let newEtag = localStorage.getItem("articles-future-etag");
                    let lastEtag = localStorage.getItem("articles-etag");
                    localStorage.setItem("lastUpdated", new Date()); // update whenever we check

                    if (newEtag !== lastEtag) {
                        console.log("etag has changed, updating data.json")
                        articleString = JSON.stringify(data);
                        localStorage.setItem("articles", articleString);
                        localStorage.setItem("articles-etag", newEtag);
                        localStorage.removeItem("articles-future-etag");
                    } else {
                        console.log("etag has not changed, not updating data.json")
                    }
                }

            }).catch((error) => {
                console.error("Failed to fetch updated data", error);
                if (articleString !== null) {
                    return JSON.parse(articleString);
                }
                return data.articles; // fallback to local data
            });
        } else {
            console.log("not fetching data.json, time not expired", new Date - lastUpdated, "< 3600000")
        }

        if (articleString !== undefined) {
            console.log("Using cached data.json")
            let articleJson = JSON.parse(articleString);
            if (articleJson == null) {
                console.log("articleJson is null")
                return
            }
            if (Array.isArray(articleJson)) {
                return articleJson;
            } else if (typeof articleJson.articles !== undefined) {
                return articleJson.articles;
            }
        }
    }

    return data.articles;

}

const CACHE_NAME = "offline-mp3"

export function cacheAsset(url) {
    if (typeof caches == "undefined") {
        console.log("caches is null - unable to save", url);
        return
    }

    caches.open(CACHE_NAME)
        .then((cache) => {
            if (cache !== null) {
                cache.add(url).then((response) => {
                    console.log("cacheAsset", response);
                });
            } else {
                console.log("failed to open cache");
            }
        });
}

export function removeCacheAsset(url) {
    caches.open(CACHE_NAME).then((cache) => {
        cache.delete(url).then((response) => {
            console.log("removeCacheAsset", response);
        });
    });
}

export function listCacheAsset() {
    let output = [];
    caches.open(CACHE_NAME).then((cache) => {
        cache.keys().then((keys) => {
            output = keys.map((request) => request.url);
        });
    });
    return output;
}