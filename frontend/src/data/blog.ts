export type BlogStatus = 'PUBLISHED' | 'FIELD NOTE' | 'DRAFT'
export type BlogType = 'FIELD NOTE' | 'ARCHITECTURE NOTE' | 'AI NOTE' | 'RESEARCH NOTE' | 'LESSON' | 'DECISION LOG'
export type BlogCategory = 'ARQUITECTURA' | 'AI' | 'RAG' | 'DATA' | 'PRODUCTO' | 'AGROTECH' | 'INFRAESTRUCTURA' | 'CALIDAD' | 'INVESTIGACION' | 'LIDERAZGO'
export type QuestStatus = 'BUILDING' | 'EXPLORING' | 'FUTURE'

export interface BlogPost {
  id: string
  slug: string
  title: string
  subtitle: string
  type: BlogType
  status: BlogStatus
  categories: BlogCategory[]
  tags: string[]
  summary: string
  thesis: string
  context: string
  body: string
  relatedProjects: string[]
  relatedResearch?: string[]
  featured: boolean
  readingTime?: number
  suggestedQuestion: string
}

export interface BlogThought {
  id: string
  text: string
  relatedSlug?: string
}

export interface DecisionLogEntry {
  id: string
  title: string
  context: string
  options: string[]
  decision: string
  why: string
  tradeoff: string
  relatedProject?: string
}

export interface LessonLogEntry {
  id: string
  title: string
  context: string
  symptom: string
  cause: string
  fix: string
  lesson: string
}

export interface CurrentQuest {
  id: string
  name: string
  status: QuestStatus
  description?: string
}

