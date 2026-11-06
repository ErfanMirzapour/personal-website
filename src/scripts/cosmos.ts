// Background starfield, pointer parallax and small UI state for the homepage.
// Everything here is decoration: the page reads fine with JavaScript off.

type Star = {
  x: number;
  y: number;
  z: number;
  r: number;
  tw: number;
  warm: boolean;
};
type Pair = { x: number; y: number; a: number; age: number; life: number };

const reduced = matchMedia('(prefers-reduced-motion: reduce)');
// Phones and tablets have no hovering pointer to follow.
const mouse = matchMedia('(hover: hover) and (pointer: fine)');

export function startCosmos(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const root = document.documentElement;
  let w = 0;
  let h = 0;
  let stars: Star[] = [];
  let pairs: Pair[] = [];
  let pointer = { x: 0, y: 0 };
  let eased = { x: 0, y: 0 };
  let frame = 0;
  let last = performance.now();
  let nextPair = 0;

  const resize = () => {
    const dpr = Math.min(devicePixelRatio || 1, 2);
    w = innerWidth;
    h = innerHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const count = Math.min(520, Math.round((w * h) / 2600));
    stars = Array.from({ length: count }, () => {
      const z = Math.random() ** 2 * 0.9 + 0.1;
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        z,
        r: 0.3 + z * 1.3,
        tw: Math.random() * Math.PI * 2,
        warm: Math.random() < 0.08,
      };
    });
  };

  const draw = (time: number, dt: number) => {
    ctx.clearRect(0, 0, w, h);
    const scroll = scrollY;
    for (const s of stars) {
      // Nearer stars (higher z) drift further with scroll and pointer: parallax.
      const x = (((s.x + eased.x * s.z * 28) % w) + w) % w;
      const y =
        (((s.y - scroll * s.z * 0.25 + eased.y * s.z * 18) % h) + h) % h;
      const twinkle = reduced.matches
        ? 1
        : 0.65 + Math.sin(time / 900 + s.tw) * 0.35;
      ctx.globalAlpha = (0.25 + s.z * 0.75) * twinkle;
      ctx.fillStyle = s.warm ? '#f5c97a' : '#cfe4ff';
      ctx.beginPath();
      ctx.arc(x, y, s.r, 0, Math.PI * 2);
      ctx.fill();
    }

    // Quantum fluctuations: particle pairs pop out of the vacuum,
    // drift apart and annihilate a moment later.
    if (!reduced.matches) {
      if (time > nextPair) {
        pairs.push({
          x: Math.random() * w,
          y: Math.random() * h,
          a: Math.random() * Math.PI,
          age: 0,
          life: 1400 + Math.random() * 900,
        });
        nextPair = time + 700 + Math.random() * 1400;
      }
      pairs = pairs.filter((p) => (p.age += dt) < p.life);
      for (const p of pairs) {
        const t = p.age / p.life;
        const spread = Math.sin(t * Math.PI) * 14;
        const dx = Math.cos(p.a) * spread;
        const dy = Math.sin(p.a) * spread;
        ctx.globalAlpha = Math.sin(t * Math.PI) * 0.9;
        ctx.strokeStyle = 'rgba(124,196,255,0.35)';
        ctx.lineWidth = 0.6;
        ctx.beginPath();
        ctx.moveTo(p.x - dx, p.y - dy);
        ctx.lineTo(p.x + dx, p.y + dy);
        ctx.stroke();
        ctx.fillStyle = '#7cc4ff';
        ctx.beginPath();
        ctx.arc(p.x - dx, p.y - dy, 1.4, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#f5c97a';
        ctx.beginPath();
        ctx.arc(p.x + dx, p.y + dy, 1.4, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    ctx.globalAlpha = 1;
  };

  const tick = (time: number) => {
    const dt = Math.min(time - last, 64);
    last = time;
    if (!mouse.matches) {
      // On touch screens the scene drifts on its own, and tilts as you scroll.
      const tilt = Math.max(-1, Math.min(1, scrollY / innerHeight - 0.5));
      pointer = {
        x: Math.sin(time / 3200) * 0.6,
        y: Math.cos(time / 4100) * 0.35 + tilt * 0.4,
      };
    }
    eased.x += (pointer.x - eased.x) * 0.06;
    eased.y += (pointer.y - eased.y) * 0.06;
    root.style.setProperty('--px', eased.x.toFixed(3));
    root.style.setProperty('--py', eased.y.toFixed(3));
    draw(time, dt);
    frame = requestAnimationFrame(tick);
  };

  const start = () => {
    cancelAnimationFrame(frame);
    if (reduced.matches || document.hidden) {
      draw(performance.now(), 0);
      return;
    }
    last = performance.now();
    frame = requestAnimationFrame(tick);
  };

  addEventListener('resize', () => {
    resize();
    start();
  });
  addEventListener(
    'scroll',
    () => {
      if (reduced.matches) draw(performance.now(), 0);
    },
    { passive: true },
  );
  addEventListener(
    'pointermove',
    (event) => {
      if (event.pointerType !== 'mouse') return;
      pointer = {
        x: (event.clientX / innerWidth) * 2 - 1,
        y: (event.clientY / innerHeight) * 2 - 1,
      };
    },
    { passive: true },
  );
  document.addEventListener('visibilitychange', start);
  reduced.addEventListener('change', start);
  resize();
  start();
}

export function trackHeader(header: HTMLElement) {
  const update = () => header.toggleAttribute('data-scrolled', scrollY > 24);
  addEventListener('scroll', update, { passive: true });
  update();
}

// Moves a soft light under the pointer on each skill tile.
export function trackSpotlight(container: HTMLElement) {
  container.addEventListener('pointermove', (event) => {
    const tile = (event.target as Element).closest<HTMLElement>('[data-tile]');
    if (!tile) return;
    const box = tile.getBoundingClientRect();
    tile.style.setProperty('--x', `${event.clientX - box.left}px`);
    tile.style.setProperty('--y', `${event.clientY - box.top}px`);
  });
}

// Shrinks the hero name when a word would be wider than the screen, for
// example with enlarged text on a phone. Words never split across lines.
export function fitName(title: HTMLElement) {
  const fit = () => {
    title.style.removeProperty('--fit');
    const room = title.clientWidth;
    const widest = Math.max(
      ...[...title.querySelectorAll<HTMLElement>('.word')].map(
        (word) => word.getBoundingClientRect().width,
      ),
    );
    if (room > 0 && widest > room) {
      title.style.setProperty('--fit', String(Math.floor((room / widest) * 100) / 100));
    }
  };
  fit();
  document.fonts?.ready.then(fit);
  addEventListener('resize', fit);
}
