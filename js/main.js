/* ==========================================================
   GINNAN CONFIG  - edit these values only
   ========================================================== */
const CONFIG = {
  TOKEN_NAME: 'Ginnan',
  TICKER: '$GINNAN',
  CONTRACT_ADDRESS: '',               // paste the ERC-20 address at launch; empty shows "TBA"
  X_URL: 'https://x.com/ginnan_eth_coin',
  BUY_URL: '',                         // optional override; default is Uniswap with the CA
  DEXSCREENER_URL: '',                 // optional override; default is DexScreener with the CA
};
const CA = CONFIG.CONTRACT_ADDRESS.trim();
const BUY_URL = CONFIG.BUY_URL || `https://app.uniswap.org/#/swap?inputCurrency=eth&outputCurrency=${CA}`;
const DEX_URL = CONFIG.DEXSCREENER_URL || (CA ? `https://dexscreener.com/ethereum/${CA}` : '');
const GMGN_URL = CA ? `https://gmgn.ai/eth/token/${CA}` : '';
const SCAN_URL = CA ? `https://etherscan.io/token/${CA}` : '';

/* Gallery: photos from https://kabochan.blog.jp/archives/56184690.html */
const GALLERY = [
  ['ginnan-01.webp', 'Snack time: both paws on the treat', 675, 900],
  ['ginnan-02.webp', 'Close-up check: is dinner ready?', 675, 900],
  ['ginnan-03.webp', 'Peekaboo from the cat-tower cave', 676, 900],
  ['ginnan-04.webp', 'Striking a pose on the checkered mat', 676, 900],
  ['ginnan-05.webp', 'Nap mode in the white tent', 675, 900],
  ['ginnan-06.webp', 'Window watch by the cat tower', 675, 900],
  ['ginnan-07.webp', 'A tabby stroll through the cat room', 675, 900],
  ['ginnan-08.webp', 'Ledge meeting with a tuxedo friend', 900, 675],
  ['ginnan-09.webp', 'Sitting pretty, tail curled', 675, 900],
  ['ginnan-10.webp', 'Very serious about breakfast', 675, 900],
  ['ginnan-11.webp', 'Tent patrol', 900, 675],
  ['ginnan-12.webp', 'Twin tents, one tabby inside', 900, 675],
];
const VAULT = [
  { icon: 'i-gem', k: 'Total supply', v: '1B', s: '1,000,000,000' },
  { icon: 'i-chart', k: 'Liquidity', v: 'GMGN', s: GMGN_URL ? 'gmgn.ai' : 'Opens with the contract', href: GMGN_URL, pending: 'GMGN link goes live with the contract.' },
  { icon: 'i-eth', k: 'Contract', v: 'Etherscan', s: SCAN_URL ? 'etherscan.io' : 'Opens with the contract', href: SCAN_URL, pending: 'Etherscan link goes live with the contract.' },
];
const ROAD = [
  ['Phase 1', 'The Mint', ['Website and brand go live', 'Official X account', 'Community gathers']],
  ['Phase 2', 'The Pounce', ['Launch on Ethereum', 'Uniswap liquidity', 'Contract published here']],
  ['Phase 3', 'The Purr', ['Meme and art contests', 'Community-led ideas', 'Keep the gold shining']],
];
const FAQ = [
  ['What is {T}?', '{T} is a community meme coin on Ethereum inspired by Ginnan, a real tabby cat. It is made for fun and has no utility promises.'],
  ['Who is Ginnan?', 'Ginnan is a tabby cat who lives with the family of Kabosu, the Shiba Inu whose photo became the Doge meme. The family shares daily life on kabochan.blog.jp.'],
  ['Is this project affiliated with Ginnan\'s family?', 'No. {T} is a fan-made community tribute and is not affiliated with or endorsed by Ginnan\'s owner, Kabosu\'s family or kabochan.blog.jp unless officially stated. Gallery photos are credited to kabochan.blog.jp.'],
  ['Where is the contract address?', 'It will be posted on this site and the official X account at launch. Until then it shows "TBA". Ignore any address you see elsewhere.'],
  ['How do I buy?', 'Use an Ethereum wallet, add ETH, then swap on Uniswap with the official contract address. See How to Buy above.'],
  ['What are the tokenomics?', 'Total supply is 1 billion. GMGN and Etherscan links go live here when the contract address is posted.'],
];
const MQ1 = ['Ginnan', '{T}', 'The golden tabby', 'Boop the cat', 'On Ethereum', 'Stack the gold'];
const MQ2 = ['Community tribute', 'Photos: kabochan.blog.jp', '{T}', 'Purr responsibly', 'Not financial advice'];

/* ========================================================== */
const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const T = s => s.replace(/\{T\}/g, CONFIG.TICKER);
const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
const FINE = matchMedia('(hover: hover) and (pointer: fine)').matches;
const esc = s => s.replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

