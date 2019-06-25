import React, { useState } from 'react';

import styles from './Search.module.css';

const ENTER = 13;

interface ISearchProps {
  onChange: (query: string) => void;
}

const Search: React.FC<ISearchProps> = props => {
  const [query, setQuery] = useState('');

  return (
    <div className={styles.search}>
      <input
        className={styles.input}
        type="text"
        autoFocus
        value={query}
        placeholder="Search GIPHY..."
        onChange={event => {
          setQuery(event.target.value);
          props.onChange(event.target.value);
        }}
        onKeyDown={event => {
          if (event.keyCode === ENTER) {
            props.onChange(query);
          }
        }}
      />
    </div>
  );
};

export default Search;
