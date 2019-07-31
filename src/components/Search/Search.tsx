import React, { useState } from 'react';

import styles from './Search.module.css';
import { render } from 'enzyme';
import { throwStatement } from '@babel/types';

const ENTER = 13;

interface ISearchProps {
  query?: string;
  onChange: (query: string) => void;
}

interface ISearchState {
  query?: string;
}

class Search extends React.Component<ISearchProps, ISearchState> {
  constructor(props: ISearchProps) {
    super(props);
    this.state = {
      query: '',
    };
  }

  componentDidUpdate(prevProps: ISearchProps) {
    if (this.props.query !== prevProps.query) {
      this.setState({
        query: this.props.query,
      });
    }
  }

  setQuery = (query: string) => {
    this.setState({
      query,
    });
  };

  render() {
    const { query } = this.state;
    return (
      <div className={styles.search}>
        <input
          className={styles.input}
          type="text"
          autoFocus
          value={query}
          placeholder="Search GIPHY..."
          onChange={event => {
            console.log('===');
            this.setQuery(event.target.value);
            this.props.onChange(event.target.value);
          }}
          onKeyDown={event => {
            if (event.keyCode === ENTER) {
              this.props.onChange(query || '');
            }
          }}
        />
      </div>
    );
  }
}

export default Search;
