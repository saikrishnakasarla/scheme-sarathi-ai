export interface Category {
  id: number;
  slug: string;
  name_te: string;
  name_en: string;
  name_hi?: string;
  icon: string;
  description_te: string;
  description_en: string;
  sort_order: number;
  scheme_count: number;
}

export interface RequiredDocument {
  name_te: string;
  name_en: string;
  mandatory: boolean;
  details_te?: string;
}

export interface SchemeFAQ {
  q_te: string;
  a_te: string;
  q_en?: string;
  a_en?: string;
}

export interface SchemeSummary {
  id: number;
  slug: string;
  category_id: number;
  category_name_te?: string;
  category_name_en?: string;
  name_te: string;
  name_en: string;
  code?: string;
  level: string;
  financial_amount?: string;
  purpose_te: string;
  purpose_en: string;
  benefits_te: string;
  benefits_en: string;
  verified: boolean;
  official_website: string;
  match_score?: number;
  eligibility_status?: 'eligible' | 'needs_more_info' | 'ineligible';
  reason?: string;
}

export interface SchemeDetail extends SchemeSummary {
  state: string;
  target_beneficiaries: string[];
  eligibility_criteria_te: string[];
  eligibility_criteria_en: string[];
  exclusions_te: string[];
  exclusions_en: string[];
  required_documents: RequiredDocument[];
  application_procedure_te: string[];
  application_procedure_en: string[];
  application_mode: string;
  portal_name: string;
  helpline_number?: string;
  verification_source: string;
  last_verified_date: string;
  warning_notes_te?: string;
  faqs: SchemeFAQ[];
  view_count: number;
}

export interface ProfileCheckRequest {
  name?: string;
  age?: number;
  gender?: string;
  state?: string;
  district?: string;
  village?: string;
  occupation?: string;
  annual_income?: number;
  land_acres?: number;
  is_student?: boolean;
  has_disability?: boolean;
  has_ration_card?: boolean;
  ration_card_type?: string;
  language?: string;
}

export interface SchemeMatchResult {
  scheme: SchemeSummary;
  score: number;
  status: 'eligible' | 'needs_more_info' | 'ineligible';
  matched_criteria_te: string[];
  unmatched_criteria_te: string[];
  matched_criteria_en: string[];
  unmatched_criteria_en: string[];
  required_documents: RequiredDocument[];
  voice_guidance_te: string;
}

export interface RecommendationResponse {
  total_evaluated: number;
  eligible_count: number;
  potentially_eligible_count: number;
  recommendations: SchemeMatchResult[];
  summary_te: string;
  summary_en: string;
  voice_narration_te: string;
  disclaimer_te: string;
  disclaimer_en: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'sarathi';
  text: string;
  timestamp: Date;
  recommended_schemes?: SchemeSummary[];
  suggested_questions?: string[];
  source_portals?: string[];
  audioBase64?: string;
}

export interface FeedbackData {
  rating: number;
  comment: string;
  voice_used: string;
}

export interface AdminStats {
  total_schemes: number;
  total_categories: number;
  verified_schemes: number;
  unverified_schemes: number;
  total_views: number;
  feedback_count: number;
  average_rating: number;
  top_schemes: Array<{
    id: number;
    name_te: string;
    name_en: string;
    views: number;
    verified: boolean;
  }>;
}
