export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      accounts: {
        Row: {
          account_number: string
          balance: number | null
          created_at: string | null
          currency: string
          customer_id: number
          id: number
          status: string | null
          type: string
        }
        Insert: {
          account_number: string
          balance?: number | null
          created_at?: string | null
          currency: string
          customer_id: number
          id?: number
          status?: string | null
          type: string
        }
        Update: {
          account_number?: string
          balance?: number | null
          created_at?: string | null
          currency?: string
          customer_id?: number
          id?: number
          status?: string | null
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "accounts_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
        ]
      }
      currency_rates: {
        Row: {
          base_rate: number
          buy_rate: number
          code: string
          created_at: string | null
          id: number
          is_base: boolean | null
          name: string
          sell_rate: number
          symbol: string
        }
        Insert: {
          base_rate: number
          buy_rate: number
          code: string
          created_at?: string | null
          id?: number
          is_base?: boolean | null
          name: string
          sell_rate: number
          symbol: string
        }
        Update: {
          base_rate?: number
          buy_rate?: number
          code?: string
          created_at?: string | null
          id?: number
          is_base?: boolean | null
          name?: string
          sell_rate?: number
          symbol?: string
        }
        Relationships: []
      }
      customers: {
        Row: {
          address: string
          created_at: string | null
          dob: string
          email: string
          id: number
          id_number: string
          name: string
          password: string
          phone: string
          security_level: string | null
          status: string | null
          transaction_limit: number | null
          two_factor_enabled: boolean | null
          username: string
          verification_status: string | null
        }
        Insert: {
          address: string
          created_at?: string | null
          dob: string
          email: string
          id?: number
          id_number: string
          name: string
          password: string
          phone: string
          security_level?: string | null
          status?: string | null
          transaction_limit?: number | null
          two_factor_enabled?: boolean | null
          username: string
          verification_status?: string | null
        }
        Update: {
          address?: string
          created_at?: string | null
          dob?: string
          email?: string
          id?: number
          id_number?: string
          name?: string
          password?: string
          phone?: string
          security_level?: string | null
          status?: string | null
          transaction_limit?: number | null
          two_factor_enabled?: boolean | null
          username?: string
          verification_status?: string | null
        }
        Relationships: []
      }
      savings_goals: {
        Row: {
          created_at: string | null
          current_amount: number | null
          customer_id: number
          id: number
          monthly_contribution: number
          target_amount: number
          target_date: string
          title: string
        }
        Insert: {
          created_at?: string | null
          current_amount?: number | null
          customer_id: number
          id?: number
          monthly_contribution: number
          target_amount: number
          target_date: string
          title: string
        }
        Update: {
          created_at?: string | null
          current_amount?: number | null
          customer_id?: number
          id?: number
          monthly_contribution?: number
          target_amount?: number
          target_date?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "savings_goals_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
        ]
      }
      transactions: {
        Row: {
          account_id: number
          amount: number
          created_at: string | null
          description: string
          id: number
          recipient_account_id: number | null
          status: string | null
          type: string
        }
        Insert: {
          account_id: number
          amount: number
          created_at?: string | null
          description: string
          id?: number
          recipient_account_id?: number | null
          status?: string | null
          type: string
        }
        Update: {
          account_id?: number
          amount?: number
          created_at?: string | null
          description?: string
          id?: number
          recipient_account_id?: number | null
          status?: string | null
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "transactions_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transactions_recipient_account_id_fkey"
            columns: ["recipient_account_id"]
            isOneToOne: false
            referencedRelation: "accounts"
            referencedColumns: ["id"]
          },
        ]
      }
      verification_documents: {
        Row: {
          admin_notes: string | null
          back_image_url: string
          created_at: string | null
          customer_id: number
          document_type: string
          front_image_url: string
          id: number
          status: string | null
          updated_at: string | null
        }
        Insert: {
          admin_notes?: string | null
          back_image_url: string
          created_at?: string | null
          customer_id: number
          document_type: string
          front_image_url: string
          id?: number
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          admin_notes?: string | null
          back_image_url?: string
          created_at?: string | null
          customer_id?: number
          document_type?: string
          front_image_url?: string
          id?: number
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "verification_documents_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
