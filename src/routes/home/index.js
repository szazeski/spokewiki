import {h} from 'preact';

import style from './style.css';
import SpokeArticle from "../../components/spokeArticle";
import data from "../../data/data.json"
import About from "../../components/about";

const Home = ({onPlaying}) => {

    const listOfArticles = data.articles.map((item) =>
        <SpokeArticle data={item} onPlaying={onPlaying}/>
    );

    function search(event) {
        console.log(event);
        //this.searchFilter = search.value();
    }

    return (
        <div class={style.home}>

            {listOfArticles}

            <About/>

        </div>
    );
}

export default Home;
