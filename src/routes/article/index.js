import style from './style.css';
import SpokeArticle from "../../components/spokeArticle";
import {setTitleAndOpengraph} from "../../components/toolbox";
import {getArticles} from "../../components/storage";

const Article = ({stub, onPlaying}) => {

    const article = getArticles().filter(a => a.stub === stub).shift();

    setTitleAndOpengraph(`${article.title} | spokewiki`, article.shortDescription);

    return (
        <div class={style.article}>
            <div class={style.spacer} />
            <SpokeArticle
                data={article}
                onPlaying={onPlaying}
            />
        </div>
    );
}

export default Article;
