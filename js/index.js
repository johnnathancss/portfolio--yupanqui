//gsap.registerPlugin(ScrollTrigger);
//
//const getRatio = el =>
//  window.innerHeight / (window.innerHeight + el.offsetHeight);
//
//gsap.utils.toArray(".section").forEach((section, i) => {
//  const bg = section.querySelector(".item-bg");
//  const img = section.dataset.bg; // 
//
//  if (!bg || !img) {
//    console.warn("data-bg", section);
//    return;
//  }
//
//  bg.style.backgroundImage = `url("${img}")`; // ✅ bien //cerrado
//
//  gsap.fromTo(
//    bg,
//    {
//      backgroundPosition: () =>
//        i ? `30% ${-window.innerHeight * getRatio(section)}//px` : "30% 0px"
//    },
//    {
//      backgroundPosition: () =>
//        `30% ${window.innerHeight * (1 - getRatio(section))}//px`,
//      ease: "none",
//      scrollTrigger: {
//        trigger: section,
//        start: () => (i ? "top bottom" : "top top"),
//        end: "bottom top",
//        scrub: true,
//        invalidateOnRefresh: true
//      }
//    }
//  );
//});


//SCROLL OPCION 2
//document.addEventListener("DOMContentLoaded", () => {
//  gsap.registerPlugin(ScrollTrigger);
//
//  gsap.utils.toArray(".section").forEach((section) => {
//    const bg = section.querySelector(".item-bg");
//    const img = section.dataset.bg;
//
//    if (!bg || !img) return;
//
//    // aplicar imagen
//    bg.style.backgroundImage = `url("${img}")`;
//
//    // animación PARALLAX REAL
//    gsap.to(bg, {
//      y: () => -window.innerHeight * 0.3,
//      //y: -200, // mueve hacia arriba
//      ease: "none",
//      scrollTrigger: {
//        trigger: section,
//        start: "top top",
//        end: "bottom top",
//        scrub: true
//      }
//    });
//  });
//
//  // 🔥 IMPORTANTE
//  window.addEventListener("load", () => {
//    ScrollTrigger.refresh();
//  });
//});


/** @type {any} 
const Lenis = window.Lenis;

const lenis = new Lenis({
  smooth: true
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);
*/


//SCROLL OPCION 3
//document.addEventListener("DOMContentLoaded", () => {
//  gsap.registerPlugin(ScrollTrigger);
//
//  // 👇 aseguramos que existe
//  const LenisClass = window.Lenis;
//
//  const lenis = new LenisClass({
//    smooth: true
//  });
//
//  function raf(time) {
//    lenis.raf(time);
//    requestAnimationFrame(raf);
//  }
//
//  requestAnimationFrame(raf);
//
//  // 🔥 conectar con GSAP
//  lenis.on("scroll", ScrollTrigger.update);
//
//  // 🔥 PARALLAX
//  gsap.utils.toArray(".section").forEach((section) => {
//    const bg = section.querySelector(".item-bg");
//    const img = section.dataset.bg;
//
//    if (!bg || !img) return;
//
//    bg.style.backgroundImage = `url("${img}")`;
//
//    gsap.to(bg, {
//      y: -300,
//      ease: "none",
//      scrollTrigger: {
//        trigger: section,
//        start: "top bottom",
//        end: "bottom top",
//        scrub: true
//      }
//    });
//  });
//
//  // 🔥 MUY IMPORTANTE
//  window.addEventListener("load", () => {
//    ScrollTrigger.refresh();
//  });
//});



//COPIED EMAIL
document.querySelectorAll('.copy-btn').forEach(btn => {
  const originalText = btn.textContent;
  
  btn.addEventListener('click', () => {
    const email = btn.dataset.email;
    navigator.clipboard.writeText(email);
    
    btn.textContent = "¡Copiado!";
    btn.classList.add('copied');
    
    setTimeout(() => {
      btn.textContent = originalText;
      btn.classList.remove('copied');
    }, 800);
  });
});


//SCROLL OPCION 4
document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  gsap.utils.toArray(".section").forEach((section) => {
    const bg = section.querySelector(".item-bg");
    const img = section.dataset.bg;

    if (!bg || !img) return;

    // aplicar imagen
    bg.style.backgroundImage = `url("${img}")`;

    // PARALLAX REAL
    gsap.fromTo(
      bg,
      { y: -150 },
      {
        y: 100,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2, // 🔥 suavidad
        }
      }
    );
  });

  // 🔥 importante para producción (Vercel)
  window.addEventListener("load", () => {
    ScrollTrigger.refresh();
  });
});

//BUTTON DOWNLOAD CV
document.getElementById("downloadCV").addEventListener("click", () => {
  const link = document.createElement("a");
  link.href = "/src/img/CV_Johnnathan_Yupanqui.pdf";
  link.download = "CV_Johnnathan_Yupanqui.pdf";
  link.click();
});