function toast(msg) { const t = $('#toast'); t.textContent = msg; t.classList.add('show'); clearTimeout(toast.h); toast.h = setTimeout(() => t.classList.remove('show'), 2400); }

function applyConfig() {
  $$('[data-name]').forEach(e => e.textContent = CONFIG.TOKEN_NAME);
  $$('[data-ticker]').forEach(e => e.textContent = CONFIG.TICKER);
  $$('[data-buy]').forEach(a => a.href = BUY_URL);
  $$('[data-x]').forEach(a => a.href = CONFIG.X_URL);
  $$('[data-dex]').forEach(a => { if (DEX_URL) { a.href = DEX_URL; a.hidden = false; } });
  $$('[data-dexlink]').forEach(a => { if (DEX_URL) a.href = DEX_URL; else { a.removeAttribute('target'); a.href = '#'; a.addEventListener('click', e => { e.preventDefault(); toast('Chart link goes live with the contract.'); }); } });
  $('#ca-text').textContent = CA || 'TBA';
  $$('[data-copy]').forEach(b => b.addEventListener('click', async () => {
    if (!CA) return toast('Contract address is TBA. Follow X for the launch.');
    try { await navigator.clipboard.writeText(CA); toast('Contract address copied'); } catch { toast(CA); }
  }));
  $('#yr').textContent = new Date().getFullYear();
}

function renderAll() {
  const mq = (el, arr) => { const one = arr.map(w => `<span>${esc(T(w))}<svg><use href="#i-paw"/></svg></span>`).join(''); el.innerHTML = one + one + one + one; };
  mq($('#mq1'), MQ1); mq($('#mq2'), MQ2);
  $('#masonry').innerHTML = GALLERY.map(([f, c, w, h], i) => `<button class="pol reveal" type="button" data-i="${i}" style="--rot:${[-2.5, 1.8, -1.2, 2.6, -1.8, 1.2][i % 6]}deg" aria-label="Open photo: ${esc(c)}"><div class="ph"><img src="assets/gallery/${f}" width="${w}" height="${h}" alt="Ginnan the tabby cat: ${esc(c)}" loading="lazy" decoding="async"></div><figcaption><span class="no">No. ${String(i + 1).padStart(2, '0')}</span>${esc(c)}</figcaption></button>`).join('');
  $('#vault').innerHTML = VAULT.map(card => {
    const inner = `<svg><use href="#${card.icon}"/></svg><div class="k">${esc(card.k)}</div><div class="v">${esc(card.v)}</div><div class="s">${esc(card.s)}</div>`;
    if (card.href) return `<a class="vcard reveal" href="${esc(card.href)}" target="_blank" rel="noopener">${inner}</a>`;
    if (card.pending) return `<button class="vcard reveal" type="button" data-pending="${esc(card.pending)}">${inner}</button>`;
    return `<div class="vcard reveal">${inner}</div>`;
  }).join('');
  $$('#vault [data-pending]').forEach(b => b.addEventListener('click', () => toast(b.dataset.pending)));
  $('#road').innerHTML = ROAD.map(([p, t, items], i) => `<div class="phase reveal"><div class="dot">${i + 1}</div><div class="card"><p class="kicker">${p}</p><h3>${t}</h3><ul>${items.map(x => `<li><svg><use href="#i-check"/></svg>${esc(x)}</li>`).join('')}</ul></div></div>`).join('');
  $('#qa').innerHTML = FAQ.map(([q, a]) => `<details class="reveal"><summary>${esc(T(q))}<svg><use href="#i-plus"/></svg></summary><p>${esc(T(a))}</p></details>`).join('');
}

function initNav() {
  const nav = $('#nav'), m = $('#menu'), l = $('#links');
  const on = () => nav.classList.toggle('scrolled', scrollY > 30); on(); addEventListener('scroll', on, { passive: true });
  m.addEventListener('click', () => { const o = l.classList.toggle('open'); m.setAttribute('aria-expanded', o); });
  $$('a', l).forEach(a => a.addEventListener('click', () => { l.classList.remove('open'); m.setAttribute('aria-expanded', 'false'); }));
}

function initReveal() {
  const els = $$('.reveal');
  if (RM || !('IntersectionObserver' in window)) return els.forEach(e => e.classList.add('in'));
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .12, rootMargin: '0px 0px -40px 0px' });
  els.forEach((e, i) => { e.style.transitionDelay = (i % 4) * 80 + 'ms'; io.observe(e); });
}

