import {h} from 'preact';

import style from './style.css';
import SpokeArticle from "../../components/spokeArticle";
import data from "../../data/data.json"

const Home = () => {

    let searchFilter = "";

    const listOfArticles = data.articles.map((item) =>
        <SpokeArticle data={item}/>
    );

    function search(event) {
        console.log(event);
        //searchFilter = input;
    }

    return (
        <div class={style.home}>

            <div class={style.searchbox}>
                <label> search for articles about
                    <input name="search" onChange={search}/>
                </label>
            </div>

            {listOfArticles}

        </div>
    );
}

export default Home;
