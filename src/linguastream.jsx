import { useState, useRef, useEffect } from "react";
import MercadoPago from "./MercadoPago";

/* ══════════════════════════════════════════════
   TRADUÇÕES — interface muda com o país
══════════════════════════════════════════════ */
const I18N = {
  PT: {
    nav:      ["🏠 Início","🤖 Descobrir","Planos","Perfil"],
    signin:   "Entrar", signup: "Cadastrar", logout: "Sair",
    startFree:"👤 Criar Conta", recommend:"🤖 Me Recomendar",
    catalog:  "Catálogo", all:"Tudo", anime:"Anime", movies:"Filmes", series:"Séries",
    watchNow: "▶ Assistir Agora", trailer:"🎬 Trailer", details:"📋 Detalhes",
    audio:    "🔊 ÁUDIO", sub1:"📝 LEGENDA 1 (cima)", sub2:"📝 LEGENDA 2 (baixo)",
    watchParty:"👥 Watch Party Multilíngue", exclusive:"exclusivo Agente 🔒",
    quiz:     "⚡ QUIZ RELÂMPAGO", skip:"Pular", correct:"+200 XP",
    plans:    "ESCOLHA SEU PLANO", cancelAny:"Cancele quando quiser",
    free:"Gratuito", basic:"Básico", premium:"Aprendiz", agent:"Fluente", mostPop:"⭐ MAIS POPULAR",
    month:"/mês", activePlan:"✓ Plano Ativo", subscribe:"Assinar",
    profile:  "PERFIL", missions:"🎯 MISSÕES", achievements:"🏆 CONQUISTAS", stats:"📊 STATS",
    discoverTitle:"🤖 RECOMENDAÇÕES COM IA",
    discoverSub:"Me diz o que quer assistir — mostro sinopse, imagem e trailer!",
    discoverPlaceholder:"Ex: anime de ação com menos de 50 episódios...",
    suggestions:["🎌 Anime de ação","😭 Filme emocionante","🌙 Série suspense","📚 Aprender japonês","🏆 Melhor catálogo"],
    thinking:"Buscando a recomendação perfeita...",
    tagline:"Entretenimento + Idiomas",
    heroTitle:"ANIMES, FILMES", heroSpan:"+ 12 IDIOMAS",
    heroDesc:"Legendas duplas, ORION, quiz ao vivo. Aprenda idiomas assistindo o que ama!",
    authWelcome:"Bem-vindo de volta! 👋", authCreate:"Crie sua conta grátis 🎬",
    name:"Seu nome", email:"Email", pass:"Senha", phone:"WhatsApp: 5511999999999",
    wpConsent:"📲 WhatsApp: Autorizo notificações de lançamentos e missões. Cancelo com PARAR.",
    terms:"Li e aceito os Termos de Uso e Política de Privacidade (LGPD) *",
    loginBtn:"Entrar 🚀", registerBtn:"Criar conta grátis 🎬",
    lgpdNote:"🔒 Dados protegidos pela LGPD. WhatsApp é opcional e revogável.",
    available:"ÁUDIOS DISPONÍVEIS", streakLabel:"streak",
    newBadge:"NOVO", planLabel:["🆓","📺","📚","🤖"],
    trailerTitle:"🎬 TRAILER OFICIAL",
    eps:"eps", featureAudio:"exclusivo Agente",
    inc:{
      free: ["Catálogo básico","1 legenda PT","Qualidade 480p","Com anúncios"],
      prem: ["Sem anúncios","ORION — Professor IA","Legenda dupla 12 idiomas","HD 1080p","Watch Party","Missões com desconto","Quiz ao vivo +XP"],
      agent:["Tudo do Aprendiz","ORION ilimitado","Áudio 12 idiomas","4K + Download offline","Watch Party ilimitada","Recomendações IA"],
    },
    no:{
      free: ["Legenda dupla","Sem anúncios","ORION","HD","Watch Party"],
      prem: ["Áudio 12 idiomas","4K","Download offline"],
      agent:[],
    },
    chatPlaceholder:"Pergunte ao ORION sobre o idioma...", chatLocked:"🔒 ORION — Plano Agente",
    chatGreet:"Olá! 👋 Sou o ORION, seu guia de idiomas. Pergunte sobre vocabulário, gramática ou expressões do que está assistindo! 🌟🎌🇧🇷🇺🇸",
    professor:"ORION", online:"● Online", activate:"🔒 Ativar",
    secure:"🔒 Pagamento seguro via Mercado Pago & Stripe",
    dir:"ltr",
  },
  EN: {
    nav:      ["🏠 Home","🤖 Discover","Plans","Profile"],
    signin:   "Sign In", signup: "Sign Up", logout: "Sign Out",
    startFree:"👤 Create Account", recommend:"🤖 Recommend Me",
    catalog:  "Catalog", all:"All", anime:"Anime", movies:"Movies", series:"Series",
    watchNow: "▶ Watch Now", trailer:"🎬 Trailer", details:"📋 Details",
    audio:    "🔊 AUDIO", sub1:"📝 SUBTITLE 1 (top)", sub2:"📝 SUBTITLE 2 (bottom)",
    watchParty:"👥 Multilingual Watch Party", exclusive:"Agent plan only 🔒",
    quiz:     "⚡ LIGHTNING QUIZ", skip:"Skip", correct:"+200 XP",
    plans:    "CHOOSE YOUR PLAN", cancelAny:"Cancel anytime",
    free:"Free", basic:"Basic", premium:"Learner", agent:"Fluent", mostPop:"⭐ MOST POPULAR",
    month:"/mo", activePlan:"✓ Active Plan", subscribe:"Subscribe",
    profile:  "PROFILE", missions:"🎯 MISSIONS", achievements:"🏆 ACHIEVEMENTS", stats:"📊 STATS",
    discoverTitle:"🤖 AI RECOMMENDATIONS",
    discoverSub:"Tell me what you want to watch — I'll show synopsis, image and trailer!",
    discoverPlaceholder:"E.g: action anime under 50 episodes...",
    suggestions:["🎌 Action anime","😭 Emotional movie","🌙 Thriller series","📚 Learn Japanese","🏆 Best catalog"],
    thinking:"Finding the perfect recommendation...",
    tagline:"Entertainment + Languages",
    heroTitle:"ANIME, MOVIES", heroSpan:"+ 12 LANGUAGES",
    heroDesc:"Dual subtitles, AI teacher, live quiz. Learn languages watching what you love!",
    authWelcome:"Welcome back! 👋", authCreate:"Create your free account 🎬",
    name:"Your name", email:"Email", pass:"Password", phone:"WhatsApp: 15551234567",
    wpConsent:"📲 WhatsApp: I authorize launch and mission notifications. Cancel with STOP.",
    terms:"I read and accept the Terms of Use and Privacy Policy *",
    loginBtn:"Sign In 🚀", registerBtn:"Create free account 🎬",
    lgpdNote:"🔒 Data protected. WhatsApp is optional and revocable.",
    available:"AVAILABLE AUDIO", streakLabel:"streak",
    newBadge:"NEW", planLabel:["🆓","📺","📚","🤖"],
    trailerTitle:"🎬 OFFICIAL TRAILER",
    eps:"eps", featureAudio:"Agent plan only",
    inc:{
      free:["Basic catalog","1 subtitle","480p quality","With ads"],
      prem:["Everything free","Dual subs 12 languages","No ads","HD 1080p","Integrated trailer","Watch Party 2 people","Missions with discount"],
      agent:["Everything Premium","Audio 12 languages","ORION — Language Guide","Live quiz +XP","Unlimited Watch Party","AI Recommendations","Shareable clips","4K + Offline download"],
    },
    no:{
      free:["Dual subtitles","Multi-language audio","No ads","ORION","Quiz","AI Recommendations"],
      prem:["Multi-language audio","ORION","Live quiz","Offline download"],
      agent:[],
    },
    chatPlaceholder:"Ask ORION about the language...", chatLocked:"🔒 ORION — Agent Plan",
    chatGreet:"Hi! 👋 I'm ORION, your language guide. Ask about vocabulary, grammar or expressions from what you're watching! 🌟🎌🇧🇷🇺🇸",
    professor:"ORION", online:"● Online", activate:"🔒 Activate",
    secure:"🔒 Secure payment via Stripe & PayPal",
    dir:"ltr",
  },
  JP: {
    nav:      ["🏠 ホーム","🤖 おすすめ","プラン","プロフィール"],
    signin:   "ログイン", signup: "登録", logout: "ログアウト",
    startFree:"👤 アカウント作成", recommend:"🤖 おすすめを見る",
    catalog:  "カタログ", all:"すべて", anime:"アニメ", movies:"映画", series:"シリーズ",
    watchNow: "▶ 今すぐ見る", trailer:"🎬 予告編", details:"📋 詳細",
    audio:    "🔊 音声", sub1:"📝 字幕1（上）", sub2:"📝 字幕2（下）",
    watchParty:"👥 多言語ウォッチパーティー", exclusive:"エージェントプラン限定 🔒",
    quiz:     "⚡ クイズ", skip:"スキップ", correct:"+200 XP",
    plans:    "プランを選ぶ", cancelAny:"いつでもキャンセル可能",
    free:"無料", basic:"ベーシック", premium:"学習者", agent:"流暢", mostPop:"⭐ 人気No.1",
    month:"/月", activePlan:"✓ 現在のプラン", subscribe:"登録する",
    profile:  "プロフィール", missions:"🎯 ミッション", achievements:"🏆 実績", stats:"📊 統計",
    discoverTitle:"🤖 AIおすすめ",
    discoverSub:"見たいものを教えて — あらすじ・画像・予告編を紹介します！",
    discoverPlaceholder:"例：50話以内のアクションアニメ...",
    suggestions:["🎌 アクションアニメ","😭 感動映画","🌙 サスペンスドラマ","📚 日本語学習","🏆 ベスト作品"],
    thinking:"最高のおすすめを探しています...",
    tagline:"エンターテイメント ＋ 語学",
    heroTitle:"アニメ・映画", heroSpan:"＋ 12言語",
    heroDesc:"二重字幕、ORION、ライブクイズ。好きな作品で語学を学ぼう！",
    authWelcome:"おかえりなさい！👋", authCreate:"無料アカウント作成 🎬",
    name:"お名前", email:"メールアドレス", pass:"パスワード", phone:"WhatsApp番号",
    wpConsent:"📲 WhatsApp：新着・ミッション通知を受け取ることに同意します。STOPで停止。",
    terms:"利用規約とプライバシーポリシーに同意します *",
    loginBtn:"ログイン 🚀", registerBtn:"無料で登録 🎬",
    lgpdNote:"🔒 データは安全に管理されます。WhatsAppは任意・停止可能。",
    available:"利用可能な音声", streakLabel:"連続",
    newBadge:"NEW", planLabel:["🆓","📺","📚","🤖"],
    trailerTitle:"🎬 公式予告編",
    eps:"話", featureAudio:"エージェント限定",
    inc:{
      free:["基本カタログ","字幕1つ","画質480p","広告あり"],
      prem:["無料プランすべて","12言語二重字幕","広告なし","HD 1080p","予告編統合","ウォッチパーティー2人","ミッション割引"],
      agent:["プレミアムすべて","12言語音声","ORION","ライブクイズ+XP","無制限ウォッチパーティー","AIおすすめ","クリップ共有","4K+オフライン"],
    },
    no:{
      free:["二重字幕","多言語音声","広告なし","ORION","クイズ","AIおすすめ"],
      prem:["多言語音声","ORION","ライブクイズ","オフライン"],
      agent:[],
    },
    chatPlaceholder:"ORIONに質問する...", chatLocked:"🔒 ORION — エージェントプラン",
    chatGreet:"こんにちは！👋 ORIONです、あなたの語学ガイド。見ている作品の語彙・文法・表現について質問してください！🌟🎌🇧🇷🇺🇸",
    professor:"ORION", online:"● オンライン", activate:"🔒 アクティブ",
    secure:"🔒 Stripe・PayPal対応 安全なお支払い",
    dir:"ltr",
  },
  KR: {
    nav:      ["🏠 홈","🤖 추천","플랜","프로필"],
    signin:   "로그인", signup: "회원가입", logout: "로그아웃",
    startFree:"👤 계정 만들기", recommend:"🤖 추천 받기",
    catalog:  "카탈로그", all:"전체", anime:"애니메이션", movies:"영화", series:"시리즈",
    watchNow: "▶ 지금 보기", trailer:"🎬 예고편", details:"📋 상세보기",
    audio:    "🔊 오디오", sub1:"📝 자막 1 (위)", sub2:"📝 자막 2 (아래)",
    watchParty:"👥 다국어 워치파티", exclusive:"에이전트 플랜 전용 🔒",
    quiz:     "⚡ 번개 퀴즈", skip:"건너뛰기", correct:"+200 XP",
    plans:    "플랜 선택", cancelAny:"언제든지 취소 가능",
    free:"무료", basic:"기본", premium:"학습자", agent:"유창", mostPop:"⭐ 가장 인기",
    month:"/월", activePlan:"✓ 현재 플랜", subscribe:"구독하기",
    profile:  "프로필", missions:"🎯 미션", achievements:"🏆 업적", stats:"📊 통계",
    discoverTitle:"🤖 AI 추천",
    discoverSub:"보고 싶은 것을 말해줘 — 줄거리, 이미지, 예고편을 보여드릴게요!",
    discoverPlaceholder:"예: 50화 이하의 액션 애니메이션...",
    suggestions:["🎌 액션 애니","😭 감동 영화","🌙 스릴러 시리즈","📚 일본어 학습","🏆 베스트"],
    thinking:"완벽한 추천을 찾고 있어요...",
    tagline:"엔터테인먼트 + 언어",
    heroTitle:"애니메이션, 영화", heroSpan:"+ 12개 언어",
    heroDesc:"이중 자막, ORION, 라이브 퀴즈. 좋아하는 콘텐츠로 언어를 배워요!",
    authWelcome:"다시 오셨군요! 👋", authCreate:"무료 계정 만들기 🎬",
    name:"이름", email:"이메일", pass:"비밀번호", phone:"WhatsApp 번호",
    wpConsent:"📲 WhatsApp: 출시 및 미션 알림 수신에 동의합니다. STOP으로 취소.",
    terms:"이용약관 및 개인정보 처리방침에 동의합니다 *",
    loginBtn:"로그인 🚀", registerBtn:"무료 가입 🎬",
    lgpdNote:"🔒 데이터가 안전하게 보호됩니다. WhatsApp은 선택 사항입니다.",
    available:"사용 가능한 오디오", streakLabel:"연속",
    newBadge:"신규", planLabel:["🆓","📺","📚","🤖"],
    trailerTitle:"🎬 공식 예고편",
    eps:"화", featureAudio:"에이전트 전용",
    inc:{
      free:["기본 카탈로그","자막 1개","화질 480p","광고 있음"],
      prem:["무료 플랜 모두","12개 언어 이중 자막","광고 없음","HD 1080p","예고편 통합","워치파티 2명","미션 할인"],
      agent:["프리미엄 모두","12개 언어 오디오","ORION","라이브 퀴즈+XP","무제한 워치파티","AI 추천","클립 공유","4K+오프라인"],
    },
    no:{
      free:["이중 자막","다국어 오디오","광고 없음","ORION","퀴즈","AI 추천"],
      prem:["다국어 오디오","ORION","라이브 퀴즈","오프라인"],
      agent:[],
    },
    chatPlaceholder:"ORION에게 질문하세요...", chatLocked:"🔒 ORION — 에이전트 플랜",
    chatGreet:"안녕하세요! 👋 저는 ORION, 당신의 언어 가이드입니다. 어휘, 문법, 표현에 대해 질문해 주세요! 🌟🎌🇧🇷🇺🇸",
    professor:"ORION", online:"● 온라인", activate:"🔒 활성화",
    secure:"🔒 Stripe 안전결제",
    dir:"ltr",
  },
  ES: {
    nav:      ["🏠 Inicio","🤖 Descubrir","Planes","Perfil"],
    signin:   "Entrar", signup: "Registrarse", logout: "Salir",
    startFree:"👤 Crear Cuenta", recommend:"🤖 Recomiéndame",
    catalog:  "Catálogo", all:"Todo", anime:"Anime", movies:"Películas", series:"Series",
    watchNow: "▶ Ver Ahora", trailer:"🎬 Tráiler", details:"📋 Detalles",
    audio:    "🔊 AUDIO", sub1:"📝 SUBTÍTULO 1 (arriba)", sub2:"📝 SUBTÍTULO 2 (abajo)",
    watchParty:"👥 Watch Party Multilingüe", exclusive:"exclusivo Plan Agente 🔒",
    quiz:     "⚡ QUIZ RELÁMPAGO", skip:"Saltar", correct:"+200 XP",
    plans:    "ELIGE TU PLAN", cancelAny:"Cancela cuando quieras",
    free:"Gratis", basic:"Básico", premium:"Aprendiz", agent:"Fluido", mostPop:"⭐ MÁS POPULAR",
    month:"/mes", activePlan:"✓ Plan Activo", subscribe:"Suscribirse",
    profile:  "PERFIL", missions:"🎯 MISIONES", achievements:"🏆 LOGROS", stats:"📊 STATS",
    discoverTitle:"🤖 RECOMENDACIONES CON IA",
    discoverSub:"Dime qué quieres ver — muestro sinopsis, imagen y tráiler!",
    discoverPlaceholder:"Ej: anime de acción con menos de 50 episodios...",
    suggestions:["🎌 Anime de acción","😭 Película emotiva","🌙 Serie thriller","📚 Aprender japonés","🏆 Lo mejor"],
    thinking:"Buscando la recomendación perfecta...",
    tagline:"Entretenimiento + Idiomas",
    heroTitle:"ANIME, PELÍCULAS", heroSpan:"+ 12 IDIOMAS",
    heroDesc:"Subtítulos dobles, profesor IA, quiz en vivo. ¡Aprende idiomas viendo lo que amas!",
    authWelcome:"¡Bienvenido de nuevo! 👋", authCreate:"Crea tu cuenta gratis 🎬",
    name:"Tu nombre", email:"Correo electrónico", pass:"Contraseña", phone:"WhatsApp: 521234567890",
    wpConsent:"📲 WhatsApp: Autorizo notificaciones de estrenos y misiones. Cancelo con PARAR.",
    terms:"He leído y acepto los Términos de Uso y Política de Privacidad *",
    loginBtn:"Entrar 🚀", registerBtn:"Crear cuenta gratis 🎬",
    lgpdNote:"🔒 Datos protegidos. WhatsApp es opcional y revocable.",
    available:"AUDIO DISPONIBLE", streakLabel:"racha",
    newBadge:"NUEVO", planLabel:["🆓","📺","📚","🤖"],
    trailerTitle:"🎬 TRÁILER OFICIAL",
    eps:"eps", featureAudio:"solo Agente",
    inc:{
      free:["Catálogo básico","1 subtítulo","Calidad 480p","Con anuncios"],
      prem:["Todo gratis","Subtítulos dobles 12 idiomas","Sin anuncios","HD 1080p","Tráiler integrado","Watch Party 2 personas","Misiones con descuento"],
      agent:["Todo Premium","Audio 12 idiomas","ORION — Guía de Idiomas","Quiz en vivo +XP","Watch Party ilimitado","Recomendaciones IA","Clips compartibles","4K + Descarga offline"],
    },
    no:{
      free:["Subtítulos dobles","Audio multilingüe","Sin anuncios","Profesor IA","Quiz","Recomendaciones IA"],
      prem:["Audio multilingüe","Profesor IA","Quiz en vivo","Descarga offline"],
      agent:[],
    },
    chatPlaceholder:"Pregúntale a ORION...", chatLocked:"🔒 ORION — Plan Agente",
    chatGreet:"¡Hola! 👋 Soy ORION, tu guía de idiomas. ¡Pregunta sobre vocabulario, gramática o expresiones de lo que estás viendo! 🌟🎌🇧🇷🇺🇸",
    professor:"ORION", online:"● En línea", activate:"🔒 Activar",
    secure:"🔒 Pago seguro vía Stripe & Mercado Pago",
    dir:"ltr",
  },
  FR: {
    nav:      ["🏠 Accueil","🤖 Découvrir","Abonnements","Profil"],
    signin:   "Connexion", signup: "S'inscrire", logout: "Déconnexion",
    startFree:"👤 Créer un compte", recommend:"🤖 Me Recommander",
    catalog:  "Catalogue", all:"Tout", anime:"Anime", movies:"Films", series:"Séries",
    watchNow: "▶ Regarder", trailer:"🎬 Bande-annonce", details:"📋 Détails",
    audio:    "🔊 AUDIO", sub1:"📝 SOUS-TITRE 1 (haut)", sub2:"📝 SOUS-TITRE 2 (bas)",
    watchParty:"👥 Soirée Streaming Multilingue", exclusive:"Plan Agent exclusif 🔒",
    quiz:     "⚡ QUIZ EXPRESS", skip:"Passer", correct:"+200 XP",
    plans:    "CHOISISSEZ VOTRE ABONNEMENT", cancelAny:"Résiliez quand vous voulez",
    free:"Gratuit", basic:"De base", premium:"Apprenant", agent:"Courant", mostPop:"⭐ LE PLUS POPULAIRE",
    month:"/mois", activePlan:"✓ Abonnement Actif", subscribe:"S'abonner",
    profile:  "PROFIL", missions:"🎯 MISSIONS", achievements:"🏆 SUCCÈS", stats:"📊 STATISTIQUES",
    discoverTitle:"🤖 RECOMMANDATIONS IA",
    discoverSub:"Dites ce que vous voulez voir — synopsis, image et bande-annonce!",
    discoverPlaceholder:"Ex: anime d'action en moins de 50 épisodes...",
    suggestions:["🎌 Anime d'action","😭 Film émouvant","🌙 Série thriller","📚 Apprendre japonais","🏆 Le meilleur"],
    thinking:"Recherche de la recommandation parfaite...",
    tagline:"Divertissement + Langues",
    heroTitle:"ANIME, FILMS", heroSpan:"+ 12 LANGUES",
    heroDesc:"Sous-titres doubles, prof IA, quiz en direct. Apprenez des langues en regardant ce que vous aimez!",
    authWelcome:"Bon retour ! 👋", authCreate:"Créez votre compte gratuit 🎬",
    name:"Votre nom", email:"Adresse e-mail", pass:"Mot de passe", phone:"WhatsApp",
    wpConsent:"📲 WhatsApp: J'autorise les notifications de sorties et missions. Arrêtez avec STOP.",
    terms:"J'ai lu et j'accepte les CGU et la Politique de Confidentialité *",
    loginBtn:"Se connecter 🚀", registerBtn:"Créer un compte gratuit 🎬",
    lgpdNote:"🔒 Données protégées. WhatsApp est optionnel et révocable.",
    available:"AUDIO DISPONIBLE", streakLabel:"série",
    newBadge:"NOUVEAU", planLabel:["🆓","📺","📚","🤖"],
    trailerTitle:"🎬 BANDE-ANNONCE OFFICIELLE",
    eps:"éps", featureAudio:"Agent uniquement",
    inc:{
      free:["Catalogue de base","1 sous-titre","Qualité 480p","Avec publicités"],
      prem:["Tout le gratuit","Sous-titres doubles 12 langues","Sans pub","HD 1080p","Bande-annonce intégrée","Soirée 2 personnes","Missions avec réduction"],
      agent:["Tout Premium","Audio 12 langues","ORION — Guide Linguistique","Quiz +XP","Soirée illimitée","Reco IA","Clips partageables","4K + Téléchargement"],
    },
    no:{
      free:["Sous-titres doubles","Audio multilingue","Sans pub","ORION","Quiz","Reco IA"],
      prem:["Audio multilingue","ORION","Quiz en direct","Téléchargement"],
      agent:[],
    },
    chatPlaceholder:"Posez une question à ORION...", chatLocked:"🔒 ORION — Plan Agent",
    chatGreet:"Bonjour ! 👋 Je suis ORION, votre guide linguistique. Posez des questions sur le vocabulaire, la grammaire ou les expressions ! 🌟🎌🇧🇷🇺🇸",
    professor:"ORION", online:"● En ligne", activate:"🔒 Activer",
    secure:"🔒 Paiement sécurisé via Stripe",
    dir:"ltr",
  },
  DE: {
    nav:      ["🏠 Startseite","🤖 Entdecken","Pläne","Profil"],
    signin:   "Anmelden", signup: "Registrieren", logout: "Abmelden",
    startFree:"👤 Konto erstellen", recommend:"🤖 Empfehlung",
    catalog:  "Katalog", all:"Alle", anime:"Anime", movies:"Filme", series:"Serien",
    watchNow: "▶ Jetzt Ansehen", trailer:"🎬 Trailer", details:"📋 Details",
    audio:    "🔊 AUDIO", sub1:"📝 UNTERTITEL 1 (oben)", sub2:"📝 UNTERTITEL 2 (unten)",
    watchParty:"👥 Mehrsprachige Watch-Party", exclusive:"Nur Agent-Plan 🔒",
    quiz:     "⚡ BLITZ-QUIZ", skip:"Überspringen", correct:"+200 XP",
    plans:    "WÄHLE DEINEN PLAN", cancelAny:"Jederzeit kündbar",
    free:"Kostenlos", basic:"Basis", premium:"Lernender", agent:"Fließend", mostPop:"⭐ BELIEBTESTE",
    month:"/Monat", activePlan:"✓ Aktiver Plan", subscribe:"Abonnieren",
    profile:  "PROFIL", missions:"🎯 MISSIONEN", achievements:"🏆 ERFOLGE", stats:"📊 STATISTIKEN",
    discoverTitle:"🤖 KI-EMPFEHLUNGEN",
    discoverSub:"Sag mir was du sehen willst — Zusammenfassung, Bild und Trailer!",
    discoverPlaceholder:"Z.B: Action-Anime mit weniger als 50 Folgen...",
    suggestions:["🎌 Action-Anime","😭 Emotionaler Film","🌙 Thriller-Serie","📚 Japanisch lernen","🏆 Das Beste"],
    thinking:"Suche die perfekte Empfehlung...",
    tagline:"Unterhaltung + Sprachen",
    heroTitle:"ANIME, FILME", heroSpan:"+ 12 SPRACHEN",
    heroDesc:"Doppeluntertitel, ORION, Live-Quiz. Lerne Sprachen mit dem was du liebst!",
    authWelcome:"Willkommen zurück! 👋", authCreate:"Kostenloses Konto erstellen 🎬",
    name:"Dein Name", email:"E-Mail", pass:"Passwort", phone:"WhatsApp-Nummer",
    wpConsent:"📲 WhatsApp: Ich stimme Benachrichtigungen zu. Abmelden mit STOP.",
    terms:"Ich akzeptiere die Nutzungsbedingungen und Datenschutzrichtlinie *",
    loginBtn:"Anmelden 🚀", registerBtn:"Kostenlos registrieren 🎬",
    lgpdNote:"🔒 Daten geschützt. WhatsApp optional und widerrufbar.",
    available:"VERFÜGBARES AUDIO", streakLabel:"Serie",
    newBadge:"NEU", planLabel:["🆓","📺","📚","🤖"],
    trailerTitle:"🎬 OFFIZIELLER TRAILER",
    eps:"Folgen", featureAudio:"Nur Agent",
    inc:{
      free:["Basiskatalog","1 Untertitel","480p Qualität","Mit Werbung"],
      prem:["Alles kostenlos","Doppel-Untertitel 12 Sprachen","Ohne Werbung","HD 1080p","Trailer integriert","Watch-Party 2 Personen","Missions-Rabatte"],
      agent:["Alles Premium","Audio 12 Sprachen","ORION — Sprachführer","Live-Quiz +XP","Unbegrenzte Watch-Party","KI-Empfehlungen","Teilbare Clips","4K + Offline"],
    },
    no:{
      free:["Doppeluntertitel","Mehrsprachiges Audio","Ohne Werbung","ORION","Quiz","KI-Empfehlungen"],
      prem:["Mehrsprachiges Audio","ORION","Live-Quiz","Offline-Download"],
      agent:[],
    },
    chatPlaceholder:"Frage ORION über die Sprache...", chatLocked:"🔒 ORION — Agent-Plan",
    chatGreet:"Hallo! 👋 Ich bin ORION, dein Sprachführer. Frage über Vokabular, Grammatik oder Ausdrücke aus dem was du schaust! 🌟🎌🇧🇷🇺🇸",
    professor:"ORION", online:"● Online", activate:"🔒 Aktivieren",
    secure:"🔒 Sichere Zahlung via Stripe",
    dir:"ltr",
  },
  HI: {
    nav:      ["🏠 होम","🤖 खोजें","प्लान","प्रोफ़ाइल"],
    signin:   "लॉग इन", signup: "साइन अप", logout: "लॉग आउट",
    startFree:"👤 खाता बनाएं", recommend:"🤖 सुझाव दें",
    catalog:  "कैटलॉग", all:"सभी", anime:"एनिमे", movies:"फ़िल्में", series:"सीरीज़",
    watchNow: "▶ अभी देखें", trailer:"🎬 ट्रेलर", details:"📋 विवरण",
    audio:    "🔊 ऑडियो", sub1:"📝 सबटाइटल 1 (ऊपर)", sub2:"📝 सबटाइटल 2 (नीचे)",
    watchParty:"👥 बहुभाषी वॉच पार्टी", exclusive:"केवल एजेंट प्लान 🔒",
    quiz:     "⚡ त्वरित प्रश्नोत्तरी", skip:"छोड़ें", correct:"+200 XP",
    plans:    "अपना प्लान चुनें", cancelAny:"कभी भी रद्द करें",
    free:"मुफ़्त", basic:"बेसिक", premium:"शिक्षार्थी", agent:"प्रवाही", mostPop:"⭐ सबसे लोकप्रिय",
    month:"/माह", activePlan:"✓ सक्रिय प्लान", subscribe:"सदस्यता लें",
    profile:  "प्रोफ़ाइल", missions:"🎯 मिशन", achievements:"🏆 उपलब्धियाँ", stats:"📊 आँकड़े",
    discoverTitle:"🤖 AI सुझाव",
    discoverSub:"बताएं क्या देखना है — सारांश, छवि और ट्रेलर दिखाएंगे!",
    discoverPlaceholder:"उदा: 50 से कम एपिसोड का एक्शन एनिमे...",
    suggestions:["🎌 एक्शन एनिमे","😭 भावुक फ़िल्म","🌙 थ्रिलर सीरीज़","📚 जापानी सीखें","🏆 सर्वश्रेष्ठ"],
    thinking:"सबसे अच्छा सुझाव खोज रहे हैं...",
    tagline:"मनोरंजन + भाषाएँ",
    heroTitle:"एनिमे, फ़िल्में", heroSpan:"+ 12 भाषाएँ",
    heroDesc:"दोहरे सबटाइटल, ORION, लाइव क्विज़। जो पसंद है उसे देखकर भाषा सीखें!",
    authWelcome:"वापस आपका स्वागत है! 👋", authCreate:"मुफ़्त खाता बनाएं 🎬",
    name:"आपका नाम", email:"ईमेल", pass:"पासवर्ड", phone:"WhatsApp नंबर",
    wpConsent:"📲 WhatsApp: लॉन्च और मिशन सूचनाएं प्राप्त करने की अनुमति देता हूं। STOP से रोकें।",
    terms:"मैंने उपयोग की शर्तें और गोपनीयता नीति पढ़ी और स्वीकार की *",
    loginBtn:"लॉग इन करें 🚀", registerBtn:"मुफ़्त खाता बनाएं 🎬",
    lgpdNote:"🔒 डेटा सुरक्षित है। WhatsApp वैकल्पिक है।",
    available:"उपलब्ध ऑडियो", streakLabel:"स्ट्रीक",
    newBadge:"नया", planLabel:["🆓","📺","📚","🤖"],
    trailerTitle:"🎬 आधिकारिक ट्रेलर",
    eps:"एपिसोड", featureAudio:"केवल एजेंट",
    inc:{
      free:["बेसिक कैटलॉग","1 सबटाइटल","480p गुणवत्ता","विज्ञापन के साथ"],
      prem:["सभी मुफ़्त","12 भाषाओं में दोहरे सबटाइटल","विज्ञापन रहित","HD 1080p","ट्रेलर एकीकृत","2 लोगों की वॉच पार्टी","मिशन छूट"],
      agent:["सभी प्रीमियम","12 भाषाओं का ऑडियो","ORION — भाषा मार्गदर्शक","लाइव क्विज़ +XP","असीमित वॉच पार्टी","AI सुझाव","क्लिप साझाकरण","4K + ऑफलाइन"],
    },
    no:{
      free:["दोहरे सबटाइटल","बहुभाषी ऑडियो","विज्ञापन रहित","ORION","क्विज़","AI सुझाव"],
      prem:["बहुभाषी ऑडियो","ORION","लाइव क्विज़","ऑफलाइन"],
      agent:[],
    },
    chatPlaceholder:"ORION से पूछें...", chatLocked:"🔒 ORION — एजेंट प्लान",
    chatGreet:"नमस्ते! 👋 मैं ORION हूं, आपका भाषा मार्गदर्शक। शब्दावली, व्याकरण या अभिव्यक्तियों के बारे में पूछें! 🌟🎌🇧🇷🇺🇸",
    professor:"ORION", online:"● ऑनलाइन", activate:"🔒 सक्रिय करें",
    secure:"🔒 Stripe द्वारा सुरक्षित भुगतान",
    dir:"ltr",
  },
};

