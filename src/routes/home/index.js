import style from './style.css';
import SpokeArticle from "../../components/spokeArticle";
import data from "../../data/data.json"
import About from "../../components/about";
import {useEffect} from "preact/hooks";
import {useMatomo} from "@datapunt/matomo-tracker-react";
import SpokeTag from "../../components/spokeTag";

const Home = ({onPlaying, onQueue, showOnlyNew}) => {

    const listOfArticles = data.articles.map((item) =>
        <SpokeArticle
            data={item}
            onPlaying={onPlaying}
            onQueue={onQueue}
            showNewOnly={showOnlyNew}
        />
    );

    function getUniqueTags() {
        const allTags = data.articles.flatMap((item) => {
            return item.tags.map(i => i);
        });
        const uniqueTags = allTags.filter((value, index, self) => {
            return self.indexOf(value) == index;
        })
        uniqueTags.sort();
        return uniqueTags.map(i => <SpokeTag tag={i}/>)
    }


    const {trackPageView} = useMatomo()
    useEffect(() => {
        trackPageView()
    }, [])

    return (
        <div class={style.home}>

            <div class={style.leftSidebar}>
                <ul>
                    <SpokeTag tag="All"/>
                    {getUniqueTags()}
                </ul>
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
