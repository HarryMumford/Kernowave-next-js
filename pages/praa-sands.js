import axios from "axios"
import React from "react"

export default class PraaSands extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      days: {},
      loaded: false
    }
  }

  componentDidMount() {
    axios.get('http://magicseaweed.com/api/e872632fcaa41717190e1812a493dc3b/forecast/?spot_id=8')
    .then(response => {
      this.createDailyForecast(response)
    })
  }

  createDailyForecast = (response) => {
    const days = {}
    const data = response.data
    for(let d = 4; d < data.length - 4; d += 8) {
      const day = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][new Date(data[d].timestamp * 1000).getDay()-1]
      const swell = Math.round((data[d].swell.maxBreakingHeight - data[d].swell.minBreakingHeight)*3.28084)
      const windSpeed = data[d].wind.speed
      const compassDirection = data[d].wind.compassDirection
      days[day] = {swell: swell, wind: {speed: windSpeed, direction: compassDirection}}
    }
      this.setState({ 
        days: days,
        loaded: true
      })
  }

  render() {
    const { loaded, days } = this.state
    return (
      <>
        <h1>Praa Sands</h1>
        {loaded && Object.keys(days).map(day => {
            return (
              <div>
                <h2>{day}</h2>
                <p>{days[day].swell} ft</p>
                <p>{days[day].wind.speed} km/h | {days[day].wind.direction}</p>
              </div>
              )
          })}
      </>
    )
  }
}