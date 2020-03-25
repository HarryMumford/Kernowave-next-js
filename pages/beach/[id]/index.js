import React from "react"
import { useRouter } from 'next/router'
import BeachComponent from "../../../components/beach"

const Beach = () => {
  const router = useRouter()
  const { id } = router.query

  console.log(id)
  return (
    <>
      {id ? 
        <BeachComponent id={id} /> : <p>loading...</p>
      }
      
    </>
  )
}

export default Beach