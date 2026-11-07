import React, { useState } from 'react';
import { FileCheck, Shield, Building, CreditCard, Users, Landmark, Volume2, CheckCircle2 } from 'lucide-react';
import { useVoice } from '../context/VoiceContext';

export const DocumentGuidance: React.FC = () => {
  const { speakTelugu, handleAccessibleAction } = useVoice();
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const toggleItem = (id: string) => {
    setCheckedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const DOCUMENTS_GUIDE = [
    {
      id: 'aadhaar',
      name_te: 'ఆధార్ కార్డు (e-KYC & మొబైల్ లింక్)',
      name_en: 'Aadhaar Card (Active e-KYC)',
      icon: <Shield className="w-6 h-6 text-emerald-700" />,
      importance_te: 'అన్ని ప్రభుత్వ పథకాలకు ఆధార్ ప్రాథమిక గుర్తింపు పత్రం. మొబైల్ నంబర్‌తో లింక్ అయి ఉండాలి.',
      how_to_get_te: 'మీ సమీప గ్రామ/వార్డు సచివాలయం, ఆధార్ సేవా కేంద్రం లేదా పోస్టాఫీసులో నవీకరించుకోవచ్చు.',
      tip_te: 'బ్యాంక్ ఖాతాతో ఆధార్ సీడింగ్ (NPCI Mapping) తప్పనిసరిగా చేయించాలి.'
    },
    {
      id: 'ration',
      name_te: 'బియ్యం కార్డు / ఆహార భద్రతా రేషన్ కార్డు',
      name_en: 'Rice Card / White Ration Card',
      icon: <Users className="w-6 h-6 text-amber-600" />,
      importance_te: 'దారిద్య్ర రేఖకు దిగువన (BPL) ఉన్నారని నిరూపించే అతి ముఖ్యమైన పత్రం. ఆరోగ్యశ్రీ, విద్యా దీవెనలకు అవసరం.',
      how_to_get_te: 'గ్రామ సచివాలయంలో లేదా నవశకం పోర్టల్ ద్వారా కొత్త బియ్యం కార్డుకు దరఖాస్తు చేసుకోవచ్చు.',
      tip_te: 'కుటుంబ సభ్యులందరి పేర్లు రేషన్ కార్డులో సరిగ్గా ఉన్నాయో లేదో సరిచూసుకోండి.'
    },
    {
      id: 'bank',
      name_te: 'బ్యాంక్ ఖాతా పాస్‌బుక్ (NPCI / DBT ఎనేబుల్డ్)',
      name_en: 'Bank Account Passbook (DBT Active)',
      icon: <CreditCard className="w-6 h-6 text-blue-700" />,
      importance_te: 'ప్రభుత్వ సంక్షేమ నిధులు నేరుగా మీ ఖాతాలో పడటానికి బ్యాంక్ ఖాతా అవసరం.',
      how_to_get_te: 'ఏదైనా జాతీయ లేదా ప్రాంతీయ గ్రామీణ బ్యాంకులో (APGB/చైతన్య గోదావరి) జీరో బ్యాలెన్స్ అకౌంట్ తెరవవచ్చు.',
      tip_te: 'బ్యాంకు శాఖకు వెళ్లి "నా ఆధార్‌ను NPCI మ్యాపింగ్ చేయండి" అని ఫారం సమర్పించాలి.'
    },
    {
      id: 'income',
      name_te: 'ఆదాయ ధృవీకరణ పత్రం (Income Certificate)',
      name_en: 'Integrated Income Certificate',
      icon: <Landmark className="w-6 h-6 text-indigo-700" />,
      importance_te: 'కుటుంబ వార్షిక ఆదాయ పరిమితిని నిరూపించడానికి (స్కాలర్‌షిప్‌లు, ఫీజు రాయితీలకు).',
      how_to_get_te: 'గ్రామ సచివాలయం లేదా మీసేవ కేంద్రంలో దరఖాస్తు చేస్తే వీఆర్వో పరిశీలన తర్వాత తహశీల్దార్ జారీ చేస్తారు.',
      tip_te: 'ఈ సర్టిఫికెట్ చెల్లుబాటు సాధారణంగా ఒక ఆర్థిక సంవత్సరం మాత్రమే ఉంటుంది.'
    },
    {
      id: 'caste',
      name_te: 'కుల ధృవీకరణ పత్రం (Caste Certificate)',
      name_en: 'Integrated Caste Certificate',
      icon: <Building className="w-6 h-6 text-purple-700" />,
      importance_te: 'ఎస్సీ, ఎస్టీ, బీసీ మరియు మైనారిటీ వర్గాల ప్రత్యేక సంక్షేమ పథకాలకు (చేయూత, వసతి దీవెన) తప్పనిసరి.',
      how_to_get_te: 'మీసేవ లేదా గ్రామ సచివాలయంలో రేషన్ కార్డు, పూర్వీకుల రికార్డులతో దరఖాస్తు చేయాలి.',
      tip_te: 'ఒక్కసారి పొందిన ఇంటిగ్రేటెడ్ సర్టిఫికెట్ డిజిటల్ సంతకంతో శాశ్వతంగా చెల్లుతుంది.'
    },
    {
      id: 'land',
      name_te: 'పట్టాదారు పాస్‌బుక్ / 1-B అడంగల్ రికార్డు',
      name_en: 'Pattadar Passbook / 1-B Land Record',
      icon: <FileCheck className="w-6 h-6 text-emerald-800" />,
      importance_te: 'పీఎం కిసాన్, పీఎం కుసుమ్ సోలార్ పంపులు, పంటల బీమాకు సొంత వ్యవసాయ భూమి యాజమాన్య రుజువు.',
      how_to_get_te: 'మీభూమి (meebhoomi.ap.gov.in) పోర్టల్ నుండి లేదా గ్రామ సచివాలయంలో డిజిటల్ కాపీ పొందవచ్చు.',
      tip_te: 'కౌలు రైతులకు అయితే CCRC (క్రాప్ కల్టివేటర్ రైట్స్ కార్డ్) సచివాలయం ద్వారా పొందాలి.'
    }
  ];

  return (
    <section id="documents-section" className="py-12 px-4 sm:px-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
          పత్రాల మార్గదర్శి • Document Guidance
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
          ప్రభుత్వ పథకాలకు అవసరమైన ముఖ్య పత్రాలు
        </h2>
        <p className="text-stone-600 text-sm sm:text-base">
          పథకాలకు దరఖాస్తు చేయడానికి ఏయే సర్టిఫికెట్లు కావాలో మరియు వాటిని ఎలా పొందాలో ఇక్కడ తెలుసుకోండి.
        </p>
      </div>

      {/* Document Guidance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {DOCUMENTS_GUIDE.map((doc) => {
          const isDone = !!checkedItems[doc.id];
          return (
            <div
              key={doc.id}
              className={`p-6 rounded-2xl border-2 transition shadow-sm space-y-3.5 ${
                isDone 
                  ? 'border-emerald-600 bg-emerald-50/70' 
                  : 'border-stone-200 bg-white hover:border-emerald-300'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-stone-50 border border-stone-200 flex items-center justify-center flex-shrink-0">
                    {doc.icon}
                  </div>
                  <div>
                    <h3 className="text-base font-black text-stone-900">
                      {doc.name_te}
                    </h3>
                    <p className="text-xs text-stone-500 font-semibold">
                      {doc.name_en}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => speakTelugu(`${doc.name_te}. ముఖ్య ఉద్దేశం: ${doc.importance_te}. పొందే విధానం: ${doc.how_to_get_te}`)}
                  className="p-2 rounded-full hover:bg-stone-100 text-stone-500 hover:text-emerald-800 transition flex-shrink-0"
                  title="వాయిస్‌లో వినండి"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>

              {/* Importance */}
              <div className="text-xs text-stone-700 leading-relaxed">
                <strong>ఎందుకు అవసరం:</strong> {doc.importance_te}
              </div>

              {/* How to Get */}
              <div className="text-xs text-emerald-950 bg-emerald-100/50 p-2.5 rounded-xl border border-emerald-200/80 leading-relaxed">
                <strong>ఎక్కడ లభిస్తుంది:</strong> {doc.how_to_get_te}
              </div>

              {/* Essential Tip */}
              <div className="text-[11px] text-amber-900 bg-amber-50 p-2 rounded-lg border border-amber-200 leading-relaxed">
                💡 <strong>ముఖ్య సూచన:</strong> {doc.tip_te}
              </div>

              {/* Bottom Checklist Tick */}
              <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={isDone}
                    onChange={() => toggleItem(doc.id)}
                    className="w-4 h-4 accent-emerald-700 rounded cursor-pointer"
                  />
                  <span className="text-xs font-bold text-stone-800">
                    {isDone ? 'నా వద్ద ఈ పత్రం సిద్ధంగా ఉంది' : 'నా వద్ద ఉందో లేదో గుర్తించండి'}
                  </span>
                </label>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
