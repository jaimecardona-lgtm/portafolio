# Motion System - Scroll Narrative

Sistema reutilizable para crear experiencias narrativas de scroll en el portafolio.

## Componentes

### ScrollScene

Envuelve cualquier contenido para que sea una "escena" que reacciona al scroll.

```tsx
<ScrollScene
  variant="fadeUp"
  threshold={0.25}
  onStateChange={(state) => console.log(state)}
>
  <div>Contenido que entra/sale al scroll</div>
</ScrollScene>
```

**Props:**

- `variant`: 'fadeUp' | 'depth' | 'slideLeft' | 'slideRight' | 'scaleIn'
- `threshold`: Cuándo considerar el elemento como "active" (0-1)
- `rootMargin`: Ajuste del viewport para detección
- `onStateChange`: Callback cuando cambia el estado (before/entering/active/leaving/after)
- `id`: Identificador opcional
- `className`: Clases CSS adicionales
- `style`: Estilos inline

**Estados:**

- `before`: Elemento aún no visible
- `entering`: Elemento comenzando a entrar
- `active`: Elemento completamente activo en el viewport
- `leaving`: Elemento comenzando a salir
- `after`: Elemento ya pasado

### StickySwapSection + StickySwapTrigger

Para secciones que permanecen sticky mientras su contenido cambia.

Perfecto para:
- Experience: Cambiar misión sin desplazarse
- Projects: Cambiar proyecto activo
- Blog: Decision log interactivo
- Research: Cambiar paper/reviewer

```tsx
<StickySwapSection
  items={missions}
  activeContent={<MissionPanel mission={activeMission} />}
  onActiveChange={setActiveMissionId}
  header={<h2>Experiencia</h2>}
>
  <StickySwapTrigger id="dian">
    <MissionCard mission={missions[0]} />
  </StickySwapTrigger>

  <StickySwapTrigger id="opp">
    <MissionCard mission={missions[1]} />
  </StickySwapTrigger>

  <StickySwapTrigger id="rckt">
    <MissionCard mission={missions[2]} />
  </StickySwapTrigger>
</StickySwapSection>
```

**Behavior:**

- Panel izquierdo permanece sticky
- Scroll por los triggers
- Cuando un trigger está en viewport → activeContent cambia
- Click también funciona

## Hooks

### useScrollScene

Para casos donde necesitas lógica custom más allá de ScrollScene.

```tsx
const { ref, state, progress, isActive, isEntering } = useScrollScene({
  threshold: 0.25,
  onStateChange: (state) => {}
})

return (
  <div ref={ref}>
    {isActive && <ActiveContent />}
    {state === 'entering' && <EnteringAnimation />}
  </div>
)
```

### useStickySwap

Para lógica de sticky swap personalizada.

```tsx
const { containerRef, activeId, setActive, registerTrigger } = useStickySwap({
  items: missions,
  onActiveChange: setActiveMissionId,
})

// En un trigger:
<div ref={(el) => registerTrigger('mission-1', el)}>
  ...
</div>
```

## Variantes — ENTRA SALTANDO

Cada ScrollScene entra de forma dinámica y original:

- **jumpFromLeft**: 💥 Salta desde la izquierda con rotación (muy dinámico)
- **jumpFromRight**: 💥 Salta desde la derecha con rotación (muy dinámico)
- **bounceUp**: ⬆️ Rebota desde abajo con spring suave
- **spinIn**: 🌀 Gira mientras entra (360° spin)
- **elasticSlide**: 🎯 Entra elástico con skew (estilo videojuego)
- **popIn**: 💫 Explota al entrar (pop rápido y satisfactorio)

### Transiciones de Spring

Todas usan `spring` con bounce:
- Bounce 0.4-0.8 (más alto = más rebote)
- Duration 0.6-1.0s
- Se ve fluyente, no robótico

## Motion Tokens

Valores centralizados en `constants/motionTokens.ts`:

```ts
motionTokens = {
  revealDistance: 40,        // Distancia de entrada/salida
  exitDistance: 60,
  sceneBlur: 5,              // Blur cuando no está activo
  sceneScale: 0.97,          // Escala cuando no está activo
  sceneOpacity: 0.25,        // Opacidad cuando no está activo
  // ... más tokens
}
```

Ajusta estos valores para cambiar el comportamiento global.

## Accesibilidad

✅ Respeta `prefers-reduced-motion`  
✅ No oculta contenido del accessibility tree  
✅ Mantiene keyboard navigation  
✅ Pointer events se desactivan automáticamente en estados no interactivos

## Performance

✅ Usa `will-change: transform, opacity`  
✅ No anima propiedades costosas (width, height, top, left)  
✅ IntersectionObserver eficiente  
✅ Framer Motion con GPU acceleration

## Ejemplos por Vista

### Experience
```tsx
<StickySwapSection items={missions} activeContent={<MissionDossier />}>
  {missions.map(m => (
    <StickySwapTrigger key={m.id} id={m.id}>
      <MissionCard mission={m} />
    </StickySwapTrigger>
  ))}
</StickySwapSection>
```

### Projects
```tsx
<ScrollScene variant="depth">
  <FlagshipProject />
</ScrollScene>

<StickySwapSection items={projects} activeContent={<ProjectPanel />}>
  {projects.map(p => (
    <StickySwapTrigger key={p.id} id={p.id}>
      <ProjectCard project={p} />
    </StickySwapTrigger>
  ))}
</StickySwapSection>
```

### Blog
```tsx
<ScrollScene variant="fadeUp">
  <FeaturedNote />
</ScrollScene>

<StickySwapSection items={decisions} activeContent={<DecisionPanel />}>
  {decisions.map(d => (
    <StickySwapTrigger key={d.id} id={d.id}>
      <DecisionButton decision={d} />
    </StickySwapTrigger>
  ))}
</StickySwapSection>
```

## No hacer

❌ Usar scroll-jacking  
❌ Animar width/height/top/left constantemente  
❌ Ocultar contenido importante permanentemente  
❌ Romper keyboard navigation  
❌ Ignorar prefers-reduced-motion  
❌ Crear listener de scroll por componente (centralizar)
