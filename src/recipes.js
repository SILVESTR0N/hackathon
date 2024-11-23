const { createClient } = require('@supabase/supabase-js')
const dotenv = require('dotenv')
dotenv.config()

const domain = process.env.SUPABASE_DOMAIN
const supabase_public_key = process.env.SUPABASE_PUBLIC_KEY

const supabase = createClient(domain, supabase_public_key)

const spoon_key = process.env.SPOONACULAR_KEY

const {login, logout} = require('./supabase')

async function trackRecipe(recipe){
  
  return
}

async function searchRecipe(cuisine, time, diet, main_ingredient){
  return
}

async function addRecipe(cuisine, time, diet, main_ingredient){
  return
}

