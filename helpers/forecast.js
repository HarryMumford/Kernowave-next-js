import SurfQuality from "./surf-quality"

export default class Forecast {
  constructor(data, onshoreDirection) {
    this.data = data
    this.onshoreDirection = onshoreDirection
  }

  windRelativeDirection(windDirection) {
    const directionDifference = Math.abs(windDirection - this.onshoreDirection)
    const angleToOnshore =
      directionDifference > 180
        ? 180 - (directionDifference - 180)
        : directionDifference

    if (angleToOnshore < 45) {
      return "Onshore"
    } else if (angleToOnshore < 90) {
      return "Cross-onshore"
    } else if (angleToOnshore < 135) {
      return "Cross-offshore"
    } else {
      return "Offshore"
    }
  }

  create() {
    const forecast = []
    const data = this.data

    for (let d = 4; d < data.length - 4; d += 8) {
      const day = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ][new Date(data[d].timestamp * 1000).getDay()]
      const waveHeight = Math.round(
        (data[d].swell.maxBreakingHeight + data[d].swell.minBreakingHeight) / 2
      )
      const windSpeed = Math.round(data[d].wind.speed)
      const windDirection = data[d].wind.direction
      const windRelativeDirection = this.windRelativeDirection(windDirection)

      forecast.push({
        day,
        windSpeed,
        windDirection,
        windRelativeDirection,
        waveHeight
      })
    }

    return forecast
  }
}
