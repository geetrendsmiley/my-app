import { supabase } from './supabaseClient'

// Generic API service that any folder can use
export const apiService = {
  // Auth APIs
  auth: {
    async getCurrentUser() {
      const { data: { user } } = await supabase.auth.getUser()
      return user
    },
    async updateProfile(updates) {
      const { data, error } = await supabase.auth.updateUser({
        data: updates
      })
      if (error) throw error
      return data
    }
  },

  // User APIs (for user folder)
  users: {
    async getProfile(userId) {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()
      if (error) throw error
      return data
    },
    async updateProfile(userId, updates) {
      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', userId)
      if (error) throw error
      return data
    }
  },

  // Dashboard APIs
  dashboard: {
    async getStats(userId) {
      const { data, error } = await supabase
        .from('dashboard_stats')
        .select('*')
        .eq('user_id', userId)
        .single()
      if (error) throw error
      return data
    },
    async getRecentActivity(userId, limit = 10) {
      const { data, error } = await supabase
        .from('activity_logs')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(limit)
      if (error) throw error
      return data
    }
  },

  // Client APIs
  clients: {
    async getProjects(userId) {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('client_id', userId)
      if (error) throw error
      return data
    },
    async getInvoices(userId) {
      const { data, error } = await supabase
        .from('invoices')
        .select('*, projects(name)')
        .eq('client_id', userId)
      if (error) throw error
      return data
    }
  },

  // Admin APIs
  admin: {
    async getAllUsers() {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false })
      if (error) throw error
      return data
    },
    async getReports() {
      const { data, error } = await supabase
        .from('reports')
        .select('*')
        .order('created_at', { ascending: false })
      if (error) throw error
      return data
    },
    async updateUserRole(userId, role) {
      const { data, error } = await supabase
        .from('profiles')
        .update({ role })
        .eq('id', userId)
      if (error) throw error
      return data
    }
  }
}