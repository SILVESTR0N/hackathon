const { createClient } = require('@supabase/supabase-js')
const dotenv = require('dotenv')
dotenv.config()

const domain = process.env.SUPABASE_DOMAIN
const supabase_public_key = process.env.SUPABASE_PUBLIC_KEY

const supabase = createClient(domain, supabase_public_key)

const spoon_key = process.env.SPOONACULAR_KEY

async function trackRecipe(recipe){
  return
}

async function searchRecipe(cuisine, time, diet, main_ingredient){
  const endpoint = 'https://api.spoonacular.com/recipes/complexSearch';

  const params = new URLSearchParams({
    apiKey: spoon_key,
    cuisune: cuisine,
    maxReadyTime: time,
    diet: diet,
    includeIngredients: main_ingredient,
    number: 1
  })
  try {
    const response = await fetch(`${endpoint}?${params.toString()}`)
    if (!response.ok){
      throw new Error(`Error: ${response.status}`)
    }
    const data = await response.json()
    return data.results
  } catch(error)
  console.error("Error finding recipes")
  throw error
}

async function addRecipe(cuisine, time, diet, main_ingredient, intolerances){
  return
}

