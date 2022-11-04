import {h} from 'preact';

import style from './style.css';
import SpokeArticle from "../../components/spokeArticle";
import data from "../../data/data.json"

const Home = () => {

    let searchFilter = "";

    const listOfArticles = data.articles.map((item) =>
        <SpokeArticle data={item}/>
    );

    function search(input) {
        searchFilter = input;
    }

    return (
        <div class={style.home}>

            <div class={style.searchbox}>
                <label>search
                    <input name="search" onChange={search(this)}/>
                </label>
            </div>

            {listOfArticles}

        </div>
    );
}

export default Home;
