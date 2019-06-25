import React, { useState, useRef } from 'react';
import { throttle } from 'lodash';
import Search from './Search';
import Feed from './Feed';
import Provider from './provider';
import cx from 'classnames';

import styles from './App.module.css';

function useProvier(initialState: GIF[]): [GIF[], (q: string) => void] {
  const [state, setState] = useState<GIF[]>(initialState);
  function submit(query: string) {
    const provider = new Provider(query);
    provider.next().then(response => setState(response.data));
  }

  return [state, submit];
}

const App: React.FC = () => {
  const [data, submit] = useProvier([] as GIF[]);
  const throttledSubmit = useRef(throttle(submit, 1500, { leading: false }))
    .current;

  return (
    <div className={styles.app}>
      <div
        className={cx(styles.container, {
          [styles.empty]: data.length === 0,
        })}
      >
        <div className={styles.search}>
          <Search onChange={q => throttledSubmit(q)} />
        </div>
        <div className={styles.feed}>
          <Feed data={data} />
        </div>
      </div>
    </div>
  );
};

export default App;
