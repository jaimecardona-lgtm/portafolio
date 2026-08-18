export const statusStrips = [
  { label: 'INGENIERO DE SISTEMAS', highlight: false },
  { label: 'AI & DATA ENGINEER', highlight: true },
  { label: 'CALI, COLOMBIA', highlight: false },
  { label: 'BUILDING REAL SYSTEMS', highlight: true },
  { label: 'AVAILABLE FOR CHALLENGES', highlight: false },
]

export const originNodeItems = [
  {
    id: 'animals',
    label: 'ANIMALES',
    description: 'Identidad, historial, genética, producción y salud dejan de ser registros aislados cuando se modelan como un sistema.',
  },
  {
    id: 'production',
    label: 'PRODUCCIÓN',
    description: 'Lechería, ganadería, porcicultura y silvopastoral. Cada línea tiene ciclos, capacidades y limitaciones que deben ser medidas.',
  },
  {
    id: 'costs',
    label: 'COSTOS',
    description: 'Sin costos medidos, no hay rentabilidad visible. Sin rentabilidad, no hay decisiones inteligentes.',
  },
  {
    id: 'data',
    label: 'DATOS',
    description: 'Registrar no basta. Los datos deben servir para predecir, detectar anomalías y tomar mejores decisiones.',
  },
  {
    id: 'decisions',
    label: 'DECISIONES',
    description: 'Cada decisión genera consecuencias. El software debe dejarlas claras, medibles y auditables.',
  },
]

export const worldGateways = [
  {
    id: 'history',
    number: 'A',
    name: 'LA HISTORIA',
    icon: '📖',
    phrase: 'Cómo llegué aquí.',
    preview: {
      title: 'MI TRAYECTORIA',
      description: 'Del campo, la universidad, prácticas públicas, escala en datos, IA en producción, investigación publicada.',
      highlights: [
        'San Buenaventura Cali',
        'DIAN, Opportunity Hound, RCKT, Alignerr',
        '2 publicaciones IEEE 2025',
      ],
      cta: { label: 'VER HISTORIA COMPLETA', route: '/historia' },
    },
  },
  {
    id: 'projects',
    number: 'B',
    name: 'PROYECTOS',
    icon: '⚙️',
    phrase: 'Sistemas que construí.',
    preview: {
      title: 'PROYECTOS DESTACADOS',
      description: 'Productos, sistemas inteligentes y experimentos que convierten ideas en software operativo.',
      highlights: ['Agropilot CM', 'Elite Beauty Agent', 'InterMuniConnect'],
      cta: { label: 'EXPLORAR TODOS LOS PROYECTOS', route: '/proyectos' },
    },
  },
  {
    id: 'experience',
    number: 'C',
    name: 'EXPERIENCIA',
    icon: '💼',
    phrase: 'Dónde trabajé.',
    preview: {
      title: 'TRAYECTORIA PROFESIONAL',
      description: 'Experiencias en instituciones públicas, startups y productos IA-first.',
      highlights: ['DIAN', 'Opportunity Hound', 'RCKT', 'Alignerr'],
      cta: { label: 'VER TRAYECTORIA COMPLETA', route: '/experiencia' },
    },
  },
  {
    id: 'research',
    number: 'D',
    name: 'INVESTIGACIÓN',
    icon: '🔬',
    phrase: 'Lo que publiqué.',
    preview: {
      title: 'INVESTIGACIÓN ACADÉMICA',
      description: '2 publicaciones en IEEE CONCAPAN 2025, TPC Reviewer CONCAPAN XLIV 2026.',
      highlights: ['Hybrid AI Architecture', 'Environmental Dimensions of AI', 'IEEE Xplore'],
      cta: { label: 'ENTRAR AL ARCHIVO', route: '/investigacion' },
    },
  },
  {
    id: 'ai-math',
    number: 'E',
    name: 'IA & MATEMÁTICAS',
    icon: '🧮',
    phrase: 'La ciencia detrás.',
    preview: {
      title: 'TÉCNICAS APLICADAS',
      description: 'Machine Learning, RAG, LLMs, embeddings, model routing y arquitecturas híbridas.',
      highlights: ['Machine Learning', 'RAG y embeddings', 'Model routing', 'Arquitecturas híbridas'],
      cta: null,
    },
  },
  {
    id: 'collaborations',
    number: 'F',
    name: 'COLABORACIONES',
    icon: '🤝',
    phrase: 'Contigo y con otros.',
    preview: {
      title: 'SERVICIOS Y COLABORACIONES',
      description: 'Portafolios, MVPs, proyectos académicos, asistentes IA y más.',
      highlights: ['MVPs', 'Proyectos académicos', 'Asistentes IA', 'Consultoría'],
      cta: { label: 'EXPLORAR COLABORACIONES', route: '/servicios-y-colaboraciones' },
    },
  },
]

