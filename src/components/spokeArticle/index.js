import {h} from 'preact';

import style from './style.css';

const SpokeArticle = ({data}) => {

    return (
        <div class={style.spokeArticle}>
            <a href="./article/{data.slug}">
                <div>
                    <h2>{data.title}</h2>
                    <p>{data.shortDescription}</p>
                </div>

                <div class={style.box}>
                    <div>3 min</div>
                    <div>play now</div>
                    <div>queue</div>
                </div>
            </a>
        </div>
    );
}

export default SpokeArticle;
