import React from 'react'
import { RiLoader5Line } from "react-icons/ri";

const Loading = () => {
  return (
    <div className='loading__bg'>
      <h2>Loading...</h2>
      <div className='loading__container'>
         <RiLoader5Line className='loading__icon'/> 
      </div>
    </div>
  )
}

export default Loading