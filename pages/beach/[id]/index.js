import React from "react"
import { useRouter } from "next/router"
import BeachComponent from "../../../components/beach"
import { location } from "../../../constants"

import "isomorphic-unfetch"
import { createForecast } from "../../../helpers/forecast"

const Beach = props => {
  const router = useRouter()
  const { id } = router.query
  return (
    <>{id ? <BeachComponent data={props.payload[id]} /> : <p>loading...</p>}</>
  )
}

Beach.getInitialProps = async function() {
  const locations = Object.keys(location)
  let payload = {}

  for (let i = 0; i < locations.length; i++) {
    const spotId = locations[i]

    const res = await fetch(
      `https://magicseaweed.com/api/e872632fcaa41717190e1812a493dc3b/forecast/?spot_id=${spotId}&units=uk`
    )
    const data = await res.json()

    const forecast = createForecast(data)

    const onshoreDirection = location[spotId].onshoreDirection
    const name = location[spotId].name

    payload[spotId] = {
      name,
      onshoreDirection,
      forecast
    }
  }

  return {
    payload
  }
}

export default Beach
