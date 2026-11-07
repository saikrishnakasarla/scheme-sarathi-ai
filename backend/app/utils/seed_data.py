"""
Seed data for Scheme Sarathi: 8 Verified Government Welfare Categories and 18+ Comprehensive Schemes
Authoritative sources from Central and Andhra Pradesh Government portals.
"""

CATEGORIES_DATA = [
    {
        "slug": "farmers",
        "name_te": "రైతులకు పథకాలు",
        "name_en": "Farmer Schemes",
        "name_hi": "किसान योजनाएं",
        "icon": "Tractor",
        "description_te": "రైతులకు పెట్టుబడి సహాయం, పంటల బీమా, సౌర విద్యుత్ పంపులు మరియు వ్యవసాయ ఉపకరణాల పథకాలు.",
        "description_en": "Investment assistance, crop insurance, solar pumps, and agricultural subsidies for farmers.",
        "sort_order": 1
    },
    {
        "slug": "students",
        "name_te": "విద్యార్థులకు పథకాలు",
        "name_en": "Student Schemes",
        "name_hi": "छात्र योजनाएं",
        "icon": "GraduationCap",
        "description_te": "పాఠశాల మరియు కళాశాల విద్యార్థుల ఫీజు రీయింబర్స్‌మెంట్, ఉపకార వేతనాలు (స్కాలర్‌షిప్‌లు) మరియు వసతి సదుపాయాలు.",
        "description_en": "Tuition fee reimbursements, scholarships, and hostel assistance for students.",
        "sort_order": 2
    },
    {
        "slug": "women",
        "name_te": "మహిళలకు పథకాలు",
        "name_en": "Women Welfare Schemes",
        "name_hi": "महिला कल्याण योजनाएं",
        "icon": "HeartHandshake",
        "description_te": "మహిళా సాధికారత, స్వయం సహాయక సంఘాలు, ప్రసూతి సహాయం మరియు సున్నా వడ్డీ రుణాల పథకాలు.",
        "description_en": "Women empowerment, SHG support, maternity assistance, and zero-interest loans.",
        "sort_order": 3
    },
    {
        "slug": "health",
        "name_te": "ఆరోగ్య పథకాలు",
        "name_en": "Health Schemes",
        "name_hi": "स्वास्थ्य योजनाएं",
        "icon": "Activity",
        "description_te": "ఉచిత ఆసుపత్రి చికిత్సలు, ఆరోగ్య బీమా కార్డులు మరియు ఉచిత వైద్య పరీక్షల పథకాలు.",
        "description_en": "Free secondary/tertiary hospital treatments and government health insurance cards.",
        "sort_order": 4
    },
    {
        "slug": "housing",
        "name_te": "గృహ నిర్మాణ పథకాలు",
        "name_en": "Housing Schemes",
        "name_hi": "आवास योजनाएं",
        "icon": "Home",
        "description_te": "గ్రామీణ ప్రాంతాల్లో పేదలకు పక్కా ఇళ్ల నిర్మాణం, ఉచిత ఇంటి స్థలాలు మరియు ఆర్థిక సహాయం.",
        "description_en": "Pucca housing construction assistance and free house sites for rural families.",
        "sort_order": 5
    },
    {
        "slug": "employment",
        "name_te": "ఉపాధి పథకాలు",
        "name_en": "Employment Schemes",
        "name_hi": "रोजगार योजनाएं",
        "icon": "Briefcase",
        "description_te": "ఉపాధి హామీ పథకం (100 రోజుల పని), సాంప్రదాయ చేతివృత్తుల వారికి పరికరాలు మరియు ఉపాధి అవకాశాలు.",
        "description_en": "Guaranteed 100 days wage employment and toolkit support for rural artisans.",
        "sort_order": 6
    },
    {
        "slug": "loans",
        "name_te": "వ్యాపార రుణాలు",
        "name_en": "Business Loans",
        "name_hi": "व्यापार ऋण",
        "icon": "Coins",
        "description_te": "చిరు వ్యాపారులకు హామీ లేని ముద్రా రుణాలు, వీధి వ్యాపారుల ప్రోత్సాహకాలు మరియు వ్యాపార విస్తరణ సాయం.",
        "description_en": "Collateral-free micro loans, street vendor credit, and rural MSME funding.",
        "sort_order": 7
    },
    {
        "slug": "skills",
        "name_te": "నైపుణ్య శిక్షణ",
        "name_en": "Skill Development",
        "name_hi": "कौशल विकास",
        "icon": "Wrench",
        "description_te": "గ్రామీణ నిరుద్యోగ యువతకు ఉచిత కంప్యూటర్, సాంకేతిక శిక్షణ మరియు ఉద్యోగ కల్పన పథకాలు.",
        "description_en": "Free vocational training, placement programs, and skill certification for youth.",
        "sort_order": 8
    }
]

