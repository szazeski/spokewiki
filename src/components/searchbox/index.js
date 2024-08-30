import style from './style.css';
import {h} from 'preact';
import {filterArticlesByTag, filterArticlesByText} from "../toolbox";


const Searchbox = () => {

    function search(event) {
        filterArticlesByText(event.target.value)
    }

    function clear() {
        filterArticlesByTag("All")
    }

    return (
        <div className={style.searchbox}>
            <button className={style.clear} onClick={clear}>X</button>
            <input name="search" onChange={search} placeholder="search" />
        </div>
    )

}
export default Searchbox