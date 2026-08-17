export interface CareerStage {
  id: string
  order: number
  company: string
  position: string
  type: 'internship' | 'full-time' | 'freelance' | 'part-time' | 'consultant' | 'reviewer'
  startDate: string
  endDate: string | null
  status: 'past' | 'active'
  location: string
  modality: 'on-site' | 'remote' | 'hybrid'
  headline: string
  description: string
  icon: string
  color: string
}

export interface MissionDossier {
  id: string
  company: string
  role: string
  period: string
  modality: string
  location: string
  narrative: string
  responsibilities: string[]
  technologies: string[]
  specialties: string[]
  achievements: string[]
}

export const careerStages: CareerStage[] = [
  {
    id: 'dian',
    order: 1,
    company: 'DIAN',
    position: 'Practicante Universitario',
    type: 'internship',
    startDate: 'Feb 2025',
    endDate: 'Sep 2025',
    status: 'past',
    location: 'Cali, Valle del Cauca, Colombia',
    modality: 'on-site',
    headline: 'Instituciones y Operación',
    description: 'Del entorno académico a construir y mantener soluciones que debían convivir con procesos institucionales, usuarios, roles, inventario, seguridad y continuidad operativa.',
    icon: '🏛️',
    color: '#4169E1',
  },
  {
    id: 'oppyhound',
    order: 2,
    company: 'Opportunity Hound',
    position: 'Consultor / Desarrollador',
    type: 'consultant',
    startDate: 'Sep 2025',
    endDate: 'Mar 2026',
    status: 'past',
    location: 'Cali, Colombia',
    modality: 'remote',
    headline: 'Datos e Inteligencia',
    description: 'De sistemas institucionales a plataformas basadas en datos e inteligencia.',
    icon: '📊',
    color: '#20B2AA',
  },
  {
    id: 'rckt',
    order: 3,
    company: 'RCKT',
    position: 'AI & Data Engineer',
    type: 'part-time',
    startDate: 'Jun 2026',
    endDate: null,
    status: 'active',
    location: 'Colombia',
    modality: 'remote',
    headline: 'Productos AI-First',
    description: 'Pasar de integrar IA a construir productos alrededor de ella.',
    icon: '⚡',
    color: '#FF6347',
  },
  {
    id: 'alignerr',
    order: 4,
    company: 'Alignerr',
    position: 'AI Model Response Evaluator',
    type: 'freelance',
    startDate: 'Jun 2026',
    endDate: null,
    status: 'active',
    location: 'Cali, Colombia',
    modality: 'remote',
    headline: 'Juicio Técnico',
    description: 'Construir software es una habilidad. Saber evaluar si una solución realmente resuelve el problema es otra.',
    icon: '🔍',
    color: '#9370DB',
  },
]

export const dianuSystems = [
  {
    id: 'inventory',
    name: 'INVENTARIO Y PRÉSTAMO DE EQUIPOS',
    problem: 'Controlar equipos institucionales, préstamos, devoluciones y estados sin perder trazabilidad.',
    flow: ['Funcionario', 'equipo', 'préstamo', 'cambio de estado', 'devolución', 'trazabilidad', 'reporte'],
    capabilities: ['inventario', 'usuarios', 'roles', 'estados', 'reportes', 'seguridad', 'control institucional'],
  },
  {
    id: 'agreements',
    name: 'PLATAFORMA DE CONVENIOS',
    problem: 'Dar seguimiento a actividades y contratos derivados de convenios con organizaciones aliadas.',
    flow: ['Convenio', 'organización', 'contrato', 'actividad', 'seguimiento', 'reporte'],
    capabilities: ['convenios', 'organizaciones', 'contratos', 'actividades', 'seguimiento', 'reportes'],
  },
  {
    id: 'roles',
    name: 'SISTEMA DE ROLES',
    problem: 'Administrar funciones de servidores públicos según rotación, contrato y dependencia.',
    flow: ['Servidor', 'dependencia', 'vínculo', 'rol', 'activación/inactivación', 'actualización'],
    capabilities: ['servidores', 'dependencias', 'roles', 'permisos', 'auditoría', 'gestión'],
  },
]

export const opportunityHoundTabs = [
  {
    id: 'data',
    name: 'DATA',
    description: 'Procesamiento, análisis, normalización, flujos y estructuras de datos. Contratos de datos.',
  },
  {
    id: 'backend',
    name: 'BACKEND',
    description: 'Python, servicios backend, APIs, automatización y flujos de trabajo.',
  },
  {
    id: 'search',
    name: 'SEARCH',
    description: 'Elasticsearch. Trabajo con búsqueda e indexación dentro de una plataforma intensiva en información.',
  },
  {
    id: 'ai',
    name: 'AI',
    description: 'Integración AI/ML, modelos conversacionales, procesamiento, recuperación y lógica de asistencia.',
  },
  {
    id: 'quality',
    name: 'QUALITY',
    description: 'Pytest, coverage, reportes y validación. Las entregas no terminaban en implementar: también se verificaban.',
  },
  {
    id: 'teamwork',
    name: 'TEAMWORK',
    description: 'Reuniones de seguimiento, updates periódicos, Figma, Confluence y documentación colaborativa.',
  },
]

