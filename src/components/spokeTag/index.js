import style from "./style.css";

const SpokeTag = ({tag}) => {

    function clicked(tag) {
        let cssTag = tag.replaceAll(" ", "-");

        // Or we set a state var to not render the entries

        let allArticles = document.getElementsByClassName("SpokeArticle");
        for (let article of allArticles) {
            article.style.display = 'none';
        }

        if (tag == "All") {
            cssTag = "SpokeArticle";
        }
        let articlesWithTag = document.getElementsByClassName(cssTag);
        for (let article of articlesWithTag) {
            article.style.display = 'block';
        }
    }

    return (
        <li class={style.SpokeTag} onClick={() => clicked(tag)}>{tag}</li>
    )
}


export default SpokeTag;