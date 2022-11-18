import {h} from 'preact';
import style from './style.css';

const About = () => (
    <div class={style.About}>
        <h2>about</h2>
        <p>spokewiki tracks current events and pulls the wikipedia article, does minor editing to improve readability
            then uses Amazon Polly to voice the article. We try our best to be fair, non-partisan and open to
            feedback.</p>
        <a href="mailto:feedback@spokewiki.com">feedback@spokewiki.com</a>
    </div>
);

export default About;
