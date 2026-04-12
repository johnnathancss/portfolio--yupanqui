gsap.registerPlugin(ScrollTrigger);

const getRatio = el =>
  window.innerHeight / (window.innerHeight + el.offsetHeight);

gsap.utils.toArray(".section").forEach((section, i) => {
  const bg = section.querySelector(".item-bg");
  const img = section.dataset.bg; // 

  if (!bg || !img) {
    console.warn("data-bg", section);
    return;
  }

  bg.style.backgroundImage = `url("${img}")`; // ✅ bien cerrado

  gsap.fromTo(
    bg,
    {
      backgroundPosition: () =>
        i ? `30% ${-window.innerHeight * getRatio(section)}px` : "30% 0px"
    },
    {
      backgroundPosition: () =>
        `30% ${window.innerHeight * (1 - getRatio(section))}px`,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: () => (i ? "top bottom" : "top top"),
        end: "bottom top",
        scrub: true,
        invalidateOnRefresh: true
      }
    }
  );
});


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
