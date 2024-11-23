const { createClient } = require('@supabase/supabase-js')
const dotenv = require('dotenv')
dotenv.config()

const domain = process.env.SUPABASE_DOMAIN
const supabase_public_key = process.env.SUPABASE_PUBLIC_KEY

const supabase = createClient(domain, supabase_public_key)

const spoon_key = process.env.SPOONACULAR_KEY
let global_user = '' 

const {login, logout} = require('./utils/supabase')

async function trackRecipe(user, recipe){
  
  return
}

async function searchRecipe(parameters, user){
  const endpoint = 'https://api.spoonacular.com/recipes/complexSearch';
  const params = new URLSearchParams({
    apiKey: spoon_key,
    cuisune: parameters[0] || '',
    maxReadyTime: parameters[1] || '',
    diet: parameters[2] || '',
    includeIngredients: parameters[3] || '',
    number: 1
  })
  try {
    const response = await fetch(`${endpoint}?${params.toString()}`)
    if (!response.ok){
      throw new Error(`Error: ${response.status}`)
    }
    const data = await response.json()
    return data.results[0].title
  } catch(error)
  console.error("Error finding recipes")
  throw error
}

async function addRecipe(name, cuisine_, time, diet_, main_ingredient){
  let inRecipe = {
    title: name,
    cuisine: cuisine_,
    maxReadyTime: time,
    diet: diet_,
    includeIngredients: main_ingredient
  }
  return
}

module.exports = {
    searchRecipe,
    addRecipe
}