/* maps currency → lang */
const CURR_LANG = {BRL:"PT",USD:"EN",EUR:"FR",JPY:"JP",KRW:"KR",MXN:"ES",INR:"HI",GBP:"EN"};

const CURRENCIES = [
  {code:"BRL",sym:"R$",p1:"1,99", p2:"9,99", country:"🇧🇷 Brasil"},
  {code:"USD",sym:"$", p1:"0.49", p2:"2.49", country:"🇺🇸 USA"},
  {code:"EUR",sym:"€", p1:"0.45", p2:"1.99", country:"🇪🇺 Europe"},
  {code:"JPY",sym:"¥", p1:"75",   p2:"380",  country:"🇯🇵 日本"},
  {code:"KRW",sym:"₩", p1:"690",  p2:"3.490",country:"🇰🇷 한국"},
  {code:"MXN",sym:"$", p1:"10",   p2:"42",   country:"🇲🇽 México"},
  {code:"INR",sym:"₹", p1:"19",   p2:"79",   country:"🇮🇳 भारत"},
];

/* ══════════════════════════════════════════════
   SISTEMA DE DESCONTO PROGRESSIVO + MISSÕES
══════════════════════════════════════════════ */

// Regra exata:
// Mês 1:    0%
// Mês 2-3:  5%
// Mês 4-7: 10%
// A partir do mês 8: +5% a cada 3 meses
// Teto: 40% pelo tempo + 15% missões = 55% max

function calcDescontoPorTempo(meses){
  if(meses < 2)  return {perc:0,  label:"Preço cheio", cor:"#64748b"};
  if(meses < 4)  return {perc:5,  label:"5% OFF",  cor:"#22c55e"};
  if(meses < 8)  return {perc:10, label:"10% OFF", cor:"#22c55e"};
  // A partir do mês 8: começa em 15% e +5% a cada 3 meses
  const extra = Math.floor((meses - 8) / 3);
  const perc  = Math.min(15 + (extra * 5), 40); // teto 40%
  return {perc, label:`${perc}% OFF`, cor: perc>=30?"#f97316":"#22c55e"};
}

// Desconto por missões — 10% fixo ao completar o pacote de missões
// (não importa quantas, é tudo ou nada — incentiva completar todas)
function calcDescontoPorMissoes(missoesCompletas, totalMissoes){
  const todasCompletas = missoesCompletas >= totalMissoes;
  const perc = todasCompletas ? 10 : 0;
  return {
    perc,
    label:  todasCompletas ? "+10% missões 🎯" : `${missoesCompletas}/${totalMissoes} missões`,
    status: todasCompletas ? "completo" : "pendente"
  };
}

// Desconto TOTAL combinado — teto 50%
function calcDescontoTotal(meses, missoesCompletas, totalMissoes=4){
  const tempo  = calcDescontoPorTempo(meses);
  const miss   = calcDescontoPorMissoes(missoesCompletas, totalMissoes);
  const total  = Math.min(tempo.perc + miss.perc, 50); // TETO 50%
  return {tempo, miss, total};
}

// Tabela visual do desconto progressivo (para mostrar na tela)
const TABELA_DESCONTOS = [
  {range:"Mês 1",      desc:0,  destaque:false},
  {range:"Mês 2-3",   desc:5,  destaque:false},
  {range:"Mês 4-7",   desc:10, destaque:false},
  {range:"Mês 8-10",  desc:15, destaque:false},
  {range:"Mês 11-13", desc:20, destaque:false},
  {range:"Mês 14-16", desc:25, destaque:false},
  {range:"Mês 17-19", desc:30, destaque:true},
  {range:"Mês 20-22", desc:35, destaque:true},
  {range:"Mês 23+",   desc:40, destaque:true},
];

const LANGS = [
  {code:"PT",flag:"🇧🇷",name:"Português"},{code:"EN",flag:"🇺🇸",name:"English"},
  {code:"JP",flag:"🇯🇵",name:"日本語"},{code:"KR",flag:"🇰🇷",name:"한국어"},
  {code:"ES",flag:"🇪🇸",name:"Español"},{code:"FR",flag:"🇫🇷",name:"Français"},
  {code:"DE",flag:"🇩🇪",name:"Deutsch"},{code:"IT",flag:"🇮🇹",name:"Italiano"},
  {code:"CN",flag:"🇨🇳",name:"中文"},{code:"RU",flag:"🇷🇺",name:"Русский"},
  {code:"AR",flag:"🇸🇦",name:"العربية"},{code:"HI",flag:"🇮🇳",name:"हिन्दी"},
];

const CATALOG = [
  {id:1,title:"One Piece",type:"anime",g:["#f97316","#b91c1c"],emoji:"🏴‍☠️",rating:9.2,ep:1100,genre:"Aventura",year:1999,audio:["JP","PT","EN"],isNew:false,hot:true,trailer:"vBqLCDlhsaY",poster:"https://image.tmdb.org/t/p/w500/cMD9Ygz11zjJzAovURpO75Qg7rT.jpg",desc:"Monkey D. Luffy é um jovem pirata com o corpo elástico após comer a Akuma no Mi. Ele parte em busca do lendário tesouro One Piece para se tornar o Rei dos Piratas. Junto de sua tripulação, enfrenta marinhas, outros piratas e segredos do mundo."},
  {id:2,title:"Demon Slayer",type:"anime",g:["#7c3aed","#db2777"],emoji:"⚔️",rating:8.9,ep:44,genre:"Ação",year:2019,audio:["JP","PT","EN"],isNew:true,hot:true,trailer:"VQGCKyvzIM4",poster:"https://image.tmdb.org/t/p/w500/xUfRZu2mi8jH6SzQEJGP6tjBuYj.jpg",desc:"Tanjiro Kamado é um jovem gentil que vive no Japão feudal. Após sua família ser massacrada por um demônio e sua irmã Nezuko ser transformada em um, ele decide treinar para se tornar um caçador de demônios."},
  {id:3,title:"Attack on Titan",type:"anime",g:["#374151","#111827"],emoji:"⚡",rating:9.1,ep:87,genre:"Drama",year:2013,audio:["JP","PT","EN"],isNew:false,hot:false,trailer:"MGRm4IzK1SQ",poster:"https://image.tmdb.org/t/p/w500/hTP1DtLGFamjfu8WqjnuQdP1n4i.jpg",desc:"A humanidade vive atrás de muros gigantes para se proteger dos Titãs. Eren Yeager perde sua mãe no ataque e jura exterminar todos os Titãs. Os segredos por trás dos muros são mais sombrios do que imagina."},
  {id:4,title:"Jujutsu Kaisen",type:"anime",g:["#4f46e5","#7c3aed"],emoji:"🌀",rating:8.7,ep:48,genre:"Sobrenatural",year:2020,audio:["JP","PT","EN"],isNew:true,hot:true,trailer:"pkKu9hLT-t8",poster:"https://image.tmdb.org/t/p/w500/ng3qoFfrYHaEyeSSJvU0pzEXSZo.jpg",desc:"Yuji Itadori engole um dedo amaldiçoado do maior demônio da história e torna-se seu hospedeiro. Condenado à execução, ele adentra o mundo de feiticeiros e maldições."},
  {id:5,title:"Squid Game",type:"series",g:["#be185d","#e11d48"],emoji:"🦑",rating:8.0,ep:16,genre:"Thriller",year:2021,audio:["KR","PT","EN"],isNew:false,hot:false,trailer:"oqxAJKy0ii4",poster:"https://image.tmdb.org/t/p/w500/dDlEmu3EZ0Pgg93K2SVNLCjCSvE.jpg",desc:"456 pessoas endividadas são recrutadas para jogos infantis com prêmio de 45,6 bilhões de wons. Quem perde, morre. A série sul-coreana que conquistou o mundo."},
  {id:6,title:"Breaking Bad",type:"series",g:["#4d7c0f","#15803d"],emoji:"🧪",rating:9.5,ep:62,genre:"Drama",year:2008,audio:["EN","PT","ES"],isNew:false,hot:false,trailer:"HhesaQXLuRY",poster:"https://image.tmdb.org/t/p/w500/ggFHVNu6YYI5L9pCfOacjizRGt.jpg",desc:"Walter White, professor com câncer terminal, começa a fabricar metanfetamina. Considerada uma das melhores séries de todos os tempos."},
  {id:7,title:"Interstellar",type:"movie",g:["#0369a1","#1e3a8a"],emoji:"🌌",rating:8.6,ep:null,genre:"Sci-Fi",year:2014,audio:["EN","PT"],isNew:false,hot:false,trailer:"zSWdZVtXT7E",poster:"https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",desc:"Astronautas viajam por um buraco de minhoca em busca de um novo lar para a humanidade. Christopher Nolan entrega uma obra que mistura ciência real com emoção pura."},
  {id:8,title:"Spirited Away",type:"movie",g:["#d97706","#ea580c"],emoji:"🏮",rating:9.3,ep:null,genre:"Fantasia",year:2001,audio:["JP","PT","EN"],isNew:false,hot:true,trailer:"ByXuk9QqQkk",poster:"https://image.tmdb.org/t/p/w500/39wmItIWsg5sZMyRUHLkWBcuVCM.jpg",desc:"Chihiro fica presa no mundo dos espíritos e deve trabalhar para resgatar seus pais. Obra-prima de Miyazaki, vencedora do Oscar de Melhor Animação."},
  {id:9,title:"Your Name",type:"movie",g:["#2563eb","#7c3aed"],emoji:"🌠",rating:8.9,ep:null,genre:"Romance",year:2016,audio:["JP","PT","EN"],isNew:true,hot:true,trailer:"xU47nhruN-Q",poster:"https://image.tmdb.org/t/p/w500/q719jXXEzOoYaps6babgKnONONX.jpg",desc:"Mitsuha e Taki trocam de corpo misteriosamente e se apaixonam sem nunca ter se encontrado. Uma história de amor que transcende tempo e espaço."},
  {id:10,title:"Blue Lock",type:"anime",g:["#1d4ed8","#0369a1"],emoji:"⚽",rating:8.3,ep:24,genre:"Esportes",year:2022,audio:["JP","PT","EN"],isNew:true,hot:false,trailer:"K2p5MmWOjHs",poster:"https://image.tmdb.org/t/p/w500/7oFtFONjgFn5MXOSL88YzWS5zNJ.jpg",desc:"300 atacantes competem eliminatoriamente para criar o maior ego do futebol mundial. Yoichi Isagi é um dos convocados."},
  {id:11,title:"Parasite",type:"movie",g:["#475569","#1e293b"],emoji:"🪲",rating:8.5,ep:null,genre:"Thriller",year:2019,audio:["KR","PT","EN"],isNew:false,hot:false,trailer:"5xH0HfJHsaY",poster:"https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",desc:"A família Kim se infiltra na família rica Park. Um segredo escondido muda tudo. Primeiro filme não anglófono a vencer o Oscar de Melhor Filme."},
  {id:12,title:"Naruto",type:"anime",g:["#d97706","#dc2626"],emoji:"🍥",rating:8.4,ep:720,genre:"Aventura",year:2002,audio:["JP","PT","EN"],isNew:false,hot:false,trailer:"QczGoCmX-pI",poster:"https://image.tmdb.org/t/p/w500/xppeysfvDKVx775MFuH8Z9BlpMk.jpg",desc:"Naruto Uzumaki sonha em se tornar Hokage para ganhar o respeito de todos. Uma saga sobre perseverança, amizade e nunca desistir dos sonhos."},
];

