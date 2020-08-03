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
      return 1
    } else if (windSpeed < 30) {
      return 0
    } else {
      return -1
    }
  }

  windDirectionQuality() {
    const { windRelativeDirection } = this.inputData

    if (
      windRelativeDirection == "Onshore" ||
      windRelativeDirection == "Cross-onshore"
    ) {
      return -1
    } else {
      1
      return 1
    }
  }

  overallQuality() {
    const { waveHeight } = this.inputData
    const { windSpeed, windDirection } = this

    if (waveHeight < 2 || (windSpeed <= 0 && windDirection < 0)) {
      return -1
    } else if (windSpeed < 0 && waveHeight >= 3) {
      return 0
    } else {
      return 1
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
