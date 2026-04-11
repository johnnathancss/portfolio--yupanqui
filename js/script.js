
gsap.set(".assets-container img.swipeimage", { yPercent: -50, xPercent: -50 });

let firstEnter;

gsap.utils.toArray(".assets-container").forEach((el) => {
	const image = el.querySelector("img.swipeimage"),
    setX = gsap.quickTo(image, "x", { duration: 0.4, ease: "power3" }),
    setY = gsap.quickTo(image, "y", { duration: 0.4, ease: "power3" }),
    align = (e) => {
      if (firstEnter) {
        setX(e.clientX, e.clientX); //https://gsap.com/docs/v3/GSAP/gsap.quickTo()/#optionally-define-a-start-value
        setY(e.clientY, e.clientY);
        firstEnter = false;
      } else {
        setX(e.clientX);
        setY(e.clientY);
      }
    },
    startFollow = () => document.addEventListener("mousemove", align),
    stopFollow = () => document.removeEventListener("mousemove", align),
    fade = gsap.to(image, {
      autoAlpha: 1,
      ease: "none",
      paused: true,
      duration: 0.1,
      onReverseComplete: stopFollow
    });

  el.addEventListener("mouseenter", (e) => {
    firstEnter = true;
    fade.play();
    startFollow();
    align(e);
  });

  el.addEventListener("mouseleave", () => fade.reverse());
});


//SCROLL SECTION NAV nav-active
document.addEventListener('DOMContentLoaded', () => {
  const navItems = document.querySelectorAll('.nav-item');
  const sections = document.querySelectorAll('section[id]');

  const observerOptions = {
    root: null,
    rootMargin: '-100px 0px -50% 0px', // activa cuando la sección está cerca del top
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Remueve active de todos
        navItems.forEach(item => item.classList.remove('active'));
        
        // Busca el nav item correspondiente
        const sectionId = entry.target.getAttribute('id');
        const activeLink = document.querySelector(`.nav-item[data-section="${sectionId}"]`);
        
        if (activeLink) {
          activeLink.classList.add('active');
        }
      }
    });
  }, observerOptions);

  // Observa cada sección
  sections.forEach(section => {
    observer.observe(section);
  });
});


//MENU RESPONSIVE
document.addEventListener('DOMContentLoaded', () => {
  const trigger = document.querySelector('.menu-trigger');
  const overlay = document.querySelector('#menuOverlay');
  const closeBtn = document.querySelector('.menu-close');

  trigger.addEventListener('click', () => {
    overlay.classList.add('active');
    trigger.setAttribute('aria-expanded', 'true');
  });

  closeBtn.addEventListener('click', () => {
    overlay.classList.remove('active');
    trigger.setAttribute('aria-expanded', 'false');
  });

  // Cerrar al clic fuera (opcional)
  overlay.addEventListener('click', e => {
    if (e.target === overlay) {
      overlay.classList.remove('active');
      trigger.setAttribute('aria-expanded', 'false');
    }
  });

  // Opcional: cerrar con ESC
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && overlay.classList.contains('active')) {
      overlay.classList.remove('active');
      trigger.setAttribute('aria-expanded', 'false');
    }
  });
});


// ======================== CURSOR CANVAS ========================

document.addEventListener('DOMContentLoaded', () => {

  const canvas = document.getElementById('cursor-canvas');
  const ctx = canvas.getContext('2d');
  const size = 120;                    // tamaño del canvas (px)
  canvas.width = size;
  canvas.height = size;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;

  let currentColor = '#DE1215';  // color por defecto

  // ────── 1. Definir colores por sección ──────
  const colorMap = {
    '.section-intro': '#FFFFFF',  // rojo #3e20dc
    '.content-head': '#FFFFFF',  // verde menta
    '.about-me': '#FFFFFF',  // azul #0066ff
    '.footer': '#DE1215'  // magenta
    // puedes agregar más secciones aquí
  };

  // ────── 2. Función para detectar en qué sección está el mouse ──────
  function getCurrentSectionColor(x, y) {
    const element = document.elementFromPoint(x, y);
    if (!element) return 'rgba(0, 0, 0, 0)';

    // Buscamos el ancestro que coincida con nuestras secciones
    for (let selector in colorMap) {
      if (element.closest(selector)) {
        return colorMap[selector];
      }
    }
    return 'rgba(0, 0, 0, 0)'; // color por defecto si no está en ninguna sección
  }

  // ────── 3. Dibujar el cursor (punto con borde sutil) ──────
  function drawCursor() {
    ctx.clearRect(0, 0, size, size);

    // Punto principal
    ctx.beginPath();
    ctx.arc(size/2, size/2, 48, 0, Math.PI * 2);
    ctx.fillStyle = currentColor;
    ctx.fill();
  }

  // ────── 4. Actualizar posición y color en cada movimiento ──────
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    // Actualizamos el color según dónde está el mouse
    currentColor = getCurrentSectionColor(mouseX, mouseY);

    // Movemos el canvas al mouse (con pequeño offset para que no tape el texto)
    canvas.style.left = `${mouseX - size/2 + 12}px`;
    canvas.style.top  = `${mouseY - size/2 + 12}px`;

    drawCursor();
  });

  // ────── 5. Redibujar continuamente (muy suave) ──────
  function loop() {
    drawCursor();           // siempre redibuja con el color actual
    requestAnimationFrame(loop);
  }
  loop();

  // ────── 6. Opcional: ocultar cursor cuando sale de la ventana ──────
  document.addEventListener('mouseleave', () => {
    canvas.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    canvas.style.opacity = '1';
  });

});
