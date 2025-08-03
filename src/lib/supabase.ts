// Configuración de Supabase para Diego Chapiero Estilista
// TODO: Conectar cuando se active la integración de Supabase

/*
// Una vez conectado Supabase, usar esta configuración:
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL!
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)

// Tipos para TypeScript
export interface Cliente {
  id: string
  nombre: string
  apellido: string
  fecha_cumple: string
  historial: Array<{
    servicio: string
    fecha: string
    precio: number
  }>
  creado_en: string
}

// Funciones API que se conectarán con Supabase:

export const clientesAPI = {
  // Obtener todos los clientes
  getAll: async () => {
    const { data, error } = await supabase
      .from('clientes')
      .select('*')
      .order('creado_en', { ascending: false })
    
    if (error) throw error
    return data
  },

  // Crear nuevo cliente
  create: async (cliente: Omit<Cliente, 'id' | 'creado_en'>) => {
    const { data, error } = await supabase
      .from('clientes')
      .insert([cliente])
      .select()
    
    if (error) throw error
    return data[0]
  },

  // Actualizar cliente
  update: async (id: string, cliente: Partial<Cliente>) => {
    const { data, error } = await supabase
      .from('clientes')
      .update(cliente)
      .eq('id', id)
      .select()
    
    if (error) throw error
    return data[0]
  },

  // Eliminar cliente
  delete: async (id: string) => {
    const { error } = await supabase
      .from('clientes')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  },

  // Obtener cumpleaños próximos
  getUpcomingBirthdays: async () => {
    const { data, error } = await supabase
      .rpc('get_proximos_cumpleanos')
    
    if (error) throw error
    return data
  }
}
*/

// Mock data mientras se conecta Supabase
export const mockClientesAPI = {
  getAll: () => Promise.resolve([]),
  create: (cliente: any) => Promise.resolve(cliente),
  update: (id: string, cliente: any) => Promise.resolve(cliente),
  delete: (id: string) => Promise.resolve(),
  getUpcomingBirthdays: () => Promise.resolve([])
}

console.log("⚠️  Usando datos mock - Conectar Supabase para funcionalidad completa");