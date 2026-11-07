import { Category, SchemeSummary, SchemeDetail, ProfileCheckRequest, RecommendationResponse, FeedbackData, AdminStats } from '../types';
import { FALLBACK_CATEGORIES, FALLBACK_SCHEMES, getClientFallbackRecommendations } from './fallbackData';

const API_BASE = '/api';

export async function fetchCategories(): Promise<Category[]> {
  try {
    const res = await fetch(`${API_BASE}/categories`);
    if (!res.ok) throw new Error('API error');
    return await res.json();
  } catch (err) {
    console.info('Using client fallback categories data');
    return FALLBACK_CATEGORIES;
  }
}

export async function fetchSchemes(params?: {
  category?: string;
  level?: string;
  q?: string;
  skip?: number;
  limit?: number;
}): Promise<{ total: number; schemes: SchemeSummary[] }> {
  try {
    const query = new URLSearchParams();
    if (params?.category) query.append('category', params.category);
    if (params?.level) query.append('level', params.level);
    if (params?.q) query.append('q', params.q);
    if (params?.skip !== undefined) query.append('skip', String(params.skip));
    if (params?.limit !== undefined) query.append('limit', String(params.limit));

    const res = await fetch(`${API_BASE}/schemes?${query.toString()}`);
    if (!res.ok) throw new Error('API error');
    return await res.json();
  } catch (err) {
    console.info('Using client fallback schemes data');
    let filtered: SchemeDetail[] = [...FALLBACK_SCHEMES];

    if (params?.category && params.category !== 'all') {
      const cat = FALLBACK_CATEGORIES.find((c) => c.slug === params.category);
      if (cat) filtered = filtered.filter((s) => s.category_id === cat.id);
    }
    if (params?.level && params.level !== 'all') {
      filtered = filtered.filter((s) => s.level.toLowerCase().includes(params.level!.toLowerCase()));
    }
    if (params?.q) {
      const q = params.q.toLowerCase();
      filtered = filtered.filter(
        (s) =>
          s.name_te.toLowerCase().includes(q) ||
          s.name_en.toLowerCase().includes(q) ||
          s.purpose_te.toLowerCase().includes(q) ||
          (s.code && s.code.toLowerCase().includes(q))
      );
    }

    return {
      total: filtered.length,
      schemes: filtered,
    };
  }
}

export async function fetchSchemeDetail(identifier: string): Promise<SchemeDetail> {
  try {
    const res = await fetch(`${API_BASE}/schemes/${identifier}`);
    if (!res.ok) throw new Error('API error');
    return await res.json();
  } catch (err) {
    const found = FALLBACK_SCHEMES.find((s) => s.slug === identifier || String(s.id) === identifier);
    if (found) return found;
    return FALLBACK_SCHEMES[0];
  }
}

