import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../Context';
import Loading from './Loading';
import { BsSearch } from "react-icons/bs";

const Home = () => {

  const {
    setIngredientes,
    cocktailDetails,
    cocktailListByIngredient,
    cocktailsArray,
    setCocktailsArray,
    ingredientArray,
    setIngredientArray,
    searchTerm,
    setSearchTerm,
    setOverlay
  } = useContext(AppContext)

  
  const getTestElement = async() =>{
    try{
      const data = await fetch("https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=11007");
      const res = await data.json()
      console.log(res.drinks[0])
    }catch(err){
      console.log(err)
    }finally{
      console.log('terminado')
    }
    
  }


  useEffect(() => {
   setOverlay(false)
    getTestElement()
  }, [])
  

  const [valueSearch,setValueSearch] = useState("")


  //select por nombres o por ingredientes
  const [byName,setByName] = useState(true);
  const [byIngredient,setByIngredient] = useState(false)

  
  const navigate = useNavigate()

  useEffect(() => {
    setIngredientes([])
    setCocktailsArray([])
    setIngredientArray([])
  }, [])
  

  //funcion que selecciona el tipo de busqueda
  const selectSearchType = (type) =>{
    if(type === "name"){
      setByName(true)
      setByIngredient(false)
    }else if(type === "ingredient"){
      setByName(false)
      setByIngredient(true)
    }
  }

  
  const getCocktailsByName = async(id) =>{
    try{
      const datos = await fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + id)
      const res = await datos.json(); 
      if(res.drinks === null){
        setCocktailsArray([])
      }else{
        setCocktailsArray(res.drinks);
      } 
    }catch(err){
      console.log(err)
    }
  }


  const getCocktailsByIngredient = async(id) =>{
    try{
      const datos = await fetch("https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" + id)
      const res = await datos.json();
      setCocktailsArray(res.drinks)
      setIngredientArray([])
    }catch(err){
      try{
        const ingredientes = await fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?i=" + id)
        const ires = await ingredientes.json()
        
        if(ires.ingredients === null){
          setIngredientArray([])
        }else{
          setIngredientArray(ires.ingredients)
          console.log(ires.ingredients)
        }
        
      }catch(err){
        console.log(err)
      }
      
      setCocktailsArray([])

    }
  }

  const hanldeChange = (e) =>{
    if(e.target.value === "") {
      setCocktailsArray([])
      setIngredientArray([])
    }else{
      
      if(byName === true && byIngredient === false){
        getCocktailsByName(e.target.value)
        
      }else if(byIngredient === true && byName === false){
        getCocktailsByIngredient(e.target.value)
        
      }
    }    
    setValueSearch(e.target.value)
  }
  

  const handleSubmit = (e) =>{
    e.preventDefault()
    setOverlay(false)
    
    if(valueSearch === ""){
      console.log('empty')
    }else{
      if(cocktailsArray.length !== 0){
        setIngredientArray([])
        setSearchTerm(valueSearch)
        navigate('/search')
        
      }else{
        if(ingredientArray.length !== 0){
          setCocktailsArray([])
          if(ingredientArray.length === 1){
            cocktailListByIngredient(ingredientArray[0].strIngredient)
            setSearchTerm(ingredientArray[0].strIngredient)
            navigate('/search')
          }
        }else{
          console.log('search faild')
        }
      }
    }
  }

  return (
    <>
      <section className='home__title__section'>
        <h1>COCKTAIL FINDER </h1>
      </section>

      <section className='home__search__section'>

        <div className='home__search__section-type-container'>
          <div 
          className={byName === false ?'home__search__section-type' : 'home__search__section-type-cta'} 
          onClick={()=>{
            setCocktailsArray([])
            setIngredientArray([])
            setValueSearch("")
            selectSearchType("name")
          }}
          >
            By name
          </div>
          <div 
          className={byIngredient === false ?'home__search__section-type' : 'home__search__section-type-cta'} 
          onClick={()=>{
            setCocktailsArray([])
            setIngredientArray([])
            selectSearchType("ingredient")
            setValueSearch("")
          }}
          >
            By Ingredient
          </div>
        </div>

        <form 
        onSubmit={handleSubmit}
        className='home__search__section-form'        
        >
          <input 
          className='home__search__section-input'
          type="text"
          placeholder={byIngredient === true ? 'search by ingredient' : 'search by name'}
          value={valueSearch}
          onChange={hanldeChange}
          />
          <button 
          className='home__search__section-button' 
          type='submit'
          ><BsSearch/></button>
        </form>
      </section>
      <div className='home__result-container'>
          {
            cocktailsArray.map((item)=>
              <Link
              key={item.idDrink}
              className='home__result-card' 
              to={`drink/${item.idDrink}`} 
              onClick={()=>{
                cocktailDetails(item.idDrink)
              }}
              >

                <div className='home__result-card-item'>
                  <img src={item.strDrinkThumb} alt=""  className='home__result-card-img'/>
                  <div>
                    <h4>{item.strDrink}</h4>
                    <h5>cocktail</h5>
                  </div>
                </div>
              
              </Link>
            )
          }
          {
            ingredientArray.map((item)=>
              <Link
              to={`/search`}
              className='home__result-card'
              onClick={()=>{
                cocktailListByIngredient(item.strIngredient)
                setSearchTerm(item.strIngredient)
              }} 
              >
                <div className='home__result-card-item'>
                <img src={"https://www.thecocktaildb.com/images/ingredients/" + item.strIngredient + ".png"} alt=""  className='home__result-card-img'/>
                  <div>
                    <h4>{item.strIngredient}</h4>
                    <h5>Ingredient</h5>
                  </div>
                </div>
              </Link>
            )
          }
      </div>      
    </>

  )
}

export default Home