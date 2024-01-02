export function setTitleAndOpengraph(title, description) {
    if (typeof window !== "undefined") {
        document.title = title;

        let ogTitle = document.querySelector("meta[property='og:title']");
        ogTitle.setAttribute("content", title);

        let metaDescription = document.querySelector("meta[name='description']");
        metaDescription.setAttribute("content", description);

        let ogDescription = document.querySelector("meta[property='og:description']");
        ogDescription.setAttribute("content", description);

        // update og:url
        let ogUrl = document.querySelector("meta[property='og:url']");
        ogUrl.setAttribute("content", window.location.href);

        // update canonical url
        let canonical = document.querySelector("link[rel='canonical']");
        canonical.setAttribute("href", window.location.href);
    }
}

export function filterArticlesByTag(tag) {
    console.log(`filterArticlesByTag:${tag}`);
    let cssTag = tag.replaceAll(" ", "-");

    let allArticles = document.getElementsByClassName("SpokeArticle");
    for (let article of allArticles) {
        article.style.display = 'none';
    }

    let searchboxText = `category:${tag}`;
    if (tag === "All") {
        cssTag = "SpokeArticle";
        searchboxText = "";
    }
    let articlesWithTag = document.getElementsByClassName(cssTag);
    for (let article of articlesWithTag) {
        article.style.display = 'block';
    }

    let searchbox = document.getElementsByName("search")[0];
    searchbox.value = searchboxText;
}

export function filterArticlesByText(value) {
    let search = value.replace(/(category:[a-zA-Z]+)/, "").trim();
    console.log(`filterArticlesByText:${search}`);

    let allArticles = document.getElementsByClassName("SpokeArticle");
    for (let article of allArticles) {
        if (article.innerText.toLowerCase().includes(search.toLowerCase())) {
            article.style.display = 'block';
            continue;
        }
        article.style.display = 'none';
    }
}