export default class SurfQuality {
  constructor(windSpeed, windDirection, waveHeight) {
    this.windSpeed = windSpeed
    this.windDirection = windDirection
    this.waveHeight = waveHeight
  }

  windSpeedQuality() {
    if (this.windSpeed > 30) {
      return -1
    } else if (this.windSpeed > 15 && this.windSpeed < 30) {
      return 0
    } else {
      return 1
    }
  }

  windRelativeOrientation() {
    if (this.windSpeed > 30) {
      return -1
    } else if (this.windSpeed > 15 && this.windSpeed < 30) {
      return 0
    } else {
      return 1
    }
  }
}
