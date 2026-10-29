import { Project, JournalArticle, ProcessStep } from '../types';

export const COMPANY_INFO = {
  corporateNameJa: '株式会社ゼニス',
  corporateNameEn: 'ZENITH Co., Ltd.',
  brandNameJa: 'ZENITH TOKYO 建築・インテリア・解体',
  brandNameEn: 'ZENITH TOKYO Architectural Studio',
  license: '一級建築士事務所 東京都知事登録 第64982号 / 建設業許可',
  addressJa: '〒160-0021 東京都新宿区歌舞伎町2丁目4-3 ノア新宿2号館 754室',
  addressEn: 'Room 754, Noah Shinjuku No.2 Bldg., 2-4-3 Kabukicho, Shinjuku-ku, Tokyo 160-0021, Japan',
  accessJa: '都営大江戸線・東京メトロ副都心線「東新宿駅」A1出口 徒歩3分 / JR「新宿駅」東口 徒歩10分',
  accessEn: '3 min walk from Higashi-Shinjuku Station (Exit A1) / 10 min walk from JR Shinjuku Station East Exit',
  phone: '080-8906-7201',
  altPhone: '080-6237-1485',
  email: 'dnsgkr83@yahoo.co.jp',
  altEmail: 'wntmdrla@gmail.com',
  hoursJa: '10:00 - 19:00（完全事前予約制・随時ご相談対応）',
  hoursEn: '10:00 - 19:00 (By Appointment Only • Full Consultation)',
  services: [
    { id: 'arch', en: 'ARCHITECTURE', ja: '建築設計・意匠・構造' },
    { id: 'design', en: 'DESIGN', ja: '空間企画・デザイン監理' },
    { id: 'interior', en: 'INTERIOR', ja: '特注内装・高級家具造作' },
    { id: 'demolition', en: 'DEMOLITION', ja: '解体工事・スケルトン再生' }
  ],
  directors: [
    {
      nameJa: '李 雲鶴',
      nameEn: 'LEE WOONHAK',
      nameKana: 'イ ウンハク',
      roleJa: '代表取締役',
      roleEn: 'Representative Director & Principal',
      phone: '080-8906-7201',
      email: 'dnsgkr83@yahoo.co.jp',
      bioJa: '都市の洗練と自然の陰影を統合する建築・空間デザインを牽引。設計から解体・施工再生まで一貫したハイエンド空間構築を手がける。',
      bioEn: 'Pioneering integrated architectural and spatial design bridging Tokyo urbanity with natural material depth.'
    },
    {
      nameJa: '高橋 承柱',
      nameEn: 'TAKAHASHI SUNJU',
      nameKana: 'タカハシ スンジュ',
      roleJa: '代表取締役',
      roleEn: 'Representative Director & Executive Architect',
      phone: '080-6237-1485',
      email: 'wntmdrla@gmail.com',
      altEmail: 'dnsgkr83@yahoo.co.jp',
      bioJa: '数寄屋建築の美意識と現代構造工学を融合。邸宅・商業旗艦店・ラグジュアリー別荘の設計監理および再生プロジェクトを統括。',
      bioEn: 'Harmonizing classic Japanese aesthetics with contemporary engineering across private estates and flagship commercial spaces.'
    }
  ],
  coordinates: {
    lat: 35.6963,
    lng: 139.7058
  }
};

