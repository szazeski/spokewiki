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

const DURATION_12_HOURS = 43200000;

export function getArticles() {
    if (typeof window !== "undefined") {
        let shouldFetch = false;
        let articleString = localStorage.getItem("articles");
        let lastUpdated = localStorage.getItem("lastUpdated");

        if (articleString === null) {
            shouldFetch = true;
        } else if (lastUpdated === null) {
            shouldFetch = true;
        } else if (new Date - lastUpdated > DURATION_12_HOURS) {
            shouldFetch = true;
        } else if (articleString === "undefined") {
            shouldFetch = true;
            localStorage.removeItem("articles");
            localStorage.removeItem("lastUpdated");
        }

        if (shouldFetch) {
            console.log("fetching data.json")

            // attempt to fetch the latest data
            fetch("https://api.spokewiki.com/data.json").then((response) => {
                // validate response
                if (!response.ok) {
                    throw new Error("Failed to fetch data.json");
                }
                return response.json();

            }).then((data) => {

                if (data !== undefined) {
                    articleString = JSON.stringify(data);
                    localStorage.setItem("articles", articleString);
                    localStorage.setItem("lastUpdated", new Date());
                }

            }).catch((error) => {
                console.error("Failed to fetch updated data", error);
                if (articleString !== null) {
                    return JSON.parse(articleString);
                }
                return data.articles; // fallback to local data
            });
        }

        if (articleString !== undefined) {
            console.log("Using cached data.json")
            let articleJson = JSON.parse(articleString);
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
    caches.open(CACHE_NAME).then((cache) => {
        cache.add(url).then((response) => {
            console.log("cacheAsset", response);
        });
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