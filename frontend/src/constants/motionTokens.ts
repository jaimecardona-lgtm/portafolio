export const motionTokens = {
  // Distances for jump/bounce effects
  jumpDistance: 100,
  bigJumpDistance: 150,
  exitDistance: 80,

  // Scene effects
  sceneBlur: 5,
  sceneScale: 0.97,
  sceneOpacity: 0.25,

  // Rotation for dynamic entry
  rotationAngle: 2,

  // Duration (in viewport scroll %)
  fastEnter: 0.15,
  normalEnter: 0.25,
  slowEnter: 0.4,

  fastExit: 0.15,
  normalExit: 0.25,
  slowExit: 0.35,

  // Transitions
  sceneActiveDuration: 0.3,
}

export type SceneVariant =
  | 'jumpFromLeft'
  | 'jumpFromRight'
  | 'bounceUp'
  | 'spinIn'
  | 'elasticSlide'
  | 'popIn'

export const sceneVariants: Record<SceneVariant, any> = {
  // ENTRA SALTANDO DESDE LA IZQUIERDA
  jumpFromLeft: {
    initial: {
      opacity: 0,
      x: -motionTokens.bigJumpDistance,
      rotate: -motionTokens.rotationAngle
    },
    animate: {
      opacity: 1,
      x: 0,
      rotate: 0
    },
    exit: {
      opacity: motionTokens.sceneOpacity,
      x: -motionTokens.exitDistance,
      rotate: -motionTokens.rotationAngle * 0.5
    },
    transition: {
      type: 'spring',
      bounce: 0.5,
      duration: 0.8
    }
  },

  // ENTRA SALTANDO DESDE LA DERECHA
  jumpFromRight: {
    initial: {
      opacity: 0,
      x: motionTokens.bigJumpDistance,
      rotate: motionTokens.rotationAngle
    },
    animate: {
      opacity: 1,
      x: 0,
      rotate: 0
    },
    exit: {
      opacity: motionTokens.sceneOpacity,
      x: motionTokens.exitDistance,
      rotate: motionTokens.rotationAngle * 0.5
    },
    transition: {
      type: 'spring',
      bounce: 0.5,
      duration: 0.8
    }
  },

  // ENTRA REBOTANDO DESDE ABAJO
  bounceUp: {
    initial: {
      opacity: 0,
      y: motionTokens.jumpDistance
    },
    animate: {
      opacity: 1,
      y: 0
    },
    exit: {
      opacity: motionTokens.sceneOpacity,
      y: motionTokens.exitDistance
    },
    transition: {
      type: 'spring',
      bounce: 0.6,
      duration: 0.75
    }
  },

  // ENTRA CON GIRO (spin) ORIGINAL
  spinIn: {
    initial: {
      opacity: 0,
      scale: 0.3,
      rotate: -180
    },
    animate: {
      opacity: 1,
      scale: 1,
      rotate: 0
    },
    exit: {
      opacity: motionTokens.sceneOpacity,
      scale: motionTokens.sceneScale,
      rotate: 45
    },
    transition: {
      type: 'spring',
      bounce: 0.4,
      duration: 0.9
    }
  },

  // ENTRA CON ELASTICIDAD (lado a lado)
  elasticSlide: {
    initial: {
      opacity: 0,
      x: -motionTokens.bigJumpDistance,
      skewY: 5
    },
    animate: {
      opacity: 1,
      x: 0,
      skewY: 0
    },
    exit: {
      opacity: motionTokens.sceneOpacity,
      x: motionTokens.exitDistance,
      skewY: -5
    },
    transition: {
      type: 'spring',
      bounce: 0.7,
      damping: 8,
      duration: 1
    }
  },

  // ENTRA EXPANDIÉNDOSE (POP)
  popIn: {
    initial: {
      opacity: 0,
      scale: 0.4,
      rotate: -10
    },
    animate: {
      opacity: 1,
      scale: 1,
      rotate: 0
    },
    exit: {
      opacity: 0,
      scale: 0.3,
      rotate: 10
    },
    transition: {
      type: 'spring',
      bounce: 0.8,
      duration: 0.6
    }
  },
}

export const inactiveSceneStyle = {
  opacity: motionTokens.sceneOpacity,
  scale: motionTokens.sceneScale,
  filter: 'blur(0px)',
}

export const activeSceneStyle = {
  opacity: 1,
  scale: 1,
  filter: 'blur(0px)',
}
