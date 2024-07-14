import style from './style.css';
import {useEffect} from "preact/hooks";
import {useMatomo} from "@datapunt/matomo-tracker-react";

const RequestArticle = () => {

    const {trackPageView} = useMatomo()
    useEffect(() => {
        trackPageView()
    }, [])

    return (
        <div className={style.requestArticle}>

            <p>Coming Soon, the ability to add wikipedia articles to be voiced.</p>

            <form>
                <label>
                    Search Wikipedia:
                    <br/>
                    <input type="text" name="title" disabled/>
                </label>
                <input type="submit" value="Submit" disabled/>
            </form>

        </div>
    );
}

export default RequestArticle;
