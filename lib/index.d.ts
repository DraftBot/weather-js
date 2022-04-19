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
export declare const defaultOptions: WeatherOptions;
export declare function findWeather(search: string, options?: WeatherOptions): Promise<WeatherData[]>;
export {};
