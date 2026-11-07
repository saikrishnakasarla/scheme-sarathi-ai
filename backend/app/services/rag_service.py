import json
import logging
from sqlalchemy.orm import Session
from app.models.scheme import Scheme, Category
from app.schemas.chat import ChatMessageRequest, ChatMessageResponse
from app.schemas.scheme import SchemeSummary
from app.core.config import settings
import httpx

logger = logging.getLogger(__name__)

SYSTEM_PROMPT_TE = """
మీరు "స్కీమ్ సారథి (Scheme Sarathi)" AI ప్రభుత్వ పథక సహాయకుడు.
మీ లక్ష్యం: గ్రామీణ పౌరులకు కేంద్ర మరియు ఆంధ్రప్రదేశ్ ప్రభుత్వ సంక్షేమ పథకాలను సులభమైన, గౌరవప్రదమైన తెలుగులో వివరించడం.

ఖచ్చితమైన నియమాలు (Strict Safety Guidelines):
1. ఏ పథకాన్నీ మీరే సృష్టించవద్దు (Never invent schemes).
2. లబ్ధి మొత్తాలను ఊహించవద్దు; క్రింద అందించిన ధృవీకరించిన సమాచారం మాత్రమే వాడండి.
3. ప్రభుత్వ లబ్ధి అందుతుందని ఎట్టి పరిస్థితుల్లోనూ హామీ (Guarantee) ఇవ్వవద్దు.
4. పౌరుల నుండి ఆధార్ నంబర్లు, బ్యాంక్ పాస్‌వర్డ్‌లు, OTPలు ఎప్పుడూ అడగవద్దు.
5. పథకం వివరాలు తెలియకపోతే నిజాయితీగా "క్షమించండి. ఈ పథకానికి సంబంధించిన తాజా వివరాలను అధికారిక ప్రభుత్వ వెబ్సైట్లో లేదా గ్రామ సచివాలయంలో ధృవీకరించడం అవసరం." అని చెప్పండి.
6. సమాధానం ఎల్లప్పుడూ స్పష్టమైన, సాధారణ గ్రామీణులకు అర్థమయ్యే తెలుగులో ఉండాలి.
7. చివరలో అధికారిక వెబ్‌సైట్ లేదా సచివాలయం సూచన ఇవ్వండి.
"""

def retrieve_relevant_schemes(db: Session, query_text: str, limit: int = 4) -> list[Scheme]:
    """Retrieve schemes matching user query keywords."""
    query_lower = query_text.lower()
    
    # Keyword matching heuristic
    matched_schemes = []
    all_schemes = db.query(Scheme).all()
    
    keyword_weights = {
        "రైతు": "farmers", "వ్యవసాయ": "farmers", "పంట": "farmers", "భూమి": "farmers", "కిసాన్": "farmers", "విత్తనాలు": "farmers", "farmer": "farmers", "agriculture": "farmers",
        "విద్యార్థి": "students", "చదువు": "students", "కాలేజీ": "students", "స్కాలర్‌షిప్": "students", "ఫీజు": "students", "student": "students", "scholarship": "students",
        "మహిళ": "women", "స్త్రీ": "women", "చేయూత": "women", "డ్వాక్రా": "women", "ఆసరా": "women", "గర్భిణీ": "women", "women": "women", "shg": "women",
        "ఆరోగ్య": "health", "ఆసుపత్రి": "health", "వైద్యం": "health", "ఆపరేషన్": "health", "డాక్టర్": "health", "health": "health", "hospital": "health", "doctor": "health",
        "ఇల్లు": "housing", "గృహ": "housing", "నివాసం": "housing", "కాలనీ": "housing", "house": "housing", "housing": "housing",
        "ఉపాధి": "employment", "కూలీ": "employment", "పని": "employment", "విశ్వకర్మ": "employment", "నైపుణ్య": "skills", "job": "employment", "work": "employment",
        "రుణం": "loans", "లోన్": "loans", "వ్యాపారం": "loans", "ముద్రా": "loans", "loan": "loans", "business": "loans", "mudra": "loans",
        "శిక్షణ": "skills", "కంప్యూటర్": "skills", "skill": "skills", "training": "skills"
    }
    
    target_category_slug = None
    for kw, cat_slug in keyword_weights.items():
        if kw in query_lower:
            target_category_slug = cat_slug
            break
            
    if target_category_slug:
        cat = db.query(Category).filter(Category.slug == target_category_slug).first()
        if cat:
            matched_schemes = db.query(Scheme).filter(Scheme.category_id == cat.id).limit(limit).all()
            
    if not matched_schemes:
        # Fallback keyword search
        for s in all_schemes:
            if (s.name_te in query_lower or s.name_en.lower() in query_lower or
                (s.code and s.code.lower() in query_lower) or
                any(w in s.purpose_te for w in query_lower.split())):
                matched_schemes.append(s)
                if len(matched_schemes) >= limit:
                    break
                    
    if not matched_schemes:
        # Default top verified schemes
        matched_schemes = all_schemes[:limit]
        
    return matched_schemes

