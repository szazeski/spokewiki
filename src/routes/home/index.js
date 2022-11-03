import { h } from 'preact';
import spokeArticle from '../../components/spokeArticle';

import style from './style.css';

const Home = () => (
	<div class={style.home}>

		<spokeArticle id="1" />

		<spokeArticle id="2" />

	</div>
);

export default Home;
