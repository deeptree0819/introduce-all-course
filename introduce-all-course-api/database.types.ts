export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      admin_login_histories: {
        Row: {
          admin_id: number | null;
          admin_login_histories_id: number;
          agent: string;
          created_at: string;
          ip: string;
        };
        Insert: {
          admin_id?: number | null;
          admin_login_histories_id?: number;
          agent: string;
          created_at?: string;
          ip: string;
        };
        Update: {
          admin_id?: number | null;
          admin_login_histories_id?: number;
          agent?: string;
          created_at?: string;
          ip?: string;
        };
        Relationships: [
          {
            foreignKeyName: "admin_login_histories_admin_id_fkey";
            columns: ["admin_id"];
            isOneToOne: false;
            referencedRelation: "admins";
            referencedColumns: ["admin_id"];
          },
        ];
      };
      admins: {
        Row: {
          admin_email: string;
          admin_id: number;
          admin_name: string;
          admin_password: string;
          admin_role: Database["public"]["Enums"]["admin_role"];
          created_at: string;
          updated_at: string;
        };
        Insert: {
          admin_email: string;
          admin_id?: number;
          admin_name: string;
          admin_password: string;
          admin_role: Database["public"]["Enums"]["admin_role"];
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          admin_email?: string;
          admin_id?: number;
          admin_name?: string;
          admin_password?: string;
          admin_role?: Database["public"]["Enums"]["admin_role"];
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      event_attachments: {
        Row: {
          created_at: string;
          event_attachment_url: string;
          event_attachments_id: number;
          events_id: number | null;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          event_attachment_url: string;
          event_attachments_id?: number;
          events_id?: number | null;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          event_attachment_url?: string;
          event_attachments_id?: number;
          events_id?: number | null;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "event_attachments_events_id_fkey";
            columns: ["events_id"];
            isOneToOne: false;
            referencedRelation: "events";
            referencedColumns: ["events_id"];
          },
        ];
      };
      event_categories: {
        Row: {
          created_at: string;
          event_categories_id: number;
          event_category_name: string;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          event_categories_id?: number;
          event_category_name: string;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          event_categories_id?: number;
          event_category_name?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      events: {
        Row: {
          created_at: string;
          created_by: number | null;
          event_category_id: number;
          event_description: string | null;
          event_end_at: string;
          event_info: string;
          event_organization: string;
          event_poster_image_url: string;
          event_start_at: string;
          event_thumbnail_url: string;
          event_title: string;
          event_view_count: number;
          events_id: number;
          updated_at: string;
          updated_by: number | null;
        };
        Insert: {
          created_at?: string;
          created_by?: number | null;
          event_category_id: number;
          event_description?: string | null;
          event_end_at: string;
          event_info: string;
          event_organization: string;
          event_poster_image_url: string;
          event_start_at: string;
          event_thumbnail_url: string;
          event_title: string;
          event_view_count: number;
          events_id?: number;
          updated_at?: string;
          updated_by?: number | null;
        };
        Update: {
          created_at?: string;
          created_by?: number | null;
          event_category_id?: number;
          event_description?: string | null;
          event_end_at?: string;
          event_info?: string;
          event_organization?: string;
          event_poster_image_url?: string;
          event_start_at?: string;
          event_thumbnail_url?: string;
          event_title?: string;
          event_view_count?: number;
          events_id?: number;
          updated_at?: string;
          updated_by?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "events_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "admins";
            referencedColumns: ["admin_id"];
          },
          {
            foreignKeyName: "events_event_category_id_fkey";
            columns: ["event_category_id"];
            isOneToOne: false;
            referencedRelation: "event_categories";
            referencedColumns: ["event_categories_id"];
          },
          {
            foreignKeyName: "events_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "admins";
            referencedColumns: ["admin_id"];
          },
        ];
      };
      free_lecture: {
        Row: {
          created_at: string;
          created_by: number | null;
          free_lecture_description: string | null;
          free_lecture_id: number;
          free_lecture_thumbnail_url: string;
          free_lecture_title: string;
          free_lecture_url: string;
          free_lecture_view_count: number;
          updated_at: string;
          updated_by: number | null;
        };
        Insert: {
          created_at?: string;
          created_by?: number | null;
          free_lecture_description?: string | null;
          free_lecture_id?: number;
          free_lecture_thumbnail_url: string;
          free_lecture_title: string;
          free_lecture_url: string;
          free_lecture_view_count: number;
          updated_at?: string;
          updated_by?: number | null;
        };
        Update: {
          created_at?: string;
          created_by?: number | null;
          free_lecture_description?: string | null;
          free_lecture_id?: number;
          free_lecture_thumbnail_url?: string;
          free_lecture_title?: string;
          free_lecture_url?: string;
          free_lecture_view_count?: number;
          updated_at?: string;
          updated_by?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "free_lecture_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "admins";
            referencedColumns: ["admin_id"];
          },
          {
            foreignKeyName: "free_lecture_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "admins";
            referencedColumns: ["admin_id"];
          },
        ];
      };
      free_lecture_free_lecture_tags: {
        Row: {
          free_lecture_id: number;
          free_lecture_tags_id: number;
        };
        Insert: {
          free_lecture_id: number;
          free_lecture_tags_id: number;
        };
        Update: {
          free_lecture_id?: number;
          free_lecture_tags_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: "free_lecture_free_lecture_tags_free_lecture_id_fkey";
            columns: ["free_lecture_id"];
            isOneToOne: false;
            referencedRelation: "free_lecture";
            referencedColumns: ["free_lecture_id"];
          },
          {
            foreignKeyName: "free_lecture_free_lecture_tags_free_lecture_tags_id_fkey";
            columns: ["free_lecture_tags_id"];
            isOneToOne: false;
            referencedRelation: "free_lecture_tags";
            referencedColumns: ["free_lecture_tags_id"];
          },
        ];
      };
      free_lecture_tags: {
        Row: {
          created_at: string;
          free_lecture_tag_name: string;
          free_lecture_tags_id: number;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          free_lecture_tag_name: string;
          free_lecture_tags_id?: number;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          free_lecture_tag_name?: string;
          free_lecture_tags_id?: number;
          updated_at?: string;
        };
        Relationships: [];
      };
      inquiry_form_links: {
        Row: {
          created_at: string;
          created_by: number | null;
          inquiry_form_links_id: number;
          inquiry_form_links_url: string;
          updated_at: string;
          updated_by: number | null;
        };
        Insert: {
          created_at?: string;
          created_by?: number | null;
          inquiry_form_links_id?: number;
          inquiry_form_links_url: string;
          updated_at?: string;
          updated_by?: number | null;
        };
        Update: {
          created_at?: string;
          created_by?: number | null;
          inquiry_form_links_id?: number;
          inquiry_form_links_url?: string;
          updated_at?: string;
          updated_by?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "inquiry_form_links_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "admins";
            referencedColumns: ["admin_id"];
          },
          {
            foreignKeyName: "inquiry_form_links_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "admins";
            referencedColumns: ["admin_id"];
          },
        ];
      };
      main_banners: {
        Row: {
          created_at: string;
          main_banner_close_at: string | null;
          main_banner_image_name: string | null;
          main_banner_image_url: string;
          main_banner_open_at: string;
          main_banner_url: string;
          main_banners_id: number;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          main_banner_close_at?: string | null;
          main_banner_image_name?: string | null;
          main_banner_image_url: string;
          main_banner_open_at: string;
          main_banner_url: string;
          main_banners_id?: number;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          main_banner_close_at?: string | null;
          main_banner_image_name?: string | null;
          main_banner_image_url?: string;
          main_banner_open_at?: string;
          main_banner_url?: string;
          main_banners_id?: number;
          updated_at?: string;
        };
        Relationships: [];
      };
      user_login_histories: {
        Row: {
          agent: string;
          created_at: string;
          ip: string;
          user_id: number | null;
          user_login_histories_id: number;
        };
        Insert: {
          agent: string;
          created_at?: string;
          ip: string;
          user_id?: number | null;
          user_login_histories_id?: number;
        };
        Update: {
          agent?: string;
          created_at?: string;
          ip?: string;
          user_id?: number | null;
          user_login_histories_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: "user_login_histories_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["users_id"];
          },
        ];
      };
      users: {
        Row: {
          birthyear: string;
          created_at: string;
          email: string;
          gender: Database["public"]["Enums"]["gender"];
          kakao_access_token: string | null;
          kakao_id: number;
          nickname: string;
          phone_number: string;
          profile_thumbnail_url: string | null;
          profile_url: string | null;
          role: Database["public"]["Enums"]["role"];
          updated_at: string;
          user_name: string;
          users_id: number;
        };
        Insert: {
          birthyear: string;
          created_at?: string;
          email: string;
          gender: Database["public"]["Enums"]["gender"];
          kakao_access_token?: string | null;
          kakao_id: number;
          nickname: string;
          phone_number: string;
          profile_thumbnail_url?: string | null;
          profile_url?: string | null;
          role: Database["public"]["Enums"]["role"];
          updated_at?: string;
          user_name: string;
          users_id?: number;
        };
        Update: {
          birthyear?: string;
          created_at?: string;
          email?: string;
          gender?: Database["public"]["Enums"]["gender"];
          kakao_access_token?: string | null;
          kakao_id?: number;
          nickname?: string;
          phone_number?: string;
          profile_thumbnail_url?: string | null;
          profile_url?: string | null;
          role?: Database["public"]["Enums"]["role"];
          updated_at?: string;
          user_name?: string;
          users_id?: number;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      admin_role: "SUPER" | "MANAGER";
      gender: "MALE" | "FEMALE";
      role: "SUPER" | "USER" | "EXPERT" | "MANAGER";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, "public">];

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
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

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
    : never;
