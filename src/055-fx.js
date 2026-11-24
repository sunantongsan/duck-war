// Duck War — weapon effects: muzzle flashes, trails, impact bursts, comic hit words and a little screen shake.
// Built to stay smooth on phones: one pooled particle list with a hard cap (fewer particles when the battle is crowded),
// only flat shapes (no gradients, no blur), comic words rate-limited, and the shake moves the canvas with CSS (free on the GPU).
var PARTS = [], PART_MAX = 260, WORDS = [], WORD_MAX = 5, WORD_LAST = 0, SHAKE = { a: 0 };
function partBudget(n) { // how many of n particles we can afford right now
  var room = PART_MAX - PARTS.length; if (room <= 0) return 0;
  var crowd = R && R.troops ? R.troops.length : 0; if (crowd > 60) n = Math.ceil(n / 2);
  return Math.min(n, room);
}
// kinds: dot (falls), spark (streak along its velocity), ember (rises, flickers), drop (falls, stretches), star (spins, fades), ring (grows on the ground), feather (drifts down)
function part(o) { if (PARTS.length < PART_MAX) PARTS.push(o); }
function burst(x, y, z, n, kind, colors, speed, up, life, size) {
  n = partBudget(n);
  for (var i = 0; i < n; i++) { var a = Math.random() * 6.283, v = speed * (.5 + Math.random() * .7);
    part({ k: kind, x: x, y: y, z: z, vx: Math.cos(a) * v, vy: Math.sin(a) * v, vz: up * (.5 + Math.random() * .8), life: life * (.7 + Math.random() * .5), age: 0,
           c: colors[i % colors.length], s: size * (.7 + Math.random() * .6), r: Math.random() * 6.28 }); }
}
function ring(x, y, r, color, life, w) { if (PARTS.length < PART_MAX) PARTS.push({ k: 'ring', x: x, y: y, z: 0, vx: 0, vy: 0, vz: 0, life: life, age: 0, c: color, s: r, w: w || 4 }); }
function word(text, x, y, z, color, big) { // comic sound word that pops and floats up
  var t = now(); if (WORDS.length >= WORD_MAX || t - WORD_LAST < 220) return; WORD_LAST = t;
  WORDS.push({ t: text, x: x, y: y, z: z, c: color, age: 0, life: .75, big: big || 1, tilt: (Math.random() - .5) * .3 });
}
function shake(a) { SHAKE.a = Math.min(7, Math.max(SHAKE.a, a)); }

