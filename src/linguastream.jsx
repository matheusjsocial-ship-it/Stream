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
  {code:"BRL",sym:"R$",p0:"0,99", p1:"1,99", p2:"9,99", country:"🇧🇷 Brasil"},
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
  const [hovPlan, setHovPlan] = React.useState(null);

  const langs = [
    {flag:"🇧🇷",lang:"Português",word:"Nakama",meaning:"Companheiro"},
    {flag:"🇯🇵",lang:"日本語",   word:"仲間",  meaning:"Nakama"},
    {flag:"🇺🇸",lang:"English",  word:"Dream", meaning:"Sonho"},
    {flag:"🇰🇷",lang:"한국어",   word:"친구",  meaning:"Amigo"},
    {flag:"🇪🇸",lang:"Español",  word:"Sueño", meaning:"Sonho"},
  ];

  React.useEffect(()=>{
    const t=setInterval(()=>setLangIdx(i=>(i+1)%langs.length),2200);
    return()=>clearInterval(t);
  },[]);

  const PLANOS_LAND=[
    {emoji:"🆓",nome:"Gratuito",preco:"R$0",suf:"para sempre",cor:"#64748b",
     items:["Catálogo básico","1 legenda","480p","Com anúncios"]},
    {emoji:"📺",nome:"Básico",preco:"R$0,99",suf:"/mês",cor:"#22c55e",
     items:["Sem anúncios","Legenda dupla PT+EN+JP","720p"]},
    {emoji:"💜",nome:"Premium",preco:"R$1,99",suf:"/mês",cor:"#f97316",
     items:["ORION Professor IA","Legenda dupla 12 idiomas","HD 1080p","Watch Party"]},
    {emoji:"🤖",nome:"Agente",preco:"R$9,99",suf:"/mês",cor:"#a855f7",
     items:["ORION ilimitado","Áudio 12 idiomas","4K + Download","Watch Party ilimitada"],popular:true},
  ];

  const FEATURES=[
    {icon:"🤖",title:"ORION — Professor IA 24h",
     desc:"Tire dúvidas de vocabulário, gramática e cultura em tempo real enquanto assiste. Disponível em 12 idiomas.",
     tag:"Exclusivo Premium+",tagCol:"#f97316"},
    {icon:"📝",title:"Legendas Duplas Simultâneas",
     desc:"Veja dois idiomas ao mesmo tempo. Aprenda japonês enquanto lê a tradução em português. Método comprovado.",
     tag:"12 idiomas",tagCol:"#22c55e"},
    {icon:"🌍",title:"Interface em 12 Idiomas",
     desc:"O site inteiro muda de idioma quando você troca o país. Aprenda imerso desde o primeiro clique.",
     tag:"Imersão total",tagCol:"#06b6d4"},
    {icon:"👥",title:"Watch Party Multilíngue",
     desc:"Assista com amigos do mundo todo ao mesmo tempo. Chat com tradução automática pelo ORION.",
     tag:"Social",tagCol:"#a855f7"},
    {icon:"🎯",title:"Missões que Dão Desconto",
     desc:"Complete missões e ganhe descontos reais na assinatura. Quanto mais você aprende, menos você paga.",
     tag:"Gamificação",tagCol:"#ef4444"},
    {icon:"📲",title:"Notificações pelo WhatsApp",
     desc:"Saiba quando seus animes favoritos lançarem novos episódios. Seu ORION pessoal no celular.",
     tag:"WhatsApp",tagCol:"#25d366"},
  ];

  const DEPOIMENTOS=[
    {nome:"Ana K.",flag:"🇧🇷",texto:"Aprendi mais japonês em 1 mês assistindo Demon Slayer do que em 2 anos de curso!",nota:5},
    {nome:"Carlos M.",flag:"🇲🇽",texto:"El ORION me explica cada expresión en tiempo real. Es como tener un profesor 24/7.",nota:5},
    {nome:"Yuki T.",flag:"🇯🇵",texto:"私のポルトガル語が大幅に上達しました！コンテンツを楽しみながら学べます。",nota:5},
    {nome:"Sarah L.",flag:"🇺🇸",texto:"Best R$1.99 I ever spent. The dual subtitles are a game changer for language learning.",nota:5},
  ];

  const Star=()=><span style={{color:"#f97316",fontSize:12}}>★</span>;

  return(
    <div style={{minHeight:"100vh",background:"#06060e",color:"#e2e8f0",fontFamily:"Nunito,sans-serif",overflowX:"hidden"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Nunito:wght@400;600;700;800;900&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        @keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        @keyframes float{0%,100%{transform:translateY(0) rotate(-3deg)}50%{transform:translateY(-10px) rotate(3deg)}}
        @keyframes floatR{0%,100%{transform:translateY(0) rotate(3deg)}50%{transform:translateY(-8px) rotate(-2deg)}}
        @keyframes glow{0%,100%{box-shadow:0 0 20px rgba(168,85,247,.3)}50%{box-shadow:0 0 40px rgba(168,85,247,.6)}}
        @keyframes scroll{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:.5}}
        @keyframes langFade{0%{opacity:0;transform:translateY(8px)}20%{opacity:1;transform:translateY(0)}80%{opacity:1;transform:translateY(0)}100%{opacity:0;transform:translateY(-8px)}}
        .ls-fadeUp{animation:fadeUp .6s ease forwards}
        .ls-float{animation:float 4s ease-in-out infinite}
        .ls-floatR{animation:floatR 3.5s ease-in-out infinite}
        .ls-glow{animation:glow 3s ease infinite}
        .ls-pulse{animation:pulse 2s ease infinite}
        .ls-card:hover{transform:translateY(-6px) scale(1.02);transition:transform .25s ease}
        .ls-card{transition:transform .25s ease}
      `}</style>

      {/* ══ NAVBAR ══ */}
      <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:100,background:"rgba(6,6,14,.9)",backdropFilter:"blur(20px)",borderBottom:"1px solid rgba(255,255,255,.06)",padding:"0 20px",height:56,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <div style={{width:30,height:30,background:"linear-gradient(135deg,#f97316,#ef4444)",borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",fontSize:15}}>🎬</div>
          <span style={{fontFamily:"Bebas Neue",fontSize:20,letterSpacing:2}}>LINGUA<span style={{color:"#f97316"}}>STREAM</span></span>
        </div>
        <div style={{display:"flex",gap:8}}>
          <button onClick={onLogin} style={{background:"transparent",border:"1px solid rgba(255,255,255,.15)",color:"#e2e8f0",padding:"7px 16px",borderRadius:8,cursor:"pointer",fontWeight:700,fontSize:12}}>Entrar</button>
          <button onClick={onRegister} style={{background:"linear-gradient(135deg,#f97316,#ef4444)",border:"none",color:"white",padding:"7px 16px",borderRadius:8,cursor:"pointer",fontWeight:800,fontSize:12}}>Criar conta</button>
        </div>
      </nav>

      {/* ══ HERO ══ */}
      <section style={{minHeight:"100vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"80px 20px 60px",position:"relative",overflow:"hidden",textAlign:"center"}}>
        {/* BG effects */}
        <div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse at 30% 40%,rgba(249,115,22,.1),transparent 55%),radial-gradient(ellipse at 70% 60%,rgba(168,85,247,.08),transparent 55%)",pointerEvents:"none"}}/>
        {/* Anime-style speed lines */}
        <div style={{position:"absolute",inset:0,background:"repeating-linear-gradient(90deg,transparent,transparent 49px,rgba(249,115,22,.03) 50px)",pointerEvents:"none"}}/>

        {/* Floating cards */}
        <div className="ls-float" style={{position:"absolute",left:"5%",top:"25%",width:70,aspectRatio:"2/3",borderRadius:10,background:"linear-gradient(150deg,#f97316,#b91c1c)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:26,boxShadow:"0 12px 30px rgba(0,0,0,.5)",border:"1px solid rgba(255,255,255,.1)"}}>🏴‍☠️</div>
        <div className="ls-floatR" style={{position:"absolute",right:"5%",top:"30%",width:65,aspectRatio:"2/3",borderRadius:10,background:"linear-gradient(150deg,#7c3aed,#db2777)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,boxShadow:"0 12px 30px rgba(0,0,0,.5)",border:"1px solid rgba(255,255,255,.1)"}}>⚔️</div>
        <div className="ls-float" style={{position:"absolute",left:"8%",bottom:"20%",width:60,aspectRatio:"2/3",borderRadius:10,background:"linear-gradient(150deg,#2563eb,#7c3aed)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,boxShadow:"0 12px 30px rgba(0,0,0,.5)",border:"1px solid rgba(255,255,255,.1)",animationDelay:"1s"}}>🌠</div>
        <div className="ls-floatR" style={{position:"absolute",right:"8%",bottom:"25%",width:58,aspectRatio:"2/3",borderRadius:10,background:"linear-gradient(150deg,#d97706,#ea580c)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,boxShadow:"0 12px 30px rgba(0,0,0,.5)",border:"1px solid rgba(255,255,255,.1)",animationDelay:"0.5s"}}>🏮</div>

        {/* Language pill */}
        <div key={langIdx} style={{marginBottom:16,animation:"langFade 2.2s ease infinite"}}>
          <div style={{display:"inline-flex",alignItems:"center",gap:8,background:"rgba(255,255,255,.05)",border:"1px solid rgba(255,255,255,.1)",borderRadius:20,padding:"6px 16px"}}>
            <span style={{fontSize:16}}>{langs[langIdx].flag}</span>
            <span style={{fontSize:12,color:"#94a3b8"}}>{langs[langIdx].lang}:</span>
            <span style={{fontFamily:"Bebas Neue",fontSize:16,letterSpacing:1,color:"#f97316"}}>{langs[langIdx].word}</span>
            <span style={{fontSize:10,color:"#475569"}}>= {langs[langIdx].meaning}</span>
          </div>
        </div>

        {/* Main headline */}
        <h1 style={{fontFamily:"Bebas Neue",fontSize:"clamp(42px,9vw,80px)",lineHeight:.95,letterSpacing:2,marginBottom:16,maxWidth:700}} className="ls-fadeUp">
          APRENDA IDIOMAS<br/>
          <span style={{background:"linear-gradient(135deg,#f97316,#a855f7)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>ASSISTINDO ANIME</span><br/>
          E MUITO MAIS
        </h1>

        <p style={{fontSize:"clamp(14px,2.5vw,17px)",color:"#94a3b8",maxWidth:480,lineHeight:1.7,marginBottom:24}} className="ls-fadeUp">
          Professor IA, legendas duplas em <strong style={{color:"#e2e8f0"}}>12 idiomas</strong>, Watch Party multilíngue e muito mais — por menos do que um café.
        </p>

        {/* CTAs */}
        <div style={{display:"flex",gap:12,flexWrap:"wrap",justifyContent:"center",marginBottom:28}} className="ls-fadeUp">
          <button onClick={onRegister} style={{padding:"14px 32px",background:"linear-gradient(135deg,#f97316,#ef4444)",border:"none",borderRadius:12,color:"white",fontWeight:800,cursor:"pointer",fontSize:15,boxShadow:"0 6px 24px rgba(249,115,22,.4)",letterSpacing:.3}}>
            👤 Criar conta grátis
          </button>
          <button onClick={onLogin} style={{padding:"14px 22px",background:"rgba(255,255,255,.06)",border:"1px solid rgba(255,255,255,.12)",borderRadius:12,color:"#e2e8f0",fontWeight:700,cursor:"pointer",fontSize:15}}>
            Já tenho conta →
          </button>
        </div>

        {/* Trust badges */}
        <div style={{display:"flex",gap:16,flexWrap:"wrap",justifyContent:"center",marginBottom:16}}>
          {[["✓ Grátis para sempre","#22c55e"],["✓ Sem cartão de crédito","#22c55e"],["✓ Premium por R$1,99/mês","#f97316"]].map(([t,col])=>(
            <div key={t} style={{fontSize:11,color:col,fontWeight:700}}>{t}</div>
          ))}
        </div>

        {/* Scrolling catalog */}
        <div style={{width:"100%",overflow:"hidden",marginTop:16,maskImage:"linear-gradient(90deg,transparent,black 15%,black 85%,transparent)"}}>
          <div style={{display:"flex",gap:10,animation:"scroll 20s linear infinite",width:"max-content"}}>
            {[...Array(2)].map((_,rep)=>(
              [["🏴‍☠️","One Piece","#f97316","#b91c1c"],["⚔️","Demon Slayer","#7c3aed","#db2777"],["⚡","Attack on Titan","#374151","#111827"],["🌀","Jujutsu Kaisen","#4f46e5","#7c3aed"],["🦑","Squid Game","#be185d","#e11d48"],["🧪","Breaking Bad","#4d7c0f","#15803d"],["🌌","Interstellar","#0369a1","#1e3a8a"],["🏮","Spirited Away","#d97706","#ea580c"],["🌠","Your Name","#2563eb","#7c3aed"],["⚽","Blue Lock","#1d4ed8","#0369a1"],["🪲","Parasite","#475569","#1e293b"],["🍥","Naruto","#d97706","#dc2626"]].map(([e,t,g1,g2])=>(
                <div key={`${rep}-${t}`} style={{width:55,height:80,borderRadius:8,background:`linear-gradient(150deg,${g1},${g2})`,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:3,flexShrink:0,border:"1px solid rgba(255,255,255,.08)"}}>
                  <div style={{fontSize:20}}>{e}</div>
                  <div style={{fontFamily:"Bebas Neue",fontSize:7,letterSpacing:.5,textAlign:"center",padding:"0 2px",lineHeight:1.2}}>{t}</div>
                </div>
              ))
            ))}
          </div>
        </div>
      </section>

      {/* ══ ORION DESTAQUE ══ */}
      <section style={{padding:"80px 20px",background:"rgba(168,85,247,.04)",borderTop:"1px solid rgba(168,85,247,.1)",borderBottom:"1px solid rgba(168,85,247,.1)"}}>
        <div style={{maxWidth:900,margin:"0 auto",display:"flex",gap:40,alignItems:"center",flexWrap:"wrap",justifyContent:"center"}}>
          <div className="ls-glow" style={{width:140,height:140,background:"linear-gradient(135deg,#a855f7,#6366f1)",borderRadius:32,display:"flex",alignItems:"center",justifyContent:"center",fontSize:64,flexShrink:0}}>🤖</div>
          <div style={{flex:1,minWidth:260}}>
            <div style={{display:"inline-flex",alignItems:"center",gap:6,background:"rgba(168,85,247,.12)",border:"1px solid rgba(168,85,247,.3)",borderRadius:20,padding:"4px 12px",fontSize:10,fontWeight:800,color:"#a855f7",marginBottom:10}}>✨ EXCLUSIVO LINGUASTREAM</div>
            <h2 style={{fontFamily:"Bebas Neue",fontSize:"clamp(28px,5vw,44px)",letterSpacing:2,marginBottom:10,lineHeight:1}}>
              ORION<br/><span style={{color:"#a855f7"}}>SEU PROFESSOR IA</span>
            </h2>
            <p style={{fontSize:14,color:"#94a3b8",lineHeight:1.8,marginBottom:16,maxWidth:440}}>
              Enquanto você assiste, o ORION explica vocabulário, gramática e curiosidades culturais em tempo real. Como ter um professor particular disponível 24 horas, direto no seu celular.
            </p>
            <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
              {["🇯🇵 Japonês","🇰🇷 Coreano","🇺🇸 Inglês","🇪🇸 Espanhol","🇫🇷 Francês","+ 7 mais"].map(l=>(
                <div key={l} style={{background:"rgba(168,85,247,.08)",border:"1px solid rgba(168,85,247,.2)",borderRadius:20,padding:"4px 10px",fontSize:11,color:"#a855f7",fontWeight:700}}>{l}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ FEATURES ══ */}
      <section style={{padding:"80px 20px"}}>
        <div style={{maxWidth:960,margin:"0 auto"}}>
          <div style={{textAlign:"center",marginBottom:44}}>
            <div style={{fontFamily:"Bebas Neue",fontSize:"clamp(26px,5vw,40px)",letterSpacing:2,marginBottom:6}}>TUDO QUE VOCÊ <span style={{color:"#f97316"}}>PRECISA</span></div>
            <div style={{fontSize:13,color:"#64748b"}}>Uma plataforma. Entretenimento e aprendizado juntos.</div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:16}}>
            {FEATURES.map((f,i)=>(
              <div key={i} className="ls-card" style={{background:"#0d0d1a",border:"1px solid #1a1a36",borderRadius:16,padding:20}}>
                <div style={{fontSize:32,marginBottom:10}}>{f.icon}</div>
                <div style={{display:"inline-flex",alignItems:"center",background:`${f.tagCol}15`,border:`1px solid ${f.tagCol}40`,borderRadius:10,padding:"2px 8px",fontSize:9,fontWeight:800,color:f.tagCol,marginBottom:8}}>{f.tag}</div>
                <div style={{fontWeight:800,fontSize:14,marginBottom:6}}>{f.title}</div>
                <div style={{fontSize:12,color:"#64748b",lineHeight:1.7}}>{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ PREÇOS ══ */}
      <section style={{padding:"80px 20px",background:"rgba(249,115,22,.03)",borderTop:"1px solid #1a1a36"}}>
        <div style={{maxWidth:920,margin:"0 auto"}}>
          <div style={{textAlign:"center",marginBottom:40}}>
            <div style={{fontFamily:"Bebas Neue",fontSize:"clamp(26px,5vw,40px)",letterSpacing:2,marginBottom:6}}>PREÇOS <span style={{color:"#f97316"}}>JUSTOS</span></div>
            <div style={{fontSize:13,color:"#64748b",marginBottom:8}}>Quanto mais tempo você fica, mais barato fica</div>
            <div style={{fontSize:11,color:"#a855f7",fontWeight:700}}>📈 Desconto progressivo até 40% + 10% pelas missões = até 50% OFF</div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:12}}>
            {PLANOS_LAND.map((p,i)=>(
              <div key={i} onMouseEnter={()=>setHovPlan(i)} onMouseLeave={()=>setHovPlan(null)}
                style={{background:"#0d0d1a",border:`2px solid ${hovPlan===i||p.popular?p.cor:"#1a1a36"}`,borderRadius:16,padding:18,position:"relative",transition:"border .2s",cursor:"pointer"}}>
                {p.popular&&<div style={{position:"absolute",top:-10,left:"50%",transform:"translateX(-50%)",background:`linear-gradient(135deg,${p.cor},#6366f1)`,color:"white",padding:"2px 14px",borderRadius:14,fontSize:9,fontWeight:800,whiteSpace:"nowrap"}}>⭐ MAIS POPULAR</div>}
                <div style={{textAlign:"center",marginBottom:14}}>
                  <div style={{fontSize:26,marginBottom:4}}>{p.emoji}</div>
                  <div style={{fontFamily:"Bebas Neue",fontSize:18,color:p.cor,letterSpacing:1}}>{p.nome}</div>
                  <div style={{marginTop:4}}>
                    <span style={{fontFamily:"Bebas Neue",fontSize:28,color:"white"}}>{p.preco}</span>
                    <span style={{fontSize:10,color:"#64748b"}}>{p.suf}</span>
                  </div>
                </div>
                {p.items.map(item=>(
                  <div key={item} style={{display:"flex",alignItems:"center",gap:6,marginBottom:5,fontSize:11}}>
                    <span style={{color:p.cor,fontSize:12}}>✓</span>{item}
                  </div>
                ))}
                <button onClick={onRegister} style={{width:"100%",padding:"9px",background:hovPlan===i||p.popular?`linear-gradient(135deg,${p.cor},${p.popular?"#6366f1":"#111128"})`:"transparent",border:`1px solid ${p.cor}`,borderRadius:9,color:hovPlan===i||p.popular?"white":p.cor,fontWeight:800,cursor:"pointer",fontSize:12,marginTop:12,transition:"all .2s"}}>
                  {p.nome==="Gratuito"?"Criar conta grátis":"Assinar agora"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ DEPOIMENTOS ══ */}
      <section style={{padding:"80px 20px"}}>
        <div style={{maxWidth:900,margin:"0 auto"}}>
          <div style={{textAlign:"center",marginBottom:40}}>
            <div style={{fontFamily:"Bebas Neue",fontSize:"clamp(26px,5vw,40px)",letterSpacing:2,marginBottom:6}}>O QUE DIZEM <span style={{color:"#f97316"}}>NOSSOS USUÁRIOS</span></div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:14}}>
            {DEPOIMENTOS.map((d,i)=>(
              <div key={i} className="ls-card" style={{background:"#0d0d1a",border:"1px solid #1a1a36",borderRadius:14,padding:16}}>
                <div style={{display:"flex",gap:2,marginBottom:8}}>{[...Array(d.nota)].map((_,j)=><Star key={j}/>)}</div>
                <div style={{fontSize:12,color:"#94a3b8",lineHeight:1.7,marginBottom:12,fontStyle:"italic"}}>"{d.texto}"</div>
                <div style={{display:"flex",alignItems:"center",gap:6}}>
                  <div style={{width:28,height:28,background:"linear-gradient(135deg,#f97316,#a855f7)",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14}}>{d.flag}</div>
                  <div style={{fontSize:11,fontWeight:700,color:"#e2e8f0"}}>{d.nome}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FINAL CTA ══ */}
      <section style={{padding:"80px 20px",textAlign:"center",background:"linear-gradient(180deg,transparent,rgba(249,115,22,.05))"}}>
        <div style={{fontFamily:"Bebas Neue",fontSize:"clamp(30px,6vw,52px)",letterSpacing:2,marginBottom:10}}>
          PRONTO PARA <span style={{color:"#f97316"}}>COMEÇAR?</span>
        </div>
        <p style={{fontSize:14,color:"#64748b",marginBottom:28,maxWidth:360,margin:"0 auto 28px"}}>
          Crie sua conta grátis agora. Leva menos de 1 minuto!
        </p>
        <button onClick={onRegister} style={{padding:"16px 44px",background:"linear-gradient(135deg,#f97316,#ef4444)",border:"none",borderRadius:14,color:"white",fontWeight:800,cursor:"pointer",fontSize:16,boxShadow:"0 8px 32px rgba(249,115,22,.4)"}}>
          👤 Criar Conta Grátis Agora
        </button>
        <div style={{marginTop:14,fontSize:11,color:"#475569"}}>
          Já tem conta? <span onClick={onLogin} style={{color:"#f97316",cursor:"pointer",fontWeight:700}}>Entrar →</span>
        </div>
        <div style={{marginTop:28,display:"flex",gap:24,justifyContent:"center",flexWrap:"wrap"}}>
          {["🔒 LGPD","🌍 12 idiomas","📲 WhatsApp","⭐ Gratuito para sempre"].map(t=>(
            <div key={t} style={{fontSize:11,color:"#1e1e3a",fontWeight:700}}>{t}</div>
          ))}
        </div>
      </section>
    </div>
  );
}

