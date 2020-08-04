import Link from "next/link"
import React from "react"
import Logo from "../style/components/Logo"
import Header from "../style/components/Header"
import Footer from "../style/components/Footer"
import Heading from "../style/components/Heading"
import Section from "../style/components/Section"
import Wrapper from "../style/components/Wrapper"
import Slider from "./slider"
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
    const { forecast } = this.props.data
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
              <title>{data.name}</title>
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
              <Heading>{data.name}</Heading>
            </Header>
            <Section>
              <Slider forecast={forecast} />
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
