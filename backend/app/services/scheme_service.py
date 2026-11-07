from sqlalchemy.orm import Session
from sqlalchemy import or_, func
from app.models.scheme import Scheme, Category
from app.utils.seed_data import CATEGORIES_DATA, SCHEMES_DATA
from typing import Optional, List, Dict, Any

def seed_database_if_empty(db: Session):
    """Seed categories and schemes if database is empty."""
    if db.query(Category).count() == 0:
        category_map = {}
        for cat in CATEGORIES_DATA:
            category_obj = Category(
                slug=cat["slug"],
                name_te=cat["name_te"],
                name_en=cat["name_en"],
                name_hi=cat.get("name_hi"),
                icon=cat["icon"],
                description_te=cat["description_te"],
                description_en=cat["description_en"],
                sort_order=cat.get("sort_order", 0)
            )
            db.add(category_obj)
            db.commit()
            db.refresh(category_obj)
            category_map[cat["slug"]] = category_obj.id

        for s in SCHEMES_DATA:
            cat_id = category_map.get(s["category_slug"])
            if cat_id:
                scheme_obj = Scheme(
                    slug=s["slug"],
                    category_id=cat_id,
                    name_te=s["name_te"],
                    name_en=s["name_en"],
                    name_hi=s.get("name_hi"),
                    code=s.get("code"),
                    level=s.get("level", "Central"),
                    state=s.get("state", "All India"),
                    target_beneficiaries=s.get("target_beneficiaries", []),
                    financial_amount=s.get("financial_amount"),
                    purpose_te=s["purpose_te"],
                    purpose_en=s["purpose_en"],
                    benefits_te=s["benefits_te"],
                    benefits_en=s["benefits_en"],
                    eligibility_criteria_te=s.get("eligibility_criteria_te", []),
                    eligibility_criteria_en=s.get("eligibility_criteria_en", []),
                    exclusions_te=s.get("exclusions_te", []),
                    exclusions_en=s.get("exclusions_en", []),
                    match_rules=s.get("match_rules", {}),
                    required_documents=s.get("required_documents", []),
                    application_procedure_te=s.get("application_procedure_te", []),
                    application_procedure_en=s.get("application_procedure_en", []),
                    application_mode=s.get("application_mode", "Online & MeeSeva"),
                    official_website=s["official_website"],
                    portal_name=s["portal_name"],
                    helpline_number=s.get("helpline_number"),
                    verified=s.get("verified", True),
                    verification_source=s.get("verification_source", "Official Government Portal"),
                    last_verified_date=s.get("last_verified_date", "2026-03-01"),
                    warning_notes_te=s.get("warning_notes_te"),
                    warning_notes_en=s.get("warning_notes_en"),
                    faqs=s.get("faqs", [])
                )
                db.add(scheme_obj)
        db.commit()

def get_all_categories(db: Session):
    cats = db.query(Category).order_by(Category.sort_order).all()
    results = []
    for c in cats:
        count = db.query(Scheme).filter(Scheme.category_id == c.id).count()
        results.append({
            "id": c.id,
            "slug": c.slug,
            "name_te": c.name_te,
            "name_en": c.name_en,
            "name_hi": c.name_hi,
            "icon": c.icon,
            "description_te": c.description_te,
            "description_en": c.description_en,
            "sort_order": c.sort_order,
            "scheme_count": count
        })
    return results

def get_schemes_list(
    db: Session,
    category_slug: Optional[str] = None,
    level: Optional[str] = None,
    query: Optional[str] = None,
    skip: int = 0,
    limit: int = 50
):
    q = db.query(Scheme)
    
    if category_slug:
        cat = db.query(Category).filter(Category.slug == category_slug).first()
        if cat:
            q = q.filter(Scheme.category_id == cat.id)
            
    if level and level != "all":
        if "andhra" in level.lower():
            q = q.filter(Scheme.level.ilike("%Andhra%"))
        elif "central" in level.lower():
            q = q.filter(Scheme.level.ilike("%Central%"))
            
    if query:
        search_filter = or_(
            Scheme.name_te.ilike(f"%{query}%"),
            Scheme.name_en.ilike(f"%{query}%"),
            Scheme.code.ilike(f"%{query}%"),
            Scheme.purpose_te.ilike(f"%{query}%"),
            Scheme.purpose_en.ilike(f"%{query}%"),
            Scheme.benefits_te.ilike(f"%{query}%")
        )
        q = q.filter(search_filter)
        
    total = q.count()
    schemes = q.order_by(Scheme.id).offset(skip).limit(limit).all()
    
    results = []
    for s in schemes:
        cat = db.query(Category).filter(Category.id == s.category_id).first()
        results.append({
            "id": s.id,
            "slug": s.slug,
            "category_id": s.category_id,
            "category_name_te": cat.name_te if cat else "",
            "category_name_en": cat.name_en if cat else "",
            "name_te": s.name_te,
            "name_en": s.name_en,
            "code": s.code,
            "level": s.level,
            "financial_amount": s.financial_amount,
            "purpose_te": s.purpose_te,
            "purpose_en": s.purpose_en,
            "benefits_te": s.benefits_te,
            "benefits_en": s.benefits_en,
            "verified": s.verified,
            "official_website": s.official_website
        })
    return {"total": total, "schemes": results}

def get_scheme_by_id_or_slug(db: Session, identifier: str):
    if identifier.isdigit():
        scheme = db.query(Scheme).filter(Scheme.id == int(identifier)).first()
    else:
        scheme = db.query(Scheme).filter(Scheme.slug == identifier).first()
        
    if scheme:
        scheme.view_count = (scheme.view_count or 0) + 1
        db.commit()
    return scheme
