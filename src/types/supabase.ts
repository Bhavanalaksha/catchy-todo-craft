
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      tasks: {
        Row: {
          id: string
          created_at: string
          text: string
          completed: boolean
          category: string
          priority: string
          user_id: string
        }
        Insert: {
          id?: string
          created_at?: string
          text: string
          completed?: boolean
          category: string
          priority: string
          user_id: string
        }
        Update: {
          id?: string
          created_at?: string
          text?: string
          completed?: boolean
          category?: string
          priority?: string
          user_id?: string
        }
      }
      profiles: {
        Row: {
          id: string
          email: string
          created_at: string
        }
        Insert: {
          id: string
          email: string
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          created_at?: string
        }
      }
    }
    Views: {}
    Functions: {}
  }
}
