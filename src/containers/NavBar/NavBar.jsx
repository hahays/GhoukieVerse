import { Search } from "@/features/Search";
import React from "react";
import { Logo } from "../Logo";
import { NumResults } from "../NumResults";

function NavBar({ movies, query, setQuery }) {
  return (
    <nav className="nav-bar">
      <Logo />
      <Search query={query} setQuery={setQuery} />
      <NumResults />
    </nav>
  );
}

export default NavBar;