SCHEMES_DATA = [
    # 1. PM-KISAN
    {
        "slug": "pm-kisan",
        "category_slug": "farmers",
        "name_te": "ప్రధాన మంత్రి కిసాన్ సమ్మాన్ నిధి (PM-KISAN)",
        "name_en": "Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)",
        "name_hi": "प्रधानमंत्री किसान सम्मान निधि",
        "code": "PM-KISAN",
        "level": "Central",
        "state": "All India",
        "target_beneficiaries": ["Farmer", "Small and Marginal Landholder"],
        "financial_amount": "₹6,000 / సంవత్సరం",
        "purpose_te": "సొంత సాగు భూమి కలిగిన రైతు కుటుంబాలకు ఎరువులు, విత్తనాలు కొనుగోలు చేయడానికి ఆర్థిక మద్దతు అందించడం.",
        "purpose_en": "To provide income support to all landholding farmers' families to meet their agricultural and domestic needs.",
        "benefits_te": "సంవత్సరానికి ₹6,000 నేరుగా బ్యాంక్ ఖాతాలో (DBT) 3 విడతల్లో జమ చేస్తారు (ఒక్కో విడతకు ₹2,000).",
        "benefits_en": "Direct financial assistance of ₹6,000 per annum paid in three equal 4-monthly installments of ₹2,000 directly into bank accounts.",
        "eligibility_criteria_te": [
            "సొంతంగా సాగు భూమి కలిగిన రైతు కుటుంబాలు మాత్రమే అర్హులు.",
            "లబ్ధిదారుల ఆధార్ కార్డు మరియు బ్యాంకు ఖాతా లింక్ (e-KYC) పూర్తయి ఉండాలి.",
            "భూ రికార్డుల్లో పేరు నమోదై ఉండాలి."
        ],
        "eligibility_criteria_en": [
            "All landholding farmer families with cultivable land in their names.",
            "Aadhaar linked with Bank account and active e-KYC completed on portal.",
            "Land title records (Pattadar Passbook / 1B) verified."
        ],
        "exclusions_te": [
            "రాజ్యాంగ పదవులు నిర్వహించిన వారు లేదా నిర్వహిస్తున్న వారు.",
            "ప్రస్తుత/మాజీ మంత్రులు, ఎంపీలు, ఎమ్మెల్యేలు, నగరపాలక సంస్థల మేయర్లు.",
            "కేంద్ర/రాష్ట్ర ప్రభుత్వ ఉద్యోగులు లేదా రిటైర్డ్ ఉద్యోగులు.",
            "నెలకు ₹10,000 కంటే ఎక్కువ పెన్షన్ పొందుతున్న రిటైర్డ్ ఉద్యోగులు.",
            "గత అసెస్‌మెంట్ సంవత్సరంలో ఆదాయపు పన్ను (Income Tax) చెల్లించిన వారు."
        ],
        "exclusions_en": [
            "Institutional landholders and constitutional post holders.",
            "Current or former ministers, MPs, MLAs, municipal mayors.",
            "Serving or retired government officers and employees.",
            "Pensioners receiving monthly pension of ₹10,000 or more.",
            "All persons who paid Income Tax in last assessment year."
        ],
        "match_rules": {
            "occupations": ["farmer", "agricultural_worker"],
            "land_required": True,
            "max_land_acres": 100.0,
            "min_age": 18,
            "max_age": 95,
            "excludes_tax_payers": True
        },
        "required_documents": [
            {"name_te": "ఆధార్ కార్డు (e-KYC కోసం)", "name_en": "Aadhaar Card with e-KYC", "mandatory": True, "details_te": "మొబైల్ నెంబర్‌తో లింక్ అయి ఉండాలి."},
            {"name_te": "పట్టాదారు పాస్ పుస్తకం / 1B రికార్డు", "name_en": "Pattadar Passbook / 1B Land Record", "mandatory": True, "details_te": "రెవెన్యూ శాఖ వారి తాజా రికార్డు."},
            {"name_te": "బ్యాంక్ పాస్ పుస్తకం (NPCI మ్యాపింగ్)", "name_en": "Bank Account Details (NPCI Aadhaar Seeded)", "mandatory": True, "details_te": "DBT సదుపాయం యాక్టివ్‌గా ఉండాలి."}
        ],
        "application_procedure_te": [
            "1. అధికారిక pmkisan.gov.in వెబ్‌సైట్‌ను సందర్శించండి లేదా మీ గ్రామ సచివాలయాన్ని సంప్రదించండి.",
            "2. 'Farmers Corner' లో 'New Farmer Registration' పై క్లిక్ చేయండి.",
            "3. మీ ఆధార్ నంబర్, రాష్ట్రం నమోదు చేసి OTP ద్వారా ధృవీకరించండి.",
            "4. భూమి వివరాలు (సర్వే నంబర్, ఖాటా నంబర్) మరియు బ్యాంక్ ఖాతా వివరాలు నమోదు చేయండి.",
            "5. e-KYC పూర్తి చేసి దరఖాస్తును సమర్పించండి."
        ],
        "application_procedure_en": [
            "1. Visit the official portal pmkisan.gov.in or visit your local Grama Sachivalayam / CSC.",
            "2. Go to 'Farmers Corner' and select 'New Farmer Registration'.",
            "3. Enter Aadhaar number and verify via OTP.",
            "4. Fill land details (Survey No., Khata No.) and seeded bank details.",
            "5. Complete e-KYC authentication and submit application."
        ],
        "application_mode": "Online Portal / Grama Sachivalayam",
        "official_website": "https://pmkisan.gov.in",
        "portal_name": "PM-KISAN Portal",
        "helpline_number": "155261 / 011-24300606",
        "verified": True,
        "verification_source": "Ministry of Agriculture & Farmers Welfare, GoI",
        "last_verified_date": "2026-03-01",
        "faqs": [
            {
                "q_te": "నాకు కౌలు రైతుగా భూమి ఉంది, నేను దరఖాస్తు చేసుకోవచ్చా?",
                "a_te": "సాధారణ PM-KISAN కింద సొంతంగా పట్టాదారు భూమి ఉన్నవారు మాత్రమే అర్హులు. కౌలు రైతుల కోసం రాష్ట్ర ప్రభుత్వం ప్రత్యేక పథకాలు అమలు చేస్తుంది.",
                "q_en": "Can tenant farmers apply for PM-KISAN?",
                "a_en": "PM-KISAN is exclusively for landowners with clear revenue title deeds. Tenant farmers are covered under specific state schemes."
            },
            {
                "q_te": "e-KYC ఎలా చేయాలి?",
                "a_te": "pmkisan.gov.in వెబ్‌సైట్‌లో 'e-KYC' లింక్ క్లిక్ చేసి ఆధార్ OTP ద్వారా ఉచితంగా లేదా సచివాలయంలో వేలిముద్ర ద్వారా చేసుకోవచ్చు.",
                "q_en": "How can I complete e-KYC?",
                "a_en": "Visit pmkisan.gov.in and click OTP-based e-KYC, or visit your nearest Grama Sachivalayam / CSC for biometric e-KYC."
            }
        ]
    },

    # 2. PM Fasal Bima Yojana (PMFBY)
    {
        "slug": "pmfby",
        "category_slug": "farmers",
        "name_te": "ప్రధాన మంత్రి ఫసల్ బీమా యోజన (PMFBY)",
        "name_en": "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
        "name_hi": "प्रधानमंत्री फसल बीमा योजना",
        "code": "PMFBY",
        "level": "Central / State",
        "state": "All India & Andhra Pradesh",
        "target_beneficiaries": ["Farmer", "Tenant Farmer", "Sharecropper"],
        "financial_amount": "పూర్తి పంట నష్టపరిహారం (సహాయక ప్రీమియం)",
        "purpose_te": "వర్షాభావం, తుఫానులు, తెగుళ్లు తదితర ప్రకృతి వైపరీత్యాల వల్ల పంట నష్టపోయినప్పుడు రైతులకు సమగ్ర బీమా రక్షణ కల్పించడం.",
        "purpose_en": "Provide comprehensive insurance coverage and financial support to farmers suffering crop loss/damage due to natural calamities.",
        "benefits_te": "ఖరీఫ్ పంటలకు కేవలం 2%, రబీ పంటలకు 1.5%, వాణిజ్య/ఉద్యానవన పంటలకు 5% నామమాత్రపు ప్రీమియం. మిగిలిన ప్రీమియంను ప్రభుత్వం భరిస్తుంది.",
        "benefits_en": "Extremely low premium of 2% for Kharif, 1.5% for Rabi, and 5% for commercial/horticultural crops. Remaining subsidy paid by government.",
        "eligibility_criteria_te": [
            "నోటిఫై చేసిన ప్రాంతాల్లో నోటిఫై చేసిన పంటలను పండించే రైతులందరూ (సొంత మరియు కౌలు రైతులు) అర్హులు.",
            "బ్యాంకు నుంచి పంట రుణం తీసుకున్న మరియు తీసుకోని రైతులు ఇద్దరూ నమోదు చేసుకోవచ్చు."
        ],
        "eligibility_criteria_en": [
            "All farmers growing notified crops in notified areas, including sharecroppers and tenant farmers.",
            "Applicable to both loanee and non-loanee farmers."
        ],
        "exclusions_te": [
            "యుద్ధం, అణు ప్రమాదాలు, లేదా శత్రుత్వ చర్యల వల్ల జరిగిన నష్టాలు.",
            "రైతు ఉద్దేశపూర్వక నిర్లక్ష్యం వల్ల పంట నాశనమైన సందర్భాలు."
        ],
        "exclusions_en": [
            "Losses arising out of war, nuclear hazards, or malicious damage.",
            "Loss caused by preventable farmer negligence."
        ],
        "match_rules": {
            "occupations": ["farmer", "agricultural_worker"],
            "land_required": True,
            "min_age": 18
        },
        "required_documents": [
            {"name_te": "ఆధార్ కార్డు", "name_en": "Aadhaar Card", "mandatory": True, "details_te": "గుర్తింపు ధృవీకరణ."},
            {"name_te": "భూమి యాజమాన్య పత్రం / కౌలు ఒప్పందం (CCRC)", "name_en": "Land Document / Tenant Card (CCRC)", "mandatory": True, "details_te": "పట్టాదారు పాస్‌బుక్ లేదా ఈ-పంట నమోదు."},
            {"name_te": "ఈ-పంట (e-Panta) ధృవీకరణ రసీదు", "name_en": "e-Panta Sowing Certificate", "mandatory": True, "details_te": "గ్రామ వ్యవసాయ సహాయకుడు (VAA) చే ధృవీకరణ."},
            {"name_te": "బ్యాంక్ ఖాతా వివరాలు", "name_en": "Bank Account Details", "mandatory": True, "details_te": "పరిహారం జమ చేయడానికి."}
        ],
        "application_procedure_te": [
            "1. మీ గ్రామంలోని రైతు భరోసా కేంద్రం (RBK) లేదా గ్రామ సచివాలయాన్ని సంప్రదించండి.",
            "2. మీ పంట వివరాలను e-Panta లో నమోదు చేసుకున్నారని నిర్ధారించుకోండి.",
            "3. పంట కోత లేదా విత్తనం వేసిన నిర్ణీత గడువులోపు బీమా దరఖాస్తును సమర్పించండి.",
            "4. ప్రకృతి వైపరీత్యం సంభవించిన 72 గంటల్లోపు 'Crop Insurance App' ద్వారా లేదా టోల్ ఫ్రీ నెంబర్‌కు సమాచారం ఇవ్వండి."
        ],
        "application_procedure_en": [
            "1. Visit your local Rythu Bharosa Kendram (RBK) or Grama Sachivalayam.",
            "2. Ensure your crop is enrolled in the official e-Panta portal.",
            "3. Submit the PMFBY application before the seasonal cutoff deadline.",
            "4. Report localized damage within 72 hours via the Crop Insurance App or helpline."
        ],
        "application_mode": "Rythu Bharosa Kendram / Online Portal",
        "official_website": "https://pmfby.gov.in",
        "portal_name": "PMFBY National Portal",
        "helpline_number": "14447 / 1800-180-1551",
        "verified": True,
        "verification_source": "Ministry of Agriculture & Farmers Welfare, GoI",
        "last_verified_date": "2026-03-01",
        "faqs": [
            {
                "q_te": "పంట నష్టం జరిగితే ఎవరికి ఫిర్యాదు చేయాలి?",
                "a_te": "నష్టం జరిగిన 72 గంటల లోపు టోల్ ఫ్రీ 14447 లేదా గ్రామ వ్యవసాయ సహాయకుడికి (VAA) సమాచారం అందించాలి.",
                "q_en": "Whom to notify if crop damage occurs?",
                "a_en": "Report to the toll-free helpline 14447 or your Village Agriculture Assistant (VAA) within 72 hours of calamity."
            }
        ]
    },

    # 3. PM-KUSUM
    {
        "slug": "pm-kusum",
        "category_slug": "farmers",
        "name_te": "పీఎం కుసుమ్ యోజన - సౌర వ్యవసాయ పంపులు",
        "name_en": "PM-KUSUM Scheme (Solar Agriculture Pumps)",
        "name_hi": "पीएम कुसुम योजना",
        "code": "PM-KUSUM",
        "level": "Central / State",
        "state": "All India",
        "target_beneficiaries": ["Farmer", "Farmer Producer Organizations", "Water User Associations"],
        "financial_amount": "60% వరకు ప్రభుత్వ సబ్సిడీ",
        "purpose_te": "రైతులకు డీజిల్ రహిత వ్యవసాయాన్ని ప్రోత్సహించడం, పగటిపూట నిరంతర విద్యుత్ కోసం సోలార్ వాటర్ పంపింగ్ సిస్టమ్స్ ఏర్పాటు చేయడం.",
        "purpose_en": "Promote solar water pumps and grid-connected renewable power for clean irrigation and secondary income.",
        "benefits_te": "కేంద్ర ప్రభుత్వం 30%, రాష్ట్ర ప్రభుత్వం 30% రాయితీ (మొత్తం 60% సబ్సిడీ). రైతు కేవలం 10% ఖర్చు భరిస్తే చాలు, మిగిలిన 30% బ్యాంక్ రుణం లభిస్తుంది.",
        "benefits_en": "60% government subsidy (30% Central + 30% State). Farmers contribute only 10% of total pump cost; 30% is bank-financed.",
        "eligibility_criteria_te": [
            "వ్యవసాయ భూమి మరియు బోర్వెల్ లేదా బావి కలిగి ఉన్న రైతులు.",
            "గ్రిడ్ విద్యుత్ కనెక్షన్ లేని లేదా విద్యుత్ అంతరాయాలు ఉన్న ప్రాంతాల్లోని రైతులకు ప్రాధాన్యత."
        ],
        "eligibility_criteria_en": [
            "Farmers possessing agricultural land with an existing functional borewell/open well.",
            "Priority to farmers in off-grid rural areas or diesel pump users."
        ],
        "exclusions_te": [
            "గతంలో ప్రభుత్వ రాయితీతో సోలార్ పంపు సెట్లు తీసుకున్న వారు.",
            "నీటి వనరు లేదా తగినంత బోర్వెల్ దిగుబడి లేని ప్రాంతాలు."
        ],
        "exclusions_en": [
            "Beneficiaries who already received subsidized solar pumps under other government schemes.",
            "Areas lacking sufficient groundwater resources."
        ],
        "match_rules": {
            "occupations": ["farmer"],
            "land_required": True,
            "min_age": 18
        },
        "required_documents": [
            {"name_te": "పట్టాదారు పాస్‌బుక్ / అడంగల్", "name_en": "Land Pattadar Passbook / Adangal", "mandatory": True, "details_te": "భూమి యాజమాన్య పత్రం."},
            {"name_te": "ఆధార్ కార్డు", "name_en": "Aadhaar Card", "mandatory": True, "details_te": "గుర్తింపు కోసం."},
            {"name_te": "బోర్వెల్ లేదా నీటి వనరు ఫోటో & రసీదు", "name_en": "Borewell Water Source Proof", "mandatory": True, "details_te": "నీటి వనరు ధృవీకరణ."},
            {"name_te": "బ్యాంక్ ఖాతా పాస్ పుస్తకం", "name_en": "Bank Passbook", "mandatory": True, "details_te": "రుణం మరియు వాటా జమ చేయడానికి."}
        ],
        "application_procedure_te": [
            "1. మీ రాష్ట్ర పునరుత్పాదక ఇంధన సంస్థ (APREDCO/NREDCAP) అధికారిక పోర్టల్‌ను సందర్శించండి.",
            "2. కుసుమ్ కంపోనెంట్-B కింద దరఖాస్తు ఫారమ్ పూరించండి.",
            "3. భూమి మరియు బోర్వెల్ వివరాలు అప్‌లోడ్ చేయండి.",
            "4. దరఖాస్తు ఆమోదం పొందాక 10% రైతు వాటాను చెల్లించండి.",
            "5. ఏజెన్సీ ప్రతినిధులు వచ్చి క్షేత్రస్థాయి పరిశీలన జరిపి సోలార్ పంపును అమర్చుతారు."
        ],
        "application_procedure_en": [
            "1. Visit the state renewable energy portal (e.g. NREDCAP in Andhra Pradesh) or pmkusum.mnre.gov.in.",
            "2. Apply under Component-B for standalone solar agricultural pumps.",
            "3. Upload land and borewell verification records.",
            "4. Pay the farmer contribution (10%) upon application approval.",
            "5. Empanelled solar vendor installs and commissions the pump system."
        ],
        "application_mode": "Online / State Renewable Energy Agency",
        "official_website": "https://pmkusum.mnre.gov.in",
        "portal_name": "Ministry of New and Renewable Energy (MNRE)",
        "helpline_number": "1800-180-3333",
        "verified": True,
        "verification_source": "Ministry of New and Renewable Energy, GoI",
        "last_verified_date": "2026-03-01",
        "faqs": []
    },

    # 4. Ayushman Bharat PM-JAY
    {
        "slug": "ayushman-bharat-pmjay",
        "category_slug": "health",
        "name_te": "ఆయుష్మాన్ భారత్ - ప్రధాన మంత్రి జన ఆరోగ్య యోజన (AB PM-JAY)",
        "name_en": "Ayushman Bharat - PM Jan Arogya Yojana (AB PM-JAY)",
        "name_hi": "आयुष्मान भारत - पीएम जन आरोग्य योजना",
        "code": "PM-JAY",
        "level": "Central / State",
        "state": "All India & Andhra Pradesh",
        "target_beneficiaries": ["BPL Families", "Rural Poor", "Senior Citizens 70+"],
        "financial_amount": "₹5,00,000 / కుటుంబానికి / సంవత్సరానికి",
        "purpose_te": "నిరుపేద కుటుంబాలకు తీవ్రమైన అనారోగ్యాలు, శస్త్రచికిత్సల సమయంలో కార్పొరేట్ మరియు ప్రభుత్వ ఆసుపత్రులలో ఉచిత నగదు రహిత వైద్య చికిత్స అందించడం.",
        "purpose_en": "Provide cashless hospitalization up to ₹5 lakh per family per year for secondary and tertiary healthcare.",
        "benefits_te": "దేశవ్యాప్తంగా ఎంప్లాయ్ చేయబడిన ఏ ప్రభుత్వ లేదా ప్రైవేట్ ఆసుపత్రిలోనైనా సంవత్సరానికి ₹5 లక్షల వరకు ఉచిత చికిత్స. 70 ఏళ్లు పైబడిన సీనియర్ సిటిజన్లకు ప్రత్యేక కార్డ్.",
        "benefits_en": "Free cashless treatment up to ₹5 lakh per year in empanelled hospitals. Special top-up cover for senior citizens aged 70+.",
        "eligibility_criteria_te": [
            "SECC 2011 డేటాబేస్ లేదా ఆహార భద్రతా కార్డు (రేషన్ కార్డ్) ఉన్న నిరుపేద కుటుంబాలు.",
            "ఆంధ్రప్రదేశ్‌లో ఆరోగ్యశ్రీ కార్డు కలిగిన వారు కూడా సమన్వయం చేయబడతారు.",
            "70 సంవత్సరాలు నిండిన వృద్ధులకు ఆదాయ పరిమితితో సంబంధం లేకుండా 'ఆయుష్మాన్ వయ వందన కార్డు' లభిస్తుంది."
        ],
        "eligibility_criteria_en": [
            "Families listed in SECC 2011 rural deprivation criteria or active Ration Card holders.",
            "Integrated with State health schemes (Aarogyasri).",
            "Senior citizens aged 70+ eligible for Ayushman Vaya Vandana card regardless of income."
        ],
        "exclusions_te": [
            "వ్యవస్థీకృత రంగంలో పనిచేస్తున్న ఉద్యోగులు (ESI/CGHS వర్తించేవారు).",
            "ఆదాయపు పన్ను చెల్లింపుదారులు (70+ వయ వందన మినహా)."
        ],
        "exclusions_en": [
            "Organized sector employees covered by ESI, CGHS, or defense schemes.",
            "Income tax payers (except under 70+ Vaya Vandana scheme)."
        ],
        "match_rules": {
            "max_income": 300000,
            "bpl_only": True,
            "min_age": 0,
            "max_age": 120
        },
        "required_documents": [
            {"name_te": "ఆధార్ కార్డు", "name_en": "Aadhaar Card", "mandatory": True, "details_te": "లబ్ధిదారుడి బయోమెట్రిక్ ప్రామాణీకరణ కోసం."},
            {"name_te": "రేషన్ కార్డు (బియ్యం కార్డు)", "name_en": "Ration Card (Rice Card)", "mandatory": True, "details_te": "కుటుంబ సభ్యుల నిర్ధారణ కోసం."},
            {"name_te": "ఆధార్ లింక్డ్ మొబైల్ నంబర్", "name_en": "Aadhaar Linked Mobile Number", "mandatory": True, "details_te": "OTP ధృవీకరణ కోసం."}
        ],
        "application_procedure_te": [
            "1. మీ సమీపంలోని ప్రభుత్వ ఆసుపత్రిలోని 'ఆయుష్మాన్ మిత్ర' కౌంటర్‌ను లేదా గ్రామ సచివాలయాన్ని సంప్రదించండి.",
            "2. beneficary.nha.gov.in పోర్టల్‌లో మీ ఆధార్ లేదా రేషన్ కార్డు నంబర్ నమోదు చేసి అర్హత చెక్ చేయండి.",
            "3. e-KYC (ముఖ గుర్తింపు లేదా OTP) పూర్తి చేయండి.",
            "4. మీ ఆయుష్మాన్ పివిసి కార్డును ఉచితంగా డౌన్‌లోడ్ చేసుకోండి."
        ],
        "application_procedure_en": [
            "1. Visit the 'Ayushman Mitra' helpdesk at any empanelled hospital or Grama Sachivalayam.",
            "2. Check eligibility on beneficiary.nha.gov.in using Aadhaar or Ration card number.",
            "3. Complete instant e-KYC via facial recognition or Aadhaar OTP.",
            "4. Download and print your Ayushman Card."
        ],
        "application_mode": "Hospital Ayushman Desk / Beneficiary Portal",
        "official_website": "https://beneficiary.nha.gov.in",
        "portal_name": "National Health Authority (NHA)",
        "helpline_number": "14555",
        "verified": True,
        "verification_source": "National Health Authority, Ministry of Health and Family Welfare",
        "last_verified_date": "2026-03-01",
        "faqs": [
            {
                "q_te": "చికిత్స కోసం ముందుగా డబ్బు చెల్లించాలా?",
                "a_te": "లేదు! ఇది పూర్తిగా క్యాష్‌లెస్ (నగదు రహితం). ఆసుపత్రిలో అడ్మిట్ అయిన దగ్గర నుంచి డిశ్చార్జ్ అయ్యే వరకు మందులు, భోజనం, పరీక్షలు అన్నీ ఉచితం.",
                "q_en": "Do I have to pay money upfront during admission?",
                "a_en": "No. The scheme is 100% cashless at all empanelled hospitals for all covered medical packages."
            }
        ]
    },

    # 5. Dr. YSR Aarogyasri / NTR Vaidya Seva
    {
        "slug": "ysr-aarogyasri",
        "category_slug": "health",
        "name_te": "డాక్టర్ వైఎస్సార్ ఆరోగ్యశ్రీ / ఎన్టీఆర్ వైద్య సేవ",
        "name_en": "Dr. YSR Aarogyasri / NTR Vaidya Seva Health Scheme",
        "name_hi": "डॉ. वाईएसआर आरोग्यश्री योजना",
        "code": "AAROGYASRI",
        "level": "Andhra Pradesh",
        "state": "Andhra Pradesh",
        "target_beneficiaries": ["BPL Families in Andhra Pradesh", "Rice Card Holders"],
        "financial_amount": "₹25,00,000 వరకు ఉచిత వైద్య సేవలు",
        "purpose_te": "ఆంధ్రప్రదేశ్ రాష్ట్రంలోని పేద మరియు మధ్యతరగతి కుటుంబాలకు తీవ్ర అనారోగ్యాలు మరియు శస్త్రచికిత్సలకు కార్పొరేట్ ఆసుపత్రులలో ఉచిత వైద్యం అందించడం.",
        "purpose_en": "Provide end-to-end cashless healthcare coverage to poor and lower-middle-class families in Andhra Pradesh for treatments above ₹1,000.",
        "benefits_te": "3,250 కంటే ఎక్కువ వైద్య ప్రక్రియలకు ₹25 లక్షల వరకు ఉచిత చికిత్స. చికిత్స అనంతరం రికవరీ కాలంలో 'ఆరోగ్య ఆసరా' కింద రోజుకు ₹225 (గరిష్టంగా నెలకు ₹5,000) జీవన భృతి.",
        "benefits_en": "Cashless treatment up to ₹25 lakh covering 3,250+ medical procedures. Post-operative livelihood allowance of ₹225/day (up to ₹5,000/month) under Aarogya Aasara.",
        "eligibility_criteria_te": [
            "ఆంధ్రప్రదేశ్ రాష్ట్రంలో నివసించే కుటుంబాలు.",
            "బియ్యం కార్డు (వైట్ రేషన్ కార్డ్) లేదా వార్షిక ఆదాయం ₹5 లక్షల లోపు ఉన్న కుటుంబాలు.",
            "భూమి పరిమితి: 35 ఎకరాల మెట్ట లేదా 10 ఎకరాల మాగాణి లోపు ఉండాలి."
        ],
        "eligibility_criteria_en": [
            "Resident families of Andhra Pradesh.",
            "Holders of active Rice Card or annual household income under ₹5,00,000.",
            "Land holding under 35 acres dry or 10 acres wet land."
        ],
        "exclusions_te": [
            "ప్రభుత్వ ఉద్యోగులు మరియు ఈహెచ్ఎస్ (EHS) కింద రక్షణ పొందుతున్న వారు.",
            "స్వంతంగా నాలుగు చక్రాల వ్యక్తిగత వాహనం (ట్యాక్సీ/ట్రాక్టర్ మినహా) ఉన్నవారు."
        ],
        "exclusions_en": [
            "Government employees covered under EHS.",
            "Owners of four-wheeler personal luxury vehicles (commercial taxis/tractors exempt)."
        ],
        "match_rules": {
            "states": ["Andhra Pradesh"],
            "max_income": 500000,
            "bpl_only": True
        },
        "required_documents": [
            {"name_te": "ఆరోగ్యశ్రీ కార్డు లేదా వైట్ రేషన్ కార్డు", "name_en": "Aarogyasri Card or Rice Card", "mandatory": True, "details_te": "అర్హత ధృవీకరణ."},
            {"name_te": "ఆధార్ కార్డు", "name_en": "Aadhaar Card", "mandatory": True, "details_te": "కుటుంబ సభ్యుల గుర్తింపు."},
            {"name_te": "ఆదాయ ధృవీకరణ పత్రం (రేషన్ కార్డు లేనిచో)", "name_en": "Income Certificate", "mandatory": False, "details_te": "సచివాలయం జారీ చేసింది."}
        ],
        "application_procedure_te": [
            "1. మీ గ్రామ లేదా వార్డు సచివాలయంలోని ఏఎన్ఎం (ANM) లేదా వెల్ఫేర్ అసిస్టెంట్‌ను కలవండి.",
            "2. మీ ఆధార్ మరియు బియ్యం కార్డు నెంబర్‌తో డిజిటల్ హెల్త్ కార్డ్ డౌన్‌లోడ్ చేసుకోండి.",
            "3. ఏదైనా ఆరోగ్యశ్రీ నెట్‌వర్క్ ఆసుపత్రికి వెళ్లినప్పుడు రిసెప్షన్‌లోని 'ఆరోగ్య మిత్ర'కు కార్డు చూపించి అడ్మిట్ అవ్వండి."
        ],
        "application_procedure_en": [
            "1. Contact your Village/Ward Secretariat ANM or Welfare Assistant.",
            "2. Fetch your digital health card with Aadhaar/Rice card number.",
            "3. Present the card to the 'Aarogya Mithra' desk at any empanelled network hospital."
        ],
        "application_mode": "Grama Sachivalayam / Network Hospital",
        "official_website": "https://ysraarogyasri.ap.gov.in",
        "portal_name": "Dr. YSR Aarogyasri Health Care Trust",
        "helpline_number": "104 / 1902",
        "verified": True,
        "verification_source": "Government of Andhra Pradesh, Health Department",
        "last_verified_date": "2026-03-01",
        "faqs": []
    },

    # 6. Pradhan Mantri Awas Yojana - Gramin (PMAY-G)
    {
        "slug": "pmay-gramin",
        "category_slug": "housing",
        "name_te": "ప్రధాన మంత్రి ఆవాస్ యోజన - గ్రామీణ (PMAY-G)",
        "name_en": "Pradhan Mantri Awas Yojana - Gramin (PMAY-G)",
        "name_hi": "प्रधानमंत्री आवास योजना - ग्रामीण",
        "code": "PMAY-G",
        "level": "Central / State",
        "state": "All India",
        "target_beneficiaries": ["Houseless Rural Families", "Kutcha House Dwellers", "BPL"],
        "financial_amount": "₹1,20,000 + 90 రోజుల ఉపాధి కూలీ",
        "purpose_te": "గ్రామీణ ప్రాంతాల్లో నివాసయోగ్యమైన ఇల్లు లేని పేద కుటుంబాలకు వంటగది మరియు మరుగుదొడ్డితో కూడిన పక్కా ఇళ్ల నిర్మాణానికి ఆర్థిక సహాయం అందించడం.",
        "purpose_en": "Provide pucca houses with basic amenities (kitchen, toilet, electricity) to homeless rural households and those living in dilapidated houses.",
        "benefits_te": "మైదాన ప్రాంతాలలో ₹1,20,000 ఆర్థిక సహాయం. అదనంగా స్వచ్ఛ భారత్ మిషన్ కింద టాయిలెట్ కోసం ₹12,000 మరియు ఉపాధి హామీ కింద 90 రోజుల అన్‌స్కిల్డ్ లేబర్ వేతనం (సుమారు ₹25,000).",
        "benefits_en": "Direct assistance of ₹1.20 lakh for plain areas. Additional ₹12,000 for toilet under SBM-G, plus 90 days of unskilled wage labor under MGNREGA (~₹25,000).",
        "eligibility_criteria_te": [
            "సొంతంగా పక్కా ఇల్లు లేని కుటుంబాలు.",
            "ఒకటి లేదా రెండు గదుల మట్టి/గడ్డి ఇళ్లలో నివసించే నిరుపేదలు.",
            "SECC 2011 శాశ్వత వెయిటింగ్ లిస్ట్ (PWL) లేదా ఆవాస్ ప్లస్ సర్వేలో పేరు నమోదైన వారు."
        ],
        "eligibility_criteria_en": [
            "Houseless families or families living in zero, one, or two-room houses with kutcha wall and kutcha roof.",
            "Listed in SECC 2011 Permanent Wait List (PWL) or Awaas+ verified survey."
        ],
        "exclusions_te": [
            "కుటుంబంలో ఎవరికైనా మోటరైజ్డ్ త్రిచక్ర/నాలుగు చక్రాల వాహనం ఉన్నవారు.",
            "కుటుంబంలో ఎవరైనా ప్రభుత్వ ఉద్యోగిగా ఉన్నవారు.",
            "50,000 లేదా అంతకంటే ఎక్కువ క్రెడిట్ లిమిట్ ఉన్న కిసాన్ క్రెడిట్ కార్డు ఉన్నవారు.",
            "నెలకు ₹15,000 కంటే ఎక్కువ సంపాదించే కుటుంబాలు."
        ],
        "exclusions_en": [
            "Households owning motorized 3/4 wheeler vehicles.",
            "Households with government employees.",
            "Households possessing Kisan Credit Card with limit ≥ ₹50,000.",
            "Households with monthly income > ₹15,000."
        ],
        "match_rules": {
            "max_income": 180000,
            "bpl_only": True,
            "min_age": 18
        },
        "required_documents": [
            {"name_te": "ఆధార్ కార్డు", "name_en": "Aadhaar Card", "mandatory": True, "details_te": "కుటుంబ యజమాని మరియు జీవిత భాగస్వామి ఆధార్."},
            {"name_te": "బ్యాంక్ ఖాతా వివరాలు (Aadhaar Seeded)", "name_en": "Bank Account Details", "mandatory": True, "details_te": "DBT కింద దశలవారీగా బిల్లులు జమ అవుతాయి."},
            {"name_te": "జాబ్ కార్డు (MGNREGA Job Card)", "name_en": "MGNREGA Job Card", "mandatory": True, "details_te": "90 రోజుల కూలీ నిధుల కోసం."},
            {"name_te": "స్థలం యాజమాన్య పత్రం / పట్టా", "name_en": "Land Site Patta / Possession Document", "mandatory": True, "details_te": "ఇంటి నిర్మాణం చేపట్టే స్థలం."}
        ],
        "application_procedure_te": [
            "1. మీ గ్రామ పంచాయతీ కార్యదర్శి లేదా గ్రామ సచివాలయంలో సంప్రదించండి.",
            "2. మీ పేరు ఆవాస్ ప్లస్ (Awaas+) జాబితాలో ఉందో లేదో సరిచూసుకోండి.",
            "3. జియో-ట్యాగింగ్ ద్వారా మీ ప్రస్తుత ఇంటి స్థితిని మరియు ఖాళీ స్థలాన్ని అధికారులు ఫోటో తీస్తారు.",
            "4. మంజూరు పత్రం లభించాక బేస్‌మెంట్, గోడలు, పైకప్పు దశల్లో నిధులు మీ ఖాతాలో జమ చేయబడతాయి."
        ],
        "application_procedure_en": [
            "1. Contact your Grama Sachivalayam Engineering Assistant or Panchayat Secretary.",
            "2. Verify inclusion in the Awaas+ survey priority register.",
            "3. Field officer undertakes geo-tagged photography of the proposed construction site.",
            "4. Installments disbursed directly into beneficiary bank account linked to stage geo-tags."
        ],
        "application_mode": "Grama Sachivalayam / Panchayat Office",
        "official_website": "https://pmayg.nic.in",
        "portal_name": "Ministry of Rural Development, GoI",
        "helpline_number": "1800-11-6446",
        "verified": True,
        "verification_source": "Ministry of Rural Development, Government of India",
        "last_verified_date": "2026-03-01",
        "faqs": []
    },

    # 7. MGNREGA (ఉపాధి హామీ పథకం)
    {
        "slug": "mgnrega",
        "category_slug": "employment",
        "name_te": "మహాత్మా గాంధీ జాతీయ గ్రామీణ ఉపాధి హామీ పథకం (MGNREGA)",
        "name_en": "Mahatma Gandhi National Rural Employment Guarantee Scheme (MGNREGA)",
        "name_hi": "महात्मा गांधी राष्ट्रीय ग्रामीण रोजगार गारंटी अधिनियम",
        "code": "MGNREGA",
        "level": "Central / State",
        "state": "All India",
        "target_beneficiaries": ["Rural Households", "Daily Wage Laborers", "Unskilled Workers"],
        "financial_amount": "రోజుకు నిర్ణీత వేతనం (100 రోజుల హామీ)",
        "purpose_te": "గ్రామీణ ప్రాంతాలలో జీవనోపాధి భద్రతను పెంపొందించడం కోసం, స్వచ్ఛందంగా అన్‌స్కిల్డ్ శారీరక శ్రమ చేయడానికి సిద్ధంగా ఉన్న ప్రతి కుటుంబానికి ఒక ఆర్థిక సంవత్సరంలో కనీసం 100 రోజుల చట్టబద్ధమైన ఉపాధి కల్పించడం.",
        "purpose_en": "Guarantee 100 days of wage employment per financial year to adult members of rural households willing to do unskilled manual work.",
        "benefits_te": "రాష్ట్రంలో రోజుకు ప్రభుత్వ నిర్ణీత కనీస వేతనం (ప్రస్తుతం రోజుకు సుమారు ₹300). పని కోసం దరఖాస్తు చేసిన 15 రోజుల్లోపు పని కల్పించకపోతే నిరుద్యోగ భృతి పొందే హక్కు.",
        "benefits_en": "Guaranteed statutory minimum daily wages (~₹300/day in AP) transferred directly to bank account via ABPS. Unemployment allowance if work not allocated within 15 days.",
        "eligibility_criteria_te": [
            "గ్రామీణ ప్రాంతాల్లో శాశ్వతంగా నివసిస్తున్న 18 సంవత్సరాలు నిండిన వయోజనులు.",
            "అన్‌స్కిల్డ్ శారీరక శ్రమ చేయడానికి సంసిద్ధత కలిగి ఉండాలి."
        ],
        "eligibility_criteria_en": [
            "Adult members (18+ years) residing in rural areas of the gram panchayat.",
            "Willingness to undertake manual unskilled labor."
        ],
        "exclusions_te": [
            "పట్టణ మున్సిపాలిటీ పరిధిలో నివసించేవారు.",
            "మైనర్లు (18 ఏళ్ల లోపు వారు)."
        ],
        "exclusions_en": [
            "Urban municipal residents.",
            "Minors aged under 18 years."
        ],
        "match_rules": {
            "min_age": 18,
            "occupations": ["daily_wage", "agricultural_worker", "unemployed", "farmer"],
            "bpl_only": False
        },
        "required_documents": [
            {"name_te": "ఆధార్ కార్డు", "name_en": "Aadhaar Card", "mandatory": True, "details_te": "గుర్తింపు మరియు ABPS వేతన చెల్లింపు కొరకు."},
            {"name_te": "ఉపాధి హామీ జాబ్ కార్డు (Job Card)", "name_en": "MGNREGA Job Card", "mandatory": True, "details_te": "పంచాయతీ జారీ చేసిన ఉచిత జాబ్ కార్డు."},
            {"name_te": "బ్యాంక్ లేదా పోస్టాఫీస్ ఖాతా వివరాలు", "name_en": "Bank / Post Office Savings Account", "mandatory": True, "details_te": "ఆధార్ బేస్డ్ పేమెంట్ సిస్టమ్ (ABPS) ఎనేబుల్ అయి ఉండాలి."}
        ],
        "application_procedure_te": [
            "1. మీ గ్రామ పంచాయతీ కార్యాలయం లేదా గ్రామ సచివాలయంలోని ఫీల్డ్ అసిస్టెంట్‌ను (FA) సంప్రదించండి.",
            "2. జాబ్ కార్డు లేకపోతే ఫారం-1 సమర్పించి ఉచితంగా జాబ్ కార్డు పొందండి (15 రోజుల్లో జారీ అవుతుంది).",
            "3. పని కోసం 'ఫారం-6' దరఖాస్తును సమర్పించండి.",
            "4. గ్రామంలో కేటాయించిన పనుల వద్దకు వెళ్లి హాజరు నమోదు చేయించుకుని పని చేయండి.",
            "5. వేతనం వారం లేదా పక్షం రోజుల్లో నేరుగా మీ బ్యాంక్ ఖాతాలో జమ అవుతుంది."
        ],
        "application_procedure_en": [
            "1. Meet your Village Field Assistant (FA) or Grama Sachivalayam Welfare Assistant.",
            "2. Submit application Form-1 with Aadhaar details to get your free Job Card within 15 days.",
            "3. Submit Form-6 requesting work allocation for the upcoming fortnight.",
            "4. Report to the designated community worksite.",
            "5. Wages are credited directly to your bank account via Aadhaar-Based Payment System (ABPS)."
        ],
        "application_mode": "Grama Sachivalayam / Panchayat Office",
        "official_website": "https://nrega.nic.in",
        "portal_name": "MGNREGA National Portal",
        "helpline_number": "1800-345-6789 / 1800-111-555",
        "verified": True,
        "verification_source": "Ministry of Rural Development, Government of India",
        "last_verified_date": "2026-03-01",
        "faqs": []
    },

    # 8. PM Vishwakarma Scheme
    {
        "slug": "pm-vishwakarma",
        "category_slug": "employment",
        "name_te": "ప్రధాన మంత్రి విశ్వకర్మ పథకం (PM Vishwakarma)",
        "name_en": "PM Vishwakarma Scheme",
        "name_hi": "पीएम विश्वकर्मा योजना",
        "code": "PM-VISHWAKARMA",
        "level": "Central",
        "state": "All India",
        "target_beneficiaries": ["Traditional Artisans", "Craftspeople", "18 Traditional Trades"],
        "financial_amount": "₹15,000 టూల్‌కిట్ + ₹3,00,000 వరకు తక్కువ వడ్డీ రుణం",
        "purpose_te": "చేతులతో మరియు సాంప్రదాయ పనిముట్లతో పనిచేసే కళాకారులు మరియు చేతివృత్తుల వారి నైపుణ్యాలను మెరుగుపరచడం, ఆధునిక పరికరాలు సమకూర్చడం మరియు తక్కువ వడ్డీతో ఆర్థిక మద్దతు అందించడం.",
        "purpose_en": "Provide end-to-end holistic support to traditional artisans and craftspeople across 18 designated trades through skill training, toolkits, and low-cost credit.",
        "benefits_te": "1. గుర్తింపు కార్డు మరియు డిజిటల్ సర్టిఫికెట్. 2. ఉచిత నైపుణ్య శిక్షణ మరియు రోజుకు ₹500 స్టైఫండ్. 3. ఆధునిక పనిముట్ల కొనుగోలుకు ₹15,000 ఉచిత గ్రాంట్. 4. కేవలం 5% వడ్డీతో హామీ లేని రుణం (మొదటి విడత ₹1 లక్ష, రెండో విడత ₹2 లక్షలు).",
        "benefits_en": "1. PM Vishwakarma Certificate & ID. 2. Basic training with ₹500/day stipend. 3. Modern toolkit incentive of ₹15,000. 4. Collateral-free enterprise credit up to ₹3 lakh at concessional 5% interest rate.",
        "eligibility_criteria_te": [
            "నిర్దేశిత 18 సాంప్రదాయ వృత్తులలో (వడ్రంగి, కమ్మరి, స్వర్ణకారుడు, కుమ్మరి, శిల్పి, చెప్పులు కుట్టేవాడు, మేస్త్రి, బుట్టలు అల్లేవాడు, రజకుడు, మంగలి, టైలర్, మొదలైనవి) పనిచేస్తున్న వారు.",
            "కనీస వయస్సు 18 సంవత్సరాలు నిండి ఉండాలి.",
            "కుటుంబంలో ఒక్కరికి మాత్రమే ఈ పథకం వర్తిస్తుంది.",
            "గత 5 సంవత్సరాలలో పీఎంఈజీపీ, ముద్రా కింద రుణాలు తీసుకొని బాకీ లేని వారు."
        ],
        "eligibility_criteria_en": [
            "Practicing artisans in one of the 18 family-based traditional trades (Carpenter, Blacksmith, Goldsmith, Potter, Sculptor, Cobbler, Mason, Basket/Mat maker, Washerman, Barber, Tailor, etc.).",
            "Minimum age 18 years on the date of application.",
            "Benefit restricted to one member per family.",
            "No outstanding loan under PMEGP, PM SVANidhi, or Mudra in past 5 years."
        ],
        "exclusions_te": [
            "ప్రభుత్వ ఉద్యోగులు మరియు వారి కుటుంబ సభ్యులు.",
            "నిర్దేశిత 18 వృత్తులు కాకుండా ఇతర వ్యాపారాలు చేసేవారు."
        ],
        "exclusions_en": [
            "Government servants and their immediate family members.",
            "Trades outside the notified 18 artisanal categories."
        ],
        "match_rules": {
            "occupations": ["artisan", "carpenter", "blacksmith", "potter", "barber", "tailor", "washerman", "mason", "small_business"],
            "min_age": 18
        },
        "required_documents": [
            {"name_te": "ఆధార్ కార్డు", "name_en": "Aadhaar Card", "mandatory": True, "details_te": "బయోమెట్రిక్ నమోదు కొరకు."},
            {"name_te": "బ్యాంక్ ఖాతా వివరాలు", "name_en": "Bank Account Passbook", "mandatory": True, "details_te": "టూల్‌కిట్ మరియు స్టైఫండ్ జమ కోసం."},
            {"name_te": "వృత్తి పనిముట్లతో దిగిన ఫోటో", "name_en": "Trade Verification Photograph", "mandatory": True, "details_te": "చేతివృత్తి ధృవీకరణ."},
            {"name_te": "రేషన్ కార్డు", "name_en": "Ration Card", "mandatory": False, "details_te": "కుటుంబ నిర్ధారణకు."}
        ],
        "application_procedure_te": [
            "1. మీ సమీపంలోని కామన్ సర్వీస్ సెంటర్ (CSC) లేదా గ్రామ సచివాలయాన్ని సందర్శించండి.",
            "2. pmvishwakarma.gov.in పోర్టల్‌లో బయోమెట్రిక్ ఆధారిత ఉచిత నమోదు చేసుకోండి.",
            "3. గ్రామ పంచాయతీ మరియు జిల్లా స్థాయి కమిటీ ద్వారా పరిశీలన జరుగుతుంది.",
            "4. ఆమోదం పొందిన తర్వాత 5 నుండి 7 రోజుల ప్రాథమిక శిక్షణకు హాజరై ₹15,000 టూల్‌కిట్ ఈ-వోచర్ పొందండి."
        ],
        "application_procedure_en": [
            "1. Visit your local Common Services Centre (CSC) or Grama Sachivalayam.",
            "2. Complete free biometric-authenticated registration on pmvishwakarma.gov.in.",
            "3. Three-tier verification: Gram Panchayat, District Implementation Committee, and Screening.",
            "4. Undergo 5-7 days basic skilling with ₹500/day allowance and receive ₹15,000 toolkit e-voucher."
        ],
        "application_mode": "CSC / Grama Sachivalayam",
        "official_website": "https://pmvishwakarma.gov.in",
        "portal_name": "Ministry of Micro, Small and Medium Enterprises (MSME)",
        "helpline_number": "1800-267-7777 / 011-23061500",
        "verified": True,
        "verification_source": "Ministry of MSME & Ministry of Skill Development, GoI",
        "last_verified_date": "2026-03-01",
        "faqs": []
    },

    # 9. Jagananna Vidya Deevena & Vasathi Deevena
    {
        "slug": "vidya-deevena",
        "category_slug": "students",
        "name_te": "జగనన్న విద్యా దీవెన & వసతి దీవెన (Post-Matric Scholarships)",
        "name_en": "Jagananna Vidya Deevena & Vasathi Deevena (Fee Reimbursement)",
        "name_hi": "विद्या दीवेना छात्रवृत्ति",
        "code": "JVD",
        "level": "Andhra Pradesh",
        "state": "Andhra Pradesh",
        "target_beneficiaries": ["College Students", "ITI, Polytechnic, Degree, Engineering, Medicine"],
        "financial_amount": "పూర్తి కాలేజీ ఫీజు + ₹20,000 వరకు భోజన/వసతి సాయం",
        "purpose_te": "పేద విద్యార్థులు ఉన్నత విద్యను అభ్యసించడానికి పూర్తి కాలేజీ ట్యూషన్ ఫీజు రీయింబర్స్‌మెంట్ మరియు హాస్టల్/భోజన ఖర్చుల కోసం ఆర్థిక మద్దతు అందించడం.",
        "purpose_en": "Provide complete tuition fee reimbursement (Vidya Deevena) and boarding/hostel allowance (Vasathi Deevena) for post-matric higher education.",
        "benefits_te": "1. విద్యా దీవెన: ప్రభుత్వం నిర్ణయించిన పూర్తి కళాశాల ఫీజు నేరుగా విద్యార్థి తల్లి బ్యాంక్ ఖాతాలో నాలుగు త్రైమాసికాల్లో జమ. 2. వసతి దీవెన: ఐటీఐ విద్యార్థులకు ₹10,000, పాలిటెక్నిక్ విద్యార్థులకు ₹15,000, డిగ్రీ/ఇంజనీరింగ్ విద్యార్థులకు ₹20,000 వార్షిక వసతి ఖర్చులు.",
        "benefits_en": "1. 100% college tuition fee reimbursement credited to mother's bank account in 4 installments. 2. Vasathi Deevena food/hostel support: ITI (₹10,000), Polytechnic (₹15,000), Degree/Engineering (₹20,000/yr).",
        "eligibility_criteria_te": [
            "ఆంధ్రప్రదేశ్ రాష్ట్రంలోని ప్రభుత్వ, ప్రైవేట్ ఎయిడెడ్, అన్-ఎయిడెడ్ కళాశాలల్లో రెగ్యులర్ కోర్సులు చదువుతున్న విద్యార్థులు.",
            "కుటుంబ వార్షిక ఆదాయం ₹2.5 లక్షల లోపు ఉండాలి.",
            "విద్యార్థికి కళాశాలలో కనీసం 75% హాజరు ఉండాలి.",
            "కుటుంబానికి 10 ఎకరాల తరి లేదా 25 ఎకరాల ఖుష్కీ లోపు భూమి మాత్రమే ఉండాలి."
        ],
        "eligibility_criteria_en": [
            "Students pursuing ITI, Polytechnic, Degree, B.Tech, Pharmacy, MBA, MCA, MBBS in recognized colleges.",
            "Annual family income under ₹2.50 lakh.",
            "Minimum 75% biometric attendance required in college.",
            "Landholding not exceeding 10 acres wet or 25 acres dry."
        ],
        "exclusions_te": [
            "ప్రైవేట్ లేదా డీమ్డ్ విశ్వవిద్యాలయాలలో మేనేజ్‌మెంట్ లేదా ఎన్‌ఆర్‌ఐ కోటాలో చేరిన విద్యార్థులు.",
            "డిస్టెన్స్ ఎడ్యుకేషన్ లేదా కరస్పాండెన్స్ కోర్సులు చదివేవారు.",
            "కుటుంబంలో ఎవరైనా ప్రభుత్వ ఉద్యోగి లేదా పెన్షనర్ ఉన్నవారు (పారిశుధ్య కార్మికులు మినహా)."
        ],
        "exclusions_en": [
            "Management / NRI quota admissions in private universities.",
            "Distance education / correspondence courses.",
            "Families with government employees or pensioners (sanitary workers exempted)."
        ],
        "match_rules": {
            "states": ["Andhra Pradesh"],
            "is_student": True,
            "max_income": 250000,
            "min_age": 15,
            "max_age": 35
        },
        "required_documents": [
            {"name_te": "విద్యార్థి మరియు తల్లి ఆధార్ కార్డులు", "name_en": "Student & Mother Aadhaar Cards", "mandatory": True, "details_te": "ఆధార్ సీడెడ్ ఖాతా అవసరం."},
            {"name_te": "బియ్యం కార్డు (వైట్ రేషన్ కార్డు)", "name_en": "Rice Card", "mandatory": True, "details_te": "ఆదాయ నిర్ధారణ కొరకు."},
            {"name_te": "కళాశాల అడ్మిషన్ అలాట్‌మెంట్ ఆర్డర్", "name_en": "College Admission Allotment Order", "mandatory": True, "details_te": "కన్వీనర్ కోటా ధృవీకరణ."},
            {"name_te": "తల్లి బ్యాంక్ ఖాతా పాస్ పుస్తకం (NPCI లింక్డ్)", "name_en": "Mother's NPCI Bank Passbook", "mandatory": True, "details_te": "ఫీజు రీయింబర్స్‌మెంట్ జమ కోసం."}
        ],
        "application_procedure_te": [
            "1. కళాశాలలో ప్రవేశం పొందిన వెంటనే జ్ఞానభూమి (Jnanabhumi) పోర్టల్ ద్వారా దరఖాస్తు చేయండి.",
            "2. కళాశాల ప్రిన్సిపాల్ మరియు వెరిఫికేషన్ అధికారి ధృవీకరిస్తారు.",
            "3. మీ గ్రామ/వార్డు సచివాలయంలో వెల్ఫేర్ అసిస్టెంట్ బయోమెట్రిక్ లేదా ముఖ గుర్తింపు ద్వారా ఈ-కేవైసీ పూర్తి చేస్తారు.",
            "4. ప్రభుత్వం ప్రతి క్వార్టర్‌కు ఫీజు మొత్తాన్ని విడుదల చేస్తుంది."
        ],
        "application_procedure_en": [
            "1. Apply via the Jnanabhumi portal at the time of college admission.",
            "2. College Principal verifies academic and admission records.",
            "3. Welfare Education Assistant at Grama Sachivalayam performs biometric e-KYC.",
            "4. Government disburses fee installments directly to the mother's account."
        ],
        "application_mode": "Jnanabhumi Portal / Grama Sachivalayam",
        "official_website": "https://jnanabhumi.ap.gov.in",
        "portal_name": "Jnanabhumi AP Portal",
        "helpline_number": "1902 / 08645-274025",
        "verified": True,
        "verification_source": "Social Welfare Department, Government of Andhra Pradesh",
        "last_verified_date": "2026-03-01",
        "faqs": []
    },

    # 10. National Scholarship Portal (NSP)
    {
        "slug": "national-scholarship-portal",
        "category_slug": "students",
        "name_te": "నేషనల్ స్కాలర్‌షిప్ పోర్టల్ (NSP - ప్రీ & పోస్ట్ మెట్రిక్)",
        "name_en": "National Scholarship Portal (NSP Central Schemes)",
        "name_hi": "राष्ट्रीय छात्रवृत्ति पोर्टल",
        "code": "NSP",
        "level": "Central",
        "state": "All India",
        "target_beneficiaries": ["Students", "SC/ST/OBC/Minority", "Meritorious Students"],
        "financial_amount": "₹5,000 నుండి ₹50,000 వరకు వార్షిక ఉపకార వేతనం",
        "purpose_te": "దేశవ్యాప్తంగా ప్రతిభావంతులైన మరియు వెనుకబడిన తరగతుల పాఠశాల మరియు కళాశాల విద్యార్థులకు కేంద్ర ప్రభుత్వ ఉపకార వేతనాలు అందించడం.",
        "purpose_en": "Provide unified access to dozens of Central scholarship schemes for pre-matric, post-matric, and professional higher education.",
        "benefits_te": "కోర్సును బట్టి పుస్తకాల కొనుగోలు, హాస్టల్ ఫీజు, ట్యూషన్ ఫీజు మరియు వార్షిక స్టైఫండ్ నేరుగా విద్యార్థి బ్యాంక్ ఖాతాలో జమ.",
        "benefits_en": "Annual scholarship amounts credited via DBT covering tuition, books, exam fees, and maintenance allowances.",
        "eligibility_criteria_te": [
            "గుర్తింపు పొందిన పాఠశాల లేదా కళాశాలలో చదువుతున్న విద్యార్థులు.",
            "గత తరగతి పరీక్షల్లో కనీసం 50% మార్కులు సాధించి ఉండాలి.",
            "కుటుంబ వార్షిక ఆదాయం పథకాన్ని బట్టి ₹1 లక్ష నుండి ₹2.5 లక్షల లోపు ఉండాలి."
        ],
        "eligibility_criteria_en": [
            "Regular students studying in government/recognized schools, colleges, and universities.",
            "Minimum 50% marks in previous annual examination.",
            "Annual family income within prescribed limits (₹1L to ₹2.5L depending on specific sub-scheme)."
        ],
        "exclusions_te": [
            "ఒకే విద్యా సంవత్సరంలో ఒకటికి మించి ఇతర ప్రభుత్వ స్కాలర్‌షిప్‌లు తీసుకుంటున్న వారు."
        ],
        "exclusions_en": [
            "Students receiving other government scholarships for the same academic cycle."
        ],
        "match_rules": {
            "is_student": True,
            "max_income": 250000,
            "min_age": 6,
            "max_age": 30
        },
        "required_documents": [
            {"name_te": "ఆధార్ కార్డు లేదా ఓటీఆర్ (OTR)", "name_en": "Aadhaar / One-Time Registration (OTR)", "mandatory": True, "details_te": "NSP పోర్టల్ నమోదుకు."},
            {"name_te": "మునుపటి తరగతి మార్కుల జాబితా", "name_en": "Previous Class Marksheet", "mandatory": True, "details_te": "మెరిట్ నిర్ధారణ కొరకు."},
            {"name_te": "కుటుంబ ఆదాయ ధృవీకరణ పత్రం", "name_en": "Income Certificate", "mandatory": True, "details_te": "తహశీల్దార్ జారీ చేసింది."},
            {"name_te": "విద్యార్థి పేరుతో ఉన్న బ్యాంక్ పాస్‌బుక్", "name_en": "Student's Bank Passbook", "mandatory": True, "details_te": "NPCI లింక్ అయి ఉండాలి."}
        ],
        "application_procedure_te": [
            "1. scholarships.gov.in వెబ్‌సైట్‌ను సందర్శించి OTR (One-Time Registration) పూర్తి చేయండి.",
            "2. మీ ఆధార్ నంబర్, మొబైల్ నంబర్ మరియు ఫోటో అప్‌లోడ్ చేయండి.",
            "3. విద్యార్హతల ఆధారంగా అర్హత గల స్కాలర్‌షిప్ పథకాన్ని ఎంచుకుని దరఖాస్తు చేయండి.",
            "4. మీ పాఠశాల లేదా కళాశాల నోడల్ అధికారి దరఖాస్తును ధృవీకరిస్తారు."
        ],
        "application_procedure_en": [
            "1. Visit scholarships.gov.in and complete One-Time Registration (OTR).",
            "2. Upload Aadhaar verification and institutional student details.",
            "3. Select appropriate scheme (Pre-Matric, Post-Matric, or Merit-cum-Means).",
            "4. School/College Nodal Officer completes institute-level online verification."
        ],
        "application_mode": "National Scholarship Portal Online",
        "official_website": "https://scholarships.gov.in",
        "portal_name": "National Scholarship Portal, MeitY",
        "helpline_number": "0120-6619540",
        "verified": True,
        "verification_source": "Ministry of Electronics & Information Technology, GoI",
        "last_verified_date": "2026-03-01",
        "faqs": []
    },

    # 11. YSR Cheyutha & Aasara
    {
        "slug": "ysr-cheyutha",
        "category_slug": "women",
        "name_te": "వైఎస్సార్ చేయూత (మహిళా ఆర్థిక సహాయం)",
        "name_en": "YSR Cheyutha & Aasara Scheme for Women",
        "name_hi": "वाईएसआर चेयुथा योजना",
        "code": "CHEYUTHA",
        "level": "Andhra Pradesh",
        "state": "Andhra Pradesh",
        "target_beneficiaries": ["Women aged 45-60", "SC, ST, BC, Minority Women"],
        "financial_amount": "₹18,750 / సంవత్సరం (4 ఏళ్లలో ₹75,000)",
        "purpose_te": "ఎస్సీ, ఎస్టీ, బీసీ మరియు మైనారిటీ వర్గాలకు చెందిన 45 నుండి 60 సంవత్సరాల మధ్య వయస్సు గల మహిళలు స్వయం ఉపాధి, కిరాణా దుకాణాలు, పాడి పరిశ్రమ ఏర్పాటు చేసుకోవడానికి ఆర్థిక చేయూతనివ్వడం.",
        "purpose_en": "Empower rural SC, ST, BC, and minority women aged 45-60 with annual financial assistance for sustainable livelihoods.",
        "benefits_te": "ఏడాదికి ₹18,750 చొప్పున నాలుగు విడతల్లో మొత్తం ₹75,000 నేరుగా మహిళల బ్యాంక్ ఖాతాలో జమ. అమూల్ పాడి పరిశ్రమ, హిందుస్థాన్ యునిలీవర్ వ్యాపార భాగస్వామ్యాల ద్వారా వ్యాపార శిక్షణ.",
        "benefits_en": "Direct financial aid of ₹18,750 per year (total ₹75,000 over 4 years) transferred via DBT. Technical and market linkages for dairy, retail, and poultry businesses.",
        "eligibility_criteria_te": [
            "ఆంధ్రప్రదేశ్ రాష్ట్రంలో శాశ్వతంగా నివసిస్తున్న మహిళలు.",
            "వయస్సు 45 నుండి 60 సంవత్సరాల మధ్య ఉండాలి.",
            "ఎస్సీ, ఎస్టీ, బీసీ లేదా మైనారిటీ వర్గానికి చెందిన వారై ఉండాలి.",
            "కుటుంబ గ్రామీణ వార్షిక ఆదాయం ₹1.2 లక్షల లోపు ఉండాలి."
        ],
        "eligibility_criteria_en": [
            "Resident women belonging to SC, ST, BC, or Minority communities in Andhra Pradesh.",
            "Age between 45 and 60 years on the qualifying date.",
            "Rural household annual income under ₹1,20,000 (urban under ₹1,44,000)."
        ],
        "exclusions_te": [
            "కుటుంబంలో ఎవరైనా ప్రభుత్వ ఉద్యోగి లేదా పెన్షనర్ ఉన్నవారు.",
            "నాలుగు చక్రాల వాహనం ఉన్నవారు (ట్యాక్సీ/ట్రాక్టర్ మినహా)."
        ],
        "exclusions_en": [
            "Families with government employees or pensioners.",
            "Owners of four-wheeler personal cars."
        ],
        "match_rules": {
            "states": ["Andhra Pradesh"],
            "genders": ["female"],
            "min_age": 45,
            "max_age": 60,
            "max_income": 120000,
            "women_only": True
        },
        "required_documents": [
            {"name_te": "ఆధార్ కార్డు (వయస్సు ధృవీకరణ కొరకు)", "name_en": "Aadhaar Card (Age Proof)", "mandatory": True, "details_te": "45-60 ఏళ్లు నిర్ధారించేందుకు."},
            {"name_te": "కుల ధృవీకరణ పత్రం (Caste Certificate)", "name_en": "Integrated Caste Certificate", "mandatory": True, "details_te": "SC, ST, BC, మైనారిటీ ధృవీకరణ."},
            {"name_te": "బియ్యం కార్డు (ఆదాయ ధృవీకరణ)", "name_en": "Rice Card", "mandatory": True, "details_te": "దారిద్య్ర రేఖ దిగువన ఉన్నట్లు ధృవీకరణ."},
            {"name_te": "బ్యాంక్ ఖాతా పాస్ పుస్తకం (అన్‌ఎన్‌కంబర్డ్)", "name_en": "Bank Account Passbook", "mandatory": True, "details_te": "ఆధార్ అనుసంధాన బ్యాంక్ ఖాతా."}
        ],
        "application_procedure_te": [
            "1. మీ గ్రామ/వార్డు సచివాలయంలోని మహిళా పోలీస్ లేదా వెల్ఫేర్ అసిస్టెంట్‌ను కలవండి.",
            "2. మీ పేరు నవశకం అర్హుల జాబితాలో ఉందో లేదో సరిచూసుకోండి.",
            "3. ఆధార్ ఆధారిత బయోమెట్రిక్ లేదా ఫేషియల్ ఈ-కేవైసీ పూర్తి చేయండి.",
            "4. లబ్ధిదారుల తుది జాబితా విడుదలయ్యాక మీ ఖాతాలో నిధులు జమవుతాయి."
        ],
        "application_procedure_en": [
            "1. Meet your Village Secretariat Welfare Education Assistant or Mahila Police.",
            "2. Verify inclusion in the Navasakam scheme beneficiary list.",
            "3. Complete biometric / facial e-KYC authentication.",
            "4. Amount credited directly to bank account upon official government release."
        ],
        "application_mode": "Grama Sachivalayam / Navasakam Portal",
        "official_website": "https://navasakam.ap.gov.in",
        "portal_name": "Navasakam Portal, AP",
        "helpline_number": "1902",
        "verified": True,
        "verification_source": "Panchayat Raj & Rural Development Department, Government of Andhra Pradesh",
        "last_verified_date": "2026-03-01",
        "faqs": []
    },

    # 12. Pradhan Mantri Matru Vandana Yojana (PMMVY)
    {
        "slug": "pm-matru-vandana",
        "category_slug": "women",
        "name_te": "ప్రధాన మంత్రి మాతృ వందన యోజన (PMMVY)",
        "name_en": "Pradhan Mantri Matru Vandana Yojana (PMMVY)",
        "name_hi": "प्रधानमंत्री मातृ वंदना योजना",
        "code": "PMMVY",
        "level": "Central / State",
        "state": "All India",
        "target_beneficiaries": ["Pregnant Women", "Lactating Mothers"],
        "financial_amount": "₹5,000 నుండి ₹6,000 ఆర్థిక సాయం",
        "purpose_te": "గర్భిణీ స్త్రీలు మరియు బాలింతలకు పోషకాహార అవసరాలు తీర్చుకోవడానికి మరియు ప్రసవ సమయంలో కూలీ నష్టాన్ని పూడ్చడానికి నగదు బదిలీ ప్రోత్సాహకం అందించడం.",
        "purpose_en": "Provide partial wage compensation and nutritional support to pregnant and lactating mothers for first and second childbirth.",
        "benefits_te": "మొదటి కాన్పుకు ₹5,000 రెండు విడతల్లో లభిస్తుంది. రెండవ కాన్పులో ఆడపిల్ల జన్మిస్తే ఒకే విడతలో ₹6,000 ప్రత్యేక ప్రోత్సాహకం అందజేస్తారు.",
        "benefits_en": "₹5,000 in two installments for the first child. Additional ₹6,000 in single installment if the second child is a girl to encourage girl-child birth ratio.",
        "eligibility_criteria_te": [
            "గర్భిణీ స్త్రీలు మరియు బాలింతలు (19 ఏళ్లు నిండిన వారు).",
            "ప్రభుత్వ అంగన్‌వాడీ కేంద్రంలో లేదా ఆసుపత్రిలో MCP కార్డు నమోదు చేసుకున్న వారు.",
            "ఆదాయ పరిమితి: కుటుంబ వార్షిక ఆదాయం ₹8 లక్షల లోపు లేదా ఈ-శ్రమ్/రేషన్ కార్డు ఉన్నవారు."
        ],
        "eligibility_criteria_en": [
            "Pregnant women and lactating mothers aged 19 years and above.",
            "Registered at Anganwadi Centre / Health Centre with Mother and Child Protection (MCP) card.",
            "Eligible under socially and economically disadvantaged sections."
        ],
        "exclusions_te": [
            "కేంద్ర లేదా రాష్ట్ర ప్రభుత్వ ఉద్యోగులు, ప్రభుత్వ రంగ సంస్థల్లో పనిచేస్తున్న మహిళలు.",
            "ఇతర చట్టాల కింద ప్రసూతి సెలవులతో కూడిన పూర్తి వేతనం పొందుతున్న వారు."
        ],
        "exclusions_en": [
            "Regular employees of Central/State Governments or PSUs.",
            "Mothers entitled to paid maternity leave under other statutes."
        ],
        "match_rules": {
            "genders": ["female"],
            "women_only": True,
            "min_age": 19,
            "max_age": 45
        },
        "required_documents": [
            {"name_te": "MCP కార్డు (తల్లీ పిల్ల సంరక్షణ కార్డు)", "name_en": "Mother & Child Protection (MCP) Card", "mandatory": True, "details_te": "గర్భధారణ మరియు టీకాల నమోదు."},
            {"name_te": "తల్లి మరియు భర్త ఆధార్ కార్డులు", "name_en": "Aadhaar Card of Mother and Husband", "mandatory": True, "details_te": "గుర్తింపు ధృవీకరణ కొరకు."},
            {"name_te": "తల్లి బ్యాంక్ పాస్ పుస్తకం", "name_en": "Mother's Aadhaar Seeded Bank Account", "mandatory": True, "details_te": "నగదు జమ కోసం."},
            {"name_te": "శిశువు జనన ధృవీకరణ పత్రం (రెండో విడతకు)", "name_en": "Child Birth Certificate", "mandatory": False, "details_te": "టీకాల అనంతరం."}
        ],
        "application_procedure_te": [
            "1. గర్భం దాల్చిన వెంటనే మీ గ్రామంలోని అంగన్‌వాడీ కార్యకర్త (AWW) లేదా ఆశా వర్కర్‌ను కలవండి.",
            "2. pmmvy.wcd.gov.in పోర్టల్ ద్వారా మీ MCP కార్డు మరియు ఆధార్ వివరాలతో నమోదు చేయించుకోండి.",
            "3. నిర్ణీత వైద్య పరీక్షలు (ANC) చేయించుకున్న తర్వాత మొదటి విడత ₹3,000 జమ అవుతుంది.",
            "4. ప్రసవం తర్వాత శిశువుకు ప్రాథమిక టీకాలు పూర్తయ్యాక మిగిలిన ₹2,000 విడుదలవుతుంది."
        ],
        "application_procedure_en": [
            "1. Contact your local Anganwadi Worker (AWW) or ASHA worker upon pregnancy confirmation.",
            "2. Complete online enrollment on pmmvy.wcd.gov.in using MCP card and Aadhaar details.",
            "3. First installment (₹3,000) disbursed upon at least one antenatal check-up (ANC).",
            "4. Second installment (₹2,000) disbursed after institutional birth registration and primary vaccinations."
        ],
        "application_mode": "Anganwadi Centre / PMMVY Portal",
        "official_website": "https://pmmvy.wcd.gov.in",
        "portal_name": "Ministry of Women and Child Development",
        "helpline_number": "14408",
        "verified": True,
        "verification_source": "Ministry of Women and Child Development, GoI",
        "last_verified_date": "2026-03-01",
        "faqs": []
    },

    # 13. Pradhan Mantri Mudra Yojana (PMMY)
    {
        "slug": "pm-mudra-yojana",
        "category_slug": "loans",
        "name_te": "ప్రధాన మంత్రి ముద్రా యోజన (PMMY వ్యాపార రుణాలు)",
        "name_en": "Pradhan Mantri Mudra Yojana (PMMY Business Loans)",
        "name_hi": "प्रधानमंत्री मुद्रा योजना",
        "code": "MUDRA",
        "level": "Central",
        "state": "All India",
        "target_beneficiaries": ["Small Business Owners", "Shopkeepers", "Artisans", "Rural Entrepreneurs"],
        "financial_amount": "₹50,000 నుండి ₹10,00,000 వరకు హామీ లేని రుణం",
        "purpose_te": "చిన్న మరియు సూక్ష్మ వ్యాపారాలు, కిరాణా దుకాణాలు, వర్క్‌షాపులు, టైలరింగ్, డెయిరీ తదితర వ్యాపారాలు ప్రారంభించడానికి లేదా విస్తరించడానికి పూచీకత్తు (కొలేటరల్) లేకుండా బ్యాంక్ రుణాలు అందించడం.",
        "purpose_en": "Facilitate collateral-free institutional credit up to ₹10 lakh to micro and small enterprises for non-farm income generating activities.",
        "benefits_te": "ఎటువంటి ఆస్తి పూచీకత్తు (హామీ) అవసరం లేదు. 3 రకాల రుణాలు: 1. శిశు (₹50,000 వరకు). 2. కిశోర్ (₹50,000 నుండి ₹5 లక్షల వరకు). 3. తరుణ్ (₹5 లక్షల నుండి ₹10 లక్షల వరకు). రీపేమెంట్ కాలపరిమితి 3 నుండి 5 సంవత్సరాలు.",
        "benefits_en": "No collateral or third-party guarantee required. Three loan categories: Shishu (up to ₹50,000), Kishore (₹50,000 to ₹5 lakh), and Tarun (₹5 lakh to ₹10 lakh) with 3-5 years repayment tenure.",
        "eligibility_criteria_te": [
            "భారతీయ పౌరుడై ఉండి, వ్యవసాయేతర స్వయం ఉపాధి లేదా వ్యాపార ప్రణాళిక ఉన్నవారు.",
            "గతంలో ఏ బ్యాంకులోనూ డిఫాల్ట్ అయి ఉండకూడదు (మంచి క్రెడిట్ రికార్డు).",
            "వయస్సు కనీసం 18 సంవత్సరాలు నిండి ఉండాలి."
        ],
        "eligibility_criteria_en": [
            "Any Indian citizen who has a viable business plan for non-farm income generation.",
            "No prior loan default with any commercial bank or cooperative institution.",
            "Minimum age 18 years."
        ],
        "exclusions_te": [
            "వ్యవసాయ పంటల సాగు కోసం తీసుకునే రుణాలు (ముద్రా వర్తించదు - కిసాన్ క్రెడిట్ కార్డ్ వర్తిస్తుంది).",
            "కార్పొరేట్ సంస్థలు లేదా పెద్ద పరిశ్రమలు."
        ],
        "exclusions_en": [
            "Primary agriculture activities (covered under KCC).",
            "Large industrial houses or corporate companies."
        ],
        "match_rules": {
            "occupations": ["small_business", "artisan", "women_shg", "daily_wage", "unemployed", "farmer"],
            "min_age": 18,
            "max_age": 70
        },
        "required_documents": [
            {"name_te": "ఆధార్ కార్డు మరియు పాన్ కార్డు", "name_en": "Aadhaar Card and PAN Card", "mandatory": True, "details_te": "గుర్తింపు మరియు కేవైసీ."},
            {"name_te": "చిరునామా ధృవీకరణ (రేషన్ కార్డు/ఓటరు కార్డు)", "name_en": "Proof of Residence", "mandatory": True, "details_te": "నివాస ధృవీకరణ."},
            {"name_te": "వ్యాపార ప్రణాళిక / కొటేషన్ వివరాలు", "name_en": "Business Plan / Machinery Quotation", "mandatory": True, "details_te": "వ్యాపార అవసరాలు."},
            {"name_te": "గత 6 నెలల బ్యాంక్ స్టేట్‌మెంట్", "name_en": "Last 6 Months Bank Statement", "mandatory": False, "details_te": "కిశోర్/తరుణ్ రుణాల కొరకు."}
        ],
        "application_procedure_te": [
            "1. మీ సమీపంలోని ఏదైనా ప్రభుత్వ లేదా గ్రామీణ బ్యాంకు (APGB / Chaitanya Godavari) ను సంప్రదించండి.",
            "2. లేదా udyamimitra.in లేదా janSamarth.in పోర్టల్‌లో ఆన్‌లైన్ దరఖాస్తు సమర్పించండి.",
            "3. ముద్రా లోన్ దరఖాస్తు ఫారం నింపి వ్యాపార ప్రతిపాదనను జతచేయండి.",
            "4. బ్యాంక్ మేనేజర్ పరిశీలన జరిపి రుణాన్ని మంజూరు చేస్తారు."
        ],
        "application_procedure_en": [
            "1. Approach any public sector, private, or regional rural bank branch.",
            "2. Alternatively, apply online via udyamimitra.in or the JanSamarth national portal.",
            "3. Submit the standard Mudra loan application form with business project quotation.",
            "4. Branch manager verifies feasibility and sanctions the loan."
        ],
        "application_mode": "Bank Branch / JanSamarth Portal",
        "official_website": "https://www.mudra.org.in",
        "portal_name": "Micro Units Development & Refinance Agency",
        "helpline_number": "1800-180-1111",
        "verified": True,
        "verification_source": "Department of Financial Services, Ministry of Finance, GoI",
        "last_verified_date": "2026-03-01",
        "faqs": []
    },

    # 14. PM SVANidhi (పీఎం స్వనిధి)
    {
        "slug": "pm-svanidhi",
        "category_slug": "loans",
        "name_te": "పీఎం స్వనిధి (వీధి వ్యాపారుల ఆత్మనిర్భర్ నిధి)",
        "name_en": "PM SVANidhi (Street Vendors AtmaNirbhar Nidhi)",
        "name_hi": "पीएम स्वनिधि योजना",
        "code": "SVANIDHI",
        "level": "Central",
        "state": "All India",
        "target_beneficiaries": ["Street Vendors", "Hawkers", "Small Roadside Vendors"],
        "financial_amount": "₹10,000 నుండి ₹50,000 వరకు వర్కింగ్ క్యాపిటల్ లోన్",
        "purpose_te": "పట్టణ మరియు సెమీ-అర్బన్ ప్రాంతాల్లోని వీధి వ్యాపారులు, కూరగాయలు, పండ్ల వ్యాపారులకు వారి వ్యాపారాన్ని తిరిగి నిలబెట్టుకోవడానికి తక్కువ వడ్డీతో వర్కింగ్ క్యాపిటల్ రుణాలు అందించడం.",
        "purpose_en": "Provide affordable working capital credit to street vendors to resume and expand their livelihoods.",
        "benefits_te": "మొదటి విడత ₹10,000 రుణం (సకాలంలో తీరిస్తే రెండో విడత ₹20,000, మూడో విడత ₹50,000). సకాలంలో చెల్లించిన వారికి 7% వడ్డీ సబ్సిడీ. డిజిటల్ లావాదేవీలు చేస్తే నెలకు ₹100 వరకు క్యాష్‌బ్యాక్ ప్రోత్సాహకం.",
        "benefits_en": "Collateral-free working capital loan of ₹10,000 (escalating to ₹20,000 and ₹50,000 on prompt repayment). 7% interest subsidy credited directly to bank account, plus up to ₹1,200 annual digital cashback.",
        "eligibility_criteria_te": [
            "పట్టణ లేదా పరిసర గ్రామీణ ప్రాంతాలలో కూరగాయలు, టీ, చిరుతిండ్లు, బట్టలు, మొదలైనవి అమ్ముకునే వీధి వ్యాపారులు.",
            "మున్సిపాలిటీ లేదా పట్టణ సంస్థ జారీ చేసిన వెండింగ్ సర్టిఫికెట్ / ఐడీ కార్డు ఉన్నవారు.",
            "సర్వేలో లేని వారికి స్థానిక సంస్థ జారీ చేసిన రికమండేషన్ లెటర్ (LoR) ఆధారంగా కూడా అవకాశం."
        ],
        "eligibility_criteria_en": [
            "Street vendors engaged in vending in urban and peri-urban rural surrounding areas.",
            "Possession of Certificate of Vending / ID card issued by Urban Local Bodies (ULB).",
            "Vendors possessing Letter of Recommendation (LoR) from Town Vending Committee."
        ],
        "exclusions_te": [
            "శాశ్వత పెద్ద దుకాణాలు కలిగిన వ్యాపారులు.",
            "గతంలో తీసుకున్న రుణాన్ని ఎగవేసిన వారు."
        ],
        "exclusions_en": [
            "Large permanent showroom owners.",
            "Willful loan defaulters."
        ],
        "match_rules": {
            "occupations": ["small_business", "daily_wage", "artisan"],
            "min_age": 18
        },
        "required_documents": [
            {"name_te": "ఆధార్ కార్డు", "name_en": "Aadhaar Card", "mandatory": True, "details_te": "బయోమెట్రిక్ ఈ-కేవైసీ కొరకు."},
            {"name_te": "వెండింగ్ కార్డ్ / రికమండేషన్ లెటర్ (LoR)", "name_en": "Vending Card / Letter of Recommendation", "mandatory": True, "details_te": "మున్సిపాలిటీ/వార్డు సచివాలయం జారీ చేసింది."},
            {"name_te": "బ్యాంక్ ఖాతా వివరాలు", "name_en": "Bank Account Details", "mandatory": True, "details_te": "రుణం జమ చేయడానికి."}
        ],
        "application_procedure_te": [
            "1. మీ వార్డు లేదా గ్రామ సచివాలయంలోని వెల్ఫేర్ అసిస్టెంట్ లేదా మున్సిపల్ కార్యాలయాన్ని కలవండి.",
            "2. pmsvanidhi.mohua.gov.in పోర్టల్‌లో మొబైల్ నంబర్ మరియు ఆధార్‌తో లాగిన్ అవ్వండి.",
            "3. వెండింగ్ వివరాలు మరియు బ్యాంకును ఎంచుకుని దరఖాస్తును సమర్పించండి.",
            "4. రుణం నేరుగా మీ బ్యాంక్ ఖాతాలో జమ అవుతుంది."
        ],
        "application_procedure_en": [
            "1. Meet your Ward/Village Secretariat official or Municipal Vending Cell.",
            "2. Apply online on pmsvanidhi.mohua.gov.in with mobile and Aadhaar verification.",
            "3. Select preferred lending bank branch and submit the digital application.",
            "4. Loan amount disbursed directly into your bank savings account."
        ],
        "application_mode": "PMSVANidhi Portal / Sachivalayam",
        "official_website": "https://pmsvanidhi.mohua.gov.in",
        "portal_name": "Ministry of Housing and Urban Affairs",
        "helpline_number": "1800-11-1979",
        "verified": True,
        "verification_source": "Ministry of Housing and Urban Affairs, Government of India",
        "last_verified_date": "2026-03-01",
        "faqs": []
    },

    # 15. DDU-GKY (దీన్ దయాళ్ ఉపాధ్యాయ గ్రామీణ కౌశల్య యోజన)
    {
        "slug": "ddu-gky",
        "category_slug": "skills",
        "name_te": "దీన్ దయాళ్ ఉపాధ్యాయ గ్రామీణ కౌశల్య యోజన (DDU-GKY)",
        "name_en": "Deen Dayal Upadhyaya Grameen Kaushalya Yojana (DDU-GKY)",
        "name_hi": "दीनदयाल उपाध्याय ग्रामीण कौशल्य योजना",
        "code": "DDU-GKY",
        "level": "Central / State",
        "state": "All India",
        "target_beneficiaries": ["Rural Youth (15-35)", "Unemployed Rural Poor"],
        "financial_amount": "ఉచిత రెసిడెన్షియల్ శిక్షణ + హామీతో కూడిన ఉద్యోగం",
        "purpose_te": "గ్రామీణ ప్రాంతాల్లోని పేద నిరుద్యోగ యువతకు ఆధునిక మార్కెట్ అవసరాలకు అనుగుణంగా ఉచితంగా నాణ్యమైన సాంకేతిక, కంప్యూటర్, సేవా రంగాల్లో నైపుణ్య శిక్షణ అందించి కనీసం 70% మందికి ఉద్యోగాలు కల్పించడం.",
        "purpose_en": "Transform rural poor youth into an economically independent and globally relevant workforce through market-led skill training and guaranteed placement.",
        "benefits_te": "పూర్తి ఉచిత వసతి మరియు భోజనం (రెసిడెన్షియల్ ట్రైనింగ్). ఉచిత యూనిఫాం, పుస్తకాలు మరియు కంప్యూటర్ శిక్షణ. శిక్షణ పూర్తి చేసుకున్న తర్వాత ప్రైవేట్ రంగంలో కనీస వేతనంతో కూడిన ఉద్యోగ నియామకం.",
        "benefits_en": "100% free residential training with boarding, lodging, uniform, and course materials. Mandatory guaranteed placement for minimum 70% of certified candidates.",
        "eligibility_criteria_te": [
            "గ్రామీణ ప్రాంతాల్లో నివసిస్తున్న 15 నుండి 35 సంవత్సరాల మధ్య వయస్సు గల యువతీ యువకులు (మహిళలు/దివ్యాంగులకు 45 ఏళ్ల వరకు సడలింపు).",
            "కుటుంబం దారిద్య్ర రేఖకు దిగువన (BPL) ఉండాలి లేదా ఉపాధి హామీ జాబ్ కార్డు కలిగి ఉండాలి.",
            "కనీస విద్యార్హత 8వ తరగతి, 10వ తరగతి లేదా ఇంటర్మీడియట్."
        ],
        "eligibility_criteria_en": [
            "Rural youth aged 15 to 35 years (upper age limit 45 for women, PwD, and particularly vulnerable groups).",
            "Belonging to poor rural households (BPL card, MGNREGA household, or SECC poor).",
            "Minimum educational qualification: 8th pass, 10th pass, or 12th pass depending on trade."
        ],
        "exclusions_te": [
            "పట్టణ కార్పొరేషన్ ప్రాంతాలలో నివసించేవారు.",
            "ఇప్పటికే పూర్తి స్థాయి ఉద్యోగంలో ఉన్నవారు."
        ],
        "exclusions_en": [
            "Urban youth.",
            "Currently employed professionals."
        ],
        "match_rules": {
            "min_age": 15,
            "max_age": 35,
            "occupations": ["unemployed", "student", "daily_wage"],
            "bpl_only": True
        },
        "required_documents": [
            {"name_te": "ఆధార్ కార్డు", "name_en": "Aadhaar Card", "mandatory": True, "details_te": "వయస్సు మరియు గుర్తింపు ధృవీకరణ."},
            {"name_te": "విద్యార్హత సర్టిఫికెట్లు (10వ తరగతి మార్కుల జాబితా)", "name_en": "Educational Marksheets (10th/12th)", "mandatory": True, "details_te": "అర్హత ధృవీకరణ కొరకు."},
            {"name_te": "రేషన్ కార్డు లేదా ఎంజీఎన్‌ఆర్‌ఈజీఏ జాబ్ కార్డు", "name_en": "Ration Card or MGNREGA Job Card", "mandatory": True, "details_te": "గ్రామీణ పేదరిక నిర్ధారణ."},
            {"name_te": "పాస్‌పోర్ట్ సైజ్ ఫోటోలు", "name_en": "Passport Size Photographs", "mandatory": True, "details_te": "శిక్షణ కేంద్రం నమోదుకు."}
        ],
        "application_procedure_te": [
            "1. మీ గ్రామ సచివాలయంలోని వెల్ఫేర్ అసిస్టెంట్ లేదా డిస్ట్రిక్ట్ ఎంప్లాయ్‌మెంట్ ఆఫీసర్‌ను సంప్రదించండి.",
            "2. ddugky.gov.in లేదా మీ రాష్ట్ర నైపుణ్యాభివృద్ధి సంస్థ (APSSDC) పోర్టల్‌లో 'Kaushal Panjee' కింద నమోదు చేసుకోండి.",
            "3. సమీపంలోని అధీకృత శిక్షణా కేంద్రాన్ని ఎంచుకుని బ్యాచ్‌లో చేరండి.",
            "4. 3 నుండి 6 నెలల శిక్షణ అనంతరం జాబ్ మేళా ద్వారా ఉద్యోగంలో చేరండి."
        ],
        "application_procedure_en": [
            "1. Contact your Village Secretariat Welfare Assistant or District Skill Development Officer.",
            "2. Register on the Kaushal Panjee portal at ddugky.gov.in or APSSDC portal.",
            "3. Select trade (Healthcare, Retail, Hospitality, IT-BPO, Electrical) and enroll at accredited training center.",
            "4. Undergo 3-6 months skill course followed by placement drives."
        ],
        "application_mode": "Grama Sachivalayam / APSSDC Skill Centre",
        "official_website": "https://ddugky.gov.in",
        "portal_name": "Ministry of Rural Development, GoI",
        "helpline_number": "011-24603955",
        "verified": True,
        "verification_source": "Ministry of Rural Development, Government of India",
        "last_verified_date": "2026-03-01",
        "faqs": []
    },

    # 16. Pradhan Mantri Kaushal Vikas Yojana (PMKVY 4.0)
    {
        "slug": "pmkvy",
        "category_slug": "skills",
        "name_te": "ప్రధాన మంత్రి కౌశల్ వికాస్ యోజన (PMKVY 4.0)",
        "name_en": "Pradhan Mantri Kaushal Vikas Yojana (PMKVY 4.0)",
        "name_hi": "प्रधानमंत्री कौशल विकास योजना",
        "code": "PMKVY",
        "level": "Central",
        "state": "All India",
        "target_beneficiaries": ["Unemployed Youth", "School/College Dropouts", "Workers wanting upskilling"],
        "financial_amount": "పూర్తి ఉచిత సర్టిఫికేషన్ + స్టైఫండ్ ప్రోత్సాహకం",
        "purpose_te": "దేశవ్యాప్తంగా యువతకు పరిశ్రమలకు అవసరమైన ఆధునిక సాంకేతికతలలో (AI, డ్రోన్ టెక్నాలజీ, రోబోటిక్స్, మొబైల్ రిపేరింగ్, సౌర విద్యుత్) ఉచిత నైపుణ్య శిక్షణ మరియు ప్రభుత్వం గుర్తింపు పొందిన సర్టిఫికేషన్ అందించడం.",
        "purpose_en": "Enable youth to take up industry-relevant skill certification in emerging technologies (AI, Robotics, Drones, IoT, Green Energy) to secure better livelihoods.",
        "benefits_te": "100% ఉచిత శిక్షణ మరియు పరీక్ష రుసుములను ప్రభుత్వం చెల్లిస్తుంది. ప్రభుత్వ సర్టిఫికెట్ మరియు స్కిల్ ఇండియా కార్డు లభిస్తుంది. అప్రెంటిస్‌షిప్ మరియు ఉద్యోగ అవకాశాలు.",
        "benefits_en": "100% government-funded training with zero student fees. Government of India Skill India digital certificate, stipend support, and apprenticeship assistance.",
        "eligibility_criteria_te": [
            "భారతీయ పౌరుడై ఉండి 15 నుండి 45 సంవత్సరాల మధ్య వయస్సు గలవారు.",
            "పాఠశాల లేదా కళాశాల మధ్యలో ఆపేసిన వారు (డ్రాపౌట్స్) లేదా నిరుద్యోగ యువత."
        ],
        "eligibility_criteria_en": [
            "Indian citizens aged 15-45 years.",
            "School/college dropouts or unemployed youth seeking vocational certification."
        ],
        "exclusions_te": [
            "ఇప్పటికే అదే కోర్సులో కేంద్ర ప్రభుత్వ ధృవీకరణ పొందిన వారు."
        ],
        "exclusions_en": [
            "Candidates holding prior active certification in the identical job role."
        ],
        "match_rules": {
            "min_age": 15,
            "max_age": 45,
            "occupations": ["unemployed", "student", "daily_wage", "artisan"]
        },
        "required_documents": [
            {"name_te": "ఆధార్ కార్డు", "name_en": "Aadhaar Card", "mandatory": True, "details_te": "బయోమెట్రిక్ నమోదు కోసం."},
            {"name_te": "బ్యాంక్ ఖాతా వివరాలు", "name_en": "Bank Account Details", "mandatory": True, "details_te": "స్టైఫండ్ ప్రోత్సాహకం జమ కొరకు."},
            {"name_te": "విద్యార్హత సర్టిఫికెట్లు", "name_en": "Educational Proof", "mandatory": True, "details_te": "కనీస అర్హత ధృవీకరణ."}
        ],
        "application_procedure_te": [
            "1. skillindiadigital.gov.in వెబ్‌సైట్‌ను సందర్శించి మీ మొబైల్ నంబర్‌తో నమోదు చేసుకోండి.",
            "2. మీ జిల్లాలోని పీఎంకేకే (PMKK) శిక్షణా కేంద్రాన్ని లేదా కోర్సును ఎంచుకోండి.",
            "3. కేంద్రంలో చేరి శిక్షణ పూర్తి చేయండి.",
            "4. అసెస్‌మెంట్ పరీక్షలో ఉత్తీర్ణులై డిజిటల్ స్కిల్ ఇండియా సర్టిఫికెట్ పొందండి."
        ],
        "application_procedure_en": [
            "1. Visit skillindiadigital.gov.in and register via mobile OTP.",
            "2. Search and select suitable vocational trade and nearest Pradhan Mantri Kaushal Kendra (PMKK).",
            "3. Attend classes and hands-on laboratory practicals.",
            "4. Pass National Skill Qualification Framework (NSQF) assessment to receive certificate."
        ],
        "application_mode": "Skill India Digital Portal / PMKK Centre",
        "official_website": "https://www.skillindiadigital.gov.in",
        "portal_name": "Skill India Digital Hub, MSDE",
        "helpline_number": "088000-55555 / 1800-123-9626",
        "verified": True,
        "verification_source": "Ministry of Skill Development and Entrepreneurship, GoI",
        "last_verified_date": "2026-03-01",
        "faqs": []
    }
]
