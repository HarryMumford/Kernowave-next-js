import "./surf-quality"
import SurfQuality from "./surf-quality"

const data = {
  spotId: null,
  name: null,
  onshoreDirection: null,
  forecast: {
    windSpeed: null,
    windDirection: null,
    waveHeight: null
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

  describe("windRelativeOrientation", () => {
    test("returns 'onshore' when onshore", () => {
      data.onshoreDirection = 1
      data.forecast.windDirection = 1
      const surf = new SurfQuality(data)

      expect(surf.windRelativeOrientation()).toBe("Onshore")
    })
    test("returns 'Cross-onshore' when cross-onshore", () => {
      data.onshoreDirection = 0
      data.forecast.windDirection = 75
      const surf = new SurfQuality(data)

      expect(surf.windRelativeOrientation()).toBe("Cross-onshore")
    })
    test("returns 'Cross-offshore' when cross-offshore", () => {
      data.onshoreDirection = 0
      data.forecast.windDirection = 95
      const surf = new SurfQuality(data)

      expect(surf.windRelativeOrientation()).toBe("Cross-offshore")
    })
    test("returns 'Offshore' when Offshore", () => {
      data.onshoreDirection = 0
      data.forecast.windDirection = 140
      const surf = new SurfQuality(data)

      expect(surf.windRelativeOrientation()).toBe("Offshore")
    })
    test("special case 1 (359, 0)", () => {
      data.onshoreDirection = 359
      data.forecast.windDirection = 0
      const surf = new SurfQuality(data)

      expect(surf.windRelativeOrientation()).toBe("Onshore")
    })
    test("special case 2 (3, 185)", () => {
      data.onshoreDirection = 2
      data.forecast.windDirection = 185
      const surf = new SurfQuality(data)

      expect(surf.windRelativeOrientation()).toBe("Offshore")
    })
  })
})
