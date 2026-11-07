import io
import base64
import logging
from gtts import gTTS

logger = logging.getLogger(__name__)

# Central Telugu voice guidance audio script dictionary for key buttons
BUTTON_GUIDANCE_TE = {
    "nav_home": "మీరు ఇప్పుడు ప్రధాన పేజీలో ఉన్నారు.",
    "nav_explore": "ఇక్కడ మీరు వివిధ ప్రభుత్వ పథకాలను వర్గాల వారీగా అన్వేషించవచ్చు.",
    "nav_assistant": "ఇది మీ సారథి AI సహాయకుడు. మీరు తెలుగులో మాట్లాడి లేదా టైప్ చేసి ఏ ప్రభుత్వ పథకం గురించైనా అడగవచ్చు.",
    "nav_eligibility": "మీ అర్హతను తెలుసుకోవడానికి కొన్ని వివరాలు నమోదు చేయండి.",
    "nav_documents": "ప్రభుత్వ పథకాలకు అవసరమైన పత్రాల వివరాలు మరియు వాటిని పొందే విధానం ఇక్కడ చూడవచ్చు.",
    "nav_about": "స్కీమ్ సారథి ప్రాజెక్ట్ లక్ష్యాలు మరియు వివరాలు ఇక్కడ ఉన్నాయి.",
    "nav_admin": "ఇది పథకాల సమాచారాన్ని సమీక్షించే అడ్మిన్ నిర్వహణ విభాగం.",
    
    "hero_voice_start": "నమస్కారం! మైక్రోఫోన్ బటన్ నొక్కి మీ వివరాలు చెప్పండి. నేను మీకు తగిన పథకాలను చూపిస్తాను.",
    "hero_explore": "అందుబాటులో ఉన్న అన్ని కేంద్ర మరియు రాష్ట్ర ప్రభుత్వ పథకాల జాబితాను చూపిస్తున్నాను.",
    "hero_eligibility": "సులభమైన దశల్లో మీ అర్హతను తనిఖీ చేసుకునే పేజీకి వెళ్తున్నారు.",
    
    "cat_farmers": "ఇక్కడ రైతులకు పెట్టుబడి సాయం, పంటల బీమా మరియు సోలార్ పంపుల పథకాల వివరాలు ఉన్నాయి.",
    "cat_students": "ఇక్కడ విద్యార్థుల ఫీజు రీయింబర్స్‌మెంట్ మరియు స్కాలర్‌షిప్‌ల వివరాలు ఉన్నాయి.",
    "cat_women": "ఇక్కడ మహిళా సంక్షేమం, చేయూత మరియు ప్రసూతి సహాయ పథకాల వివరాలు ఉన్నాయి.",
    "cat_health": "ఇక్కడ ఉచిత ఆసుపత్రి చికిత్స మరియు ఆరోగ్య కార్డుల వివరాలు ఉన్నాయి.",
    "cat_housing": "ఇక్కడ పేదలకు పక్కా గృహ నిర్మాణ పథకాల వివరాలు ఉన్నాయి.",
    "cat_employment": "ఇక్కడ 100 రోజుల ఉపాధి హామీ మరియు చేతివృత్తుల పథకాల వివరాలు ఉన్నాయి.",
    "cat_loans": "ఇక్కడ చిరు వ్యాపారస్తులకు హామీ లేని ముద్రా రుణాల వివరాలు ఉన్నాయి.",
    "cat_skills": "ఇక్కడ ఉచిత నైపుణ్య శిక్షణ మరియు ఉద్యోగ కల్పన పథకాల వివరాలు ఉన్నాయి.",
    
    "action_check_eligibility": "ఈ పథకానికి మీ అర్హత సరిపోలుతుందో లేదో తనిఖీ చేయండి.",
    "action_view_documents": "ఈ పథకానికి కావలసిన ముఖ్యమైన పత్రాల జాబితాను పరిశీలించండి.",
    "action_apply_now": "దరఖాస్తు ప్రక్రియను ప్రారంభించడానికి ఇక్కడ క్లిక్ చేయండి. అధికారిక ప్రభుత్వ వెబ్‌సైట్ వివరాలను పరిశీలించండి.",
    "action_listen_voice": "ఈ పథకం ముఖ్య సమాచారాన్ని వాయిస్‌లో వినండి.",
    "action_rural_mode_on": "గ్రామీణ మోడ్ ఆన్ చేయబడింది. పెద్ద బటన్లు మరియు వాయిస్ సహాయం సిద్ధంగా ఉన్నాయి.",
    "action_rural_mode_off": "సాధారణ మోడ్ పునరుద్ధరించబడింది.",
    "action_voice_guide_toggle_on": "వాయిస్ మార్గదర్శనం ఆన్ చేయబడింది. ప్రతి బటన్ పనితీరును తెలుగులో వినవచ్చు.",
    "action_voice_guide_toggle_off": "వాయిస్ మార్గదర్శనం మ్యూట్ చేయబడింది."
}

def synthesize_telugu_speech(text: str, lang: str = "te") -> str:
    """Generate audio via gTTS and return base64 encoded MP3."""
    try:
        clean_text = text.replace("*", "").replace("#", "").strip()
        # limit length for quick response
        if len(clean_text) > 400:
            clean_text = clean_text[:400] + "..."
            
        tts = gTTS(text=clean_text, lang=lang if lang in ["te", "en", "hi"] else "te", slow=False)
        fp = io.BytesIO()
        tts.write_to_fp(fp)
        fp.seek(0)
        audio_bytes = fp.read()
        return base64.b64encode(audio_bytes).decode("utf-8")
    except Exception as e:
        logger.error(f"Error synthesizing speech: {e}")
        return ""

def get_button_guidance(button_key: str) -> dict:
    text = BUTTON_GUIDANCE_TE.get(button_key, "బటన్ క్లిక్ చేయబడింది.")
    return {
        "key": button_key,
        "text_te": text,
        "audio_base64": None # Frontend handles via Web Speech API or requests synthesize on demand
    }
