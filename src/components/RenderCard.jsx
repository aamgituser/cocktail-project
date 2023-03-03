import React, { useContext } from 'react'
import { AppContext } from '../Context'
import DrinkCard from './DrinkCard'
import Loading from './Loading'

const RenderCard = () => {
  const {loading} = useContext(AppContext)
  return (
    <>
    {
      loading === true ? <Loading/> : <DrinkCard/>
    }
    </>
  )
}

export default RenderCard