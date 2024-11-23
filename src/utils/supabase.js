import { createClient } from "@supabase/supabase-js";

/**
 * @type {import('@supabase/supabase-js').SupabaseClient}
 */
export let supabase = null;

export function initSupabase() {
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_KEY) {
    console.error(
      "Supabase initialization error: Missing SUPABASE_URL or SUPABASE_SERVICE_KEY environment variables."
    );
    process.exit(1);
  }

  try {
    if (!supabase) {
      supabase = createClient(
        process.env.SUPABASE_URL,
        process.env.SUPABASE_SERVICE_KEY
      );
      console.log("Supabase client initialized successfully.");
    }
  } catch (error) {
    console.error("Error initializing Supabase client:", error.message);
    process.exit(1);
  }
}
