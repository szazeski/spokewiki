import style from "./style.css";
import {h} from 'preact';
import {filterArticlesByTag} from "../toolbox";

const SpokeTag = ({tag}) => {
    return (
        <li class={style.SpokeTag} onClick={() => filterArticlesByTag(tag)}>{tag}</li>
    )
}

export default SpokeTag;