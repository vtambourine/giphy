import { throttle } from 'lodash';
import cx from 'classnames';
import React from 'react';

import { Feed, Search, Spinner } from '..';
import { Provider } from '../../services';

import styles from './App.module.css';

interface IAppProps {}

interface IAppState {
  loadingFeed: boolean;
  loadingQuery: boolean;
  data: GIF[];
}

class App extends React.Component<IAppProps, IAppState> {
  state = {
    loadingFeed: false,
    loadingQuery: false,
    data: [] as GIF[],
  };

  throttledSubmit: (query: string) => void;
  provider?: Provider;

  constructor(props: IAppProps) {
    super(props);
    this.throttledSubmit = throttle(this.onSubmit, 1500, { leading: false });
  }

  onSubmit = (query: string) => {
    this.setState({
      loadingQuery: true,
    });
    this.provider = new Provider(query);
    this.provider.next().then(({ data }) =>
      this.setState({
        loadingQuery: false,
        data,
      }),
    );
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
        <div
          className={cx(styles.container, {
            [styles.empty]: data.length === 0,
            [styles.loading]: loadingQuery,
          })}
        >
          <div className={styles.search}>
            <Search onChange={this.throttledSubmit} />
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
