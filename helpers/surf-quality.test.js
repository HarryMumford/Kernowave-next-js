import "./surf-quality"
import SurfQuality from "./surf-quality"

const data = {
  windSpeed: null,
  windDirection: null,
  windRelativeDirection: null,
  waveHeight: null
}

describe("SurfQuality", () => {
  describe("windSpeedQuality", () => {
    test("returns -1 when above 30", () => {
      data.windSpeed = 31
      const surf = new SurfQuality(data)

      expect(surf.windSpeedQuality()).toBe(-1)
    })
    test("returns 0 when above 15 and below 30", () => {
      data.windSpeed = 29
      const surf = new SurfQuality(data)

      expect(surf.windSpeedQuality()).toBe(0)
    })
    test("returns 1 when below 15", () => {
      data.windSpeed = 0
      const surf = new SurfQuality(data)

      expect(surf.windSpeedQuality()).toBe(1)
    })
  })

  describe("windDirectionQuality", () => {
    test("returns -1 when onshore", () => {
      data.windRelativeDirection = "Onshore"
      const surf = new SurfQuality(data)

      expect(surf.windDirectionQuality()).toBe(-1)
    })
    test("returns -1 when cross-onshore", () => {
      data.windRelativeDirection = "Cross-onshore"
      const surf = new SurfQuality(data)

      expect(surf.windDirectionQuality()).toBe(-1)
    })
    test("returns 1 when offshore", () => {
      data.windRelativeDirection = "Offshore"
      const surf = new SurfQuality(data)

      expect(surf.windDirectionQuality()).toBe(1)
    })
    test("returns 1 when cross-offshore", () => {
      data.windRelativeDirection = "Cross-offshore"
      const surf = new SurfQuality(data)

      expect(surf.windDirectionQuality()).toBe(1)
    })
  })
  describe("overallQuality", () => {
    test("returns -1 if surf height is below 2ft", () => {
      data.waveHeight = 1
      const surf = new SurfQuality(data)

      expect(surf.overallQuality()).toBe(-1)
    })
    test("returns -1 if windDirectionQuality is poor and windSpeedQuality is poor", () => {
      data.windRelativeDirection = "Cross-onshore"
      data.windSpeed = 31
      const surf = new SurfQuality(data)

      expect(surf.windSpeedQuality()).toBe(-1)
      expect(surf.windDirectionQuality()).toBe(-1)
      expect(surf.overallQuality()).toBe(-1)
    })
    test("returns 0 if surf >= 3ft, windDirectionQuality is poor and windSpeedQuality is average", () => {
      data.windRelativeDirection = "Cross-onshore"
      data.waveHeight = 4
      data.windSpeed = 25
      const surf = new SurfQuality(data)

      expect(surf.windSpeedQuality()).toBe(0)
      expect(surf.windDirectionQuality()).toBe(-1)
      expect(surf.overallQuality()).toBe(-1)
    })
    test("returns 1 if windDirectionQuality is bad but windSpeedQuality is good", () => {
      data.windRelativeDirection = "Cross-onshore"
      data.windSpeed = 5
      const surf = new SurfQuality(data)

      expect(surf.windSpeedQuality()).toBe(1)
      expect(surf.windDirectionQuality()).toBe(-1)
      expect(surf.overallQuality()).toBe(1)
    })
    test("returns 0 if windDirectionQuality is good and windSpeedQuality is poor", () => {
      data.windRelativeDirection = "Offshore"
      data.windSpeed = 35
      const surf = new SurfQuality(data)

      expect(surf.windSpeedQuality()).toBe(-1)
      expect(surf.windDirectionQuality()).toBe(1)
      expect(surf.overallQuality()).toBe(0)
    })
    test("returns 1 if windSpeedQuality is good and windDirectionQuality is good", () => {
      data.windRelativeDirection = "Offshore"
      data.windSpeed = 5
      const surf = new SurfQuality(data)

      expect(surf.windSpeedQuality()).toBe(1)
      expect(surf.windDirectionQuality()).toBe(1)
      expect(surf.overallQuality()).toBe(1)
    })
  })
})
