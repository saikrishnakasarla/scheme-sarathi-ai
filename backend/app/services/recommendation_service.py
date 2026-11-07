from sqlalchemy.orm import Session
from app.models.scheme import Scheme, Category
from app.schemas.recommendation import ProfileCheckRequest, SchemeMatchResult, RecommendationResponse
from typing import List, Dict, Any

def evaluate_scheme_eligibility(scheme: Scheme, profile: ProfileCheckRequest, cat_name_te: str, cat_name_en: str) -> SchemeMatchResult:
    rules = scheme.match_rules or {}
    score = 0
    max_possible = 100
    matched_te = []
    unmatched_te = []
    matched_en = []
    unmatched_en = []
    
    # 1. Occupation Match (Weight: 35)
    occupations = rules.get("occupations", [])
    if occupations:
        user_occ = (profile.occupation or "").lower().strip()
        if user_occ and (user_occ in occupations or "all" in occupations):
            score += 35
            matched_te.append(f"మీ వృత్తి ({profile.occupation}) ఈ పథకానికి సరిపోతుంది.")
            matched_en.append(f"Your occupation ({profile.occupation}) matches this scheme.")
        elif user_occ:
            unmatched_te.append(f"ఈ పథకం ప్రధానంగా {', '.join(occupations)} వృత్తులకు ఉద్దేశించబడింది.")
            unmatched_en.append(f"Scheme is designated for {', '.join(occupations)}.")
        else:
            score += 15 # Partial when not specified
    else:
        score += 35 # Universal scheme (like health/insurance)
        matched_te.append("ఈ పథకం అన్ని వర్గాల వారికి అందుబాటులో ఉంది.")
        matched_en.append("This scheme is universally accessible across occupations.")

    # 2. Income Match (Weight: 25)
    max_inc = rules.get("max_income")
    if max_inc is not None and profile.annual_income is not None:
        if profile.annual_income <= max_inc:
            score += 25
            matched_te.append(f"మీ వార్షిక ఆదాయం (₹{profile.annual_income:,.0f}) అనుమతించిన పరిమితి (₹{max_inc:,.0f}) లోపే ఉంది.")
            matched_en.append(f"Your annual income (₹{profile.annual_income:,.0f}) is within limit (₹{max_inc:,.0f}).")
        else:
            unmatched_te.append(f"ఈ పథకానికి గరిష్ట ఆదాయ పరిమితి ₹{max_inc:,.0f}.")
            unmatched_en.append(f"Maximum prescribed income is ₹{max_inc:,.0f}.")
    elif rules.get("bpl_only") and profile.has_ration_card:
        score += 25
        matched_te.append("మీకు తెల్ల రేషన్ కార్డు / ఆహార భద్రత అర్హత ఉంది.")
        matched_en.append("You hold an active BPL/Rice ration card.")
    else:
        score += 20

    # 3. Age Match (Weight: 15)
    min_age = rules.get("min_age", 0)
    max_age = rules.get("max_age", 120)
    if profile.age is not None:
        if min_age <= profile.age <= max_age:
            score += 15
            matched_te.append(f"మీ వయస్సు ({profile.age} సం.) అర్హత పరిధిలో ({min_age}-{max_age} సం.) ఉంది.")
            matched_en.append(f"Your age ({profile.age} yrs) is within the eligible age bracket ({min_age}-{max_age} yrs).")
        else:
            unmatched_te.append(f"వయోపరిమితి {min_age} నుండి {max_age} సంవత్సరాల మధ్య ఉండాలి.")
            unmatched_en.append(f"Age must be between {min_age} and {max_age} years.")
    else:
        score += 10

    # 4. Gender / Women Specific (Weight: 15)
    if rules.get("women_only") or "female" in rules.get("genders", []):
        if profile.gender == "female":
            score += 15
            matched_te.append("మహిళలకు ప్రత్యేక ప్రాధాన్యత లేదా పూర్తి మద్దతు గల పథకం.")
            matched_en.append("Designated women-specific scheme.")
        elif profile.gender == "male":
            score -= 40
            unmatched_te.append("ఈ పథకం కేవలం మహిళా లబ్ధిదారులకు మాత్రమే నిర్దేశించబడింది.")
            unmatched_en.append("This scheme is strictly for female beneficiaries.")
        else:
            score += 5
    else:
        score += 15

    # 5. Land Requirement (Weight: 10)
    if rules.get("land_required"):
        if (profile.land_acres or 0) > 0:
            score += 10
            matched_te.append(f"మీకు సొంత సాగుభూమి ({profile.land_acres} ఎకరాలు) ఉంది.")
            matched_en.append(f"You hold cultivable land ({profile.land_acres} acres).")
        else:
            score -= 20
            unmatched_te.append("ఈ పథకానికి సొంత సాగు భూమి పట్టాదారు రికార్డు అవసరం.")
            unmatched_en.append("Cultivable landholding title is required for this scheme.")

    # 6. Student Requirement
    if rules.get("student_only") or scheme.category_id == 2:
        if profile.is_student:
            score += 10
            matched_te.append("మీరు ప్రస్తుతం చదువుకుంటున్న విద్యార్థిగా ధృవీకరించారు.")
            matched_en.append("You confirmed active student status.")
        elif profile.occupation == "student":
            score += 10
        else:
            unmatched_te.append("ఈ పథకం పాఠశాల/కళాశాల విద్యార్థులకు మాత్రమే.")
            unmatched_en.append("This scheme is intended only for enrolled students.")

    # Score clamping
    score = max(0, min(100, score))
    
    status = "eligible" if score >= 75 else ("needs_more_info" if score >= 50 else "ineligible")
    
    voice_guidance = (
        f"{scheme.name_te} పథకానికి మీకు {score}% సరిపోలిక ఉంది. "
        + ("మీరు దీనికి ప్రాథమికంగా అర్హులు. " if status == "eligible" else "కొన్ని వివరాలు పరిశీలించాల్సి ఉంది. ")
        + f"దీని ద్వారా {scheme.financial_amount or scheme.benefits_te[:60]} లభిస్తుంది."
    )

    summary_obj = {
        "id": scheme.id,
        "slug": scheme.slug,
        "category_id": scheme.category_id,
        "category_name_te": cat_name_te,
        "category_name_en": cat_name_en,
        "name_te": scheme.name_te,
        "name_en": scheme.name_en,
        "code": scheme.code,
        "level": scheme.level,
        "financial_amount": scheme.financial_amount,
        "purpose_te": scheme.purpose_te,
        "purpose_en": scheme.purpose_en,
        "benefits_te": scheme.benefits_te,
        "benefits_en": scheme.benefits_en,
        "verified": scheme.verified,
        "official_website": scheme.official_website,
        "match_score": score,
        "eligibility_status": status,
        "reason": matched_te[0] if matched_te else ""
    }

    return SchemeMatchResult(
        scheme=summary_obj, # type: ignore
        score=score,
        status=status,
        matched_criteria_te=matched_te,
        unmatched_criteria_te=unmatched_te,
        matched_criteria_en=matched_en,
        unmatched_criteria_en=unmatched_en,
        required_documents=scheme.required_documents or [],
        voice_guidance_te=voice_guidance
    )

