import { throttle } from 'lodash';
import React, { useEffect, useRef } from 'react';

import styles from './Feed.module.css';

const THROTTLE_TIMEOUT = 150;
const OVERLAP_GAP = 320;

interface IFeedProps {
  data: GIF[];
  onFeedEnd: () => void;
}

const Feed: React.FC<IFeedProps> = props => {
  const scrollElement = useRef<HTMLDivElement>(null);

  const fistGIF = props.data[0];
  useEffect(() => {
    if (scrollElement && scrollElement.current) {
      scrollElement.current.scrollTo({ top: 0 });
    }
  }, [fistGIF]);

  useEffect(() => {
    function handleScroll() {
      if (scrollElement && scrollElement.current) {
        const { clientHeight, scrollTop, scrollHeight } = scrollElement.current;
        if (scrollHeight - (scrollTop + clientHeight) < OVERLAP_GAP) {
          props.onFeedEnd();
        }
      }
    }

    const throttledHandleScroll = throttle(handleScroll, THROTTLE_TIMEOUT);

    const currentScrollElement = scrollElement.current;
    if (scrollElement && scrollElement.current) {
      scrollElement.current.addEventListener('scroll', throttledHandleScroll);
    }

    return () => {
      if (currentScrollElement) {
        currentScrollElement.removeEventListener(
          'scroll',
          throttledHandleScroll,
        );
      }
    };
  });

  return (
    <div className={styles.feed} ref={scrollElement}>
      {props.data.map((gif, key) => {
        return (
          <div className={styles.imageBox} key={key}>
            <img
              className={styles.image}
              src={gif.images.fixed_width_still.url}
              alt={gif.title}
              width={gif.images.fixed_width_still.width}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Feed;
