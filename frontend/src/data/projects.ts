export type ProjectCategory = 'ai' | 'full-stack' | 'backend' | 'data' | 'rag' | 'mobile' | 'research' | 'professional' | 'personal' | 'academic' | 'automation'
export type ProjectType = 'agrotech' | 'agent' | 'platform' | 'mobility' | 'automation' | 'landing' | 'research'
export type Ownership = 'personal-project' | 'professional-work' | 'academic' | 'hackathon' | 'technical-test'

export interface Project {
  id: string
  slug: string
  name: string
  formerName?: string
  type: string
  ownership: Ownership
  company?: string
  period?: string
  status: string
  tagline: string
  shortDescription: string
  headline: string
  problem: string
  solution: string
  role: string
  responsibilities: string[]
  technologies: string[]
  categories: ProjectCategory[]
  keyDecisions: string[]
  lessons: string[]
  featured: boolean
  flagship: boolean
  modules?: string[]
  aiModels?: string[]
  dataFlow?: string
  aiFlow?: string
  architecture?: string
  media: {
    placeholder: string
    route?: string
    diagram?: string
  }
}

export const projects: Project[] = [
  {
    id: 'agropilot-cm',
    slug: 'agropilot-cm',
    name: 'Agropilot CM',
    formerName: 'Agrosoft CM',
    type: 'Agrotech AI Platform',
    ownership: 'personal-project',
    period: 'ongoing',
    status: 'production',
    tagline: 'Ecosistema inteligente para modernizar la gestión agropecuaria',
    shortDescription: 'Plataforma integral con IA, predicción y análisis. Producción lechera, silvopastoral, porcicultura.',
    headline: 'Del registro agropecuario a un ecosistema capaz de analizar, predecir y asistir.',
    problem: 'La gestión agropecuaria suele fragmentar animales, producción, costos, inventario y decisiones.',
    solution: 'Unificar operación, datos y modelos inteligentes alrededor de cada finca.',
    role: 'Creator · Full-Stack · AI Architecture · Product Design',
    responsibilities: [
      'Diseño de arquitectura multi-tenant',
      'Integración de ML para predicción',
      'Sistema de RAG con contexto agrícola',
      'Gestión de datos históricos por animal',
      'Diseño de interfaces para decisiones operativas',
    ],
    technologies: ['React', 'FastAPI', 'Supabase', 'PostgreSQL', 'TypeScript', 'ML', 'RAG', 'OpenRouter'],
    categories: ['ai', 'full-stack', 'data', 'rag', 'personal'],
    keyDecisions: [
      'Finca como tenant independiente con aislamiento lógico por farm_id',
      'Separar modelos predictivos de lógica determinista del negocio',
      'Historiales de animales transferibles entre fincas',
      'Multi-lenguaje: Python (ML) + Node.js (APIs) + React (frontend)',
    ],
    lessons: [
      'Un fallback no sirve si reproduce exactamente el mismo error del sistema principal',
      'La separación de responsabilidades simplifica debugging y escalabilidad',
      'Contexto de finca es crítico para decisiones agrícolas significativas',
      'RLS en PostgreSQL es fundamental para multi-tenancy seguro',
    ],
    featured: true,
    flagship: true,
    modules: ['Producción Lechera', 'Porcicultura', 'Silvopastoril', 'Inventario', 'Costos', 'Trabajadores', 'Asistente'],
    aiModels: ['Linear Regression', 'Decision Trees', 'Random Forest', 'AdaBoost', 'Ridge', 'LSTM', 'Disease Classification', 'RAG', 'Model Router'],
    architecture: 'React + TypeScript → Node.js/Express → FastAPI ML → Supabase PostgreSQL + pgvector',
    media: {
      placeholder: 'agropilot-hud',
      route: '/media/projects/agropilot/agropilot-cover.webp',
      diagram: '/media/diagrams/02-agropilot-cm-arquitectura.png',
    },
  },

  {
    id: 'elite-beauty-agent',
    slug: 'elite-beauty-agent',
    name: 'Elite Beauty Agent',
    type: 'Omnicanal AI Agent',
    ownership: 'professional-work',
    company: 'RCKT',
    period: '2026–',
    status: 'production',
    tagline: 'Agente omnicanal para negocio de belleza',
    shortDescription: 'Conversación vía WhatsApp y voz. Clasificación de leads. RAG con contexto de cliente.',
    headline: 'Un agente omnicanal capaz de conservar contexto entre conversación, leads y voz.',
    problem: 'Negocio de belleza sin forma de calificar leads, conservar contexto o atender fuera de horarios.',
    solution: 'Agente que integra WhatsApp, voz, CRM y llama a LLM solo cuando necesita razonar.',
    role: 'AI & Data Engineer',
    responsibilities: [
      'Diseño del flujo multi-canal',
      'Integración con WhatsApp Cloud API y Twilio Voice',
      'Implementación de RAG con pgvector',
      'Manejo de concurrencia y session persistence',
      'Arquitectura de fallbacks y degradación controlada',
    ],
    technologies: ['FastAPI', 'Supabase', 'pgvector', 'RAG', 'Anthropic/OpenRouter', 'WhatsApp', 'Twilio', 'Python', 'asyncio'],
    categories: ['ai', 'backend', 'rag', 'professional'],
    keyDecisions: [
      'Backend conserva el cerebro de inteligencia',
      'Canales (WhatsApp, voz) son transportes únicamente',
      'Contexto persiste en Supabase, no en proveedor',
      'IA solo actúa cuando backend lo autoriza',
    ],
    lessons: [
      'IA útil no significa entregar reglas críticas del negocio al modelo',
      'La persistencia de contexto fuera del LLM es crítica',
      'Concurrencia en Python requiere claridad sobre async/threading',
      'Webhooks exigen robustez en retry y idempotencia',
    ],
    featured: true,
    flagship: false,
    dataFlow: 'WhatsApp/Voice → Backend → Context → RAG → LLM → CRM / Response',
    media: {
      placeholder: 'elite-beauty-channels',
      route: '/media/projects/elite-beauty/elite-beauty-cover.webp',
      diagram: '/media/diagrams/04-elite-beauty-agent-arquitectura.png',
    },
  },

  {
    id: 'intermuniconnect',
    slug: 'intermuniconnect',
    name: 'InterMuniConnect',
    type: 'Mobility Platform',
    ownership: 'personal-project',
    period: 'development',
    status: 'active-development',
    tagline: 'Plataforma de carpooling intermunicipal',
    shortDescription: 'Conexión de pasajeros y conductores entre municipios. Pagos, calificaciones, mapas.',
    headline: 'Movilidad colaborativa colombiana diseñada como producto, no solamente como una app de viajes.',
    problem: 'Pasajeros sin opciones de movilidad asequible entre municipios. Sin contexto inteligente en rutas.',
    solution: 'Plataforma de carpooling con tarifas deterministas y IA que explica, no que inventa.',
    role: 'Architecture · Full-Stack · Product',
    responsibilities: [
      'Diseño de arquitectura MongoDB + Supabase',
      'Lógica de matching y tarificación',
      'Implementación de QR para validación',
      'Sistema de calificaciones y confianza',
      'Integración de mapas y rutas',
    ],
    technologies: ['Ionic', 'React', 'TypeScript', 'Node.js', 'Express', 'Prisma', 'MongoDB', 'Supabase', 'Maps API'],
    categories: ['full-stack', 'mobile', 'data', 'personal'],
    keyDecisions: [
      'MongoDB para operaciones transaccionales',
      'Supabase para analítica y aprendizaje',
      'IA explica recomendaciones, no fija precios',
      'Backend controla lógica de negocio crítica',
    ],
    lessons: [
      'Una arquitectura híbrida funciona mejor cuando cada BD tiene responsabilidad clara',
      'Separar decisión (backend) de explicación (IA) mejora confianza de usuario',
      'Tarificación determinista > IA mágica para movilidad',
      'Validación con QR reduce fraude más que ML complejo',
    ],
    featured: true,
    flagship: false,
    dataFlow: 'Search → Route → Match → Fare → Reservation → Payment → Confirmation → Rating',
    media: {
      placeholder: 'intermuniconnect-flow',
      route: '/media/projects/intermuniconnect/intermuniconnect-cover.jpeg',
      diagram: '/media/diagrams/06-intermuniconnect-arquitectura.png',
    },
  },

  {
    id: 'facturaops',
    slug: 'facturaops',
    name: 'FacturaOps',
    type: 'Automation Platform',
    ownership: 'hackathon',
    period: '2024',
    status: 'proof-of-concept',
    tagline: 'Facturación electrónica con IA',
    shortDescription: 'Integración DIAN. Agente conversacional. Reportes y auditoría.',
    headline: 'Facturación electrónica colombiana convertida en un flujo operativo y conversacional.',
    problem: 'Facturación manual, lenta, propensa a errores y sin visibilidad de estado.',
    solution: 'Flujo automatizado que valida, emite, archiva y permite consultas vía WhatsApp/conversación.',
    role: 'Backend · AI · Architecture',
    responsibilities: [
      'Diseño del flujo de facturación',
      'Extracción de documentos con OCR',
      'Integración DIAN mock',
      'Sistema de auditoría y trazabilidad',
      'Agente conversacional para consultas',
    ],
    technologies: ['FastAPI', 'SQLAlchemy', 'SQLite', 'JavaScript', 'WhatsApp', 'OCR', 'Anthropic'],
    categories: ['backend', 'ai', 'automation'],
    keyDecisions: [
      'SQLite para reproducibilidad y simpleza',
      'Separación clara entre validación y ejecución',
      'Estado de facturación nunca inventado por LLM',
      'Audit trail inmutable desde el inicio',
    ],
    lessons: [
      'Reproducibilidad (SQLite) es más valiosa que escalabilidad temprana',
      'Trazabilidad de cada operación es requerimiento, no lujo',
      'Fallback a mock DIAN permite desarrollar sin depender de terceros',
    ],
    featured: false,
    flagship: false,
    dataFlow: 'Document → FastAPI → Extraction → Invoice → DIAN/Mock → Audit → Delivery',
    media: {
      placeholder: 'facturaops-document',
      route: '/media/projects/facturaops/facturaops-cover.webp',
      diagram: '/media/diagrams/05-facturaops-arquitectura.png',
    },
  },

  {
    id: 'bertolli-pro-900',
    slug: 'bertolli-pro-900',
    name: 'Bertolli Pro 900',
    type: 'Landing with AI',
    ownership: 'technical-test',
    company: 'RCKT',
    period: '2024',
    status: 'production',
    tagline: 'Landing premium con arquitectura escalable',
    shortDescription: 'Accesibilidad WCAG AA. FAQs interactivo. Evolución a FastAPI + RAG.',
    headline: 'Una prueba técnica que evolucionó de landing estática a experiencia full-stack con asistente.',
    problem: 'Landing estática no diferenciada. Sin interacción, sin contexto, sin asistencia.',
    solution: 'Experiencia multi-capas: landing accesible → carrito local → asistente + backend.',
    role: 'Full-Stack',
    responsibilities: [
      'Diseño e implementación del landing',
      'Carrito local sin backend',
      'Integración de FastAPI para asistente',
      'Implementación de RAG',
      'Optimización de accesibilidad WCAG AA',
    ],
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'FastAPI', 'Supabase', 'RAG', 'OpenRouter'],
    categories: ['full-stack', 'rag'],
    keyDecisions: [
      'Frontend funciona sin backend (progressive enhancement)',
      'Asistente como mejora, no como requisito',
      'Local storage para persistencia de carrito',
      'Accesibilidad desde el primer diseño',
    ],
    lessons: [
      'Landing accesible > landing bonita pero inaccesible',
      'Progressive enhancement permite valor inmediato',
      'Carrito local sin servidor es más rápido que API',
    ],
    featured: false,
    flagship: false,
    media: {
      placeholder: 'bertolli-landing',
      route: '/media/projects/bertolli/bertolli-cover.webp',
      diagram: '/media/diagrams/03-bertolli-pro-900-arquitectura.png',
    },
  },

  {
    id: 'voz-estrategica',
    slug: 'voz-estrategica',
    name: 'Voz Estratégica',
    type: 'Product Platform',
    ownership: 'professional-work',
    company: 'RCKT',
    period: '2026–',
    status: 'production',
    tagline: 'Producto digital con integración IA dentro de ecosistema RCKT',
    shortDescription: 'React + Supabase. Autenticación, pagos, analítica. Dentro del ecosistema RCKT.',
    headline: 'Producto digital donde integración, analítica y operación importan tanto como el frontend.',
    problem: 'Producto necesita sincronización bidireccional con Lovable sin perder control técnico.',
    solution: 'Arquitectura conservadora que mantiene sincronización sin perder estándares.',
    role: 'AI & Data Engineer · Architecture',
    responsibilities: [
      'Sincronización bidireccional GitHub/Lovable',
      'Integración de analytics GA4/GTM',
      'Sistema de conversiones y eventos',
      'Automatización de pagos',
      'Protección contra operaciones destructivas',
    ],
    technologies: ['React', 'Vite', 'Supabase', 'GA4', 'GTM', 'Resend', 'Stripe/Payments', 'GitHub', 'Lovable'],
    categories: ['full-stack', 'data', 'professional'],
    keyDecisions: [
      'Sincronización conservadora > innovación riesgosa',
      'Cada cambio es auditable y reversible',
      'Herramientas (GitHub, Lovable) coexisten sin conflicto',
    ],
    lessons: [
      'Tooling complexity requires clear ownership and discipline',
      'Reversibility is security for experimental platforms',
      'Product decisions sometimes constrain but don\'t eliminate architecture choices',
    ],
    featured: false,
    flagship: false,
    media: {
      placeholder: 'voz-estrategica-analytics',
      route: '/media/projects/voz-estrategica/voz-estrategica-cover.webp',
      diagram: '/media/diagrams/07-voz-estrategica-arquitectura.png',
    },
  },

  {
    id: 'agrodiversity',
    slug: 'agrodiversity',
    name: 'AgroDiversity',
    type: 'Research Project',
    ownership: 'academic',
    period: '2024-2025',
    status: 'published',
    tagline: 'Investigación en IA y agricultura',
    shortDescription: 'Arquitecturas híbridas. Deep Learning + Expert Systems. Publicación IEEE.',
    headline: 'El proyecto que conectó agricultura, deep learning y sistemas expertos antes de Agropilot.',
    problem: 'Necesidad de entender cómo combinar Deep Learning con reglas agrícolas explícitas.',
    solution: 'Investigación de arquitecturas híbridas aplicadas a diversificación agrícola.',
    role: 'Researcher · Full-Stack',
    responsibilities: [
      'Investigación en arquitecturas híbridas',
      'Implementación de sistemas expertos',
      'Integración con deep learning',
      'Publicación y presentación en IEEE',
      'Transferencia de conceptos a Agropilot',
    ],
    technologies: ['Python', 'Deep Learning', 'Expert Systems', 'Pandas', 'Scikit-learn', 'Research'],
    categories: ['ai', 'research', 'academic', 'data'],
    keyDecisions: [
      'Híbrido > únicamente Deep Learning para agricultura',
      'Expert systems proporcionan interpretabilidad',
      'Conceptos evolucionan hacia Agropilot',
    ],
    lessons: [
      'La investigación aplicada retroalimenta productos',
      'Explicabilidad es requisito para adopción agrícola',
      'Deep Learning + Reglas = mejor que uno u otro solo',
    ],
    featured: false,
    flagship: false,
    media: {
      placeholder: 'agrodiversity-research',
      route: '/media/projects/agrodiversity/agrodiversity-cover.webp',
      diagram: '/media/diagrams/01-agrodiversity-arquitectura.png',
    },
  },
]

