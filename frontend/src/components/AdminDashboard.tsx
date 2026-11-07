import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Layers, 
  Eye, 
  PlusCircle, 
  Check, 
  X, 
  TrendingUp, 
  ExternalLink,
  MessageSquare,
  Sparkles,
  RefreshCw,
  Search
} from 'lucide-react';
import { fetchAdminStats, toggleVerifyScheme, createScheme } from '../services/api';
import { AdminStats, SchemeSummary } from '../types';

interface AdminDashboardProps {
  schemes: SchemeSummary[];
  onRefreshSchemes: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ schemes, onRefreshSchemes }) => {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [filterQuery, setFilterQuery] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  // New Scheme Form State
  const [newScheme, setNewScheme] = useState({
    slug: '',
    category_id: 1,
    name_te: '',
    name_en: '',
    level: 'Central',
    state: 'All India',
    purpose_te: '',
    purpose_en: '',
    benefits_te: '',
    benefits_en: '',
    financial_amount: '',
    official_website: 'https://',
    portal_name: 'Official Portal',
    helpline_number: '1902',
    verified: true,
    verification_source: 'Official Ministry Guidelines',
    application_mode: 'Grama Sachivalayam / Online',
    eligibility_criteria_te: ['భారతీయ పౌరుడై ఉండాలి.'],
    required_documents: [{ name_te: 'ఆధార్ కార్డు', name_en: 'Aadhaar Card', mandatory: true }]
  });

  const loadStats = () => {
    setLoading(true);
    fetchAdminStats()
      .then((data) => setStats(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadStats();
  }, []);

  const handleToggleVerify = async (schemeId: number) => {
    try {
      await toggleVerifyScheme(schemeId);
      onRefreshSchemes();
      loadStats();
    } catch (err) {
      alert('Verification update failed');
    }
  };

  const handleCreateSchemeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newScheme.name_te || !newScheme.slug) {
      alert('దయచేసి పథకం పేరు మరియు స్లగ్ నమోదు చేయండి.');
      return;
    }
    try {
      await createScheme(newScheme);
      alert('పథకం విజయవంతంగా చేర్చబడింది!');
      setShowAddForm(false);
      onRefreshSchemes();
      loadStats();
    } catch (err) {
      alert('పథకం సృష్టించడంలో లోపం ఏర్పడింది. స్లగ్ యునిక్‌గా ఉండాలి.');
    }
  };

  const filteredSchemes = schemes.filter(
    (s) => s.name_te.includes(filterQuery) || s.name_en.toLowerCase().includes(filterQuery.toLowerCase())
  );

  return (
    <section className="py-10 px-4 sm:px-8 max-w-7xl mx-auto space-y-8 animate-fadeIn">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-stone-200">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300">
            నిర్వహణ ప్యానెల్ • Admin Portal
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-stone-900 mt-1">
            స్కీమ్ సారథి అడ్మిన్ డాష్‌బోర్డ్
          </h2>
          <p className="text-xs sm:text-sm text-stone-600">
            ప్రభుత్వ పథకాల ధృవీకరణ స్థితి, అధికారిక మూలాలు మరియు అనామక వినియోగ గణాంకాలు
          </p>
        </div>

        <div className="flex items-center space-x-2.5">
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs sm:text-sm shadow-sm transition"
          >
            <PlusCircle className="w-4 h-4" />
            <span>{showAddForm ? 'ఫారం మూసివేయి' : 'కొత్త పథకం చేర్చండి'}</span>
          </button>

          <button
            onClick={loadStats}
            className="p-2.5 rounded-xl border border-stone-300 hover:bg-stone-100 text-stone-700 transition"
            title="రీఫ్రెష్"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Analytics Stats Cards */}
      {stats && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white border-2 border-emerald-100 p-5 rounded-2xl shadow-sm space-y-1">
            <span className="text-xs font-bold text-stone-500 uppercase">మొత్తం పథకాలు</span>
            <div className="text-2xl sm:text-3xl font-black text-emerald-900">{stats.total_schemes}</div>
            <p className="text-[11px] text-emerald-700 font-semibold">{stats.total_categories} వర్గాలలో పంపిణీ చేయబడింది</p>
          </div>

          <div className="bg-white border-2 border-emerald-100 p-5 rounded-2xl shadow-sm space-y-1">
            <span className="text-xs font-bold text-stone-500 uppercase">ధృవీకరించబడినవి</span>
            <div className="text-2xl sm:text-3xl font-black text-emerald-700">{stats.verified_schemes}</div>
            <p className="text-[11px] text-stone-500">100% అధికారిక పోర్టల్స్ ద్వారా</p>
          </div>

          <div className="bg-white border-2 border-emerald-100 p-5 rounded-2xl shadow-sm space-y-1">
            <span className="text-xs font-bold text-stone-500 uppercase">పౌరుల వీక్షణలు</span>
            <div className="text-2xl sm:text-3xl font-black text-amber-600">{stats.total_views}</div>
            <p className="text-[11px] text-stone-500">మొత్తం పథక సమాచార అభ్యర్థనలు</p>
          </div>

          <div className="bg-white border-2 border-emerald-100 p-5 rounded-2xl shadow-sm space-y-1">
            <span className="text-xs font-bold text-stone-500 uppercase">సగటు సంతృప్తి రేటింగ్</span>
            <div className="text-2xl sm:text-3xl font-black text-indigo-700">{stats.average_rating} / 5.0</div>
            <p className="text-[11px] text-stone-500">{stats.feedback_count} పౌరుల స్పందనలు</p>
          </div>
        </div>
      )}

      {/* Add New Scheme Collapsible Form */}
      {showAddForm && (
        <form onSubmit={handleCreateSchemeSubmit} className="bg-white border-2 border-emerald-700 rounded-3xl p-6 sm:p-8 shadow-xl space-y-5 animate-fadeIn">
          <div className="border-b border-stone-200 pb-3 flex items-center justify-between">
            <h3 className="text-lg font-black text-stone-900">
              కొత్త సంక్షేమ పథకాన్ని చేర్చండి (Add New Welfare Scheme)
            </h3>
            <span className="text-xs text-stone-500">అన్ని ఫీల్డులను తెలుగు మరియు ఇంగ్లీషులో నమోదు చేయండి</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">స్లగ్ (Unique Slug)</label>
              <input
                type="text"
                required
                placeholder="e.g. pm-solar-rooftop"
                value={newScheme.slug}
                onChange={(e) => setNewScheme({ ...newScheme, slug: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-stone-300 text-sm font-semibold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">వర్గం (Category ID)</label>
              <select
                value={newScheme.category_id}
                onChange={(e) => setNewScheme({ ...newScheme, category_id: Number(e.target.value) })}
                className="w-full p-2.5 rounded-xl border border-stone-300 text-sm font-semibold"
              >
                <option value={1}>1. రైతులకు పథకాలు (Farmers)</option>
                <option value={2}>2. విద్యార్థులకు పథకాలు (Students)</option>
                <option value={3}>3. మహిళలకు పథకాలు (Women)</option>
                <option value={4}>4. ఆరోగ్య పథకాలు (Health)</option>
                <option value={5}>5. గృహ నిర్మాణ పథకాలు (Housing)</option>
                <option value={6}>6. ఉపాధి పథకాలు (Employment)</option>
                <option value={7}>7. వ్యాపార రుణాలు (Loans)</option>
                <option value={8}>8. నైపుణ్య శిక్షణ (Skills)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">స్థాయి (Jurisdiction)</label>
              <select
                value={newScheme.level}
                onChange={(e) => setNewScheme({ ...newScheme, level: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-stone-300 text-sm font-semibold"
              >
                <option value="Central">కేంద్ర ప్రభుత్వం (Central)</option>
                <option value="Andhra Pradesh">ఆంధ్రప్రదేశ్ రాష్ట్రం (Andhra Pradesh)</option>
                <option value="Central / State">కేంద్ర & రాష్ట్ర సమన్వయం</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">పథకం పేరు (తెలుగులో)</label>
              <input
                type="text"
                required
                placeholder="e.g. పీఎం సూర్య ఘర్ ఉచిత విద్యుత్ యోజన"
                value={newScheme.name_te}
                onChange={(e) => setNewScheme({ ...newScheme, name_te: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-stone-300 text-sm font-semibold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Scheme Name (English)</label>
              <input
                type="text"
                required
                placeholder="e.g. PM Surya Ghar Muft Bijli Yojana"
                value={newScheme.name_en}
                onChange={(e) => setNewScheme({ ...newScheme, name_en: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-stone-300 text-sm font-semibold"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">ముఖ్య ఉద్దేశం (తెలుగులో)</label>
              <textarea
                required
                rows={2}
                value={newScheme.purpose_te}
                onChange={(e) => setNewScheme({ ...newScheme, purpose_te: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Purpose Overview (English)</label>
              <textarea
                required
                rows={2}
                value={newScheme.purpose_en}
                onChange={(e) => setNewScheme({ ...newScheme, purpose_en: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm font-medium"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">లభించే మొత్తం (Financial Amount)</label>
              <input
                type="text"
                placeholder="e.g. ₹78,000 సబ్సిడీ"
                value={newScheme.financial_amount}
                onChange={(e) => setNewScheme({ ...newScheme, financial_amount: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-stone-300 text-sm font-semibold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">అధికారిక వెబ్‌సైట్ (URL)</label>
              <input
                type="url"
                required
                value={newScheme.official_website}
                onChange={(e) => setNewScheme({ ...newScheme, official_website: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-stone-300 text-sm font-semibold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">పోర్టల్ పేరు (Portal Name)</label>
              <input
                type="text"
                required
                value={newScheme.portal_name}
                onChange={(e) => setNewScheme({ ...newScheme, portal_name: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-stone-300 text-sm font-semibold"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t border-stone-200">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-5 py-2.5 rounded-xl border border-stone-300 text-xs font-bold text-stone-700"
            >
              రద్దు చేయండి
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs sm:text-sm shadow-md"
            >
              పథకాన్ని భద్రపరచండి (Save Scheme)
            </button>
          </div>
        </form>
      )}

      {/* Schemes Management Table */}
      <div className="bg-white border border-stone-200 rounded-3xl p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <h3 className="text-lg font-black text-stone-900">
            అన్ని పథకాల సమీక్ష ({schemes.length})
          </h3>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="పథకాన్ని వెతకండి..."
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs font-semibold rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-700"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-stone-50 border-b border-stone-200 text-stone-600 uppercase text-[11px] font-bold">
              <tr>
                <th className="py-3 px-4">పథకం పేరు (Telugu & English)</th>
                <th className="py-3 px-4">వర్గం</th>
                <th className="py-3 px-4">లబ్ధి మొత్తం</th>
                <th className="py-3 px-4">ధృవీకరణ స్థితి</th>
                <th className="py-3 px-4 text-right">చర్యలు</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filteredSchemes.map((s) => (
                <tr key={s.id} className="hover:bg-stone-50 transition">
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-stone-900">{s.name_te}</div>
                    <div className="text-[11px] text-stone-500">{s.name_en}</div>
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-stone-700">
                    {s.category_name_te}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-amber-900">
                    {s.financial_amount || 'సహాయక లబ్ధి'}
                  </td>
                  <td className="py-3.5 px-4">
                    <button
                      onClick={() => handleToggleVerify(s.id)}
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold transition ${
                        s.verified
                          ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                          : 'bg-rose-100 text-rose-800 border border-rose-300'
                      }`}
                    >
                      {s.verified ? (
                        <>
                          <Check className="w-3 h-3" />
                          <span>ధృవీకృతం (Verified)</span>
                        </>
                      ) : (
                        <>
                          <X className="w-3 h-3" />
                          <span>పరిశీలనలో ఉంది</span>
                        </>
                      )}
                    </button>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <a
                      href={s.official_website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg hover:bg-stone-200 text-stone-600 inline-block"
                      title="పోర్టల్ ఓపెన్ చేయండి"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
