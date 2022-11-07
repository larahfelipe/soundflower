type TrackMetadata = {
  artist: string;
  title: string;
};

export const parseTrackMetadata = (query: string) => {
  let trackMetadata: TrackMetadata = {
    artist: '',
    title: ''
  };

  if (!query.includes('artist') && !query.includes('title'))
    return trackMetadata;

  if (!query.includes('artist') && query.includes('title')) {
    const title = query.split('title=')[1];
    trackMetadata.title = title;
  } else if (query.includes('artist') && query.includes('title')) {
    const splittedQuery = query.split(',');

    trackMetadata = splittedQuery.reduce((acc, curr) => {
      if (curr.includes('artist')) {
        const artist = curr.split('artist=')[1];
        acc.artist = artist;
      } else if (curr.includes('title')) {
        const title = curr.split('title=')[1];
        acc.title = title;
      }

      return acc;
    }, trackMetadata);
  }

  return trackMetadata;
};