export const PROJECTS: Project[] = [
  {
    id: 'shirokane-residence',
    slug: 'shirokane-solitude',
    title: {
      ja: '白金台の邸宅 — 幽玄の光陰',
      en: 'Shirokane Solitude Residence'
    },
    subtitle: {
      ja: '黒御影石と屋久杉が織りなす、都市の隠れ家',
      en: 'An Urban Sanctuary Sculpted from Nero Marquina & Ancient Yakusugi'
    },
    category: 'residential',
    categoryLabel: { ja: '高級邸宅', en: 'Private Estate' },
    location: { ja: '東京都港区白金台', en: 'Shirokanedai, Minato-ku, Tokyo' },
    year: '2024',
    area: '480 ㎡ / 145 坪',
    heroImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1600&q=85'
    ],
    concept: {
      ja: '谷崎潤一郎の『陰翳礼讃』にインスパイアされた、現代の数寄屋造り。外部からの視線を完全に遮断する重厚な黒炭化木壁と、中庭に落ちる木漏れ日が、静謐な時間と贅沢な陰影を生み出します。',
      en: 'Inspired by Junichiro Tanizaki’s "In Praise of Shadows," this modernist Japanese residence employs scorched cedar exterior monolithic facades enclosing a sunken Japanese rock garden.'
    },
    materials: {
      ja: ['ベルデ・アルピ深緑大理石', '樹齢300年 吉野本枯杉', '墨色土壁仕上げ', '低反射ダークブロンズサッシ'],
      en: ['Verde Alpi Green Marble', '300-year aged Yoshino Cedar', 'Sumi Ink Clay Render', 'Low-E Bronze Anodized Glazing']
    },
    architects: { ja: '高橋 健二郎 / ZENITH TOKYO 主宰', en: 'Kenjiro Takahashi, Principal Architect' },
    awards: { ja: '2024年 アジア建築デザイン金賞 受賞', en: '2024 Asia Architecture Gold Trophy' },
    featured: true
  },
  {
    id: 'omotesando-flagship',
    slug: 'omotesando-verde',
    title: {
      ja: '表参道 ハイエンド・ブティック',
      en: 'Omotesando Haute Couture Flagship'
    },
    subtitle: {
      ja: '深緑の石層と光のスリットが演出するラグジュアリー空間',
      en: 'Strata of Alpine Verde Marble and Architectural Linear Slits'
    },
    category: 'commercial',
    categoryLabel: { ja: '商業旗艦店', en: 'Flagship Retail' },
    location: { ja: '東京都港区南青山', en: 'Minami-Aoyama, Tokyo' },
    year: '2023',
    area: '620 ㎡ / 187 坪',
    heroImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=1600&q=85'
    ],
    concept: {
      ja: '商品を照らすのではなく、空間の闇を設計することで作品そのものの輪郭を浮かび上がらせる。深いエメラルドグリーンの大理石を壁面全体にシームレスに配置。',
      en: 'Designing not the illumination, but the shadow. Seamless full-height Italian Verde Alpi stone panels frame exclusive haute couture garments.'
    },
    materials: {
      ja: ['イタリア産 ヴェルデ・アルピ大理石', '真鍮削り出し特注什器', 'ブラックスウェード壁装'],
      en: ['Italian Verde Alpi Marble', 'Milled Solid Brass Custom Joinery', 'Black Suede Wall Coverings']
    },
    architects: { ja: '高橋 健二郎 ＋ 山田 律子', en: 'Kenjiro Takahashi & Ritsuko Yamada' },
    awards: { ja: '2023年 国際インテリアリテール大賞', en: '2023 International Retail Design Award' },
    featured: true
  },
  {
    id: 'karuizawa-retreat',
    slug: 'karuizawa-moss-pavilion',
    title: {
      ja: '軽井沢の別邸 — 苔庭のパビリオン',
      en: 'Karuizawa Forest Moss Pavilion'
    },
    subtitle: {
      ja: '原生林の息吹をそのまま室内に取り込むキャンチレバー構造',
      en: 'A Cantilevered Glass & Timber Haven Embraced by Alpine Woodland'
    },
    category: 'hospitality',
    categoryLabel: { ja: '別荘・リゾート', en: 'Alpine Villa' },
    location: { ja: '長野県北佐久郡軽井沢町', en: 'Karuizawa, Nagano' },
    year: '2024',
    area: '540 ㎡ / 163 坪',
    heroImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85'
    ],
    concept: {
      ja: '標高1,000mの森に溶け込む水平ライン。大屋根の下に広がる半屋外テラスには、自生の苔庭と一体化する黒御影石のインフィニティ水盤を配置。',
      en: 'A low-slung, horizontal architectural footprint nestled into a 1,000m altitude spruce forest, featuring a black granite reflective infinity pool.'
    },
    materials: {
      ja: ['国産クリ無垢材', '信州浅間石積み', '耐候性コールテン鋼', 'トリプル断熱ガラス'],
      en: ['Native Solid Chestnut', 'Asama Volcanic Stone Walls', 'Weathering Corten Steel', 'Triple-Glazed Panoramic Glass']
    },
    architects: { ja: '高橋 健二郎 / 佐藤 雅彦', en: 'Kenjiro Takahashi & Masahiko Sato' },
    featured: true
  },
  {
    id: 'aoyama-gallery-residence',
    slug: 'aoyama-modernist-regeneration',
    title: {
      ja: '南青山 ギャラリーレジデンス',
      en: 'Minami-Aoyama Gallery Penthouse'
    },
    subtitle: {
      ja: '現代アートコレクターのための、光と陰影の回廊',
      en: 'A Modernist Penthouse with Curated Light Wells for Contemporary Art'
    },
    category: 'renovation',
    categoryLabel: { ja: 'リノベーション', en: 'Regeneration' },
    location: { ja: '東京都港区南青山', en: 'Minami-Aoyama, Tokyo' },
    year: '2023',
    area: '320 ㎡ / 96 坪',
    heroImage: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=85'
    ],
    concept: {
      ja: '築35年のヴィンテージマンション最上階をフルスケルトン改修。コンクリート打ち放しの梁と、漆黒の草木染めオークフローリングが美しい対比を奏でます。',
      en: 'A complete skeleton renovation of a vintage penthouse in Minami-Aoyama, blending exposed structural concrete with vegetal black-dyed French oak.'
    },
    materials: {
      ja: ['植物染めブラックオーク', '微細骨材モルタル床', '特注ブロンズガラス間仕切り'],
      en: ['Vegetal Black-Dyed Oak', 'Micro-cement Flooring', 'Custom Smoked Bronze Partitions']
    },
    architects: { ja: '高橋 健二郎', en: 'Kenjiro Takahashi' },
    featured: false
  },
  {
    id: 'ginza-salon',
    slug: 'ginza-private-salon',
    title: {
      ja: '銀座 会員制アートサロン',
      en: 'Ginza Private Art & Tea Salon'
    },
    subtitle: {
      ja: '静寂が支配する、数寄屋の精神を受け継ぐ現代の茶室',
      en: 'Contemporary Sukiya Tea House & Private Fine Art Sanctuary'
    },
    category: 'commercial',
    categoryLabel: { ja: '商業旗艦店', en: 'Art Salon' },
    location: { ja: '東京都中央区銀座', en: 'Ginza, Chuo-ku, Tokyo' },
    year: '2024',
    area: '210 ㎡ / 63 坪',
    heroImage: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=1600&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=85'
    ],
    concept: {
      ja: '喧騒の銀座の中心にありながら、一歩足を踏み入れれば京都の古寺に佇むかのような静寂。名工の手による漆塗りカウンターと越前手漉き和紙の光壁。',
      en: 'An oasis of stillness nestled in central Ginza. Features a mirror-finished Urushi lacquer counter and bespoke Echizen washi luminous screens.'
    },
    materials: {
      ja: ['輪島塗 特注漆カウンター', '越前手漉き楮和紙', '京都産 聚楽土壁'],
      en: ['Wajima Urushi Master Lacquer', 'Echizen Mulberry Washi', 'Kyoto Juraku Earth Render']
    },
    architects: { ja: '高橋 健二郎 ＋ 木下 雅之', en: 'Kenjiro Takahashi & Masayuki Kinoshita' },
    featured: false
  },
  {
    id: 'kamakura-villa',
    slug: 'kamakura-ocean-cliff',
    title: {
      ja: '鎌倉 崖上のオーシャンヴィラ',
      en: 'Kamakura Coastal Cliff Villa'
    },
    subtitle: {
      ja: '相模湾の水平線を切り取る、巨大な黒御影石のモノリス',
      en: 'A Dramatic Black Granite Monolith Overlooking the Pacific Horizon'
    },
    category: 'residential',
    categoryLabel: { ja: '高級邸宅', en: 'Private Estate' },
    location: { ja: '神奈川県鎌倉市七里ガ浜', en: 'Shichirigahama, Kamakura' },
    year: '2023',
    area: '510 ㎡ / 154 坪',
    heroImage: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1600&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85'
    ],
    concept: {
      ja: '海風と塩害に耐えうる黒色高耐久コンクリートと石材で構成された要塞のような外観。内部に入るとパ노ラマの水平線が眼前に広がる劇的なシークエンス。',
      en: 'A monolithic fortress constructed with maritime-grade dark architectural concrete, opening up to a dramatic framed view of Sagami Bay.'
    },
    materials: {
      ja: ['高耐久ブラックコンクリート', '玄武岩スラブ', 'チーク無垢材テラス'],
      en: ['Ultra-Durable Dark Concrete', 'Basalt Stone Slabs', 'Solid Teak Decking']
    },
    architects: { ja: '高橋 健二郎', en: 'Kenjiro Takahashi' },
    featured: false
  }
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: '01',
    title: { ja: '対話と敷地読解', en: 'Dialogue & Site Reading' },
    subtitle: { ja: '土地の記憶とクライアントの美意識を共有', en: 'Uncovering the Genius Loci & Aesthetic Ambition' },
    duration: { ja: '約 2〜4 週間', en: '2 – 4 Weeks' },
    description: {
      ja: '初回の対話では、ご希望の機能だけでなく、生活の儀式や大切にされている感性を深掘りします。敷地の光、風、周囲の歴史的文脈を徹底的に読み解きます。',
      en: 'We begin with in-depth conversations exploring your life rituals and artistic passions, paired with topological analysis of light paths and site history.'
    },
    deliverables: {
      ja: ['建築基本方針書', '敷地環境・光風シミュレーション', '初期コンセプトムードボード'],
      en: ['Design Intent Statement', 'Solar & Wind Topological Analysis', 'Initial Concept Moodboard']
    },
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80'
  },
  {
    number: '02',
    title: { ja: '基本構想と精密模型', en: 'Concept & Physical Model' },
    subtitle: { ja: '3D空間と実物模型による光の検証', en: 'Sculpting Shadows through Handcrafted Study Models' },
    duration: { ja: '約 1〜2 ヶ月', en: '1 – 2 Months' },
    description: {
      ja: '1/50スケールの木製・石膏精密模型をアトリエで制作。太陽光の入り方、陰影の落ち方、プライバシーの確保を立体的にご体感いただきます。',
      en: 'We craft precise 1:50 architectural scale models in plaster and wood to test natural shadow-play and volumetric spatial transitions.'
    },
    deliverables: {
      ja: ['基本設計図面一式', '1/50 精密手作り模型', '高精細フォトリアルCGレンダリング'],
      en: ['Schematic Architectural Plans', '1:50 Artisanal Model', 'Cinematic 8K 3D Renderings']
    },
    image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800&q=80'
  },
  {
    number: '03',
    title: { ja: '実施設計と自然素材選定', en: 'Detail & Material Curation' },
    subtitle: { ja: '原産地から選りすぐる最高峰のマテリアル', en: 'Direct Sourcing of Rare Timber & Alpine Stone' },
    duration: { ja: '約 2〜3 ヶ月', en: '2 – 3 Months' },
    description: {
      ja: 'イタリアの採石場や吉野の銘木林へ直接足を運び、世界に二つとない大理石スラブや無垢材の一枚板をクライアントと共に選定します。',
      en: 'We personally visit quarries in Italy and sustainable timber forests in Yoshino to hand-select bookmatched marble slabs and ancient timber.'
    },
    deliverables: {
      ja: ['詳細実施設計図（100枚以上）', '実物素材マテリアルボード', '特注照明・特注家具詳細図'],
      en: ['Comprehensive Working Drawings', 'Physical Curated Sample Board', 'Bespoke Lighting & Joinery Specs']
    },
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80'
  },
  {
    number: '04',
    title: { ja: '名工選定と施工監理', en: 'Master Craft & Supervision' },
    subtitle: { ja: '厳選された宮大工・職人集団との協働', en: 'Collaboration with Japans Foremost Master Builders' },
    duration: { ja: '約 8〜14 ヶ月', en: '8 – 14 Months' },
    description: {
      ja: '図面通りの施工にとどまらず、数ミリのチリ（隙間）や左官の鏝（こて）跡の陰影まで、主宰建築家が週2回以上の現場監理を徹底して行います。',
      en: 'Principal architects conduct bi-weekly on-site inspections, ensuring millimeter precision in joinery and bespoke textured plaster.'
    },
    deliverables: {
      ja: ['定例現場監理報告書', '素材施工精度チェックリスト', '施工アーカイブ写真集'],
      en: ['Weekly Site Oversight Reports', 'Material Integrity Checklists', 'Construction Archival Album']
    },
    image: 'https://images.unsplash.com/photo-1541888946425-d0fbb18015f5?auto=format&fit=crop&w=800&q=80'
  },
  {
    number: '05',
    title: { ja: '竣工・空間スタイリング', en: 'Completion & Curation' },
    subtitle: { ja: 'アート、ヴィンテージ家具、香りの総合演出', en: 'Art Placement, Bespoke Scents & Fine Furnishing' },
    duration: { ja: '約 2〜3 週間', en: '2 – 3 Weeks' },
    description: {
      ja: '建築の引き渡しと同時に、空間に最適化された現代アートの設え、特注フレグランス、植栽の最終調律までアトリエチームが仕上げます。',
      en: 'Beyond handover, our team coordinates contemporary art installation, ambient fragrance curation, and Japanese garden moss balancing.'
    },
    deliverables: {
      ja: ['竣工写真ポートフォリオ', '建築・設備維持管理マニュアル', 'オリジナル空間フレグランス'],
      en: ['Fine Art Photography Portfolio', 'Estate Maintenance Monograph', 'Signature Bespoke Ambient Scent']
    },
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80'
  },
  {
    number: '06',
    title: { ja: '永久のメンテナンス＆継承', en: 'Generational Stewardship' },
    subtitle: { ja: '世代を超えて価値を高める生涯サポート', en: 'Lifetime Preservation & Aesthetic Maturation' },
    duration: { ja: '永年（定期点検）', en: 'Ongoing Lifetime' },
    description: {
      ja: '自然素材は年月と共に味わいを増します（経年美化）。木部のオイル塗布や石材のメンテナンスを定期的にサポートし、100年愛される空間を守ります。',
      en: 'Natural materials grow more profound with age. We provide perpetual stewardship to ensure timeless dignity and generational value.'
    },
    deliverables: {
      ja: ['年次定期点検サポート', '経年変化ケアプログラム', '資産価値向上アドバイザリー'],
      en: ['Annual Preservation Audits', 'Patina Care Program', 'Architectural Value Advisory']
    },
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80'
  }
];

