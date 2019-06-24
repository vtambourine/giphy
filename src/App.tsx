import React from 'react';
import Search from './Search';
import Feed from './Feed';
import { throttle } from 'lodash';

import styles from './App.module.css';

const req = require('./fixture/data').data as GIF[];

const data = [{}, {}, {}, {}, {}] as GIF[];

const submit = throttle((query: string) => console.log(query), 1000, {
  leading: false,
});

const App: React.FC = () => {
  return (
    <div className={styles.app}>
      <div className={styles.container}>
        <div className={styles.search}>
          <Search onChange={submit} />
        </div>
        <div className={styles.feed}>
          <Feed data={req} />
        </div>
      </div>
    </div>
  );
};

export default App;
