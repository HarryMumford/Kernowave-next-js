import React from "react"
import { useRouter } from "next/router"
import BeachComponent from "../../../components/beach"
import { location } from "../../../constants"

import "isomorphic-unfetch"
import Forecast from "../../../helpers/forecast"
import TideForecast from "../../../helpers/tide-forecast"

const Beach = props => {
  const router = useRouter()
  const { id } = router.query
  return (
    <>{id ? <BeachComponent data={props.payload[id]} /> : <p>loading...</p>}</>
  )
}

const getTideData = async () => {
  const apiKey = "7d3a1acb861c47b2932bb2fbb6a65594"
  const headers = new Headers()

  headers.append("Ocp-Apim-Subscription-Key", apiKey)

  const res = await fetch(
    "https://admiraltyapi.azure-api.net/uktidalapi/api/V1/Stations/0002/TidalEvents",
    {
      headers
    }
  )

  const data = await res.json()

  return data
}

Beach.getInitialProps = async function() {
  let payload = {}

  const tideData = await getTideData()

  let tideForecast = new TideForecast(tideData).create()

  const locations = Object.keys(location)

  for (let i = 0; i < locations.length; i++) {
    const spotId = locations[i]

    const res = await fetch(
      `https://magicseaweed.com/api/e872632fcaa41717190e1812a493dc3b/forecast/?spot_id=${spotId}&units=uk`
    )
    const data = await res.json()

    let forecast = new Forecast(data).create()

    const onshoreDirection = location[spotId].onshoreDirection
    const name = location[spotId].name

    payload[spotId] = {
      name,
      onshoreDirection,
      forecast: forecast,
      tide: tideForecast
    }
  }

  return {
    payload
  }
}

export default Beach
