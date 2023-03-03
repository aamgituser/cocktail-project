import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import RenderCard from './components/RenderCard'
import SearchResult from './components/SearchResult'

const ProjectRoutes = () => {
  return (
    <Routes>
       <Route index element={<Home/>}/>
       <Route path='/' element={<Home/>}/>
       <Route path='/drink/:id' element={<RenderCard/>}/>
       <Route path='/search' element={<SearchResult/>}/>
    </Routes>
  )
}

export default ProjectRoutes