import { throttle } from 'lodash';
import cx from 'classnames';
import React, { useRef, useState } from 'react';

import Feed from './Feed';
import Provider from './provider';
import Search from './Search';

import styles from './App.module.css';

interface IAppProps {}

interface IAppState {
  isLoading: boolean;
  data: GIF[];
}

class App extends React.Component<IAppProps, IAppState> {
  state = {
    isLoading: false,
    data: [] as GIF[],
  };

  throttledSubmit: (query: string) => void;
  provider: Provider;

  constructor(props: IAppProps) {
    super(props);
    this.provider = new Provider('', {
      limit: 20,
    });
    this.throttledSubmit = throttle(this.onSubmit, 1500, { leading: false });
  }

  onSubmit = (query: string) => {
    this.setState({
      isLoading: true,
    });
    this.provider = new Provider(query, {
      limit: 20,
    });
    this.provider.next().then(({ data }) =>
      this.setState({
        isLoading: false,
        data,
      }),
    );
  };

  onFeedEnd = () => {
    if (!this.state.isLoading) {
      this.setState({
        isLoading: true,
      });

      this.provider.next().then(({ data }) =>
        this.setState({
          isLoading: false,
          data: [...this.state.data, ...data],
        }),
      );
    }
  };

  render() {
    const { data } = this.state;
    return (
      <div className={styles.app}>
        <div
          className={cx(styles.container, {
            [styles.empty]: data.length === 0,
          })}
        >
          <div className={styles.search}>
            <Search onChange={this.throttledSubmit} />
          </div>
          <div className={styles.feed}>
            <Feed data={data} onFeedEnd={this.onFeedEnd} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