export const featuredProjects = [
  {
    id: 'agropilot',
    name: 'Agropilot CM',
    type: 'PROYECTO PROPIO // AGROTECH AI',
    phrase: 'Un ecosistema inteligente para convertir la operación agropecuaria en datos, predicciones y decisiones.',
    tech: ['React', 'FastAPI', 'Supabase', 'ML/RAG'],
    role: 'Creator · Full-Stack · AI Architecture',
    cta: { label: 'VER CASO', route: '/proyectos/agropilot-cm' },
    placeholder: 'chart',
  },
  {
    id: 'elite-beauty',
    name: 'Elite Beauty Agent',
    type: 'RCKT // AI AGENT',
    phrase: 'Un agente omnicanal que conecta conversación, contexto, leads, WhatsApp y voz.',
    tech: ['FastAPI', 'Supabase', 'RAG', 'Twilio'],
    role: 'AI & Data Engineer',
    cta: { label: 'VER CASO', route: '/proyectos/elite-beauty-agent' },
    placeholder: 'whatsapp',
  },
  {
    id: 'intermuniconnect',
    name: 'InterMuniConnect',
    type: 'PRODUCTO // MOBILITY',
    phrase: 'Carpooling colombiano con rutas, reservas, tarifas deterministas y contexto inteligente.',
    tech: ['Ionic', 'React', 'MongoDB', 'Supabase'],
    role: 'Architecture · Full-Stack · Product',
    cta: { label: 'VER CASO', route: '/proyectos/intermuniconnect' },
    placeholder: 'map',
  },
]

export const careerSignals = [
  {
    id: 'dian',
    year: '2025',
    company: 'DIAN',
    role: 'Practicante universitario / Full-Stack & Data',
    description: 'Sistemas institucionales para inventario, convenios y administración de roles.',
    tags: ['Full Stack', 'Data', '.NET', 'Institutional Systems'],
  },
  {
    id: 'opportunity',
    year: '2025–2026',
    company: 'Opportunity Hound',
    role: 'Consultor / Desarrollador',
    description: 'Backend, datos, Python, búsqueda e inteligencia artificial para GovBidAI / OppyHound.',
    tags: ['Python', 'Data', 'Elasticsearch', 'AWS', 'AI'],
  },
  {
    id: 'rckt',
    year: '2026–',
    company: 'RCKT',
    role: 'AI & Data Engineer',
    description: 'Construcción de soluciones AI-first, agentes, automatización y productos.',
    tags: ['AI', 'Agents', 'Backend', 'Data', 'Product'],
  },
  {
    id: 'alignerr',
    year: '2026–',
    company: 'Alignerr',
    role: 'AI Model Response Evaluator / Coding Evaluation Specialist',
    description: 'Evaluación técnica de soluciones generadas por modelos sobre repositorios y tareas de software.',
    tags: ['AI Evaluation', 'Code Review', 'Quality', 'Reasoning'],
  },
]

export const buildSteps = [
  {
    id: 'understand',
    number: '01',
    title: 'ENTENDER',
    description: 'Identifico quién tiene el problema, qué decisión necesita tomar y qué limita el sistema actual.',
  },
  {
    id: 'model',
    number: '02',
    title: 'MODELAR',
    description: 'Defino entidades, relaciones, reglas, estados, responsabilidades y flujo de información.',
  },
  {
    id: 'architect',
    number: '03',
    title: 'ARQUITECTAR',
    description: 'Separo frontend, backend, datos, IA, integraciones y responsabilidades antes de conectar tecnologías.',
  },
  {
    id: 'build',
    number: '04',
    title: 'CONSTRUIR',
    description: 'Implemento por capas, pruebo contratos, documento decisiones y mantengo fallbacks.',
  },
  {
    id: 'measure',
    number: '05',
    title: 'MEDIR E ITERAR',
    description: 'Compruebo qué funciona, detecto fricción y evoluciono la solución con evidencia.',
  },
]

export const suggestedQuestions = [
  '¿Qué experiencia tiene con IA?',
  '¿Cuál es su proyecto más completo?',
  '¿Cómo conecta el campo con la tecnología?',
  '¿Qué ha hecho en RCKT?',
  '¿Qué experiencia tiene evaluando IA?',
]

export const finalCtaActions = [
  { label: 'EXPLORAR MI HISTORIA', route: '/historia' },
  { label: 'VER PROYECTOS', route: '/proyectos' },
  { label: 'HABLAR CON JAC-IA', action: 'openChat' },
]
