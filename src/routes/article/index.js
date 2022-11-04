import {h} from 'preact';
import style from './style.css';
import SpokeArticle from "../../components/spokeArticle";

const Article = ({stub}) => {


    return (
        <div class={style.article}>

            <h1>{stub}</h1>
            <p>short-description</p>
            <SpokeArticle id="3"/>

        </div>
    );
}

export default Article;
