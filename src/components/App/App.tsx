import { throttle } from 'lodash';
import cx from 'classnames';
import React from 'react';

import { Feed, Search, Spinner } from '..';
import { Provider } from '../../services';
import PreviousSearches from '../PreviousSearches/PreviousSearches';

import styles from './App.module.css';

interface IAppProps {}

interface IAppState {
  loadingFeed: boolean;
  loadingQuery: boolean;
  data: GIF[];
  previousSearches: string[];
  query?: string;
}

class App extends React.Component<IAppProps, IAppState> {
  state = {
    loadingFeed: false,
    loadingQuery: false,
    data: [] as GIF[],
    previousSearches: ['cats'],
    query: '',
  };

  throttledSubmit: (query: string) => void;
  provider?: Provider;

  constructor(props: IAppProps) {
    super(props);
    this.throttledSubmit = throttle(this.onSubmit, 1500, { leading: false });
  }

  onSubmit = (query: string) => {
    const previousSearches = this.state.previousSearches;
    if (!previousSearches.includes(query)) {
      previousSearches.unshift(query);
    }
    this.setState({
      loadingQuery: true,
      previousSearches,
    });
    this.provider = new Provider(query);
    this.provider.next().then(({ data }) =>
      this.setState({
        loadingQuery: false,
        data,
      }),
    );
  };

  applyQuery = (query: string) => {
    console.log(query);
    this.onSubmit(query);
    this.setState({
      query,
    });
  };

  onFeedEnd = () => {
    if (!this.state.loadingQuery && this.provider) {
      this.setState({
        loadingFeed: true,
      });
      this.provider.next().then(({ data }) =>
        this.setState({
          loadingFeed: false,
          data: [...this.state.data, ...data],
        }),
      );
    }
  };

  render() {
    const { data, loadingFeed, loadingQuery } = this.state;
    return (
      <div className={styles.app}>
        <div className={styles.previousSearches}>
          <PreviousSearches
            onQuerySelected={this.applyQuery}
            queries={this.state.previousSearches}
          />
        </div>
        <div
          className={cx(styles.container, {
            [styles.empty]: data.length === 0,
            [styles.loading]: loadingQuery,
          })}
        >
          <div className={styles.search}>
            <Search query={this.state.query} onChange={this.throttledSubmit} />
            {loadingQuery && (
              <div className={styles.spinner}>
                <Spinner />
              </div>
            )}
          </div>
          <div className={styles.feed}>
            <Feed
              data={data}
              onFeedEnd={this.onFeedEnd}
              loading={loadingFeed}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
