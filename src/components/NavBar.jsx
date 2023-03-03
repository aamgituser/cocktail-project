import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../Context'
import OverlayNavBar from './OverlayNavBar'
import { BsSearch } from "react-icons/bs";

const NavBar = () => {
  const {
    setOverlay,
    setSearchTerm,
    setCocktailsArray,
    setIngredientArray,
    cocktailListByIngredient
  } = useContext(AppContext)

  const navigate = useNavigate()

  const [valueSearch,setValueSearch] = useState("")
  const [byName,setByName] = useState(true);
  const [byIngredient,setByIngredient] = useState(false)
  const [cocktailList,setCocktailList] = useState([]);
  const [ingredientList,setIngredientList] = useState([]);

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
      const datos = await fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + id);
      const res = await datos.json();
      if(res.drinks === null){
        console.log('no matches')
        setCocktailList([])
      }else{
        setCocktailList(res.drinks)
      }

    }catch(err){
      console.log(err)
    }
  }


  const getCocktailsByIngredient = async(id) =>{
    try{
      const datos = await fetch("https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" + id);
      const res = await datos.json()
      setCocktailList(res.drinks)
      setIngredientList([])
    }catch(err){
      try{
        const ingredientes = await fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?i=" + id)
        const ires = await ingredientes.json()
        if(ires.ingredients === null){
          setIngredientList([])
        }else{
          setIngredientList(ires.ingredients)
        }

      }catch(err){
        console.log(err)
      }
      
      setCocktailList([])
    }
  }


  const handleChange = (e) =>{
    
    setOverlay(true)

    if(e.target.value === ""){
      setOverlay(false)
      setCocktailList([])
      setIngredientList([])
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
      console.log("empty")
    }else{
      if(cocktailList.length !== 0){
        setCocktailsArray(cocktailList)
        setIngredientArray([])
        setSearchTerm(valueSearch)
        navigate('/search')
      }else{
        if(ingredientList.length !==0){
          setCocktailsArray([])
          if(ingredientList.length === 1){
            cocktailListByIngredient(ingredientList[0].strIngredient)
            setSearchTerm(ingredientList[0].strIngredient)
            navigate('/search')
          }else{
            console.log('search fail')
          }
        }
      }
    }
    setValueSearch("")
  }

  return (
    <>
    <header className='nav__bar-container'>
      
      <div 
      className='nav__bar-appName' onClick={()=>{navigate('/')}}
      >
        COCKTAIL FINDER
      </div>

      <div className='nav__bar-search'>

        <div className='nav__bar-search-type-container'>
          <div 
          className={byName === true ?'nav__bar-search-type-cta' : 'nav__bar-search-type'}
          onClick={()=>{
            setCocktailList([])
            setIngredientList([])
            setOverlay(false)
            selectSearchType("name")
            setValueSearch("")
          }}
          >
            By name
          </div>
          <div 
          className={byIngredient === true ?'nav__bar-search-type-cta' : 'nav__bar-search-type'}
          onClick={()=>{
            setCocktailList([])
            setIngredientList([])
            setOverlay(false)
            selectSearchType("ingredient")
            setValueSearch("")
          }}
          >
            By ingredient
          </div>
        </div>
        
        <form 
        className='nav__bar-search-form'
        onSubmit={handleSubmit}
        >
          <input 
          type="text" 
          placeholder={byName === true ? 'search by name' : 'search by ingredient'}
          className='nav__bar-search-form-input'
          value={valueSearch}
          onChange={handleChange}
          />
          <button 
          type='submit'
          className='nav__bar-search-form-button'
          onClick={()=>{setOverlay(false)}}
          >
            <BsSearch/>
          </button>
        </form>
      
      </div>     
    </header>

      <OverlayNavBar 
      setValueSearch = {setValueSearch}
      cocktailList = {cocktailList}
      ingredientList = {ingredientList}
      />
    </>


  )
}

export default NavBar