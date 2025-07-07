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
            <input name="search" onChange={search} placeholder="search" />
            <button className={style.clear} onClick={clear}>✖</button>
        </div>
    )

}
export default Searchbox