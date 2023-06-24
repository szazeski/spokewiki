import style from './style.css';
import {useEffect} from "preact/hooks";
import {useMatomo} from "@datapunt/matomo-tracker-react";

const Podcast = () => {

    const {trackPageView} = useMatomo()
    useEffect(() => {
        trackPageView()
    }, [])

    return (
        <div className={style.podcast}>

            <div className={style.spacer}/>

            <p>Want to access this in your favorite podcast app instead?</p>

            <p><a href="https://www.spokewiki.com/rss.xml">https://www.spokewiki.com/rss.xml</a></p>

        </div>
    );
}

export default Podcast;
