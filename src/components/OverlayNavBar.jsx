import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from '../Context'

const OverlayNavBar = ({cocktailList,ingredientList,setValueSearch}) => {

  const {overlay,cocktailDetails,setOverlay,setIngredientes,ingredientes,deleteIngredients,cocktailListByIngredient,setSearchTerm} = useContext(AppContext)

  const navigate = useNavigate()


  return (
    <div className={overlay === false ? 'overlayy' : 'overlay-cta'}>
      <div className='overlay__card-container'>
        {
          cocktailList.map((item) =>
            <div
            onClick={()=>{
              console.log(item)
              setOverlay(false)
              cocktailDetails(item.idDrink)
              navigate(`/drink/${item.idDrink}`)
              setValueSearch("")
            }}
            className='overlay__card-box'
            >
              <img src={item.strDrinkThumb} alt="" className='search__img'/>
              <div>
                  <h4>{item.strDrink}</h4>
                  <span>cocktail</span>
              </div>
              
            </div>          
          )
        }
        {
          ingredientList.map((item)=>
            <div 
            key={item.idIngredient} 
            className='overlay__card-box'
            onClick={()=>{
              setOverlay(false)
              cocktailListByIngredient(item.strIngredient)
              setSearchTerm(item.strIngredient)
              setValueSearch("")
              console.log('funciona')
              navigate(`/search`)
            }}
            >
                <img src={"https://www.thecocktaildb.com/images/ingredients/" + item.strIngredient + ".png"} alt="" className="search__img" />
                <div>
                  <h4>{item.strIngredient}</h4>
                  <span>ingredient</span>
                </div>
            </div>
          )
        }
      </div>
     
    </div>
  )
}

export default OverlayNavBar