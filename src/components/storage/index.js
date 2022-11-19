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
    setInverseColor("rgba(255,255,255,.1)", "rgba(255,255,255,.9)")
}

export function setLight() {
    setInverseColor("rgba(255,255,255,.9)", "rgba(0,0,0,.9)")
}

export function loadColors() {
    let root = document.documentElement;
    root.style.setProperty('--primary', getValue("primary", "grey"));
    root.style.setProperty('--primary-inverse', getValue("primary-inverse", "rgba(255,255,255,.9"));
    root.style.setProperty('--text', getValue("text", "black"));
}