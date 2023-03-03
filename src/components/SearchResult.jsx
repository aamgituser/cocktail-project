import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import { AppContext } from '../Context'
import NavBar from './NavBar';

const SearchResult = () => {
  
  const {cocktailsArray,searchTerm,cocktailDetails} = useContext(AppContext);


  return (
    <>
      <NavBar/>
      <main className='search__result-bg'>
        <section className='search__result-container'>
          <h2 className='search__result-title'>Results for: {searchTerm}...</h2>
          <div className='search__result-list-container'>
            {
              cocktailsArray.map((item)=>
                <Link
                onClick={()=>{cocktailDetails(item.idDrink)}}
                to={`/drink/${item.idDrink}`}
                className='search__result-link'
                >
                  <div className='search__result-list-item'>
                    <img src={item.strDrinkThumb} alt="im" className='search__img'/>
                    <div>
                      <h3>{item.strDrink}</h3>
                      <h4>Cocktail</h4>
                    </div>
                  </div>
                </Link>
              )
            }
          </div>
        </section>
      </main>

    </>
  )
}

export default SearchResult