```
soundflower-api

App routes:

GET /api/health
  - returns 200 with OK message if the app is running.

  200:
    {
      "status": "OK"
    }

--

GET /api/v1/track
  - returns the track info for the provided query.

  Required query params:
    - "q" - YouTube URL or search query (see below for alternative usage examples)

  Alternative usage e.g.:
    - "q=title=Magic,artist=Coldplay" - search by track title and artist
    - "q=title=Magic" - search by track title only
    - "q=Coldplay - Magic" - search by track title and artist **
    - "q=Magic - Coldplay" - search by track title and artist **

  ** Note: the dash separator is required for this usage.

  200 (w/ LastFM data found) e.g.:
    {
      "title": "Magic",
      "artist": "Coldplay",
      "albumTitle": "Magic",
      "albumUrl": "https://www.last.fm/music/Coldplay/Magic",
      "artworkUrl": "https://lastfm.freetls.fastly.net/i/u/300x300/f021267cf74c4cf2cc01ecb4ddb66198.png",
      "artworkColors": {
        "Vibrant": "#2c5474",
        "Muted": "#63849c",
        "DarkVibrant": "#062b4c",
        "DarkMuted": "#3c5c6c",
        "LightVibrant": "#9ec0da",
        "LightMuted": "#acc4d4"
      },
      "ytVideoId": "Qtb11P1FWnc"
    }

  200 (w/o LastFM data found) e.g.:
    {
      "title": [YouTube video title],
      "artist": "",
      "albumTitle": "",
      "albumUrl": "",
      "artworkUrl": [YouTube video thumbnail URL],
      "artworkColors": {
        "Vibrant": [YouTube video thumbnail vibrant color],
        "Muted": [YouTube video thumbnail muted color],
        "DarkVibrant": [YouTube video thumbnail dark vibrant color],
        "DarkMuted": [YouTube video thumbnail dark muted color],
        "LightVibrant": [YouTube video thumbnail light vibrant color],
        "LightMuted": [YouTube video thumbnail light muted color]
      },
      "ytVideoId": [YouTube video ID]
    }
```