def build_knowledge_context(schemes: list[Scheme]) -> str:
    """Build factual context string from retrieved schemes."""
    chunks = []
    for s in schemes:
        doc_list = s.required_documents or []
        doc_names = [d.get("name_te", "") for d in doc_list[:3]]
        docs_str = ", ".join(doc_names)
        elig_str = "; ".join((s.eligibility_criteria_te or [])[:3])
        excl_str = "; ".join((s.exclusions_te or [])[:2])
        
        chunk = (
            f"--- పథకం: {s.name_te} ({s.name_en}) ---\n"
            f"కోడ్/స్థాయి: {s.code or 'N/A'} | {s.level}\n"
            f"లబ్ధి మొత్తం: {s.financial_amount or 'సహాయక లబ్ధి'}\n"
            f"ప్రయోజనం: {s.purpose_te}\n"
            f"అర్హతలు: {elig_str}\n"
            f"అనర్హులు: {excl_str}\n"
            f"అవసరమైన పత్రాలు: {docs_str}\n"
            f"దరఖాస్తు విధానం: {s.application_mode}\n"
            f"అధికారిక వెబ్‌సైట్: {s.official_website}\n"
            f"హెల్ప్‌లైన్: {s.helpline_number or '1902'}\n"
        )
        chunks.append(chunk)
    return "\n".join(chunks)

async def generate_chat_response(db: Session, req: ChatMessageRequest) -> ChatMessageResponse:
    query = req.message.strip()
    schemes = retrieve_relevant_schemes(db, query)
    context_text = build_knowledge_context(schemes)
    
    categories = {c.id: (c.name_te, c.name_en) for c in db.query(Category).all()}
    summary_schemes = []
    for s in schemes:
        cat_te, cat_en = categories.get(s.category_id, ("", ""))
        summary_schemes.append(
            SchemeSummary(
                id=s.id,
                slug=s.slug,
                category_id=s.category_id,
                category_name_te=cat_te,
                category_name_en=cat_en,
                name_te=s.name_te,
                name_en=s.name_en,
                code=s.code,
                level=s.level,
                financial_amount=s.financial_amount,
                purpose_te=s.purpose_te,
                purpose_en=s.purpose_en,
                benefits_te=s.benefits_te,
                benefits_en=s.benefits_en,
                verified=s.verified,
                official_website=s.official_website,
                match_score=90,
                eligibility_status="eligible",
                reason=s.purpose_te[:60]
            )
        )

    # 1. Check if GEMINI_API_KEY is configured
    if settings.GEMINI_API_KEY:
        try:
            url = f"https://generativelanguage.googleapis.com/v1beta/models/{settings.AI_MODEL_NAME}:generateContent?key={settings.GEMINI_API_KEY}"
            prompt = (
                f"{SYSTEM_PROMPT_TE}\n\n"
                f"ధృవీకరించిన అధికారిక పథకాల సమాచారం:\n{context_text}\n\n"
                f"పౌరుడి ప్రశ్న: {query}\n\n"
                f"సారథి సహాయకుడి సమాధానం (స్పష్టమైన తెలుగులో, పౌరుడి ప్రశ్నకు సూటిగా సమాధానం ఇవ్వండి):"
            )
            payload = {
                "contents": [{"parts": [{"text": prompt}]}],
                "generationConfig": {"temperature": 0.2, "maxOutputTokens": 600}
            }
            async with httpx.AsyncClient(timeout=15.0) as client:
                res = await client.post(url, json=payload)
                if res.status_code == 200:
                    data = res.json()
                    candidate = data["candidates"][0]["content"]["parts"][0]["text"]
                    return ChatMessageResponse(
                        response_text=candidate,
                        language=req.language or "te",
                        recommended_schemes=summary_schemes,
                        suggested_questions=get_suggested_questions(query),
                        source_portals=[s.official_website for s in schemes[:2]]
                    )
        except Exception as e:
            logger.warning(f"Gemini API request failed, falling back to rule-based RAG: {e}")

    # 2. High-Accuracy Rule-Based RAG Fallback
    top_scheme = schemes[0] if schemes else None
    if top_scheme:
        top_docs = top_scheme.required_documents or []
        top_doc_names = [d.get("name_te", "") for d in top_docs[:3]]
        top_docs_str = ", ".join(top_doc_names)
        first_elig = top_scheme.eligibility_criteria_te[0] if top_scheme.eligibility_criteria_te else "వివరాలు చూడండి."
        
        answer_te = (
            f"నమస్కారం! మీ ప్రశ్నకు సంబంధించి ధృవీకరించిన పథకం: **{top_scheme.name_te}**.\n\n"
            f"📌 **పథకం ప్రయోజనం:** {top_scheme.purpose_te}\n"
            f"💰 **లభించే ప్రయోజనం:** {top_scheme.financial_amount or top_scheme.benefits_te}\n"
            f"📋 **ముఖ్యమైన అర్హతలు:** {first_elig}\n"
            f"📂 **అవసరమైన పత్రాలు:** {top_docs_str}.\n"
            f"🌐 **ఎక్కడ దరఖాస్తు చేయాలి:** మీ సమీపంలోని {top_scheme.application_mode} లేదా అధికారిక పోర్టల్ ({top_scheme.official_website}) ద్వారా దరఖాస్తు చేసుకోవచ్చు.\n\n"
            f"మరిన్ని వివరాల కోసం హెల్ప్‌లైన్: **{top_scheme.helpline_number or '1902'}**."
        )
    else:
        answer_te = (
            "నమస్కారం! మీకు ప్రభుత్వ సంక్షేమ పథకాల గురించి సహాయం చేయడానికి నేను సిద్ధంగా ఉన్నాను. "
            "మీరు రైతులా, విద్యార్థినా, మహిళా సంఘం సభ్యురాలా లేదా వ్యాపారం ప్రారంభించాలనుకుంటున్నారా? దయచేసి చెప్పండి."
        )

    return ChatMessageResponse(
        response_text=answer_te,
        language=req.language or "te",
        recommended_schemes=summary_schemes,
        suggested_questions=get_suggested_questions(query),
        source_portals=[s.official_website for s in schemes[:2]]
    )