function initCoin() {
  const coin = $('#coin'), stage = $('#coinStage'), edge = $('.edge', coin);
  edge.remove();
  for (let z = -13; z <= 13; z += 2) { const d = document.createElement('div'); d.className = 'edge'; d.style.cssText = `transform:translateZ(${z}px);box-shadow:none;background:${z % 4 ? '#a87a1a' : '#c99a2e'}`; coin.insertBefore(d, coin.firstChild); }
  if (RM) return;
  coin.classList.add('spin');
  if (!FINE) return;
  addEventListener('pointermove', e => {
    const r = stage.getBoundingClientRect(), x = (e.clientX - (r.left + r.width / 2)) / innerWidth, y = (e.clientY - (r.top + r.height / 2)) / innerHeight;
    stage.style.setProperty('--ry', (x * 30).toFixed(1) + 'deg'); stage.style.setProperty('--rx', (-y * 24).toFixed(1) + 'deg');
  }, { passive: true });
}

function initCat() {
  const cat = $('#cat'), svg = $('#catSvg'), pl = $('#pL'), pr = $('#pR'), glints = $$('.glint', svg);
  const look = (cx, cy) => {
    const r = svg.getBoundingClientRect(), s = 400 / r.width;
    [[pl, 140], [pr, 260]].forEach(([p, ex], i) => {
      const ox = r.left + ex / s, oy = r.top + 200 / s, dx = cx - ox, dy = cy - oy, d = Math.hypot(dx, dy) || 1, m = Math.min(22, d / 12);
      const x = dx / d * m, y = dy / d * m * .7; p.setAttribute('transform', `translate(${x.toFixed(1)} ${y.toFixed(1)})`); glints[i].setAttribute('transform', `translate(${(x * .5).toFixed(1)} ${(y * .5).toFixed(1)})`);
    });
  };
  addEventListener('pointermove', e => look(e.clientX, e.clientY), { passive: true });
  if (!RM) setInterval(() => { cat.classList.add('blink'); setTimeout(() => cat.classList.remove('blink'), 300); }, 3800);
  const KEY = 'ginnan-boops'; let mine = +localStorage.getItem(KEY) || 0, ses = 0;
  const show = () => { $('#boopMine').textContent = mine.toLocaleString(); $('#boopSession').textContent = ses.toLocaleString(); }; show();
  const lines = ['Purr.', 'Mrrp!', 'Again?', 'Golden boop', 'Paw-some', 'Nose: booped'];
  cat.addEventListener('click', e => {
    mine++; ses++; try { localStorage.setItem(KEY, mine); } catch {} show();
    cat.classList.remove('booped'); void cat.offsetWidth; cat.classList.add('booped');
    const r = svg.getBoundingClientRect(), nx = e.clientX || r.left + r.width / 2, ny = e.clientY || r.top + r.height * .72;
    const p = document.createElement('div'); p.className = 'plus'; p.textContent = '+1'; p.style.left = nx - 14 + 'px'; p.style.top = ny - 30 + 'px'; document.body.appendChild(p); setTimeout(() => p.remove(), 1000);
    coinBurst(nx, ny, RM ? 0 : 10);
    if (ses % 10 === 0) toast(`${ses} boops this visit. Ginnan approves.`); else if (ses === 1) toast(lines[0]);
  });
}

function coinBurst(x, y, n) {
  for (let i = 0; i < n; i++) {
    const c = document.createElement('div'); c.className = 'coinpop'; c.style.left = x - 13 + 'px'; c.style.top = y - 13 + 'px'; document.body.appendChild(c);
    const a = Math.random() * Math.PI * 2, v = 80 + Math.random() * 140;
    c.animate([{ transform: 'translate(0,0) rotateY(0) scale(.6)', opacity: 1 }, { transform: `translate(${Math.cos(a) * v}px,${Math.sin(a) * v - 60}px) rotateY(540deg) scale(1)`, opacity: 1, offset: .6 }, { transform: `translate(${Math.cos(a) * v * 1.2}px,${Math.sin(a) * v + 120}px) rotateY(720deg) scale(.8)`, opacity: 0 }], { duration: 1100 + Math.random() * 400, easing: 'cubic-bezier(.2,.7,.4,1)' }).onfinish = () => c.remove();
  }
}

function initGallery() {
  const lb = $('#lb'), img = $('#lbImg'), cap = $('#lbCap'); let i = 0, last;
  const open = n => { i = (n + GALLERY.length) % GALLERY.length; const [f, c] = GALLERY[i]; img.src = 'assets/gallery/' + f; img.alt = 'Ginnan the tabby cat: ' + c; cap.textContent = c; img.style.animation = 'none'; void img.offsetWidth; img.style.animation = ''; };
  $('#masonry').addEventListener('click', e => { const b = e.target.closest('.pol'); if (!b) return; last = b; open(+b.dataset.i); lb.hidden = false; document.body.style.overflow = 'hidden'; $('#lbClose').focus(); });
  const close = () => { lb.hidden = true; document.body.style.overflow = ''; last && last.focus(); };
  $('#lbClose').addEventListener('click', close); $('#lbPrev').addEventListener('click', () => open(i - 1)); $('#lbNext').addEventListener('click', () => open(i + 1));
  lb.addEventListener('click', e => { if (e.target === lb) close(); });
  addEventListener('keydown', e => { if (lb.hidden) return; if (e.key === 'Escape') close(); if (e.key === 'ArrowLeft') open(i - 1); if (e.key === 'ArrowRight') open(i + 1); });
  let sx = 0; lb.addEventListener('touchstart', e => sx = e.touches[0].clientX, { passive: true }); lb.addEventListener('touchend', e => { const d = e.changedTouches[0].clientX - sx; if (Math.abs(d) > 50) open(i + (d < 0 ? 1 : -1)); });
}

