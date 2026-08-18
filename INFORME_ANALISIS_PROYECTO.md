# Informe de análisis: portafolio interactivo de Tania Peláez Valverde

## 1. Conclusión ejecutiva

Este proyecto destaca porque no trata el portafolio como una galería estática, sino como una experiencia narrativa. La persona visitante primero conoce la identidad profesional, después entiende el contexto institucional, luego descubre la experiencia adquirida y finalmente explora las evidencias del trabajo. La navegación, las aperturas progresivas, las tarjetas transformables, los carruseles y los visores de medios sirven a ese recorrido.

Su mayor fortaleza es la unión de cuatro capas:

1. **Arquitectura clara:** cuatro vistas principales, componentes reutilizables y datos separados de la presentación.
2. **Interacción con sentido:** la información se revela por selección, expansión, giro, desplazamiento o apertura en modal.
3. **Dirección visual coherente:** tipografías, colores, profundidad, ritmo, numeración y movimientos mantienen una misma identidad.
4. **Contenido profesional completo:** no solo enseña piezas finales; explica contexto, objetivos, públicos, decisiones estratégicas, ejecución e impacto.

Por eso se percibe “completo”: combina presentación personal, caso institucional, experiencia profesional, pensamiento estratégico, resultados, material audiovisual y contacto dentro de un único relato.

## 2. Radiografía técnica

| Elemento | Implementación |
|---|---|
| Base | React 19 + Vite 6 |
| Navegación | React Router con `BrowserRouter`, `Routes`, `Route`, `Link` y `useLocation` |
| Vistas | Inicio, Empresa, Experiencia y Portafolio |
| Estilos | CSS Modules por componente/vista + variables globales |
| Estado | `useState` local, próximo al elemento que controla |
| Referencias DOM | `useRef` para video, cursor y efectos de inclinación |
| Efectos | `useEffect`, `IntersectionObserver`, `requestAnimationFrame` y temporizadores controlados |
| Medios | Imágenes, PDF y videos locales servidos desde `public/` |
| Dependencias visuales | Ninguna: carrusel, cursor, tilt, lightbox y reveals son propios |

El código fuente contiene 13 archivos JSX con unas 4.061 líneas y 12 hojas CSS con unas 7.167 líneas. La compilación de producción fue exitosa: Vite procesó 64 módulos y generó aproximadamente 340,34 kB de JavaScript y 121,73 kB de CSS antes de gzip.

## 3. Arquitectura y organización

```text
src/
├── App.jsx                         Orquestación, rutas y scroll
├── main.jsx                        Montaje y BrowserRouter
├── components/
│   ├── Cursor.jsx                  Cursor personalizado
│   ├── Reveal.jsx                  Entrada al viewport reutilizable
│   ├── carousel/ExoticCarousel.jsx Carrusel 3D propio
│   ├── layout/                     Navbar y footer persistentes
│   └── publicaciones/              Tarjeta y lightbox de publicaciones
├── data/publicaciones.js           Contenido de proyectos y medios
├── hooks/useTilt.js                Inclinación 3D reutilizable
├── pages/
│   ├── Home.jsx
│   ├── Empresa.jsx
│   ├── Experiencia.jsx
│   └── Portafolio.jsx
└── styles/variables.css            Tokens y comportamiento global
```

La separación es acertada por tres motivos:

- Las páginas controlan su propio relato y estado.
- Los patrones repetibles —revelado, inclinación, carrusel, publicación y modal— viven fuera de las páginas.
- El catálogo audiovisual se describe como datos; agregar una publicación no exige reescribir la tarjeta o el lightbox.

El uso de CSS Modules evita colisiones entre miles de líneas de estilos. Las variables globales (`cream`, `rose`, `brown`, `sand`, `gold`, `white`) convierten la paleta en un sistema y no en colores sueltos.

## 4. Cómo se organizaron las vistas y las redirecciones

### 4.1 Mapa de rutas

| Ruta | Función narrativa |
|---|---|
| `/` | Presentación, perfil, resumen de empresa, resumen de experiencia y contacto |
| `/empresa` | Contexto de la organización y razones para elegirla |
| `/experiencia` | Funciones, aprendizajes, crecimiento y habilidades |
| `/portafolio` | Análisis estratégico, campañas, publicaciones y evidencias audiovisuales |

