export function getValue(key, defaultValue) {
    if (typeof window !== 'undefined') {
        return localStorage.getItem(key) || defaultValue;
    }
    return defaultValue
}

export function getBool(key) {
    if (typeof window !== 'undefined') {
        let value = localStorage.getItem(key).toLowerCase()
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
    let metaThemeColor = document.querySelector("meta[name=theme-color]");
    metaThemeColor.setAttribute("content", rgb);
    setValue("primary", rgb);
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

export function loadColors() {
    let root = document.documentElement;
    let primaryColor = getValue("primary", DEFAULT_PRIMARY_COLOR);
    root.style.setProperty('--primary', primaryColor);
    let metaThemeColor = document.querySelector("meta[name=theme-color]");
    metaThemeColor.setAttribute("content", primaryColor);
    if (getValue("theme", "light") === "light") {
        setLight();
    } else {
        setDark();
    }
}

const CACHE_NAME = "offline-mp3"

export function cacheAsset(url) {
    caches.open(CACHE_NAME).then((cache) => {
        cache.add(url).then((response) => {
            console.log(response);
        });
    });
}

export function removeCacheAsset(url) {
    caches.open(CACHE_NAME).then((cache) => {
        cache.delete(url).then((response) => {
            console.log(response);
        });
    });
}

export function listCacheAsset() {
    caches.open(CACHE_NAME).then((cache) => {
        cache.keys().then((keys) => {
            console.log(keys)
        });
    });
}