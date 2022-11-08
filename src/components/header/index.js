import {h} from 'preact';
import {Link} from 'preact-router/match';
import style from './style.css';

const Header = () => (
    <header class={style.header}>
        <a href="/">
            <img class={style.logo} src="/assets/logoline.svg" alt="spokewiki - hear more than headlines"/>
        </a>
        <nav>
            <Link activeClassName={style.active} href="/">Home</Link>
            <Link activeClassName={style.active} href="/new">New</Link>
            <Link activeClassName={style.active} href="/queue">Queue</Link>
            <Link activeClassName={style.active} href="/settings">Settings</Link>
        </nav>
    </header>
);

export default Header;
