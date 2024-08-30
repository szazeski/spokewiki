import style from './style.css';
import SpokeArticle from "../../components/spokeArticle";
import {useEffect} from "preact/hooks";
import {useMatomo} from "@datapunt/matomo-tracker-react";
import SpokeTag from "../../components/spokeTag";
import {setTitleAndOpengraph} from "../../components/toolbox";
import {getArticles} from "../../components/storage";

const Home = ({onPlaying, onQueue, showOnlyNew}) => {

    setTitleAndOpengraph(`spokewiki`, 'Listen for free to wikipedia articles about the topics in the news to better understand what is going on.');

    const listOfArticles = getArticles().map((item) =>
        <SpokeArticle
            data={item}
            onPlaying={onPlaying}
            onQueue={onQueue}
            showNewOnly={showOnlyNew}
        />
    );

    function getUniqueTags() {
        const allTags = getArticles().flatMap((item) => {
            return item.tags.map(i => i);
        });
        const uniqueTags = allTags.filter((value, index, self) => {
            return self.indexOf(value) == index;
        })
        uniqueTags.sort();
        return uniqueTags.map(i => <SpokeTag tag={i} />)
    }


    const {trackPageView} = useMatomo()
    useEffect(() => {
        trackPageView()
    }, [])

    return (
        <div class={style.home}>

            <div class={style.leftSidebar}>
                <ul>
                    <SpokeTag tag="All" />
                    {getUniqueTags()}
                </ul>
            </div>

            <div class={style.articles}>
                <div className={style.spacer} />
                {listOfArticles}
            </div>

        </div>
    );
}

export default Home;
