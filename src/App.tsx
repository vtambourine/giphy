import { throttle } from 'lodash';
import cx from 'classnames';
import React from 'react';

import Feed from './Feed';
import Provider from './provider';
import Search from './Search';
import Spinner from './Spinner';

import styles from './App.module.css';

interface IAppProps {}

interface IAppState {
  isLoading: boolean;
  data: GIF[];
}

class App extends React.Component<IAppProps, IAppState> {
  state = {
    isLoading: true,
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
      isLoading: true,
    });
    this.provider = new Provider(query);
    this.provider.next().then(({ data }) =>
      this.setState({
        isLoading: false,
        data,
      }),
    );
  };

  onFeedEnd = () => {
    if (!this.state.isLoading && this.provider) {
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
    const { data, isLoading } = this.state;
    return (
      <div className={styles.app}>
        <div
          className={cx(styles.container, {
            [styles.empty]: data.length === 0,
            [styles.loading]: isLoading,
          })}
        >
          <div className={styles.search}>
            <Search onChange={this.throttledSubmit} />
            {isLoading && (
              <div className={styles.spinner}>
                <Spinner />
              </div>
            )}
          </div>
          <div className={styles.feed}>
            <Feed data={data} onFeedEnd={this.onFeedEnd} loading={isLoading} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