La progresión natural es:

```text
Inicio → Empresa → Experiencia → Portafolio → Contacto
```

No es una obligación lineal: la portada permite saltar a secciones, la barra conduce al inicio y las llamadas a la acción enlazan las vistas relacionadas.

### 4.2 Dos clases de navegación

El proyecto combina correctamente:

- **Anclas dentro de una vista:** `#perfil`, `#empresa`, `#experiencia`, `#contacto`, `#introduccion`.
- **Rutas reales entre vistas:** `/empresa`, `/experiencia`, `/portafolio`.

Esto evita convertir todo en una página interminable, pero conserva la fluidez del scroll donde tiene sentido.

### 4.3 Gestor de desplazamiento

`ScrollManager` observa cambios de `pathname` y `hash`. Si encuentra una ancla, espera un frame de renderizado y ejecuta `scrollIntoView({ behavior: 'smooth' })`; si no hay ancla, lleva la nueva vista al inicio. Gracias a esto, un enlace como `/#empresa` vuelve a la portada y aterriza en la sección correcta.

### 4.4 Navbar contextual

La barra no se comporta igual en todas las páginas:

- En el inicio permanece oculta mientras el hero está visible y aparece al abandonarlo.
- En las vistas internas aparece desde el principio y reemplaza el menú de anclas por “Inicio”.
- Es fija, translúcida, desenfoca el fondo y entra con una transición vertical.

Ese cambio contextual reduce ruido en la portada y ofrece una salida clara en las páginas profundas.

## 5. Análisis de cada vista

### 5.1 Inicio: una portada que funciona como tablero interactivo

La primera vista presenta tres capas simultáneas: identidad, perfil e imagen. La retícula, los blobs, la fotografía enmarcada, la insignia y la descarga del CV producen una composición editorial, no una plantilla de currículum convencional.

Sus interacciones principales son:

- **Video expandible:** una tarjeta compacta se transforma en reproductor completo sin abandonar la página.
- **Estados reales del video:** diferencia carga, disponibilidad, reproducción, finalización y error. Incluso traduce los códigos nativos de error de medios en mensajes entendibles.
- **Métricas desplegables:** al seleccionar una métrica, aparece su explicación y cambia el signo de acción.
- **Áreas de interés seleccionables:** funcionan como pequeños acordeones; una opción activa expone el enfoque profesional.
- **Tarjetas con tilt:** los accesos a Empresa y Experiencia responden a la posición del puntero con perspectiva 3D.
- **Contacto accionable:** correo, WhatsApp e Instagram son acciones reales, no texto decorativo.

La virtud clave es la divulgación progresiva: el visitante recibe primero el titular y decide qué ampliar. Esto mantiene limpia una página con bastante información.

### 5.2 Empresa: contexto convertido en exploración

Esta vista transforma información institucional potencialmente densa en bloques variados:

- Hero con marca, ubicación y salto a contenido.
- Datos rápidos en tarjetas inclinables.
- Sección histórica con dato lateral fijo en escritorio.
- Lista de funciones en acordeón.
- Tarjetas seleccionables sobre impacto rural, económico y cultural.
- Relato personal con imagen y cita destacada.
- Enlaces a redes de la organización.

El acordeón permite abrir y cerrar cada función usando un solo índice (`openFunction`). Volver a pulsar la opción activa la cierra. El uso de `aria-expanded` hace que el estado no sea exclusivamente visual.

Las tarjetas de impacto conservan una selección activa mediante `activeImpact`; el color, icono y texto de acción confirman cuál fue elegida. Es una forma sencilla de convertir lectura pasiva en exploración.

### 5.3 Experiencia: interacción como metáfora de profundidad

Aquí aparece uno de los recursos más eficaces del proyecto: las tarjetas de funciones tienen frente y reverso.

- El frente resume categoría, función y especialidad.
- Al hacer clic, Enter o barra espaciadora, la tarjeta gira 180 grados.
- El reverso explica la participación concreta.
- Antes del giro, la tarjeta se inclina levemente según el puntero.

