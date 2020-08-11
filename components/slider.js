import React from "react"
import StyledSlider from "../style/components/StyledSlider"
import DailyForecast from "./DailyForecast"
import { useState, useEffect } from "react"
import DailyForecastContainer from "../style/components/DailyForecastContainer"
import MoreDetails from "./MoreDetails"

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
  const [moreDetails, setMoreDetails] = useState(false)

  return (
    <StyledSlider {...settings}>
      {props.forecast.map(dailyForecast => {
        return (
          <DailyForecastContainer
            onClick={() => setMoreDetails(!moreDetails)}
            onMouseDown={e => e.preventDefault()}
          >
            {moreDetails ? (
              <MoreDetails data={dailyForecast}></MoreDetails>
            ) : (
              <DailyForecast data={dailyForecast}></DailyForecast>
            )}
          </DailyForecastContainer>
        )
      })}
    </StyledSlider>
  )
}