export const blogPosts: BlogPost[] = [
  {
    id: '001',
    slug: 'rag-no-es-pegar-una-base-vectorial-a-un-llm',
    title: 'RAG NO ES PEGAR UNA BASE VECTORIAL A UN LLM',
    subtitle: 'Componentes de un sistema RAG real',
    type: 'AI NOTE',
    status: 'FIELD NOTE',
    categories: ['AI', 'RAG', 'ARQUITECTURA'],
    tags: ['retrieval', 'embedding', 'context', 'evaluation', 'fallback'],
    summary: 'Un sistema RAG necesita ingestión, recuperación, contexto, evaluación y fallback; la base vectorial es solamente una pieza.',
    thesis: 'Confundir RAG con "un LLM + vectordb" es como confundir un auto con "motor + llantas". El sistema requiere más componentes para funcionar.',
    context: 'Trabajando en Agropilot CM, Bertolli Pro 900 y Elite Beauty, aprendí que implementar RAG sin estrategia de recuperación, evaluación y degradación degrada más que empodera.',
    body: `Un sistema RAG funcional requiere:

1. INGESTIÓN
- Cómo los documentos llegan (upload, API, scraping)
- Validación y limpieza
- Splitting inteligente

2. CHUNKS
- Tamaño óptimo (256-512 tokens)
- Solapamiento para contexto
- Metadatos preservados

3. EMBEDDINGS
- Modelo seleccionado por dominio
- Dimensionalidad
- Actualización periódica

4. RETRIEVAL
- Búsqueda vectorial (similaridad)
- Filtros de metadatos
- Top-K ranking

5. SCORING
- Relevancia del documento
- Confianza del embedding
- Redundancia

6. CONTEXTO
- Ordenamiento de resultados
- Truncación si excede tokens
- Preservación de orden original

7. LLM
- Prompt engineering para RAG
- Instrucciones claras
- Número de documentos en contexto

8. FALLBACK
- Si no hay resultados
- Si baja confianza
- Si el LLM no confía

9. EVALUACIÓN
- ¿La respuesta usa los documentos?
- ¿Está soportada?
- ¿Es coherente?

La mayoría de fallas en RAG ocurren en 1, 4, 6, 8 y 9. La base vectorial es importante, pero no es "el problema".`,
    relatedProjects: ['Agropilot CM', 'Elite Beauty Agent', 'Bertolli Pro 900'],
    relatedResearch: ['environmental-ai'],
    featured: true,
    suggestedQuestion: '¿Cuáles son los componentes de un RAG real?',
  },
  {
    id: '002',
    slug: 'mongo-decide-supabase-aprende',
    title: 'MONGO DECIDE. SUPABASE APRENDE.',
    subtitle: 'Por qué usamos dos bases de datos',
    type: 'ARCHITECTURE NOTE',
    status: 'FIELD NOTE',
    categories: ['ARQUITECTURA', 'DATA', 'PRODUCTO'],
    tags: ['database', 'mongodb', 'supabase', 'analytics', 'separation-of-concerns'],
    summary: 'No todas las bases de datos deben intentar resolver el mismo problema.',
    thesis: 'MongoDB para transacciones. Supabase para analítica, IA y reportes. Cada uno en su dominio.',
    context: 'InterMuniConnect requerió manejar transacciones complejas (rutas, pedidos, cambios de estado) mientras generaba inteligencia a partir de los datos. Elegir una sola base de datos habría sacrificado eficiencia en una de las dos responsabilidades.',
    body: `El principio:

MONGO
→ transactional truth
→ operaciones complejas
→ soporte multi-documento
→ rollback
→ consistencia forte

SUPABASE
→ analytical context
→ vector embeddings (pgvector)
→ queries de lectura escalables
→ reportes
→ inteligencia

Flujo completo:

1. Operación ocurre → Mongo garantiza
2. Evento → publicado
3. Supabase sincroniza
4. Embeddings se generan
5. IA consulta Supabase
6. Recomendaciones → backend controla

Por qué no una sola:

MongoDB + vectordb:
- Embeddings en Mongo ralentizan transacciones
- Búsqueda vectorial no es fortaleza
- Analytics requeriría denormalización

PostgreSQL + Mongo:
- Redis para caché
- Más complejidad
- PG no es ideal para documentos complejos

Supabase solo:
- RLS no es suficiente para lógica transaccional
- Escalabilidad de escritura limitada
- JSON en PG es más lento que BSON

La regla:

"Cada sistema debe tener una razón principal para existir."

MongoDB: "¿Necesita transacciones complejas?"
Supabase: "¿Necesita IA / Analytics?"

Si dices que sí a ambas, lo probablemente necesites ambas.`,
    relatedProjects: ['InterMuniConnect'],
    featured: false,
    suggestedQuestion: '¿Por qué InterMuniConnect usa MongoDB y Supabase juntos?',
  },
  {
    id: '003',
    slug: 'la-ia-no-deberia-inventar-el-precio',
    title: 'LA IA NO DEBERÍA INVENTAR EL PRECIO',
    subtitle: 'Cuándo la determinación es mejor que la predicción',
    type: 'DECISION LOG',
    status: 'FIELD NOTE',
    categories: ['PRODUCTO', 'ARQUITECTURA', 'AI'],
    tags: ['pricing', 'deterministic', 'business-logic', 'ai-responsibility'],
    summary: 'Cuando una regla de negocio debe ser explicable y reproducible, conviene mantenerla determinista.',
    thesis: 'No todo lo que puede hacer un LLM debería hacerlo. Especialmente cuando afecta dinero.',
    context: 'InterMuniConnect maneja cálculo de tarifas. Temptación: "usemos IA para calcular dinámicamente". Realidad: los precios son una decisión de negocio, no un output de modelo.',
    body: `El backend determina el precio consultando:

✓ Distancia (km)
✓ Segmento (luz, medio, pesado)
✓ Peajes (región)
✓ Desviación (de ruta óptima)
✓ Duración (tiempo estimado)
✓ Ocupación (capacidad)

→ Tarifa base
→ Ajustes
→ Fee final

La IA:

- Explica por qué es ese precio
- Recomienda optimizaciones
- Contextualiza (tráfico, clima)
- Sugiere alternativas

Nunca:

- Inventa un precio nuevo
- Cambia la lógica de cálculo
- Decide sin transparencia

Por qué:

1. TRAZABILIDAD
"¿Por qué 45 soles?" → backend lo explica.
"¿Por qué la IA dijo 45?" → no se sabe.

2. CONSISTENCIA
Dos clientes, mismas condiciones → mismo precio.
IA genera variabilidad.

3. REGULACIÓN
En algunos contextos, precios deben auditar.
"Un modelo dijo así" no pasa auditoría.

4. NEGOCIO
El equipo de producto decide precios.
No delegar a un modelo.

La regla de oro:

"IA puede explicar y recomendar.
Backend decide y garantiza."`,
    relatedProjects: ['InterMuniConnect'],
    featured: false,
    suggestedQuestion: '¿Por qué el backend calcula el precio en lugar de la IA?',
  },
  {
    id: '004',
    slug: 'twilio-no-es-el-cerebro',
    title: 'TWILIO NO ES EL CEREBRO',
    subtitle: 'La telefonía es un canal, no una arquitectura',
    type: 'ARCHITECTURE NOTE',
    status: 'FIELD NOTE',
    categories: ['ARQUITECTURA', 'INFRAESTRUCTURA', 'PRODUCTO'],
    tags: ['twilio', 'voice', 'channels', 'architecture', 'separation-of-concerns'],
    summary: 'La telefonía debería ser un canal. La inteligencia y el contexto deben permanecer en el sistema.',
    thesis: 'Usar Twilio para "procesar órdenes" es usar una herramienta para resolver un problema equivocado.',
    context: 'Elite Beauty Agent necesitaba soporte de voz. Tentación: implementar la lógica del agente dentro de Twilio. Realidad: Twilio es un transporte, no un arquitecto.',
    body: `Arquiteuctura CORRECTA:

Twilio Studio
    ↓ webhook
FastAPI
    ↓
Supabase (contexto: cliente, historial)
    ↓
RAG (documentos de producto)
    ↓
LLM (Claude vía Anthropic)
    ↓
Backend (decisión: qué hacer)
    ↓
Twilio (TwiML response)
    ↓
Teléfono

Qué hace Twilio:
- Recibe la llamada
- Transcribe audio (si aplica)
- Enruta al webhook
- Reproduce TwiML

Qué hace el backend:
- Mantiene contexto del cliente
- Consulta IA
- Decide próximo paso
- Genera respuesta

Por qué:

1. TESTEABLE
El backend funciona sin Twilio.
Puedes probar con curl.

2. PORTABLE
Si quieres WhatsApp, Telegram, email:
el backend no cambia.

3. MANTENDIBLE
Lógica en un lugar.
Cambios no afectan Twilio.

4. ESCALABLE
Frontend web, app mobile, voz, SMS:
todos hablan con el backend.

5. OBSERVABLE
Logs, métricas, debugging:
Supabase, Datadog, et al.
No Twilio Studio.

La regla:

"Provider maneja transporte.
Backend guarda inteligencia."`,
    relatedProjects: ['Elite Beauty Agent'],
    featured: false,
    suggestedQuestion: '¿Cómo funciona la arquitectura de voz en Elite Beauty?',
  },
  {
    id: '005',
    slug: 'de-agrosoft-a-agropilot',
    title: 'DE AGROSOFT CM A AGROPILOT CM',
    subtitle: 'Evolución de un nombre, evolución de una visión',
    type: 'FIELD NOTE',
    status: 'FIELD NOTE',
    categories: ['AGROTECH', 'PRODUCTO'],
    tags: ['naming', 'product-evolution', 'vision', 'architecture'],
    summary: 'Cambiar el nombre representa una evolución de visión: de aplicación a ecosistema.',
    thesis: 'El nombre refleja la amplitud de lo que el sistema intenta hacer.',
    context: 'Agrosoft CM era una visión singular. Agropilot CM es un ecosistema que cubre múltiples actores y canales.',
    body: `AGROSOFT CM

"Aplicación de gestión agropecuaria"
- módulos
- escritorio
- base de datos
- usuarios con roles

AGROPILOT CM

"Ecosistema de inteligencia agrícola"
- múltiples módulos interconectados
- predicción y recomendación
- multi-tenancy (varias fincas)
- mobile, web, voz
- integración con IoT
- costos, animal, cosecha
- histórico, tendencias, alertas

Diferencia en arquitectura:

Agrosoft: CRUD
Agropilot: Data pipeline + Inteligencia + Canales

Capacidades de Agropilot:

✓ Lechería (producción, salud, costos)
✓ Porcicultura (crecimiento, alimentación, sanidad)
✓ Silvopastoril (tierra, carbono, valor)
✓ Inventario (trazabilidad)
✓ Costos (análisis de márgenes)
✓ Trabajadores (rotación, capacitación)
✓ Asistente IA (consultas, recomendaciones)

Por qué el cambio de nombre importa:

1. PROMESA
"Agrosoft" = software de finca
"Agropilot" = asistente que "pilotea" decisiones

2. POSICIONAMIENTO
Es más que guardar datos.
Es tomar decisiones mejores.

3. EXPANSIÓN
Nos permite crecer sin redefinir.
Agropilot IoT, Agropilot Mobile, etc.

4. DIFERENCIAL
En un mercado de CRUD, somos IA + datos.`,
    relatedProjects: ['Agropilot CM'],
    featured: false,
    suggestedQuestion: '¿Cuál es la diferencia entre Agrosoft y Agropilot?',
  },
  {
    id: '006',
    slug: 'una-finca-tambien-es-un-sistema',
    title: 'UNA FINCA TAMBIÉN ES UN SISTEMA',
    subtitle: 'Aprendiendo que los problemas agrícolas son arquitecturales',
    type: 'FIELD NOTE',
    status: 'FIELD NOTE',
    categories: ['AGROTECH', 'ARQUITECTURA', 'INVESTIGACION'],
    tags: ['systems-thinking', 'agriculture', 'domain-knowledge', 'complexity'],
    summary: 'Animales, costos, alimentación, producción e inventario forman relaciones, estados y eventos igual que cualquier sistema de software.',
    thesis: 'La agriculturaes un problema de sistemas, no simplemente un problema de datos.',
    context: 'AgroDiversity y Agropilot enseñan que no puedes modelar correctamente sin entender cómo interactúan los componentes de la finca.',
    body: `ENTIDADES

Animal (estado, historial, valor)
Cosecha (predicción, rendimiento, calidad)
Inversión (dinero, herramientas, semilla)
Trabajador (capacidad, tiempo, especialidad)
Tierra (uso, carbono, salud)

RELACIONES

Animal → costo diario
Animal → producción
Animal → historial de salud
Cosecha → inversión
Cosecha → rendimiento
Rendimiento → decisión próxima siembra
Tierra → carbono
Carbono → regulación / subsidio
Trabajador → animal
Trabajador → capacidad

ESTADO

La finca tiene estado actual:
"¿Cuántos terneros entraron esta semana?"
"¿Qué pasó con la cosecha de soya?"
"¿Cuáles animales están enfermos?"
"¿Qué quedó disponible del presupuesto?"

EVENTOS

Nace un animal → costo inicia → presupuesto baja
Se cosecha → se vende → se reinvierte o se ahorra
Enfermedad → tratamiento → costo sube
Cambio estación → decisión de qué plantar

EVOLUCIÓN

Sin Agropilot:
"Sé lo que pasa porque veo la finca."
Escalable hasta: 1 persona, 1 finca

Con Agropilot:
Lechería + Porcicultura + Silvopastoril
+ Trabajadores + Costos + IA
= Operación compleja que requiere visibilidad

La analogía con software:

Microservicios no funcionan sin observabilidad.
Fincas no funcionan sin visibilidad de datos.

No banalizar el trabajo del campo.
La agricultura requiere ingeniería.`,
    relatedProjects: ['Agropilot CM', 'AgroDiversity'],
    featured: false,
    suggestedQuestion: '¿Cómo es que una finca es como un sistema de software?',
  },
  {
    id: '007',
    slug: 'multi-tenant-sin-multiplicar-bases-de-datos',
    title: 'MULTI-TENANT SIN MULTIPLICAR BASES DE DATOS',
    subtitle: 'Aislamiento lógico vs. duplicación física',
    type: 'ARCHITECTURE NOTE',
    status: 'FIELD NOTE',
    categories: ['ARQUITECTURA', 'DATA', 'AGROTECH'],
    tags: ['multi-tenancy', 'database-design', 'row-level-security', 'scalability'],
    summary: 'Aislamiento lógico no significa duplicar toda la infraestructura.',
    thesis: 'Shared database + farm_id + RLS = multi-tenancy sin la complejidad operacional de N bases de datos.',
    context: 'Agropilot CM maneja múltiples fincas. Opciones: 1 BD por finca (disaster), 1 BD compartida (auditoría de datos). Elegimos: compartida + aislamiento lógico.',
    body: `ARQUITECTURA

Una sola base Supabase
+
farm_id en cada tabla
+
Row Level Security
+
JWT claims (farm_id)
+
Membership table

FLUJO

Usuario hace login
  ↓
JWT incluye farm_id
  ↓
API envía JWT
  ↓
Supabase lee JWT
  ↓
RLS filtra por farm_id
  ↓
Usuario ve solo SU finca

EJEMPLO: TRANSFERENCIA DE ANIMAL

Animal en Farm A:
  - ubicado en "Finca A"
  - historial en "Finca A"
  - costos acumulados en "Finca A"

Cambio de finca
  ↓
Se actualiza farm_id
  ↓
RLS: usuario de Finca B ahora ve al animal
  ↓
RLS: usuario de Finca A ya NO lo ve
  ↓
Historial se preserva
  ↓
Costos se asignan a nueva finca

VENTAJAS

1. SIMPLEZA OPERACIONAL
1 BD + 1 backups + 1 replicación

2. ANALYTICS AGREGADAS
"Rendimiento entre fincas"
Una sola query

3. INTELIGENCIA COMPARTIDA
Modelos aprenden de todos los datos
sin romper privacidad (RLS)

4. MIGRACIÓN
Animal entre fincas = 1 update

5. COSTOS
Infraestructura mínima

RIESGOS MITIGADOS

¿Qué si alguien quita farm_id del JWT?
→ RLS lo bloquea en la BD

¿Qué si quieren acceso a otra finca?
→ Membership tabla lo controla
→ Audit logs lo registran

¿Qué si la BD falla?
→ Todos afectados (pero igual de resiliente que N BDs)

PRINCIPIO

"Usa lógica aplicacional para aislamiento,
no duplicación infraestructural."`,
    relatedProjects: ['Agropilot CM'],
    featured: false,
    suggestedQuestion: '¿Cómo maneja Agropilot varias fincas en una sola base de datos?',
  },
  {
    id: '008',
    slug: 'un-fallback-debe-degradar-con-gracia',
    title: 'UN FALLBACK DEBE DEGRADAR CON GRACIA',
    subtitle: 'Qué hacer cuando el sistema principal falla',
    type: 'AI NOTE',
    status: 'FIELD NOTE',
    categories: ['ARQUITECTURA', 'AI', 'CALIDAD'],
    tags: ['resilience', 'fallback', 'graceful-degradation', 'model-routing'],
    summary: 'Fallback no significa repetir el mismo camino con otro nombre.',
    thesis: 'Un fallback debe ser categoricamente diferente del primary, no una copia más lenta.',
    context: 'Agropilot, Elite Beauty y JAC-IA requieren respuestas rápidas. Fallback debe degradar elegantemente, no fallar igual que el primario.',
    body: `PATRÓN

PRIMARY CHAIN

User Query
  ↓
Cache check (Redis)
  ↓
Model routing (Claude 3.5 Sonnet)
  ↓
RAG retrieval
  ↓
Response + Confidence score

FALLBACK CHAIN 1

If (no context or low confidence)
  ↓
Knowledge base predefined
  ↓
Pattern matching
  ↓
FAQ + Suggested questions
  ↓
Hand to human

FALLBACK CHAIN 2

If (model timeout or error)
  ↓
Cached response template
  ↓
Static answer (e.g., "loading...")
  ↓
Queue for async processing

FALLBACK CHAIN 3

If (LLM unavailable)
  ↓
Local rule engine
  ↓
Simple response
  ↓
"Check back later"

ANTIPATRÓN

PRIMARY
  ↓ fails
FALLBACK = PRIMARY with different endpoint
  ↓ also fails
User gets error after long wait

Eso NO es degradación.

POR QUÉ FUNCIONA:

1. LATENCY
Primary: puede ser lenta si da mejor respuesta
Fallback 1: rápida porque es determinista
Fallback 2: muy rápida porque es cached
Fallback 3: instantánea porque es local

2. AVAILABILITY
Si hay contexto: respuesta inteligente
Si no hay contexto: respuesta segura
Si todo falla: respuesta honesta

3. UX
Usuario siempre obtiene algo
No es "error, intente luego"

IMPLEMENTACIÓN

try:
  respuesta = llm_with_rag(query)
except model_error:
  try:
    respuesta = knowledge_base_pattern(query)
  except no_match:
    try:
      respuesta = cached_similar(query)
    except:
      respuesta = static_fallback()

return respuesta_con_confianza`,
    relatedProjects: ['Agropilot CM', 'Elite Beauty Agent', 'JAC-IA'],
    featured: false,
    suggestedQuestion: '¿Cómo degradan gracefully los sistemas cuando fallan?',
  },
  {
    id: '009',
    slug: 'arreglar-git-sin-destruir-el-repositorio',
    title: 'ARREGLAR GIT SIN DESTRUIR EL REPOSITORIO',
    subtitle: 'Cuando varios tools sincronizan, la reparación agresiva rara vez funciona',
    type: 'LESSON',
    status: 'FIELD NOTE',
    categories: ['INFRAESTRUCTURA', 'CALIDAD'],
    tags: ['git', 'repository-maintenance', 'debugging', 'tools-integration'],
    summary: 'Cuando varias herramientas sincronizan el mismo repositorio, la reparación más agresiva rara vez debería ser la primera opción.',
    thesis: 'Diagnóstico antes de destrucción.',
    context: 'Voz Estratégica sincroniza código desde múltiples fuentes. Cuando falla, la tentación es "force-push" o "rm -rf .git". Ambas son desastres.',
    body: `EL PROBLEMA

Lovable.dev
GitHub
Local machine
CI/CD

Todos escriben en el mismo repo.

Síntoma: "Git está roto"
Realidad: 1 de 5 posibles causas

DIAGNÓSTICO

git fsck --full
→ Verifica integridad

git rev-list --objects --all | grep missing
→ Encuentra referencias rotas

git log --oneline | head -20
→ Verifica historial

git status
→ Estado actual

git remote -v
→ Qué remotes existen

CAUSAS COMUNES

1. Detached HEAD
Fix: git checkout main

2. Stale reference
Fix: git gc --prune=now

3. Conflicto de merge sin resolver
Fix: git merge --abort (si no completó)

4. Ref corrupted (raro)
Fix: git fsck y git reflog recover

5. .git/index bloqueado
Fix: rm .git/index.lock

POR QUÉ NO DESTROY

git reset --hard origin/main
→ Pierde trabajo local

rm -rf .git && git init
→ Pierde TODO el historial

git push --force
→ Sobrescribe a otros

git clean -ffdx
→ Borra archivos no trackeados (¿incluidos secrets?)

LA REGLA

Inspect
  ↓
Fsck (check)
  ↓
Isolate (crear rama de recovery)
  ↓
Repair (minimamente)
  ↓
Verify (test)
  ↓
Fetch safely (pull sin force)

CASO REAL

Lovable + GitHub conflictean
  ↓
git fsck → ref corrupted
  ↓
git rev-list → 3 objects missing
  ↓
git reflog → encontramos commit anterior
  ↓
git cherry-pick aquel commit
  ↓
Conflicto resuelto
  ↓
git push (no force)

Tiempo total: 15 min
Cambios perdidos: 0`,
    relatedProjects: ['Voz Estratégica'],
    featured: false,
    suggestedQuestion: '¿Cómo reparar un repositorio sin destruirlo?',
  },
  {
    id: '010',
    slug: 'como-se-que-una-solucion-resuelve-el-issue',
    title: '¿CÓMO SÉ SI UNA SOLUCIÓN REALMENTE RESUELVE EL ISSUE?',
    subtitle: 'La diferencia entre "compila" y "soluciona"',
    type: 'LESSON',
    status: 'FIELD NOTE',
    categories: ['CALIDAD', 'LIDERAZGO', 'INFRAESTRUCTURA'],
    tags: ['quality-assurance', 'root-cause-analysis', 'code-review', 'evidence'],
    summary: 'Que el código compile no demuestra que la causa raíz haya sido solucionada.',
    thesis: 'Compilación exitosa ≠ Problema resuelto.',
    context: 'Como TPC Reviewer de CONCAPAN y evaluador en Alignerr, uso siete criterios.',
    body: `LOS SIETE CRITERIOS

1. CORRECTNESS
¿Funciona para el caso propuesto?
Prueba: ejecuta y verifica output

2. ROOT CAUSE
¿Atacó la causa o el síntoma?
Síntoma: "El API retorna 422"
Causa: "El contrato entre frontend/backend falló"
¿La solución arregla el contrato?

3. MAINTAINABILITY
¿El código es claro?
¿Evita complejidad innecesaria?
¿Un nuevo engineer lo entiende?

4. VERIFICATION
¿La solución fue probada?
¿Hubo cambios laterales?
¿Se validó más allá del caso de prueba?

5. SCOPE
¿Atacó el problema solicitado?
¿Agregó características no pedidas?
"No pedir todo" > "pedir poco y recibir todo"

6. OVERENGINEERING
¿Una solución simple habría funcionado?
¿Se agregó complejidad sin beneficio?
Complejidad necesaria ≠ Complejidad.

7. EVIDENCE
¿Las conclusiones se apoyan en lo observado?
¿O son especulación?
"Cambiamos X y ahora funciona" ≠ "X era el problema"

APLICACIÓN

Un PR viene:
"Cambié el timeout de 5s a 10s, ahora funciona"

Verificación:

✓ CORRECTNESS: ¿realmente funciona ahora? Sí.
✓ ROOT CAUSE: ¿es timeout el problema? No está claro. ¿O era latencia de Red? ¿O fallaba antes de timeout?
✓ MAINTAINABILITY: código claro? Sí, 1 línea.
✓ VERIFICATION: ¿probó bajo presión? Solo local.
✓ SCOPE: ¿hay casos donde 10s sigue siendo insuficiente? Probablemente.
✓ OVERENGINEERING: No aplica.
✗ EVIDENCE: no hay datos de tiempo real que justifiquen 10s.

Rechazo: "Necesitamos observabilidad. ¿Cuál es el percentil 95 de latencia en producción?"

Cambio de enfoque:
"Agregué logging. Data muestra que latencia P95 = 7.2s. Cambié a 10s con margen."

Aprobado.

LA LECCIÓN

No es sobre ser riguroso por serlo.
Es sobre no arreglar un síntoma
y llamarlo solución.`,
    relatedProjects: [],
    relatedResearch: ['hybrid-ai'],
    featured: false,
    suggestedQuestion: '¿Qué hace que una solución realmente resuelva un problema?',
  },
  {
    id: '011',
    slug: 'de-autor-a-reviewer',
    title: 'DE AUTOR A REVIEWER',
    subtitle: 'La responsabilidad de evaluar es diferente a la de contribuir',
    type: 'RESEARCH NOTE',
    status: 'FIELD NOTE',
    categories: ['INVESTIGACION', 'LIDERAZGO', 'CALIDAD'],
    tags: ['peer-review', 'scientific-method', 'responsibility', 'concapan'],
    summary: 'Publicar obliga a defender una idea. Revisar obliga a evaluar la idea de otra persona con rigor y evidencia.',
    thesis: 'Ambos roles requieren integridad técnica, pero de formas diferentes.',
    context: '2025: Contribuí con dos publicaciones a IEEE CONCAPAN XLIII. 2026: Fui invitado a participar como TPC Reviewer en CONCAPAN XLIV.',
    body: `2025 — AUTHOR

Construcción de investigación:
OBSERVE → QUESTION → MODEL → BUILD → EVALUATE → DOCUMENT

Defiendo:
"Nuestro enfoque de RAG híbrido es válido porque..."
"Nuestros datos muestran que..."
"La arquitectura se justifica porque..."

Responsabilidad:
Ser honesto sobre limitaciones.
No ocultar datos que contradicen.
Citar trabajo previo.
Reproducibilidad.

2026 — REVIEWER

Evaluación de investigación de otros:

Lee propuesta
  ↓
¿La pregunta es clara?
¿Hay propuestas similares?
¿El método es sólido?
¿La evidencia soporta la conclusión?
¿Hay sesgos?
¿Es contribución real?
¿Está bien escrito?

Responsabilidad:
Ser justo sin ser blando.
Dar retroalimentación constructiva.
No rechazar porque no te gusta.
Buscar la verdad, no defender territorio.

DIFERENCIA

Como autor: "Aquí está nuestro aporte."
Como reviewer: "¿Es realmente un aporte?"

PRINCIPIO

Ambos roles son privilegio.
El privilegio requiere integridad.

No es validación mutua.
Es escrutinio mutuo.`,
    relatedProjects: [],
    relatedResearch: ['environmental-ai'],
    featured: false,
    suggestedQuestion: '¿Qué diferencia hay entre ser autor y ser revisor?',
  },
  {
    id: '012',
    slug: 'el-frontend-deberia-poder-fallar-menos',
    title: 'EL FRONTEND DEBERÍA PODER FALLAR MENOS QUE EL BACKEND',
    subtitle: 'Degradación parcial vs. impotencia total',
    type: 'ARCHITECTURE NOTE',
    status: 'FIELD NOTE',
    categories: ['ARQUITECTURA', 'PRODUCTO', 'CALIDAD'],
    tags: ['frontend-resilience', 'offline-first', 'graceful-degradation', 'ux'],
    summary: 'Una degradación parcial puede ser mejor que una experiencia completamente inutilizable.',
    thesis: 'Si el backend cae, el frontend no debería desaparecer.',
    context: 'Bertolli Pro 900 maneja operaciones críticas. Si la API falla, el usuario podría seguir usando algo.',
    body: `EJEMPLO

Carrito de compra:

PRIMARY
Agregar item → API → Carrito actualiza en vivo

FALLBACK 1
API timeout
  ↓
Guardar localmente (localStorage)
  ↓
Mostrar como "sincronizando..."
  ↓
Intentar sync en background

FALLBACK 2
API cae completamente
  ↓
Carrito funciona local
  ↓
Usuario puede completar compra
  ↓
Se envía cuando se reconecte

FALLBACK 3
JavaScript deshabilidado
  ↓
Formulario HTML clásico
  ↓
Vía POST tradicional
  ↓
No es 2024, pero funciona

¿POR QUÉ IMPORTA?

Backend 99.9% uptime
Usuario 0% funcionalidad durante downtime

Frontend con degradación:
Usuario 30% funcionalidad durante downtime

Inversión de esfuerzo:
10% del código del backend
Pero 90% del usuario experience mejora

TÉCNICAS

1. LOCAL STORAGE
Versiones cached de datos
Formularios drafts
Historial local

2. SERVICE WORKERS
Intercepción de requests fallidas
Fallback offline
Cache strategys

3. OPTIMISTIC UI
Mostrar cambio antes de confirmación
Rollback si falla
No esperar al servidor

4. STATIC ASSETS
FAQ en JS bundled
Guía de usuario sin API
Información esencial siempre accesible

5. HELPER CONTENT
"El API está fuera. Aquí está el número de soporte."
No un error vago

PRINCIPIO

"El frontend es una aplicación,
no solo un renderizador del backend."`,
    relatedProjects: ['Bertolli Pro 900'],
    featured: false,
    suggestedQuestion: '¿Cómo degrada elegantemente el frontend cuando el backend falla?',
  },
]

