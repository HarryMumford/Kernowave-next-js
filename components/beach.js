import Link from "next/link"
import React from "react"
import Logo from "../style/components/Logo"
import Header from "../style/components/Header"
import Footer from "../style/components/Footer"
import Heading from "../style/components/Heading"
import Section from "../style/components/Section"
import Wrapper from "../style/components/Wrapper"
import SwellText from "../style/components/SwellText"
import FooterText from "../style/components/FooterText"
import { HomeButton } from "./home-button"
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
import { img } from "../constants"

export default class BeachComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {},
      loaded: false
    }
  }

  componentDidMount() {
    this.setState({
      loaded: true
    })
  }

  render() {
    const { data } = this.props
    const { loaded } = this.state

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
        {loaded && (
          <>
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
                {Object.keys(data).map((day, index) => {
                  return (
                    <li key={data[day]}>
                      <Subheading>{day}</Subheading>
                      <SwellText quality={data[day].swell.quality}>
                        {data[day].swell.size} ft
                      </SwellText>
                      <WindConditionsContainer>
                        <WindSpeedText
                          windSpeed={this.windSpeedQuality(
                            data[day].wind.speed
                          )}
                        >
                          <StyledFontAwesomeIcon icon={faWind} />
                          {data[day].wind.speed} mph
                        </WindSpeedText>
                        <WindDirectionText
                          windDirection={this.windDirectionQuality(
                            data[day].wind.shoreDirection
                          )}
                        >
                          <StyledFontAwesomeIcon
                            icon={faLocationArrow}
                            transform={{
                              rotate: data[day].wind.direction - 45
                            }}
                          />
                          {data[day].wind.shoreDirection}
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
          </>
        )}
      </Wrapper>
    )
  }
}
