import Link from "next/link"
import React from "react"
import StyledSlider from "../style/components/StyledSlider"
import DailyForecast from "./DailyForecast"

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
          <Link href="/beach/[id]/[day]" key={dailyForecast.day}>
            <DailyForecast dailyForecast={dailyForecast}></DailyForecast>
          </Link>
        )
      })}
    </StyledSlider>
  )
}
