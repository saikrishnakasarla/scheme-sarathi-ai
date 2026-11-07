"""
Comprehensive Automated Test Suite for Scheme Sarathi Platform
Tests backend endpoints, AI RAG retrieval, recommendation scoring, voice synthesis, and safety rules.
"""
import sys
import unittest

# Ensure Windows UTF-8 stdout
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')
from fastapi.testclient import TestClient
from app.main import app
from app.database.database import SessionLocal
from app.models.scheme import Scheme, Category

client = TestClient(app)

class TestSchemeSarathi(unittest.TestCase):

    def setUp(self):
        self.db = SessionLocal()

    def tearDown(self):
        self.db.close()

    def test_01_health_and_root(self):
        """Test root and health status endpoints."""
        res = client.get("/")
        self.assertEqual(res.status_code, 200)
        self.assertEqual(res.json()["status"], "online")

        res_health = client.get("/api/health")
        self.assertEqual(res_health.status_code, 200)
        self.assertEqual(res_health.json()["status"], "healthy")
        print("[PASS] Test 1: Health & Root Endpoints Passed")

    def test_02_categories_populated(self):
        """Test all 8 required categories exist."""
        res = client.get("/api/categories")
        self.assertEqual(res.status_code, 200)
        data = res.json()
        self.assertGreaterEqual(len(data), 8)
        slugs = [c["slug"] for c in data]
        expected_slugs = ["farmers", "students", "women", "health", "housing", "employment", "loans", "skills"]
        for s in expected_slugs:
            self.assertIn(s, slugs)
        print(f"[PASS] Test 2: Categories Verified ({len(data)} categories loaded)")

    def test_03_schemes_list_and_filter(self):
        """Test scheme listing, search in Telugu, and category filtering."""
        res = client.get("/api/schemes")
        self.assertEqual(res.status_code, 200)
        data = res.json()
        self.assertGreaterEqual(data["total"], 16)

        # Filter by farmer category
        res_farmer = client.get("/api/schemes?category=farmers")
        self.assertEqual(res_farmer.status_code, 200)
        farmer_schemes = res_farmer.json()["schemes"]
        self.assertGreaterEqual(len(farmer_schemes), 3)

        # Search by Telugu keyword 'రైతు'
        res_search = client.get("/api/schemes?q=రైతు")
        self.assertEqual(res_search.status_code, 200)
        self.assertGreater(res_search.json()["total"], 0)
        print(f"[PASS] Test 3: Schemes Listing & Telugu Search Passed ({data['total']} total schemes)")

    def test_04_scheme_details_and_documents(self):
        """Test fetching single scheme details, documents, and official source."""
        res = client.get("/api/schemes/pm-kisan")
        self.assertEqual(res.status_code, 200)
        scheme = res.json()
        self.assertEqual(scheme["code"], "PM-KISAN")
        self.assertTrue(scheme["verified"])
        self.assertEqual(scheme["official_website"], "https://pmkisan.gov.in")
        self.assertGreater(len(scheme["required_documents"]), 0)

        # Test documents endpoint
        res_docs = client.get("/api/schemes/pm-kisan/documents")
        self.assertEqual(res_docs.status_code, 200)
        docs = res_docs.json()["required_documents"]
        doc_names = [d["name_en"] for d in docs]
        self.assertTrue(any("Aadhaar" in n for n in doc_names))

        # Test sources endpoint
        res_sources = client.get("/api/schemes/pm-kisan/sources")
        self.assertEqual(res_sources.status_code, 200)
        self.assertEqual(res_sources.json()["portal_name"], "PM-KISAN Portal")
        print("[PASS] Test 4: Scheme Details, Documents & Official Sources Passed")

    def test_05_recommendation_engine(self):
        """Test smart recommendation engine matches farmer profile to PM-KISAN, PMFBY, KUSUM."""
        farmer_profile = {
            "name": "రామయ్య",
            "occupation": "farmer",
            "annual_income": 120000,
            "age": 42,
            "gender": "male",
            "land_acres": 4.0,
            "state": "Andhra Pradesh",
            "has_ration_card": True,
            "language": "te"
        }
        res = client.post("/api/recommendations", json=farmer_profile)
        self.assertEqual(res.status_code, 200)
        data = res.json()
        self.assertGreater(data["eligible_count"], 0)

        top_scheme_names = [r["scheme"]["code"] for r in data["recommendations"][:4]]
        self.assertTrue(any(c in ["PM-KISAN", "PMFBY", "PM-KUSUM"] for c in top_scheme_names))
        self.assertIn("voice_narration_te", data)
        self.assertIn("disclaimer_te", data)
        print(f"[PASS] Test 5: Recommendation Engine Passed ({data['eligible_count']} eligible schemes identified)")

    def test_06_eligibility_step_check(self):
        """Test step-by-step eligibility checker endpoint."""
        student_profile = {
            "name": "సురేష్",
            "occupation": "student",
            "is_student": True,
            "age": 20,
            "annual_income": 150000,
            "state": "Andhra Pradesh",
            "has_ration_card": True
        }
        # Check specific scheme JVD (Vidya Deevena)
        scheme_jvd = self.db.query(Scheme).filter(Scheme.slug == "vidya-deevena").first()
        self.assertIsNotNone(scheme_jvd)

        res = client.post(f"/api/eligibility/check?scheme_id={scheme_jvd.id}", json=student_profile)
        self.assertEqual(res.status_code, 200)
        data = res.json()
        self.assertTrue(data["single_scheme"])
        self.assertGreaterEqual(data["result"]["score"], 70)
        print(f"[PASS] Test 6: Single Scheme Eligibility Evaluation Passed (Score: {data['result']['score']}%)")

    def test_07_conversational_ai_rag(self):
        """Test conversational AI RAG in Telugu."""
        chat_req = {
            "message": "నేను రైతును. నాకు పెట్టుబడి సాయం కోసం ఏ పథకం ఉంది?",
            "language": "te"
        }
        res = client.post("/api/ai/chat", json=chat_req)
        self.assertEqual(res.status_code, 200)
        data = res.json()
        self.assertIn("response_text", data)
        self.assertGreater(len(data["recommended_schemes"]), 0)
        self.assertGreater(len(data["suggested_questions"]), 0)
        print("[PASS] Test 7: AI RAG Telugu Response Generated with Scheme Cards")

    def test_08_voice_synthesis_and_guidance(self):
        """Test voice synthesis and button guidance registry."""
        synth_req = {
            "text": "నమస్కారం! స్కీమ్ సారథికి స్వాగతం.",
            "language": "te"
        }
        res_synth = client.post("/api/voice/synthesize", json=synth_req)
        self.assertEqual(res_synth.status_code, 200)
        data_synth = res_synth.json()
        self.assertEqual(data_synth["format"], "audio/mp3")

        # Test button guidance endpoint
        res_guide = client.get("/api/voice/guidance/hero_voice_start")
        self.assertEqual(res_guide.status_code, 200)
        self.assertIn("text_te", res_guide.json())
        print("[PASS] Test 8: Voice Synthesis & Button Guidance Passed")

    def test_09_admin_dashboard_and_feedback(self):
        """Test admin analytics and citizen feedback registration."""
        res_stats = client.get("/api/admin/stats")
        self.assertEqual(res_stats.status_code, 200)
        stats = res_stats.json()
        self.assertGreaterEqual(stats["total_schemes"], 16)

        # Submit citizen feedback
        feedback_req = {
            "rating": 5,
            "comment": "వాయిస్ సహాయం చాలా ఉపయోగపడింది! ధన్యవాదాలు.",
            "voice_used": "yes"
        }
        res_fb = client.post("/api/feedback", json=feedback_req)
        self.assertEqual(res_fb.status_code, 200)
        print("[PASS] Test 9: Admin Dashboard & Feedback API Passed")

    def test_10_missing_scheme_404(self):
        """Test error handling for non-existent scheme."""
        res = client.get("/api/schemes/non-existent-scheme-12345")
        self.assertEqual(res.status_code, 404)
        print("[PASS] Test 10: 404 Error Handling Verified")

if __name__ == "__main__":
    unittest.main()
