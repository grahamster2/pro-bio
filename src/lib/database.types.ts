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
                    profile_image_url: string | null
                    photo_library_urls: string[] | null
                    links: Json | null
                    service_options: string[] | null
                    is_emergency_available: boolean | null
                    is_licensed_insured: boolean | null
                    insurance_document_url: string | null
                    verification_status: string | null
                    accepts_credit_cards: boolean | null
                    offers_financing: boolean | null
                    free_consultations: boolean | null
                    has_seen_tutorial: boolean | null
                    is_premium: boolean | null
                    stripe_customer_id: string | null
                    stripe_subscription_id: string | null
                    stripe_price_id: string | null
                    stripe_current_period_end: string | null
                    theme_color: string | null
                    background_image_url: string | null
                    card_color: string | null
                    liquid_glass: boolean | null
                    bbb_rating: string | null
                    bbb_profile_url: string | null
                    osha_certified: boolean | null
                    osha_proof_url: string | null
                    created_at: string
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
                    photo_library_urls?: string[] | null
                    service_options?: string[] | null
                    is_licensed_insured?: boolean | null
                    insurance_document_url?: string | null
                    verification_status?: string | null
                    is_pro?: boolean | null
                    is_premium?: boolean | null
                    stripe_customer_id?: string | null
                    stripe_subscription_id?: string | null
                    stripe_price_id?: string | null
                    stripe_current_period_end?: string | null
                    theme_color?: string | null
                    background_image_url?: string | null
                    card_color?: string | null
                    liquid_glass?: boolean | null
                    bbb_rating?: string | null
                    bbb_profile_url?: string | null
                    osha_certified?: boolean | null
                    osha_proof_url?: string | null
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
                    photo_library_urls?: string[] | null
                    service_options?: string[] | null
                    is_licensed_insured?: boolean | null
                    insurance_document_url?: string | null
                    verification_status?: string | null
                    is_pro?: boolean | null
                    is_premium?: boolean | null
                    stripe_customer_id?: string | null
                    stripe_subscription_id?: string | null
                    stripe_price_id?: string | null
                    stripe_current_period_end?: string | null
                    theme_color?: string | null
                    background_image_url?: string | null
                    card_color?: string | null
                    liquid_glass?: boolean | null
                    bbb_rating?: string | null
                    bbb_profile_url?: string | null
                    osha_certified?: boolean | null
                    osha_proof_url?: string | null
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
