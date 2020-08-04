import Link from "next/link"
import React from "react"
import DailyForecast from "../style/components/DailyForecast"
import SwellText from "../style/components/SwellText"
import Subheading from "../style/components/Subheading"
import StyledSlider from "../style/components/StyledSlider"
import WindSpeedText from "../style/components/WindSpeedText"
import WindDirectionText from "../style/components/WindDirectionText"
import StyledFontAwesomeIcon from "../style/components/StyledFontAwesomeIcon"
import WindConditionsContainer from "../style/components/WindConditionsContainer"
import { faLocationArrow } from "@fortawesome/free-solid-svg-icons"
import { faWind } from "@fortawesome/free-solid-svg-icons"

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

export default function Slider(props) {
  return (
    <StyledSlider {...settings}>
      {props.forecast.map(dailyForecast => {
        return (
          <DailyForecast
            style={{ backgroundColor: "red" }}
            key={dailyForecast.day}
          >
            <Link href="/beach/[id]/[day]">
              <Subheading>{dailyForecast.day}</Subheading>
            </Link>
            <SwellText quality={dailyForecast.quality.overall}>
              {dailyForecast.waveHeight} ft
            </SwellText>
            <WindConditionsContainer>
              <WindSpeedText windSpeed={dailyForecast.quality.windSpeed}>
                <StyledFontAwesomeIcon icon={faWind} />
                {dailyForecast.windSpeed} mph
              </WindSpeedText>
              <WindDirectionText
                windDirection={dailyForecast.quality.windDirection}
              >
                <StyledFontAwesomeIcon
                  icon={faLocationArrow}
                  transform={{
                    rotate: dailyForecast.windDirection - 45
                  }}
                />
                {dailyForecast.windRelativeDirection}
              </WindDirectionText>
            </WindConditionsContainer>
          </DailyForecast>
        )
      })}
    </StyledSlider>
  )
}