function initTrail() {
  if (RM || !FINE) return;
  const t = $('#trail'); let lx = 0, ly = 0, flip = 1;
  addEventListener('pointermove', e => {
    const dx = e.clientX - lx, dy = e.clientY - ly; if (Math.hypot(dx, dy) < 46) return;
    const ang = Math.atan2(dy, dx) * 180 / Math.PI + 90; lx = e.clientX; ly = e.clientY; flip = -flip;
    const p = document.createElement('div'); p.className = 'pawp'; p.innerHTML = '<svg width="18" height="18"><use href="#i-paw"/></svg>';
    const off = 7 * flip, rad = (ang) * Math.PI / 180;
    p.style.left = lx + Math.cos(rad) * off - 9 + 'px'; p.style.top = ly + Math.sin(rad) * off - 9 + 'px';
    p.style.transform = `rotate(${ang}deg)`; p.style.setProperty('--t', `rotate(${ang}deg)`); t.appendChild(p); setTimeout(() => p.remove(), 1000);
  }, { passive: true });
}

function initSparkles() {
  const c = $('#sparkles'), x = c.getContext('2d'); let w, h, dpr, parts = [], run = true;
  const size = () => { dpr = Math.min(devicePixelRatio || 1, 2); w = innerWidth; h = innerHeight; c.width = w * dpr; c.height = h * dpr; x.setTransform(dpr, 0, 0, dpr, 0, 0); };
  size(); addEventListener('resize', size);
  const N = RM ? 0 : Math.round(Math.min(70, w / 22));
  const mk = (y0) => ({ x: Math.random() * w, y: y0 ?? Math.random() * h, s: 1 + Math.random() * 3.2, v: .15 + Math.random() * .5, ph: Math.random() * 6.28, coin: Math.random() < .22, r: Math.random() * 6.28, vr: (Math.random() - .5) * .04 });
  for (let i = 0; i < N; i++) parts.push(mk());
  const star = (px, py, s, a) => { x.globalAlpha = a; x.beginPath(); x.moveTo(px, py - s * 2.4); x.quadraticCurveTo(px, py, px + s * 2.4, py); x.quadraticCurveTo(px, py, px, py + s * 2.4); x.quadraticCurveTo(px, py, px - s * 2.4, py); x.quadraticCurveTo(px, py, px, py - s * 2.4); x.fill(); };
  document.addEventListener('visibilitychange', () => run = !document.hidden);
  let t = 0;
  (function loop() {
    requestAnimationFrame(loop); if (!run || !N) return; t += .016; x.clearRect(0, 0, w, h);
    for (const p of parts) {
      p.y += p.v; p.x += Math.sin(t + p.ph) * .3; p.r += p.vr; if (p.y > h + 20) Object.assign(p, mk(-20));
      const a = .35 + .45 * Math.abs(Math.sin(t * 1.6 + p.ph));
      if (p.coin) { x.save(); x.translate(p.x, p.y); x.scale(Math.cos(p.r * 3), 1); x.globalAlpha = a * .8; const g = x.createRadialGradient(-1, -1, 0, 0, 0, p.s * 2.6); g.addColorStop(0, '#fff0b0'); g.addColorStop(.6, '#e2b33e'); g.addColorStop(1, '#8a6214'); x.fillStyle = g; x.beginPath(); x.arc(0, 0, p.s * 2.6, 0, 6.29); x.fill(); x.restore(); }
      else { x.fillStyle = '#ffe9a0'; star(p.x, p.y, p.s * .8, a); }
    }
    x.globalAlpha = 1;
  })();
}

function initMagnet() {
  if (RM || !FINE) return;
  $$('.btn').forEach(b => { b.addEventListener('pointermove', e => { const r = b.getBoundingClientRect(); b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * .18}px,${(e.clientY - r.top - r.height / 2) * .25 - 3}px)`; }); b.addEventListener('pointerleave', () => b.style.transform = ''); });
}

applyConfig(); renderAll(); initNav(); initReveal(); initCoin(); initCat(); initGallery(); initTrail(); initSparkles(); initMagnet();
