export interface Publication {
  id: string
  title: string
  shortTitle: string
  event: string
  eventEdition: string
  year: number
  location: string
  publisher: string
  doi: string
  type: 'applied-ai' | 'ai-impact'
  topics: string[]
  summary: string
  problem: string
  approach: string
  contribution: string
  connection: string
  media?: string
  featured: boolean
}

export interface ResearchTimeline {
  id: string
  name: string
  type: 'project' | 'conference' | 'product' | 'service'
  year: string
  description: string
  icon: string
  color: string
}

export interface ResearchLineageNode {
  id: string
  name: string
  description: string
  icon: string
}

export interface EnvironmentTopic {
  id: string
  name: string
  description: string
  icon: string
}

export interface ResearchMethodStage {
  id: string
  name: string
  description: string
  icon: string
}

export const publications: Publication[] = [
  {
    id: 'hybrid-ai',
    title: 'Hybrid AI Architecture for Agricultural Diversification: Deep Learning and Expert Systems Integration in the AgroDiversity Platform',
    shortTitle: 'Hybrid AI Architecture',
    event: 'IEEE CONCAPAN XLIII 2025',
    eventEdition: 'CONCAPAN XLIII',
    year: 2025,
    location: 'San Salvador, El Salvador',
    publisher: 'IEEE Xplore',
    doi: '10.1109/CONCAPAN66820.2025.11512437',
    type: 'applied-ai',
    topics: ['Artificial Intelligence', 'Agriculture', 'Deep Learning', 'Expert Systems', 'Software Architecture'],
    summary: 'Exploración de arquitecturas híbridas que integran aprendizaje profundo con sistemas expertos para diversificación agrícola, usando la plataforma AgroDiversity como caso de uso de investigación aplicada.',
    problem: 'Cómo combinar diferentes técnicas de inteligencia artificial para apoyar procesos de diversificación agrícola dentro de una plataforma de software.',
    approach: 'Integración de técnicas de deep learning y sistemas expertos dentro de AgroDiversity.',
    contribution: 'Demostración de cómo arquitecturas híbridas pueden abordar complejidad agrícola combinando predicción con reglas y conocimiento especializado.',
    connection: 'Este trabajo representa una etapa previa de la visión que posteriormente evolucionaría hacia componentes del ecosistema Agropilot CM. Muestra la conexión entre investigación aplicada, arquitectura de software y problemas del sector agrícola.',
    featured: true,
  },
  {
    id: 'environmental-ai',
    title: 'The Environmental Dimensions of Artificial Intelligence: A Multifaceted Challenge',
    shortTitle: 'Environmental Dimensions of AI',
    event: 'IEEE CONCAPAN XLIII 2025',
    eventEdition: 'CONCAPAN XLIII',
    year: 2025,
    location: 'San Salvador, El Salvador',
    publisher: 'IEEE Xplore',
    doi: '10.1109/CONCAPAN66820.2025.11512472',
    type: 'ai-impact',
    topics: ['Artificial Intelligence', 'Environment', 'Sustainability', 'Technology', 'Society'],
    summary: 'Análisis de las dimensiones ambientales asociadas al crecimiento de la inteligencia artificial y los retos que surgen alrededor de infraestructura, recursos y sostenibilidad.',
    problem: 'Entender los impactos ambientales de la inteligencia artificial más allá de su capacidad técnica.',
    approach: 'Análisis multidimensional considerando consumo energético, emisiones, infraestructura y sostenibilidad.',
    contribution: 'Reflexión sobre cómo la inteligencia artificial también plantea preguntas sobre recursos, energía y responsabilidad ambiental.',
    connection: 'Demuestra capacidad de investigar IA desde una perspectiva más amplia que la puramente técnica. Forma parte del pensamiento de Jaime sobre cómo la ingeniería debe considerar contexto más allá de optimización.',
    featured: true,
  },
]

export const researchTimeline: ResearchTimeline[] = [
  {
    id: 'agrodiversity',
    name: 'AGRODIVERSITY',
    type: 'project',
    year: '2024–2025',
    description: 'Plataforma orientada a diversificación agrícola donde se exploró integración entre inteligencia artificial, deep learning y sistemas expertos.',
    icon: '🌾',
    color: '#38ff14',
  },
  {
    id: 'concapan-2025',
    name: 'CONCAPAN XLIII 2025',
    type: 'conference',
    year: '2025',
    description: 'Los resultados y reflexiones de investigación se materializaron en publicaciones dentro de IEEE Xplore.',
    icon: '🎓',
    color: '#00d9ff',
  },
  {
    id: 'ieee-publication',
    name: 'IEEE XPLORE',
    type: 'conference',
    year: '2025',
    description: 'Dos publicaciones indexadas en IEEE Xplore sobre arquitecturas híbridas e impacto ambiental.',
    icon: '📄',
    color: '#FFB800',
  },
  {
    id: 'agropilot-evolution',
    name: 'AGROPILOT EVOLUTION',
    type: 'product',
    year: '2025–2026',
    description: 'Parte de los conceptos de agricultura inteligente evolucionaron posteriormente hacia una visión mucho más amplia dentro de Agropilot CM.',
    icon: '🚀',
    color: '#FF6347',
  },
  {
    id: 'tpc-reviewer',
    name: 'TPC REVIEWER 2026',
    type: 'service',
    year: '2026',
    description: 'Jaime fue invitado y aceptó participar en el Technical Program Committee de CONCAPAN XLIV 2026.',
    icon: '🔍',
    color: '#9370DB',
  },
]

