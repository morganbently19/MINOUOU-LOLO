export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      customers: {
        Row: {
          id: number;
          created_at: string;
          name: string;
          email: string;
          phone: string;
          address: string;
          id_number: string;
          dob: string;
          status: string;
          security_level: string;
          transaction_limit: number;
          two_factor_enabled: boolean;
          username: string;
          password: string;
        };
        Insert: {
          id?: number;
          created_at?: string;
          name: string;
          email: string;
          phone: string;
          address: string;
          id_number: string;
          dob: string;
          status?: string;
          security_level?: string;
          transaction_limit?: number;
          two_factor_enabled?: boolean;
          username: string;
          password: string;
        };
        Update: {
          id?: number;
          created_at?: string;
          name?: string;
          email?: string;
          phone?: string;
          address?: string;
          id_number?: string;
          dob?: string;
          status?: string;
          security_level?: string;
          transaction_limit?: number;
          two_factor_enabled?: boolean;
          username?: string;
          password?: string;
        };
      };
      accounts: {
        Row: {
          id: number;
          created_at: string;
          customer_id: number;
          account_number: string;
          type: string;
          currency: string;
          balance: number;
          status: string;
        };
        Insert: {
          id?: number;
          created_at?: string;
          customer_id: number;
          account_number: string;
          type: string;
          currency: string;
          balance?: number;
          status?: string;
        };
        Update: {
          id?: number;
          created_at?: string;
          customer_id?: number;
          account_number?: string;
          type?: string;
          currency?: string;
          balance?: number;
          status?: string;
        };
      };
      transactions: {
        Row: {
          id: number;
          created_at: string;
          account_id: number;
          type: string;
          amount: number;
          description: string;
          status: string;
          recipient_account_id: number | null;
        };
        Insert: {
          id?: number;
          created_at?: string;
          account_id: number;
          type: string;
          amount: number;
          description: string;
          status?: string;
          recipient_account_id?: number | null;
        };
        Update: {
          id?: number;
          created_at?: string;
          account_id?: number;
          type?: string;
          amount?: number;
          description?: string;
          status?: string;
          recipient_account_id?: number | null;
        };
      };
      currency_rates: {
        Row: {
          id: number;
          created_at: string;
          code: string;
          name: string;
          symbol: string;
          base_rate: number;
          buy_rate: number;
          sell_rate: number;
          is_base: boolean;
        };
        Insert: {
          id?: number;
          created_at?: string;
          code: string;
          name: string;
          symbol: string;
          base_rate: number;
          buy_rate: number;
          sell_rate: number;
          is_base?: boolean;
        };
        Update: {
          id?: number;
          created_at?: string;
          code?: string;
          name?: string;
          symbol?: string;
          base_rate?: number;
          buy_rate?: number;
          sell_rate?: number;
          is_base?: boolean;
        };
      };
      savings_goals: {
        Row: {
          id: number;
          created_at: string;
          customer_id: number;
          title: string;
          current_amount: number;
          target_amount: number;
          target_date: string;
          monthly_contribution: number;
        };
        Insert: {
          id?: number;
          created_at?: string;
          customer_id: number;
          title: string;
          current_amount?: number;
          target_amount: number;
          target_date: string;
          monthly_contribution: number;
        };
        Update: {
          id?: number;
          created_at?: string;
          customer_id?: number;
          title?: string;
          current_amount?: number;
          target_amount?: number;
          target_date?: string;
          monthly_contribution?: number;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
