```
soundflower-api

App routes:

GET /api/health
  - returns 200 with OK message if the app is running

GET /api/v1/track
  - returns the track info for the provided query

  Required query params:
  - q - YouTube URL or search query (see below)
  Optional query parameters:
  - q=title=Magic,artist=Coldplay - e.g. search for a track by title and artist
  - q=title=Magic - e.g. search for a track by track title
```
