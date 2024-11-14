import { createClient } from '@supabase/supabase-js'
const PROJECT_URL = import.meta.env.VITE_SUPABASE_URL
const API_KEY = import.meta.env.VITE_SUPABASE_API_KEY

// Create a single supabase client for interacting with your database
export const supabase = createClient(PROJECT_URL, API_KEY)
