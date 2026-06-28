/* Ian Lundberg personal site — scroll motion (Lenis + GSAP ScrollTrigger).
   Progressive enhancement: if these CDNs fail or JS is off, the page is fully
   readable (nothing is hidden until JS confirms it loaded). Fully gated for
   prefers-reduced-motion. Vanilla, no bundler. */
(function () {
  "use strict";

  var gsap = window.gsap;
  var ScrollTrigger = window.ScrollTrigger;
  var Lenis = window.Lenis;

  // Hard requirement: never hide content if the animation libs aren't here.
  if (!gsap || !ScrollTrigger) return;

  gsap.registerPlugin(ScrollTrigger);
  var DEBUG = location.search.indexOf("st-debug") > -1;
  ScrollTrigger.defaults({ markers: DEBUG });

  var docEl = document.documentElement;
  docEl.classList.add("js-anim"); // enables the "start hidden" reveal state in CSS

  var rnd = gsap.utils.random;
  var reduceMQ = window.matchMedia("(prefers-reduced-motion: reduce)");
  var introPlayed = false;
  var rafFn = null;

  /* ---------------- decorative DOM (created once) ---------------- */
  function makeDots(selector, className, count, opts) {
    var box = document.querySelector(selector);
    if (!box) return [];
    var frag = document.createDocumentFragment();
    var nodes = [];
    for (var i = 0; i < count; i++) {
      var n = document.createElement("span");
      n.className = className;
      var s = rnd(opts.min, opts.max);
      n.style.width = s + "px";
      n.style.height = s + "px";
      n.style.left = rnd(opts.l0, opts.l1) + "%";
      n.style.top = rnd(opts.t0, opts.t1) + "%";
      n.style.opacity = rnd(0.15, 0.6);
      frag.appendChild(n);
      nodes.push(n);
    }
    box.appendChild(frag);
    return nodes;
  }

  var coarse = window.matchMedia("(pointer: coarse)").matches;
  var particles = makeDots(".layer--particles", "particle", coarse ? 10 : 18,
    { min: 3, max: 8, l0: 2, l1: 98, t0: 8, t1: 86 });
  var fireflies = makeDots(".floor__deco", "firefly", 8,
    { min: 6, max: 6, l0: 6, l1: 94, t0: 20, t1: 88 });

  /* ---------------- Lenis smooth scroll ---------------- */
  function initLenis() {
    if (!Lenis) return null;
    var lenis = new Lenis({
      duration: 1.1,
      easing: function (t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); },
      smoothWheel: true,
      syncTouch: false, // native momentum on touch — no scroll-jacking
      touchMultiplier: 1.5,
      wheelMultiplier: 1
    });
    docEl.style.scrollBehavior = "auto"; // Lenis owns scrolling now
    lenis.on("scroll", ScrollTrigger.update);
    rafFn = function (time) { lenis.raf(time * 1000); };
    gsap.ticker.add(rafFn);
    gsap.ticker.lagSmoothing(0);
    return lenis;
  }

  /* ---------------- hero parallax (pinned on desktop) ---------------- */
  function initHero(isDesktop) {
    var hero = document.querySelector(".hero");
    if (!hero) return;
    var tl = gsap.timeline({
      scrollTrigger: {
        trigger: hero, start: "top top", end: "+=120%",
        scrub: 1, pin: isDesktop, pinSpacing: isDesktop,
        anticipatePin: 1, invalidateOnRefresh: true
      }
    });
    gsap.utils.toArray(".hero [data-depth]").forEach(function (layer) {
      var depth = parseFloat(layer.getAttribute("data-depth")) || 0;
      tl.to(layer, { yPercent: -depth * 55, ease: "none" }, 0);
    });
    var ferns = document.querySelector(".layer--ferns");
    if (ferns) tl.to(ferns, { scale: 1.08, transformOrigin: "bottom center", ease: "none" }, 0);
    var content = document.querySelector(".hero__content");
    if (content) tl.to(content, { yPercent: -24, opacity: 0, ease: "none" }, 0);
  }

  /* ---------------- ambient loops (rays, particles, fireflies) ---------------- */
  function initAmbient() {
    var rays = document.querySelectorAll(".hero__ray");
    if (rays.length) {
      gsap.to(rays, {
        opacity: 0.85, duration: 3.2, ease: "sine.inOut", yoyo: true, repeat: -1,
        stagger: { each: 0.5, from: "random" }, transformOrigin: "top center"
      });
    }
    particles.forEach(function (p, i) {
      gsap.to(p, {
        y: "-=42", x: "+=" + rnd(-22, 22), duration: rnd(7, 13),
        ease: "sine.inOut", yoyo: true, repeat: -1, delay: i * 0.18
      });
    });
    fireflies.forEach(function (f, i) {
      gsap.to(f, {
        x: "+=" + rnd(-26, 26), y: "+=" + rnd(-20, 20), opacity: rnd(0.3, 0.95),
        duration: rnd(2.5, 5), ease: "sine.inOut", yoyo: true, repeat: -1, delay: i * 0.25
      });
    });
  }

  /* ---------------- one-time on-load intro ---------------- */
  function initIntro() {
    gsap.timeline({ defaults: { ease: "power3.out" } })
      .from(".layer--sky", { opacity: 0, duration: 0.8 })
      .from(".layer--sun", { opacity: 0, duration: 1.0 }, "-=0.6")
      .from(".layer--hills-far", { opacity: 0, duration: 0.9 }, "-=0.7")
      .from(".layer--hills-mid", { opacity: 0, duration: 0.9 }, "-=0.7")
      .from(".layer--treeline", { opacity: 0, duration: 0.9 }, "-=0.7")
      .from(".layer--ferns", { opacity: 0, duration: 1.0 }, "-=0.7")
      .from(".hero__content > *:not(.hero__scrim)", { opacity: 0, y: 22, duration: 0.7, stagger: 0.08 }, "-=0.6")
      .from(".layer--rays", { opacity: 0, duration: 1.2 }, "-=0.9");
  }

  /* ---------------- reveal-on-scroll ---------------- */
  function initReveals(instant) {
    if (instant) { gsap.set(".reveal", { opacity: 1, y: 0 }); return; }
    ScrollTrigger.batch(".reveal", {
      start: "top 86%", once: true,
      onEnter: function (els) {
        gsap.to(els, { opacity: 1, y: 0, duration: 0.7, ease: "power2.out", stagger: 0.09, overwrite: true });
      }
    });
  }

  /* ---------------- the "vine draws itself" scene ---------------- */
  function initVine() {
    var path = document.querySelector(".vine");
    var scene = document.querySelector(".vine-scene");
    if (!path || !scene) return;
    function setup() {
      var len = path.getTotalLength();
      gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
    }
    setup();
    ScrollTrigger.addEventListener("refreshInit", setup);
    gsap.to(path, {
      strokeDashoffset: 0, ease: "none",
      scrollTrigger: { trigger: scene, start: "top 78%", end: "bottom 62%", scrub: 1, invalidateOnRefresh: true }
    });
    gsap.from(".vine-leaf path, .vine-bud", {
      opacity: 0, scale: 0, transformOrigin: "center", stagger: 0.2,
      scrollTrigger: { trigger: scene, start: "top 60%", end: "bottom 70%", scrub: 1 }
    });
  }

  /* ---------------- project cards grow in ---------------- */
  function initProjects() {
    var featured = document.querySelector("#projects .featured");
    if (featured) {
      gsap.from(featured, {
        opacity: 0, y: 30, scale: 0.98, duration: 0.7, ease: "power3.out",
        scrollTrigger: { trigger: "#projects", start: "top 75%", once: true }
      });
    }
    var cards = gsap.utils.toArray("#projects .grid .card");
    if (cards.length) {
      gsap.from(cards, {
        opacity: 0, y: 28, scale: 0.96, duration: 0.55, ease: "back.out(1.4)", stagger: 0.1,
        scrollTrigger: { trigger: "#projects .grid", start: "top 82%", once: true }
      });
    }
  }

  /* ---------------- progress bar ---------------- */
  function initProgress() {
    var bar = document.querySelector(".scroll-progress");
    if (!bar) return;
    gsap.to(bar, { scaleX: 1, ease: "none", scrollTrigger: { start: 0, end: "max", scrub: 0.3 } });
  }

  /* ---------------- nav condense (always on) ---------------- */
  function initNav() {
    var nav = document.querySelector(".nav");
    if (!nav) return;
    ScrollTrigger.create({
      start: 0, end: "max",
      onUpdate: function () {
        var y = window.scrollY || window.pageYOffset || 0;
        nav.classList.toggle("nav--condensed", y > 80);
      }
    });
  }

  /* ---------------- anchors via Lenis (always on) ---------------- */
  function initAnchors() {
    document.querySelectorAll('a[href^="#"]').forEach(function (a) {
      a.addEventListener("click", function (e) {
        var id = a.getAttribute("href");
        if (!id || id.length < 2) return;
        var el = document.querySelector(id);
        if (!el) return;
        e.preventDefault();
        if (window.__lenis) window.__lenis.scrollTo(el, { offset: -70 });
        else el.scrollIntoView({ behavior: reduceMQ.matches ? "auto" : "smooth" });
      });
    });
  }

  /* ---------------- orchestration ---------------- */
  initNav();
  initAnchors();

  var mm = gsap.matchMedia();

  mm.add("(prefers-reduced-motion: reduce)", function () {
    initReveals(true); // everything instantly visible, no Lenis / pin / loops
  });

  mm.add("(prefers-reduced-motion: no-preference)", function () {
    var lenis = initLenis();
    window.__lenis = lenis;
    var isDesktop = window.matchMedia("(min-width: 768px)").matches;
    initHero(isDesktop);
    initAmbient();
    if (!introPlayed) { initIntro(); introPlayed = true; }
    initReveals(false);
    initVine();
    initProjects();
    initProgress();
    return function cleanup() {
      if (rafFn) { gsap.ticker.remove(rafFn); rafFn = null; }
      if (lenis) { lenis.destroy(); }
      window.__lenis = null;
      docEl.style.scrollBehavior = "";
    };
  });

  // Recompute trigger positions once everything has settled.
  window.addEventListener("load", function () { ScrollTrigger.refresh(); });
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(function () { ScrollTrigger.refresh(); });
  }
})();