export const thoughtStream: BlogThought[] = [
  { id: '1', text: 'Mongo decide. Supabase aprende. La IA explica y recomienda.', relatedSlug: 'mongo-decide-supabase-aprende' },
  { id: '2', text: 'Un fallback no sirve si falla igual que el sistema principal.', relatedSlug: 'un-fallback-debe-degradar-con-gracia' },
  { id: '3', text: 'La IA puede explicar una tarifa. No debería inventarla.', relatedSlug: 'la-ia-no-deberia-inventar-el-precio' },
  { id: '4', text: 'Twilio maneja telefonía. El backend conserva el cerebro.', relatedSlug: 'twilio-no-es-el-cerebro' },
  { id: '5', text: 'Multi-tenant no significa tener una base diferente por cliente.', relatedSlug: 'multi-tenant-sin-multiplicar-bases-de-datos' },
  { id: '6', text: 'Un agente no es inteligente solo porque tenga un LLM.', relatedSlug: 'rag-no-es-pegar-una-base-vectorial-a-un-llm' },
  { id: '7', text: 'Probar una solución es parte de construirla.', relatedSlug: 'como-se-que-una-solucion-resuelve-el-issue' },
  { id: '8', text: 'Un repositorio sano vale más que una reparación destructiva rápida.', relatedSlug: 'arreglar-git-sin-destruir-el-repositorio' },
]

