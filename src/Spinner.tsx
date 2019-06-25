import React from 'react';

import styles from './Spinner.module.css';

const Spinner: React.FC = () => (
  <div className={styles.spinner}>
    <div></div>
    <div></div>
    <div></div>
  </div>
);

export default Spinner;