def get_recommendations_for_profile(db: Session, profile: ProfileCheckRequest) -> RecommendationResponse:
    schemes = db.query(Scheme).all()
    categories = {c.id: (c.name_te, c.name_en) for c in db.query(Category).all()}
    
    results: List[SchemeMatchResult] = []
    for s in schemes:
        cat_te, cat_en = categories.get(s.category_id, ("", ""))
        match_res = evaluate_scheme_eligibility(s, profile, cat_te, cat_en)
        results.append(match_res)
        
    # Sort descending by match score
    results.sort(key=lambda x: x.score, reverse=True)
    
    eligible = [r for r in results if r.status == "eligible"]
    potential = [r for r in results if r.status == "needs_more_info"]
    
    top_schemes_te = ", ".join([r.scheme.name_te.split("(")[0].strip() for r in eligible[:3]])
    
    summary_te = (
        f"మీ వివరాల ఆధారంగా మొత్తం {len(schemes)} పథకాలను పరిశీలించాము. "
        f"వాటిలో {len(eligible)} పథకాలకు మీరు ప్రాథమికంగా అర్హులు, "
        f"{len(potential)} పథకాలకు మరిన్ని వివరాలు అవసరం."
    )
    
    voice_narration_te = (
        f"నమస్కారం! మీ వివరాల ప్రకారం మీరు {len(eligible)} ప్రభుత్వ పథకాలకు అర్హత పొందవచ్చు. "
        f"ముఖ్యంగా: {top_schemes_te}. పూర్తి వివరాలు క్రింది కార్డులలో చూడవచ్చు."
    ) if eligible else (
        f"నమస్కారం! మీ వివరాల ప్రకారం మరిన్ని వివరాలు పరిశీలించాల్సి ఉంది. "
        f"దయచేసి క్రింది జాబితాను పరిశీలించండి లేదా నాతో మాట్లాడండి."
    )
    
    summary_en = (
        f"Based on your profile, we evaluated {len(schemes)} government welfare schemes. "
        f"You are potentially eligible for {len(eligible)} schemes, with {len(potential)} schemes requiring additional verification."
    )

    return RecommendationResponse(
        total_evaluated=len(schemes),
        eligible_count=len(eligible),
        potentially_eligible_count=len(potential),
        recommendations=results,
        summary_te=summary_te,
        summary_en=summary_en,
        voice_narration_te=voice_narration_te,
        disclaimer_te="గమనిక: ఈ సరిపోలిక స్కోరు అంతర్గత సమాచార మార్గదర్శి మాత్రమే. ఇది అధికారిక ప్రభుత్వ ఆమోదం కాదు. దరఖాస్తును అధికారిక పోర్టల్ లేదా సచివాలయంలో సమర్పించాలి.",
        disclaimer_en="Disclaimer: This matching score is an informational guidance indicator and not an official government approval. Always submit applications through official portals or Secretariats."
    )