export const researchLineage: ResearchLineageNode[] = [
  {
    id: 'problem',
    name: 'PROBLEM',
    description: 'Entender necesidades de producción y diversificación agrícola.',
    icon: '❓',
  },
  {
    id: 'model',
    name: 'MODEL',
    description: 'Aplicar técnicas de inteligencia artificial a problemas del dominio.',
    icon: '🧮',
  },
  {
    id: 'knowledge',
    name: 'KNOWLEDGE',
    description: 'Combinar predicción con reglas, contexto y conocimiento especializado.',
    icon: '📚',
  },
  {
    id: 'product',
    name: 'PRODUCT',
    description: 'Convertir aprendizajes en módulos que puedan ser utilizados dentro de una plataforma operativa.',
    icon: '⚙️',
  },
]

export const environmentalTopics: EnvironmentTopic[] = [
  {
    id: 'compute',
    name: 'COMPUTE',
    description: 'Los modelos requieren infraestructura y capacidad de procesamiento.',
    icon: '💻',
  },
  {
    id: 'energy',
    name: 'ENERGY',
    description: 'El crecimiento de la IA también implica preguntas sobre consumo y eficiencia.',
    icon: '⚡',
  },
  {
    id: 'infrastructure',
    name: 'INFRASTRUCTURE',
    description: 'La inteligencia no existe de forma abstracta: depende de centros de datos, hardware, redes y recursos.',
    icon: '🏗️',
  },
  {
    id: 'responsibility',
    name: 'RESPONSIBILITY',
    description: 'La ingeniería también debe preguntarse cuándo y cómo usar IA.',
    icon: '⚖️',
  },
]

export const researchMethod: ResearchMethodStage[] = [
  {
    id: 'observe',
    name: 'OBSERVE',
    description: 'Empezar desde un fenómeno o problema real.',
    icon: '👁️',
  },
  {
    id: 'question',
    name: 'QUESTION',
    description: 'Convertir la observación en una pregunta investigable.',
    icon: '❓',
  },
  {
    id: 'model',
    name: 'MODEL',
    description: 'Definir variables, relaciones, supuestos y técnicas.',
    icon: '🧮',
  },
  {
    id: 'build',
    name: 'BUILD',
    description: 'Cuando aplica, convertir la idea en un prototipo o sistema.',
    icon: '🔨',
  },
  {
    id: 'evaluate',
    name: 'EVALUATE',
    description: 'Contrastar la solución y revisar si realmente responde la pregunta.',
    icon: '✓',
  },
  {
    id: 'document',
    name: 'DOCUMENT',
    description: 'Comunicar el proceso de forma que pueda ser revisado por otros.',
    icon: '📝',
  },
]

export const reviewerResponsibilities = [
  {
    label: 'REVIEW',
    description: 'Revisar aproximadamente 3 a 4 submissions dentro de las áreas declaradas de interés.',
  },
  {
    label: 'CONFLICTS',
    description: 'Declarar conflictos de interés.',
  },
  {
    label: 'RIGOR',
    description: 'Analizar claridad, metodología, contribución y calidad técnica.',
  },
  {
    label: 'FEEDBACK',
    description: 'Entregar comentarios constructivos y sustantivos a los autores.',
  },
  {
    label: 'DEADLINE',
    description: 'Fecha indicada para completar revisiones: 13 de septiembre de 2026.',
  },
]

export const researchEngineeringMatrix = [
  {
    corner: 'RESEARCH',
    label: 'pregunta',
    description: '¿Qué problema investigar?',
  },
  {
    corner: 'MATHEMATICS',
    label: 'modelo',
    description: 'Cómo modelar el problema',
  },
  {
    corner: 'ENGINEERING',
    label: 'sistema',
    description: 'Cómo construir una solución',
  },
  {
    corner: 'PRODUCT',
    label: 'uso real',
    description: 'Cómo se utiliza operativamente',
  },
]

export const suggestedQuestions = [
  '¿Cuáles son los papers IEEE de Jaime?',
  '¿Qué relación existe entre AgroDiversity y Agropilot?',
  '¿De qué trata el paper sobre impacto ambiental de IA?',
  '¿Qué significa ser TPC Reviewer?',
  '¿Por qué Jaime pasó de autor a reviewer?',
  '¿Qué relación existe entre Alignerr y CONCAPAN?',
]
