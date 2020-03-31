import axios from "axios"
import React from "react"
import Heading from "../style/components/Heading"
import Section from "../style/components/Section"
import Header from "../style/components/Header"
import Wrapper from "../style/components/Wrapper"
import SwellText from "../style/components/SwellText"
import GlobalStyle from "../style/components/GlobalStyle"
import Slider from "react-slick";
import {Helmet} from "react-helmet";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWind } from '@fortawesome/free-solid-svg-icons'
import { faLocationArrow } from '@fortawesome/free-solid-svg-icons'
import Subheading from "../style/components/Subheading"
import styled from "styled-components"

const StyledSlider = styled(Slider)`
  .slick-next:before {
    color: black;
  }
`;

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
    const { loaded, days } = this.state
    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };
    return (
      <Wrapper>
          <Helmet>
            <meta charSet="utf-8" />
            <title>Praa Sands</title>
            <link href="https://fonts.googleapis.com/css?family=Norican|Noto+Serif+SC&display=swap" rel="stylesheet"/>
          </Helmet>
          <GlobalStyle/>
          <Header>
            <Heading>Praa Sands</Heading>
          </Header>
          <Section>
            <StyledSlider {...settings}>
              {loaded && Object.keys(days).map(day => {
                return (
                  <div>
                    <Subheading>{day}</Subheading>
                    <SwellText>{days[day].swell} ft</SwellText>
                    <p>
                      <FontAwesomeIcon icon={faWind}/> {days[day].wind.speed} km/h <FontAwesomeIcon icon={faLocationArrow} transform={{ rotate: (days[day].wind.direction-45) }}/> 
                      {days[day].wind.compassDirection}
                    </p>
                  </div>
                )
              })}
            </StyledSlider>
          </Section>
      </Wrapper>
    )
  }
}