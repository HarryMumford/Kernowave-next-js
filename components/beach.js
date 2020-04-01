import axios from "axios"
import React from "react"
import Heading from "../style/components/Heading"
import Section from "../style/components/Section"
import Header from "../style/components/Header"
import Wrapper from "../style/components/Wrapper"
import SwellText from "../style/components/SwellText"
import WindSpeedText from "../style/components/WindSpeedText"
import WindDirectionText from "../style/components/WindDirectionText"
import WindConditionsContainer from "../style/components/WindConditionsContainer"
import GlobalStyle from "../style/components/GlobalStyle"
import StyledSlider from "../style/components/StyledSlider"
import StyledFontAwesomeIcon from "../style/components/StyledFontAwesomeIcon"
import {Helmet} from "react-helmet";
import { faLocationArrow } from '@fortawesome/free-solid-svg-icons'
import { faWind } from '@fortawesome/free-solid-svg-icons'
import { location } from '../constants'
import Subheading from "../style/components/Subheading"

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

  calcShoreDirection (shoreDirection) {
    if (shoreDirection < 45) {
      return "Onshore"
    } else if (shoreDirection < 90) {
      return "Cross-onshore"
    } else if (shoreDirection < 135) {
      return "Cross-offshore"
    } else {
      return "Offshore"
    }
  }

  createDailyForecast = (response) => {
    const days = {}
    const data = response.data
    for(let d = 4; d < data.length - 4; d += 8) {
      const day = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][new Date(data[d].timestamp * 1000).getDay()]
      const swell = Math.round(((data[d].swell.maxBreakingHeight + data[d].swell.minBreakingHeight)/2)*3.28084)
      const windSpeed = data[d].wind.speed
      const compassDirection = data[d].wind.compassDirection
      const windDirection = data[d].wind.direction
      const onshoreDirection = location[this.props.id].onshoreDirection
      const directionDifference = Math.abs(windDirection - onshoreDirection)
      const angleToOnshore = directionDifference > 180 ? 180 - (directionDifference - 180) : directionDifference
      const shoreDirection = this.calcShoreDirection(angleToOnshore)
      days[day] = {
        swell: swell, 
        wind: {
          speed: windSpeed,
          compassDirection: compassDirection, 
          direction: windDirection, 
          shoreDirection: shoreDirection
        }
      }
    }
    this.setState({ 
      days: days,
      loaded: true
    })
  }

  windSpeedQuality (speed) {
    if (speed > 30) {
      return "bad"
    } else if (speed > 15) {
      return "med"
    } else {
      return "good"
    }
  }

  windDirectionQuality (shoreDirection) {
    if (shoreDirection == "Offshore") {
      return "good"
    } else if (shoreDirection == "Cross-offshore") {
      return "med"
    } else {
      return "bad"
    }
  }

  render() {
    const { loaded, days } = this.state
    var settings = {  
      slidesToShow: 4,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            dots: true
          }
        },
        {
          breakpoint: 480,
          settings: {
            infinite: true,
            dots: true,
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    }
    return (
      <Wrapper>
          <Helmet>
            <meta charSet="utf-8" />
            <title>{location[this.props.id].name}</title>
            <link href="https://fonts.googleapis.com/css?family=Norican|Noto+Serif+SC&display=swap" rel="stylesheet"/>
          </Helmet>
          <GlobalStyle/>
          <Header>
            <Heading>{location[this.props.id].name}</Heading>
          </Header>
          <Section>
            <StyledSlider {...settings}>
              {loaded && Object.keys(days).map(day => {
                return (
                  <>
                    <Subheading>{day}</Subheading>
                    <SwellText>{days[day].swell} ft</SwellText>
                    <WindConditionsContainer>
                      <WindSpeedText windSpeed={this.windSpeedQuality(days[day].wind.speed)}>
                      <StyledFontAwesomeIcon icon={faWind}/>{days[day].wind.speed} km/h
                      </WindSpeedText>
                      <WindDirectionText windDirection={this.windDirectionQuality(days[day].wind.shoreDirection)}>
                        <StyledFontAwesomeIcon icon={faLocationArrow} transform={{ rotate: (days[day].wind.direction-45) }}/>
                          {days[day].wind.shoreDirection}
                      </WindDirectionText>
                    </WindConditionsContainer>
                  </> 
                )
              })}
            </StyledSlider> 
          </Section>
      </Wrapper>
    )
  }
}