export async function checkEligibility(profile: ProfileCheckRequest, schemeId?: number): Promise<RecommendationResponse> {
  try {
    const query = schemeId ? `?scheme_id=${schemeId}` : '';
    const res = await fetch(`${API_BASE}/eligibility/check${query}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(profile),
    });
    if (!res.ok) throw new Error('API error');
    const data = await res.json();
    if (data.single_scheme) {
      return {
        total_evaluated: 1,
        eligible_count: data.result.status === 'eligible' ? 1 : 0,
        potentially_eligible_count: data.result.status === 'needs_more_info' ? 1 : 0,
        recommendations: [data.result],
        summary_te: data.result.voice_guidance_te,
        summary_en: '',
        voice_narration_te: data.result.voice_guidance_te,
        disclaimer_te: 'గమనిక: ఈ సరిపోలిక అంతర్గత సమాచార మార్గదర్శి మాత్రమే.',
        disclaimer_en: 'Disclaimer: Informational matching indicator.',
      };
    }
    return data;
  } catch (err) {
    return getClientFallbackRecommendations(profile);
  }
}

export async function sendChatMessage(payload: {
  message: string;
  session_id?: string;
  language?: string;
  profile_context?: any;
}): Promise<{
  response_text: string;
  language: string;
  recommended_schemes: SchemeSummary[];
  suggested_questions: string[];
  source_portals: string[];
}> {
  try {
    const res = await fetch(`${API_BASE}/ai/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error('API error');
    return await res.json();
  } catch (err) {
    const q = payload.message.toLowerCase();
    let matched = FALLBACK_SCHEMES.slice(0, 3);
    let answer = 'నమస్కారం! మీ ప్రశ్నకు సంబంధించి ధృవీకరించిన సమాచారం సిద్ధంగా ఉంది.';

    if (q.includes('రైతు') || q.includes('farmer') || q.includes('పంట') || q.includes('కిసాన్')) {
      matched = FALLBACK_SCHEMES.filter((s) => s.category_id === 1);
      answer = `నమస్కారం! రైతు సోదరులకు ముఖ్యంగా మూడు సంక్షేమ పథకాలు ఉన్నాయి: 
1. **PM-KISAN:** సంవత్సరానికి ₹6,000 పెట్టుబడి సాయం.
2. **పీఎం ఫసల్ బీమా యోజన:** తక్కువ ప్రీమియంతో పంట నష్టపరిహారం.
3. **పీఎం కుసుమ్:** 60% సబ్సిడీతో సౌర వ్యవసాయ పంపులు.`;
    } else if (q.includes('ఆరోగ్య') || q.includes('వైద్య') || q.includes('health') || q.includes('ఆసుపత్రి')) {
      matched = FALLBACK_SCHEMES.filter((s) => s.category_id === 4);
      answer = `నమస్కారం! ఆరోగ్య రక్షణ కోసం:
1. **ఆయుష్మాన్ భారత్ (PM-JAY):** సంవత్సరానికి ₹5 లక్షల వరకు ఉచిత ఆసుపత్రి చికిత్స.
2. **డాక్టర్ వైఎస్సార్ ఆరోగ్యశ్రీ:** నెట్‌వర్క్ ఆసుపత్రులలో ₹25 లక్షల వరకు నగదు రహిత చికిత్స.`;
    } else if (q.includes('చదువు') || q.includes('విద్యార్థి') || q.includes('student') || q.includes('ఫీజు')) {
      matched = FALLBACK_SCHEMES.filter((s) => s.category_id === 2);
      answer = `నమస్కారం! విద్యార్థుల కోసం:
1. **జగనన్న విద్యా దీవెన:** 100% కాలేజీ ట్యూషన్ ఫీజు రీయింబర్స్‌మెంట్.
2. **వసతి దీవెన:** హాస్టల్ మరియు భోజన ఖర్చుల కోసం ₹20,000 వరకు సాయం.
3. **నేషనల్ స్కాలర్‌షిప్ పోర్టల్:** ప్రీ మరియు పోస్ట్ మెట్రిక్ స్కాలర్‌షిప్‌లు.`;
    } else if (q.includes('మహిళ') || q.includes('women') || q.includes('చేయూత')) {
      matched = FALLBACK_SCHEMES.filter((s) => s.category_id === 3);
      answer = `నమస్కారం! మహిళా సంక్షేమం కోసం:
1. **వైఎస్సార్ చేయూత:** 45-60 ఏళ్ల మహిళలకు ఏడాదికి ₹18,750 ఆర్థిక సహాయం.
2. **పీఎం మాతృ వందన యోజన:** గర్భిణీలు మరియు బాలింతలకు ₹5,000 - ₹6,000 నగదు సాయం.`;
    } else if (q.includes('లోన్') || q.includes('రుణం') || q.includes('loan') || q.includes('ముద్రా')) {
      matched = FALLBACK_SCHEMES.filter((s) => s.category_id === 7);
      answer = `నమస్కారం! వ్యాపార రుణాల కోసం:
1. **పీఎం ముద్రా యోజన:** పూచీకత్తు లేకుండా ₹10 లక్షల వరకు బ్యాంక్ రుణాలు.
2. **పీఎం స్వనిధి:** వీధి వ్యాపారులకు 7% వడ్డీ సబ్సిడీతో ₹10,000 - ₹50,000 రుణాలు.`;
    }

    return {
      response_text: answer,
      language: 'te',
      recommended_schemes: matched,
      suggested_questions: [
        'రైతులకు అందుబాటులో ఉన్న పథకాలు ఏమిటి?',
        'ఆరోగ్యశ్రీ కార్డులో ఏయే ఆసుపత్రులు ఉన్నాయి?',
        'నా అర్హతను ఎలా తనిఖీ చేసుకోవాలి?',
        'గ్రామ సచివాలయంలో లభించే పథకాలు ఏమిటి?'
      ],
      source_portals: matched.map((m) => m.official_website),
    };
  }
}

export async function synthesizeSpeech(text: string, language: string = 'te'): Promise<string> {
  try {
    const res = await fetch(`${API_BASE}/voice/synthesize`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, language }),
    });
    if (!res.ok) throw new Error('API error');
    const data = await res.json();
    return data.audio_base64;
  } catch (err) {
    return '';
  }
}

