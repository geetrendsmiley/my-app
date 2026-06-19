import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)

// Reusable database helpers
export const db = {
  // Generic fetch with filters
  async get(table, options = {}) {
    let query = supabase.from(table).select(options.select || '*')
    
    if (options.eq) {
      const [column, value] = options.eq
      query = query.eq(column, value)
    }
    if (options.order) {
      query = query.order(options.order.column, { ascending: options.order.ascending })
    }
    if (options.limit) {
      query = query.limit(options.limit)
    }
    
    const { data, error } = await query
    if (error) throw error
    return data
  },

  // Insert data
  async insert(table, data) {
    const { data: result, error } = await supabase
      .from(table)
      .insert(data)
      .select()
    if (error) throw error
    return result
  },

  // Update data
  async update(table, id, data) {
    const { data: result, error } = await supabase
      .from(table)
      .update(data)
      .eq('id', id)
      .select()
    if (error) throw error
    return result
  },

  // Delete data
  async delete(table, id) {
    const { error } = await supabase.from(table).delete().eq('id', id)
    if (error) throw error
    return true
  }
}