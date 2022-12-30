import style from './style.css';
import SpokeArticle from "../../components/spokeArticle";
import data from "../../data/data.json"
import About from "../../components/about";
import {useEffect} from "preact/hooks";
import {useMatomo} from "@datapunt/matomo-tracker-react";

const Home = ({onPlaying, onQueue, showOnlyNew}) => {

    const listOfArticles = data.articles.map((item) =>
        <SpokeArticle
            data={item}
            onPlaying={onPlaying}
            onQueue={onQueue}
            showNewOnly={showOnlyNew}
        />
    );

    const listOfCategories = data.articles.map((item) => {
        return item.tags.join(" ");
    });
    const {trackPageView} = useMatomo()

    useEffect(() => {
        trackPageView()
    }, [])

    return (
        <div class={style.home}>

            <div class={style.leftSidebar}>
                <div>Tags</div>
            </div>

            <div>
                <div className={style.spacer}></div>
                {listOfArticles}
                <About/>
            </div>

        </div>
    );
}

export default Home;
