export default class SurfQuality {
  constructor(inputData) {
    this.inputData = inputData
    this.windSpeed = this.windSpeedQuality()
    this.windDirection = this.windDirectionQuality()
    this.overall = this.overallQuality()
  }

  windSpeedQuality() {
    const { windSpeed } = this.inputData

    if (windSpeed < 15) {
      return 2
    } else if (windSpeed < 30) {
      return 1
    } else {
      return 0
    }
  }

  windDirectionQuality() {
    const { windRelativeDirection } = this.inputData

    if (
      windRelativeDirection == "Onshore" ||
      windRelativeDirection == "Cross-onshore"
    ) {
      return 0
    } else {
      return 2
    }
  }

  overallQuality() {
    const { waveHeight } = this.inputData
    const { windSpeed, windDirection } = this

    if (waveHeight < 3 || (windSpeed <= 1 && windDirection < 1)) {
      return 0
    } else if (windSpeed < 1 && waveHeight >= 3) {
      return 1
    } else {
      return 2
    }
  }

  all() {
    return {
      windSpeed: this.windSpeed,
      windDirection: this.windDirection,
      overall: this.overall
    }
  }
}
