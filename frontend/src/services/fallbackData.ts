import { Category, SchemeDetail, SchemeSummary, ProfileCheckRequest, RecommendationResponse } from '../types';

export const FALLBACK_CATEGORIES: Category[] = [
  {
    id: 1,
    slug: 'farmers',
    name_te: 'రైతులకు పథకాలు',
    name_en: 'Farmer Schemes',
    icon: 'Tractor',
    description_te: 'రైతులకు పెట్టుబడి సహాయం, పంటల బీమా, సౌర విద్యుత్ పంపులు మరియు వ్యవసాయ ఉపకరణాల పథకాలు.',
    description_en: 'Investment assistance, crop insurance, solar pumps, and agricultural subsidies for farmers.',
    sort_order: 1,
    scheme_count: 3
  },
  {
    id: 2,
    slug: 'students',
    name_te: 'విద్యార్థులకు పథకాలు',
    name_en: 'Student Schemes',
    icon: 'GraduationCap',
    description_te: 'పాఠశాల మరియు కళాశాల విద్యార్థుల ఫీజు రీయింబర్స్‌మెంట్, ఉపకార వేతనాలు మరియు వసతి సదుపాయాలు.',
    description_en: 'Tuition fee reimbursements, scholarships, and hostel assistance for students.',
    sort_order: 2,
    scheme_count: 2
  },
  {
    id: 3,
    slug: 'women',
    name_te: 'మహిళలకు పథకాలు',
    name_en: 'Women Welfare Schemes',
    icon: 'HeartHandshake',
    description_te: 'మహిళా సాధికారత, స్వయం సహాయక సంఘాలు, ప్రసూతి సహాయం మరియు సున్నా వడ్డీ రుణాల పథకాలు.',
    description_en: 'Women empowerment, SHG support, maternity assistance, and zero-interest loans.',
    sort_order: 3,
    scheme_count: 2
  },
  {
    id: 4,
    slug: 'health',
    name_te: 'ఆరోగ్య పథకాలు',
    name_en: 'Health Schemes',
    icon: 'Activity',
    description_te: 'ఉచిత ఆసుపత్రి చికిత్సలు, ఆరోగ్య బీమా కార్డులు మరియు ఉచిత వైద్య పరీక్షల పథకాలు.',
    description_en: 'Free secondary/tertiary hospital treatments and government health insurance cards.',
    sort_order: 4,
    scheme_count: 2
  },
  {
    id: 5,
    slug: 'housing',
    name_te: 'గృహ నిర్మాణ పథకాలు',
    name_en: 'Housing Schemes',
    icon: 'Home',
    description_te: 'గ్రామీణ ప్రాంతాల్లో పేదలకు పక్కా ఇళ్ల నిర్మాణం, ఉచిత ఇంటి స్థలాలు మరియు ఆర్థిక సహాయం.',
    description_en: 'Pucca housing construction assistance and free house sites for rural families.',
    sort_order: 5,
    scheme_count: 1
  },
  {
    id: 6,
    slug: 'employment',
    name_te: 'ఉపాధి పథకాలు',
    name_en: 'Employment Schemes',
    icon: 'Briefcase',
    description_te: 'ఉపాధి హామీ పథకం (100 రోజుల పని), సాంప్రదాయ చేతివృత్తుల వారికి పరికరాలు మరియు ఉపాధి అవకాశాలు.',
    description_en: 'Guaranteed 100 days wage employment and toolkit support for rural artisans.',
    sort_order: 6,
    scheme_count: 2
  },
  {
    id: 7,
    slug: 'loans',
    name_te: 'వ్యాపార రుణాలు',
    name_en: 'Business Loans',
    icon: 'Coins',
    description_te: 'చిరు వ్యాపారులకు హామీ లేని ముద్రా రుణాలు, వీధి వ్యాపారుల ప్రోత్సాహకాలు మరియు వ్యాపార విస్తరణ సాయం.',
    description_en: 'Collateral-free micro loans, street vendor credit, and rural MSME funding.',
    sort_order: 7,
    scheme_count: 2
  },
  {
    id: 8,
    slug: 'skills',
    name_te: 'నైపుణ్య శిక్షణ',
    name_en: 'Skill Development',
    icon: 'Wrench',
    description_te: 'గ్రామీణ నిరుద్యోగ యువతకు ఉచిత కంప్యూటర్, సాంకేతిక శిక్షణ మరియు ఉద్యోగ కల్పన పథకాలు.',
    description_en: 'Free vocational training, placement programs, and skill certification for youth.',
    sort_order: 8,
    scheme_count: 2
  }
];

