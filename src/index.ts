import fetch from 'node-fetch';
import { XMLParser } from 'fast-xml-parser';

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: '',
  parseTagValue: true,
  ignoreDeclaration: true,
  ignorePiTags: true,
  isArray: (_name, jpath) => jpath === 'weatherdata.weather'
});

const BASE_URL = 'http://weather.service.msn.com/find.aspx';

interface WeatherLocation {
  name: string;
  lat: string;
  long: string;
  timezone: string;
  alert: string | null;
  provider: string;
}

interface WeatherCurrent {
  temperature: string;
  sky: string;
  date: string;
  time: string;
  day: string;
  feelsLike: string;
  humidity: string;
  windDisplay: string;
  windSpeed: string;
  iconUrl: string;
}

interface WeatherForecast {
  low: string;
  high: string;
  sky: string;
  date: string;
  day: string;
  precip: string;
  iconUrl: string;
}

export interface WeatherData {
  location: WeatherLocation;
  current: WeatherCurrent | null;
  forecast: WeatherForecast[];
}

export interface WeatherOptions {
  lang?: string;
  degreeType?: 'C' | 'F';
}

export const defaultOptions: WeatherOptions = {
  lang: 'fr-FR',
  degreeType: 'C'
};

export async function findWeather(
  search: string,
  options: WeatherOptions = {}
): Promise<WeatherData[]> {
  options = Object.assign({}, defaultOptions, options);

  if (!search) {
    throw new Error('Missing search argument');
  }

  const requestUrl =
    BASE_URL +
    `?src=outlook` +
    `&weadegreetype=${options.degreeType}` +
    `&culture=${options.lang}` +
    `&weasearchstr=${encodeURIComponent(search)}`;

  const request = await fetch(requestUrl, {});
  if (request.status !== 200)
    throw new Error(`Request failed with ${request.status} code`);
  const body = await request.text();
  if (!body) throw new Error(`No body content`);

  const data = parser.parse(body);

  const weatherData = data?.weatherdata?.weather;

  if (!weatherData) return [];

  if (!(weatherData instanceof Array)) {
    throw new Error('Missing weather info');
  }

  return weatherData.map((weather) => ({
    location: {
      name: weather.weatherlocationname,
      lat: weather.lat,
      long: weather.long,
      timezone: weather.timezone,
      alert: weather.alert || null,
      provider: weather.provider
    },
    current: weather.current
      ? {
          temperature: weather.current.temperature,
          sky: weather.current.skytext,
          date: weather.current.date,
          time: weather.current.observationtime,
          day: weather.current.day,
          feelsLike: weather.current.feelslike,
          humidity: weather.current.humidity,
          windDisplay: weather.current.winddisplay,
          windSpeed: weather.current.windspeed,
          iconUrl:
            weather.imagerelativeurl + 'law/' + weather.current.skycode + '.gif'
        }
      : null,
    forecast: weather.forecast?.length
      ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
        weather.forecast.map((forecast: any) => ({
          low: forecast.low,
          high: forecast.high,
          sky: forecast.skytextday,
          date: forecast.date,
          day: forecast.day,
          precip: forecast.precip,
          iconUrl:
            weather.imagerelativeurl + 'law/' + forecast.skycodeday + '.gif'
        }))
      : []
  }));
}
