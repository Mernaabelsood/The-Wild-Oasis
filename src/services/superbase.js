

import { createClient } from '@supabase/supabase-js'
export const supabaseUrl = 'https://iddflntaamppoqpkcvcc.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlkZGZsbnRhYW1wcG9xcGtjdmNjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgzMDk4MzAsImV4cCI6MjA1Mzg4NTgzMH0.-BL3QMP7poyqjR24XafMWTbQjIM7EINlEUI1Yi67Xck"
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;