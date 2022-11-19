import {h} from 'preact';

import style from './style.css';
import SpokeArticle from "../../components/spokeArticle";
import data from "../../data/data.json"
import About from "../../components/about";
import {loadColors} from "../../components/storage";

const Home = ({onPlaying, onQueue, showOnlyNew}) => {

    const listOfArticles = data.articles.map((item) =>
        <SpokeArticle
            data={item}
            onPlaying={onPlaying}
            onQueue={onQueue}
            showNewOnly={showOnlyNew}
        />
    );
    
    return (
        <div class={style.home}>

            {listOfArticles}

            <About/>

        </div>
    );
}

export default Home;