export function getProjectsByCategory(category: ProjectCategory): Project[] {
  return projects.filter(p => p.categories.includes(category))
}

export function getProjectsByOwnership(ownership: Ownership): Project[] {
  return projects.filter(p => p.ownership === ownership)
}

export function getFeaturedProjects(): Project[] {
  return projects.filter(p => p.featured).sort((a, b) => {
    if (a.flagship) return -1
    if (b.flagship) return 1
    return 0
  })
}

export const categoryLabels: Record<ProjectCategory, string> = {
  ai: 'AI',
  'full-stack': 'Full Stack',
  backend: 'Backend',
  data: 'Data',
  rag: 'RAG',
  mobile: 'Mobile',
  research: 'Research',
  professional: 'Profesional',
  personal: 'Propio',
  academic: 'Académico',
  automation: 'Automation',
}

export const ownershipLabels: Record<Ownership, string> = {
  'personal-project': 'Proyecto Propio',
  'professional-work': 'Trabajo Profesional',
  academic: 'Académico',
  hackathon: 'Hackathon',
  'technical-test': 'Prueba Técnica',
}

export const ownershipColors: Record<Ownership, string> = {
  'personal-project': '#38ff14',
  'professional-work': '#00d9ff',
  academic: '#8b5cf6',
  hackathon: '#ffb84d',
  'technical-test': '#ff8c42',
}
