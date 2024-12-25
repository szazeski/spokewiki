import data from '../../data/data.json';
import {route} from "preact-router";

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
        localStorage.removeItem("articles-etag");
        localStorage.removeItem("articles-future-etag");
        console.log("refreshCache done");
        route("/all", true);
    }
}

export function getArticles() {
    if (typeof window === "undefined") {
        return data.articles
    }

    let articleString = localStorage.getItem("articles");
    let lastUpdated = new Date(localStorage.getItem("lastUpdated"));

    let shouldFetch = false;
    if (articleString === null) {
        console.log("articleString is null -- fetching")
        shouldFetch = true;
    } else if (lastUpdated === null) {
        console.log("lastUpdated is null -- fetching")
        shouldFetch = true;
    } else if (new Date - lastUpdated > DURATION_1_HOUR) {
        console.log("lastUpdated is older than 1h -- fetching")
        shouldFetch = true;
    }

    if (shouldFetch) {
        console.log("downloading data.json")
        let now = Date.now();
        fetch(`https://api.spokewiki.com/data.json#${now}`).then((response) => {
            if (!response.ok) {
                throw new Error("Failed to fetch data.json");
            }
            return response.json();

        }).then((data) => {
            let shouldReload = false;
            if (articleString === null) {
                console.log("cold start, should reload app")
                shouldReload = true
            }
            if (data !== undefined) {
                localStorage.setItem("lastUpdated", new Date()); // update whenever we check
                articleString = JSON.stringify(data);
                localStorage.setItem("articles", articleString);
            } else {
                console.log("data.json response is undefined")
            }
            if (shouldReload) {
                window.location.reload();
            }

        }).catch((error) => {
            console.error("Failed to fetch updated data", error);
            if (articleString !== null) {
                return JSON.parse(articleString);
            }
            return data.articles; // fallback to local data
        });
    }

    if (articleString !== null) {
        let articleJson = JSON.parse(articleString);
        if (articleJson === null) {
            console.log("unable to parse JSON from localstorage string - using builtin data")
            return data.articles
        }
        if (Array.isArray(articleJson)) {
            return articleJson;
        } else if (typeof articleJson.articles !== undefined) {
            return articleJson.articles;
        }
    }
    console.log("fallthrough to builtin data.articles")
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