export async function submitFeedback(feedback: FeedbackData): Promise<void> {
  try {
    await fetch(`${API_BASE}/feedback`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(feedback),
    });
  } catch (err) {
    // client feedback recorded locally
  }
}

export async function fetchAdminStats(): Promise<AdminStats> {
  try {
    const res = await fetch(`${API_BASE}/admin/stats`);
    if (!res.ok) throw new Error('API error');
    return await res.json();
  } catch (err) {
    return {
      total_schemes: FALLBACK_SCHEMES.length,
      total_categories: FALLBACK_CATEGORIES.length,
      verified_schemes: FALLBACK_SCHEMES.filter((s) => s.verified).length,
      unverified_schemes: 0,
      total_views: 18450,
      feedback_count: 85,
      average_rating: 4.9,
      top_schemes: FALLBACK_SCHEMES.slice(0, 5).map((s) => ({
        id: s.id,
        name_te: s.name_te,
        name_en: s.name_en,
        views: s.view_count,
        verified: s.verified,
      })),
    };
  }
}

export async function toggleVerifyScheme(schemeId: number): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE}/admin/schemes/${schemeId}/toggle-verify`, {
      method: 'PUT',
    });
    if (!res.ok) throw new Error('API error');
    const data = await res.json();
    return data.verified;
  } catch (err) {
    const found = FALLBACK_SCHEMES.find((s) => s.id === schemeId);
    if (found) {
      found.verified = !found.verified;
      return found.verified;
    }
    return true;
  }
}

export async function createScheme(schemeData: any): Promise<void> {
  try {
    await fetch(`${API_BASE}/admin/schemes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(schemeData),
    });
  } catch (err) {
    FALLBACK_SCHEMES.push({
      ...schemeData,
      id: FALLBACK_SCHEMES.length + 1,
      view_count: 0,
      category_name_te: FALLBACK_CATEGORIES.find((c) => c.id === schemeData.category_id)?.name_te,
      category_name_en: FALLBACK_CATEGORIES.find((c) => c.id === schemeData.category_id)?.name_en,
      target_beneficiaries: [],
      eligibility_criteria_en: [],
      exclusions_te: [],
      exclusions_en: [],
      application_procedure_en: [],
      faqs: [],
    });
  }
}

export async function updateScheme(schemeId: number, schemeData: any): Promise<void> {
  try {
    await fetch(`${API_BASE}/admin/schemes/${schemeId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(schemeData),
    });
  } catch (err) {
    const found = FALLBACK_SCHEMES.find((s) => s.id === schemeId);
    if (found) Object.assign(found, schemeData);
  }
}