Técnicamente, el efecto surge de `perspective`, `transform-style: preserve-3d`, dos caras absolutas con `backface-visibility: hidden` y un `rotateY(180deg)`. No es un cambio brusco de contenido: el movimiento comunica que existe una segunda capa de información.

La vista también incluye:

- **Indicadores con detalle dinámico:** Área, Modalidad y Enfoque actualizan un panel común.
- **Aprendizajes alternados:** entran desde izquierda y derecha al alcanzar el viewport.
- **Habilidades expansibles:** cada categoría abre una lista de competencias.
- **CTA final:** conduce directamente a las evidencias del portafolio.

El resultado equilibra dos necesidades: contar mucho y evitar un muro de texto.

### 5.4 Portafolio: el núcleo más completo

Esta vista demuestra trabajo y, al mismo tiempo, explica el pensamiento detrás del trabajo. Su secuencia es especialmente sólida:

1. Presentación del caso.
2. Diagnóstico de plataformas y públicos.
3. Decisiones de ejecución.
4. Selector de proyectos.
5. Desarrollo de campaña.
6. Pilares estratégicos.
7. Publicaciones y resultados.
8. Contacto.

#### Análisis estratégico interactivo

Facebook e Instagram son tarjetas seleccionables. La elección modifica una lectura estratégica inferior. Después, tres públicos se comportan como acordeones y revelan preferencias de consumo. Así, la estrategia deja de ser una tabla estática y se convierte en comparación manipulable.

#### Navegador de proyectos

Tres tarjetas abren “Tu voto, tu gremio”, “#ESDELC” y “Más allá del lente”. Solo una sección permanece abierta. Cuando se selecciona otra:

1. React actualiza `openSection`.
2. CSS anima el contenedor de `0fr` a `1fr`.
3. Tras 600 ms, la página hace scroll suave hasta el contenido.

La espera es importante: impide que la variación de altura compita con el desplazamiento y termine en una posición incorrecta.

#### Acordeones anidados

Hay tres niveles de apertura sin perder claridad:

- El proyecto completo se abre desde el navegador principal.
- Dentro de la campaña se abren o cierran las piezas producidas.
- En categorías como #ESDELC y cobertura se abren u ocultan las publicaciones.

El patrón CSS de `display: grid` y `grid-template-rows: 0fr/1fr` permite animar altura variable sin calcular píxeles en JavaScript.

#### Pestañas de pilares

La campaña contiene tres pestañas semánticas. Cambiar de pilar actualiza concepto, enfoque, descripción, temas y propuesta creativa desde un único arreglo de datos. El panel es dinámico, pero la estructura permanece estable, lo cual evita duplicación.

#### Evidencia y resultados

Cada publicación muestra miniatura, numeración y estadísticas. Las piezas con múltiples archivos llevan una insignia de cantidad. Al seleccionarlas se abre un visor oscuro que reutiliza el carrusel. Esto conecta la explicación estratégica con la prueba tangible.

## 6. Por qué el carrusel parece “salirse” de la pantalla

`ExoticCarousel` no es un swiper lineal convencional. Calcula para cada elemento su distancia más corta respecto al índice activo, incluso cuando el recorrido cruza el final del arreglo. Ese desplazamiento se guarda en variables CSS (`--offset` y `--abs`).

Cada slide se transforma con una combinación de:

- `translateX(calc(var(--offset) * 72vw))`: empuja los laterales casi un ancho de viewport.
- `translateZ(...)`: envía los elementos no activos hacia el fondo.
- `rotateY(...)`: orienta las tarjetas como un abanico.
- `scale(...)`: reduce las piezas lejanas.
- `opacity(...)`: refuerza jerarquía y profundidad.
- `perspective: 1800px`: hace visible la escena tridimensional.

El contenedor exterior usa el patrón `left: 50%`, `width: 100vw` y `translateX(-50%)`. Así rompe deliberadamente el ancho del contenido central y ocupa toda la ventana. Como además tiene `overflow: hidden`, las piezas parecen atravesar los límites laterales sin generar scroll horizontal.

La sensación se completa con:

