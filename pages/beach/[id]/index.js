import React from "react"
import { useRouter } from "next/router"
import BeachComponent from "../../../components/beach"

import "isomorphic-unfetch"

const Beach = props => {
  const router = useRouter()
  const { id } = router.query
  return (
    <>{id ? <BeachComponent data={props.data} id={id} /> : <p>loading...</p>}</>
  )
}

Beach.getInitialProps = async function() {
  const res = await fetch(
    `https://magicseaweed.com/api/e872632fcaa41717190e1812a493dc3b/forecast/?spot_id=8`
  )
  const data = await res.json()

  return {
    data
  }
}

export default Beach
