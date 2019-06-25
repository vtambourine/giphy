import React, { useState } from 'react';
import styles from './Search.module.css';

interface ISearchProps {
  // onChange?: React.ChangeEventHandler<HTMLInputElement>;
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
          if (event.keyCode === 13) {
            props.onChange(query);
          }
        }}
      />
    </div>
  );
};

export default Search;
