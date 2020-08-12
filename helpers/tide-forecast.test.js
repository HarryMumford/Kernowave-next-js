import TideForecast from "./tide-forecast"
import { mockedTideForecast } from "../mocks/mocked-tide-forecast"

const tideForecast = new TideForecast(mockedTideForecast)

describe("TideForecast", () => {
  describe(".create", () => {
    test("returns 4 days", () => {
      const len = Object.keys(tideForecast.create()).length
      expect(len).toBe(4)
    })
    test("a day contains 4 events", () => {
      const len = tideForecast.create()["Tuesday"].length
      expect(len).toBe(4)
    })
    test("an event contains the correct key", () => {
      const key = Object.keys(tideForecast.create()["Tuesday"][0])[0]
      expect(key).toEqual("LowWater")
    })
  })
})
