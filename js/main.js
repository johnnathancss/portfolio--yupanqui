document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  gsap.to(".box", {
    y: 200,
    scrollTrigger: {
      trigger: ".box",
      scrub: 1.2
    }
  });
});

//document.addEventListener("DOMContentLoaded", () => {
//  gsap.registerPlugin(ScrollTrigger);
//
//  //SCROLL SMOTH VELOCITY
//  ScrollSmoother.create({
//    wrapper: ".smooth-wrapper",
//    content: ".smooth-content",
//    smooth: 1.5,
//    effects: true,
//    smoothTouch: 0.1
//  });
//});



//SCROLL-TOP-FOOTER-CLICK
//gsap.registerPlugin(ScrollTrigger);

const btn = document.querySelector(".btn-scroll-top");
const footer = document.querySelector("footer");

// Mostrar el botón SOLO al llegar al footer
ScrollTrigger.create({
  trigger: footer,
  start: "top bottom",
  onEnter: () => btn.classList.add("is-visible"),
  onLeaveBack: () => btn.classList.remove("is-visible")
});

// Scroll suave al top
btn.addEventListener("click", () => {
  gsap.to(window, {
    scrollTo: 0,
    duration: 1,
    ease: "power2.out"
  });
});
