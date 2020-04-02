import React from "react"
import { useRouter } from 'next/router'
import BeachComponent from "../../../components/beach"

const Beach = () => {
  const router = useRouter()
  const { id } = router.query
  return (
    <>
      {id ? 
        <BeachComponent id={id} /> : <p>loading...</p>
      }
    </>
  )
}

export default Beach