//SCROLL HORIZONTAL
gsap.registerPlugin(ScrollTrigger);

const section = document.querySelector(".horizontal-section");
const track = document.querySelector(".track");

const totalScroll = track.scrollWidth - window.innerWidth;

gsap.to(track, {
  xPercent: -100 * (track.length - 1),
  //x: () => -totalScroll,
  ease: "none",
  scrollTrigger: {
    trigger: section,
    start: "top top",
    //end: () => `+=${track.scrollWidth}`,
    scrub: true,
    pin: true,
    anticipatePin: 1,
    end: "+=3000"
  }
});