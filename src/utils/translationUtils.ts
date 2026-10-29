/**
 * Architectural Title Translation and Romanization Engine
 * Automatically generates professional English titles and URL slugs
 * when the user enters a project name in Korean, Japanese, or mixed scripts.
 */

// Japanese & Korean architectural & location keywords to English dictionary
const DICTIONARY: Array<{ pattern: RegExp; replacement: string }> = [
  // Locations - Japan
  { pattern: /軽井沢|카루이자와/gi, replacement: 'Karuizawa' },
  { pattern: /六本木|롯폰기/gi, replacement: 'Roppongi' },
  { pattern: /表参道|오모테산도/gi, replacement: 'Omotesando' },
  { pattern: /南青山|青山|아오야마/gi, replacement: 'Aoyama' },
  { pattern: /代官山|다이칸야마/gi, replacement: 'Daikanyama' },
  { pattern: /白金台|시로카네다이/gi, replacement: 'Shirokanedai' },
  { pattern: /銀座|긴자/gi, replacement: 'Ginza' },
  { pattern: /渋谷|시부야/gi, replacement: 'Shibuya' },
  { pattern: /新宿|신주쿠/gi, replacement: 'Shinjuku' },
  { pattern: /世田谷|세타가야/gi, replacement: 'Setagaya' },
  { pattern: /目黒|메구로/gi, replacement: 'Meguro' },
  { pattern: /港区|미나토구/gi, replacement: 'Minato' },
  { pattern: /箱根|하코네/gi, replacement: 'Hakone' },
  { pattern: /鎌倉|카마쿠라/gi, replacement: 'Kamakura' },
  { pattern: /京都|교토/gi, replacement: 'Kyoto' },
  { pattern: /奈良|나라/gi, replacement: 'Nara' },
  { pattern: /大阪|오사카/gi, replacement: 'Osaka' },
  { pattern: /神戸|고베/gi, replacement: 'Kobe' },
  { pattern: /横浜|요코하마/gi, replacement: 'Yokohama' },
  { pattern: /北海道|홋카이도/gi, replacement: 'Hokkaido' },
  { pattern: /ニセコ|니세코/gi, replacement: 'Niseko' },
  { pattern: /沖縄|오키나와/gi, replacement: 'Okinawa' },
  { pattern: /富士|후지/gi, replacement: 'Mt. Fuji' },
  { pattern: /東京|도쿄/gi, replacement: 'Tokyo' },

  // Locations - Korea
  { pattern: /한남동|한남|Hannam/gi, replacement: 'Hannam' },
  { pattern: /청담동|청담|Cheongdam/gi, replacement: 'Cheongdam' },
  { pattern: /성수동|성수|Seongsu/gi, replacement: 'Seongsu' },
  { pattern: /강남구|강남|Gangnam/gi, replacement: 'Gangnam' },
  { pattern: /평창동/gi, replacement: 'Pyeongchang-dong' },
  { pattern: /성북동/gi, replacement: 'Seongbuk-dong' },
  { pattern: /판교/gi, replacement: 'Pangyo' },
  { pattern: /송도/gi, replacement: 'Songdo' },
  { pattern: /해운대|부산/gi, replacement: 'Haeundae' },
  { pattern: /서귀포|제주/gi, replacement: 'Jeju' },

  // Architectural Typologies
  { pattern: /高級邸宅|高級住宅|高級レジデンス|고급 주택|고급 주거/gi, replacement: 'Luxury Private Residence' },
  { pattern: /邸宅|저택|대저택/gi, replacement: 'Estate Residence' },
  { pattern: /別荘|별장|산장/gi, replacement: 'Retreat Villa' },
  { pattern: /住宅|주택|단독주택/gi, replacement: 'House' },
  { pattern: /集合住宅|공동주택|연립주택/gi, replacement: 'Residential Complex' },
  { pattern: /旗艦店|플래그십스토어|플래그십/gi, replacement: 'Flagship Store' },
  { pattern: /商業施設|상업시설|상업공간/gi, replacement: 'Commercial Atelier' },
  { pattern: /ブティック|부티크/gi, replacement: 'Boutique' },
  { pattern: /ショールーム|쇼룸/gi, replacement: 'Showroom' },
  { pattern: /アトリエ|아틀리에|공방/gi, replacement: 'Atelier' },
  { pattern: /ギャラリー|갤러리|화랑/gi, replacement: 'Gallery' },
  { pattern: /美術館|博物館|미술관|박물관/gi, replacement: 'Museum' },
  { pattern: /パビリオン|파빌리온/gi, replacement: 'Pavilion' },
  { pattern: /ホテル|호텔/gi, replacement: 'Boutique Hotel' },
  { pattern: /リゾート|리조트/gi, replacement: 'Resort' },
  { pattern: /スパ|스파/gi, replacement: 'Spa' },
  { pattern: /クラブハウス|클럽하우스/gi, replacement: 'Clubhouse' },
  { pattern: /ペントハウス|펜트하우스/gi, replacement: 'Penthouse' },
  { pattern: /タワー|타워/gi, replacement: 'Tower' },
  { pattern: /ビル|빌딩/gi, replacement: 'Building' },
  { pattern: /マンション|아파트/gi, replacement: 'Residence' },
  { pattern: /オフィス|사옥|오피스/gi, replacement: 'Headquarters' },
  { pattern: /カフェ|카페/gi, replacement: 'Cafe' },
  { pattern: /レストラン|레스토랑/gi, replacement: 'Restaurant' },
  { pattern: /リノベーション|リモデル|리노베이션|리모델링|재생/gi, replacement: 'Regeneration' },

  // Architectural Poetics & Nature Elements
  { pattern: /森の|森|숲속의|숲속|숲/gi, replacement: 'Forest' },
  { pattern: /湖畔の|湖畔|湖|호숫가|호수/gi, replacement: 'Lakeside' },
  { pattern: /海辺の|海の|海|바닷가|바다/gi, replacement: 'Oceanfront' },
  { pattern: /丘の上の|丘の|丘|언덕위|언덕/gi, replacement: 'Hilltop' },
  { pattern: /谷の|谷|계곡/gi, replacement: 'Valley' },
  { pattern: /庭園|庭|정원|중정|中庭/gi, replacement: 'Courtyard Garden' },
  { pattern: /テラス|테라스/gi, replacement: 'Terrace' },
  { pattern: /光と影|빛과 그림자/gi, replacement: 'Light & Shadow' },
  { pattern: /光の|光|빛의|빛/gi, replacement: 'Luminous' },
  { pattern: /影の|影|그림자/gi, replacement: 'Shadow' },
  { pattern: /静寂の|静寂|고요의|고요|침묵/gi, replacement: 'Sanctuary' },
  { pattern: /和モダン|모던한옥|현대 한옥/gi, replacement: 'Modern Zen' },
  { pattern: /木造|목조/gi, replacement: 'Timber' },
  { pattern: /石の|石|석재/gi, replacement: 'Stone' },
  { pattern: /ガラスの|ガラス|유리/gi, replacement: 'Glass' },
  { pattern: /コンクリート|콘크리트|노출콘크리트/gi, replacement: 'Monolithic Concrete' },
  { pattern: /鉄骨|스틸|철골/gi, replacement: 'Steel' },
  { pattern: /再生|재생/gi, replacement: 'Revival' },
  { pattern: /天空の|하늘/gi, replacement: 'Celestial' },
  { pattern: /浮遊する|부유하는/gi, replacement: 'Floating' },
  { pattern: /重層する|중첩된/gi, replacement: 'Layered' },
  { pattern: /隠れ家|은신처/gi, replacement: 'Hideaway' }
];

