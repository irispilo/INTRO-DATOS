/* ── Sparkles ──────────────────────────────────────────────── */
(function () {
  const canvas = document.getElementById('sparkles');
  const ctx = canvas.getContext('2d');
  let W, H, particles = [];

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function rand(min, max) { return Math.random() * (max - min) + min; }

  const COLORS = ['#F4622A', '#F0C060', '#5ECFAA', '#A8EDD8', '#ffffff'];

  function createParticle() {
    return {
      x: rand(0, W),
      y: rand(0, H),
      r: rand(0.5, 2.2),
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      alpha: rand(0.3, 1),
      speed: rand(0.1, 0.35),
      drift: rand(-0.15, 0.15),
      twinkle: rand(0.005, 0.02),
      phase: rand(0, Math.PI * 2),
    };
  }

  function init() {
    resize();
    particles = Array.from({ length: 180 }, createParticle);
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    const now = Date.now() / 1000;
    for (const p of particles) {
      const a = p.alpha * (0.5 + 0.5 * Math.sin(now * p.twinkle * 60 + p.phase));
      ctx.globalAlpha = a;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
      p.y -= p.speed;
      p.x += p.drift;
      if (p.y < -4) { p.y = H + 4; p.x = rand(0, W); }
    }
    ctx.globalAlpha = 1;
    requestAnimationFrame(draw);
  }

  init();
  draw();
  window.addEventListener('resize', resize);
})();

/* ── Scroll reveal ─────────────────────────────────────────── */
(function () {
  const els = document.querySelectorAll('.reveal');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.1 });
  els.forEach(el => obs.observe(el));
})();
