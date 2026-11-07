# Scheme Sarathi (స్కీమ్ సారథి)
### AI-Powered Government Scheme Recommendation & Telugu Voice Assistance Platform
**A Community Service Project (CSP) for Rural Citizen Empowerment**

---

## 🌾 Overview

**Scheme Sarathi (స్కీమ్ సారథి)** is an academic Community Service Project (CSP) web application engineered to bridge the digital literacy divide in rural communities across Andhra Pradesh and India. It empowers rural citizens—especially those who cannot read English or use complex digital portals—to discover, understand, and apply for verified government welfare schemes through natural voice and text conversations in **Telugu**.

### 🌟 Core Value Proposition
> **ఓపెన్ చేయండి → తెలుగులో మాట్లాడండి → సారథి అర్థం చేసుకుంటాడు → తెలుగులో సమాధానం ఇస్తాడు → అర్హత ఉన్న పథకాలు చూపిస్తాడు → ఎలా దరఖాస్తు చేయాలో వివరిస్తాడు.**
> *(Open the app → Speak in Telugu → Sarathi understands → Responds in Telugu → Recommends eligible schemes → Explains application steps.)*

---

## 🚀 Key Features

1. **🎙️ Telugu Voice Interaction System (STT & TTS)**
   - **Voice Input:** Web Speech API (`te-IN`, `en-IN`, `hi-IN`) with real-time audio wave animation and visual "వింటున్నాను..." (Listening...) status.
   - **Voice Output:** Natural Telugu voice narration for every AI response with Play, Pause, Stop, and Replay controls.
   - **Configurable Fallback Engine:** Server-side `gTTS` audio synthesis endpoint (`/api/voice/synthesize`) generating high-quality MP3 base64 audio when browser voices are limited.

2. **🔊 AI Voice Guidance for Every Button (Non-Blocking)**
   - Reusable `speakTelugu()` and `handleAccessibleAction()` pipeline.
   - Centralized dictionary of Telugu guidance audio cues for every major button (Home, Explore, Categories, Check Eligibility, View Documents, Apply, Voice Assistant, Font Resize).
   - Instant action execution with audio guidance played non-blockingly.
   - Global mute/unmute control with visual status indicator.

3. **🧠 Factual RAG (Retrieval-Augmented Generation) Conversational AI**
   - RAG pipeline utilizing a verified knowledge base of Central and Andhra Pradesh government schemes.
   - Strict safety rules:
     - ❌ Never invents schemes or financial benefit figures.
     - ❌ Never guarantees eligibility or approval.
     - ❌ Never solicits sensitive Aadhaar numbers, OTPs, or passwords.
     - ✅ Directly cites official portals (`pmkisan.gov.in`, `pmfby.gov.in`, `navasakam.ap.gov.in`, etc.).
   - Seamless Google Gemini API support (`gemini-1.5-flash`) with high-accuracy offline rule-based semantic fallback.

4. **⚡ Smart Government Scheme Recommendation Engine**
   - Evaluates citizen demographic profile (occupation, annual income, landholding acreage, age, gender, student status, disability status, ration card type).
   - Generates match score (0-100%), explicit match reasons, and personalized spoken Telugu narration.

5. **📋 Step-by-Step Interactive Eligibility Checker**
   - 5-step wizard with question audio spoken aloud in Telugu:
     1. State & District (రాష్ట్రం & జిల్లా)
     2. Occupation (మీ వృత్తి)
     3. Annual Family Income & Ration Card (ఆదాయం & బియ్యం కార్డు)
     4. Age & Gender (వయస్సు & లింగం)
     5. Land & Special Conditions (సాగుభూమి & చదువు)
   - Confetti celebration and instant categorisation: Eligible, Needs More Info, and Ineligible with clear statutory reasons.

6. **📁 Citizen Document Guidance**
   - Comprehensive checklist of essential documents: Aadhaar card (e-KYC & mobile seed), Rice Card (BPL), Bank Passbook (NPCI mapped), Income Certificate, Caste Certificate, Pattadar Passbook (1-B Adangal).
   - Plain-language Telugu guide on where to obtain each document (Grama Sachivalayam, MeeSeva, Tahsildar).

7. **🌾 Rural-Friendly Mode**
   - Large touch targets (minimum 64px).
   - Minimal cognitive load, high contrast, warm high-visibility colors.
   - Voice-first interactions for older or non-literate citizens.

8. **🛡️ Admin Dashboard & Analytics**
   - Add new schemes, update eligibility criteria, toggle official verification status.
   - Anonymous usage statistics (total views, categories, citizen feedback ratings).

---

## 🏛️ Verified Government Schemes Database

The platform is seeded with 16+ verified welfare schemes spanning 8 core categories:

| Category (వర్గం) | Schemes (పథకాలు) | Authority / Portal |
|---|---|---|
| **రైతులకు పథకాలు (Farmers)** | PM-KISAN, PM Fasal Bima (PMFBY), PM-KUSUM Solar Pumps | `pmkisan.gov.in`, `pmfby.gov.in`, `pmkusum.mnre.gov.in` |
| **ఆరోగ్య పథకాలు (Health)** | Ayushman Bharat PM-JAY, Dr. YSR Aarogyasri / NTR Vaidya Seva | `beneficiary.nha.gov.in`, `ysraarogyasri.ap.gov.in` |
| **గృహ నిర్మాణం (Housing)** | Pradhan Mantri Awas Yojana - Gramin (PMAY-G) | `pmayg.nic.in` |
| **ఉపాధి పథకాలు (Employment)** | MGNREGA (100 Days Wage Guarantee), PM Vishwakarma | `nrega.nic.in`, `pmvishwakarma.gov.in` |
| **విద్యార్థులకు పథకాలు (Students)** | Jagananna Vidya Deevena & Vasathi Deevena, National Scholarship Portal (NSP) | `jnanabhumi.ap.gov.in`, `scholarships.gov.in` |
| **మహిళా సంక్షేమం (Women)** | YSR Cheyutha & Aasara, PM Matru Vandana Yojana (PMMVY) | `navasakam.ap.gov.in`, `pmmvy.wcd.gov.in` |
| **వ్యాపార రుణాలు (Loans)** | Pradhan Mantri Mudra Yojana (PMMY), PM SVANidhi | `mudra.org.in`, `pmsvanidhi.mohua.gov.in` |
| **నైపుణ్య శిక్షణ (Skills)** | DDU-GKY, PM Kaushal Vikas Yojana (PMKVY 4.0) | `ddugky.gov.in`, `skillindiadigital.gov.in` |

---

## 💻 Tech Stack

- **Frontend:**
  - React 19 with Vite & TypeScript
  - Tailwind CSS v4
  - Lucide Icons
  - Canvas Confetti
  - Noto Sans Telugu & Inter Typography
- **Backend:**
  - Python 3.12 with FastAPI
  - SQLAlchemy ORM with SQLite (PostgreSQL compatible)
  - Pydantic v2 validation
  - gTTS (Google Text-to-Speech)
  - HTTPX for external AI integrations
- **AI / LLM:**
  - Google Gemini API (`gemini-1.5-flash`) via RAG
  - High-accuracy semantic rule-based fallback

---

## 🛠️ Installation & Setup Instructions

### Prerequisites
- Node.js v18+ and npm
- Python 3.10+ (or `uv`)

### 1. Backend Setup
```bash
# Navigate to backend directory
cd scheme-sarathi/backend

# If using python venv:
python -m venv venv
# On Windows:
.\venv\Scripts\activate
# On Linux/macOS:
source venv/bin/activate

# Install dependencies:
pip install -r requirements.txt

# Run the FastAPI server:
python -m uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload
```
The FastAPI backend will start at `http://127.0.0.1:8000`.
- Swagger API Docs: `http://127.0.0.1:8000/docs`
- Health check: `http://127.0.0.1:8000/api/health`

### 2. Frontend Setup
```bash
# Navigate to frontend directory
cd scheme-sarathi/frontend

# Install npm packages:
npm install

# Start Vite development server:
npm run dev
```
The React frontend will start at `http://localhost:5173`.

---

## 🧪 Automated Testing Report

A test suite verifying all 10 core integration layers is located at `scheme-sarathi/backend/test_suite.py`.

To run the automated tests:
```bash
cd scheme-sarathi/backend
.\venv\Scripts\python.exe test_suite.py
```

### Test Results Summary:
- ✅ **Test 1: Health & Root Endpoints:** Verified `/` and `/api/health`
- ✅ **Test 2: Categories Verified:** Verified all 8 categories loaded with scheme counts
- ✅ **Test 3: Schemes Listing & Telugu Search:** Verified `/api/schemes` with Telugu query matching
- ✅ **Test 4: Scheme Details & Documents:** Verified PM-KISAN details, e-KYC documents, and official portal URL
- ✅ **Test 5: Recommendation Engine:** Verified farmer profile matched PM-KISAN, PMFBY, PM-KUSUM with match score
- ✅ **Test 6: Single Scheme Eligibility:** Verified Vidya Deevena score calculation
- ✅ **Test 7: AI RAG Telugu Response:** Verified conversational AI response with embedded scheme recommendation cards
- ✅ **Test 8: Voice Synthesis & Button Guidance:** Verified `/api/voice/synthesize` audio MP3 generation
- ✅ **Test 9: Admin Dashboard & Feedback:** Verified usage statistics and citizen feedback storage
- ✅ **Test 10: 404 Error Handling:** Verified resilient handling of missing resources

---

## 📞 Emergency & Welfare Helplines
- **Spandana / CM Helpline:** `1902`
- **Aarogyasri / 104 Emergency Health:** `104`
- **Ayushman Bharat National Helpline:** `14555`
- **PM-KISAN Farmer Toll-Free:** `155261`
- **MGNREGA Wage Employment:** `1800-111-555`

---

## 📜 Academic CSP Presentation Note
Developed as a Community Service Project (CSP) to promote digital inclusion, rural welfare discovery, and accessible government service delivery.