// Simple Hangul to Romanization table
const HANGUL_CHOSUNG = ['g', 'kk', 'n', 'd', 'tt', 'r', 'm', 'b', 'pp', 's', 'ss', '', 'j', 'jj', 'ch', 'k', 't', 'p', 'h'];
const HANGUL_JUNGSUNG = ['a', 'ae', 'ya', 'yae', 'eo', 'e', 'yeo', 'ye', 'o', 'wa', 'wae', 'oe', 'yo', 'u', 'wo', 'we', 'wi', 'yu', 'eu', 'ui', 'i'];
const HANGUL_JONGSUNG = ['', 'k', 'k', 'ks', 'n', 'nj', 'nh', 'd', 'l', 'lg', 'lm', 'lb', 'ls', 'lt', 'lp', 'lh', 'm', 'p', 'ps', 's', 'ss', 'ng', 'j', 'ch', 'k', 't', 'p', 'h'];

export function romanizeHangul(text: string): string {
  let result = '';
  for (let i = 0; i < text.length; i++) {
    const code = text.charCodeAt(i);
    if (code >= 0xac00 && code <= 0xd7a3) {
      const sylIndex = code - 0xac00;
      const cho = Math.floor(sylIndex / 588);
      const jung = Math.floor((sylIndex % 588) / 28);
      const jong = sylIndex % 28;
      result += HANGUL_CHOSUNG[cho] + HANGUL_JUNGSUNG[jung] + HANGUL_JONGSUNG[jong];
    } else {
      result += text[i];
    }
  }
  return result;
}

