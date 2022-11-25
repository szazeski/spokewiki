export function getValue(key, defaultValue) {
    if (typeof window !== 'undefined') {
        return localStorage.getItem(key) || defaultValue;
    }
    return defaultValue
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

export function loadColors() {
    let root = document.documentElement;
    let primaryColor = getValue("primary", "rgb(87, 18, 157)"); // default: Purple
    root.style.setProperty('--primary', primaryColor);
    let metaThemeColor = document.querySelector("meta[name=theme-color]");
    metaThemeColor.setAttribute("content", primaryColor);
    if (getValue("theme", "light") == "light") {
        setLight();
    } else {
        setDark();
    }
}