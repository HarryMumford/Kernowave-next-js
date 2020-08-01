import "./surf-quality"
import SurfQuality from "./surf-quality"

const data = {
  forecast: {
    windSpeed: null,
    windDirection: null,
    windRelativeDirection: null,
    waveHeight: null,
    quality: {}
  }
}

describe("SurfQuality", () => {
  describe("windSpeedQuality", () => {
    test("returns -1 when above 30", () => {
      data.forecast.windSpeed = 31
      const surf = new SurfQuality(data)

      expect(surf.windSpeedQuality()).toBe(-1)
    })
    test("returns 0 when above 15 and below 30", () => {
      data.forecast.windSpeed = 29
      const surf = new SurfQuality(data)

      expect(surf.windSpeedQuality()).toBe(0)
    })
    test("returns 1 when below 15", () => {
      data.forecast.windSpeed = 0
      const surf = new SurfQuality(data)

      expect(surf.windSpeedQuality()).toBe(1)
    })
  })

  describe("windDirectionQuality", () => {
    test("returns -1 when onshore", () => {
      data.forecast.windRelativeDirection = "Onshore"
      const surf = new SurfQuality(data)

      expect(surf.windDirectionQuality()).toBe(-1)
    })
    test("returns -1 when cross-onshore", () => {
      data.forecast.windRelativeDirection = "Cross-onshore"
      const surf = new SurfQuality(data)

      expect(surf.windDirectionQuality()).toBe(-1)
    })
    test("returns 1 when offshore", () => {
      data.forecast.windRelativeDirection = "Offshore"
      const surf = new SurfQuality(data)

      expect(surf.windDirectionQuality()).toBe(1)
    })
    test("returns 1 when cross-offshore", () => {
      data.forecast.windRelativeDirection = "Cross-offshore"
      const surf = new SurfQuality(data)

      expect(surf.windDirectionQuality()).toBe(1)
    })
  })
  describe("overallQuality", () => {
    test("returns -1 if surf height is below 2ft", () => {
      data.forecast.waveHeight = 1
      const surf = new SurfQuality(data)

      expect(surf.overallQuality()).toBe(-1)
    })
    test("returns -1 if windDirectionQuality is poor and windSpeedQuality is poor", () => {
      data.forecast.windRelativeDirection = "Cross-onshore"
      data.forecast.windSpeed = 31
      const surf = new SurfQuality(data)

      expect(surf.windSpeedQuality()).toBe(-1)
      expect(surf.windDirectionQuality()).toBe(-1)
      expect(surf.overallQuality()).toBe(-1)
    })
    test("returns 0 if surf >= 3ft, windDirectionQuality is poor and windSpeedQuality is average", () => {
      data.forecast.windRelativeDirection = "Cross-onshore"
      data.forecast.waveHeight = 4
      data.forecast.windSpeed = 25
      const surf = new SurfQuality(data)

      expect(surf.windSpeedQuality()).toBe(0)
      expect(surf.windDirectionQuality()).toBe(-1)
      expect(surf.overallQuality()).toBe(-1)
    })
    test("returns 1 if windDirectionQuality is bad but windSpeedQuality is good", () => {
      data.forecast.windRelativeDirection = "Cross-onshore"
      data.forecast.windSpeed = 5
      const surf = new SurfQuality(data)

      expect(surf.windSpeedQuality()).toBe(1)
      expect(surf.windDirectionQuality()).toBe(-1)
      expect(surf.overallQuality()).toBe(1)
    })
    test("returns 0 if windDirectionQuality is good and windSpeedQuality is poor", () => {
      data.forecast.windRelativeDirection = "Offshore"
      data.forecast.windSpeed = 35
      const surf = new SurfQuality(data)

      expect(surf.windSpeedQuality()).toBe(-1)
      expect(surf.windDirectionQuality()).toBe(1)
      expect(surf.overallQuality()).toBe(0)
    })
    test("returns 1 if windSpeedQuality is good and windDirectionQuality is good", () => {
      data.forecast.windRelativeDirection = "Offshore"
      data.forecast.windSpeed = 5
      const surf = new SurfQuality(data)

      expect(surf.windSpeedQuality()).toBe(1)
      expect(surf.windDirectionQuality()).toBe(1)
      expect(surf.overallQuality()).toBe(1)
    })
  })
})
