import { createContext, useState } from "react";

export const AppContext = createContext();

export const AppContextProvider = (props) =>{
  
  const [loading,setLoading] = useState(false)
  const [searchTerm,setSearchTerm] = useState("")
  const [selectDrink,setSelectDrink] = useState({})
  const [ingredientes,setIngredientes] = useState([])
  const [ingredientsList,setIngredientsList] = useState([]);
  const [cocktailsArray,setCocktailsArray] = useState([])
  const [ingredientArray,setIngredientArray] = useState([])
  const [overlay,setOverlay] = useState(false)

    const cocktailDetails = async(id) =>{
      try{
        console.log('inicia la peticion')
        setLoading(true)
        const data = await fetch("https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + id);
        const res = await data.json();
        setSelectDrink(res.drinks[0])
        //setIngredientes([])

        const cocktail = res.drinks[0]


        if(ingredientes.length === 0){
          for(const propiedad in cocktail){
            if(propiedad.toString().toLowerCase().includes('stringredient') === true){
              if(cocktail[propiedad] !== null){
                const array = ingredientes;
                array.push(cocktail[propiedad]);
                setIngredientes(array)
              }
            }
          }
        }else{
          const array1 = []
          for(const propiedad in cocktail){
            if(propiedad.toString().toLowerCase().includes('stringredient') === true){
              if(cocktail[propiedad] !== null){
                const array = array1;
                array.push(cocktail[propiedad]);
                setIngredientes(array)
              }
            }
          }
        }

      }catch(err){
        console.log(err)
      }finally{
        console.log('finalzo')
        setLoading(false)
      }
    }
    
    const cocktailListByIngredient = async(ingredient)=>{
      try{
        const data = await fetch("https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" + ingredient)
        const res = await data.json()
        setCocktailsArray(res.drinks)
      }catch(err){
        console.log(err)
      }
    }

    const deleteIngredients = () =>{
      setIngredientes([])
    }

    return(
        <AppContext.Provider value={{selectDrink,setSelectDrink,ingredientes,setIngredientes,cocktailDetails,cocktailListByIngredient,cocktailsArray,setCocktailsArray,ingredientArray,setIngredientArray,ingredientsList,setIngredientsList,searchTerm,setSearchTerm,overlay,setOverlay,loading,setLoading,deleteIngredients}}>
            {props.children}
        </AppContext.Provider>
    )
}