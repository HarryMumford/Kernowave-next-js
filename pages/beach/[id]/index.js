import React from "react"
import { useRouter } from "next/router"
import BeachComponent from "../../../components/beach"
import { location } from "../../../constants"

import "isomorphic-unfetch"

const Beach = props => {
  const router = useRouter()
  const { id } = router.query
  return (
    <>{id ? <BeachComponent data={props.data[id]} /> : <p>loading...</p>}</>
  )
}

Beach.getInitialProps = async function() {
  const locations = Object.keys(location)
  const data = {}

  for (let i = 0; i < locations.length; i++) {
    const spotId = locations[i]
    const res = await fetch(
      `https://magicseaweed.com/api/e872632fcaa41717190e1812a493dc3b/forecast/?spot_id=${spotId}&units=uk`
    )
    const forecast = await res.json()
    const onshoreDirection = location[spotId].onshoreDirection
    const name = location[spotId].name

    data[spotId] = {
      spotId: Number(spotId),
      name,
      onshoreDirection,
      forecast: forecast
    }
  }

  return {
    data
  }
}

export default Beach