- blobs desenfocados en movimiento;
- un aro punteado rotatorio;
- borde dorado y pulso suave en la pieza activa;
- sombra más intensa en primer plano;
- transición elástica de 850 ms.

### Controles del carrusel

El componente admite:

- reproducción automática cada 4,2 segundos;
- sentido normal o inverso;
- pausa al pasar el ratón;
- flechas laterales;
- indicadores directos;
- teclado con flechas izquierda/derecha;
- swipe táctil con umbral de 40 px;
- variante compacta para tarjetas;
- imágenes y videos en el mismo arreglo;
- apertura del elemento activo en lightbox;
- desactivación del autoplay y de animaciones si el usuario prefiere movimiento reducido.

El carrusel es reutilizable porque su API se limita a `media`, `reverse`, `interval`, `compact` y `onOpen`.

## 7. Sistema de interacción transversal

### Reveal al entrar en pantalla

`Reveal` acepta cualquier etiqueta, retraso y clase. Un `IntersectionObserver` alterna la clase global `on`; CSS pasa el elemento de opacidad cero y 44 px hacia abajo a su posición natural. Los retrasos escalonados crean ritmo de lectura sin duplicar lógica.

### Tilt reutilizable

`useTilt` obtiene la posición normalizada del puntero dentro de un elemento y la convierte en grados de rotación. Al salir, restaura la tarjeta con una curva suave. La página Empresa lo reutiliza con distintas intensidades.

### Cursor personalizado

Un punto sigue la posición real y un aro la persigue con interpolación en `requestAnimationFrame`. Sobre enlaces, botones o elementos marcados como interactivos, el aro crece y cambia de rosa a dorado. En móvil desaparece y vuelve el cursor normal.

### Lightbox

El visor:

- bloquea el scroll del documento;
- cierra mediante botón, tecla Escape o clic en el fondo;
- limpia el listener y restaura el overflow al desmontarse;
- reutiliza `ExoticCarousel`, por lo que una publicación puede abrir imágenes o videos sin lógica duplicada.

## 8. Dirección visual

La interfaz se siente coherente porque repite un vocabulario visual reconocible:

- **Rosa:** acción, selección, identidad y énfasis.
- **Dorado:** jerarquía secundaria, detalle y prestigio.
- **Café:** fondos profundos y vínculo con el contexto cafetero.
- **Crema y arena:** superficies editoriales cálidas.
- **Playfair Display:** títulos con carácter editorial.
- **Outfit:** interfaz y lectura contemporánea.
- **Números 01, 02, 03:** orientación y sensación de caso de estudio.
- **Círculos, blobs y gradientes:** continuidad orgánica.
- **Sombras y perspectiva:** capas y materialidad.

La alternancia entre superficies claras y oscuras evita monotonía. Las animaciones comparten curvas y duraciones similares, por lo que el producto parece diseñado como conjunto.

## 9. Diseño responsivo y accesibilidad

### Decisiones acertadas

- Uso amplio de `clamp()` para tipografía y dimensiones fluidas.
- Rejillas que pasan de tres o dos columnas a una.
- Carrusel adaptado a un ancho máximo cercano al 78% del viewport en móvil.
- Navbar con espacios y tipografía reducidos en varios breakpoints.
- Cursor desactivado por debajo de 600 px.
- Varias reglas `prefers-reduced-motion`.
- Botones reales para la mayoría de interacciones.
- Estados `aria-expanded`, `aria-pressed` y `aria-selected`.
- Giro de tarjetas accesible con teclado.
- Navegación del carrusel mediante teclado y gestos.

### Aspectos por mejorar

- El lightbox debería usar `role="dialog"`, `aria-modal="true"`, título accesible, bloqueo de foco y devolución del foco al disparador.
- Las imágenes del carrusel usan `alt=""`; conviene incorporar descripciones desde los datos.
- Las pestañas declaran `role="tab"`, pero falta asociar cada pestaña con un `tabpanel` mediante `aria-controls`/`aria-labelledby` y completar la navegación de teclado propia del patrón.
- El carrusel debería anunciar la diapositiva activa, por ejemplo “2 de 7”, y pausar también al recibir foco.
- `Reveal` todavía conserva su transición global bajo movimiento reducido; las vistas desactivan muchas animaciones, pero conviene cubrir `.rv` de manera central.
- El tamaño base `html { font-size: 140%; }` favorece legibilidad, pero exige comprobar con zoom 200% que ningún panel de altura limitada esconda texto.