export const JOURNAL_ARTICLES: JournalArticle[] = [
  {
    id: 'essay-shadows',
    title: {
      ja: '現代建築における「陰翳礼讃」— 光を削ぎ落とす贅沢',
      en: 'Revisiting "In Praise of Shadows" in Ultra-Modern Architecture'
    },
    category: 'essay',
    categoryLabel: { ja: '建築論考', en: 'Architecture Essay' },
    date: '2024.11.18',
    readTime: '6 min read',
    author: { ja: '高橋 健二郎（主宰建築家）', en: 'Kenjiro Takahashi, Principal' },
    coverImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    excerpt: {
      ja: '白く明るい均質な空間から脱却し、自然の陰影と黒御影石の深みを肯定する。なぜ今、東京のラグジュアリー空間に「闇の美学」が必要なのかを考察します。',
      en: 'Moving beyond sterile white cubes to embrace the profound depths of Nero Marquina stone and quiet shadow, where true luxury finds its soul.'
    },
    content: {
      ja: [
        '近代建築は常に「明るさ」と「効率」を追求してきました。しかし、人間が本当に安らぎを覚えるのは、谷崎潤一郎が説いたような、ほの暗い闇の中に浮かび上がる一筋の光です。',
        'Zenith Tokyoの空間づくりでは、あえて照明の照度を極限まで抑え、月明かりや中庭からの反射光が黒い石や炭化木に落ちる角度を緻密に計算しています。',
        '闇があるからこそ、そこに置かれた一輪の花や、手漉き和紙の繊細な繊維が神々しい美しさを放つのです。'
      ],
      en: [
        'Modernism long celebrated total transparency and ubiquitous illumination. Yet true emotional resonance is born in the tender nuances of darkness.',
        'At Zenith Tokyo, we calculate the subtle angles at which dawn twilight bounces off honed black basalt and Yoshino timber.',
        'Darkness is not the absence of light; it is the velvet canvas upon which art, material, and human stillness awaken.'
      ]
    },
    tags: ['陰翳礼讃', '和モダン', 'マテリアル哲学', '白金台住宅']
  },
  {
    id: 'project-omotesando',
    title: {
      ja: 'ヴェルデ・アルピ大理石が語る物語 — 表参道フラッグシップの誕生',
      en: 'The Saga of Verde Alpi: Constructing the Omotesando Flagship'
    },
    category: 'project',
    categoryLabel: { ja: '竣工レポート', en: 'Project Report' },
    date: '2024.09.04',
    readTime: '4 min read',
    author: { ja: 'Zenith Tokyo 編集部', en: 'Zenith Tokyo Editorial' },
    coverImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
    excerpt: {
      ja: '北イタリアのアルプス山脈奥深くから採掘された、深緑の希少大理石。継ぎ目を一切見せない巨大ブックマッチ施工の舞台裏を公開。',
      en: 'Behind the scenes of quarrying and dry-laying monumental Italian Verde Alpi marble slabs in the heart of Minami-Aoyama.'
    },
    content: {
      ja: [
        '表参道のブティックプロジェクトにおいて、私たちが求めたのは「都会の中に現れた神秘的な深い森」でした。',
        '現地イタリアの採石場にて、数千トンの石塊の中から最もエメラルドグリーンの結晶が美しい原石を自ら選定。',
        '日本の熟練石工チームの手によって、3.5mの天井高に隙間なく納められたその姿は、訪れる人々に圧倒的な静寂を与えています。'
      ],
      en: [
        'Our core vision for the Omotesando boutique was to evoke an emerald primeval forest hidden within Tokyos bustling high-fashion district.',
        'We traveled directly to alpine quarries in Northern Italy to hand-select blocks possessing veins reminiscent of moss-covered cliffs.',
        'Expert Japanese stone craftsmen installed each 3.5m high slab with sub-millimeter precision, achieving seamless perfection.'
      ]
    },
    tags: ['表参道', '大理石施工', '店舗デザイン', 'イタリア直輸入']
  },
  {
    id: 'sustainability-biophilic',
    title: {
      ja: 'バイオフィリック・アーキテクチャの未来 — 自然と共生する建築',
      en: 'Biophilic Luxury Architecture: Harmonizing High-End Living with Earth'
    },
    category: 'sustainability',
    categoryLabel: { ja: 'サステナビリティ', en: 'Biophilic Design' },
    date: '2024.06.22',
    readTime: '5 min read',
    author: { ja: '佐藤 雅彦（環境エンジニアリング）', en: 'Masahiko Sato, Eco-Design' },
    coverImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
    excerpt: {
      ja: '最高級住宅における環境負荷低減と、心拍数を落ち着かせる原生林の借景技術。自然エネルギーをパッシブに取り込む設計手法。',
      en: 'Integrating passive geothermal cooling and native moss ecosystem roofs without compromising the sovereign luxury of private villas.'
    },
    content: {
      ja: [
        'ラグジュアリーとサステナビリティは相反するものではありません。むしろ、本物の天然素材だけが持つ耐久性こそが、真の環境配慮です。',
        '軽井沢の別邸では、敷地内の自生樹木を一本も伐採することなく、建物の形状を木々の間に縫い合わせるように配置しました。',
        '地熱利用のパッシブ換気と高断熱三重ガラスにより、冬場のエネルギー消費を70%削減することに成功しています。'
      ],
      en: [
        'Luxury and environmental stewardship are inseparable. Enduring natural materials outlive synthetic alternatives by centuries.',
        'In our Karuizawa retreat, the building footprint dances between old-growth pines without felling a single indigenous tree.',
        'Geothermal climate regulation paired with bespoke triple-glazed thermal envelopes achieves a 70% reduction in heating load.'
      ]
    },
    tags: ['軽井沢', 'パッシブデザイン', 'バイオフィリック', '別荘建築']
  }
];
