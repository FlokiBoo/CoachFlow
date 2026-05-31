import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://hlstidtwhpjqqsljusvo.supabase.co'
const supabaseKey = 'sb_publishable_F5bD3lqN-sa8FePJSVxOpw_R0v7LrJY'

export const supabase = createClient(supabaseUrl, supabaseKey)