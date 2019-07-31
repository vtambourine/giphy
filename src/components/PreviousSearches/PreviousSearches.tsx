import React from 'react';

import styles from './PreviousSearches.module.css';

interface IPreviousSearchesProps {
  queries: string[];
  onQuerySelected: (query: string) => void;
}

const PreviousSearches: React.FC<IPreviousSearchesProps> = props => {
  return (
    <div className={styles.container}>
      {props.queries.map((query, key) => (
        <div
          className={styles.query}
          key={key}
          onClick={props.onQuerySelected.bind(null, query)}
        >
          {query}
        </div>
      ))}
    </div>
  );
};

export default PreviousSearches;
