/*!
 * math-bg.js — subtle animated mathematical backgrounds (site-local customization).
 *
 * Injected site-wide via _includes/math_bg.liquid (added by the local override of
 * _layouts/default.liquid). Self-contained, no dependencies.
 *
 * Visualizations: Ulam prime spiral, Riemann zeta ζ(½+it), Wolfram elementary
 * cellular automata rules 30 & 110, and Conway's Game of Life.
 *
 * - Ink colour is read from the al-folio theme variables (via #math-bg-probe),
 *   so it adapts to light/dark automatically.
 * - Very low opacity, fixed behind content (z-index:-1, pointer-events:none).
 * - State (which visualization / off) persists in localStorage.
 * - Keyboard: "b" cycles (… → life → off → spiral → …); digits 1–5 pick one;
 *   "0" turns it off. Ignored while typing in a field.
 * - Honours prefers-reduced-motion (starts off) and pauses on hidden tabs.
 */
(function () {
  "use strict";

  var MODES = ["spiral", "zeta", "rule30", "rule110", "life"];
  var OPACITY = 0.13; // "very subtle"
  var FPS = 30;
  var LS_KEY = "mathbg-v1";

  var canvas = document.getElementById("math-bg");
  if (!canvas || !canvas.getContext) return;
  var ctx = canvas.getContext("2d");
  var probe = document.getElementById("math-bg-probe");

  var reduced =
    window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var state = loadState();
  var W = 0, H = 0, DPR = 1, frame = 0, last = 0, S = {}, inkCache = "#808080", inkAt = -1;

  function loadState() {
    try {
      var s = JSON.parse(localStorage.getItem(LS_KEY));
      if (s && typeof s.mode === "number" && s.mode >= -1 && s.mode < MODES.length) return s;
    } catch (e) {}
    return { mode: reduced ? -1 : 0 }; // -1 = off; default to the prime spiral
  }
  function saveState() {
    try { localStorage.setItem(LS_KEY, JSON.stringify(state)); } catch (e) {}
  }

  function ink() {
    if (frame - inkAt < 45) return inkCache; // refresh ~1×/1.5s so theme toggles are picked up
    inkAt = frame;
    var c = probe ? getComputedStyle(probe).color : "";
    if (c && c !== "rgba(0, 0, 0, 0)" && c !== "transparent") inkCache = c;
    return inkCache;
  }

  function resize() {
    DPR = Math.min(2, window.devicePixelRatio || 1);
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = Math.round(W * DPR);
    canvas.height = Math.round(H * DPR);
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    initMode();
  }

  function fade(alpha) {
    ctx.save();
    ctx.globalCompositeOperation = "destination-out";
    ctx.fillStyle = "rgba(0,0,0," + alpha + ")";
    ctx.fillRect(0, 0, W, H);
    ctx.restore();
  }

  /* ---------- Ulam prime spiral ---------- */
  function sieve(n) {
    var s = new Uint8Array(n + 1);
    s.fill(1); s[0] = 0; s[1] = 0;
    for (var i = 2; i * i <= n; i++) if (s[i]) for (var j = i * i; j <= n; j += i) s[j] = 0;
    return s;
  }
  function initSpiral() {
    S = { n: 1, x: 0, y: 0, dx: 1, dy: 0, steps: 1, sc: 0, turns: 0, cell: 5,
          max: 60000, si: sieve(60000), phase: "grow", hold: 0 };
  }
  function stepSpiral() {
    if (S.phase === "fade") { fade(0.05); if (--S.hold <= 0) { ctx.clearRect(0, 0, W, H); initSpiral(); } return; }
    if (S.phase === "hold") { if (--S.hold <= 0) { S.phase = "fade"; S.hold = 60; } return; }
    ctx.fillStyle = ink();
    var cx = W / 2, cy = H / 2;
    for (var k = 0; k < 34; k++) {
      if (S.n >= S.max) { S.phase = "hold"; S.hold = 260; return; }
      if (S.si[S.n]) {
        var px = cx + S.x * S.cell, py = cy + S.y * S.cell;
        if (px >= -2 && px <= W + 2 && py >= -2 && py <= H + 2) {
          ctx.beginPath(); ctx.arc(px, py, 1.05, 0, 6.2832); ctx.fill();
        }
      }
      S.x += S.dx; S.y += S.dy; S.sc++;
      if (S.sc === S.steps) { S.sc = 0; var t = S.dx; S.dx = -S.dy; S.dy = t; S.turns++; if (S.turns % 2 === 0) S.steps++; }
      S.n++;
    }
  }

  /* ---------- Riemann zeta on the critical line ---------- */
  function zeta(t) { // ζ(½+it) via the Dirichlet eta function
    var er = 0, ei = 0;
    for (var n = 1; n <= 200; n++) {
      var a = Math.pow(n, -0.5), ph = t * Math.log(n), sg = (n & 1) ? 1 : -1;
      er += sg * a * Math.cos(ph); ei -= sg * a * Math.sin(ph);
    }
    var l2 = t * Math.LN2, p = Math.SQRT2, zr = p * Math.cos(l2), zi = -p * Math.sin(l2);
    var dr = 1 - zr, di = -zi, dd = dr * dr + di * di || 1;
    return [(er * dr + ei * di) / dd, (ei * dr - er * di) / dd];
  }
  function initZeta() {
    var pts = [];
    for (var t = 0.15; t <= 52; t += 0.03) pts.push(zeta(t));
    var a = 1e9, b = -1e9, c = 1e9, d = -1e9;
    for (var i = 0; i < pts.length; i++) {
      var p = pts[i];
      if (p[0] < a) a = p[0]; if (p[0] > b) b = p[0];
      if (p[1] < c) c = p[1]; if (p[1] > d) d = p[1];
    }
    var pad = Math.min(W, H) * 0.14;
    var s = Math.min((W - 2 * pad) / (b - a || 1), (H - 2 * pad) / (d - c || 1));
    S = { pts: pts, s: s, ox: (W - (b - a) * s) / 2 - a * s, oy: (H - (d - c) * s) / 2 - c * s, head: 2 };
    ctx.clearRect(0, 0, W, H);
  }
  function stepZeta() {
    ctx.clearRect(0, 0, W, H);
    var P = S.pts, s = S.s, ox = S.ox, oy = S.oy;
    var mx = function (p) { return ox + p[0] * s; }, my = function (p) { return H - (oy + p[1] * s); };
    ctx.strokeStyle = ink(); ctx.lineJoin = "round"; ctx.lineCap = "round";
    ctx.globalAlpha = 0.4; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(mx(P[0]), my(P[0]));
    for (var i = 1; i < P.length; i++) ctx.lineTo(mx(P[i]), my(P[i]));
    ctx.stroke();
    ctx.globalAlpha = 1; ctx.lineWidth = 1.6;
    var h = S.head, lo = Math.max(0, h - 70);
    ctx.beginPath(); ctx.moveTo(mx(P[lo]), my(P[lo]));
    for (var j = lo + 1; j <= h && j < P.length; j++) ctx.lineTo(mx(P[j]), my(P[j]));
    ctx.stroke();
    ctx.globalAlpha = 1;
    S.head += 2; if (S.head >= P.length) S.head = 2;
  }

  /* ---------- Wolfram elementary CA (rules 30 / 110) ---------- */
  function initRule(rule) {
    var cell = 5, cols = Math.ceil(W / cell), rows = Math.ceil(H / cell);
    var row = new Uint8Array(cols); row[cols >> 1] = 1;
    var tb = []; for (var i = 0; i < 8; i++) tb[i] = (rule >> i) & 1;
    S = { cell: cell, cols: cols, rows: rows, row: row, tb: tb, y: 0 };
    ctx.clearRect(0, 0, W, H);
  }
  function stepRule() {
    ctx.fillStyle = ink();
    var cell = S.cell, cols = S.cols, rows = S.rows, row = S.row, tb = S.tb, yp = S.y * cell, x;
    ctx.clearRect(0, yp, W, cell);
    for (x = 0; x < cols; x++) if (row[x]) ctx.fillRect(x * cell, yp, cell - 1, cell - 1);
    var nr = new Uint8Array(cols);
    for (x = 0; x < cols; x++) {
      var l = row[(x - 1 + cols) % cols], cc = row[x], rr = row[(x + 1) % cols];
      nr[x] = tb[(l << 2) | (cc << 1) | rr];
    }
    S.row = nr; S.y++;
    if (S.y >= rows) { S.y = 0; var s2 = new Uint8Array(cols); s2[(Math.random() * cols) | 0] = 1; S.row = s2; }
  }

  /* ---------- Conway's Game of Life ---------- */
  function initLife() {
    var cell = 9, cols = Math.ceil(W / cell), rows = Math.ceil(H / cell);
    var g = new Uint8Array(cols * rows);
    for (var i = 0; i < g.length; i++) g[i] = Math.random() < 0.3 ? 1 : 0;
    S = { cell: cell, cols: cols, rows: rows, g: g, gen: 0 };
    ctx.clearRect(0, 0, W, H);
  }
  function stepLife() {
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = ink();
    var cell = S.cell, cols = S.cols, rows = S.rows, g = S.g, x, y;
    for (y = 0; y < rows; y++) for (x = 0; x < cols; x++) if (g[y * cols + x]) ctx.fillRect(x * cell, y * cell, cell - 1, cell - 1);
    var ng = new Uint8Array(cols * rows);
    for (y = 0; y < rows; y++) for (x = 0; x < cols; x++) {
      var n = 0;
      for (var dy = -1; dy <= 1; dy++) for (var dx = -1; dx <= 1; dx++)
        if (dx || dy) n += g[((y + dy + rows) % rows) * cols + ((x + dx + cols) % cols)];
      var al = g[y * cols + x];
      ng[y * cols + x] = (al ? (n === 2 || n === 3) : (n === 3)) ? 1 : 0;
    }
    S.g = ng; if (++S.gen > 400) initLife();
  }

  /* ---------- driver ---------- */
  function initMode() {
    ctx.clearRect(0, 0, W, H);
    if (state.mode < 0) return;
    var m = MODES[state.mode];
    if (m === "spiral") initSpiral();
    else if (m === "zeta") initZeta();
    else if (m === "rule30") initRule(30);
    else if (m === "rule110") initRule(110);
    else initLife();
  }
  function step() {
    if (state.mode < 0) return;
    var m = MODES[state.mode];
    if (m === "spiral") stepSpiral();
    else if (m === "zeta") stepZeta();
    else if (m === "rule30" || m === "rule110") { if (frame % 2 === 0) stepRule(); }
    else { if (frame % 6 === 0) stepLife(); }
  }
  function apply() {
    canvas.style.opacity = state.mode < 0 ? "0" : String(OPACITY);
    saveState();
  }
  function setMode(m) {
    if (m < -1) m = MODES.length - 1;
    if (m >= MODES.length) m = -1;
    state.mode = m;
    apply();
    if (state.mode >= 0) initMode(); else ctx.clearRect(0, 0, W, H);
  }
  function cycle() { setMode(state.mode + 1 >= MODES.length ? -1 : state.mode + 1); }

  var hidden = false;
  function loop(ts) {
    requestAnimationFrame(loop);
    if (hidden || state.mode < 0) return;
    if (ts - last < 1000 / FPS) return;
    last = ts;
    frame++;
    step();
  }

  document.addEventListener("keydown", function (e) {
    var el = document.activeElement;
    if (el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.isContentEditable)) return;
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    var k = e.key;
    if (k === "b" || k === "B") { cycle(); e.preventDefault(); }
    else if (k >= "1" && k <= "5") { setMode(k.charCodeAt(0) - 49); e.preventDefault(); }
    else if (k === "0") { setMode(-1); e.preventDefault(); }
  });
  document.addEventListener("visibilitychange", function () { hidden = document.hidden; });
  var rt;
  window.addEventListener("resize", function () { clearTimeout(rt); rt = setTimeout(resize, 150); });

  apply();
  resize();
  requestAnimationFrame(loop);
})();