const SUBS={
  PT:["Vamos nos encontrar sob a árvore","Eu nunca vou desistir dos meus sonhos!","Juntos somos muito mais fortes"],
  EN:["Let's meet under the tree","I'll never give up on my dreams!","Together we are so much stronger"],
  JP:["木の下で会おう","夢を諦めないぞ！","一緒なら、もっと強くなれる"],
  KR:["나무 아래서 만나자","꿈을 절대 포기하지 않을 거야!","함께라면 훨씬 더 강해질 수 있어"],
  ES:["Nos vemos bajo el árbol","¡Jamás renunciaré a mis sueños!","Juntos somos mucho más fuertes"],
  FR:["Retrouvons-nous sous l'arbre","Je n'abandonnerai jamais mes rêves!","Ensemble nous sommes bien plus forts"],
  DE:["Treffen wir uns unter dem Baum","Ich werde meinen Traum niemals aufgeben!","Zusammen sind wir so viel stärker"],
  IT:["Incontriamoci sotto l'albero","Non abbandonerò mai i miei sogni!","Insieme siamo molto più forti"],
  CN:["让我们在树下见面","我永远不会放弃我的梦想！","在一起我们会更加强大"],
  RU:["Встретимся под деревом","Я никогда не сдамся мечте!","Вместе мы намного сильнее"],
  AR:["لنلتقِ تحت الشجرة","لن أتخلى أبداً عن أحلامي!","معاً نكون أقوى بكثير"],
  HI:["चलो पेड़ के नीचे मिलते हैं","मैं कभी अपने सपने नहीं छोड़ूंगा!","साथ मिलकर हम कहीं अधिक शक्तिशाली हैं"],
};

const QUIZZES=[
  {q:"Como se diz 'amigo' em japonês?",opts:["友達 Tomodachi","先生 Sensei","家族 Kazoku","仲間 Nakama"],ok:0},
  {q:"What does '夢' (Yume) mean?",opts:["Tree","Dream","Friend","Strength"],ok:1},
  {q:"'감사합니다' means?",opts:["Hello","Goodbye","Thank you","Sorry"],ok:2},
  {q:"'Nakama' (仲間) significa?",opts:["Inimigo","Mestre","Companheiro","Família"],ok:2},
];
const MISSIONS=[
  {id:1,title:"Demon Slayer",emoji:"⚔️",prog:38,total:44,reward:"20% OFF",done:false},
  {id:2,title:"7 dias streak", emoji:"🔥",prog:7, total:7, reward:"10% OFF",done:true},
  {id:3,title:"5h em JP",      emoji:"🎌",prog:3, total:5, reward:"15% OFF",done:false},
  {id:4,title:"Watch Party",   emoji:"👥",prog:1, total:3, reward:"+500 XP",done:false},
];
const NOTIFS=[
  {id:1,text:"One Piece EP 1111 saiu! 🏴‍☠️",time:"agora",read:false},
  {id:2,text:"Demon Slayer T4 estreia amanhã! ⚔️",time:"2h",read:false},
  {id:3,text:"Streak de 7 dias ativo! 🔥",time:"8h",read:true},
  {id:4,text:"Nova série coreana adicionada",time:"1d",read:true},
];

const CSS=`
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Nunito:wght@400;600;700;800;900&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html,body{background:#06060e;color:#e2e8f0;font-family:'Nunito',sans-serif;overflow-x:hidden}
::-webkit-scrollbar{width:5px}::-webkit-scrollbar-track{background:#0d0d1a}::-webkit-scrollbar-thumb{background:#1e1e3a;border-radius:3px}
.hov{transition:all .22s ease;cursor:pointer}.hov:hover{transform:translateY(-4px) scale(1.03);filter:brightness(1.1)}
.fade{animation:fi .3s ease}@keyframes fi{from{opacity:0;transform:translateY(7px)}to{opacity:1;transform:translateY(0)}}
.langFade{animation:lf .4s ease}@keyframes lf{from{opacity:0;transform:scale(.97)}to{opacity:1;transform:scale(1)}}
.spin{animation:sp .9s linear infinite}@keyframes sp{to{transform:rotate(360deg)}}
.slide{animation:sl .3s ease}@keyframes sl{from{opacity:0;transform:translateX(16px)}to{opacity:1;transform:translateX(0)}}
button,input,textarea{font-family:'Nunito',sans-serif}
`;

/* ══════════════════════════════════════════════
   CACHE DO ORION — economiza até 95% do custo
   Pergunta similar = resposta instantânea
══════════════════════════════════════════════ */
const _memCache = new Map();
const SUPA_URL  = "https://lazbspxsuylhqgwsosxx.supabase.co";
const SUPA_KEY  = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxhemJzcHhzdXlsaHFnd3Nvc3h4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY3MTAwNDMsImV4cCI6MjA5MjI4NjA0M30.INmfSnRnm_XlQpg95JaM6p41Zclot01d6VYb2LxfwXw";

function isSimilar(a,b){
  const wA=new Set(a.toLowerCase().split(" ").filter(w=>w.length>3));
  const wB=new Set(b.toLowerCase().split(" ").filter(w=>w.length>3));
  if(!wA.size||!wB.size) return a.toLowerCase()===b.toLowerCase();
  return [...wA].filter(w=>wB.has(w)).length/Math.max(wA.size,wB.size)>0.75;
}
async function buscarCache(q){
  try{
    const r=await fetch(`${SUPA_URL}/rest/v1/orion_cache?select=id,pergunta,resposta,usado&order=usado.desc&limit=200`,
      {headers:{"apikey":SUPA_KEY,"Authorization":`Bearer ${SUPA_KEY}`}});
    if(!r.ok) return null;
    for(const row of await r.json()){
      if(row.pergunta&&isSimilar(row.pergunta,q)){
        fetch(`${SUPA_URL}/rest/v1/orion_cache?id=eq.${row.id}`,{method:"PATCH",headers:{"apikey":SUPA_KEY,"Authorization":`Bearer ${SUPA_KEY}`,"Content-Type":"application/json"},body:JSON.stringify({usado:(row.usado||0)+1})}).catch(()=>{});
        return row.resposta;
      }
    }
    return null;
  }catch{return null;}
}
async function salvarCache(q,resp){
  try{
    await fetch(`${SUPA_URL}/rest/v1/orion_cache`,{method:"POST",
      headers:{"apikey":SUPA_KEY,"Authorization":`Bearer ${SUPA_KEY}`,"Content-Type":"application/json","Prefer":"return=minimal"},
      body:JSON.stringify({pergunta:q.slice(0,500),resposta:resp,usado:0})});
  }catch{}
}

async function askClaude(messages,system){
  try{
    const ultimaMsg=[...messages].reverse().find(m=>m.role==="user")?.content||"";
    const key=ultimaMsg.toLowerCase().trim().slice(0,150);
    // 1. Cache memória
    if(_memCache.has(key)) return _memCache.get(key)+"\n\n⚡ *resposta instantânea*";
    // 2. Cache banco
    const cached=await buscarCache(ultimaMsg);
    if(cached){_memCache.set(key,cached);return cached+"\n\n⚡ *resposta instantânea*";}
    // 3. API Claude
    const res=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},
      body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1000,system,messages})});
    const d=await res.json();
    const resp=d.content?.[0]?.text||"Erro ao responder.";
    // 4. Salva cache
    _memCache.set(key,resp);
    salvarCache(ultimaMsg,resp);
    return resp;
  }catch{return"❌ Erro de conexão. Tente novamente!";}
}

/* ══════════════════════════════════════════════
   NOTIFICATION SETTINGS COMPONENT
══════════════════════════════════════════════ */
function NotifSettings({user, t}){
  const [notifs, setNotifs] = useState({
    newEpisode:   true,
    missionAlert: true,
    streakRemind: true,
    weeklyReport: true,
    promos:       false,
    wpEnabled:    user?.wp||false,
    silentStart:  "22:00",
    silentEnd:    "08:00",
  });
  const [saved, setSaved] = useState(false);

  function toggle(k){setNotifs(p=>({...p,[k]:!p[k]}));}
  function save(){setSaved(true);setTimeout(()=>setSaved(false),2000);}

  const Row=({k,label,icon,desc})=>(
    <div style={{display:"flex",alignItems:"center",gap:10,padding:"9px 0",borderBottom:"1px solid #111128"}}>
      <span style={{fontSize:16,flexShrink:0}}>{icon}</span>
      <div style={{flex:1}}>
        <div style={{fontSize:11,fontWeight:700}}>{label}</div>
        {desc&&<div style={{fontSize:9,color:"#475569",marginTop:1}}>{desc}</div>}
      </div>
      <div onClick={()=>toggle(k)} style={{width:36,height:20,background:notifs[k]?"linear-gradient(135deg,#22c55e,#16a34a)":"#1a1a36",borderRadius:10,position:"relative",cursor:"pointer",transition:"background .2s",flexShrink:0}}>
        <div style={{position:"absolute",top:2,left:notifs[k]?18:2,width:16,height:16,background:"white",borderRadius:"50%",transition:"left .2s",boxShadow:"0 1px 3px rgba(0,0,0,.3)"}}/>
      </div>
    </div>
  );

  return(
    <div style={{background:"#0d0d1a",borderRadius:12,padding:14,border:"1px solid #1a1a36"}}>
      <div style={{fontFamily:"Bebas Neue",fontSize:15,letterSpacing:1,marginBottom:11}}>⚙️ CONFIGURAR NOTIFICAÇÕES</div>
      <Row k="newEpisode"   icon="🎌" label="Novo episódio disponível"      desc="Avisa assim que sair o ep do anime que você acompanha"/>
      <Row k="missionAlert" icon="🎯" label="Missão quase completa"          desc="Lembrete quando faltar 1-2 episódios para completar missão"/>
      <Row k="streakRemind" icon="🔥" label="Lembrete de streak diário"      desc="Para não perder a sequência"/>
      <Row k="weeklyReport" icon="📊" label="Resumo semanal (todo domingo)"  desc="Seus progresso, palavras aprendidas e novidades"/>
      <Row k="promos"       icon="🎁" label="Ofertas e promoções"            desc="Descontos e novidades do LinguaStream"/>
      {user?.wp&&<Row k="wpEnabled" icon="📲" label="Notificações via WhatsApp" desc="Receber no WhatsApp além do app"/>}
      <div style={{marginTop:12,padding:"9px 11px",background:"rgba(100,116,139,.05)",border:"1px solid #1a1a36",borderRadius:9}}>
        <div style={{fontSize:9,color:"#64748b",fontWeight:700,marginBottom:6}}>🌙 MODO SILENCIOSO</div>
        <div style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap"}}>
          <span style={{fontSize:10,color:"#94a3b8"}}>Não perturbar de</span>
          <input type="time" value={notifs.silentStart} onChange={e=>setNotifs(p=>({...p,silentStart:e.target.value}))} style={{background:"#111128",border:"1px solid #1a1a36",borderRadius:6,padding:"3px 7px",color:"#e2e8f0",fontSize:10,outline:"none"}}/>
          <span style={{fontSize:10,color:"#94a3b8"}}>até</span>
          <input type="time" value={notifs.silentEnd} onChange={e=>setNotifs(p=>({...p,silentEnd:e.target.value}))} style={{background:"#111128",border:"1px solid #1a1a36",borderRadius:6,padding:"3px 7px",color:"#e2e8f0",fontSize:10,outline:"none"}}/>
        </div>
      </div>
      <button onClick={save} style={{width:"100%",marginTop:10,padding:"9px",background:saved?"linear-gradient(135deg,#22c55e,#16a34a)":"linear-gradient(135deg,#f97316,#ef4444)",border:"none",borderRadius:8,color:"white",fontWeight:800,cursor:"pointer",fontSize:11,transition:"background .3s"}}>
        {saved?"✅ Preferências salvas!":"Salvar configurações"}
      </button>
    </div>
  );
}

/* ══════════════════════════════════════════════
   WATCH PARTY — texto + áudio + reações
══════════════════════════════════════════════ */
const PARTY_MEMBERS=[
  {id:1,name:"Mari",  flag:"🇧🇷",lang:"PT+EN",avatar:"M",color:"#f97316"},
  {id:2,name:"Kenji", flag:"🇯🇵",lang:"JP+JP",avatar:"K",color:"#a855f7"},
  {id:3,name:"Carlos",flag:"🇪🇸",lang:"ES+EN",avatar:"C",color:"#22c55e"},
];
const INIT_WP=[
  {id:1,uid:1,name:"Mari",  flag:"🇧🇷",type:"text",  content:"Que cena incrível!! 😱",          time:"21:04",translated:"What an incredible scene!!",   own:false},
  {id:2,uid:2,name:"Kenji", flag:"🇯🇵",type:"text",  content:"すごい！信じられない！",          time:"21:04",translated:"Amazing! Unbelievable!",         own:false},
  {id:3,uid:3,name:"Carlos",flag:"🇪🇸",type:"text",  content:"¡Increíble! No me lo esperaba 🔥",time:"21:05",translated:"Incredible! I didn't expect it",own:false},
  {id:4,uid:0,name:"Você",  flag:"🇧🇷",type:"text",  content:"EU SABIA! 💀",                   time:"21:05",translated:"",                               own:true},
  {id:5,uid:2,name:"Kenji", flag:"🇯🇵",type:"audio", content:"🎙 0:04",duration:4,             time:"21:06",translated:"[áudio em japonês]",            own:false},
];
const EMOJIS=["😱","🔥","💀","😭","🤣","❤️","👏","🤯"];

