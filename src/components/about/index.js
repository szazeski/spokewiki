import {h} from 'preact';
import style from './style.css';

const About = () => (
    <div class={style.About}>
        <h2>about</h2>
        <p>spokewiki tracks current events and pulls the wikipedia article, does minor editing to improve readability
            then uses Amazon Polly to voice the article. We try our best to be fair, accurate and open to
            feedback.</p>

        <p><a href="https://feedback.spokewiki.com">feedback.spokewiki.com</a></p>

        <p><strong>Did you know spokewiki is open source?</strong> You can start your own site by
            cloning the code and adding your own audio files.</p>

        <p><a href="https://github.com/szazeski/spokewiki">github - spokewiki</a></p>
    </div>
);

export default About;
