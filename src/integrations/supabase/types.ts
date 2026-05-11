export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      badges: {
        Row: {
          code: string
          created_at: string
          criteria: Json | null
          description: string | null
          icon: string | null
          id: string
          name: string
        }
        Insert: {
          code: string
          created_at?: string
          criteria?: Json | null
          description?: string | null
          icon?: string | null
          id?: string
          name: string
        }
        Update: {
          code?: string
          created_at?: string
          criteria?: Json | null
          description?: string | null
          icon?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      career_roadmaps: {
        Row: {
          created_at: string
          duration_months: number
          goal: string
          id: string
          roadmap: Json
          user_id: string
        }
        Insert: {
          created_at?: string
          duration_months?: number
          goal: string
          id?: string
          roadmap: Json
          user_id: string
        }
        Update: {
          created_at?: string
          duration_months?: number
          goal?: string
          id?: string
          roadmap?: Json
          user_id?: string
        }
        Relationships: []
      }
      certificates: {
        Row: {
          course: string
          full_name: string
          id: string
          issued_at: string
          level: string | null
          score: number
          total: number
          user_id: string
        }
        Insert: {
          course: string
          full_name: string
          id?: string
          issued_at?: string
          level?: string | null
          score: number
          total: number
          user_id: string
        }
        Update: {
          course?: string
          full_name?: string
          id?: string
          issued_at?: string
          level?: string | null
          score?: number
          total?: number
          user_id?: string
        }
        Relationships: []
      }
      coupons: {
        Row: {
          active: boolean
          code: string
          created_at: string
          expiry_date: string | null
          id: string
          times_used: number
          type: string
          usage_limit: number | null
          value: number
        }
        Insert: {
          active?: boolean
          code: string
          created_at?: string
          expiry_date?: string | null
          id?: string
          times_used?: number
          type: string
          usage_limit?: number | null
          value?: number
        }
        Update: {
          active?: boolean
          code?: string
          created_at?: string
          expiry_date?: string | null
          id?: string
          times_used?: number
          type?: string
          usage_limit?: number | null
          value?: number
        }
        Relationships: []
      }
      daily_challenges: {
        Row: {
          category: string
          challenge_date: string
          created_at: string
          id: string
          ideal_answer: string | null
          question: string
        }
        Insert: {
          category: string
          challenge_date: string
          created_at?: string
          id?: string
          ideal_answer?: string | null
          question: string
        }
        Update: {
          category?: string
          challenge_date?: string
          created_at?: string
          id?: string
          ideal_answer?: string | null
          question?: string
        }
        Relationships: []
      }
      interview_sessions: {
        Row: {
          course: string | null
          created_at: string
          feedback: Json | null
          id: string
          interview_type: string
          mistakes: Json | null
          mode: string
          mood: string
          score: number | null
          user_id: string
        }
        Insert: {
          course?: string | null
          created_at?: string
          feedback?: Json | null
          id?: string
          interview_type: string
          mistakes?: Json | null
          mode: string
          mood: string
          score?: number | null
          user_id: string
        }
        Update: {
          course?: string | null
          created_at?: string
          feedback?: Json | null
          id?: string
          interview_type?: string
          mistakes?: Json | null
          mode?: string
          mood?: string
          score?: number | null
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          career_path: string | null
          created_at: string
          current_level: number
          full_name: string | null
          id: string
          is_premium: boolean
          updated_at: string
          user_id: string
          xp_points: number
        }
        Insert: {
          avatar_url?: string | null
          career_path?: string | null
          created_at?: string
          current_level?: number
          full_name?: string | null
          id?: string
          is_premium?: boolean
          updated_at?: string
          user_id: string
          xp_points?: number
        }
        Update: {
          avatar_url?: string | null
          career_path?: string | null
          created_at?: string
          current_level?: number
          full_name?: string | null
          id?: string
          is_premium?: boolean
          updated_at?: string
          user_id?: string
          xp_points?: number
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          id: string
          key: string
          updated_at: string
          value: string
        }
        Insert: {
          id?: string
          key: string
          updated_at?: string
          value?: string
        }
        Update: {
          id?: string
          key?: string
          updated_at?: string
          value?: string
        }
        Relationships: []
      }
      test_results: {
        Row: {
          answers: Json | null
          course: string
          created_at: string
          id: string
          level: number
          passed: boolean
          score: number
          total_questions: number
          user_id: string
          xp_earned: number
        }
        Insert: {
          answers?: Json | null
          course: string
          created_at?: string
          id?: string
          level: number
          passed?: boolean
          score: number
          total_questions: number
          user_id: string
          xp_earned?: number
        }
        Update: {
          answers?: Json | null
          course?: string
          created_at?: string
          id?: string
          level?: number
          passed?: boolean
          score?: number
          total_questions?: number
          user_id?: string
          xp_earned?: number
        }
        Relationships: []
      }
      user_badges: {
        Row: {
          badge_code: string
          earned_at: string
          id: string
          user_id: string
        }
        Insert: {
          badge_code: string
          earned_at?: string
          id?: string
          user_id: string
        }
        Update: {
          badge_code?: string
          earned_at?: string
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      user_daily_attempts: {
        Row: {
          answer: string
          challenge_date: string
          challenge_id: string
          created_at: string
          feedback: Json | null
          id: string
          score: number
          user_id: string
        }
        Insert: {
          answer: string
          challenge_date: string
          challenge_id: string
          created_at?: string
          feedback?: Json | null
          id?: string
          score?: number
          user_id: string
        }
        Update: {
          answer?: string
          challenge_date?: string
          challenge_id?: string
          created_at?: string
          feedback?: Json | null
          id?: string
          score?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_daily_attempts_challenge_id_fkey"
            columns: ["challenge_id"]
            isOneToOne: false
            referencedRelation: "daily_challenges"
            referencedColumns: ["id"]
          },
        ]
      }
      user_progress: {
        Row: {
          completed: boolean
          course: string
          created_at: string
          id: string
          module: string
          score: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          completed?: boolean
          course: string
          created_at?: string
          id?: string
          module: string
          score?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          completed?: boolean
          course?: string
          created_at?: string
          id?: string
          module?: string
          score?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      user_streaks: {
        Row: {
          best_streak: number
          current_streak: number
          id: string
          last_activity_date: string | null
          total_xp: number
          updated_at: string
          user_id: string
        }
        Insert: {
          best_streak?: number
          current_streak?: number
          id?: string
          last_activity_date?: string | null
          total_xp?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          best_streak?: number
          current_streak?: number
          id?: string
          last_activity_date?: string | null
          total_xp?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user"],
    },
  },
} as const