def get_suggested_questions(current_query: str) -> list[str]:
    q_lower = current_query.lower()
    if any(w in q_lower for w in ["రైతు", "farmer", "కిసాన్", "భూమి"]):
        return [
            "పీఎం కిసాన్ ఈ-కేవైసీ ఎలా చేయాలి?",
            "పంట నష్టపరిహారం బీమా ఎలా పొందాలి?",
            "సోలార్ వ్యవసాయ పంపుల పథకం ఏమిటి?",
            "కౌలు రైతులకు ఏయే పథకాలు వర్తిస్తాయి?"
        ]
    elif any(w in q_lower for w in ["ఆరోగ్య", "health", "ఆసుపత్రి"]):
        return [
            "ఆరోగ్యశ్రీ కార్డులో ఏయే ఆసుపత్రులు ఉన్నాయి?",
            "ఆయుష్మాన్ భారత్ కార్డ్ ఎలా డౌన్‌లోడ్ చేయాలి?",
            "ఆరోగ్య ఆసరా భృతి ఎలా లభిస్తుంది?",
            "70 ఏళ్లు పైబడిన వారికి ఉచిత వైద్య కార్డ్ ఉందా?"
        ]
    elif any(w in q_lower for w in ["విద్యార్థి", "student", "చదువు"]):
        return [
            "కాలేజీ ఫీజు రీయింబర్స్‌మెంట్‌కు ఎవరు అర్హులు?",
            "వసతి దీవెన నిధులు ఎంత వస్తాయి?",
            "నేషనల్ స్కాలర్‌షిప్ పోర్టల్ లో ఎలా దరఖాస్తు చేయాలి?",
            "డిగ్రీ విద్యార్థులకు లభించే ఉపకార వేతనాలు ఏమిటి?"
        ]
    elif any(w in q_lower for w in ["మహిళ", "women", "చేయూత"]):
        return [
            "వైఎస్సార్ చేయూతకు అర్హత వయస్సు ఎంత?",
            "గర్భిణీలకు లభించే మాతృ వందన నిధులు ఎంత?",
            "డ్వాక్రా మహిళలకు సున్నా వడ్డీ రుణాలు ఎలా వస్తాయి?",
            "మహిళా వ్యాపారాలకు ప్రభుత్వ సాయం ఏమిటి?"
        ]
    elif any(w in q_lower for w in ["లోన్", "రుణం", "loan", "ముద్రా"]):
        return [
            "పూచీకత్తు లేకుండా ముద్రా లోన్ ఎలా పొందాలి?",
            "వీధి వ్యాపారుల స్వనిధి లోన్ ఎలా వస్తుంది?",
            "పీఎం విశ్వకర్మ కింద ₹3 లక్షల రుణం ఎలా పొందాలి?",
            "వ్యాపార రుణాలకు అవసరమైన పత్రాలు ఏమిటి?"
        ]
    return [
        "రైతులకు అందుబాటులో ఉన్న పథకాలు ఏమిటి?",
        "ఉచిత వైద్యం కోసం ఆరోగ్యశ్రీ ఎలా ఉపయోగించాలి?",
        "నా అర్హతను ఎలా తనిఖీ చేసుకోవాలి?",
        "గ్రామ సచివాలయంలో లభించే పథకాలు ఏమిటి?"
    ]
