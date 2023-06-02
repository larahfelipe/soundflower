```
Soundflower API Documentation

* P.S: If you want to use Redis, you'll also need to install and run it locally. Also, make sure to set the REDIS_ENABLED environment variable to `true`.

Track:
  GET /api/health
    - returns 200 with OK message if the app is running.

    200:

      {
        "status": "OK"
      }


  GET /api/v1/track
    - returns the track info for the provided query.

    Required query params:
      - "q" - YouTube URL or search query (see below for alternative usage examples)

    Alternative usage e.g.:
      - "q=title=Magic,artist=Coldplay" - search by track title and artist
      - "q=title=Magic" - search by track title only
      - "q=Magic - Coldplay" - search by track title and artist **
      - "q=Coldplay - Magic" - search by track artist and title **

    ** P.S: the dash separator is required for this usage.

    200 (w/ LastFM data found) e.g.:

      {
        "id": "Qtb11P1FWnc",
        "title": "Magic",
        "artist": "Coldplay",
        "album": {
          title: "Magic",
        },
        "artwork": {
          "url": "https://lastfm.freetls.fastly.net/i/u/300x300/f021267cf74c4cf2cc01ecb4ddb66198.png",
          "colors": {
            "Vibrant": "#2c5474",
            "Muted": "#63849c",
            "DarkVibrant": "#062b4c",
            "DarkMuted": "#3c5c6c",
          }
        }
      }

    200 (w/o LastFM data found) e.g.:

      {
        "id": "Qtb11P1FWnc",
        "title": [YouTube video title],
        "artist": "",
        "album": {
          title: "",
        },
        "artwork": {
          "url": [YouTube video thumbnail URL],
          "colors": {
            "Vibrant": [YouTube video thumbnail vibrant color],
            "Muted": [YouTube video thumbnail muted color],
            "DarkVibrant": [YouTube video thumbnail dark vibrant color],
            "DarkMuted": [YouTube video thumbnail dark muted color],
          }
        }
      }
```