// Japanese Katakana to Romaji map
const KATAKANA_MAP: Record<string, string> = {
  ア: 'A', イ: 'I', ウ: 'U', エ: 'E', オ: 'O',
  カ: 'Ka', キ: 'Ki', ク: 'Ku', ケ: 'Ke', コ: 'Ko',
  サ: 'Sa', シ: 'Shi', ス: 'Su', セ: 'Se', ソ: 'So',
  タ: 'Ta', チ: 'Chi', ツ: 'Tsu', テ: 'Te', ト: 'To',
  ナ: 'Na', ニ: 'Ni', ヌ: 'Nu', ネ: 'Ne', ノ: 'No',
  ハ: 'Ha', ヒ: 'Hi', フ: 'Fu', ヘ: 'He', ホ: 'Ho',
  マ: 'Ma', ミ: 'Mi', ム: 'Mu', メ: 'Me', モ: 'Mo',
  ヤ: 'Ya', ユ: 'Yu', ヨ: 'Yo',
  ラ: 'Ra', リ: 'Ri', ル: 'Ru', レ: 'Re', ロ: 'Ro',
  ワ: 'Wa', ヲ: 'Wo', ン: 'n',
  ガ: 'Ga', ギ: 'Gi', グ: 'Gu', ゲ: 'Ge', ゴ: 'Go',
  ザ: 'Za', ジ: 'Ji', ズ: 'Zu', ゼ: 'Ze', ゾ: 'Zo',
  ダ: 'Da', ヂ: 'Ji', ヅ: 'Zu', デ: 'De', ド: 'Do',
  バ: 'Ba', ビ: 'Bi', ブ: 'Bu', ベ: 'Be', ボ: 'Bo',
  パ: 'Pa', ピ: 'Pi', プ: 'Pu', ペ: 'Pe', ポ: 'Po',
  ヴ: 'V', ー: ''
};

export function romanizeKatakana(text: string): string {
  let res = '';
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    res += KATAKANA_MAP[char] || char;
  }
  return res;
}

/**
 * Main translation function for Project Titles
 * Converts Japanese/Korean project names to elegant, architectural English titles.
 */
export function autoTranslateProjectTitle(input: string): { englishTitle: string; slug: string } {
  if (!input || !input.trim()) {
    return { englishTitle: '', slug: '' };
  }

  let text = input.trim();

  // First apply dictionary replacements
  for (const item of DICTIONARY) {
    text = text.replace(item.pattern, ` ${item.replacement} `);
  }

  // Convert Katakana
  text = romanizeKatakana(text);

  // Convert Hangul
  text = romanizeHangul(text);

  // Clean up punctuation and spacing
  text = text
    .replace(/[の・、。/\\()（）[\]「」『』:：-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  // Format into Title Case
  const words = text.split(' ').filter(Boolean);
  const formattedWords = words.map((w, idx) => {
    // If already in ALL CAPS (like "ZENITH"), keep or normalize
    if (/^[A-Z]{2,}$/.test(w)) return w;
    const lower = w.toLowerCase();
    // Minor prepositions remain lowercase unless first word
    if (['and', 'of', 'in', 'on', 'at', 'the', 'for', 'with', '&'].includes(lower) && idx > 0) {
      return lower;
    }
    return w.charAt(0).toUpperCase() + w.slice(1);
  });

  let englishTitle = formattedWords.join(' ');

  // If text is purely punctuation or didn't translate, fallback
  if (!englishTitle || englishTitle.length < 2) {
    englishTitle = 'Architectural Masterwork';
  }

  // Generate URL slug
  const slug = generateSlug(englishTitle);

  return { englishTitle, slug };
}

/**
 * Generates clean kebab-case URL slug
 */
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 60);
}
