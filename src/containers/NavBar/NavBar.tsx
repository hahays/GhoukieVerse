import React from "react";
import {NumResults} from "../NumResults";
import {Search} from "../../features/Search";
import {Logo} from "../Logo";

function NavBar({movies, query, setQuery}) {
    return (
        <nav className="nav-bar">
            <Logo/>
            <Search query={query} setQuery={setQuery}/>
            <NumResults movies={movies}/>
        </nav>
    );
}

export default NavBar;
