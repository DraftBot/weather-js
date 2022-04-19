"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findWeather = exports.defaultOptions = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
const fast_xml_parser_1 = require("fast-xml-parser");
const parser = new fast_xml_parser_1.XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: '',
    parseTagValue: true,
    ignoreDeclaration: true,
    ignorePiTags: true
});
const BASE_URL = 'http://weather.service.msn.com/find.aspx';
exports.defaultOptions = {
    lang: 'fr-FR',
    degreeType: 'C'
};
async function findWeather(search, options = {}) {
    options = Object.assign({}, options, exports.defaultOptions);
    if (!search) {
        throw new Error('Missing search argument');
    }
    const requestUrl = BASE_URL +
        `?src=outlook&weadegreetype=${options.degreeType}` +
        `&culture=${options.lang}` +
        `&weasearchstr=${encodeURIComponent(search)}`;
    const request = await (0, node_fetch_1.default)(requestUrl, {});
    if (request.status !== 200)
        throw new Error(`Request failed with ${request.status} code`);
    const body = await request.text();
    if (!body)
        throw new Error(`No body content`);
    const data = parser.parse(body);
    const weatherData = data?.weatherdata?.weather;
    if (!weatherData)
        return [];
    if (weatherData.errormessage) {
        throw new Error('API Error message : ' + weatherData.errormessage);
    }
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
                iconUrl: weather.imagerelativeurl + 'law/' + weather.current.skycode + '.gif'
            }
            : null,
        forecast: weather.forecast?.length
            ?
                weather.forecast.map((forecast) => ({
                    low: forecast.low,
                    high: forecast.high,
                    sky: forecast.skytextday,
                    date: forecast.date,
                    day: forecast.day,
                    precip: forecast.precip,
                    iconUrl: weather.imagerelativeurl + 'law/' + forecast.skycodeday + '.gif'
                }))
            : []
    }));
}
exports.findWeather = findWeather;
//# sourceMappingURL=index.js.map