export const rcktSystems = [
  {
    id: 'elite',
    name: 'ELITE BEAUTY AGENT',
    type: 'Agente Omnicanal',
    description: 'Agente que conecta WhatsApp, inteligencia artificial, contexto, leads y voz.',
    responsibilities: ['backend', 'arquitectura', 'RAG', 'LLMs', 'datos', 'integración', 'WhatsApp', 'Twilio', 'concurrencia', 'resiliencia'],
    stack: ['React/Vite', 'FastAPI', 'Supabase', 'pgvector', 'RAG', 'Anthropic/OpenRouter', 'Twilio Voice'],
  },
  {
    id: 'voz',
    name: 'VOZ ESTRATÉGICA',
    type: 'Producto',
    description: 'Producto digital con integración IA, analítica y operación.',
    responsibilities: ['producto', 'integración', 'analítica', 'operación', 'mantenimiento'],
    stack: ['React', 'Vite', 'Supabase', 'GitHub', 'Lovable', 'GTM', 'GA4', 'Google Ads', 'Resend'],
  },
  {
    id: 'aisystems',
    name: 'SISTEMAS AI-FIRST',
    type: 'Arquitectura',
    description: 'Construcción de sistemas donde la IA forma parte central de la propuesta.',
    responsibilities: ['architecture', 'data-strategy', 'agent-design', 'integration', 'deployment'],
    stack: ['FastAPI', 'Supabase', 'RAG', 'LLMs', 'Python', 'deployment'],
  },
]

export const evaluationCriteria = [
  {
    id: 'correctness',
    name: 'CORRECTNESS',
    description: 'La solución funciona para el caso propuesto.',
  },
  {
    id: 'root-cause',
    name: 'ROOT CAUSE',
    description: 'No basta con silenciar el síntoma; la solución debe abordar el problema real.',
  },
  {
    id: 'maintainability',
    name: 'MAINTAINABILITY',
    description: 'El código es claro, documentado y evita complejidad innecesaria.',
  },
  {
    id: 'verification',
    name: 'VERIFICATION',
    description: 'La solución fue probada y los cambios fueron validados.',
  },
  {
    id: 'scope',
    name: 'SCOPE',
    description: 'La solución atacó el problema solicitado, sin agregar características no pedidas.',
  },
  {
    id: 'overengineering',
    name: 'OVERENGINEERING',
    description: 'Una solución puede funcionar y aún así ser peor si introduce complejidad innecesaria.',
  },
  {
    id: 'evidence',
    name: 'EVIDENCE',
    description: 'Las conclusiones se apoyan en lo que realmente ocurrió en el repositorio.',
  },
]

export const teamBehaviors = [
  {
    id: 'understand',
    name: 'UNDERSTAND',
    description: 'Empiezo por entender qué necesita el negocio o usuario.',
  },
  {
    id: 'structure',
    name: 'STRUCTURE',
    description: 'Divido el problema en módulos, datos, responsabilidades e interfaces.',
  },
  {
    id: 'explain',
    name: 'EXPLAIN',
    description: 'Intento que la arquitectura sea entendible, no solamente funcional.',
  },
  {
    id: 'delegate',
    name: 'DELEGATE',
    description: 'Cuando una solución involucra varias tareas, separo responsabilidades y entregables.',
  },
  {
    id: 'review',
    name: 'REVIEW',
    description: 'Reviso integración, supuestos y calidad antes de cerrar.',
  },
  {
    id: 'document',
    name: 'DOCUMENT',
    description: 'Dejo instrucciones, arquitectura, configuración y decisiones reproducibles.',
  },
]

export const careerEvolutionStages = [
  { stage: '2025', title: 'BUILD SYSTEMS', description: 'Construir software institucional' },
  { stage: '2025–2026', title: 'BUILD WITH DATA', description: 'Agregar datos e inteligencia' },
  { stage: '2026', title: 'BUILD WITH AI', description: 'Construir productos alrededor de IA' },
  { stage: '2026', title: 'EVALUATE AI', description: 'Evaluar y juzgar soluciones técnicas' },
  { stage: 'NEXT', title: 'DESIGN AT SCALE', description: 'Productos inteligentes a escala' },
]

export const experienceQuestions = [
  '¿Qué hizo Jaime en la DIAN?',
  '¿Qué hizo con Elasticsearch en OppyHound?',
  '¿Qué construye Jaime en RCKT?',
  '¿Cómo funciona Elite Beauty Agent?',
  '¿Qué evalúa Jaime en Alignerr?',
  '¿Qué experiencia tiene con AWS?',
  '¿Qué sabe de MikroTik?',
  '¿Cómo lidera técnicamente?',
  '¿Qué significa ser TPC Reviewer de CONCAPAN?',
]