// ---------- what each weapon does ----------
function muzzleFx(kind, x, y, z, from) { // a shot leaves: flash + puff at the muzzle
  if (kind === 'rock') { burst(x, y, z, 6, 'dot', ['#bda88a', '#8a7a6a'], 1.6, 1, .45, 3); ring(x, y, .5, 'rgba(255,240,200,', .3, 3); }
  else if (kind === 'pebble') burst(x, y, z, 3, 'spark', ['#fff1c4', '#ffd36b'], 3, .6, .2, 2);
  else if (kind === 'egg') { emitSmoke(x, y, z, 'grey', .9, 3); burst(x, y, z, 10, 'ember', ['#ffffff', '#dfe8ee'], 1.2, 2.2, .6, 4); shake(2); }   // the pressure cooker vents a gush of steam
  else if (kind === 'water') burst(x, y, z, 9, 'drop', ['#8fe0ff', '#d4f4ff', '#4cc2ff'], 2.6, 1.2, .5, 3);
  else if (kind === 'chili') burst(x, y, z, 12, 'ember', ['#ffef7a', '#ffae2b', '#ff5a1a', '#e3261a'], 2.2, 1.2, .45, 4.5);
  else if (kind === 'tomato') burst(x, y, z, 3, 'drop', ['#e8231a'], .8, -.5, .4, 2.5);
  else if (kind === 'feather') burst(x, y, z, 3, 'feather', ['#ffffff', '#e7eef6'], .8, .6, .8, 4);
  else if (kind === 'magic') burst(x, y, z, 8, 'star', ['#e4b8ff', '#b46bff', '#ffffff'], 1.4, 1, .5, 3.5);
  else if (kind === 'cracker') burst(x, y, z, 4, 'spark', ['#ffe08a', '#ff9d2b'], 2, .8, .25, 2);
}
function trailFx(s) { // called every frame per shot in flight; cheap, throttled
  if (PARTS.length > PART_MAX * .7 || Math.random() < .35) return;
  if (s.kind === 'chili') part({ k: 'ember', x: s.x, y: s.y, z: s.z, vx: (Math.random() - .5) * .4, vy: (Math.random() - .5) * .4, vz: .6, life: .35, age: 0, c: Math.random() < .5 ? '#ffae2b' : '#ff5a1a', s: 4, r: 0 });
  else if (s.kind === 'magic') part({ k: 'star', x: s.x, y: s.y, z: s.z, vx: 0, vy: 0, vz: .2, life: .4, age: 0, c: '#d9a8ff', s: 3, r: Math.random() * 6 });
  else if (s.kind === 'cracker') part({ k: 'spark', x: s.x, y: s.y, z: s.z + .25, vx: (Math.random() - .5) * 2, vy: (Math.random() - .5) * 2, vz: 1, life: .2, age: 0, c: '#ffd36b', s: 2, r: 0 });
  else if (s.kind === 'egg') part({ k: 'ember', x: s.x, y: s.y, z: s.z, vx: 0, vy: 0, vz: .4, life: .5, age: 0, c: '#ffffff', s: 3.5, r: 0 });
  else if (s.kind === 'water') part({ k: 'drop', x: s.x, y: s.y, z: s.z, vx: (Math.random() - .5) * .6, vy: (Math.random() - .5) * .6, vz: -.5, life: .3, age: 0, c: '#9fe3ff', s: 2.5, r: 0 });
}
function impactFx(kind, x, y, big) { // a shot lands
  if (kind === 'rock') { burst(x, y, .3, 8, 'dot', ['#8a7a6a', '#bda88a', '#5e5246'], 2.4, 2.6, .6, 3.5); emitSmoke(x, y, .1, 'dust', .45, 2); word('ปั้ก!', x, y, 1.1, '#fff2c2'); shake(1.5); }
  else if (kind === 'pebble') burst(x, y, .4, 4, 'spark', ['#fff4cf', '#ffd36b'], 2.6, 1.2, .2, 2);
  else if (kind === 'egg') { burst(x, y, .2, 14, 'dot', ['#ffd94a', '#fff6e0', '#ffb300'], 3.2, 3, .7, 4); ring(x, y, 1.6, 'rgba(255,236,150,', .45, 6); emitSmoke(x, y, .2, 'grey', 1, 3); word('ตูม!', x, y, 1.3, '#ffd94a', 1.3); shake(4.5); }
  else if (kind === 'water') { burst(x, y, .6, 10, 'drop', ['#8fe0ff', '#d4f4ff', '#4cc2ff'], 2.4, 2, .55, 3); ring(x, y, .7, 'rgba(160,230,255,', .35, 3); }
  else if (kind === 'chili') { burst(x, y, .3, 14, 'ember', ['#ffef7a', '#ffae2b', '#ff5a1a', '#e3261a'], 2.2, 2.2, .6, 5); ring(x, y, 1, 'rgba(255,120,40,', .4, 5); word('ฟู่!', x, y, 1.1, '#ffae2b'); shake(1.5); }
  else if (kind === 'tomato') { burst(x, y, .2, 12, 'dot', ['#e8231a', '#c4140f', '#ffd27a'], 2.8, 2.4, .65, 3.5); word('แปะ!', x, y, 1.1, '#ff5a4a', 1.1); shake(2.5); }
  else if (kind === 'feather') burst(x, y, .6, 4, 'feather', ['#ffffff', '#e7eef6'], 1, .5, .9, 4);
  else if (kind === 'magic') { burst(x, y, .5, 10, 'star', ['#e4b8ff', '#b46bff', '#ffffff'], 2, 1.4, .55, 4); ring(x, y, .8, 'rgba(190,120,255,', .4, 4); }
  else if (kind === 'cracker') { burst(x, y, .3, 16, 'spark', ['#fff3a0', '#ffb02b', '#ff5a1a'], 4, 2.6, .35, 3); ring(x, y, 1.3, 'rgba(255,200,90,', .4, 6); word('ปัง!', x, y, 1.2, '#ffd23f', 1.2); shake(3.5); }
}
var HIT_WORD = { stab: ['ฉึก!', '#ffffff'], smash: ['ปึ้ก!', '#ffe08a'], bite: ['งับ!', '#ff8a7a'], spin: ['วืด!', '#cfefff'] };
function meleeFx(kind, x, y, attacker, big) { // a blow lands
  if (kind === 'stab') burst(x, y, .5, 5, 'spark', ['#ffffff', '#fff1b0'], 3.4, 1, .18, 2.2);
  else if (kind === 'smash') { burst(x, y, .3, big ? 12 : 6, 'dot', ['#c8a46e', '#8f7450', '#efe1c0'], 2.6, 2.6, .55, 3.5); ring(x, y, big ? 1.4 : .9, 'rgba(255,240,190,', .35, 5); emitSmoke(x, y, .1, 'dust', big ? .8 : .5, big ? 3 : 1); shake(big ? 4 : 1.5); }
  else if (kind === 'bite') { burst(x, y, .6, 6, 'star', ['#ffffff', '#ffd0c8'], 2, 1, .3, 3); shake(1.5); }
  else if (kind === 'spin') burst(x, y, .5, 8, 'spark', ['#e8f6ff', '#ffffff', '#9fdcff'], 3.6, .6, .22, 2.4);
  var w = HIT_WORD[kind]; if (w && (big || Math.random() < .3)) word(w[0], x, y, 1.1 + (big ? .4 : 0), w[1], big ? 1.25 : 1);
}
function crashFx(x, y, size, hq) { // a building falls
  burst(x, y, .5, 10 + size * 4, 'dot', ['#c58a52', '#f2e7c9', '#9b6b3a', '#6d5a4a'], 3.2, 3.4, .9, 4.5);
  ring(x, y, size * .9, 'rgba(255,230,180,', .5, 7); word(hq ? 'พังทลาย!' : 'พัง!', x, y, 1.6, '#ffcf3a', hq ? 1.6 : 1.3); shake(hq ? 7 : 4);
}

