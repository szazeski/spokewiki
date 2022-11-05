import {h} from 'preact';
import style from './style.css';

const Article = ({stub}) => {


    return (
        <div class={style.article}>

            <h1>{stub}</h1>
            <p>short-description pending...</p>

        </div>
    );
}

export default Article;