export const FALLBACK_SCHEMES: SchemeDetail[] = [
  {
    id: 1,
    slug: 'pm-kisan',
    category_id: 1,
    category_name_te: 'రైతులకు పథకాలు',
    category_name_en: 'Farmer Schemes',
    name_te: 'ప్రధాన మంత్రి కిసాన్ సమ్మాన్ నిధి (PM-KISAN)',
    name_en: 'Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)',
    code: 'PM-KISAN',
    level: 'Central',
    state: 'All India',
    target_beneficiaries: ['Farmer', 'Small and Marginal Landholder'],
    financial_amount: '₹6,000 / సంవత్సరం',
    purpose_te: 'సొంత సాగు భూమి కలిగిన రైతు కుటుంబాలకు ఎరువులు, విత్తనాలు కొనుగోలు చేయడానికి ఆర్థిక మద్దతు అందించడం.',
    purpose_en: 'To provide income support to all landholding farmers families to meet their agricultural and domestic needs.',
    benefits_te: 'సంవత్సరానికి ₹6,000 నేరుగా బ్యాంక్ ఖాతాలో (DBT) 3 విడతల్లో జమ చేస్తారు (ఒక్కో విడతకు ₹2,000).',
    benefits_en: 'Direct financial assistance of ₹6,000 per annum paid in three equal 4-monthly installments of ₹2,000 directly into bank accounts.',
    eligibility_criteria_te: [
      'సొంతంగా సాగు భూమి కలిగిన రైతు కుటుంబాలు మాత్రమే అర్హులు.',
      'లబ్ధిదారుల ఆధార్ కార్డు మరియు బ్యాంకు ఖాతా లింక్ (e-KYC) పూర్తయి ఉండాలి.',
      'భూ రికార్డుల్లో పేరు నమోదై ఉండాలి.'
    ],
    eligibility_criteria_en: [
      'All landholding farmer families with cultivable land in their names.',
      'Aadhaar linked with Bank account and active e-KYC completed on portal.',
      'Land title records (Pattadar Passbook / 1B) verified.'
    ],
    exclusions_te: [
      'రాజ్యాంగ పదవులు నిర్వహించిన వారు లేదా నిర్వహిస్తున్న వారు.',
      'కేంద్ర/రాష్ట్ర ప్రభుత్వ ఉద్యోగులు లేదా రిటైర్డ్ ఉద్యోగులు.',
      'గత అసెస్‌మెంట్ సంవత్సరంలో ఆదాయపు పన్ను చెల్లించిన వారు.'
    ],
    exclusions_en: [
      'Institutional landholders and constitutional post holders.',
      'Serving or retired government officers and employees.',
      'All persons who paid Income Tax in last assessment year.'
    ],
    required_documents: [
      { name_te: 'ఆధార్ కార్డు (e-KYC కోసం)', name_en: 'Aadhaar Card with e-KYC', mandatory: true, details_te: 'మొబైల్ నెంబర్‌తో లింక్ అయి ఉండాలి.' },
      { name_te: 'పట్టాదారు పాస్ పుస్తకం / 1B రికార్డు', name_en: 'Pattadar Passbook / 1B Land Record', mandatory: true, details_te: 'రెవెన్యూ శాఖ వారి తాజా రికార్డు.' },
      { name_te: 'బ్యాంక్ పాస్ పుస్తకం (NPCI మ్యాపింగ్)', name_en: 'Bank Account Details (NPCI Aadhaar Seeded)', mandatory: true, details_te: 'DBT సదుపాయం యాక్టివ్‌గా ఉండాలి.' }
    ],
    application_procedure_te: [
      '1. అధికారిక pmkisan.gov.in వెబ్‌సైట్‌ను సందర్శించండి లేదా మీ గ్రామ సచివాలయాన్ని సంప్రదించండి.',
      '2. Farmers Corner లో New Farmer Registration పై క్లిక్ చేయండి.',
      '3. ఆధార్ నంబర్, రాష్ట్రం నమోదు చేసి OTP ద్వారా ధృవీకరించండి.',
      '4. భూమి వివరాలు (సర్వే నంబర్, ఖాటా నంబర్) మరియు బ్యాంక్ ఖాతా వివరాలు నమోదు చేయండి.',
      '5. e-KYC పూర్తి చేసి దరఖాస్తును సమర్పించండి.'
    ],
    application_procedure_en: [
      '1. Visit the official portal pmkisan.gov.in or visit your local Grama Sachivalayam / CSC.',
      '2. Go to Farmers Corner and select New Farmer Registration.',
      '3. Enter Aadhaar number and verify via OTP.',
      '4. Fill land details (Survey No., Khata No.) and seeded bank details.',
      '5. Complete e-KYC authentication and submit application.'
    ],
    application_mode: 'Online Portal / Grama Sachivalayam',
    official_website: 'https://pmkisan.gov.in',
    portal_name: 'PM-KISAN Portal',
    helpline_number: '155261 / 011-24300606',
    verified: true,
    verification_source: 'Ministry of Agriculture & Farmers Welfare, GoI',
    last_verified_date: '2026-03-01',
    faqs: [
      {
        q_te: 'e-KYC ఎలా చేయాలి?',
        a_te: 'pmkisan.gov.in వెబ్‌సైట్‌లో e-KYC లింక్ క్లిక్ చేసి ఆధార్ OTP ద్వారా లేదా సచివాలయంలో వేలిముద్ర ద్వారా చేసుకోవచ్చు.',
        q_en: 'How to complete e-KYC?',
        a_en: 'Visit pmkisan.gov.in and click OTP-based e-KYC or visit your local CSC.'
      }
    ],
    view_count: 1420
  },
  {
    id: 2,
    slug: 'pmfby',
    category_id: 1,
    category_name_te: 'రైతులకు పథకాలు',
    category_name_en: 'Farmer Schemes',
    name_te: 'ప్రధాన మంత్రి ఫసల్ బీమా యోజన (PMFBY)',
    name_en: 'Pradhan Mantri Fasal Bima Yojana (PMFBY)',
    code: 'PMFBY',
    level: 'Central / State',
    state: 'All India & Andhra Pradesh',
    target_beneficiaries: ['Farmer', 'Tenant Farmer', 'Sharecropper'],
    financial_amount: 'పూర్తి పంట నష్టపరిహారం',
    purpose_te: 'వర్షాభావం, తుఫానులు, తెగుళ్లు తదితర ప్రకృతి వైపరీత్యాల వల్ల పంట నష్టపోయినప్పుడు రైతులకు సమగ్ర బీమా రక్షణ కల్పించడం.',
    purpose_en: 'Provide comprehensive insurance coverage and financial support to farmers suffering crop loss/damage due to natural calamities.',
    benefits_te: 'ఖరీఫ్ పంటలకు కేవలం 2%, రబీ పంటలకు 1.5% నామమాత్రపు ప్రీమియం. మిగిలిన ప్రీమియంను ప్రభుత్వం భరిస్తుంది.',
    benefits_en: 'Low premium of 2% for Kharif, 1.5% for Rabi crops. Remaining subsidy paid by government.',
    eligibility_criteria_te: [
      'నోటిఫై చేసిన ప్రాంతాల్లో నోటిఫై చేసిన పంటలను పండించే రైతులందరూ అర్హులు.',
      'బ్యాంకు రుణం తీసుకున్న మరియు తీసుకోని రైతులు ఇద్దరూ నమోదు చేసుకోవచ్చు.'
    ],
    eligibility_criteria_en: [
      'All farmers growing notified crops in notified areas.',
      'Applicable to both loanee and non-loanee farmers.'
    ],
    exclusions_te: ['యుద్ధం, అణు ప్రమాదాలు లేదా రైతు నిర్లక్ష్యం వల్ల జరిగిన నష్టాలు.'],
    exclusions_en: ['Losses arising out of war, nuclear hazards, or farmer negligence.'],
    required_documents: [
      { name_te: 'ఆధార్ కార్డు', name_en: 'Aadhaar Card', mandatory: true },
      { name_te: 'ఈ-పంట నమోదు రసీదు', name_en: 'e-Panta Receipt', mandatory: true },
      { name_te: 'బ్యాంక్ ఖాతా వివరాలు', name_en: 'Bank Account Details', mandatory: true }
    ],
    application_procedure_te: [
      '1. గ్రామ రైతు భరోసా కేంద్రం (RBK) లేదా సచివాలయాన్ని సంప్రదించండి.',
      '2. మీ పంట వివరాలను e-Panta లో నమోదు చేయించండి.',
      '3. గడువులోపు బీమా దరఖాస్తును సమర్పించండి.'
    ],
    application_procedure_en: [
      '1. Visit local Rythu Bharosa Kendram (RBK).',
      '2. Ensure crop is enrolled in e-Panta portal.',
      '3. Submit application before seasonal cutoff.'
    ],
    application_mode: 'Rythu Bharosa Kendram / Online',
    official_website: 'https://pmfby.gov.in',
    portal_name: 'PMFBY National Portal',
    helpline_number: '14447',
    verified: true,
    verification_source: 'Ministry of Agriculture, GoI',
    last_verified_date: '2026-03-01',
    faqs: [],
    view_count: 850
  },
  {
    id: 3,
    slug: 'pm-kusum',
    category_id: 1,
    category_name_te: 'రైతులకు పథకాలు',
    category_name_en: 'Farmer Schemes',
    name_te: 'పీఎం కుసుమ్ యోజన - సౌర వ్యవసాయ పంపులు',
    name_en: 'PM-KUSUM Scheme (Solar Agriculture Pumps)',
    code: 'PM-KUSUM',
    level: 'Central / State',
    state: 'All India',
    target_beneficiaries: ['Farmer', 'Water User Associations'],
    financial_amount: '60% వరకు ప్రభుత్వ సబ్సిడీ',
    purpose_te: 'రైతులకు డీజిల్ రహిత వ్యవసాయాన్ని ప్రోత్సహించడం, సోలార్ వాటర్ పంపింగ్ సిస్టమ్స్ ఏర్పాటు చేయడం.',
    purpose_en: 'Promote solar water pumps for clean irrigation and secondary income.',
    benefits_te: 'కేంద్రం 30%, రాష్ట్రం 30% రాయితీ (మొత్తం 60% సబ్సిడీ). రైతు కేవలం 10% ఖర్చు భరిస్తే చాలు.',
    benefits_en: '60% government subsidy (30% Central + 30% State). Farmer contributes 10%.',
    eligibility_criteria_te: [
      'వ్యవసాయ భూమి మరియు బోర్వెల్ లేదా బావి కలిగి ఉన్న రైతులు.'
    ],
    eligibility_criteria_en: [
      'Farmers possessing agricultural land with existing water well.'
    ],
    exclusions_te: ['గతంలో ప్రభుత్వ రాయితీతో సోలార్ పంపు తీసుకున్న వారు.'],
    exclusions_en: ['Prior subsidized solar pump recipients.'],
    required_documents: [
      { name_te: 'పట్టాదారు పాస్‌బుక్', name_en: 'Land Passbook', mandatory: true },
      { name_te: 'బోర్వెల్ ఫోటో & రసీదు', name_en: 'Borewell Proof', mandatory: true }
    ],
    application_procedure_te: [
      '1. రాష్ట్ర పునరుత్పాదక ఇంధన సంస్థ (NREDCAP) పోర్టల్‌లో దరఖాస్తు చేయండి.',
      '2. ఆమోదం పొందాక 10% రైతు వాటా చెల్లించండి.',
      '3. ఏజెన్సీ సోలార్ పంపును అమర్చుతుంది.'
    ],
    application_procedure_en: [
      '1. Apply via NREDCAP state portal.',
      '2. Pay 10% farmer share upon approval.',
      '3. Vendor installs pump.'
    ],
    application_mode: 'NREDCAP Portal',
    official_website: 'https://pmkusum.mnre.gov.in',
    portal_name: 'MNRE Portal',
    helpline_number: '1800-180-3333',
    verified: true,
    verification_source: 'Ministry of New & Renewable Energy',
    last_verified_date: '2026-03-01',
    faqs: [],
    view_count: 670
  },
  {
    id: 4,
    slug: 'ayushman-bharat-pmjay',
    category_id: 4,
    category_name_te: 'ఆరోగ్య పథకాలు',
    category_name_en: 'Health Schemes',
    name_te: 'ఆయుష్మాన్ భారత్ - ప్రధాన మంత్రి జన ఆరోగ్య యోజన (AB PM-JAY)',
    name_en: 'Ayushman Bharat - PM Jan Arogya Yojana (AB PM-JAY)',
    code: 'PM-JAY',
    level: 'Central / State',
    state: 'All India & Andhra Pradesh',
    target_beneficiaries: ['BPL Families', 'Rural Poor', 'Senior Citizens 70+'],
    financial_amount: '₹5,00,000 / కుటుంబానికి / సంవత్సరానికి',
    purpose_te: 'నిరుపేద కుటుంబాలకు తీవ్రమైన అనారోగ్యాలు, శస్త్రచికిత్సల సమయంలో ఉచిత నగదు రహిత ఆసుపత్రి చికిత్స అందించడం.',
    purpose_en: 'Provide cashless hospitalization up to ₹5 lakh per family per year for secondary and tertiary healthcare.',
    benefits_te: 'దేశవ్యాప్తంగా ఏదైనా నెట్‌వర్క్ ఆసుపత్రిలో ₹5 లక్షల వరకు ఉచిత చికిత్స. 70 ఏళ్లు పైబడిన వారికి ప్రత్యేక కార్డ్.',
    benefits_en: 'Free cashless treatment up to ₹5 lakh per year in empanelled hospitals.',
    eligibility_criteria_te: [
      'ఆహార భద్రతా కార్డు (రేషన్ కార్డ్) ఉన్న నిరుపేద కుటుంబాలు.',
      '70 సంవత్సరాలు నిండిన వృద్ధులకు ఆదాయంతో సంబంధం లేకుండా ఆయుష్మాన్ వయ వందన కార్డ్.'
    ],
    eligibility_criteria_en: [
      'Active Ration Card holders or SECC listed families.',
      'Senior citizens aged 70+ eligible regardless of income.'
    ],
    exclusions_te: ['వ్యవస్థీకృత రంగంలో ESI/CGHS వర్తించే ఉద్యోగులు.'],
    exclusions_en: ['Organized sector employees under ESI/CGHS.'],
    required_documents: [
      { name_te: 'ఆధార్ కార్డు', name_en: 'Aadhaar Card', mandatory: true },
      { name_te: 'రేషన్ కార్డు (బియ్యం కార్డు)', name_en: 'Ration Card', mandatory: true }
    ],
    application_procedure_te: [
      '1. ప్రభుత్వ ఆసుపత్రిలోని ఆయుష్మాన్ మిత్ర కౌంటర్‌ను సంప్రదించండి.',
      '2. beneficiary.nha.gov.in లో e-KYC పూర్తి చేసి కార్డ్ డౌన్‌లోడ్ చేసుకోండి.'
    ],
    application_procedure_en: [
      '1. Visit Ayushman Mitra desk at empanelled hospital.',
      '2. Complete e-KYC on beneficiary.nha.gov.in and download card.'
    ],
    application_mode: 'Hospital Desk / Online',
    official_website: 'https://beneficiary.nha.gov.in',
    portal_name: 'National Health Authority (NHA)',
    helpline_number: '14555',
    verified: true,
    verification_source: 'National Health Authority, GoI',
    last_verified_date: '2026-03-01',
    faqs: [],
    view_count: 2150
  },
  {
    id: 5,
    slug: 'ysr-aarogyasri',
    category_id: 4,
    category_name_te: 'ఆరోగ్య పథకాలు',
    category_name_en: 'Health Schemes',
    name_te: 'డాక్టర్ వైఎస్సార్ ఆరోగ్యశ్రీ / ఎన్టీఆర్ వైద్య సేవ',
    name_en: 'Dr. YSR Aarogyasri Health Scheme',
    code: 'AAROGYASRI',
    level: 'Andhra Pradesh',
    state: 'Andhra Pradesh',
    target_beneficiaries: ['BPL Families in Andhra Pradesh', 'Rice Card Holders'],
    financial_amount: '₹25,00,000 వరకు ఉచిత వైద్య సేవలు',
    purpose_te: 'ఆంధ్రప్రదేశ్ రాష్ట్రంలోని పేద మరియు మధ్యతరగతి కుటుంబాలకు తీవ్ర అనారోగ్యాలు మరియు శస్త్రచికిత్సలకు కార్పొరేట్ ఆసుపత్రులలో ఉచిత వైద్యం అందించడం.',
    purpose_en: 'Provide end-to-end cashless healthcare coverage to poor families in AP for treatments above ₹1,000.',
    benefits_te: '3,250 కంటే ఎక్కువ వైద్య ప్రక్రియలకు ₹25 లక్షల వరకు ఉచిత చికిత్స. రికవరీ కాలంలో ఆరోగ్య ఆసరా జీవన భృతి.',
    benefits_en: 'Cashless treatment up to ₹25 lakh covering 3,250+ procedures with post-operative Aarogya Aasara allowance.',
    eligibility_criteria_te: [
      'ఆంధ్రప్రదేశ్ నివాసితులు.',
      'బియ్యం కార్డు (వైట్ రేషన్ కార్డ్) లేదా వార్షిక ఆదాయం ₹5 లక్షల లోపు ఉన్న కుటుంబాలు.'
    ],
    eligibility_criteria_en: [
      'AP residents with Rice Card or income under ₹5,00,000.'
    ],
    exclusions_te: ['ప్రభుత్వ ఉద్యోగులు (EHS వర్తించేవారు).'],
    exclusions_en: ['Government employees covered under EHS.'],
    required_documents: [
      { name_te: 'ఆరోగ్యశ్రీ కార్డు లేదా బియ్యం కార్డు', name_en: 'Aarogyasri / Rice Card', mandatory: true },
      { name_te: 'ఆధార్ కార్డు', name_en: 'Aadhaar Card', mandatory: true }
    ],
    application_procedure_te: [
      '1. గ్రామ సచివాలయంలో లేదా నెట్‌వర్క్ ఆసుపత్రిలోని ఆరోగ్య మిత్రను సంప్రదించండి.'
    ],
    application_procedure_en: [
      '1. Contact Aarogya Mithra at empanelled hospital.'
    ],
    application_mode: 'Grama Sachivalayam / Network Hospital',
    official_website: 'https://ysraarogyasri.ap.gov.in',
    portal_name: 'Aarogyasri Health Care Trust',
    helpline_number: '104 / 1902',
    verified: true,
    verification_source: 'Govt of Andhra Pradesh',
    last_verified_date: '2026-03-01',
    faqs: [],
    view_count: 3100
  },
  {
    id: 6,
    slug: 'pmay-gramin',
    category_id: 5,
    category_name_te: 'గృహ నిర్మాణ పథకాలు',
    category_name_en: 'Housing Schemes',
    name_te: 'ప్రధాన మంత్రి ఆవాస్ యోజన - గ్రామీణ (PMAY-G)',
    name_en: 'Pradhan Mantri Awas Yojana - Gramin (PMAY-G)',
    code: 'PMAY-G',
    level: 'Central / State',
    state: 'All India',
    target_beneficiaries: ['Houseless Rural Families', 'BPL'],
    financial_amount: '₹1,20,000 + 90 రోజుల ఉపాధి కూలీ',
    purpose_te: 'గ్రామీణ ప్రాంతాల్లో ఇల్లు లేని పేద కుటుంబాలకు పక్కా ఇళ్ల నిర్మాణానికి ఆర్థిక సహాయం అందించడం.',
    purpose_en: 'Provide pucca houses with basic amenities to homeless rural households.',
    benefits_te: '₹1,20,000 ఆర్థిక సహాయం + స్వచ్ఛ భారత్ టాయిలెట్ ₹12,000 + ఉపాధి హామీ 90 రోజుల కూలీ.',
    benefits_en: '₹1.20 lakh direct aid + ₹12,000 toilet grant + 90 days MGNREGA wages.',
    eligibility_criteria_te: [
      'సొంతంగా పక్కా ఇల్లు లేని గ్రామీణ కుటుంబాలు.',
      'ఆవాస్ ప్లస్ సర్వే జాబితాలో పేరు నమోదైన వారు.'
    ],
    eligibility_criteria_en: ['Houseless rural families listed in Awaas+ survey.'],
    exclusions_te: ['కుటుంబంలో ఎవరికైనా ప్రభుత్వ ఉద్యోగం ఉన్నవారు.'],
    exclusions_en: ['Households with government employees.'],
    required_documents: [
      { name_te: 'ఆధార్ కార్డు', name_en: 'Aadhaar Card', mandatory: true },
      { name_te: 'ఉపాధి హామీ జాబ్ కార్డు', name_en: 'MGNREGA Job Card', mandatory: true },
      { name_te: 'ఇంటి స్థలం పట్టా', name_en: 'House Site Patta', mandatory: true }
    ],
    application_procedure_te: [
      '1. గ్రామ సచివాలయంలోని ఇంజనీరింగ్ అసిస్టెంట్‌ను కలవండి.',
      '2. జియో-ట్యాగింగ్ పూర్తి చేసి దశలవారీగా నిధులు పొందండి.'
    ],
    application_procedure_en: [
      '1. Contact Village Secretariat Engineering Assistant.',
      '2. Geo-tagged construction milestones trigger DBT disbursement.'
    ],
    application_mode: 'Grama Sachivalayam',
    official_website: 'https://pmayg.nic.in',
    portal_name: 'PMAY-G Portal',
    helpline_number: '1800-11-6446',
    verified: true,
    verification_source: 'Ministry of Rural Development, GoI',
    last_verified_date: '2026-03-01',
    faqs: [],
    view_count: 1240
  },
  {
    id: 7,
    slug: 'mgnrega',
    category_id: 6,
    category_name_te: 'ఉపాధి పథకాలు',
    category_name_en: 'Employment Schemes',
    name_te: 'మహాత్మా గాంధీ జాతీయ గ్రామీణ ఉపాధి హామీ పథకం (MGNREGA)',
    name_en: 'Mahatma Gandhi National Rural Employment Guarantee Scheme (MGNREGA)',
    code: 'MGNREGA',
    level: 'Central / State',
    state: 'All India',
    target_beneficiaries: ['Rural Households', 'Daily Wage Laborers'],
    financial_amount: 'రోజుకు ప్రభుత్వ నిర్ణీత వేతనం (100 రోజుల హామీ)',
    purpose_te: 'గ్రామీణ ప్రాంతాలలో స్వచ్ఛందంగా శారీరక శ్రమ చేయడానికి సిద్ధంగా ఉన్న ప్రతి కుటుంబానికి సంవత్సరంలో కనీసం 100 రోజుల చట్టబద్ధమైన ఉపాధి కల్పించడం.',
    purpose_en: 'Guarantee 100 days of wage employment per financial year to adult members of rural households.',
    benefits_te: 'రోజుకు సుమారు ₹300 వేతనం నేరుగా బ్యాంక్ ఖాతాలో జమ.',
    benefits_en: 'Guaranteed minimum daily wage transferred via ABPS directly to bank.',
    eligibility_criteria_te: [
      'గ్రామీణ ప్రాంతాల్లో నివసించే 18 ఏళ్లు నిండిన వయోజనులు.'
    ],
    eligibility_criteria_en: ['Rural adults (18+ yrs) willing to do manual labor.'],
    exclusions_te: ['పట్టణ ప్రాంత నివాసితులు.'],
    exclusions_en: ['Urban residents.'],
    required_documents: [
      { name_te: 'ఆధార్ కార్డు', name_en: 'Aadhaar Card', mandatory: true },
      { name_te: 'ఉపాధి హామీ జాబ్ కార్డు', name_en: 'Job Card', mandatory: true }
    ],
    application_procedure_te: [
      '1. గ్రామ సచివాలయంలో ఫీల్డ్ అసిస్టెంట్‌ను కలిసి జాబ్ కార్డు పొందండి.',
      '2. పని కోసం దరఖాస్తు చేసి వేతనం పొందండి.'
    ],
    application_procedure_en: [
      '1. Meet Field Assistant at Village Secretariat for Job Card.',
      '2. Demand work under Form-6.'
    ],
    application_mode: 'Grama Sachivalayam / Panchayat',
    official_website: 'https://nrega.nic.in',
    portal_name: 'MGNREGA Portal',
    helpline_number: '1800-111-555',
    verified: true,
    verification_source: 'Ministry of Rural Development, GoI',
    last_verified_date: '2026-03-01',
    faqs: [],
    view_count: 1890
  },
  {
    id: 8,
    slug: 'pm-vishwakarma',
    category_id: 6,
    category_name_te: 'ఉపాధి పథకాలు',
    category_name_en: 'Employment Schemes',
    name_te: 'ప్రధాన మంత్రి విశ్వకర్మ పథకం (PM Vishwakarma)',
    name_en: 'PM Vishwakarma Scheme',
    code: 'PM-VISHWAKARMA',
    level: 'Central',
    state: 'All India',
    target_beneficiaries: ['Traditional Artisans', 'Craftspeople', '18 Trades'],
    financial_amount: '₹15,000 టూల్‌కిట్ + ₹3,00,000 వరకు తక్కువ వడ్డీ రుణం',
    purpose_te: 'సాంప్రదాయ కళాకారులు మరియు చేతివృత్తుల వారికి నైపుణ్య శిక్షణ, ఆధునిక పనిముట్లు మరియు 5% వడ్డీతో రుణాలు అందించడం.',
    purpose_en: 'Holistic support to artisans across 18 designated trades through skill training, toolkits, and low-cost credit.',
    benefits_te: 'ఉచిత శిక్షణ + రోజుకు ₹500 స్టైఫండ్, ₹15,000 టూల్‌కిట్ గ్రాంట్, 5% వడ్డీతో ₹3 లక్షల వరకు రుణం.',
    benefits_en: 'Free training + ₹500/day stipend, ₹15,000 toolkit e-voucher, collateral-free loan up to ₹3 lakh at 5% interest.',
    eligibility_criteria_te: [
      '18 సాంప్రదాయ వృత్తులలో (వడ్రంగి, కమ్మరి, స్వర్ణకారుడు, కుమ్మరి, టైలర్, మంగలి, రజకుడు...) పనిచేస్తున్న వారు.'
    ],
    eligibility_criteria_en: ['Artisans in 18 notified traditional trades.'],
    exclusions_te: ['ప్రభుత్వ ఉద్యోగులు.'],
    exclusions_en: ['Government employees.'],
    required_documents: [
      { name_te: 'ఆధార్ కార్డు', name_en: 'Aadhaar Card', mandatory: true },
      { name_te: 'బ్యాంక్ పాస్‌బుక్', name_en: 'Bank Passbook', mandatory: true }
    ],
    application_procedure_te: [
      '1. గ్రామ సచివాలయం లేదా CSC కేంద్రంలో బయోమెట్రిక్ నమోదు చేయించండి.'
    ],
    application_procedure_en: [
      '1. Biometric registration at CSC / Sachivalayam.'
    ],
    application_mode: 'CSC / Grama Sachivalayam',
    official_website: 'https://pmvishwakarma.gov.in',
    portal_name: 'MSME Portal',
    helpline_number: '1800-267-7777',
    verified: true,
    verification_source: 'Ministry of MSME, GoI',
    last_verified_date: '2026-03-01',
    faqs: [],
    view_count: 940
  },
  {
    id: 9,
    slug: 'vidya-deevena',
    category_id: 2,
    category_name_te: 'విద్యార్థులకు పథకాలు',
    category_name_en: 'Student Schemes',
    name_te: 'జగనన్న విద్యా దీవెన & వసతి దీవెన (Fee Reimbursement)',
    name_en: 'Jagananna Vidya Deevena & Vasathi Deevena',
    code: 'JVD',
    level: 'Andhra Pradesh',
    state: 'Andhra Pradesh',
    target_beneficiaries: ['College Students', 'ITI, Polytechnic, Degree, Engineering'],
    financial_amount: 'పూర్తి కాలేజీ ఫీజు + ₹20,000 వసతి సాయం',
    purpose_te: 'పేద విద్యార్థులు ఉన్నత విద్యను అభ్యసించడానికి పూర్తి కాలేజీ ట్యూషన్ ఫీజు రీయింబర్స్‌మెంట్ మరియు హాస్టల్ ఖర్చుల సాయం.',
    purpose_en: '100% tuition fee reimbursement and boarding allowance for post-matric education.',
    benefits_te: 'పూర్తి కాలేజీ ఫీజు తల్లి ఖాతాలో జమ, అదనంగా వసతి దీవెన కింద ₹20,000 వరకు వార్షిక సాయం.',
    benefits_en: 'Full college fee reimbursement + up to ₹20,000 annual boarding support.',
    eligibility_criteria_te: [
      'ఆంధ్రప్రదేశ్‌లోని గుర్తింపు పొందిన కాలేజీల్లో చదువుతున్న రెగ్యులర్ విద్యార్థులు.',
      'కుటుంబ వార్షిక ఆదాయం ₹2.5 లక్షల లోపు ఉండాలి.',
      'కనీసం 75% బయోమెట్రిక్ హాజరు ఉండాలి.'
    ],
    eligibility_criteria_en: ['Regular college students with income under ₹2.5L and 75% attendance.'],
    exclusions_te: ['మేనేజ్‌మెంట్ కోటా లేదా దూరవిద్య కోర్సులు.'],
    exclusions_en: ['Management quota or correspondence courses.'],
    required_documents: [
      { name_te: 'విద్యార్థి & తల్లి ఆధార్ కార్డులు', name_en: 'Aadhaar Cards', mandatory: true },
      { name_te: 'బియ్యం కార్డు', name_en: 'Rice Card', mandatory: true },
      { name_te: 'కళాశాల అడ్మిషన్ ఆర్డర్', name_en: 'Allotment Order', mandatory: true }
    ],
    application_procedure_te: [
      '1. జ్ఞానభూమి (Jnanabhumi) పోర్టల్ ద్వారా దరఖాస్తు చేయండి.'
    ],
    application_procedure_en: [
      '1. Apply via Jnanabhumi portal.'
    ],
    application_mode: 'Jnanabhumi Portal / Grama Sachivalayam',
    official_website: 'https://jnanabhumi.ap.gov.in',
    portal_name: 'Jnanabhumi AP',
    helpline_number: '1902',
    verified: true,
    verification_source: 'Social Welfare Dept, AP',
    last_verified_date: '2026-03-01',
    faqs: [],
    view_count: 2400
  },
  {
    id: 10,
    slug: 'national-scholarship-portal',
    category_id: 2,
    category_name_te: 'విద్యార్థులకు పథకాలు',
    category_name_en: 'Student Schemes',
    name_te: 'నేషనల్ స్కాలర్‌షిప్ పోర్టల్ (NSP)',
    name_en: 'National Scholarship Portal (NSP Central Schemes)',
    code: 'NSP',
    level: 'Central',
    state: 'All India',
    target_beneficiaries: ['Students', 'Meritorious Students', 'SC/ST/OBC/Minority'],
    financial_amount: '₹5,000 నుండి ₹50,000 వరకు ఉపకార వేతనం',
    purpose_te: 'దేశవ్యాప్తంగా ప్రతిభావంతులైన విద్యార్థులకు కేంద్ర ప్రభుత్వ ఉపకార వేతనాలు అందించడం.',
    purpose_en: 'Provide Central scholarships for pre-matric, post-matric, and higher education.',
    benefits_te: 'పుస్తకాలు, పరీక్ష ఫీజు, ట్యూషన్ ఫీజు కోసం వార్షిక స్కాలర్‌షిప్ నేరుగా విద్యార్థి ఖాతాలో జమ.',
    benefits_en: 'Annual scholarship credited via DBT.',
    eligibility_criteria_te: [
      'గుర్తింపు పొందిన పాఠశాల/కళాశాలలో చదువుతూ కనీసం 50% మార్కులు సాధించిన వారు.'
    ],
    eligibility_criteria_en: ['Regular students with 50%+ marks in previous exam.'],
    exclusions_te: ['ఇతర కేంద్ర స్కాలర్‌షిప్ తీసుకుంటున్న వారు.'],
    exclusions_en: ['Duplicate scholarship recipients.'],
    required_documents: [
      { name_te: 'ఆధార్ కార్డు / OTR నంబర్', name_en: 'Aadhaar / OTR', mandatory: true },
      { name_te: 'మార్కుల జాబితా', name_en: 'Marksheet', mandatory: true }
    ],
    application_procedure_te: [
      '1. scholarships.gov.in పోర్టల్‌లో OTR నమోదు చేసుకోండి.'
    ],
    application_procedure_en: [
      '1. Complete OTR on scholarships.gov.in.'
    ],
    application_mode: 'NSP Portal Online',
    official_website: 'https://scholarships.gov.in',
    portal_name: 'National Scholarship Portal',
    helpline_number: '0120-6619540',
    verified: true,
    verification_source: 'MeitY, GoI',
    last_verified_date: '2026-03-01',
    faqs: [],
    view_count: 1100
  },
  {
    id: 11,
    slug: 'ysr-cheyutha',
    category_id: 3,
    category_name_te: 'మహిళలకు పథకాలు',
    category_name_en: 'Women Welfare Schemes',
    name_te: 'వైఎస్సార్ చేయూత (మహిళా ఆర్థిక సహాయం)',
    name_en: 'YSR Cheyutha & Aasara for Women',
    code: 'CHEYUTHA',
    level: 'Andhra Pradesh',
    state: 'Andhra Pradesh',
    target_beneficiaries: ['Women aged 45-60', 'SC, ST, BC, Minority Women'],
    financial_amount: '₹18,750 / సంవత్సరం (4 ఏళ్లలో ₹75,000)',
    purpose_te: '45 నుండి 60 సంవత్సరాల మధ్య వయస్సు గల ఎస్సీ, ఎస్టీ, బీసీ, మైనారిటీ మహిళలు స్వయం ఉపాధి, కిరాణా దుకాణాలు, పాడి పరిశ్రమ ఏర్పాటు చేసుకోవడానికి ఆర్థిక సహాయం.',
    purpose_en: 'Empower rural women aged 45-60 with annual financial aid for sustainable livelihoods.',
    benefits_te: 'ఏడాదికి ₹18,750 చొప్పున నాలుగు విడతల్లో మొత్తం ₹75,000 నేరుగా బ్యాంక్ ఖాతాలో జమ.',
    benefits_en: 'Direct aid of ₹18,750/year (₹75,000 over 4 years) via DBT.',
    eligibility_criteria_te: [
      'ఆంధ్రప్రదేశ్‌లోని 45-60 ఏళ్ల ఎస్సీ, ఎస్టీ, బీసీ, మైనారిటీ మహిళలు.',
      'కుటుంబ గ్రామీణ వార్షిక ఆదాయం ₹1.2 లక్షల లోపు ఉండాలి.'
    ],
    eligibility_criteria_en: ['SC, ST, BC, Minority women in AP aged 45-60 with income under ₹1.2L.'],
    exclusions_te: ['ప్రభుత్వ ఉద్యోగుల కుటుంబాలు.'],
    exclusions_en: ['Government employee households.'],
    required_documents: [
      { name_te: 'ఆధార్ కార్డు (వయస్సు నిర్ధారణ)', name_en: 'Aadhaar Card', mandatory: true },
      { name_te: 'కుల ధృవీకరణ పత్రం', name_en: 'Caste Certificate', mandatory: true },
      { name_te: 'బియ్యం కార్డు', name_en: 'Rice Card', mandatory: true }
    ],
    application_procedure_te: [
      '1. గ్రామ సచివాలయంలో వెల్ఫేర్ అసిస్టెంట్ ద్వారా ఈ-కేవైసీ పూర్తి చేయండి.'
    ],
    application_procedure_en: [
      '1. Complete e-KYC at Village Secretariat.'
    ],
    application_mode: 'Grama Sachivalayam / Navasakam',
    official_website: 'https://navasakam.ap.gov.in',
    portal_name: 'Navasakam AP',
    helpline_number: '1902',
    verified: true,
    verification_source: 'Panchayat Raj Dept, AP',
    last_verified_date: '2026-03-01',
    faqs: [],
    view_count: 1750
  },
  {
    id: 12,
    slug: 'pm-matru-vandana',
    category_id: 3,
    category_name_te: 'మహిళలకు పథకాలు',
    category_name_en: 'Women Welfare Schemes',
    name_te: 'ప్రధాన మంత్రి మాతృ వందన యోజన (PMMVY)',
    name_en: 'Pradhan Mantri Matru Vandana Yojana (PMMVY)',
    code: 'PMMVY',
    level: 'Central / State',
    state: 'All India',
    target_beneficiaries: ['Pregnant Women', 'Lactating Mothers'],
    financial_amount: '₹5,000 నుండి ₹6,000 నగదు సాయం',
    purpose_te: 'గర్భిణీ స్త్రీలు మరియు బాలింతలకు పోషకాహార అవసరాలు తీర్చుకోవడానికి నగదు బదిలీ ప్రోత్సాహకం.',
    purpose_en: 'Wage compensation and nutritional support to pregnant and lactating mothers.',
    benefits_te: 'మొదటి కాన్పుకు ₹5,000, రెండో కాన్పులో ఆడపిల్ల పుడితే ₹6,000 ప్రోత్సాహకం.',
    benefits_en: '₹5,000 for first child; ₹6,000 for second girl child.',
    eligibility_criteria_te: ['19 ఏళ్లు నిండిన గర్భిణీలు మరియు బాలింతలు.'],
    eligibility_criteria_en: ['Pregnant/lactating mothers (19+ yrs).'],
    exclusions_te: ['ప్రభుత్వ ఉద్యోగులు.'],
    exclusions_en: ['Government employees.'],
    required_documents: [
      { name_te: 'MCP కార్డు', name_en: 'MCP Card', mandatory: true },
      { name_te: 'ఆధార్ కార్డు', name_en: 'Aadhaar Card', mandatory: true }
    ],
    application_procedure_te: [
      '1. అంగన్‌వాడీ కార్యకర్త (AWW) లేదా ఆశా వర్కర్‌ను కలవండి.'
    ],
    application_procedure_en: [
      '1. Contact Anganwadi / ASHA worker.'
    ],
    application_mode: 'Anganwadi / PMMVY Portal',
    official_website: 'https://pmmvy.wcd.gov.in',
    portal_name: 'WCD Portal',
    helpline_number: '14408',
    verified: true,
    verification_source: 'Ministry of WCD, GoI',
    last_verified_date: '2026-03-01',
    faqs: [],
    view_count: 890
  },
  {
    id: 13,
    slug: 'pm-mudra-yojana',
    category_id: 7,
    category_name_te: 'వ్యాపార రుణాలు',
    category_name_en: 'Business Loans',
    name_te: 'ప్రధాన మంత్రి ముద్రా యోజన (PMMY వ్యాపార రుణాలు)',
    name_en: 'Pradhan Mantri Mudra Yojana (PMMY Loans)',
    code: 'MUDRA',
    level: 'Central',
    state: 'All India',
    target_beneficiaries: ['Small Business Owners', 'Shopkeepers', 'Artisans'],
    financial_amount: '₹50,000 నుండి ₹10,00,000 వరకు హామీ లేని రుణం',
    purpose_te: 'చిన్న వ్యాపారాలు, కిరాణా దుకాణాలు, టైలరింగ్, డెయిరీ ప్రారంభించడానికి పూచీకత్తు (కొలేటరల్) లేకుండా బ్యాంక్ రుణాలు.',
    purpose_en: 'Collateral-free loans up to ₹10 lakh to micro/small enterprises.',
    benefits_te: 'ఆస్తి హామీ అవసరం లేదు. శిశు (₹50k వరకు), కిశోర్ (₹5L వరకు), తరుణ్ (₹10L వరకు).',
    benefits_en: 'No collateral. Shishu (up to ₹50k), Kishore (up to ₹5L), Tarun (up to ₹10L).',
    eligibility_criteria_te: ['వ్యవసాయేతర స్వయం ఉపాధి లేదా వ్యాపార ప్రణాళిక ఉన్న భారతీయ పౌరులు.'],
    eligibility_criteria_en: ['Indian citizens with viable non-farm business plans.'],
    exclusions_te: ['బ్యాంక్ డిఫాల్టర్లు.'],
    exclusions_en: ['Prior loan defaulters.'],
    required_documents: [
      { name_te: 'ఆధార్ & పాన్ కార్డు', name_en: 'Aadhaar & PAN', mandatory: true },
      { name_te: 'వ్యాపార ప్రణాళిక / కొటేషన్', name_en: 'Business Quotation', mandatory: true }
    ],
    application_procedure_te: [
      '1. సమీప ప్రభుత్వ లేదా గ్రామీణ బ్యాంకు శాఖను లేదా udyamimitra.in ను సంప్రదించండి.'
    ],
    application_procedure_en: [
      '1. Apply at bank branch or via udyamimitra.in.'
    ],
    application_mode: 'Bank Branch / JanSamarth Portal',
    official_website: 'https://www.mudra.org.in',
    portal_name: 'Mudra Portal',
    helpline_number: '1800-180-1111',
    verified: true,
    verification_source: 'Dept of Financial Services, GoI',
    last_verified_date: '2026-03-01',
    faqs: [],
    view_count: 1600
  },
  {
    id: 14,
    slug: 'pm-svanidhi',
    category_id: 7,
    category_name_te: 'వ్యాపార రుణాలు',
    category_name_en: 'Business Loans',
    name_te: 'పీఎం స్వనిధి (వీధి వ్యాపారుల రుణాలు)',
    name_en: 'PM SVANidhi (Street Vendors Scheme)',
    code: 'SVANIDHI',
    level: 'Central',
    state: 'All India',
    target_beneficiaries: ['Street Vendors', 'Hawkers'],
    financial_amount: '₹10,000 నుండి ₹50,000 వర్కింగ్ క్యాపిటల్ లోన్',
    purpose_te: 'వీధి వ్యాపారులు, కూరగాయలు, పండ్ల వ్యాపారులకు తక్కువ వడ్డీతో వర్కింగ్ క్యాపిటల్ రుణాలు అందించడం.',
    purpose_en: 'Working capital loans to street vendors to expand livelihoods.',
    benefits_te: 'మొదటి విడత ₹10,000 రుణం, సకాలంలో చెల్లిస్తే 7% వడ్డీ సబ్సిడీ & డిజిటల్ క్యాష్‌బ్యాక్.',
    benefits_en: '₹10,000 loan escalating to ₹50,000 with 7% interest subsidy.',
    eligibility_criteria_te: ['వీధి వ్యాపారులు మరియు పట్టణ సంస్థ జారీ చేసిన వెండింగ్ సర్టిఫికెట్ ఉన్నవారు.'],
    eligibility_criteria_en: ['Street vendors with Urban Local Body vending card.'],
    exclusions_te: ['శాశ్వత పెద్ద దుకాణాల యజమానులు.'],
    exclusions_en: ['Permanent showroom owners.'],
    required_documents: [
      { name_te: 'ఆధార్ కార్డు', name_en: 'Aadhaar Card', mandatory: true },
      { name_te: 'వెండింగ్ కార్డు / LoR', name_en: 'Vending Card', mandatory: true }
    ],
    application_procedure_te: [
      '1. pmsvanidhi.mohua.gov.in లో లేదా వార్డు సచివాలయంలో దరఖాస్తు చేయండి.'
    ],
    application_procedure_en: [
      '1. Apply on pmsvanidhi.mohua.gov.in.'
    ],
    application_mode: 'PMSVANidhi Portal / Sachivalayam',
    official_website: 'https://pmsvanidhi.mohua.gov.in',
    portal_name: 'MoHUA Portal',
    helpline_number: '1800-11-1979',
    verified: true,
    verification_source: 'Ministry of Housing & Urban Affairs',
    last_verified_date: '2026-03-01',
    faqs: [],
    view_count: 730
  },
  {
    id: 15,
    slug: 'ddu-gky',
    category_id: 8,
    category_name_te: 'నైపుణ్య శిక్షణ',
    category_name_en: 'Skill Development',
    name_te: 'దీన్ దయాళ్ ఉపాధ్యాయ గ్రామీణ కౌశల్య యోజన (DDU-GKY)',
    name_en: 'Deen Dayal Upadhyaya Grameen Kaushalya Yojana (DDU-GKY)',
    code: 'DDU-GKY',
    level: 'Central / State',
    state: 'All India',
    target_beneficiaries: ['Rural Youth (15-35)', 'Unemployed Poor'],
    financial_amount: 'ఉచిత రెసిడెన్షియల్ శిక్షణ + ఉద్యోగ నియామకం',
    purpose_te: 'గ్రామీణ నిరుద్యోగ యువతకు నాణ్యమైన సాంకేతిక శిక్షణ అందించి కనీసం 70% మందికి ప్రైవేట్ రంగంలో ఉద్యోగాలు కల్పించడం.',
    purpose_en: 'Market-led residential skill training and guaranteed placement for rural youth.',
    benefits_te: '100% ఉచిత వసతి, భోజనం, పుస్తకాలు, కంప్యూటర్ శిక్షణ మరియు హామీతో కూడిన ఉద్యోగం.',
    benefits_en: 'Free residential training with mandatory placement guarantee.',
    eligibility_criteria_te: ['15 నుండి 35 సంవత్సరాల గ్రామీణ పేద యువతీ యువకులు.'],
    eligibility_criteria_en: ['Rural poor youth aged 15-35 years.'],
    exclusions_te: ['పట్టణ ప్రాంత నివాసితులు.'],
    exclusions_en: ['Urban residents.'],
    required_documents: [
      { name_te: 'ఆధార్ కార్డు', name_en: 'Aadhaar Card', mandatory: true },
      { name_te: '10వ తరగతి సర్టిఫికెట్', name_en: '10th Marksheet', mandatory: true }
    ],
    application_procedure_te: [
      '1. ddugky.gov.in లేదా APSSDC పోర్టల్‌లో నమోదు చేసుకోండి.'
    ],
    application_procedure_en: [
      '1. Register on ddugky.gov.in or APSSDC.'
    ],
    application_mode: 'APSSDC Centre / Grama Sachivalayam',
    official_website: 'https://ddugky.gov.in',
    portal_name: 'DDU-GKY Portal',
    helpline_number: '011-24603955',
    verified: true,
    verification_source: 'Ministry of Rural Development, GoI',
    last_verified_date: '2026-03-01',
    faqs: [],
    view_count: 820
  },
  {
    id: 16,
    slug: 'pmkvy',
    category_id: 8,
    category_name_te: 'నైపుణ్య శిక్షణ',
    category_name_en: 'Skill Development',
    name_te: 'ప్రధాన మంత్రి కౌశల్ వికాస్ యోజన (PMKVY 4.0)',
    name_en: 'Pradhan Mantri Kaushal Vikas Yojana (PMKVY 4.0)',
    code: 'PMKVY',
    level: 'Central',
    state: 'All India',
    target_beneficiaries: ['Unemployed Youth', 'Dropouts'],
    financial_amount: 'పూర్తి ఉచిత సర్టిఫికేషన్ + స్టైఫండ్',
    purpose_te: 'పరిశ్రమలకు అవసరమైన ఆధునిక సాంకేతికతలలో (AI, డ్రోన్, రోబోటిక్స్, మొబైల్ రిపేరింగ్) ఉచిత శిక్షణ మరియు ప్రభుత్వ సర్టిఫికేషన్.',
    purpose_en: 'Industry-relevant vocational certification in emerging technologies.',
    benefits_te: '100% ఉచిత కోర్సు, స్కిల్ ఇండియా డిజిటల్ కార్డు, ఉద్యోగ అవకాశాలు.',
    benefits_en: '100% funded training with Skill India digital card.',
    eligibility_criteria_te: ['15 నుండి 45 సంవత్సరాల వయస్సు గల భారతీయ పౌరులు.'],
    eligibility_criteria_en: ['Indian youth aged 15-45.'],
    exclusions_te: ['ఇప్పటికే అదే కోర్సులో ధృవీకరణ పొందిన వారు.'],
    exclusions_en: ['Prior certification in identical job role.'],
    required_documents: [
      { name_te: 'ఆధార్ కార్డు', name_en: 'Aadhaar Card', mandatory: true },
      { name_te: 'విద్యార్హత సర్టిఫికెట్', name_en: 'Educational Proof', mandatory: true }
    ],
    application_procedure_te: [
      '1. skillindiadigital.gov.in లో నమోదు చేసుకోండి.'
    ],
    application_procedure_en: [
      '1. Register on skillindiadigital.gov.in.'
    ],
    application_mode: 'Skill India Digital Hub',
    official_website: 'https://www.skillindiadigital.gov.in',
    portal_name: 'Skill India Hub',
    helpline_number: '1800-123-9626',
    verified: true,
    verification_source: 'Ministry of Skill Development, GoI',
    last_verified_date: '2026-03-01',
    faqs: [],
    view_count: 1050
  }
];

