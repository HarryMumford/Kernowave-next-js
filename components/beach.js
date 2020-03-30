import axios from "axios"
import React from "react"
import Heading from "../style/components/Heading"
import Header from "../style/components/Header"
import Wrapper from "../style/components/Wrapper"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWind } from '@fortawesome/free-solid-svg-icons'
import { faLocationArrow } from '@fortawesome/free-solid-svg-icons'
import { createGlobalStyle } from 'styled-components'

export default class BeachComponent extends React.Component {
  constructor(props) {
    super(props)  
    this.state = {
      days: {},
      loaded: false
    }
  }

  componentDidMount() {
    axios.get(`http://magicseaweed.com/api/e872632fcaa41717190e1812a493dc3b/forecast/?spot_id=${this.props.id}`)
    .then(response => {
      this.createDailyForecast(response)
    })
  }

  createDailyForecast = (response) => {
    const days = {}
    const data = response.data
    for(let d = 4; d < data.length - 4; d += 8) {
      const day = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][new Date(data[d].timestamp * 1000).getDay()]
      const swell = Math.round(((data[d].swell.maxBreakingHeight + data[d].swell.minBreakingHeight)/2)*3.28084)
      const windSpeed = data[d].wind.speed
      const compassDirection = data[d].wind.compassDirection
      const direction = data[d].wind.direction
      days[day] = {swell: swell, wind: {speed: windSpeed, compassDirection: compassDirection, direction: direction}}
    }
      this.setState({ 
        days: days,
        loaded: true
      })
  }

  render() {
    const GlobalStyle = createGlobalStyle`
      body {
        margin: 0;
        text-align: center;
        font-family: 'Open Sans';
      }
    `
    const { loaded, days } = this.state
    return (
      <Wrapper>
      <GlobalStyle />
        <Header>
          <Heading>Praa Sands</Heading>
        </Header>
        {loaded && Object.keys(days).map(day => {
          return (
            <div>
              <h2>{day}</h2>
              <h3>{days[day].swell} ft</h3>
              <p>
                <FontAwesomeIcon icon={faWind}/> {days[day].wind.speed} km/h <FontAwesomeIcon icon={faLocationArrow} transform={{ rotate: (days[day].wind.direction-45) }}/> 
                {days[day].wind.compassDirection}
              </p>
            </div>
          )
        })}
      </Wrapper>
    )
  }
}