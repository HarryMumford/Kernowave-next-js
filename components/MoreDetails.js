import { useEffect, useState } from "react"
import "isomorphic-unfetch"
import Subheading from "../style/components/Subheading"
import TideData from "../style/components/TideData"

const DailyForecastComponent = props => {
  const { data, day } = props

  const displayTideType = (tide, key) => {
    const tideType = Object.keys(tide)
    const tideTime = tide[tideType]

    if (tideType == "LowWater") {
      return (
        <TideData key={key} tide={2}>
          Low {tideTime}
        </TideData>
      )
    } else {
      return (
        <TideData key={key} tide={0}>
          High {tideTime}
        </TideData>
      )
    }
  }

  return (
    <>
      <Subheading>Tides</Subheading>
      {data[day].map((tide, index) => {
        const keys = [0, 1, 2, 3]
        const key = keys[index]
        return displayTideType(tide, key)
      })}
    </>
  )
}

export default DailyForecastComponent
