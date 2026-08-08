function initSmoothScroll() {
  return new Lenis({
    autoRaf: true,
    smoothWheel: true,
    wheelMultiplier: 0.85,
    lerp: 0.1,
  })
}

function initImageScrollAnimations(lenis) {
  // Respetar preferencia de usuario
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return
  }

  const containers = [...document.querySelectorAll('[data-scroll-image]')]
  if (!containers.length) return

  // Cacheamos todo lo que no cambia
  const items = containers.map((container) => {
    const img = container.querySelector('img')
    if (!img) return null

    return {
      container,
      img,
      speed: Number(container.dataset.parallaxSpeed) || 14,
    }
  }).filter(Boolean)

  let ticking = false
  let viewportHeight = window.innerHeight

  // Solo actualizamos cuando el tamaño cambia
  const onResize = () => {
    viewportHeight = window.innerHeight
    requestUpdate()
  }

  const update = () => {
    ticking = false

    // Margen extra para empezar a animar un poco antes de entrar
    const margin = viewportHeight * 0.5

    for (let i = 0; i < items.length; i++) {
      const { container, img, speed } = items[i]
      const rect = container.getBoundingClientRect()

      // Si está muy lejos del viewport, no hacemos nada
      if (rect.bottom < -margin || rect.top > viewportHeight + margin) {
        continue
      }

      // Progress: -1 (arriba) → 0 (centro) → 1 (abajo)
      const progress = (rect.top + rect.height * 0.5 - viewportHeight * 0.5) / viewportHeight

      const y = progress * speed
      const scale = 1.12 + Math.abs(progress) * 0.04

      // Una sola escritura
      img.style.transform = `translate3d(0, ${y}%, 0) scale(${scale})`
    }
  }

  const requestUpdate = () => {
    if (!ticking) {
      ticking = true
      requestAnimationFrame(update)
    }
  }

  // Lenis ya corre en rAF, solo nos enganchamos
  lenis.on('scroll', requestUpdate)
  window.addEventListener('resize', onResize, { passive: true })

  // Primera pintura
  requestUpdate()

  // Opcional: devolver función de limpieza (útil si cambias de página)
  return () => {
    lenis.off('scroll', requestUpdate)
    window.removeEventListener('resize', onResize)
  }
}

// ---------- Boot ----------
function boot() {
  const lenis = initSmoothScroll()
  initImageScrollAnimations(lenis)
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot)
} else {
  boot()
}