// ---------- drawing (called once a frame after the troops) ----------
function drawParts(dt) {
  var s = cam.s / 40, n = 0;
  for (var i = 0; i < PARTS.length; i++) {
    var p = PARTS[i]; p.age += dt; if (p.age >= p.life) continue; PARTS[n++] = p;
    var q = p.age / p.life, a = 1 - q;
    if (p.k === 'ring') { var c = toScreen(p.x, p.y), r = p.s * cam.s * (.25 + q * .9);
      ctx.strokeStyle = p.c + (a * .9) + ')'; ctx.lineWidth = Math.max(1, p.w * s * a); ctx.beginPath(); ctx.ellipse(c.x, c.y, r, r * ISO, 0, 0, 7); ctx.stroke(); continue; }
    var g = p.k === 'ember' ? -.6 : p.k === 'feather' ? 1.2 : 9;   // embers rise, feathers float, the rest fall
    p.vz -= g * dt; p.x += p.vx * dt; p.y += p.vy * dt; p.z += p.vz * dt;
    if (p.z < 0) { p.z = 0; p.vz *= -.35; p.vx *= .6; p.vy *= .6; }
    var o = toScreen(p.x, p.y, p.z), sz = p.s * s + .6;
    ctx.globalAlpha = Math.min(1, a * 1.6); ctx.fillStyle = p.c;
    if (p.k === 'spark') { var e = toScreen(p.x - p.vx * .06, p.y - p.vy * .06, p.z - p.vz * .06); ctx.strokeStyle = p.c; ctx.lineWidth = sz * .7; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(o.x, o.y); ctx.lineTo(e.x, e.y); ctx.stroke(); }
    else if (p.k === 'drop') { ctx.beginPath(); ctx.ellipse(o.x, o.y, sz * .55, sz * (1 + Math.min(1.5, Math.abs(p.vz) * .25)) * .6, 0, 0, 7); ctx.fill(); }
    else if (p.k === 'ember') { var f = sz * (1 - q * .6) * (.8 + Math.random() * .4); ctx.fillRect(o.x - f / 2, o.y - f / 2, f, f); }
    else if (p.k === 'star') { p.r += dt * 8; var t = sz * 1.3; ctx.save(); ctx.translate(o.x, o.y); ctx.rotate(p.r); ctx.fillRect(-t / 2, -t / 8, t, t / 4); ctx.fillRect(-t / 8, -t / 2, t / 4, t); ctx.restore(); }
    else if (p.k === 'feather') { p.r += dt * 3; ctx.save(); ctx.translate(o.x + Math.sin(p.r) * 3 * s, o.y); ctx.rotate(Math.sin(p.r) * .6); ctx.beginPath(); ctx.ellipse(0, 0, sz * 1.2, sz * .4, 0, 0, 7); ctx.fill(); ctx.restore(); }
    else { ctx.fillRect(o.x - sz / 2, o.y - sz / 2, sz, sz); }
  }
  PARTS.length = n; ctx.globalAlpha = 1;
  // comic words: pop in big, settle, float up and fade
  var m = 0;
  for (i = 0; i < WORDS.length; i++) { var w = WORDS[i]; w.age += dt; if (w.age >= w.life) continue; WORDS[m++] = w;
    var wq = w.age / w.life, pop = wq < .15 ? .6 + wq / .15 * .7 : 1.3 - Math.min(.3, (wq - .15) * 1.2), wp = toScreen(w.x, w.y, w.z + wq * .6), fs = Math.round(15 * s * w.big * pop + 6);
    ctx.save(); ctx.translate(wp.x, wp.y); ctx.rotate(w.tilt); ctx.globalAlpha = wq > .7 ? (1 - wq) / .3 : 1;
    ctx.font = '900 ' + fs + 'px "Kanit","Prompt",sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.lineJoin = 'round';
    ctx.lineWidth = Math.max(3, fs * .22); ctx.strokeStyle = '#3a2210'; ctx.strokeText(w.t, 0, 0); ctx.fillStyle = w.c; ctx.fillText(w.t, 0, 0); ctx.restore(); }
  WORDS.length = m; ctx.globalAlpha = 1;
  // shake: move the canvas element itself (no redraw cost); decays quickly
  if (SHAKE.a > .05) { SHAKE.a *= Math.pow(.0009, dt); var sx = (Math.random() - .5) * 2 * SHAKE.a, sy = (Math.random() - .5) * 2 * SHAKE.a; canvas.style.transform = 'translate(' + sx.toFixed(1) + 'px,' + sy.toFixed(1) + 'px)'; SHAKE.on = true; }
  else if (SHAKE.on) { SHAKE.a = 0; SHAKE.on = false; canvas.style.transform = ''; }
}
function clearFx() { PARTS.length = 0; WORDS.length = 0; SHAKE.a = 0; if (SHAKE.on) { SHAKE.on = false; canvas.style.transform = ''; } }
