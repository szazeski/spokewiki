import {h} from 'preact';
import style from './style.css';
import data from "../../data/data.json";
import SpokeArticle from "../../components/spokeArticle";

const Article = ({stub, onPlaying}) => {

    const article = data.articles.filter(a => a.stub == stub).shift();

    return (
        <div class={style.article}>
            <div class={style.spacer}/>
            <SpokeArticle
                data={article}
                onPlaying={onPlaying}
            />
        </div>
    );
}

export default Article;