export const decisionLog: DecisionLogEntry[] = [
  {
    id: 'd1',
    title: 'MONGO + SUPABASE',
    context: 'InterMuniConnect necesita operaciones transaccionales y también analítica/IA.',
    options: ['Mongo only', 'Supabase only', 'Hybrid (Mongo + Supabase)'],
    decision: 'Hybrid',
    why: 'MongoDB para operación principal, Supabase para analytics, vector search y contexto IA.',
    tradeoff: 'Dos sistemas implican más integración, pero el backend coordina ambos de forma transparente.',
    relatedProject: 'InterMuniConnect',
  },
  {
    id: 'd2',
    title: 'DETERMINISTIC PRICING',
    context: 'InterMuniConnect maneja cálculo de tarifas dinámicas.',
    options: ['LLM calcula precio', 'Backend determina, IA explica', 'Hybrid (backend + LLM override)'],
    decision: 'Backend determina, IA explica',
    why: 'Precios deben ser trazables, audibles y reproducibles. IA recomienda pero no decide.',
    tradeoff: 'IA menos "inteligente" pero sistema más confiable y regulado.',
    relatedProject: 'InterMuniConnect',
  },
  {
    id: 'd3',
    title: 'VOICE AS CHANNEL',
    context: 'Elite Beauty Agent necesita soporte de voz.',
    options: ['Twilio as application logic', 'Twilio as transport only', 'Custom voice solution'],
    decision: 'Twilio as transport only',
    why: 'Backend mantiene inteligencia. Twilio solo recibe/envía audio. Escalable a otros canales.',
    tradeoff: 'Más webhooks, pero código testeable y portable.',
    relatedProject: 'Elite Beauty Agent',
  },
  {
    id: 'd4',
    title: 'MULTI-TENANCY STRATEGY',
    context: 'Agropilot CM maneja múltiples fincas.',
    options: ['1 BD por finca', '1 BD compartida + RLS', 'Hybrid multi-region'],
    decision: '1 BD compartida + RLS',
    why: 'Aislamiento lógico sin duplicación infraestructural. Analytics agregadas. Escalabilidad.',
    tradeoff: 'Requiere implementación cuidadosa de RLS. Mayor complejidad en queries.',
    relatedProject: 'Agropilot CM',
  },
  {
    id: 'd5',
    title: 'RAG FALLBACK STRATEGY',
    context: 'JAC-IA, Agropilot, Elite Beauty necesitan respuestas confiables.',
    options: ['Retry same model', 'Fallback to simpler model', 'Fallback to knowledge base', 'Static response'],
    decision: 'Graduated fallback chain',
    why: 'Cada nivel degrada categoricamente, no solo más lentamente.',
    tradeoff: 'Más código, pero UX significativamente mejor durante fallos.',
    relatedProject: 'Agropilot CM, Elite Beauty Agent, JAC-IA',
  },
]

