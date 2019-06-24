import React from 'react';
import styles from './Feed.module.css';

interface IFeedProps {
  data: GIF[];
}

const Feed: React.FC<IFeedProps> = props => {
  return (
    <div className={styles.feed}>
      {props.data.map((gif, key) => (
        <div className={styles.image} key={key}>
          <img
            src={gif.images.fixed_width_still.url}
            alt={gif.title}
            height={gif.images.fixed_width_still.height}
            width={gif.images.fixed_width_still.width}
          />
        </div>
      ))}
      {props.data.map((gif, key) => (
        <div className={styles.image} key={key}>
          <img
            src={gif.images.fixed_width_still.url}
            alt={gif.title}
            height={gif.images.fixed_width_still.height}
            width={gif.images.fixed_width_still.width}
          />
        </div>
      ))}
    </div>
  );
};

export default Feed;