function WatchParty({plan,setPage,t}){
  const [open,      setOpen]     = useState(false);
  const [msgs,      setMsgs]     = useState(INIT_WP);
  const [text,      setText]     = useState("");
  const [showEmoji, setShowEmoji]= useState(false);
  const [reactions, setReactions]= useState([]);
  const [recording, setRecording]= useState(false);
  const [recSec,    setRecSec]   = useState(0);
  const [showTr,    setShowTr]   = useState({});
  const [mode,      setMode]     = useState("text");
  const wpRef   = useRef(null);
  const recInt  = useRef(null);
  const mrRef   = useRef(null);

  useEffect(()=>{if(wpRef.current)wpRef.current.scrollTop=wpRef.current.scrollHeight;},[msgs]);
  useEffect(()=>{const tid=setTimeout(()=>setReactions([]),2200);return()=>clearTimeout(tid);},[reactions]);

  function now(){return new Date().toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"});}

  function sendText(){
    if(!text.trim())return;
    setMsgs(p=>[...p,{id:Date.now(),uid:0,name:"Você",flag:"🇧🇷",type:"text",content:text.trim(),time:now(),translated:"",own:true}]);
    setText("");
    const replies=[
      {uid:1,name:"Mari",  flag:"🇧🇷",content:"Concordo demais!! 🔥",translated:""},
      {uid:2,name:"Kenji", flag:"🇯🇵",content:"その通り！👏",        translated:"Exactly! 👏"},
      {uid:3,name:"Carlos",flag:"🇪🇸",content:"¡Exactamente! 😂",   translated:"Exactly! 😂"},
    ];
    const r=replies[Math.floor(Math.random()*replies.length)];
    setTimeout(()=>setMsgs(p=>[...p,{id:Date.now()+1,...r,type:"text",time:now(),own:false}]),900+Math.random()*700);
  }

  function startRec(){
    setRecording(true);setRecSec(0);
    recInt.current=setInterval(()=>setRecSec(s=>s+1),1000);
    if(navigator.mediaDevices){
      navigator.mediaDevices.getUserMedia({audio:true}).then(stream=>{
        const mr=new MediaRecorder(stream);mrRef.current=mr;mr.start();
      }).catch(()=>{});
    }
  }

  function stopRec(){
    clearInterval(recInt.current);
    const dur=recSec||2;
    setRecording(false);setRecSec(0);
    if(mrRef.current&&mrRef.current.state!=="inactive"){
      mrRef.current.stop();
      mrRef.current.stream?.getTracks().forEach(t=>t.stop());
    }
    setMsgs(p=>[...p,{id:Date.now(),uid:0,name:"Você",flag:"🇧🇷",type:"audio",content:`🎙 0:${String(dur).padStart(2,"0")}`,duration:dur,time:now(),translated:"",own:true}]);
    setTimeout(()=>setMsgs(p=>[...p,{id:Date.now()+1,uid:2,name:"Kenji",flag:"🇯🇵",type:"text",content:"聞こえた！😂",time:now(),translated:"I heard it! 😂",own:false}]),1400);
  }

  function sendReaction(e){
    setReactions(p=>[...p,{id:Date.now(),emoji:e,x:15+Math.random()*70}]);
    setShowEmoji(false);
    setMsgs(p=>[...p,{id:Date.now()+2,uid:0,name:"Você",flag:"🇧🇷",type:"reaction",content:e,time:now(),own:true}]);
  }

  if(!open)return(
    <button onClick={()=>plan==="agent"?setOpen(true):setPage("plans")} style={{width:"100%",padding:"7px",background:"transparent",border:"1px solid #1a1a36",borderRadius:8,color:plan==="agent"?"#a855f7":"#1a1a36",cursor:"pointer",fontWeight:700,fontSize:11,display:"flex",alignItems:"center",justifyContent:"center",gap:5}}>
      👥 {t.watchParty} {plan!=="agent"&&"🔒"}
    </button>
  );

  return(
    <div style={{background:"#0d0d1a",border:"1px solid rgba(168,85,247,.35)",borderRadius:11,overflow:"hidden",position:"relative"}} className="fade">
      <style>{`@keyframes floatUp{0%{opacity:1;transform:translateY(0) scale(1)}100%{opacity:0;transform:translateY(-80px) scale(1.5)}}.recPulse{animation:rp 1s ease infinite}@keyframes rp{0%,100%{opacity:1}50%{opacity:.4}}`}</style>
      {/* floating reactions */}
      <div style={{position:"absolute",inset:0,pointerEvents:"none",zIndex:10,overflow:"hidden"}}>
        {reactions.map(r=><div key={r.id} style={{position:"absolute",bottom:50,left:`${r.x}%`,fontSize:22,animation:"floatUp 2s ease forwards"}}>{r.emoji}</div>)}
      </div>
      {/* header */}
      <div style={{padding:"8px 11px",borderBottom:"1px solid #1a1a36",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <div style={{display:"flex",alignItems:"center",gap:7}}>
          <div style={{display:"flex"}}>
            {PARTY_MEMBERS.map((m,i)=><div key={m.id} style={{width:21,height:21,background:m.color,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:8,fontWeight:800,border:"2px solid #0d0d1a",marginLeft:i?-6:0,zIndex:3-i}}>{m.avatar}</div>)}
          </div>
          <div>
            <div style={{fontSize:10,fontWeight:800,color:"#a855f7"}}>👥 Watch Party</div>
            <div style={{fontSize:8,color:"#22c55e"}}>🟢 4 assistindo agora</div>
          </div>
        </div>
        <div style={{display:"flex",gap:5,alignItems:"center"}}>
          <div style={{fontSize:8,color:"#64748b",background:"rgba(168,85,247,.08)",border:"1px solid rgba(168,85,247,.15)",borderRadius:9,padding:"1px 6px"}}>🌍 Auto-traduzido</div>
          <button onClick={()=>setOpen(false)} style={{background:"transparent",border:"none",color:"#64748b",cursor:"pointer",fontSize:13,lineHeight:1}}>✕</button>
        </div>
      </div>
      {/* members */}
      <div style={{display:"flex",gap:5,padding:"5px 10px",borderBottom:"1px solid #111128",overflowX:"auto"}}>
        {[{name:"Você",flag:"🇧🇷",lang:"PT+EN",color:"#f97316"},...PARTY_MEMBERS].map(m=>(
          <div key={m.name} style={{display:"flex",alignItems:"center",gap:3,background:"rgba(255,255,255,.03)",border:"1px solid #1a1a36",borderRadius:16,padding:"2px 7px",flexShrink:0}}>
            <span style={{fontSize:9}}>{m.flag}</span>
            <span style={{fontSize:9,fontWeight:700,color:m.color}}>{m.name}</span>
            <span style={{fontSize:8,color:"#475569"}}>{m.lang}</span>
          </div>
        ))}
      </div>
      {/* messages */}
      <div ref={wpRef} style={{height:195,overflowY:"auto",padding:"7px 10px",display:"flex",flexDirection:"column",gap:5}}>
        {msgs.map(msg=>(
          <div key={msg.id} style={{display:"flex",justifyContent:msg.own?"flex-end":"flex-start",gap:4,alignItems:"flex-end"}} className="fade">
            {!msg.own&&<div style={{width:19,height:19,background:PARTY_MEMBERS.find(m=>m.id===msg.uid)?.color||"#64748b",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:7,fontWeight:800,flexShrink:0,marginBottom:2}}>{msg.name[0]}</div>}
            <div style={{maxWidth:"74%"}}>
              {!msg.own&&<div style={{fontSize:8,color:"#64748b",marginBottom:1,display:"flex",gap:2}}><span style={{fontWeight:700}}>{msg.name}</span><span>{msg.flag}</span></div>}
              {msg.type==="text"&&(
                <div>
                  <div style={{background:msg.own?"linear-gradient(135deg,#f97316,#ef4444)":"#111128",border:msg.own?"none":"1px solid #1a1a36",borderRadius:msg.own?"9px 9px 3px 9px":"9px 9px 9px 3px",padding:"5px 8px",fontSize:11,lineHeight:1.4}}>{msg.content}</div>
                  {msg.translated&&(
                    <div>
                      <button onClick={()=>setShowTr(p=>({...p,[msg.id]:!p[msg.id]}))} style={{background:"transparent",border:"none",color:"#475569",fontSize:8,cursor:"pointer",padding:"1px 0",display:"flex",alignItems:"center",gap:1}}>
                        🌍 {showTr[msg.id]?"Ocultar":"Tradução ORION"}
                      </button>
                      {showTr[msg.id]&&<div style={{background:"rgba(168,85,247,.07)",border:"1px solid rgba(168,85,247,.18)",borderRadius:6,padding:"3px 7px",fontSize:9,color:"#a855f7",marginTop:1}}>🌟 {msg.translated}</div>}
                    </div>
                  )}
                </div>
              )}
              {msg.type==="audio"&&(
                <div style={{background:msg.own?"linear-gradient(135deg,#f97316,#ef4444)":"#111128",border:msg.own?"none":"1px solid #1a1a36",borderRadius:msg.own?"9px 9px 3px 9px":"9px 9px 9px 3px",padding:"6px 9px",display:"flex",alignItems:"center",gap:6,minWidth:120}}>
                  <button style={{width:20,height:20,background:msg.own?"rgba(255,255,255,.25)":"rgba(168,85,247,.25)",border:"none",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",fontSize:8,color:"white",flexShrink:0}}>▶</button>
                  <div style={{flex:1}}>
                    <div style={{height:2,background:msg.own?"rgba(255,255,255,.35)":"#1a1a36",borderRadius:1,marginBottom:2}}/>
                    <div style={{fontSize:9,color:msg.own?"rgba(255,255,255,.65)":"#64748b"}}>{msg.content}</div>
                  </div>
                  {msg.translated&&<div onClick={()=>setShowTr(p=>({...p,[msg.id]:!p[msg.id]}))} style={{cursor:"pointer",fontSize:9}}>🌍</div>}
                </div>
              )}
              {msg.type==="reaction"&&<div style={{fontSize:16,textAlign:msg.own?"right":"left"}}>{msg.content}</div>}
              <div style={{fontSize:7,color:"#475569",marginTop:1,textAlign:msg.own?"right":"left"}}>{msg.time}</div>
            </div>
          </div>
        ))}
      </div>
      {/* input */}
      <div style={{padding:"6px 9px",borderTop:"1px solid #1a1a36"}}>
        {showEmoji&&(
          <div style={{display:"flex",gap:4,marginBottom:6,flexWrap:"wrap"}} className="fade">
            {EMOJIS.map(e=><button key={e} onClick={()=>sendReaction(e)} style={{fontSize:17,background:"transparent",border:"none",cursor:"pointer",padding:"1px 3px",borderRadius:5}}>{e}</button>)}
          </div>
        )}
        {recording&&(
          <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:5,padding:"4px 8px",background:"rgba(239,68,68,.1)",border:"1px solid rgba(239,68,68,.3)",borderRadius:7}} className="fade">
            <div style={{width:6,height:6,background:"#ef4444",borderRadius:"50%"}} className="recPulse"/>
            <span style={{fontSize:10,color:"#ef4444",fontWeight:700}}>Gravando... 0:{String(recSec).padStart(2,"0")}</span>
            <span style={{fontSize:9,color:"#64748b",marginLeft:"auto"}}>Solte para enviar</span>
          </div>
        )}
        <div style={{display:"flex",gap:4,alignItems:"center"}}>
          <button onClick={()=>setShowEmoji(p=>!p)} style={{width:28,height:28,background:"rgba(249,115,22,.08)",border:"1px solid rgba(249,115,22,.18)",borderRadius:7,cursor:"pointer",fontSize:13,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>😊</button>
          <div style={{display:"flex",background:"#111128",borderRadius:7,padding:2,gap:1,flexShrink:0}}>
            <button onClick={()=>setMode("text")}  style={{padding:"2px 6px",borderRadius:5,border:"none",background:mode==="text"?"#1e1e3a":"transparent",color:mode==="text"?"#e2e8f0":"#64748b",cursor:"pointer",fontSize:9,fontWeight:700}}>✍️</button>
            <button onClick={()=>setMode("audio")} style={{padding:"2px 6px",borderRadius:5,border:"none",background:mode==="audio"?"rgba(239,68,68,.3)":"transparent",color:mode==="audio"?"#ef4444":"#64748b",cursor:"pointer",fontSize:9,fontWeight:700}}>🎙</button>
          </div>
          {mode==="text"?(
            <>
              <input value={text} onChange={e=>setText(e.target.value)} onKeyDown={e=>e.key==="Enter"&&sendText()} placeholder="Mensagem... (traduzida p/ todos 🌍)" style={{flex:1,background:"#111128",border:"1px solid #1a1a36",borderRadius:7,padding:"5px 8px",color:"#e2e8f0",fontSize:10,outline:"none"}}/>
              <button onClick={sendText} style={{width:28,height:28,background:"linear-gradient(135deg,#a855f7,#6366f1)",border:"none",borderRadius:7,color:"white",cursor:"pointer",fontSize:12,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>→</button>
            </>
          ):(
            <button onMouseDown={startRec} onMouseUp={stopRec} onTouchStart={startRec} onTouchEnd={stopRec}
              style={{flex:1,padding:"6px",background:recording?"linear-gradient(135deg,#ef4444,#dc2626)":"rgba(239,68,68,.09)",border:`1px solid ${recording?"#ef4444":"rgba(239,68,68,.25)"}`,borderRadius:7,color:recording?"white":"#ef4444",cursor:"pointer",fontWeight:800,fontSize:10,transition:"all .15s",userSelect:"none",WebkitUserSelect:"none"}}>
              {recording?`🔴 Gravando ${recSec}s... (solte para enviar)`:"🎙 Segure para gravar áudio"}
            </button>
          )}
        </div>
        <div style={{fontSize:7,color:"#1e1e3a",marginTop:3,textAlign:"center"}}>🌟 ORION traduz automaticamente para todos os idiomas da sala</div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   AUTH MODAL — definido FORA do App para não re-renderizar ao digitar
══════════════════════════════════════════════ */
function AuthModal({show, onClose, authMode, setAuthMode, onSuccess, t}){
  const [form, setForm] = React.useState({nome:"",email:"",senha:"",cel:"",wp:false,lgpd:false});

  if(!show) return null;

  function handleSubmit(e){
    e.preventDefault();
    if(authMode==="register"&&!form.lgpd){alert("Accept terms to continue.");return;}
    onSuccess({nome:form.nome||"Zinho",email:form.email,wp:form.wp,cel:form.cel});
  }

  const inp = {background:"#111128",border:"1px solid #1a1a36",borderRadius:8,padding:"9px 11px",color:"#e2e8f0",fontSize:12,outline:"none",width:"100%"};

  return(
    <div onClick={onClose} style={{position:"fixed",inset:0,background:"rgba(0,0,0,.9)",zIndex:1800,display:"flex",alignItems:"center",justifyContent:"center",padding:16}}>
      <div onClick={e=>e.stopPropagation()} style={{width:"min(400px,100%)",background:"#0d0d1a",borderRadius:18,overflow:"hidden",border:"1px solid #1a1a36"}}>
        <div style={{background:"linear-gradient(135deg,#f97316,#a855f7)",padding:"18px 20px",textAlign:"center"}}>
          <div style={{fontFamily:"Bebas Neue",fontSize:24,letterSpacing:1,color:"white"}}>LINGUA<span style={{color:"rgba(255,255,255,.8)"}}>STREAM</span></div>
          <div style={{fontSize:11,opacity:.85,marginTop:1,color:"white"}}>{authMode==="login"?(t?.authWelcome||"Bem-vindo de volta! 👋"):(t?.authCreate||"Crie sua conta grátis 🎬")}</div>
        </div>
        <div style={{padding:20}}>
          <div style={{display:"flex",background:"#111128",borderRadius:9,padding:3,marginBottom:15,gap:2}}>
            {[["login",t?.signin||"Entrar"],["register",t?.signup||"Cadastrar"]].map(([m,l])=>(
              <button key={m} onClick={()=>setAuthMode(m)} style={{flex:1,padding:"7px",borderRadius:7,border:"none",background:authMode===m?"#1e1e3a":"transparent",color:authMode===m?"white":"#64748b",fontWeight:700,cursor:"pointer",fontSize:12}}>{l}</button>
            ))}
          </div>
          <form onSubmit={handleSubmit} style={{display:"flex",flexDirection:"column",gap:9}}>
            {authMode==="register"&&(
              <input required value={form.nome}
                onChange={e=>setForm(p=>({...p,nome:e.target.value}))}
                placeholder={t?.name||"Seu nome"} style={inp}/>
            )}
            <input required type="email" value={form.email}
              onChange={e=>setForm(p=>({...p,email:e.target.value}))}
              placeholder={t?.email||"Email"} style={inp}/>
            <input required type="password" value={form.senha}
              onChange={e=>setForm(p=>({...p,senha:e.target.value}))}
              placeholder={t?.pass||"Senha"} style={inp}/>
            {authMode==="register"&&(
              <>
                <div>
                  <div style={{fontSize:9,color:"#25d366",fontWeight:700,marginBottom:4}}>📱 WhatsApp para receber atualizações dos seus favoritos</div>
                  <input type="tel" value={form.cel}
                    onChange={e=>setForm(p=>({...p,cel:e.target.value}))}
                    placeholder={t?.phone||"WhatsApp: 5511999999999"} style={inp}/>
                </div>
                <div style={{background:"rgba(37,211,102,.06)",border:"1px solid rgba(37,211,102,.2)",borderRadius:8,padding:"10px 11px"}}>
                  <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:6,cursor:"pointer"}} onClick={()=>setForm(p=>({...p,wp:!p.wp}))}>
                    <input type="checkbox" checked={form.wp}
                      onChange={e=>setForm(p=>({...p,wp:e.target.checked}))}
                      style={{accentColor:"#25d366",flexShrink:0,width:14,height:14}}/>
                    <span style={{fontSize:11,fontWeight:800,color:"#25d366"}}>📲 Receber novidades pelo WhatsApp</span>
                  </div>
                  <div style={{fontSize:10,lineHeight:1.5,color:"#94a3b8"}}>
                    <div style={{fontWeight:800,color:"#25d366",marginBottom:3}}>📲 Quero receber pelo WhatsApp:</div>
                    <div style={{display:"flex",flexDirection:"column",gap:4,marginTop:2}}>
                      <label style={{display:"flex",alignItems:"center",gap:5,cursor:"pointer"}}>
                        <input type="checkbox" defaultChecked style={{accentColor:"#25d366",flexShrink:0}}/>
                        <span>🆕 Novos episódios dos animes que gostei</span>
                      </label>
                      <label style={{display:"flex",alignItems:"center",gap:5,cursor:"pointer"}}>
                        <input type="checkbox" defaultChecked style={{accentColor:"#25d366",flexShrink:0}}/>
                        <span>🎬 Lançamentos de filmes e séries favoritas</span>
                      </label>
                      <label style={{display:"flex",alignItems:"center",gap:5,cursor:"pointer"}}>
                        <input type="checkbox" defaultChecked style={{accentColor:"#25d366",flexShrink:0}}/>
                        <span>🎯 Progresso de missões e conquistas</span>
                      </label>
                      <label style={{display:"flex",alignItems:"center",gap:5,cursor:"pointer"}}>
                        <input type="checkbox" defaultChecked style={{accentColor:"#25d366",flexShrink:0}}/>
                        <span>🔥 Lembrete de streak diário</span>
                      </label>
                    </div>
                    <div style={{fontSize:9,color:"#475569",marginTop:4}}>Cancele quando quiser digitando PARAR</div>
                </div>
                <label style={{display:"flex",alignItems:"flex-start",gap:8,cursor:"pointer"}}>
                  <input required type="checkbox" checked={form.lgpd}
                    onChange={e=>setForm(p=>({...p,lgpd:e.target.checked}))}
                    style={{marginTop:2,accentColor:"#f97316",flexShrink:0}}/>
                  <span style={{fontSize:10,lineHeight:1.5,color:"#64748b"}}>{t?.terms||"Li e aceito os Termos de Uso e Política de Privacidade *"}</span>
                </label>
              </>
            )}
            <button type="submit" style={{padding:"11px",background:"linear-gradient(135deg,#f97316,#ef4444)",border:"none",borderRadius:9,color:"white",fontWeight:800,cursor:"pointer",fontSize:13,marginTop:2}}>
              {authMode==="login"?(t?.loginBtn||"Entrar 🚀"):(t?.registerBtn||"Criar conta grátis 🎬")}
            </button>
          </form>
          {authMode==="register"&&(
            <div style={{marginTop:9,background:"rgba(100,116,139,.06)",border:"1px solid #1a1a36",borderRadius:7,padding:"6px 9px",fontSize:9,color:"#64748b",lineHeight:1.5}}>
              {t?.lgpdNote||"🔒 Dados protegidos. WhatsApp é opcional e revogável."}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   LANDING PAGE — tela inicial antes do login
══════════════════════════════════════════════ */
function LandingPage({onLogin, onRegister}){
  const [langIdx, setLangIdx] = React.useState(0);
  const langs = ["🇧🇷 Português","🇺🇸 English","🇯🇵 日本語","🇰🇷 한국어","🇪🇸 Español"];
  
  React.useEffect(()=>{
    const t = setInterval(()=>setLangIdx(i=>(i+1)%langs.length),1800);
    return ()=>clearInterval(t);
  },[]);

  const features = [
    {emoji:"🎬", title:"Animes, Filmes & Séries", desc:"Catálogo completo com conteúdo em múltiplos idiomas"},
    {emoji:"🌍", title:"12 Idiomas Simultâneos", desc:"Legendas duplas selecionáveis — aprenda enquanto assiste"},
    {emoji:"🤖", title:"ORION — Seu Professor IA", desc:"Explica vocabulário e cultura em tempo real"},
    {emoji:"👥", title:"Watch Party Multilíngue", desc:"Assista com amigos do mundo todo ao mesmo tempo"},
    {emoji:"🎯", title:"Missões com Desconto", desc:"Complete séries e ganhe descontos reais na assinatura"},
    {emoji:"📲", title:"Notificações pelo WhatsApp", desc:"Saiba quando seus favoritos lançarem novos episódios"},
  ];

  return(
    <div style={{minHeight:"100vh",background:"#06060e",color:"#e2e8f0",fontFamily:"Nunito,sans-serif",overflowX:"hidden"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Nunito:wght@400;600;700;800;900&display=swap');
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
        @keyframes fade{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:.5}}
        .ls-float{animation:float 3s ease-in-out infinite}
        .ls-fade{animation:fade .5s ease forwards}
        .ls-pulse{animation:pulse 2s ease infinite}
        *{box-sizing:border-box;margin:0;padding:0}
      `}</style>

      {/* HERO */}
      <div style={{position:"relative",minHeight:"100vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"40px 20px",textAlign:"center",overflow:"hidden"}}>
        {/* Background glow */}
        <div style={{position:"absolute",top:"20%",left:"50%",transform:"translateX(-50%)",width:600,height:600,background:"radial-gradient(circle,rgba(249,115,22,.12) 0%,rgba(168,85,247,.08) 40%,transparent 70%)",pointerEvents:"none"}}/>
        
        {/* Logo */}
        <div className="ls-fade" style={{marginBottom:20}}>
          <div style={{width:56,height:56,background:"linear-gradient(135deg,#f97316,#ef4444)",borderRadius:16,display:"flex",alignItems:"center",justifyContent:"center",fontSize:28,margin:"0 auto 12px",boxShadow:"0 8px 32px rgba(249,115,22,.4)"}}>🎬</div>
          <div style={{fontFamily:"Bebas Neue",fontSize:36,letterSpacing:3,color:"white"}}>LINGUA<span style={{color:"#f97316"}}>STREAM</span></div>
          <div style={{fontSize:12,color:"#64748b",marginTop:4,letterSpacing:1}}>ENTRETENIMENTO + IDIOMAS</div>
        </div>

        {/* Dynamic language text */}
        <div className="ls-fade" style={{marginBottom:12,height:28,display:"flex",alignItems:"center",justifyContent:"center"}}>
          <div key={langIdx} style={{fontSize:14,color:"#a855f7",fontWeight:700,animation:"fade .4s ease"}}>{langs[langIdx]}</div>
        </div>

        {/* Headline */}
        <div className="ls-fade" style={{marginBottom:16}}>
          <h1 style={{fontFamily:"Bebas Neue",fontSize:"clamp(36px,8vw,64px)",lineHeight:1,letterSpacing:2,marginBottom:8}}>
            ANIMES, FILMES<br/>
            <span style={{background:"linear-gradient(135deg,#f97316,#a855f7)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>+ 12 IDIOMAS</span>
          </h1>
          <p style={{fontSize:15,color:"#94a3b8",maxWidth:420,margin:"0 auto",lineHeight:1.7}}>
            Assista o que você ama e aprenda idiomas ao mesmo tempo.<br/>
            <span style={{color:"#e2e8f0",fontWeight:700}}>Gratuito para começar. Sem cartão de crédito.</span>
          </p>
        </div>

        {/* CTAs */}
        <div className="ls-fade" style={{display:"flex",gap:12,flexWrap:"wrap",justifyContent:"center",marginBottom:28}}>
          <button onClick={onRegister} style={{padding:"14px 32px",background:"linear-gradient(135deg,#f97316,#ef4444)",border:"none",borderRadius:12,color:"white",fontWeight:800,cursor:"pointer",fontSize:15,boxShadow:"0 6px 24px rgba(249,115,22,.4)",letterSpacing:.5}}>
            👤 Criar Conta Grátis
          </button>
          <button onClick={onLogin} style={{padding:"14px 24px",background:"rgba(255,255,255,.06)",border:"1px solid rgba(255,255,255,.15)",borderRadius:12,color:"#e2e8f0",fontWeight:700,cursor:"pointer",fontSize:15,backdropFilter:"blur(10px)"}}>
            Já tenho conta →
          </button>
        </div>

        {/* Pricing pill */}
        <div className="ls-fade" style={{display:"inline-flex",alignItems:"center",gap:8,background:"rgba(34,197,94,.08)",border:"1px solid rgba(34,197,94,.25)",borderRadius:20,padding:"6px 16px",marginBottom:32}}>
          <span style={{fontSize:11,color:"#22c55e",fontWeight:700}}>✓ Grátis para sempre</span>
          <div style={{width:1,height:12,background:"rgba(34,197,94,.3)",display:"inline-block"}}/>
          <span style={{fontSize:11,color:"#22c55e",fontWeight:700}}>✓ Premium por R$0,99/mês</span>
          <div style={{width:1,height:12,background:"rgba(34,197,94,.3)",display:"inline-block"}}/>
          <span style={{fontSize:11,color:"#22c55e",fontWeight:700}}>✓ Cancele quando quiser</span>
        </div>

        {/* Preview cards */}
        <div className="ls-float" style={{display:"flex",gap:10,justifyContent:"center",marginBottom:24}}>
          {[
            {g:["#f97316","#b91c1c"],e:"🏴‍☠️",t:"One Piece"},
            {g:["#7c3aed","#db2777"],e:"⚔️",t:"Demon Slayer"},
            {g:["#2563eb","#7c3aed"],e:"🌠",t:"Your Name"},
          ].map((item,i)=>(
            <div key={i} style={{width:80,aspectRatio:"2/3",borderRadius:10,background:`linear-gradient(150deg,${item.g[0]},${item.g[1]})`,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:4,boxShadow:`0 ${8+i*4}px ${24+i*8}px rgba(0,0,0,.5)`,transform:`rotate(${(i-1)*4}deg)`,transition:"transform .3s"}}>
              <div style={{fontSize:28}}>{item.e}</div>
              <div style={{fontFamily:"Bebas Neue",fontSize:9,letterSpacing:.5,textAlign:"center",padding:"0 4px"}}>{item.t}</div>
            </div>
          ))}
        </div>

        {/* Scroll hint */}
        <div className="ls-pulse" style={{fontSize:11,color:"#475569"}}>↓ Veja tudo que te espera</div>
      </div>

      {/* FEATURES */}
      <div style={{padding:"60px 20px",maxWidth:900,margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:40}}>
          <div style={{fontFamily:"Bebas Neue",fontSize:32,letterSpacing:2,marginBottom:8}}>TUDO QUE VOCÊ <span style={{color:"#f97316"}}>PRECISA</span></div>
          <div style={{fontSize:13,color:"#64748b"}}>Uma plataforma. Entretenimento e aprendizado juntos.</div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))",gap:16}}>
          {features.map((f,i)=>(
            <div key={i} style={{background:"#0d0d1a",border:"1px solid #1a1a36",borderRadius:14,padding:18,transition:"border .2s"}}>
              <div style={{fontSize:28,marginBottom:10}}>{f.emoji}</div>
              <div style={{fontWeight:800,fontSize:14,marginBottom:6}}>{f.title}</div>
              <div style={{fontSize:12,color:"#64748b",lineHeight:1.6}}>{f.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* PRICING */}
      <div style={{padding:"60px 20px",background:"rgba(249,115,22,.03)",borderTop:"1px solid #1a1a36",borderBottom:"1px solid #1a1a36"}}>
        <div style={{maxWidth:700,margin:"0 auto",textAlign:"center"}}>
          <div style={{fontFamily:"Bebas Neue",fontSize:32,letterSpacing:2,marginBottom:8}}>PREÇOS <span style={{color:"#f97316"}}>JUSTOS</span></div>
          <div style={{fontSize:13,color:"#64748b",marginBottom:32}}>O menor preço do mercado. Sem surpresas.</div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:12}}>
            {[
              {emoji:"🆓",nome:"Gratuito",preco:"R$ 0",desc:"Para sempre",cor:"#64748b",items:["Catálogo básico","1 legenda","Qualidade 480p"]},
              {emoji:"💜",nome:"Premium",preco:"R$ 0,99",desc:"/mês",cor:"#f97316",items:["Legenda dupla","12 idiomas","HD 1080p","Sem anúncios"]},
              {emoji:"🤖",nome:"Agente",preco:"R$ 1,99",desc:"/mês",cor:"#a855f7",items:["ORION professor IA","Quiz ao vivo","Watch Party","4K + Offline"],popular:true},
            ].map(p=>(
              <div key={p.nome} style={{background:"#0d0d1a",border:`2px solid ${p.popular?"#a855f7":"#1a1a36"}`,borderRadius:14,padding:16,position:"relative"}}>
                {p.popular&&<div style={{position:"absolute",top:-10,left:"50%",transform:"translateX(-50%)",background:"linear-gradient(135deg,#a855f7,#6366f1)",color:"white",padding:"2px 12px",borderRadius:14,fontSize:9,fontWeight:800,whiteSpace:"nowrap"}}>⭐ MAIS POPULAR</div>}
                <div style={{fontSize:24,marginBottom:6}}>{p.emoji}</div>
                <div style={{fontFamily:"Bebas Neue",fontSize:18,color:p.cor,marginBottom:4}}>{p.nome}</div>
                <div style={{marginBottom:12}}><span style={{fontFamily:"Bebas Neue",fontSize:28}}>{p.preco}</span><span style={{fontSize:11,color:"#64748b"}}>{p.desc}</span></div>
                {p.items.map(i=><div key={i} style={{fontSize:11,color:"#94a3b8",marginBottom:4,display:"flex",alignItems:"center",gap:5}}><span style={{color:"#22c55e"}}>✓</span>{i}</div>)}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FINAL CTA */}
      <div style={{padding:"80px 20px",textAlign:"center"}}>
        <div style={{fontFamily:"Bebas Neue",fontSize:"clamp(28px,6vw,48px)",letterSpacing:2,marginBottom:12}}>
          PRONTO PARA <span style={{color:"#f97316"}}>COMEÇAR?</span>
        </div>
        <p style={{fontSize:14,color:"#64748b",marginBottom:28,maxWidth:380,margin:"0 auto 28px"}}>
          Crie sua conta grátis agora. Leva menos de 1 minuto!
        </p>
        <button onClick={onRegister} style={{padding:"16px 40px",background:"linear-gradient(135deg,#f97316,#ef4444)",border:"none",borderRadius:14,color:"white",fontWeight:800,cursor:"pointer",fontSize:16,boxShadow:"0 8px 32px rgba(249,115,22,.4)"}}>
          👤 Criar Conta Grátis Agora
        </button>
        <div style={{marginTop:12,fontSize:11,color:"#475569"}}>
          Já tem conta? <span onClick={onLogin} style={{color:"#f97316",cursor:"pointer",fontWeight:700}}>Entrar →</span>
        </div>
        <div style={{marginTop:24,fontSize:10,color:"#1e1e3a"}}>
          🔒 Seus dados são protegidos pela LGPD · Cancele quando quiser
        </div>
      </div>
    </div>
  );
}

export default function App(){
  const [page,setPage]=useState("home");
  const [plan,setPlan]=useState("agent");
  const [showCheckout,setShowCheckout]=useState(false);
  const [favorites,setFavorites]=useState(new Set([1,2,8,9]));
  const [mesesAssin,setMesesAssin]=useState(1); // meses de assinatura (virá do banco)
  const missoesFeitas = MISSIONS.filter(m=>m.done).length; // missões completas
  function toggleFav(id){
    if(!user){setAuthMode("register");setShowAuth(true);return;}
    setFavorites(p=>{const n=new Set(p);n.has(id)?n.delete(id):n.add(id);return n;});
  }
  const [checkoutPlano,setCheckoutPlano]=useState("premium");
  const [filter,setFilter]=useState("all");
  const [curr,setCurr]=useState("BRL");
  const [uiLang,setUiLang]=useState("PT"); // ← interface language
  const [sel,setSel]=useState(CATALOG[1]);
  const [audioL,setAudioL]=useState("JP");
  const [sub1,setSub1]=useState("PT");
  const [sub2,setSub2]=useState("EN");
  const [subIdx,setSubIdx]=useState(0);
  const [playing,setPlaying]=useState(false);
  const [prog,setProg]=useState(18);
  const [wmCorner,setWmCorner]=useState(0);
  const [showN,setShowN]=useState(false);
  const [showQ,setShowQ]=useState(false);
  const [qIdx,setQIdx]=useState(0);
  const [qAns,setQAns]=useState(null);
  const [xp,setXp]=useState(1250);
  const [wpOpen,setWpOpen]=useState(false);
  const [trailer,setTrailer]=useState(null);
  const [detail,setDetail]=useState(null);
  const [showAuth,setShowAuth]=useState(false);
  const [authMode,setAuthMode]=useState("login");
  const [user,setUser]=useState(null);
  const [msgs,setMsgs]=useState([]);
  const [chatIn,setChatIn]=useState("");
  const [loading,setLoading]=useState(false);
  const [orionMsgs,setOrionMsgs]=useState(0);   // contador do mês
  const ORION_LIMIT = 50;                         // limite plano Agente
  const [discMsgs,setDiscMsgs]=useState([]);
  const [discIn,setDiscIn]=useState("");
  const [discLoad,setDiscLoad]=useState(false);
  // friends system
  const [friends,setFriends]=useState([
    {id:"LS-MR92X",nome:"Mari",    flag:"🇧🇷",status:"online",  watching:"One Piece",    color:"#f97316"},
    {id:"LS-KJ77T",nome:"Kenji",   flag:"🇯🇵",status:"online",  watching:"Demon Slayer", color:"#a855f7"},
    {id:"LS-CR44P",nome:"Carlos",  flag:"🇪🇸",status:"offline", watching:null,           color:"#22c55e"},
    {id:"LS-AN19K",nome:"Ana",     flag:"🇧🇷",status:"online",  watching:"Your Name",    color:"#06b6d4"},
  ]);
  const [pendingReqs,setPendingReqs]=useState([
    {id:"LS-PT83W",nome:"Pedro",flag:"🇧🇷"},
  ]);
  const [addFriendId,setAddFriendId]=useState("");
  const [addFriendMsg,setAddFriendMsg]=useState("");
  const [copied,setCopied]=useState(false);
  const [showFriendModal,setShowFriendModal]=useState(false);
  const [inviteParty,setInviteParty]=useState(false);

  const chatRef=useRef(null);
  const discRef=useRef(null);
  const r1=useRef(),r2=useRef(),r3=useRef(),r4=useRef();

  // t = current translations
  const t = I18N[uiLang]||I18N.PT;

  // init chat messages when lang changes
  useEffect(()=>{
    setMsgs([{role:"assistant",content:t.chatGreet}]);
    setDiscMsgs([{role:"assistant",content:`🎬 ${t.discoverTitle}\n\n${t.discoverSub}`,type:"text"}]);
  },[uiLang]);

  // change currency AND ui language together
  function changeCurr(code){
    setCurr(code);
    const lang=CURR_LANG[code]||"EN";
    setUiLang(lang);
    setFilter("all");
  }

  useEffect(()=>{
    if(playing){
      r1.current=setInterval(()=>setSubIdx(i=>(i+1)%3),2500);
      r2.current=setInterval(()=>setProg(p=>{
        const next=Math.min(p+0.05,100);
        if(next>=100&&p<100){setXp(x=>x+150);} // +150 XP ao completar episódio
        return next;
      }),300);
      r3.current=setTimeout(()=>{if(plan==="agent")setShowQ(true);},9000);
    }else{[r1,r2,r3].forEach(r=>{clearInterval(r.current);clearTimeout(r.current);});}
    return()=>[r1,r2,r3].forEach(r=>{clearInterval(r.current);clearTimeout(r.current);});
  },[playing,plan]);
  useEffect(()=>{r4.current=setInterval(()=>setWmCorner(c=>(c+1)%4),12000);return()=>clearInterval(r4.current);},[]);
  useEffect(()=>{if(chatRef.current)chatRef.current.scrollTop=chatRef.current.scrollHeight;},[msgs,loading]);
  useEffect(()=>{if(discRef.current)discRef.current.scrollTop=discRef.current.scrollHeight;},[discMsgs,discLoad]);

  function go(item){setSel(item);setAudioL(item.audio[0]);setSubIdx(0);setPlaying(false);setProg(18);setShowQ(false);setDetail(null);setPage("player");}

  async function sendChat(){
    if(!chatIn.trim()||loading)return;
    if(orionMsgs >= ORION_LIMIT){
      setMsgs(p=>[...p,{role:"assistant",content:`⚠️ Você atingiu o limite de ${ORION_LIMIT} mensagens com o ORION este mês. Renova em ${new Date(new Date().getFullYear(), new Date().getMonth()+1, 1).toLocaleDateString("pt-BR")}! 🌟`}]);
      return;
    }
    const msg=chatIn.trim();setChatIn("");
    const next=[...msgs,{role:"user",content:msg}];
    setMsgs(next);setLoading(true);
    const currentSub = (window._currentSub1||"")||(window._currentSub2||"");
    const sceneCtx = currentSub ? `Current scene subtitle: "${currentSub}". ` : "";
    const text=await askClaude(next.map(m=>({role:m.role,content:m.content})),
      `You are ORION, the LinguaStream language guide — wise, trustworthy and engaging. The user "${user?.nome||"friend"}" watches "${sel?.title}" (${sel?.genre}, ${sel?.year}) with audio in ${audioL} and subtitles ${sub1}+${sub2}. ${sceneCtx}Explain vocabulary, grammar and culture contextually based on what is happening in the scene. Use emojis, be concise and fun. Sign off sometimes as ORION 🌟. Max 120 words. Respond in the user's language: ${uiLang}.`);
    setMsgs(p=>[...p,{role:"assistant",content:text}]);
    setOrionMsgs(n=>n+1);
    setLoading(false);
  }

  async function sendDiscover(){
    if(!discIn.trim()||discLoad)return;
    const msg=discIn.trim();setDiscIn("");
    setDiscMsgs(p=>[...p,{role:"user",content:msg,type:"text"}]);setDiscLoad(true);
    const TITLES=CATALOG.map(c=>`${c.title} (${c.type}, ${c.genre}, ${c.year}, rating:${c.rating})`).join("; ");
    const history=discMsgs.filter(m=>m.type==="text").map(m=>({role:m.role,content:m.content}));
    const sys=`You are ORION, the LinguaStream trusted guide and curator. Catalog: ${TITLES}.
When asked for recommendations respond with warm text AND this exact line:
RECS:[{"title":"EXACT TITLE","reason":"short reason","match":"why it fits"}]
If not a recommendation request, answer normally. Use emojis. Respond in language code: ${uiLang}.`;
    const raw=await askClaude([...history,{role:"user",content:msg}],sys);
    const m=raw.match(/RECS:(\[.*?\])/s);
    if(m){
      try{
        const recs=JSON.parse(m[1]);
        const txt=raw.replace(/RECS:.*$/s,"").trim();
        if(txt)setDiscMsgs(p=>[...p,{role:"assistant",content:txt,type:"text"}]);
        const cards=recs.map(r=>{const item=CATALOG.find(c=>c.title.toLowerCase()===r.title.toLowerCase());return item?{...r,item}:null;}).filter(Boolean);
        if(cards.length)setDiscMsgs(p=>[...p,{role:"assistant",content:cards,type:"cards"}]);
        else setDiscMsgs(p=>[...p,{role:"assistant",content:raw,type:"text"}]);
      }catch{setDiscMsgs(p=>[...p,{role:"assistant",content:raw,type:"text"}]);}
    }else setDiscMsgs(p=>[...p,{role:"assistant",content:raw,type:"text"}]);
    setDiscLoad(false);
  }

  function genId(){
    const ch="ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    return"LS-"+Array.from({length:5},()=>ch[Math.floor(Math.random()*ch.length)]).join("");
  }
  function copyId(){
    const id=user?.lsId||"LS-ZNH42";
    navigator.clipboard?.writeText(id).catch(()=>{});
    setCopied(true);setTimeout(()=>setCopied(false),2000);
  }
  function handleAuthSuccess(userData){
    const lsId=authMode==="register"?genId():"LS-ZNH42";
    setUser({...userData,lsId});
    setShowAuth(false);
  }
  function addFriend(){
    const id=addFriendId.trim().toUpperCase();
    if(!id.startsWith("LS-")||id.length<7){setAddFriendMsg("❌ ID inválido. Formato: LS-XXXXX");return;}
    if(friends.find(f=>f.id===id)){setAddFriendMsg("⚠️ Você já tem esse amigo na lista!");return;}
    if(id===user?.lsId){setAddFriendMsg("❌ Esse é o seu próprio ID!");return;}
    // simulate finding user
    const names=["Alex","Sam","Yuki","Lucas","Sofia"];
    const flags=["🇧🇷","🇺🇸","🇯🇵","🇪🇸","🇰🇷"];
    const colors=["#f97316","#a855f7","#22c55e","#06b6d4","#ef4444"];
    const ri=Math.floor(Math.random()*names.length);
    setFriends(p=>[...p,{id,nome:names[ri],flag:flags[ri],status:"online",watching:null,color:colors[ri]}]);
    setAddFriendMsg(`✅ ${names[ri]} adicionado com sucesso!`);
    setAddFriendId("");
    setTimeout(()=>setAddFriendMsg(""),3000);
  }
  function acceptReq(req){
    setFriends(p=>[...p,{...req,status:"online",watching:null,color:"#f97316"}]);
    setPendingReqs(p=>p.filter(r=>r.id!==req.id));
  }
  function rejectReq(req){setPendingReqs(p=>p.filter(r=>r.id!==req.id));}
  function answerQuiz(i){
    setQAns(i);if(i===QUIZZES[qIdx].ok)setXp(x=>x+200);
    setTimeout(()=>{setShowQ(false);setQAns(null);setQIdx(q=>(q+1)%QUIZZES.length);},1800);
  }

  const unread=NOTIFS.filter(n=>!n.read).length;
  const catalog=filter==="all"?CATALOG:CATALOG.filter(c=>c.type===filter);
  const cData=CURRENCIES.find(c=>c.code===curr);
  const WM=[{top:"12px",left:"12px"},{top:"12px",right:"12px"},{bottom:"50px",left:"12px"},{bottom:"50px",right:"12px"}][wmCorner];
  const wmOp=plan==="free"?0.38:plan==="premium"?0.14:0.06;

  function Poster({item,style={}}){
    const [e,setE]=useState(false);
    return e?<div style={{background:`linear-gradient(150deg,${item.g[0]},${item.g[1]})`,display:"flex",alignItems:"center",justifyContent:"center",...style}}><span style={{fontSize:style.fontSize||36}}>{item.emoji}</span></div>
      :<img src={item.poster} alt={item.title} onError={()=>setE(true)} style={{objectFit:"cover",...style}}/>;
  }

  /* ── CURRENCY SELECTOR used in header & plans ── */
  const CurrPicker=({style={}})=>(
    <div style={{display:"flex",gap:4,flexWrap:"wrap",...style}}>
      {CURRENCIES.map(cr=>(
        <button key={cr.code} onClick={()=>changeCurr(cr.code)} style={{padding:"2px 9px",borderRadius:14,border:`1px solid ${curr===cr.code?"rgba(249,115,22,.5)":"#1a1a36"}`,background:curr===cr.code?"rgba(249,115,22,.13)":"transparent",color:curr===cr.code?"#f97316":"#64748b",cursor:"pointer",fontWeight:700,fontSize:9,transition:"all .15s"}}>
          {cr.country}
        </button>
      ))}
    </div>
  );

  /* ── MODALS ── */
  const TrailerModal=()=>trailer?(
    <div onClick={()=>setTrailer(null)} style={{position:"fixed",inset:0,background:"rgba(0,0,0,.93)",zIndex:2000,display:"flex",alignItems:"center",justifyContent:"center",padding:16}} className="fade">
      <div onClick={e=>e.stopPropagation()} style={{width:"min(820px,95vw)",background:"#0d0d1a",borderRadius:16,overflow:"hidden",border:"1px solid #1a1a36"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"11px 16px",borderBottom:"1px solid #1a1a36"}}>
          <span style={{fontFamily:"Bebas Neue",fontSize:15,letterSpacing:1}}>{t.trailerTitle}</span>
          <button onClick={()=>setTrailer(null)} style={{background:"transparent",border:"none",color:"#64748b",fontSize:18,cursor:"pointer"}}>✕</button>
        </div>
        <div style={{position:"relative",paddingBottom:"56.25%",height:0}}>
          <iframe src={`https://www.youtube.com/embed/${trailer}?autoplay=1&rel=0&vq=hd1080`} style={{position:"absolute",top:0,left:0,width:"100%",height:"100%",border:"none"}} allow="autoplay; fullscreen" title="Trailer"/>
        </div>
        <div style={{padding:"6px 14px",borderTop:"1px solid #1a1a36",display:"flex",gap:6,alignItems:"center"}}>
          <span style={{fontSize:9,color:"#64748b",fontWeight:700}}>QUALIDADE:</span>
          {["Auto","720p","1080p","4K"].map(q=>(
            <button key={q} style={{padding:"2px 8px",background:q==="1080p"?"rgba(249,115,22,.15)":"transparent",border:`1px solid ${q==="1080p"?"rgba(249,115,22,.4)":"#1a1a36"}`,borderRadius:10,color:q==="1080p"?"#f97316":"#64748b",cursor:"pointer",fontSize:9,fontWeight:700}}>{q}</button>
          ))}
          <span style={{marginLeft:"auto",fontSize:9,color:"#64748b"}}>🔒 4K exclusivo Plano Agente</span>
        </div>
      </div>
    </div>
  ):null;

  const DetailModal=()=>detail?(
    <div onClick={()=>setDetail(null)} style={{position:"fixed",inset:0,background:"rgba(0,0,0,.88)",zIndex:1500,display:"flex",alignItems:"center",justifyContent:"center",padding:16}} className="fade">
      <div onClick={e=>e.stopPropagation()} style={{width:"min(680px,100%)",background:"#0d0d1a",borderRadius:18,overflow:"hidden",border:"1px solid #1a1a36",maxHeight:"90vh",overflowY:"auto"}}>
        <div style={{position:"relative",height:190,overflow:"hidden"}}>
          <Poster item={detail} style={{width:"100%",height:"100%",filter:"blur(2px) brightness(.38)"}}/>
          <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",gap:14,padding:"0 18px"}}>
            <div style={{width:88,height:126,borderRadius:10,overflow:"hidden",flexShrink:0,boxShadow:"0 8px 22px rgba(0,0,0,.6)"}}>
              <Poster item={detail} style={{width:"100%",height:"100%",display:"block",fontSize:38}}/>
            </div>
            <div>
              <div style={{fontFamily:"Bebas Neue",fontSize:26,letterSpacing:1,textShadow:"0 2px 8px rgba(0,0,0,.8)"}}>{detail.title}</div>
              <div style={{display:"flex",gap:5,flexWrap:"wrap",marginTop:5}}>
                <span style={{background:"rgba(249,115,22,.9)",color:"white",padding:"2px 8px",borderRadius:11,fontSize:10,fontWeight:800}}>⭐ {detail.rating}</span>
                <span style={{background:"rgba(0,0,0,.6)",padding:"2px 8px",borderRadius:11,fontSize:10}}>{detail.genre}</span>
                <span style={{background:"rgba(0,0,0,.6)",padding:"2px 8px",borderRadius:11,fontSize:10}}>{detail.year}</span>
                {detail.ep&&<span style={{background:"rgba(0,0,0,.6)",padding:"2px 8px",borderRadius:11,fontSize:10}}>{detail.ep} {t.eps}</span>}
              </div>
            </div>
          </div>
          <button onClick={()=>setDetail(null)} style={{position:"absolute",top:10,right:10,background:"rgba(0,0,0,.7)",border:"none",color:"white",fontSize:16,cursor:"pointer",borderRadius:6,padding:"2px 8px"}}>✕</button>
        </div>
        <div style={{padding:18}}>
          <p style={{fontSize:13,lineHeight:1.8,color:"#cbd5e1",marginBottom:16}}>{detail.desc}</p>
          <div style={{marginBottom:14}}>
            <div style={{fontSize:10,color:"#64748b",fontWeight:700,marginBottom:5,letterSpacing:.7}}>{t.available}</div>
            <div style={{display:"flex",gap:4,flexWrap:"wrap"}}>
              {detail.audio.map(a=>{const l=LANGS.find(x=>x.code===a);return(<span key={a} style={{background:"#111128",border:"1px solid #1a1a36",borderRadius:14,padding:"2px 9px",fontSize:11}}>{l?.flag} {l?.name}</span>);})}
            </div>
          </div>
          <div style={{display:"flex",gap:7,flexWrap:"wrap"}}>
            <button onClick={()=>go(detail)} style={{flex:1,padding:"10px",background:"linear-gradient(135deg,#f97316,#ef4444)",border:"none",borderRadius:9,color:"white",fontWeight:800,cursor:"pointer",fontSize:12}}>{t.watchNow}</button>
            {detail.trailer&&<button onClick={()=>{setDetail(null);setTrailer(detail.trailer);}} style={{padding:"10px 13px",background:"rgba(239,68,68,.1)",border:"1px solid rgba(239,68,68,.28)",borderRadius:9,color:"#ef4444",fontWeight:700,cursor:"pointer",fontSize:12}}>{t.trailer}</button>}
          </div>
        </div>
      </div>
    </div>
  ):null;

  // AuthModal is defined outside App to prevent re-render on keystroke

  /* ── NAVBAR ── */
  const Nav=()=>(
    <nav style={{background:"rgba(6,6,14,.97)",backdropFilter:"blur(20px)",borderBottom:"1px solid #1a1a36",height:54,display:"flex",alignItems:"center",padding:"0 14px",justifyContent:"space-between",position:"sticky",top:0,zIndex:999}} dir={t.dir}>
      <div style={{display:"flex",alignItems:"center",gap:6,cursor:"pointer"}} onClick={()=>setPage("home")}>
        <div style={{width:26,height:26,background:"linear-gradient(135deg,#f97316,#ef4444)",borderRadius:7,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13}}>🎬</div>
        <span style={{fontFamily:"Bebas Neue",fontSize:17,letterSpacing:1}}>LINGUA<span style={{color:"#f97316"}}>STREAM</span></span>
      </div>
      <div style={{display:"flex",gap:2}}>
        {[["home",0],["discover",1],["plans",2],["profile",3]].map(([p,i])=>(
          <button key={p} onClick={()=>setPage(p)} style={{background:page===p?"rgba(249,115,22,.14)":"transparent",border:page===p?"1px solid rgba(249,115,22,.4)":"1px solid transparent",color:page===p?"#f97316":"#64748b",padding:"4px 9px",borderRadius:7,cursor:"pointer",fontWeight:700,fontSize:10,transition:"all .15s"}}>{t.nav[i]}</button>
        ))}
      </div>
      <div style={{display:"flex",alignItems:"center",gap:6}}>
        {/* Language indicator */}
        <div style={{background:"rgba(168,85,247,.09)",border:"1px solid rgba(168,85,247,.22)",borderRadius:16,padding:"2px 7px",fontSize:9,fontWeight:800,color:"#a855f7"}}>
          {LANGS.find(l=>l.code===uiLang)?.flag} {uiLang}
        </div>
        <div style={{display:"flex",gap:3,background:"rgba(249,115,22,.09)",border:"1px solid rgba(249,115,22,.22)",borderRadius:16,padding:"2px 7px",fontSize:10,fontWeight:800,color:"#f97316"}}>🔥7 {t.streakLabel}</div>
        <div style={{display:"flex",gap:3,background:"rgba(168,85,247,.09)",border:"1px solid rgba(168,85,247,.22)",borderRadius:16,padding:"2px 7px",fontSize:10,fontWeight:800,color:"#a855f7"}}>⚡{xp}XP</div>
        <div style={{position:"relative"}} onClick={e=>{e.stopPropagation();setShowN(!showN)}}>
          <div style={{width:30,height:30,background:"#0d0d1a",border:"1px solid #1a1a36",borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",fontSize:13}}>🔔</div>
          {unread>0&&<div style={{position:"absolute",top:-3,right:-3,width:14,height:14,background:"#ef4444",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:8,fontWeight:800,color:"white"}}>{unread}</div>}
          {showN&&(
            <div style={{position:"absolute",right:0,top:36,width:260,background:"#111128",border:"1px solid #1a1a36",borderRadius:11,zIndex:1000,overflow:"hidden"}} className="fade">
              {NOTIFS.map(n=>(
                <div key={n.id} style={{padding:"9px 13px",borderBottom:"1px solid #0d0d1a",display:"flex",gap:7,background:n.read?"transparent":"rgba(249,115,22,.05)"}}>
                  <div style={{width:5,height:5,background:n.read?"transparent":"#f97316",borderRadius:"50%",marginTop:4,flexShrink:0}}/>
                  <div><div style={{fontSize:11,lineHeight:1.4}}>{n.text}</div><div style={{fontSize:9,color:"#64748b",marginTop:1}}>{n.time}</div></div>
                </div>
              ))}
            </div>
          )}
        </div>
        {user
          ?<div onClick={()=>setPage("profile")} style={{width:30,height:30,background:"linear-gradient(135deg,#f97316,#a855f7)",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900,fontSize:11,cursor:"pointer"}}>{user.nome[0].toUpperCase()}</div>
          :<button onClick={()=>{setAuthMode("login");setShowAuth(true);}} style={{background:"linear-gradient(135deg,#f97316,#ef4444)",border:"none",color:"white",padding:"5px 11px",borderRadius:7,fontWeight:800,cursor:"pointer",fontSize:10}}>{t.signin}</button>
        }
      </div>
    </nav>
  );

  /* ── HOME ── */
  const Home=()=>(
    <div className="langFade">
      <div style={{position:"relative",padding:"28px 14px 22px",overflow:"hidden"}}>
        <div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse at 20% 50%,rgba(249,115,22,.1) 0%,transparent 55%),radial-gradient(ellipse at 80% 50%,rgba(168,85,247,.07) 0%,transparent 55%)"}}/>
        <div style={{maxWidth:1080,margin:"0 auto",position:"relative",display:"flex",gap:22,alignItems:"center",flexWrap:"wrap"}}>
          <div style={{flex:1,minWidth:240}}>
            <div style={{display:"inline-flex",alignItems:"center",gap:4,background:"rgba(249,115,22,.11)",border:"1px solid rgba(249,115,22,.28)",borderRadius:18,padding:"2px 10px",fontSize:10,fontWeight:800,color:"#f97316",marginBottom:9}}>🌍 {t.tagline}</div>
            <h1 style={{fontFamily:"Bebas Neue",fontSize:44,lineHeight:.98,letterSpacing:1,marginBottom:9}}>{t.heroTitle}<br/><span style={{background:"linear-gradient(135deg,#f97316,#a855f7)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>{t.heroSpan}</span></h1>
            <p style={{color:"#64748b",lineHeight:1.6,marginBottom:14,fontSize:12,maxWidth:380}}>{t.heroDesc}</p>
            <div style={{display:"flex",gap:7,flexWrap:"wrap",marginBottom:14}}>
              <button onClick={()=>{setAuthMode("register");setShowAuth(true);}} style={{background:"linear-gradient(135deg,#f97316,#ef4444)",border:"none",color:"white",padding:"9px 15px",borderRadius:9,fontWeight:800,cursor:"pointer",fontSize:12,boxShadow:"0 4px 18px rgba(249,115,22,.35)"}}>{t.startFree}</button>
              <button onClick={()=>setPage("discover")} style={{background:"rgba(168,85,247,.1)",border:"1px solid rgba(168,85,247,.3)",color:"#a855f7",padding:"9px 15px",borderRadius:9,fontWeight:700,cursor:"pointer",fontSize:12}}>{t.recommend}</button>
            </div>
            <CurrPicker/>
          </div>
          <div style={{display:"flex",gap:8,flexShrink:0,alignItems:"flex-end"}}>
            {CATALOG.slice(0,3).map((item,i)=>(
              <div key={item.id} className="hov" onClick={()=>setDetail(item)} style={{width:i===1?136:108,borderRadius:11,overflow:"hidden",position:"relative",boxShadow:"0 14px 34px rgba(0,0,0,.55)",transform:i===1?"translateY(-8px)":"none"}}>
                <Poster item={item} style={{width:"100%",aspectRatio:"2/3",display:"block",fontSize:34}}/>
                <div style={{position:"absolute",bottom:0,left:0,right:0,background:"linear-gradient(transparent,rgba(0,0,0,.92))",padding:"16px 7px 7px"}}>
                  <div style={{fontFamily:"Bebas Neue",fontSize:11}}>{item.title}</div>
                  <div style={{fontSize:9,color:"rgba(255,255,255,.4)"}}>⭐{item.rating}</div>
                </div>
                {item.isNew&&<div style={{position:"absolute",top:5,right:5,background:"#ef4444",color:"white",padding:"1px 5px",borderRadius:14,fontSize:8,fontWeight:800}}>{t.newBadge}</div>}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={{maxWidth:1080,margin:"0 auto",padding:"0 14px 36px"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
          <h2 style={{fontFamily:"Bebas Neue",fontSize:19,letterSpacing:1}}>{t.catalog}</h2>
          <div style={{display:"flex",gap:4}}>
            {[["all",t.all],["anime",t.anime],["movie",t.movies],["series",t.series]].map(([f,l])=>(
              <button key={f} onClick={()=>setFilter(f)} style={{background:filter===f?"rgba(249,115,22,.12)":"transparent",border:`1px solid ${filter===f?"rgba(249,115,22,.4)":"#1a1a36"}`,color:filter===f?"#f97316":"#64748b",padding:"3px 9px",borderRadius:16,cursor:"pointer",fontWeight:700,fontSize:10}}>{l}</button>
            ))}
          </div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(122px,1fr))",gap:9}}>
          {catalog.map(item=>(
            <div key={item.id} className="hov" onClick={()=>setDetail(item)} style={{borderRadius:9,overflow:"hidden",position:"relative",background:`linear-gradient(150deg,${item.g[0]},${item.g[1]})`}}>
              <Poster item={item} style={{width:"100%",aspectRatio:"2/3",display:"block",fontSize:30}}/>
              <div style={{position:"absolute",bottom:0,left:0,right:0,background:"linear-gradient(transparent,rgba(0,0,0,.92))",padding:"18px 7px 6px"}}>
                <div style={{fontFamily:"Bebas Neue",fontSize:11,lineHeight:1.2}}>{item.title}</div>
                <div style={{fontSize:9,color:"rgba(255,255,255,.4)",marginTop:1}}>⭐{item.rating}</div>
              </div>
              {item.isNew&&<div style={{position:"absolute",top:5,right:5,background:"#ef4444",color:"white",padding:"1px 4px",borderRadius:12,fontSize:7,fontWeight:800}}>{t.newBadge}</div>}
              {item.hot&&<div style={{position:"absolute",top:5,left:5,background:"rgba(249,115,22,.88)",color:"white",padding:"1px 4px",borderRadius:12,fontSize:7,fontWeight:800}}>🔥</div>}
              <div onClick={e=>{e.stopPropagation();toggleFav(item.id);}} style={{position:"absolute",bottom:28,right:5,fontSize:14,cursor:"pointer",filter:"drop-shadow(0 1px 2px rgba(0,0,0,.5))"}}>{favorites.has(item.id)?"❤️":"🤍"}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  /* ── DISCOVER ── */
  const Discover=()=>(
    <div style={{maxWidth:760,margin:"0 auto",padding:"18px 14px",height:"calc(100vh - 90px)",display:"flex",flexDirection:"column"}} className="langFade">
      <div style={{textAlign:"center",marginBottom:11}}>
        <div style={{fontFamily:"Bebas Neue",fontSize:26,letterSpacing:1}}>{t.discoverTitle.split(" IA")[0]} <span style={{background:"linear-gradient(135deg,#a855f7,#6366f1)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>IA</span></div>
        <p style={{color:"#64748b",fontSize:11,marginTop:2}}>{t.discoverSub}</p>
      </div>
      <div style={{display:"flex",gap:5,flexWrap:"wrap",justifyContent:"center",marginBottom:11}}>
        {t.suggestions.map(s=>(
          <button key={s} onClick={()=>setDiscIn(s.slice(3))} style={{background:"rgba(168,85,247,.08)",border:"1px solid rgba(168,85,247,.2)",color:"#a855f7",padding:"3px 9px",borderRadius:14,cursor:"pointer",fontSize:10,fontWeight:600}}>{s}</button>
        ))}
      </div>
      <div ref={discRef} style={{flex:1,overflowY:"auto",display:"flex",flexDirection:"column",gap:11,paddingBottom:6}}>
        {discMsgs.map((m,i)=>(
          <div key={i} style={{display:"flex",justifyContent:m.role==="user"?"flex-end":"flex-start",alignItems:"flex-start",gap:7}} className="fade">
            {m.role==="assistant"&&<div style={{width:25,height:25,background:"linear-gradient(135deg,#a855f7,#6366f1)",borderRadius:7,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,flexShrink:0,marginTop:2}}>🤖</div>}
            {m.type==="text"&&<div style={{maxWidth:"80%",background:m.role==="user"?"linear-gradient(135deg,#f97316,#ef4444)":"#111128",border:m.role==="assistant"?"1px solid #1a1a36":"none",borderRadius:m.role==="user"?"11px 11px 3px 11px":"11px 11px 11px 3px",padding:"9px 12px",fontSize:12,lineHeight:1.6,whiteSpace:"pre-line"}}>{m.content}</div>}
            {m.type==="cards"&&(
              <div style={{display:"flex",flexDirection:"column",gap:10,maxWidth:"calc(100% - 34px)"}}>
                {m.content.map((rec,ri)=>(
                  <div key={ri} style={{background:"#111128",border:"1px solid #1a1a36",borderRadius:13,overflow:"hidden",display:"flex"}} className="slide">
                    <div style={{width:80,flexShrink:0}}>
                      <Poster item={rec.item} style={{width:"100%",height:"100%",display:"block",aspectRatio:"2/3",fontSize:28}}/>
                    </div>
                    <div style={{padding:"10px 12px",flex:1,minWidth:0}}>
                      <div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}>
                        <div><div style={{fontFamily:"Bebas Neue",fontSize:14}}>{rec.item.title}</div><div style={{fontSize:9,color:"#64748b"}}>⭐{rec.item.rating} • {rec.item.year}</div></div>
                        <span style={{fontSize:15,flexShrink:0,marginLeft:5}}>{rec.item.emoji}</span>
                      </div>
                      <div style={{fontSize:10,color:"#a855f7",fontWeight:700,marginBottom:3}}>💡 {rec.reason}</div>
                      <div style={{fontSize:10,color:"#94a3b8",lineHeight:1.5,marginBottom:7}}>{rec.item.desc.slice(0,100)}...</div>
                      <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
                        <button onClick={()=>setDetail(rec.item)} style={{background:"linear-gradient(135deg,#f97316,#ef4444)",border:"none",color:"white",padding:"3px 9px",borderRadius:6,fontWeight:700,cursor:"pointer",fontSize:10}}>{t.details}</button>
                        {rec.item.trailer&&<button onClick={()=>setTrailer(rec.item.trailer)} style={{background:"rgba(239,68,68,.1)",border:"1px solid rgba(239,68,68,.22)",color:"#ef4444",padding:"3px 9px",borderRadius:6,fontWeight:700,cursor:"pointer",fontSize:10}}>{t.trailer}</button>}
                        <button onClick={()=>go(rec.item)} style={{background:"rgba(34,197,94,.08)",border:"1px solid rgba(34,197,94,.2)",color:"#22c55e",padding:"3px 9px",borderRadius:6,fontWeight:700,cursor:"pointer",fontSize:10}}>{t.watchNow}</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
        {discLoad&&<div style={{display:"flex",alignItems:"center",gap:7,color:"#64748b",fontSize:11}}><div className="spin" style={{width:11,height:11,border:"2px solid #1a1a36",borderTopColor:"#a855f7",borderRadius:"50%"}}/>{ t.thinking}</div>}
      </div>
      <div style={{display:"flex",gap:7,marginTop:9}}>
        <input value={discIn} onChange={e=>setDiscIn(e.target.value)} onKeyDown={e=>e.key==="Enter"&&sendDiscover()} placeholder={t.discoverPlaceholder} style={{flex:1,background:"#111128",border:"1px solid #1a1a36",borderRadius:10,padding:"10px 12px",color:"#e2e8f0",fontSize:12,outline:"none"}}/>
        <button onClick={sendDiscover} disabled={discLoad} style={{width:42,background:"linear-gradient(135deg,#a855f7,#6366f1)",border:"none",borderRadius:10,color:"white",cursor:"pointer",fontSize:16,display:"flex",alignItems:"center",justifyContent:"center"}}>
          {discLoad?<div className="spin" style={{width:13,height:13,border:"2px solid rgba(255,255,255,.3)",borderTopColor:"white",borderRadius:"50%"}}/>:"→"}
        </button>
      </div>
    </div>
  );

  /* ── PLAYER ── */
  const Player=()=>(
    <div style={{maxWidth:1160,margin:"0 auto",padding:"13px 14px",display:"flex",gap:11,flexWrap:"wrap"}}>
      <div style={{flex:1,minWidth:0}}>
        <div style={{background:`linear-gradient(155deg,${sel.g[0]}22,#06060e 70%)`,borderRadius:13,aspectRatio:"16/9",position:"relative",overflow:"hidden",border:"1px solid #1a1a36",display:"flex",alignItems:"center",justifyContent:"center",marginBottom:7}}>
          <div style={{position:"absolute",inset:0,overflow:"hidden"}}><Poster item={sel} style={{width:"100%",height:"100%",opacity:.12,filter:"blur(4px)",display:"block"}}/></div>
          <div style={{position:"relative",textAlign:"center",opacity:playing?.15:1,transition:"opacity .4s",pointerEvents:"none"}}>
            <div style={{fontSize:58}}>{sel.emoji}</div>
            <div style={{fontFamily:"Bebas Neue",fontSize:18,letterSpacing:1,marginTop:3}}>{sel.title}</div>
          </div>
          {!playing&&(
            <div onClick={()=>setPlaying(true)} style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",flexDirection:"column",gap:8}}>
              <div style={{width:54,height:54,background:"rgba(249,115,22,.92)",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,boxShadow:"0 0 22px rgba(249,115,22,.5)"}}>▶</div>
              {sel.trailer&&<button onClick={e=>{e.stopPropagation();setTrailer(sel.trailer);}} style={{background:"rgba(239,68,68,.14)",border:"1px solid rgba(239,68,68,.35)",color:"#ef4444",padding:"4px 12px",borderRadius:15,fontWeight:700,cursor:"pointer",fontSize:11}}>{t.trailer}</button>}
            </div>
          )}
          {playing&&(
            <div style={{position:"absolute",bottom:36,left:"50%",transform:"translateX(-50%)",textAlign:"center",width:"88%",pointerEvents:"none"}} className="fade">
              <div style={{background:"rgba(0,0,0,.84)",borderRadius:6,padding:"3px 10px",marginBottom:3,display:"inline-block",fontSize:12,fontWeight:700}}>{SUBS[sub1]?.[subIdx]||""}</div><br/>
              <div style={{background:"rgba(0,0,0,.64)",borderRadius:6,padding:"2px 8px",display:"inline-block",fontSize:11,color:"#94a3b8"}}>{SUBS[sub2]?.[subIdx]||""}</div>
            </div>
          )}
          <div style={{position:"absolute",...WM,opacity:wmOp,pointerEvents:"none",transition:"all 3s ease",display:"flex",alignItems:"center",gap:3}}>
            <div style={{width:11,height:11,background:"linear-gradient(135deg,#f97316,#ef4444)",borderRadius:3,fontSize:6,display:"flex",alignItems:"center",justifyContent:"center"}}>🎬</div>
            <span style={{fontFamily:"Bebas Neue",fontSize:8,color:"white",letterSpacing:.7}}>LINGUA<span style={{color:"#f97316"}}>STREAM</span></span>
          </div>
          {playing&&<div onClick={()=>setPlaying(false)} style={{position:"absolute",top:8,right:8,background:"rgba(0,0,0,.6)",borderRadius:5,padding:"2px 7px",fontSize:10,cursor:"pointer",color:"#94a3b8"}}>⏸</div>}
          {showQ&&plan==="agent"&&(
            <div style={{position:"absolute",inset:0,background:"rgba(6,6,14,.88)",display:"flex",alignItems:"center",justifyContent:"center"}} className="fade">
              <div style={{background:"#111128",border:"1px solid #1a1a36",borderRadius:14,padding:17,maxWidth:288,width:"90%"}}>
                <div style={{textAlign:"center",marginBottom:8}}><div style={{fontSize:16}}>{t.quiz}</div><div style={{fontSize:10,color:"#a855f7",fontWeight:800}}>{t.correct}</div></div>
                <div style={{fontWeight:700,textAlign:"center",marginBottom:8,fontSize:12,lineHeight:1.4}}>{QUIZZES[qIdx].q}</div>
                <div style={{display:"flex",flexDirection:"column",gap:5}}>
                  {QUIZZES[qIdx].opts.map((opt,i)=>(
                    <button key={i} onClick={()=>answerQuiz(i)} disabled={qAns!==null} style={{padding:"7px 10px",borderRadius:7,border:`2px solid ${qAns===null?"#1a1a36":i===QUIZZES[qIdx].ok?"#22c55e":qAns===i?"#ef4444":"#1a1a36"}`,background:qAns===null?"transparent":i===QUIZZES[qIdx].ok?"rgba(34,197,94,.12)":qAns===i?"rgba(239,68,68,.12)":"transparent",color:"#e2e8f0",cursor:qAns===null?"pointer":"default",fontWeight:700,fontSize:11,textAlign:"left"}}>{opt}</button>
                  ))}
                </div>
                <button onClick={()=>setShowQ(false)} style={{marginTop:6,width:"100%",padding:"5px",background:"transparent",border:"1px solid #1a1a36",borderRadius:6,color:"#64748b",cursor:"pointer",fontSize:10}}>{t.skip}</button>
              </div>
            </div>
          )}
        </div>
        <div style={{height:3,background:"#1a1a36",borderRadius:2,marginBottom:7,cursor:"pointer"}}><div style={{height:"100%",width:`${prog}%`,background:"linear-gradient(90deg,#f97316,#a855f7)",borderRadius:2,transition:"width .3s"}}/></div>
        <div style={{background:"#0d0d1a",borderRadius:10,padding:"11px 13px",border:"1px solid #1a1a36",marginBottom:7}}>
          <div style={{marginBottom:9}}>
            <div style={{fontSize:9,color:"#64748b",fontWeight:800,marginBottom:5,letterSpacing:.7}}>{t.audio} {plan!=="agent"&&<span style={{color:"#1a1a36",fontSize:8}}>— {t.exclusive}</span>}</div>
            <div style={{display:"flex",gap:3,flexWrap:"wrap"}}>
              {LANGS.map(l=>{const has=sel.audio.includes(l.code);const ok=plan==="agent"&&has;const act=audioL===l.code&&ok;
                return(<button key={l.code} onClick={()=>ok?setAudioL(l.code):setPage("plans")} style={{display:"flex",alignItems:"center",gap:2,padding:"2px 7px",borderRadius:14,border:`1px solid ${act?"rgba(249,115,22,.6)":"#1a1a36"}`,background:act?"rgba(249,115,22,.14)":"transparent",color:ok?(act?"#f97316":"#94a3b8"):"#1a1a36",cursor:has?"pointer":"default",fontSize:10,fontWeight:600,opacity:has?1:.3}}>{l.flag} {l.name}{has&&!ok&&<span style={{fontSize:8}}>🔒</span>}</button>);
              })}
            </div>
          </div>
          <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
            {[[t.sub1,sub1,setSub1,"#a855f7"],[t.sub2,sub2,setSub2,"#6366f1"]].map(([lbl,val,setter,col])=>(
              <div key={lbl} style={{flex:1,minWidth:150}}>
                <div style={{fontSize:9,color:"#64748b",fontWeight:800,marginBottom:4,letterSpacing:.7}}>{lbl}</div>
                <div style={{display:"flex",gap:3,flexWrap:"wrap"}}>
                  {LANGS.map(l=>(
                    <button key={l.code} onClick={()=>setter(l.code)} title={l.name} style={{padding:"2px 6px",borderRadius:12,border:`1px solid ${val===l.code?col+"88":"#1a1a36"}`,background:val===l.code?col+"20":"transparent",color:val===l.code?col:"#64748b",cursor:"pointer",fontSize:10}}>{l.flag}</button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <WatchParty plan={plan} setPage={setPage} t={t}/>
      </div>
      <div style={{width:272,flexShrink:0,display:"flex",flexDirection:"column",gap:9}}>
        <div style={{background:"#0d0d1a",borderRadius:10,padding:11,border:"1px solid #1a1a36"}}>
          <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:7}}>
            <div style={{width:50,height:68,borderRadius:7,overflow:"hidden",flexShrink:0}}>
              <Poster item={sel} style={{width:"100%",height:"100%",display:"block",fontSize:20}}/>
            </div>
            <div style={{flex:1,minWidth:0}}>
              <div style={{fontFamily:"Bebas Neue",fontSize:13,letterSpacing:.5}}>{sel.title}</div>
              <div style={{fontSize:9,color:"#64748b"}}>⭐{sel.rating} • {sel.year}</div>
              <p style={{fontSize:10,color:"#94a3b8",lineHeight:1.4,marginTop:3}}>{sel.desc.slice(0,75)}...</p>
            </div>
          </div>
          {sel.trailer&&<button onClick={()=>setTrailer(sel.trailer)} style={{width:"100%",padding:"5px",background:"rgba(239,68,68,.09)",border:"1px solid rgba(239,68,68,.2)",borderRadius:6,color:"#ef4444",fontWeight:700,cursor:"pointer",fontSize:10}}>{t.trailer}</button>}
        </div>
        <div style={{background:"#0d0d1a",borderRadius:10,border:"1px solid #1a1a36",display:"flex",flexDirection:"column",flex:1,minHeight:310}}>
          <div style={{padding:"8px 11px",borderBottom:"1px solid #1a1a36",display:"flex",alignItems:"center",gap:6}}>
            <div style={{width:22,height:22,background:"linear-gradient(135deg,#a855f7,#6366f1)",borderRadius:6,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11}}>🤖</div>
            <div style={{flex:1}}>
              <div style={{fontWeight:800,fontSize:11}}>ORION</div>
              <div style={{fontSize:8,color:"#22c55e",fontWeight:700}}>{t.online}</div>
            </div>
            {plan==="agent"&&(
              <div style={{fontSize:8,color:orionMsgs>=ORION_LIMIT?"#ef4444":orionMsgs>=40?"#f97316":"#64748b",fontWeight:700,textAlign:"right"}}>
                {orionMsgs}/{ORION_LIMIT}<br/>msgs
              </div>
            )}
            {plan!=="agent"&&<button onClick={()=>setPage("plans")} style={{marginLeft:"auto",background:"linear-gradient(135deg,#a855f7,#6366f1)",border:"none",color:"white",padding:"2px 7px",borderRadius:12,fontSize:9,fontWeight:800,cursor:"pointer"}}>{t.activate}</button>}
          </div>
          <div ref={chatRef} style={{flex:1,overflowY:"auto",padding:9,display:"flex",flexDirection:"column",gap:7,maxHeight:240}}>
            {msgs.map((m,i)=>(
              <div key={i} style={{display:"flex",justifyContent:m.role==="user"?"flex-end":"flex-start"}}>
                <div style={{maxWidth:"88%",padding:"5px 9px",borderRadius:m.role==="user"?"9px 9px 3px 9px":"9px 9px 9px 3px",background:m.role==="user"?"linear-gradient(135deg,#f97316,#ef4444)":"#111128",border:m.role==="assistant"?"1px solid #1a1a36":"none",fontSize:11,lineHeight:1.5}}>{m.content}</div>
              </div>
            ))}
            {loading&&<div style={{display:"flex",alignItems:"center",gap:4,color:"#64748b",fontSize:10}}><div className="spin" style={{width:9,height:9,border:"2px solid #1a1a36",borderTopColor:"#a855f7",borderRadius:"50%"}}/>...</div>}
          </div>
          <div style={{padding:"7px 9px",borderTop:"1px solid #1a1a36",display:"flex",gap:4}}>
            <input value={chatIn} onChange={e=>setChatIn(e.target.value)} onKeyDown={e=>e.key==="Enter"&&(plan==="agent"?sendChat():setPage("plans"))} placeholder={plan==="agent"?t.chatPlaceholder:t.chatLocked} disabled={plan!=="agent"} style={{flex:1,background:"#111128",border:"1px solid #1a1a36",borderRadius:6,padding:"5px 7px",color:"#e2e8f0",fontSize:10,outline:"none",opacity:plan!=="agent"?.35:1}}/>
            <button onClick={()=>plan==="agent"?sendChat():setPage("plans")} style={{width:26,height:26,background:"linear-gradient(135deg,#a855f7,#6366f1)",border:"none",borderRadius:6,color:"white",cursor:"pointer",fontSize:11,display:"flex",alignItems:"center",justifyContent:"center"}}>
              {loading?<div className="spin" style={{width:10,height:10,border:"2px solid rgba(255,255,255,.3)",borderTopColor:"white",borderRadius:"50%"}}/>:"→"}
            </button>
          </div>
        </div>
        <div style={{background:"#0d0d1a",borderRadius:10,padding:10,border:"1px solid #1a1a36"}}>
          <div style={{display:"flex",justifyContent:"space-between",fontSize:10,fontWeight:700,marginBottom:3}}><span>⚡{xp}XP</span><span style={{color:"#64748b"}}>Lv.12</span></div>
          <div style={{height:3,background:"#1a1a36",borderRadius:2,overflow:"hidden"}}><div style={{height:"100%",width:"62%",background:"linear-gradient(90deg,#f97316,#a855f7)",borderRadius:2}}/></div>
        </div>
      </div>
    </div>
  );

  /* ── PLANS ── */
  const Plans=()=>(
    <div style={{maxWidth:800,margin:"0 auto",padding:"22px 14px"}} className="langFade">
      <div style={{textAlign:"center",marginBottom:18}}>
        <h1 style={{fontFamily:"Bebas Neue",fontSize:30,letterSpacing:1,marginBottom:3}}>{t.plans}</h1>
        <p style={{color:"#64748b",fontSize:11}}>{t.cancelAny}</p>
        <CurrPicker style={{justifyContent:"center",marginTop:11}}/>
      </div>

      {/* Desconto atual do usuário */}
      {user&&calcDescontoTotal(mesesAssin,missoesFeitas).total>0&&(
        <div style={{background:"linear-gradient(135deg,rgba(34,197,94,.08),rgba(249,115,22,.08))",border:"1px solid rgba(34,197,94,.25)",borderRadius:12,padding:13,marginBottom:16,textAlign:"center"}} className="fade">
          <div style={{fontSize:11,fontWeight:800,color:"#22c55e",marginBottom:4}}>🎉 SEU DESCONTO ATUAL</div>
          <div style={{display:"flex",justifyContent:"center",gap:10,flexWrap:"wrap",marginBottom:6}}>
            {calcDescontoTotal(mesesAssin,missoesFeitas).tempo.perc>0&&<div style={{fontSize:12,color:"#22c55e",fontWeight:800}}>⏱️ {calcDescontoTotal(mesesAssin,missoesFeitas).tempo.perc}% fidelidade ({mesesAssin} {mesesAssin===1?"mês":"meses"})</div>}
            {calcDescontoTotal(mesesAssin,missoesFeitas).miss.perc>0&&<div style={{fontSize:12,color:"#f97316",fontWeight:800}}>🎯 {calcDescontoTotal(mesesAssin,missoesFeitas).miss.perc}% missões</div>}
          </div>
          <div style={{fontFamily:"Bebas Neue",fontSize:24,color:"white",letterSpacing:1}}>
            DESCONTO TOTAL: <span style={{color:"#22c55e"}}>{calcDescontoTotal(mesesAssin,missoesFeitas).total}% OFF</span>
          </div>
          <div style={{fontSize:10,color:"#64748b",marginTop:3}}>Aplicado automaticamente na renovação</div>
        </div>
      )}

      {/* Tabela de descontos progressivos */}
      <div style={{background:"#0d0d1a",border:"1px solid #1a1a36",borderRadius:12,padding:14,marginBottom:16}}>
        <div style={{fontFamily:"Bebas Neue",fontSize:14,letterSpacing:1,marginBottom:10,textAlign:"center"}}>📈 DESCONTO PROGRESSIVO — QUANTO MAIS TEMPO, MAIS VOCÊ ECONOMIZA</div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(90px,1fr))",gap:6}}>
          {TABELA_DESCONTOS.map(tier=>(
            <div key={tier.range} style={{textAlign:"center",padding:"7px 5px",borderRadius:8,background:tier.destaque?"rgba(249,115,22,.1)":mesesAssin>0&&calcDescontoPorTempo(mesesAssin).perc>=tier.desc&&tier.desc>0?"rgba(34,197,94,.1)":"rgba(255,255,255,.02)",border:`1px solid ${tier.destaque?"rgba(249,115,22,.3)":mesesAssin>0&&calcDescontoPorTempo(mesesAssin).perc>=tier.desc&&tier.desc>0?"rgba(34,197,94,.3)":"#1a1a36"}`}}>
              <div style={{fontSize:9,color:"#64748b",marginBottom:2}}>{tier.range}</div>
              <div style={{fontFamily:"Bebas Neue",fontSize:16,color:tier.desc===0?"#475569":tier.destaque?"#f97316":"#22c55e"}}>{tier.desc===0?"—":`${tier.desc}%`}</div>
            </div>
          ))}
        </div>
        <div style={{marginTop:10,padding:"8px 10px",background:"rgba(168,85,247,.06)",border:"1px solid rgba(168,85,247,.2)",borderRadius:8}}>
          <div style={{fontSize:10,fontWeight:800,color:"#a855f7",marginBottom:4}}>🎯 + DESCONTO POR MISSÕES</div>
          <div style={{fontSize:10,color:"#94a3b8",lineHeight:1.6}}>
            Complete <span style={{color:"#f97316",fontWeight:800}}>todas as missões do mês</span> = <span style={{color:"#f97316",fontWeight:800}}>+10% de desconto</span> permanente<br/>
            <span style={{color:"#64748b"}}>Exemplo: todas missões + 2 anos = <span style={{color:"#22c55e",fontWeight:800}}>50% de desconto total 🏆</span></span><br/>
            <span style={{color:"#a855f7",fontSize:9}}>Teto máximo: 40% (tempo) + 10% (missões) = 50% OFF</span>
          </div>
        </div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(215px,1fr))",gap:11}}>
        {[
          {key:"free",    lbl:t.free,    sym:"",        price:"0",       col:"#64748b",emoji:"🆓",  inc:t.inc.free,  no:t.no.free},
          {key:"premium", lbl:t.premium, sym:cData?.sym,price:cData?.p1,col:"#f97316",emoji:"💜",  inc:t.inc.prem,  no:t.no.prem,  suf:t.month},
          {key:"agent",   lbl:t.agent,   sym:cData?.sym,price:cData?.p2,col:"#a855f7",emoji:"🤖",  inc:t.inc.agent, no:t.no.agent, suf:t.month,pop:true},
        ].map(p=>(
          <div key={p.key} style={{background:"#0d0d1a",border:`2px solid ${plan===p.key?p.col:"#1a1a36"}`,borderRadius:13,padding:15,position:"relative",transition:"border .18s"}}>
            {p.pop&&<div style={{position:"absolute",top:-9,left:"50%",transform:"translateX(-50%)",background:"linear-gradient(135deg,#a855f7,#6366f1)",color:"white",padding:"2px 11px",borderRadius:14,fontSize:9,fontWeight:800,whiteSpace:"nowrap"}}>{t.mostPop}</div>}
            <div style={{textAlign:"center",marginBottom:11}}>
              <div style={{fontSize:23,marginBottom:2}}>{p.emoji}</div>
              <div style={{fontFamily:"Bebas Neue",fontSize:17,color:p.col,letterSpacing:1}}>{p.lbl}</div>
              <div style={{marginTop:3}}>
                {p.key!=="free"&&calcDescontoTotal(mesesAssin,missoesFeitas).total>0&&(
                  <div style={{fontSize:10,color:"#64748b",textDecoration:"line-through"}}>{p.sym}{p.price}</div>
                )}
                <span style={{fontFamily:"Bebas Neue",fontSize:30,color:p.key!=="free"&&calcDescontoTotal(mesesAssin,missoesFeitas).total>0?"#22c55e":"white"}}>
                  {p.key==="free"?"0":`${p.sym}${p.key!=="free"?(parseFloat((p.price||"0").replace(",","."))*( 1-calcDescontoTotal(mesesAssin,missoesFeitas).total/100)).toFixed(2).replace(".",","):"0"}`}
                </span>
                {p.suf&&<span style={{color:"#64748b",fontSize:10}}>{p.suf}</span>}
                {p.key!=="free"&&calcDescontoTotal(mesesAssin,missoesFeitas).total>0&&(
                  <div style={{fontSize:9,color:"#22c55e",fontWeight:800}}>{calcDescontoTotal(mesesAssin,missoesFeitas).total}% OFF 🎉</div>
                )}
              </div>
              {p.key!=="free"&&(
                <div style={{marginTop:6,background:"rgba(34,197,94,.07)",border:"1px solid rgba(34,197,94,.2)",borderRadius:8,padding:"5px 8px"}}>
                  <div style={{fontSize:9,color:"#22c55e",fontWeight:800,marginBottom:3}}>📈 DESCONTO PROGRESSIVO</div>
                  <div style={{display:"flex",gap:4,flexWrap:"wrap"}}>
                    {[
                      {m:"2º mês","d":"5%"},
                      {m:"3º mês","d":"10%"},
                      {m:"6º mês","d":"15%"},
                      {m:"1 ano", "d":"20%"},
                      {m:"2 anos","d":"25%"},
                    ].map(t=>(
                      <div key={t.m} style={{fontSize:8,color:"#22c55e",background:"rgba(34,197,94,.08)",borderRadius:5,padding:"1px 5px",fontWeight:700}}>{t.m}: {t.d}</div>
                    ))}
                  </div>
                  <div style={{fontSize:8,color:"#475569",marginTop:3}}>💡 Quanto mais tempo, mais barato fica!</div>
                </div>
              )}
            </div>
            <div style={{marginBottom:11}}>
              {p.inc.map(f=><div key={f} style={{display:"flex",alignItems:"center",gap:5,marginBottom:4,fontSize:10}}><span style={{color:"#22c55e",flexShrink:0}}>✓</span>{f}</div>)}
              {p.no.map(f=><div key={f} style={{display:"flex",alignItems:"center",gap:5,marginBottom:4,fontSize:10,color:"#1e1e3a"}}><span style={{flexShrink:0}}>✗</span>{f}</div>)}
            </div>
            <button onClick={()=>{
                if(plan===p.key) return;
                if(p.key==="free"){
                  if(!user){setAuthMode("register");setShowAuth(true);}
                  return;
                }
                if(p.key==="basic"){
                  if(!user){setAuthMode("register");setShowAuth(true);return;}
                  setCheckoutPlano("basic");
                  setShowCheckout(true);
                  return;
                }
                if(!user){setAuthMode("register");setShowAuth(true);return;}
                setCheckoutPlano(p.key);
                setShowCheckout(true);
              }} style={{width:"100%",padding:"8px",background:plan===p.key?`linear-gradient(135deg,${p.col},${p.key==="agent"?"#6366f1":"#ef4444"})`:"transparent",border:`1px solid ${p.col}`,borderRadius:8,color:plan===p.key?"white":p.col,fontWeight:800,cursor:"pointer",fontSize:11}}>
              {plan===p.key?t.activePlan:p.key==="free"?(user?"✓ Plano Atual":(t.signup||"Criar Conta")):`${t.subscribe||"Assinar"} ${p.lbl}`}
            </button>
          </div>
        ))}
      </div>
      <div style={{textAlign:"center",marginTop:11,color:"#1e1e3a",fontSize:9}}>{t.secure}</div>
    </div>
  );

  /* ── PROFILE ── */
  const Profile=()=>{
    const myId = user?.lsId||"LS-ZNH42";
    const [tab,setTab]=useState("amigos");
    return(
    <div style={{maxWidth:860,margin:"0 auto",padding:"18px 14px"}} className="langFade">

      {/* ── CARD DO USUÁRIO com ID ── */}
      <div style={{background:"#0d0d1a",borderRadius:13,padding:15,border:"1px solid #1a1a36",marginBottom:11}}>
        <div style={{display:"flex",gap:11,alignItems:"center",flexWrap:"wrap",marginBottom:12}}>
          <div style={{width:52,height:52,background:"linear-gradient(135deg,#f97316,#a855f7)",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900,fontSize:21,flexShrink:0}}>{(user?.nome||"Z")[0].toUpperCase()}</div>
          <div style={{flex:1}}>
            <div style={{fontFamily:"Bebas Neue",fontSize:19,letterSpacing:1}}>{user?.nome||"ZINHO"}</div>
            <div style={{display:"flex",gap:8,fontSize:10,color:"#94a3b8",marginTop:2,flexWrap:"wrap"}}>
              <span>⚡{xp}XP</span><span>🔥7 {t.streakLabel}</span><span>👥{friends.length} amigos</span>
              {user?.wp&&<span style={{color:"#25d366",fontWeight:700}}>📲 WhatsApp ✓</span>}
            </div>
            <div style={{marginTop:5,maxWidth:200}}>
              <div style={{height:3,background:"#1a1a36",borderRadius:2,overflow:"hidden"}}><div style={{height:"100%",width:"62%",background:"linear-gradient(90deg,#f97316,#a855f7)",borderRadius:2}}/></div>
              <div style={{fontSize:8,color:"#64748b",marginTop:1}}>62% → Nível 13</div>
            </div>
          </div>
          <div style={{padding:"3px 9px",borderRadius:14,background:plan==="agent"?"linear-gradient(135deg,#a855f7,#6366f1)":"linear-gradient(135deg,#f97316,#ef4444)",color:"white",fontSize:9,fontWeight:800,alignSelf:"flex-start"}}>{plan==="agent"?`🤖 ${t.agent}`:`💜 ${t.premium}`}</div>
        </div>

        {/* ── MEU ID ── */}
        <div style={{background:"linear-gradient(135deg,rgba(249,115,22,.08),rgba(168,85,247,.08))",border:"1px solid rgba(249,115,22,.25)",borderRadius:11,padding:"11px 14px"}}>
          <div style={{fontSize:9,color:"#64748b",fontWeight:800,letterSpacing:.8,marginBottom:5}}>🆔 MEU ID LINGUASTREAM</div>
          <div style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap"}}>
            <div style={{fontFamily:"Bebas Neue",fontSize:26,letterSpacing:3,color:"#f97316",background:"rgba(249,115,22,.08)",border:"1px solid rgba(249,115,22,.2)",borderRadius:9,padding:"4px 14px"}}>{myId}</div>
            <button onClick={copyId} style={{padding:"6px 12px",background:copied?"rgba(34,197,94,.15)":"rgba(249,115,22,.1)",border:`1px solid ${copied?"rgba(34,197,94,.4)":"rgba(249,115,22,.3)"}`,borderRadius:8,color:copied?"#22c55e":"#f97316",fontWeight:800,cursor:"pointer",fontSize:10,transition:"all .2s"}}>
              {copied?"✅ Copiado!":"📋 Copiar ID"}
            </button>
            <button onClick={()=>{
              if(navigator.share){navigator.share({title:"LinguaStream",text:`Meu ID: ${myId}`,url:"https://linguastream.app"});}
              else copyId();
            }} style={{padding:"6px 12px",background:"rgba(168,85,247,.1)",border:"1px solid rgba(168,85,247,.25)",borderRadius:8,color:"#a855f7",fontWeight:800,cursor:"pointer",fontSize:10}}>
              📤 Compartilhar
            </button>
          </div>
          <div style={{fontSize:9,color:"#475569",marginTop:6}}>Compartilhe seu ID com amigos para conectar e assistir juntos na Watch Party 👥</div>
        </div>
      </div>

      {/* ── TABS ── */}
      <div style={{display:"flex",background:"#0d0d1a",borderRadius:10,padding:3,gap:2,marginBottom:11,border:"1px solid #1a1a36"}}>
        {[["amigos","👥 Amigos"],["missoes","🎯 Missões"],["conquistas","🏆 Conquistas"],["stats","📊 Stats"]].map(([k,l])=>(
          <button key={k} onClick={()=>setTab(k)} style={{flex:1,padding:"6px",borderRadius:8,border:"none",background:tab===k?"linear-gradient(135deg,#f97316,#a855f7)":"transparent",color:tab===k?"white":"#64748b",fontWeight:700,cursor:"pointer",fontSize:10,transition:"all .15s"}}>{l}</button>
        ))}
      </div>

      {/* ── TAB AMIGOS ── */}
      {tab==="amigos"&&(
        <div style={{display:"flex",flexDirection:"column",gap:11}} className="fade">
          {/* Adicionar amigo */}
          <div style={{background:"#0d0d1a",borderRadius:12,padding:14,border:"1px solid #1a1a36"}}>
            <div style={{fontFamily:"Bebas Neue",fontSize:14,letterSpacing:1,marginBottom:10}}>➕ ADICIONAR AMIGO POR ID</div>
            <div style={{display:"flex",gap:7}}>
              <input value={addFriendId} onChange={e=>setAddFriendId(e.target.value.toUpperCase())}
                onKeyDown={e=>e.key==="Enter"&&addFriend()}
                placeholder="Cole o ID aqui — ex: LS-KJ77T"
                style={{flex:1,background:"#111128",border:"1px solid #1a1a36",borderRadius:8,padding:"8px 11px",color:"#e2e8f0",fontSize:12,outline:"none",letterSpacing:1,fontWeight:700}}/>
              <button onClick={addFriend} style={{padding:"8px 14px",background:"linear-gradient(135deg,#f97316,#ef4444)",border:"none",borderRadius:8,color:"white",fontWeight:800,cursor:"pointer",fontSize:11}}>Adicionar</button>
            </div>
            {addFriendMsg&&<div style={{marginTop:6,fontSize:11,color:addFriendMsg.startsWith("✅")?"#22c55e":addFriendMsg.startsWith("⚠")?"#f97316":"#ef4444",fontWeight:700}}>{addFriendMsg}</div>}
          </div>

          {/* Pedidos pendentes */}
          {pendingReqs.length>0&&(
            <div style={{background:"#0d0d1a",borderRadius:12,padding:14,border:"1px solid rgba(249,115,22,.3)"}} className="fade">
              <div style={{fontFamily:"Bebas Neue",fontSize:14,letterSpacing:1,marginBottom:9,color:"#f97316"}}>🔔 SOLICITAÇÕES ({pendingReqs.length})</div>
              {pendingReqs.map(req=>(
                <div key={req.id} style={{display:"flex",alignItems:"center",gap:9,marginBottom:8,padding:"8px 10px",background:"rgba(249,115,22,.06)",border:"1px solid rgba(249,115,22,.15)",borderRadius:9}}>
                  <div style={{width:32,height:32,background:"linear-gradient(135deg,#f97316,#a855f7)",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900,fontSize:13,flexShrink:0}}>{req.nome[0]}</div>
                  <div style={{flex:1}}>
                    <div style={{fontWeight:700,fontSize:12}}>{req.flag} {req.nome}</div>
                    <div style={{fontSize:9,color:"#64748b"}}>{req.id}</div>
                  </div>
                  <button onClick={()=>acceptReq(req)} style={{padding:"4px 10px",background:"rgba(34,197,94,.15)",border:"1px solid rgba(34,197,94,.3)",borderRadius:7,color:"#22c55e",fontWeight:700,cursor:"pointer",fontSize:10}}>✓ Aceitar</button>
                  <button onClick={()=>rejectReq(req)} style={{padding:"4px 10px",background:"rgba(239,68,68,.1)",border:"1px solid rgba(239,68,68,.2)",borderRadius:7,color:"#ef4444",fontWeight:700,cursor:"pointer",fontSize:10}}>✕</button>
                </div>
              ))}
            </div>
          )}

          {/* Lista de amigos */}
          <div style={{background:"#0d0d1a",borderRadius:12,padding:14,border:"1px solid #1a1a36"}}>
            <div style={{fontFamily:"Bebas Neue",fontSize:14,letterSpacing:1,marginBottom:10}}>👥 MEUS AMIGOS ({friends.length})</div>
            {friends.map(f=>(
              <div key={f.id} style={{display:"flex",alignItems:"center",gap:9,marginBottom:9,paddingBottom:9,borderBottom:"1px solid #111128"}}>
                <div style={{position:"relative",flexShrink:0}}>
                  <div style={{width:36,height:36,background:f.color,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900,fontSize:14}}>{f.nome[0]}</div>
                  <div style={{position:"absolute",bottom:0,right:0,width:10,height:10,background:f.status==="online"?"#22c55e":"#475569",borderRadius:"50%",border:"2px solid #0d0d1a"}}/>
                </div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{display:"flex",alignItems:"center",gap:5}}>
                    <span style={{fontWeight:700,fontSize:12}}>{f.flag} {f.nome}</span>
                    <span style={{fontSize:9,color:"#475569",background:"rgba(255,255,255,.04)",border:"1px solid #1a1a36",borderRadius:8,padding:"1px 5px"}}>{f.id}</span>
                  </div>
                  {f.status==="online"&&f.watching
                    ?<div style={{fontSize:9,color:"#22c55e",display:"flex",alignItems:"center",gap:3}}><span style={{width:5,height:5,background:"#22c55e",borderRadius:"50%",display:"inline-block"}}/>Assistindo: <b>{f.watching}</b></div>
                    :<div style={{fontSize:9,color:"#475569"}}>{f.status==="online"?"🟢 Online":"⚫ Offline"}</div>
                  }
                </div>
                <div style={{display:"flex",gap:4}}>
                  {f.status==="online"&&f.watching&&(
                    <button onClick={()=>alert(`Convite enviado para ${f.nome}! 🎉`)} style={{padding:"4px 8px",background:"rgba(168,85,247,.12)",border:"1px solid rgba(168,85,247,.3)",borderRadius:7,color:"#a855f7",fontWeight:700,cursor:"pointer",fontSize:9}}>👥 Party</button>
                  )}
                  <button onClick={()=>alert(`Mensagem para ${f.nome} — em breve! 💬`)} style={{padding:"4px 8px",background:"rgba(249,115,22,.08)",border:"1px solid rgba(249,115,22,.2)",borderRadius:7,color:"#f97316",fontWeight:700,cursor:"pointer",fontSize:9}}>💬</button>
                </div>
              </div>
            ))}
            {friends.length===0&&<div style={{textAlign:"center",color:"#475569",fontSize:12,padding:"20px 0"}}>Nenhum amigo ainda. Compartilhe seu ID! 👆</div>}
          </div>
        </div>
      )}

      {/* ── TAB MISSÕES ── */}
      {tab==="missoes"&&(
        <div style={{background:"#0d0d1a",borderRadius:12,padding:14,border:"1px solid #1a1a36"}} className="fade">
          <div style={{fontFamily:"Bebas Neue",fontSize:15,letterSpacing:1,marginBottom:11}}>{t.missions}</div>
          {MISSIONS.map(m=>(
            <div key={m.id} style={{marginBottom:11,paddingBottom:11,borderBottom:"1px solid #111128"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
                <div style={{fontSize:11,fontWeight:700}}>{m.emoji} {m.title}</div>
                <div style={{fontSize:9,color:m.done?"#22c55e":"#f97316",fontWeight:800}}>{m.done?"✓":m.reward}</div>
              </div>
              <div style={{height:3,background:"#1a1a36",borderRadius:2,overflow:"hidden"}}><div style={{height:"100%",width:`${(m.prog/m.total)*100}%`,background:m.done?"#22c55e":"linear-gradient(90deg,#f97316,#a855f7)",borderRadius:2}}/></div>
              <div style={{fontSize:9,color:"#64748b",marginTop:2}}>{m.prog}/{m.total}</div>
            </div>
          ))}
        </div>
      )}

      {/* ── TAB CONQUISTAS ── */}
      {tab==="conquistas"&&(
        <div style={{background:"#0d0d1a",borderRadius:12,padding:14,border:"1px solid #1a1a36"}} className="fade">
          <div style={{fontFamily:"Bebas Neue",fontSize:15,letterSpacing:1,marginBottom:11}}>{t.achievements}</div>
          <div style={{display:"flex",gap:7,flexWrap:"wrap"}}>
            {[["🏴‍☠️","Pirata","Assistiu One Piece"],["🔥","7 Dias","Streak de 7 dias"],["🎌","JP Iniciante","5h em japonês"],["⚔️","Maratonista","Completou uma série"],["👥","Social","Primeira Watch Party"],["🌠","Cinéfilo","10 filmes assistidos"],["🤖","ORION Fã","50 perguntas ao ORION"],["🌍","Polímata","3 idiomas usados"]].map(([e,l,d])=>(
              <div key={l} style={{background:"#111128",border:"1px solid #1a1a36",borderRadius:9,padding:"9px 10px",textAlign:"center",width:80}}>
                <div style={{fontSize:22}}>{e}</div>
                <div style={{fontSize:9,fontWeight:800,marginTop:3}}>{l}</div>
                <div style={{fontSize:8,color:"#475569",marginTop:2,lineHeight:1.3}}>{d}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── TAB STATS ── */}
      {tab==="stats"&&(
        <div style={{display:"flex",flexDirection:"column",gap:11}} className="fade">
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:11}}>
            {/* Favoritos */}
          <div style={{background:"#0d0d1a",borderRadius:12,padding:14,border:"1px solid #1a1a36",marginBottom:11}}>
            <div style={{fontFamily:"Bebas Neue",fontSize:15,letterSpacing:1,marginBottom:9}}>❤️ MEUS FAVORITOS — Recebendo notificações WhatsApp</div>
            <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
              {CATALOG.filter(c=>favorites.has(c.id)).map(item=>(
                <div key={item.id} style={{display:"flex",alignItems:"center",gap:6,background:"rgba(239,68,68,.07)",border:"1px solid rgba(239,68,68,.2)",borderRadius:8,padding:"5px 9px"}}>
                  <span style={{fontSize:14}}>{item.emoji}</span>
                  <span style={{fontSize:11,fontWeight:700}}>{item.title}</span>
                  <button onClick={()=>toggleFav(item.id)} style={{background:"transparent",border:"none",color:"#ef4444",cursor:"pointer",fontSize:11,padding:0}}>✕</button>
                </div>
              ))}
              {favorites.size===0&&<div style={{fontSize:11,color:"#475569"}}>Curta títulos para receber novidades pelo WhatsApp! ❤️</div>}
            </div>
            {favorites.size>0&&user?.wp&&(
              <div style={{marginTop:8,fontSize:10,color:"#25d366",display:"flex",alignItems:"center",gap:4}}>
                📲 Você receberá atualizações desses {favorites.size} título(s) pelo WhatsApp
              </div>
            )}
            {favorites.size>0&&!user?.wp&&(
              <div style={{marginTop:8,fontSize:10,color:"#f97316",display:"flex",alignItems:"center",gap:4}}>
                ⚠️ Ative o WhatsApp no cadastro para receber notificações
              </div>
            )}
          </div>
          {[["🎌","Palavras Japonês","247"],["🇺🇸","Horas em Inglês","38h"],["📺","Episódios","312"],["🎬","Filmes","18"],["🤖","Perguntas ORION","94"],["👥","Watch Parties","7"],["🔥","Streak Máximo","12d"],["🌍","Idiomas usados","3"]].map(([e,l,v])=>(
              <div key={l} style={{background:"#0d0d1a",borderRadius:11,padding:13,border:"1px solid #1a1a36",display:"flex",alignItems:"center",gap:9}}>
                <div style={{fontSize:22}}>{e}</div>
                <div>
                  <div style={{fontFamily:"Bebas Neue",fontSize:20,color:"#f97316",letterSpacing:.5}}>{v}</div>
                  <div style={{fontSize:9,color:"#64748b"}}>{l}</div>
                </div>
              </div>
            ))}
          </div>
          {/* Configurações de notificações */}
          <NotifSettings user={user} t={t}/>
        </div>
      )}
    </div>
  );};

  // Show landing page if not logged in
  if(!user) return(
    <>
      <LandingPage
        onRegister={()=>{setAuthMode("register");setShowAuth(true);}}
        onLogin={()=>{setAuthMode("login");setShowAuth(true);}}
      />
      <AuthModal
        show={showAuth}
        onClose={()=>setShowAuth(false)}
        authMode={authMode}
        setAuthMode={setAuthMode}
        onSuccess={handleAuthSuccess}
        t={t}
      />
    </>
  );

  return(
    <div style={{minHeight:"100vh",background:"#06060e"}} onClick={()=>showN&&setShowN(false)}>
      <style>{CSS}</style>
      <Nav/>
      <TrailerModal/>
      <DetailModal/>
      <AuthModal
        show={showAuth}
        onClose={()=>setShowAuth(false)}
        authMode={authMode}
        setAuthMode={setAuthMode}
        onSuccess={handleAuthSuccess}
        t={t}
      />
      {showCheckout&&(
        <div style={{position:"fixed",inset:0,zIndex:3000,overflowY:"auto"}}>
          <MercadoPago
            planoSelecionado={checkoutPlano}
            onSuccess={(p)=>{setPlan(p);setShowCheckout(false);}}
            onBack={()=>setShowCheckout(false)}
          />
        </div>
      )}
      <div className="fade" key={page}>
        {page==="home"    &&<Home/>}
        {page==="player"  &&<Player/>}
        {page==="discover"&&<Discover/>}
        {page==="plans"   &&<Plans/>}
        {page==="profile" &&<Profile/>}
      </div>
    </div>
  );
}
