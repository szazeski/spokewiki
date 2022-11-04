import {h} from 'preact';

import style from './style.css';

const SpokeArticle = ({data}) => {

    return (
        <div class={style.spokeArticle}>
            <a href="./article/{data.slug}">
                <p>{data.title}</p>
                <p>{data.shortDescription}</p>
            </a>
        </div>
    );
}

export default SpokeArticle;
