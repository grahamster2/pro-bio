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
            profiles: {
                Row: {
                    id: string
                    user_id: string
                    business_name: string | null
                    slug: string | null
                    trade_category: string | null
                    license_number: string | null
                    phone_number: string | null
                    bio: string | null
                    is_emergency_available: boolean | null
                    profile_image_url: string | null
                    links: Json | null
                    is_pro: boolean | null
                    created_at: string | null
                    updated_at: string | null
                }
                Insert: {
                    id?: string
                    user_id: string
                    business_name?: string | null
                    slug?: string | null
                    trade_category?: string | null
                    license_number?: string | null
                    phone_number?: string | null
                    bio?: string | null
                    is_emergency_available?: boolean | null
                    profile_image_url?: string | null
                    links?: Json | null
                    is_pro?: boolean | null
                    created_at?: string | null
                    updated_at?: string | null
                }
                Update: {
                    id?: string
                    user_id?: string
                    business_name?: string | null
                    slug?: string | null
                    trade_category?: string | null
                    license_number?: string | null
                    phone_number?: string | null
                    bio?: string | null
                    is_emergency_available?: boolean | null
                    profile_image_url?: string | null
                    links?: Json | null
                    is_pro?: boolean | null
                    created_at?: string | null
                    updated_at?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: "profiles_user_id_fkey"
                        columns: ["user_id"]
                        referencedRelation: "users"
                        referencedColumns: ["id"]
                    }
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
