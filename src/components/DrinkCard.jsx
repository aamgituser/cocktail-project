import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../Context'
import Loading from './Loading';
import NavBar from './NavBar';

const DrinkCard = () => {
  const {selectDrink, ingredientes} = useContext(AppContext);

  useEffect(() => {
    console.log(selectDrink.strDrinkThumb)
  }, [])
  

  return (
    <>
      <NavBar/>
      <main className='cocktail__card-bg'>
        <div className='cocktail__card-box-container'>
          <div className='cocktail__card-box-header'>
            <img src={selectDrink.strDrinkThumb} alt="" className='cocktail__card-box-img'/>

          </div>
          <div className='cocktail__card-box-info'>
            <h1>{selectDrink.strDrink}</h1>
            <h2>Instructions</h2>
            <p>{selectDrink.strInstructions}</p>
          </div>
          <div className='cocktail__card-box-ingredients'>
            <div className='cocktail__card-box-ingredients-title'>
              <h2>Ingredients</h2>
            </div>
            <div className='cocktail__card-box-ingredients-grid'>
              {
                ingredientes.map((item)=>
                  <div className='cocktail__card-box-ingredients-grid-item'>
                    <img src={"https://www.thecocktaildb.com/images/ingredients/" + item + ".png"} alt="im" className='cocktail__card-box-ingredients-grid-item-img' />
                    <div className='cocktail__card-box-ingredients-grid-item-name'>{item}</div>
                  </div>
                )
              }

            </div>
          </div>
        </div>
      </main>
    </>


  )
}

export default DrinkCard