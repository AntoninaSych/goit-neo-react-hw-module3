import React from 'react';
import styles from './SearchBox.module.css';

function SearchBox({ filter, onFilterChange }) {
    return (
        <div className={styles.searchBox}>
            <label htmlFor="search">Find contacts by name: </label>
            <input
                type="text"
                id="search"
                value={filter}
                onChange={onFilterChange}
                className={styles.input}
            />
        </div>
    );
}

export default SearchBox;