## 10. Rendimiento y mantenibilidad

### Lo que está bien

- La aplicación compila sin errores.
- No hay una dependencia pesada para cada efecto.
- Las imágenes de publicaciones usan `loading="lazy"`.
- Los videos inactivos del carrusel solicitan metadatos, no reproducción completa.
- Los listeners y observadores principales tienen limpieza al desmontarse.
- CSS Modules mantiene el aislamiento.

### Principal deuda: peso audiovisual

La carpeta `public` contiene 60 archivos y pesa aproximadamente **351,9 MB**. Los 22 videos suman **322,25 MB**. El video de presentación pesa **91,85 MB** y usa `preload="auto"` cuando se abre.

En una red móvil esto puede traducirse en espera, consumo de datos y presión de memoria. Además, cada miniatura de video solicita metadatos y mueve el tiempo a 0,1 s para obtener un fotograma.

Para producción se recomienda:

1. Comprimir y normalizar videos con H.264/AAC o WebM, resolución acorde al contenedor y bitrate web.
2. Crear posters estáticos para miniaturas y no usar el video como thumbnail.
3. Cambiar el video de presentación a `preload="metadata"` o `none`.
4. Servir medios desde almacenamiento/CDN con caché y soporte de rangos.
5. Generar variantes responsivas de imágenes (`srcset`, WebP/AVIF).
6. Cargar el lightbox y, si conviene, las páginas internas con división de código.

### Deuda de código y contenido

- El README sigue siendo el texto genérico de Vite y no documenta el proyecto.
- No existen scripts de lint ni pruebas automatizadas.
- No existe ruta comodín para una URL no encontrada.
- `BrowserRouter` requiere que el hosting redirija rutas desconocidas a `index.html`.
- `Home.module.css` tiene bloques repetidos y redefiniciones tardías; funcionan por cascada, pero dificultan el mantenimiento.
- Los datos de estadísticas están separados de las publicaciones; pueden desincronizarse.
- El teléfono del inicio/WhatsApp termina en `3408`, mientras que el teléfono de Portafolio termina en `3409`.
- El enlace de LinkedIn del footer apunta a `#`.
- El contenido está embebido en JavaScript. Es cómodo para un portafolio pequeño, pero un CMS o JSON/YAML facilitaría actualizaciones frecuentes.

Estos puntos no invalidan la calidad creativa; indican el paso necesario entre una pieza sobresaliente de portafolio y una aplicación preparada para tráfico, mantenimiento y accesibilidad rigurosa.

## 11. Por qué se siente tan completo

El proyecto cubre las preguntas que un reclutador, cliente o evaluador suele hacerse:

| Pregunta | Dónde se responde |
|---|---|
| ¿Quién es la profesional? | Hero y Perfil |
| ¿En qué contexto trabajó? | Empresa |
| ¿Qué hizo? | Experiencia y tarjetas de funciones |
| ¿Qué aprendió? | Aprendizajes y habilidades |
| ¿Cómo piensa estratégicamente? | Análisis, públicos, plataformas y pilares |
| ¿Qué produjo? | Publicaciones, videos, fotos y carruseles |
| ¿Tuvo resultados? | Métricas de interacción |
| ¿Cómo la contacto? | Secciones de contacto y footer |

La interactividad aporta profundidad sin obligar a mostrar todo al mismo tiempo. El diseño utiliza el movimiento como señal:

- aparecer significa “ahora entra una idea”;
- expandir significa “hay más detalle”;
- girar significa “mira la otra cara del trabajo”;
- deslizar significa “hay una colección”;
- abrir el lightbox significa “observa la evidencia”;
- cambiar de ruta significa “entramos a otro capítulo”.

Esa correspondencia entre gesto y significado es la razón principal de que el sitio resulte memorable.

## 12. Guía para recrear un proyecto similar

### Paso 1: diseñar el relato antes que la animación

Definir cuatro capítulos:

1. Identidad y propuesta de valor.
2. Contexto o cliente.
3. Experiencia, responsabilidades y aprendizaje.
4. Casos con estrategia, ejecución y evidencia.

### Paso 2: separar contenido, componentes y vistas

- Guardar proyectos, medios, métricas y textos repetibles en arreglos de datos.
- Crear una página por capítulo.
- Extraer un componente cuando un patrón aparezca dos veces o tenga lógica propia.
- Mantener el estado lo más cerca posible del elemento que controla.

### Paso 3: crear un sistema visual mínimo

Definir tokens para colores, tipografía, anchos, radios, sombras, tiempos y curvas de animación. Elegir una función para cada color y repetir una escala de espaciado.

### Paso 4: implementar navegación híbrida

- React Router para capítulos.
- Anclas para secciones internas.
- Un gestor de scroll para rutas con hash.
- Navbar contextual según ubicación y posición.
- Ruta 404 y reescritura del servidor para una SPA.

### Paso 5: construir una biblioteca de interacción pequeña

Empezar por cinco primitivas:

1. `Reveal`: entrada con IntersectionObserver.
2. `useTilt`: respuesta 3D al puntero.
3. `Accordion`: apertura por estado y `0fr/1fr`.
4. `Carousel`: índice activo, teclado, touch y dots.
5. `Lightbox`: modal accesible que reutilice el carrusel.

### Paso 6: diseñar cada interacción con una pregunta

- ¿Qué información debe verse primero?
- ¿Qué puede permanecer oculta hasta que exista interés?
- ¿Qué gesto espera el usuario en escritorio, teclado y móvil?
- ¿Cómo se comunica visual y semánticamente el estado activo?
- ¿Qué ocurre con movimiento reducido?

### Paso 7: recrear el efecto “fuera del contenedor”

Usar un contenedor interno centrado para texto y un carrusel de `100vw` que rompa ese ancho. Posicionar cada slide de forma absoluta desde el centro y derivar `translateX`, `translateZ`, `rotateY`, escala y opacidad de su distancia al índice activo. Recortar en el contenedor exterior.

### Paso 8: tratar el contenido como caso de estudio

Para cada proyecto incluir:

- problema o contexto;
- objetivo;
- públicos;
- canales;
- concepto creativo;
- decisiones de ejecución;
- piezas producidas;
- métricas o aprendizaje.

### Paso 9: optimizar antes de publicar

- Comprimir medios y generar posters.
- Probar navegación solo con teclado.
- Probar anchos 320, 768, 1024 y 1440 px.
- Probar zoom 200% y movimiento reducido.
- Ejecutar Lighthouse y revisar LCP, CLS e INP.
- Añadir lint, pruebas básicas y documentación de despliegue.

## 13. Patrón de implementación resumido

```jsx
function ProjectSection({ project }) {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(null);

  return (
    <section>
      <button
        aria-expanded={open}
        onClick={() => setOpen(value => !value)}
      >
        {project.title}
      </button>

      <div className={open ? styles.open : styles.closed}>
        {project.items.map(item => (
          <MediaCard
            key={item.id}
            item={item}
            onOpen={() => setActiveItem(item)}
          />
        ))}
      </div>

      <AccessibleLightbox
        item={activeItem}
        onClose={() => setActiveItem(null)}
      />
    </section>
  );
}
```

La idea importante no es copiar cada selector, sino conservar la arquitectura mental: **datos → estado → clase visual → retroalimentación → siguiente acción narrativa**.

## 14. Veredicto

El proyecto es sobresaliente como portafolio porque convierte un conjunto amplio de textos, métricas y medios en una historia explorable. Su originalidad técnica proviene de efectos propios y reutilizables; su calidad comunicativa, de conectar cada interacción con una intención; y su sensación de amplitud, de mostrar no solo el resultado, sino también el razonamiento profesional.

La mejor forma de recrearlo no es copiar todas sus animaciones. Es adoptar sus principios: narrativa por capas, navegación contextual, divulgación progresiva, evidencia visible, componentes reutilizables y una identidad visual consistente. Después, hay que completar el trabajo con optimización de medios, accesibilidad modal, pruebas, documentación y una estrategia de despliegue para SPA.