export const lessonLog: LessonLogEntry[] = [
  {
    id: 'l1',
    title: 'API CONTRACT MISMATCH',
    context: '422 error del chat.',
    symptom: 'Frontend enva {"message": "..."}, Backend espera {"text": "..."} .',
    cause: 'Frontend y Backend no sincronizaron contrato de datos.',
    fix: 'Actualizar contrato en ambos lados. Agregar tests e2e.',
    lesson: 'Frontend y backend pueden funcionar por separado y aun así fallar juntos si no comparten contrato claro.',
  },
  {
    id: 'l2',
    title: 'FAKE FALLBACK',
    context: 'Respuesta estática de JAC-IA.',
    symptom: 'API retorna 200 pero con datos dummy.',
    cause: 'Fallback llegó a static response, pero código no lo detectó.',
    fix: 'Agregar campo "confidence" o "is_generated" en respuesta.',
    lesson: 'Un endpoint 200 no demuestra que exista inteligencia real. Necesitas instrospección.',
  },
  {
    id: 'l3',
    title: 'GIT REF CORRUPTION',
    context: 'Voz Estratégica, sincronización Lovable + GitHub.',
    symptom: 'git log retorna errores. git push rechazado.',
    cause: 'Merge desincronizada entre dos herramientas.',
    fix: 'git fsck, git reflog, cherry-pick de commit bueno, push sin force.',
    lesson: 'Diagnóstico antes de destrucción. Force-push rara vez es la solución.',
  },
  {
    id: 'l4',
    title: 'MISSING MEDIA',
    context: 'Portfolio actual (sí, yo mismo).',
    symptom: 'Imagen rota en UI.',
    cause: 'Ruta existe en código. Archivo no existe en /public.',
    fix: 'Crear placeholder o CSS visual en lugar de imagen.',
    lesson: 'Declarar una ruta de imagen no significa que el archivo exista. Validar asset availability.',
  },
]

export const currentQuests: CurrentQuest[] = [
  { id: 'q1', name: 'AI Agents', status: 'BUILDING' },
  { id: 'q2', name: 'RAG', status: 'BUILDING' },
  { id: 'q3', name: 'Model Evaluation', status: 'BUILDING' },
  { id: 'q4', name: 'Computer Vision', status: 'EXPLORING' },
  { id: 'q5', name: 'IoT for Agriculture', status: 'FUTURE' },
  { id: 'q6', name: 'Public API Agropilot', status: 'FUTURE' },
]