export function getClientFallbackRecommendations(profile: ProfileCheckRequest): RecommendationResponse {
  const occ = (profile.occupation || '').toLowerCase();
  const schemes = FALLBACK_SCHEMES;

  const evaluated = schemes.map((s) => {
    let score = 50;
    const matched: string[] = [];
    const unmatched: string[] = [];

    if (occ === 'farmer' && s.category_id === 1) {
      score += 45;
      matched.push('మీ వృత్తి రైతుకు ఈ పథకం సరిపోతుంది.');
    } else if (occ === 'student' && s.category_id === 2) {
      score += 45;
      matched.push('విద్యార్థిగా ఈ ఉపకార వేతనం సరిపోతుంది.');
    } else if ((occ === 'women_shg' || profile.gender === 'female') && s.category_id === 3) {
      score += 45;
      matched.push('మహిళా సంక్షేమ పథకంగా సరిపోతుంది.');
    } else if (s.category_id === 4) {
      score += 35;
      matched.push('అన్ని వర్గాల వారికి ఉచిత వైద్యం వర్తిస్తుంది.');
    } else if (occ === 'artisan' && s.slug === 'pm-vishwakarma') {
      score += 45;
      matched.push('చేతివృత్తుల వారికి ఈ పథకం సరిపోతుంది.');
    } else if (occ === 'small_business' && (s.slug === 'pm-mudra-yojana' || s.slug === 'pm-svanidhi')) {
      score += 45;
      matched.push('వ్యాపార విస్తరణకు ముద్రా రుణం సరిపోతుంది.');
    } else if (occ === 'daily_wage' && s.slug === 'mgnrega') {
      score += 45;
      matched.push('గ్రామీణ ఉపాధి హామీ పనికి మీరు అర్హులు.');
    }

    if (profile.has_ration_card) {
      score += 10;
      matched.push('రేషన్ కార్డు ఆధారంగా ప్రాథమిక అర్హత ఉంది.');
    }

    score = Math.min(100, Math.max(20, score));
    const status = score >= 75 ? ('eligible' as const) : ('needs_more_info' as const);

    return {
      scheme: s,
      score,
      status,
      matched_criteria_te: matched,
      unmatched_criteria_te: unmatched,
      matched_criteria_en: [],
      unmatched_criteria_en: [],
      required_documents: s.required_documents,
      voice_guidance_te: `${s.name_te} పథకానికి మీకు ${score}% సరిపోలిక ఉంది. దీని ద్వారా ${s.financial_amount || s.benefits_te} లభిస్తుంది.`
    };
  });

  evaluated.sort((a, b) => b.score - a.score);
  const eligible = evaluated.filter((r) => r.status === 'eligible');
  const potential = evaluated.filter((r) => r.status === 'needs_more_info');

  return {
    total_evaluated: schemes.length,
    eligible_count: eligible.length,
    potentially_eligible_count: potential.length,
    recommendations: evaluated,
    summary_te: `మీ వివరాల ఆధారంగా మొత్తం ${schemes.length} పథకాలను పరిశీలించాము. వాటిలో ${eligible.length} పథకాలకు మీరు ప్రాథమికంగా అర్హులు.`,
    summary_en: `Evaluated ${schemes.length} schemes. You are potentially eligible for ${eligible.length} schemes.`,
    voice_narration_te: `నమస్కారం! మీ వివరాల ప్రకారం మీరు ${eligible.length} ప్రభుత్వ పథకాలకు అర్హత పొందవచ్చు. పూర్తి వివరాలు క్రింది కార్డులలో చూడవచ్చు.`,
    disclaimer_te: 'గమనిక: ఈ సరిపోలిక స్కోరు అంతర్గత సమాచార మార్గదర్శి మాత్రమే. ఇది అధికారిక ప్రభుత్వ ఆమోదం కాదు.',
    disclaimer_en: 'Disclaimer: Informational matching indicator.'
  };
}
