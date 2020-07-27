export default class SurfQuality {
  constructor(data) {
    this.data = data
  }

  windSpeedQuality() {
    const { windSpeed } = this.data.forecast

    if (windSpeed < 15) {
      return 1
    } else if (windSpeed < 30) {
      return 0
    } else {
      return -1
    }
  }

  windRelativeOrientation() {
    const { onshoreDirection } = this.data
    const { windDirection } = this.data.forecast

    const directionDifference = Math.abs(windDirection - onshoreDirection)
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
}
