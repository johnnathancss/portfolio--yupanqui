

gsap.registerPlugin(ScrollTrigger);

function initHorizontalScroll() {
  const wrapper = document.querySelector(".horizontal-wrapper");
  const panels = gsap.utils.toArray(".panel");

  // Calculamos cuánto debe moverse (negativo porque va de derecha a izquierda)
  const totalWidth = panels.length * window.innerWidth;

  gsap.to(panels, {
    xPercent: -100 * (panels.length - 1),   // mueve todo el wrapper hacia la izquierda
    ease: "none",
    scrollTrigger: {
      trigger: ".horizontal-wrapper",
      pin: true,                        // fija la sección mientras se anima
      scrub: 0.5,                       // suavizado (0 = instantáneo, true = 1:1, número = delay)
      // scrub: true,                   // opción más fluida pero puede sentirse "pesada"
      start: "top top",                 // inicia cuando el top de la sección toca el top de la ventana
      end: () => `+=${totalWidth}`,     // duración = ancho total de todos los panels
      invalidateOnRefresh: true,        // recalcula al hacer resize
      // markers: true,                 // activa para debuggear (quita en producción)
    }
  });
}

// Ejecutar cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", initHorizontalScroll);

// Opcional: refrescar ScrollTrigger al redimensionar (muy recomendado)
window.addEventListener("resize", () => {
  ScrollTrigger.refresh();
});