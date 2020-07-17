import axios from "axios"
import Link from "next/link"
import React from "react"
import Logo from "../style/components/Logo"
import Header from "../style/components/Header"
import Footer from "../style/components/Footer"
import Heading from "../style/components/Heading"
import Section from "../style/components/Section"
import Wrapper from "../style/components/Wrapper"
import HomeIcon from "../style/components/HomeIcon"
import HomeLink from "../style/components/HomeLink"
import SwellText from "../style/components/SwellText"
import FooterText from "../style/components/FooterText"
import Subheading from "../style/components/Subheading"
import GlobalStyle from "../style/components/GlobalStyle"
import StyledSlider from "../style/components/StyledSlider"
import WindSpeedText from "../style/components/WindSpeedText"
import WindDirectionText from "../style/components/WindDirectionText"
import StyledFontAwesomeIcon from "../style/components/StyledFontAwesomeIcon"
import WindConditionsContainer from "../style/components/WindConditionsContainer"
import { Helmet } from "react-helmet"
import { faLocationArrow } from "@fortawesome/free-solid-svg-icons"
import { faWind } from "@fortawesome/free-solid-svg-icons"
import { faHome } from "@fortawesome/free-solid-svg-icons"
import { location, img } from "../constants"

export default class BeachComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      days: {},
      loaded: false
    }
  }

  componentDidMount() {
    this.createDailyForecast(this.props.data.forecast)
  }

  createDailyForecast = data => {
    const days = {}
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
      const swellSize = Math.round(
        ((data[d].swell.maxBreakingHeight + data[d].swell.minBreakingHeight) /
          2) *
          3.28084
      )
      const windSpeed = Math.round(data[d].wind.speed * 0.621371)
      const windDirection = data[d].wind.direction
      const onshoreDirection = this.props.data.onshoreDirection
      const directionDifference = Math.abs(windDirection - onshoreDirection)
      const angleToOnshore =
        directionDifference > 180
          ? 180 - (directionDifference - 180)
          : directionDifference
      const shoreDirection = this.calcShoreDirection(angleToOnshore)
      const windDirectionQuality = this.windDirectionQuality(shoreDirection)
      const windSpeedQuality = this.windSpeedQuality(windSpeed)
      const swellQuality = this.swellQuality(
        swellSize,
        windSpeedQuality,
        windDirectionQuality
      )
      days[day] = {
        swell: {
          size: swellSize,
          quality: swellQuality
        },
        wind: {
          speed: windSpeed,
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

  calcShoreDirection(shoreDirection) {
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

  windSpeedQuality(speed) {
    if (speed > 30) {
      return "bad"
    } else if (speed > 15) {
      return "med"
    } else {
      return "good"
    }
  }

  windDirectionQuality(shoreDirection) {
    if (shoreDirection == "Offshore") {
      return "good"
    } else if (shoreDirection == "Cross-offshore") {
      return "med"
    } else {
      return "bad"
    }
  }

  swellQuality(swellSize, windSpeedQuality, shoreDirectionQuality) {
    if (
      swellSize < 2 ||
      ((windSpeedQuality == "bad" || windSpeedQuality == "med") &&
        shoreDirectionQuality == "bad")
    ) {
      return "bad"
    } else if (windSpeedQuality == "bad") {
      return "med"
    } else {
      return "good"
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

    const HomeButton = React.forwardRef(({ onClick, href }, ref) => {
      return (
        <HomeLink href={href} onClick={onClick} ref={ref}>
          <HomeIcon icon={faHome} />
        </HomeLink>
      )
    })

    return (
      <Wrapper>
        <Helmet>
          <meta charSet="utf-8" />
          <title>{this.props.data.name}</title>
          <link
            href="https://fonts.googleapis.com/css?family=Norican|Noto+Serif+SC&display=swap"
            rel="stylesheet"
          />
        </Helmet>
        <GlobalStyle />
        <Header>
          <Link href="/" passHref>
            <HomeButton />
          </Link>
          <Heading>{this.props.data.name}</Heading>
        </Header>
        <Section>
          <StyledSlider {...settings}>
            {loaded &&
              Object.keys(days).map((day, index) => {
                return (
                  <li key={days[day]}>
                    <Subheading>{day}</Subheading>
                    <SwellText quality={days[day].swell.quality}>
                      {days[day].swell.size} ft
                    </SwellText>
                    <WindConditionsContainer>
                      <WindSpeedText
                        windSpeed={this.windSpeedQuality(days[day].wind.speed)}
                      >
                        <StyledFontAwesomeIcon icon={faWind} />
                        {days[day].wind.speed} mph
                      </WindSpeedText>
                      <WindDirectionText
                        windDirection={this.windDirectionQuality(
                          days[day].wind.shoreDirection
                        )}
                      >
                        <StyledFontAwesomeIcon
                          icon={faLocationArrow}
                          transform={{ rotate: days[day].wind.direction - 45 }}
                        />
                        {days[day].wind.shoreDirection}
                      </WindDirectionText>
                    </WindConditionsContainer>
                  </li>
                )
              })}
          </StyledSlider>
        </Section>
        <Footer>
          <FooterText>Data provided by</FooterText>
          <Logo src={img.logo} />
        </Footer>
      </Wrapper>
    )
  }
}
