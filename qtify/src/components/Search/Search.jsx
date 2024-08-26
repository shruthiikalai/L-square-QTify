import React from "react";
import styles from "./Search.module.css";
import { ReactComponent as SearchIcon } from "../../assets/search-icon.svg";

const Search = ({search}) => {

    return (
        <form className={styles.wrapper}>
            <input
                className={styles.search}
                placeholder={search}
            />
            <button className={styles.searchButton} type="submit"><SearchIcon /></button>
        </form>
    );
}

export default Search;
