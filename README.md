# Weather-js

Module inspired by the archived
[weather-js](https://github.com/devfacet/weather) module to obtain weather
information.

### What changes ?

- Typescript
- Promises only
- Speed parsing ()
- No archived deps :')
- No ratelimits

## Installation

```bash
npm install https://github.com/DraftBot/weather-js
```

## Usage

```javascript
const { findWeather } = require('weather-js');

// Options:
// lang: Language code (default to: fr-FR)
// degreeType: F or C (default to: C)

const weather = await findWeather('Montpellier', { degreeType: 'C' });
console.log(JSON.stringify(weather, null, 2));
```

```typescript
import { findWeather }, WeatherOptions from 'weather-js';

const weather: WeatherData[] = await findWeather('Montpellier', {
  degreeType: 'C',
  lang: 'fr-FR'
});
console.log(JSON.stringify(weather, null, 2));
```

```json
[
  {
    "location": {
      "name": "Montpellier, Hérault",
      "lat": "43,608",
      "long": "3,88",
      "timezone": "2",
      "alert": null,
      "provider": "Foreca"
    },
    "current": {
      "temperature": "21",
      "sky": "Ensoleillé",
      "date": "2022-04-19",
      "time": "16:30:00",
      "day": "mardi",
      "feelsLike": "21",
      "humidity": "40",
      "windDisplay": "24 km/h Sud-ouest",
      "windSpeed": "24 km/h",
      "iconUrl": "http://blob.weather.microsoft.com/static/weather4/fr/law/32.gif"
    },
    "forecast": [
      {
        "low": "11",
        "high": "22",
        "sky": "Globalement nuageux",
        "date": "2022-04-18",
        "day": "lundi",
        "precip": "",
        "iconUrl": "http://blob.weather.microsoft.com/static/weather4/fr/law/27.gif"
      },
      {
        "low": "12",
        "high": "22",
        "sky": "Partiellement ensoleillé",
        "date": "2022-04-19",
        "day": "mardi",
        "precip": "20",
        "iconUrl": "http://blob.weather.microsoft.com/static/weather4/fr/law/30.gif"
      },
      {
        "low": "12",
        "high": "17",
        "sky": "Pluie",
        "date": "2022-04-20",
        "day": "mercredi",
        "precip": "100",
        "iconUrl": "http://blob.weather.microsoft.com/static/weather4/fr/law/11.gif"
      },
      {
        "low": "10",
        "high": "18",
        "sky": "Averses de pluie",
        "date": "2022-04-21",
        "day": "jeudi",
        "precip": "100",
        "iconUrl": "http://blob.weather.microsoft.com/static/weather4/fr/law/11.gif"
      },
      {
        "low": "12",
        "high": "19",
        "sky": "Globalement nuageux",
        "date": "2022-04-22",
        "day": "vendredi",
        "precip": "100",
        "iconUrl": "http://blob.weather.microsoft.com/static/weather4/fr/law/28.gif"
      }
    ]
  },
  ...
]
```

## Notes

- It uses `weather.service.msn.com`

## License

Licensed under The MIT License (MIT)  
For the full copyright and license information, please view the LICENSE file.
