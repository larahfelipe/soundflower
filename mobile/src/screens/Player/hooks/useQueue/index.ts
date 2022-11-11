import { useCallback, useRef, useState } from 'react';

import { DEFAULT_QUEUE } from '@/constants';
import type { Queue } from '@/types';

type ManageQueueActions = 'add' | 'remove' | 'reset' | 'previous' | 'next';

export const useQueue = () => {
  const [isShuffled, setIsShuffled] = useState(false);
  const queue = useRef(DEFAULT_QUEUE as Queue);

  const getQueue = useCallback(() => queue.current, []);

  const getTrackQueued = useCallback(
    (selectedIndex = queue.current.index) => {
      if (selectedIndex === -1) return null;

      return queue.current[!isShuffled ? 'default' : 'shuffled'][selectedIndex];
    },
    [isShuffled]
  );

  const manageQueue = useCallback(
    (action: ManageQueueActions, track?: string) => {
      switch (action) {
        case 'add':
          if (!track) return;

          queue.current.default.push(track);
          if (isShuffled) queue.current.shuffled.push(track);
          break;
        case 'remove':
          if (!track) return;

          queue.current.default = queue.current.default.filter(
            (t) => t !== track
          );
          if (isShuffled)
            queue.current.shuffled = queue.current.shuffled.filter(
              (t) => t !== track
            );
          break;
        case 'reset':
          queue.current = DEFAULT_QUEUE;
          break;
        case 'previous':
          queue.current.index--;
          break;
        case 'next':
          queue.current.index++;
          break;
        default:
          break;
      }
    },
    [isShuffled]
  );

  const toggleShuffle = useCallback(() => {
    setIsShuffled(!isShuffled);
    // if (queue.current.default.length < 2) return;
    // if (isShuffled) {
    //   queue.current.shuffled = [];
    //   setIsShuffled(false);
    //   return;
    // }

    // const originalQueue = [...queue.current.default];

    // const shuffledQueue = originalQueue
    //   .map((track) => ({ track, sort: Math.random() }))
    //   .sort((a, b) => a.sort - b.sort)
    //   .map(({ track }) => track);

    // queue.current.shuffled = shuffledQueue;
    // queue.current.index = 0;
    // setIsShuffled(true);
  }, [isShuffled]);

  return {
    isShuffled,
    getQueue,
    getTrackQueued,
    manageQueue,
    toggleShuffle
  };
};
