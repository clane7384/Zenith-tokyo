import { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  MessageSquare,
  CheckCircle2,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { useSiteData } from '../context/SiteDataContext';
import { Language, ThemeConfig, InquiryData } from '../types';

interface ContactSectionProps {
  lang: Language;
  themeConfig: ThemeConfig;
  onOpenLineModal: () => void;
  prefilledTopic?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  lang,
  themeConfig,
  onOpenLineModal,
  prefilledTopic = ''
}) => {
  const { companyInfo, formspreeUrl, logInquiry } = useSiteData();
  const isJa = lang === 'ja';

  const [formData, setFormData] = useState<InquiryData>({
    name: '',
    email: '',
    phone: '',
    category: 'residential',
    location: 'tokyo-23',
    budgetScale: '100m-300m',
    timeline: 'within-1yr',
    message: prefilledTopic ? `【関心プロジェクト】 ${prefilledTopic}\n\n` : '',
    preferredContact: 'email'
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMessage(null);

    try {
      const response = await fetch(formspreeUrl || 'https://formspree.io/f/mdeoeevy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone || 'Not provided',
          category: formData.category,
          location: formData.location,
          budgetScale: formData.budgetScale,
          timeline: formData.timeline,
          message: formData.message,
          preferredContact: formData.preferredContact,
          _subject: `[ZENITH TOKYO] New Architectural Inquiry from ${formData.name}`
        })
      });

      if (response.ok) {
        logInquiry(formData);
        setSubmitted(true);
      } else {
        const result = await response.json().catch(() => ({}));
        if (result && result.errors && result.errors.length > 0) {
          setErrorMessage(result.errors.map((err: { message: string }) => err.message).join(', '));
        } else {
          setErrorMessage(isJa ? '送信中にエラーが発生しました。時間をおいて再送いただくか、お電話・メールでお問い合わせください。' : 'An error occurred while submitting. Please try again or reach out via direct phone/email.');
        }
      }
    } catch {
      // In development or if offline, still log locally and show feedback
      logInquiry(formData);
      setErrorMessage(isJa ? '通信エラーが発生しました。ネットワーク環境をご確認ください。' : 'Network error occurred. Please check your connection.');
    } finally {
      setSubmitting(false);
    }
  };

  const instagramPosts = [
    {
      img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80',
      caption: '#ZenithTokyo #Shirokane #LuxuryArchitecture'
    },
    {
      img: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=600&q=80',
      caption: '#Omotesando #VerdeAlpi #BoutiqueDesign'
    },
    {
      img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=80',
      caption: '#Karuizawa #BiophilicRetreat #DarkNature'
    },
    {
      img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80',
      caption: '#Aoyama #ModernistRegeneration #Concrete'
    },
    {
      img: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=600&q=80',
      caption: '#Ginza #ArtSalon #ShadowCraft'
    },
    {
      img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=600&q=80',
      caption: '#Minimalism #Yakusugi #Ma'
    }
  ];

  return (
    <section
      id="contact"
      className="relative py-28 bg-[#1A1C20] border-t border-stone-800/80 overflow-hidden"
    >
      {/* Background Ambience */}
      <div
        className="absolute top-1/2 right-0 w-96 h-96 rounded-full blur-3xl opacity-15 pointer-events-none"
        style={{ backgroundColor: themeConfig.accentColor }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-stone-800">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span
                className="w-2.5 h-[1.5px]"
                style={{ backgroundColor: themeConfig.goldColor }}
              />
              <span className="text-xs uppercase tracking-[0.25em] text-[#C5A059] font-montserrat">
                {isJa ? '設計相談・アトリエ予約' : 'Consultation & Private Atelier'}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white font-shippori">
              {isJa ? '人生の空間を語り合う' : 'Begin the Architectural Dialogue'}
            </h2>
          </div>
          <div className="mt-4 md:mt-0 max-w-md">
            <p className="text-xs sm:text-sm text-stone-400 font-montserrat leading-relaxed">
              {isJa
                ? '新築住宅、商業施設、別荘、リノベーションのご相談を承ります。新宿歌舞伎町アトリエでの対面面談またはオンラインにて対応いたします。'
                : 'We welcome commissions for residential estates, luxury retail, alpine villas, and modernist regeneration. Consultations held at our Shinjuku Atelier or via secure video link.'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-24">
          {/* Left Column (5 cols): Atelier Info & Interactive Map */}
          <div className="lg:col-span-5 space-y-8">
            {/* Atelier Card with Exact Address */}
            <div className="p-7 rounded-2xl bg-[#22252B] border border-stone-700/60 shadow-xl space-y-6">
              <div className="border-b border-stone-700/70 pb-4">
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#C5A059] block mb-1">
                  Corporate Headquarters & Atelier
                </span>
                <h3 className="text-xl font-bold font-shippori text-white">
                  {isJa ? companyInfo.corporateNameJa : companyInfo.corporateNameEn}
                </h3>
                <span className="text-xs text-stone-400 font-montserrat">
                  {isJa ? companyInfo.brandNameJa : companyInfo.brandNameEn}
                </span>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-stone-300 font-montserrat">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#C5A059] shrink-0 mt-1" />
                  <div>
                    <span className="text-white font-medium block">
                      {isJa ? companyInfo.addressJa : companyInfo.addressEn}
                    </span>
                    <span className="text-xs text-stone-400 block mt-1 leading-relaxed">
                      {isJa ? companyInfo.accessJa : companyInfo.accessEn}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-stone-500 shrink-0" />
                  <span>{isJa ? companyInfo.hoursJa : companyInfo.hoursEn}</span>
                </div>

                {/* Direct lines for both Representative Directors */}
                <div className="space-y-2 pt-2 border-t border-stone-800/80">
                  <div className="text-[11px] text-[#C5A059] uppercase font-montserrat tracking-wider">
                    {isJa ? '代表取締役 直通窓口' : 'Representative Directors Direct Contact'}
                  </div>
                  {companyInfo.directors.map((dir, idx) => (
                    <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between text-xs bg-stone-900/60 p-2.5 rounded-lg border border-stone-800">
                      <span className="font-shippori text-white font-medium">
                        {dir.roleJa} {dir.nameJa} ({dir.nameEn})
                      </span>
                      <div className="flex items-center gap-3 mt-1 sm:mt-0 font-mono">
                        <a href={`tel:${dir.phone}`} className="text-stone-300 hover:text-[#C5A059] flex items-center gap-1">
                          <Phone className="w-3 h-3 text-[#C5A059]" />
                          <span>{dir.phone}</span>
                        </a>
                        <a href={`mailto:${dir.email}`} className="text-stone-300 hover:text-[#C5A059] flex items-center gap-1">
                          <Mail className="w-3 h-3 text-[#C5A059]" />
                          <span>{dir.email}</span>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* LINE Official Banner in Atelier Card */}
              <div className="pt-2 border-t border-stone-800">
                <button
                  id="contact-line-direct-btn"
                  onClick={onOpenLineModal}
                  className="w-full py-3 px-4 rounded-xl bg-[#06C755]/15 hover:bg-[#06C755]/25 border border-[#06C755]/40 text-[#06C755] text-xs font-semibold flex items-center justify-between transition-all"
                >
                  <div className="flex items-center gap-2.5">
                    <MessageSquare className="w-4 h-4 text-[#06C755]" />
                    <span>{isJa ? 'LINEでクイック相談（24時間受付）' : 'Instant Consultation via LINE'}</span>
                  </div>
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-[#06C755] text-white">
                    ONLINE
                  </span>
                </button>
              </div>
            </div>

            {/* Stylized Google Maps Presentation Box */}
            <div className="rounded-2xl bg-[#22252B] border border-stone-700/60 overflow-hidden shadow-xl">
              <div className="relative aspect-[16/9] w-full bg-[#1A1C20] p-4 flex flex-col justify-between">
                {/* Stylized dark cartography lines */}
                <div className="absolute inset-0 opacity-20 pointer-events-none">
                  <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <line x1="0" y1="30%" x2="100%" y2="30%" stroke="#C5A059" strokeWidth="1" strokeDasharray="4 4" />
                    <line x1="0" y1="70%" x2="100%" y2="70%" stroke="#E5E5E5" strokeWidth="1" />
                    <line x1="45%" y1="0" x2="45%" y2="100%" stroke="#E5E5E5" strokeWidth="1.5" />
                    <line x1="75%" y1="0" x2="75%" y2="100%" stroke="#C5A059" strokeWidth="1" strokeDasharray="2 2" />
                    <circle cx="45%" cy="30%" r="24" fill="none" stroke="#06C755" strokeWidth="1" strokeDasharray="2 2" />
                  </svg>
                </div>

                {/* Pin callout */}
                <div className="relative z-10 self-center my-auto flex flex-col items-center">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white shadow-2xl animate-bounce border-2 border-white"
                    style={{ backgroundColor: themeConfig.accentColor }}
                  >
                    <MapPin className="w-5 h-5 text-[#C5A059]" />
                  </div>
                  <div className="mt-2 px-3 py-1 rounded bg-black/90 backdrop-blur border border-stone-700 text-xs font-shippori text-white text-center shadow-lg">
                    {isJa ? 'ZENITH TOKYO 新宿歌舞伎町' : 'ZENITH TOKYO Shinjuku Atelier'}
                  </div>
                </div>

                <div className="relative z-10 flex items-center justify-between text-xs text-stone-400">
                  <span className="font-mono">Tokyo, Shinjuku (35.6963° N, 139.7058° E)</span>
                  <a
                    id="open-google-maps-btn"
                    href="https://maps.google.com/?q=東京都新宿区歌舞伎町2丁目4-3ノア新宿2号館"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[#C5A059] hover:underline"
                  >
                    <span>Google Maps</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (7 cols): Bilingual Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-2xl bg-[#22252B] border border-stone-700/60 shadow-2xl">
              {submitted ? (
                <div className="py-16 text-center space-y-5 animate-in fade-in">
                  <div
                    className="w-16 h-16 rounded-full mx-auto flex items-center justify-center text-white shadow-xl border"
                    style={{
                      backgroundColor: themeConfig.accentColor,
                      borderColor: themeConfig.goldColor
                    }}
                  >
                    <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                  </div>
                  <h3 className="text-2xl font-bold font-shippori text-white">
                    {isJa ? 'お問い合わせを承りました' : 'Inquiry Received'}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-300 font-montserrat max-w-md mx-auto leading-relaxed">
                    {isJa
                      ? 'Zenith Tokyoの建築・デザインチームより、通常24営業時間以内にご連絡申し上げます。お急ぎの場合はLINE公式窓口もご利用いただけます。'
                      : 'Our principal atelier team will review your project parameters and respond within 24 business hours. For urgent timelines, please reach out via our official LINE channel.'}
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        category: 'residential',
                        location: 'tokyo-23',
                        budgetScale: '100m-300m',
                        timeline: 'within-1yr',
                        message: '',
                        preferredContact: 'email'
                      });
                    }}
                    className="px-6 py-2.5 rounded text-xs text-[#C5A059] border border-stone-700 hover:bg-stone-800 transition-colors font-montserrat"
                  >
                    {isJa ? '別のご相談を入力する' : 'Submit Another Inquiry'}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <span className="text-xs uppercase tracking-widest text-[#C5A059] font-montserrat block mb-1">
                      {isJa ? '建築・インテリア設計のお問い合わせ' : 'Confidential Project Inquiry'}
                    </span>
                    <h3 className="text-xl font-bold font-shippori text-white">
                      {isJa ? 'プロジェクト相談フォーム' : 'Architectural Brief Form'}
                    </h3>
                  </div>

                  {/* Project Category */}
                  <div>
                    <label className="text-xs uppercase tracking-wider text-stone-300 font-montserrat block mb-2">
                      {isJa ? '1. ご相談の種別 (Category) *' : '1. Project Category *'}
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {[
                        { id: 'residential', labelJa: '新築高級住宅', labelEn: 'Private Residence' },
                        { id: 'commercial', labelJa: '商業旗艦店', labelEn: 'Commercial & Retail' },
                        { id: 'office', labelJa: 'オフィス・本社', labelEn: 'Corporate HQ' },
                        { id: 'hospitality', labelJa: '別荘・リゾート', labelEn: 'Villa / Retreat' },
                        { id: 'renovation', labelJa: 'リノベーション', labelEn: 'Regeneration' },
                        { id: 'press', labelJa: '取材・協業', labelEn: 'Media & Press' }
                      ].map((cat) => (
                        <button
                          type="button"
                          key={cat.id}
                          id={`inquiry-cat-${cat.id}`}
                          onClick={() => setFormData({ ...formData, category: cat.id })}
                          className={`p-2.5 rounded-lg border text-left text-xs transition-all ${
                            formData.category === cat.id
                              ? 'border-[#C5A059] bg-[#1A3026]/40 text-white font-medium'
                              : 'border-stone-800 bg-[#0E0E0E] text-stone-400 hover:border-stone-700'
                          }`}
                        >
                          {isJa ? cat.labelJa : cat.labelEn}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Contact Info (Name, Email, Phone) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-stone-300 font-montserrat block mb-1.5">
                        {isJa ? 'お名前 (Name) *' : 'Client Name *'}
                      </label>
                      <input
                        type="text"
                        required
                        id="inquiry-name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder={isJa ? '例: 高橋 創 (Ken Takahashi)' : 'e.g. Ken Takahashi'}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-[#0E0E0E] border border-stone-800 text-xs text-white placeholder-stone-600 focus:outline-none focus:border-[#C5A059] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="text-xs text-stone-300 font-montserrat block mb-1.5">
                        {isJa ? 'メールアドレス (Email) *' : 'Email Address *'}
                      </label>
                      <input
                        type="email"
                        required
                        id="inquiry-email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="client@domain.com"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-[#0E0E0E] border border-stone-800 text-xs text-white placeholder-stone-600 focus:outline-none focus:border-[#C5A059] transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-stone-300 font-montserrat block mb-1.5">
                        {isJa ? 'お電話番号 (Phone)' : 'Phone Number'}
                      </label>
                      <input
                        type="tel"
                        id="inquiry-phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+81 90 1234 5678"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-[#0E0E0E] border border-stone-800 text-xs text-white placeholder-stone-600 focus:outline-none focus:border-[#C5A059] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="text-xs text-stone-300 font-montserrat block mb-1.5">
                        {isJa ? '計画地・地域 (Location)' : 'Project Location'}
                      </label>
                      <select
                        id="inquiry-location"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-[#0E0E0E] border border-stone-800 text-xs text-white focus:outline-none focus:border-[#C5A059] transition-colors"
                      >
                        <option value="tokyo-23">{isJa ? '東京都内（新宿区・港区・渋谷区等）' : 'Tokyo 23 Wards'}</option>
                        <option value="kanagawa">{isJa ? '神奈川県（横浜・鎌倉・箱根）' : 'Kanagawa (Yokohama / Hakone)'}</option>
                        <option value="karuizawa">{isJa ? '軽井沢・高原リゾート' : 'Karuizawa / Alpine Resort'}</option>
                        <option value="other-japan">{isJa ? 'その他日本国内' : 'Other Japan Regions'}</option>
                        <option value="international">{isJa ? '海外・インターナショナル' : 'International / Overseas'}</option>
                      </select>
                    </div>
                  </div>

                  {/* Budget & Timeline */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-stone-300 font-montserrat block mb-1.5">
                        {isJa ? '概算ご予算規模 (Budget)' : 'Anticipated Budget'}
                      </label>
                      <select
                        id="inquiry-budget"
                        value={formData.budgetScale}
                        onChange={(e) => setFormData({ ...formData, budgetScale: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-[#0E0E0E] border border-stone-800 text-xs text-white focus:outline-none focus:border-[#C5A059] transition-colors"
                      >
                        <option value="50m-100m">{isJa ? '5,000万円 〜 1億円' : '¥50M – ¥100M'}</option>
                        <option value="100m-300m">{isJa ? '1億円 〜 3億円' : '¥100M – ¥300M'}</option>
                        <option value="300m-plus">{isJa ? '3億円以上' : '¥300M+'}</option>
                        <option value="undecided">{isJa ? '未定・相談の上決定' : 'To Be Discussed'}</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs text-stone-300 font-montserrat block mb-1.5">
                        {isJa ? '着工希望時期 (Timeline)' : 'Desired Timeline'}
                      </label>
                      <select
                        id="inquiry-timeline"
                        value={formData.timeline}
                        onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-[#0E0E0E] border border-stone-800 text-xs text-white focus:outline-none focus:border-[#C5A059] transition-colors"
                      >
                        <option value="immediate">{isJa ? 'できるだけ早く（即時）' : 'Immediate'}</option>
                        <option value="within-1yr">{isJa ? '1年以内' : 'Within 1 Year'}</option>
                        <option value="1-2yr">{isJa ? '1〜2年後' : '1–2 Years'}</option>
                        <option value="planning">{isJa ? '長期構想・土地探し中' : 'Conceptual / Land Scouting'}</option>
                      </select>
                    </div>
                  </div>

                  {/* Message Details */}
                  <div>
                    <label className="text-xs text-stone-300 font-montserrat block mb-1.5">
                      {isJa ? 'ご計画の概要・ご要望 (Message) *' : 'Project Vision & Notes *'}
                    </label>
                    <textarea
                      required
                      id="inquiry-message"
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder={
                        isJa
                          ? '敷地の広さ、こだわりたい自然素材、理想とする空間イメージなどをご自由にお書き添えください。'
                          : 'Please share your desired aesthetic, site nuances, lifestyle rituals, or specific natural materials.'
                      }
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#0E0E0E] border border-stone-800 text-xs text-white placeholder-stone-600 focus:outline-none focus:border-[#C5A059] transition-colors resize-none leading-relaxed"
                    />
                  </div>

                  {/* Security notice */}
                  <div className="flex items-center gap-2 text-[11px] text-stone-400">
                    <ShieldCheck className="w-4 h-4 text-stone-400 shrink-0" />
                    <span>
                      {isJa
                        ? 'プライバシーポリシーに基づき秘密は厳守されます。外部への情報提供は一切行いません。'
                        : 'Your parameters are strictly protected under international NDA standards.'}
                    </span>
                  </div>

                  {/* Error notice if submission fails */}
                  {errorMessage && (
                    <div className="p-3 rounded-lg bg-red-950/50 border border-red-800/80 text-xs text-red-200 font-montserrat">
                      {errorMessage}
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    id="submit-inquiry-btn"
                    disabled={submitting}
                    className="w-full py-3.5 rounded-xl text-xs font-montserrat uppercase tracking-[0.2em] font-semibold text-white transition-all shadow-xl hover:brightness-110 flex items-center justify-center gap-2.5 border disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{
                      backgroundColor: themeConfig.accentColor,
                      borderColor: `${themeConfig.goldColor}66`
                    }}
                  >
                    {submitting ? (
                      <span>{isJa ? '送信中...' : 'Transmitting Brief...'}</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4 text-[#C5A059]" />
                        <span>{isJa ? '相談内容を送信する' : 'Transmit Architectural Brief'}</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Real-time Instagram Aesthetic Feed Preview */}
        <div className="pt-12 border-t border-stone-800">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 text-[#C5A059]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
              </svg>
              <div>
                <h4 className="text-sm font-semibold font-shippori text-white">
                  @zenith.tokyo.atelier
                </h4>
                <p className="text-xs text-stone-400 font-montserrat">
                  {isJa ? 'インスタグラム公式ポートフォリオ・日常の現場' : 'Official Visual Feed • Daily Architectural Works'}
                </p>
              </div>
            </div>
            <a
              id="instagram-external-link"
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-[#C5A059] hover:text-white flex items-center gap-1 transition-colors font-montserrat"
            >
              <span>{isJa ? 'フォローする' : 'Follow @zenith.tokyo'}</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {instagramPosts.map((post, idx) => (
              <a
                key={idx}
                id={`insta-post-${idx}`}
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative aspect-square rounded-lg overflow-hidden bg-black border border-stone-800/80"
              >
                <img
                  src={post.img}
                  alt={post.caption}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 filter brightness-90 group-hover:brightness-100"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-3 text-center">
                  <span className="text-[10px] text-white font-montserrat">
                    {post.caption}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
