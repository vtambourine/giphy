import React, { useState, useRef } from 'react';
import Search from './Search';
import Feed from './Feed';
import { throttle } from 'lodash';

import styles from './App.module.css';

function useProvier(initialState: GIF[]): [GIF[], (q: string) => void] {
  const [state, setState] = useState<GIF[]>(initialState);
  function submit(query: string) {
    const data = require('./fixture/data').data as GIF[];
    setState(data);
  }

  return [state, submit];
}

const App: React.FC = () => {
  const [data, submit] = useProvier([] as GIF[]);
  const throttledSubmit = useRef(throttle(submit, 1000, { leading: false }))
    .current;

  return (
    <div className={styles.app}>
      <div className={styles.container}>
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
