import {h} from 'preact';
import style from './style.css';
import data from "../../data/data.json";
import ReactGA from "react-ga";
import SpokeArticle from "../../components/spokeArticle";

const Article = ({stub, onPlaying}) => {

    console.log("Article", stub);
    const article = data.articles.filter(a => a.stub == stub).shift();

    return (
        <div class={style.article}>
            <SpokeArticle data={article} onPlaying={onPlaying}/>
        </div>
    );
}

export default Article;
