import { findWeather } from '../src/index';

describe('weather', () => {
  describe('findWeather()', () => {
    it('should find a location with weather information', async () => {
      const schema = expect.arrayContaining([
        expect.objectContaining({
          location: {
            name: expect.any(String),
            lat: expect.any(String),
            long: expect.any(String),
            timezone: expect.any(String),
            alert: expect.nullOrAny(String),
            provider: expect.any(String)
          },

          current: expect.objectContaining({
            temperature: expect.any(String),
            sky: expect.any(String),
            date: expect.any(String),
            time: expect.any(String),
            day: expect.any(String),
            feelsLike: expect.any(String),
            humidity: expect.any(String),
            windDisplay: expect.any(String),
            windSpeed: expect.any(String),
            iconUrl: expect.any(String)
          }),
          forecast: expect.arrayContaining([
            expect.objectContaining({
              low: expect.any(String),
              high: expect.any(String),
              sky: expect.any(String),
              date: expect.any(String),
              day: expect.any(String),
              precip: expect.any(String),
              iconUrl: expect.any(String)
            })
          ])
        })
      ]);

      expect.assertions(1);

      const data = await findWeather('Sens', { degreeType: 'F' });

      expect(data).toEqual(schema);
    });

    it('should find multiple locations with weather information', async () => {
      expect.assertions(2);

      const data = await findWeather('San Francisco, CA', { degreeType: 'F' });
      expect(data).toBeInstanceOf(Array);
      expect(data.length).toBeGreaterThan(1);
    });

    it('should fail to find a location (missing search)', async () => {
      await expect(findWeather('', { degreeType: 'F' })).rejects.toThrow(
        'Missing search argument'
      );
    });

    it('should not return any address (bad address)', async () => {
      expect.assertions(2);

      const data = await findWeather('.', { degreeType: 'F' });
      expect(data).toBeInstanceOf(Array);
      expect(data.length).toEqual(0);
    });
  });
});

interface CustomMatchers<R = unknown> {
  nullOrAny(expected: unknown): R;
}

/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/no-empty-interface */
declare global {
  namespace jest {
    interface Expect extends CustomMatchers {}
    interface Matchers<R> extends CustomMatchers<R> {}
    interface InverseAsymmetricMatchers extends CustomMatchers {}
  }
}

expect.extend({
  nullOrAny(received, expected) {
    const formatMessage = () =>
      `expected null or instance of ${this.utils.printExpected(
        expected
      )}, but received ${this.utils.printReceived(received)}`;

    if (received === null) {
      return {
        pass: true,
        message: formatMessage
      };
    }

    if (expected == String) {
      return {
        pass: typeof received == 'string' || received instanceof String,
        message: formatMessage
      };
    }

    if (expected == Number) {
      return {
        pass: typeof received == 'number' || received instanceof Number,
        message: formatMessage
      };
    }

    if (expected == Function) {
      return {
        pass: typeof received == 'function' || received instanceof Function,
        message: formatMessage
      };
    }

    if (expected == Object) {
      return {
        pass: received !== null && typeof received == 'object',
        message: formatMessage
      };
    }

    if (expected == Boolean) {
      return {
        pass: typeof received == 'boolean',
        message: formatMessage
      };
    }

    return {
      pass: received instanceof expected,
      message: formatMessage
    };
  }
});
