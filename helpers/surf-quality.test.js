import "./surf-quality"
import SurfQuality from "./surf-quality"

describe("SurfQuality", () => {
  describe("windSpeedQuality", () => {
    test("returns -1 when above 30", () => {
      const surf = new SurfQuality(31, 10, 10)

      expect(surf.windSpeedQuality()).toBe(-1)
    })
    test("returns 0 when above 15 and below 31", () => {
      const surf = new SurfQuality(17, 10, 10)

      expect(surf.windSpeedQuality()).toBe(0)
    })
    test("returns 1 when below 16", () => {
      const surf1 = new SurfQuality(15, 10, 10)
      const surf2 = new SurfQuality(0, 10, 10)

      expect(surf1.windSpeedQuality()).toBe(1)
      expect(surf2.windSpeedQuality()).toBe(1)
    })
  })
})
