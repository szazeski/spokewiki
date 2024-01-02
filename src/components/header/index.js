import {h} from 'preact';
import {Link} from 'preact-router/match';
import style from './style.css';
import Searchbox from "../searchbox";
import {filterArticlesByTag} from "../toolbox";

const Header = () => (
    <header class={style.header}>
        <a href="/">
            <img class={style.logo} src="/assets/logoline.svg" alt="spokewiki - hear more than headlines"
                 onClick={() => filterArticlesByTag("All")}/>
        </a>
        <div className={style.stack}>
            <Searchbox/>
            <nav>
                <Link activeClassName={style.active} href="/">New</Link>
                <Link activeClassName={style.active} href="/all">All</Link>
                <Link activeClassName={style.active} href="/queue">Queue</Link>
                <Link activeClassName={style.active} href="/podcast">Podcast</Link>
                <Link activeClassName={style.active} href="/settings">Settings</Link>
            </nav>
        </div>
    </header>
);

export default Header;
