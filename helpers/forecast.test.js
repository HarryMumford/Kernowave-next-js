import Forecast from "./forecast"
import { mockedResponse } from "../mocks/mocked-api-response"

const onshoreDirection = 0

const forecast = new Forecast(mockedResponse, onshoreDirection)

describe("Forecast", () => {
  describe("windRelativeDirection", () => {
    test("returns 'onshore' when onshore", () => {
      expect(forecast.windRelativeDirection(0)).toBe("Onshore")
    })
    test("returns 'Cross-onshore' when cross-onshore", () => {
      forecast.onshoreDirection = 0

      expect(forecast.windRelativeDirection(75)).toBe("Cross-onshore")
    })
    test("returns 'Cross-offshore' when cross-offshore", () => {
      expect(forecast.windRelativeDirection(95)).toBe("Cross-offshore")
    })
    test("returns 'Offshore' when Offshore", () => {
      expect(forecast.windRelativeDirection(140)).toBe("Offshore")
    })
    test("special case 1 (359, 0)", () => {
      forecast.onshoreDirection = 359

      expect(forecast.windRelativeDirection(0)).toBe("Onshore")
    })
    test("special case 2 (3, 185)", () => {
      forecast.onshoreDirection = 2

      expect(forecast.windRelativeDirection(185)).toBe("Offshore")
    })
  })

  describe(".create", () => {
    test("returns the correct daily forecast keys", () => {
      const dailyForecast = forecast.create()[0]
      expect(Object.keys(dailyForecast)).toEqual([
        "day",
        "windSpeed",
        "windDirection",
        "windRelativeDirection",
        "waveHeight",
        "quality"
      ])
    })
    test("returns the correct day", () => {
      const day = forecast.create()[0].day
      expect(day).toEqual("Monday")
    })
  })
})
