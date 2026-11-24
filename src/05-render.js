// Duck War — drawing: grass field, buildings (with contact shadows baked in), turrets that turn, walls that join,
// troops from 8-direction sheets with cartoon squash & stretch, shots and effects. Depth = x + y (back to front).
// Keep the visible terrain and deployment overlay in one screen-sized bitmap.
var groundCache = null;
function drawGround() {
  var raid = screen === 'raid' && R && !R.over && R.pick ? R : null;
  var flash = !!(raid && raid.redFlash && now() - raid.redFlash < 700);
  var revision = raid ? raid.groundRevision : 0;
  if (!groundCache) groundCache = { image: document.createElement('canvas') };
  var cache = groundCache, image = cache.image;
  if (cache.x !== cam.x || cache.y !== cam.y || cache.scale !== cam.s ||
      cache.w !== view.w || cache.h !== view.h || cache.dpr !== view.dpr ||
      cache.raid !== raid || cache.revision !== revision || cache.flash !== flash) {
    if (image.width !== canvas.width) image.width = canvas.width;
    if (image.height !== canvas.height) image.height = canvas.height;
    var c = image.getContext('2d');
    c.setTransform(view.dpr, 0, 0, view.dpr, 0, 0);
    paintGround(c);
    if (raid) paintDeployZone(c, raid, flash);
    cache.x = cam.x; cache.y = cam.y; cache.scale = cam.s;
    cache.w = view.w; cache.h = view.h; cache.dpr = view.dpr;
    cache.raid = raid; cache.revision = revision; cache.flash = flash;
  }
  ctx.save();
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(image, 0, 0);
  ctx.restore();
}
function paintDeployZone(c, raid, flash) {
  var red = flash ? 'rgba(255,60,60,.24)' : 'rgba(255,80,80,.12)', enc = enclosed();
  c.beginPath();
  for (var y = 0; y < MAP; y++) for (var x = 0; x < MAP; x++) if (enc[y * MAP + x]) { var a = toScreen(x, y), b = toScreen(x + 1, y), d = toScreen(x + 1, y + 1), e = toScreen(x, y + 1); c.moveTo(a.x, a.y); c.lineTo(b.x, b.y); c.lineTo(d.x, d.y); c.lineTo(e.x, e.y); c.closePath(); }
  c.fillStyle = red; c.fill();
  raid.buildings.forEach(function (b) {
    if (!b.dead && b.k !== 'wall' && !enc[(b.y - 1) * MAP + b.x - 1])
      tileDiamond(b.x - 1, b.y - 1, B[b.k].size + 2, red, null, c);
  });
}
function paintGround(c) {
  c.fillStyle = '#6fb84a'; c.fillRect(0, 0, view.w, view.h);
  var p = [toScreen(0, 0), toScreen(MAP, 0), toScreen(MAP, MAP), toScreen(0, MAP)];
  c.save(); c.beginPath(); c.moveTo(p[0].x, p[0].y); for (var i = 1; i < 4; i++) c.lineTo(p[i].x, p[i].y); c.closePath();
  var g = c.createLinearGradient(p[0].x, p[0].y, p[2].x, p[2].y); g.addColorStop(0, '#9fe06a'); g.addColorStop(1, '#7fcb55'); c.fillStyle = g; c.fill();
  c.clip();
  // checkerboard of soft lighter tiles (like a mown lawn)
  c.fillStyle = 'rgba(255,255,255,.06)'; c.beginPath();   // one path for all 800 tiles: repainting the lawn when a building falls no longer hitches
  for (var x = 0; x < MAP; x++) for (var y = 0; y < MAP; y++) if ((x + y) % 2 === 0) { var a = toScreen(x, y), b = toScreen(x + 1, y), d = toScreen(x + 1, y + 1), e = toScreen(x, y + 1); c.moveTo(a.x, a.y); c.lineTo(b.x, b.y); c.lineTo(d.x, d.y); c.lineTo(e.x, e.y); c.closePath(); }
  c.fill();
  c.restore();
  c.strokeStyle = 'rgba(70,120,40,.55)'; c.lineWidth = 3; c.beginPath(); c.moveTo(p[0].x, p[0].y); for (i = 1; i < 4; i++) c.lineTo(p[i].x, p[i].y); c.closePath(); c.stroke();
}
function tileDiamond(x, y, s, fill, stroke, c) {
  c = c || ctx;
  var a = toScreen(x, y), b = toScreen(x + s, y), d = toScreen(x + s, y + s), e = toScreen(x, y + s);
  c.beginPath(); c.moveTo(a.x, a.y); c.lineTo(b.x, b.y); c.lineTo(d.x, d.y); c.lineTo(e.x, e.y); c.closePath();
  if (fill) { c.fillStyle = fill; c.fill(); } if (stroke) { c.strokeStyle = stroke; c.lineWidth = 2; c.stroke(); }
}
function sprite(a, wx, wy, opt) {
  var im = img(a.file); if (!ready(im)) return; var p = toScreen(wx, wy), k = cam.s / a.ppu * ((opt && opt.fit) || 1);
  var sx = 1, sy = 1; if (opt && opt.squash) { sx = opt.squash[0]; sy = opt.squash[1]; }
  ctx.save(); ctx.translate(p.x, p.y); ctx.scale(sx, sy); if (opt && opt.alpha !== undefined) ctx.globalAlpha = opt.alpha;
  ctx.drawImage(im, -a.ax * k, -a.ay * k, im.width * k, im.height * k); ctx.restore();
}
function wobble(o) { // jelly pop when placed / upgraded, squish when hit
  var t = (now() - (o.pop || 0)) / 1000, h = (now() - (o.hitAt || 0)) / 1000, sx = 1, sy = 1;
  if (t < .7) { var w = Math.exp(-6 * t) * Math.sin(t * 22); sx = 1 + w * .18; sy = 1 - w * .22; }
  if (h < .25) { var q = Math.sin(h / .25 * Math.PI) * .07; sx *= 1 + q; sy *= 1 - q; }
  return [sx, sy];
}
function drawBuilding(b, scene) {
  var d = B[b.k], s = d.size, c = { x: b.x + s / 2, y: b.y + s / 2 };
  if (d.wall) return drawWall(b, scene);
  if (b.dead) { var art = d.turret ? null : ART.buildings[d.art].rubble; if (art) sprite(art, c.x, c.y); else drawTurret(b, c, true); if (b.deadAt) smoulder(c, b); return; }
  var stage = stageOf(Math.max(1, b.lv));
  if (d.turret) drawTurret(b, c, false);
  else sprite(ART.buildings[d.art].stages[stage - 1], c.x, c.y, { squash: wobble(b), alpha: b.lv === 0 ? .55 : 1 });
  if (b.up) drawScaffold(b, c);
  else if (b.boost && b.boost > now()) drawBoost(b, c);
  if (b.max && b.hp < b.max * .5) smoke(c, b);
}
function drawTurret(b, c, dead) {
  var tu = ART.turrets[B[b.k].turret], st = tu.stages[stageOf(Math.max(1, b.lv)) - 1], im = img(st.file); if (!ready(im)) return;
  var p = toScreen(c.x, c.y), k = cam.s / st.ppu * (st.fit || tu.fit || 1), cs = st.cell, w = wobble(b);
  var dir = ((Math.round((b.aim === undefined ? 2.36 : b.aim) / (Math.PI / 8)) % 16) + 16) % 16, rec = b.fire ? Math.max(0, 1 - (now() - b.fire) / 220) : 0;
  function cell(n, dx, dy) { ctx.drawImage(im, (n % 6) * cs, Math.floor(n / 6) * cs, cs, cs, -st.ax * k + dx, -st.ay * k + dy, cs * k, cs * k); }
  ctx.save(); ctx.translate(p.x, p.y); ctx.scale(w[0], w[1]); if (b.lv === 0) ctx.globalAlpha = .55;
  if (dead) { cell(17, 0, 0); ctx.restore(); return; }
  cell(16, 0, 0);
  var ax = Math.cos(b.aim || 0) - Math.sin(b.aim || 0), ay = (Math.cos(b.aim || 0) + Math.sin(b.aim || 0)) * ISO;
  cell(dir, -ax * rec * 4, -ay * rec * 4);
  ctx.restore();
}
var WALLSET = null;   // live wall tiles of the scene being drawn, rebuilt each frame (was a scan of every building per wall)
function buildWallSet(list) { var set = new Set(); for (var i = 0; i < list.length; i++) { var o = list[i]; if (o.k === 'wall' && !o.dead) set.add(o.x * 1000 + o.y); } WALLSET = { list: list, set: set }; }
function drawWall(b, scene) {
  var tier = clamp(Math.ceil(b.lv * 6 / MAX_LV), 1, 6), set = ART.walls[tier] || ART.walls['1']; if (!set) return;
  var list = scene.buildings, set2 = WALLSET && WALLSET.list === list ? WALLSET.set : null,
      has = set2 ? function (x, y) { return set2.has(x * 1000 + y); } : function (x, y) { return list.some(function (o) { return o.k === 'wall' && !o.dead && o.x === x && o.y === y; }); };
  if (b.dead) return;
  var cx = b.x + .5, cy = b.y + .5, w = wobble(b), f = {}, fw = { squash: w };
  if (has(b.x, b.y - 1) && set.linky) { sprite(set.linky, cx, cy - .5, f); sprite(set.linky, cx, cy, f); }
  if (has(b.x - 1, b.y) && set.linkx) { sprite(set.linkx, cx - .5, cy, f); sprite(set.linkx, cx - 1, cy, f); }
  if (set.post) sprite(set.post, cx, cy, fw);
}
function drawScaffold(b, c) {
  var p = toScreen(c.x, c.y), left = b.up.until - now(), tot = b.up.until - b.up.start, k = clamp(1 - left / tot, 0, 1);
  var w = 60, x = p.x - w / 2, y = p.y - cam.s * 2.2;
  ctx.fillStyle = 'rgba(20,40,60,.75)'; roundRect(x - 4, y - 18, w + 8, 26, 8); ctx.fill();
  ctx.fillStyle = '#ffe36b'; roundRect(x, y, w * k, 5, 3); ctx.fill();
  ctx.fillStyle = '#fff'; ctx.font = 'bold 12px sans-serif'; ctx.textAlign = 'center'; ctx.fillText('🔨 ' + clock(left), p.x, y - 4);
}
// ---------- smoke: soft billowing puffs that rise, drift, grow, lighten and fade ----------
function puffTexture(rgb, seed) {
  var c = document.createElement('canvas'); c.width = c.height = 96; var g = c.getContext('2d'), r = rng(seed);
  for (var i = 0; i < 11; i++) {
    var x = 48 + (r() - .5) * 36, y = 50 + (r() - .5) * 30, rr = 16 + r() * 16, gr = g.createRadialGradient(x - rr * .25, y - rr * .3, rr * .1, x, y, rr);
    gr.addColorStop(0, 'rgba(' + rgb + ',.62)'); gr.addColorStop(.55, 'rgba(' + rgb + ',.35)'); gr.addColorStop(1, 'rgba(' + rgb + ',0)');
    g.fillStyle = gr; g.beginPath(); g.arc(x, y, rr, 0, 7); g.fill();
  }
  return c;
}
var PUFFS = null, SMOKE = [], FDT = 0;
function puffs() { if (!PUFFS) PUFFS = { dark: [puffTexture('58,54,52', 3), puffTexture('62,58,55', 9)], grey: [puffTexture('140,136,134', 5), puffTexture('150,146,142', 11)], light: [puffTexture('236,232,226', 7), puffTexture('242,238,230', 13)], dust: [puffTexture('214,196,160', 17), puffTexture('226,210,176', 19)] }; return PUFFS; }
var SMOKE_MAX = 140;   // a huge brawl makes lots of dust: keep the newest puffs within budget
function emitSmoke(x, y, z, kind, size, n) {
  n = n || 1; if (SMOKE.length >= SMOKE_MAX) return; if (SMOKE.length > SMOKE_MAX * .6) n = Math.max(1, Math.ceil(n / 3));
  for (var i = 0; i < n; i++) SMOKE.push({ x: x + (Math.random() - .5) * .3 * size, y: y + (Math.random() - .5) * .3 * size, z: z, vz: kind === 'dust' ? .5 + Math.random() * .6 : .7 + Math.random() * .4,
    vx: (Math.random() - .5) * (kind === 'dust' ? 1.6 : .15), vy: (Math.random() - .5) * (kind === 'dust' ? 1.6 : .15), age: 0, life: kind === 'dust' ? .9 + Math.random() * .6 : 2.2 + Math.random() * 1.2,
    size: size * (.45 + Math.random() * .3), kind: kind, tex: Math.random() < .5 ? 0 : 1, rot: Math.random() * 6.28, spin: (Math.random() - .5) * .6 });
}
function drawBoost(b, c) { // little ⚡x2 tag with time left over a boosted maker
  var p = toScreen(c.x, c.y), y = p.y - cam.s * 1.9 - Math.sin(now() / 300) * 3, txt = '⚡x2 ' + clock(b.boost - now());
  ctx.font = 'bold 12px sans-serif'; var w = ctx.measureText(txt).width + 14;
  ctx.fillStyle = 'rgba(255,190,30,.92)'; roundRect(p.x - w / 2, y - 16, w, 20, 10); ctx.fill();
  ctx.fillStyle = '#5a3300'; ctx.textAlign = 'center'; ctx.fillText(txt, p.x, y - 2);
}
function smoke(c, b) { // a damaged building keeps smoking, thicker and darker the lower its HP
  var hurt = 1 - b.hp / b.max; b.smokeT = (b.smokeT || 0) - FDT; if (b.smokeT > 0) return;
  b.smokeT = .32 - hurt * .18; var s = B[b.k].size; emitSmoke(c.x + (Math.random() - .5) * s * .3, c.y + (Math.random() - .5) * s * .3, .5 + s * .25, hurt > .75 ? 'dark' : 'grey', .8 + s * .35);
}
function smoulder(c, b) { // rubble smoulders for a few seconds after it falls
  var t = (now() - b.deadAt) / 1000; if (t > 7) return; b.smokeT = (b.smokeT || 0) - FDT; if (b.smokeT > 0) return;
  b.smokeT = .35 + t * .12; var s = B[b.k].size; emitSmoke(c.x + (Math.random() - .5) * s * .5, c.y + (Math.random() - .5) * s * .5, .2, t < 2 ? 'dark' : 'grey', .5 + s * .22);
}
function drawSmoke(dt) {
  var P = puffs(), dpr = view.dpr;
  SMOKE = SMOKE.filter(function (p) {
    p.age += dt; if (p.age >= p.life) return false; var q = p.age / p.life;
    p.z += p.vz * dt; p.vz *= p.kind === 'dust' ? .96 : .995; p.x += (p.vx + .18) * dt; p.y += (p.vy - .18) * dt; p.vx *= .97; p.vy *= .97; p.rot += p.spin * dt;   // gentle breeze
    var sc = toScreen(p.x, p.y, p.z), r = p.size * cam.s * (.55 + q * (p.kind === 'dust' ? 1.1 : 1.6)), a = Math.min(1, p.age / .18) * (1 - q) * (1 - q);
    var cs = Math.cos(p.rot) * dpr, sn = Math.sin(p.rot) * dpr; ctx.setTransform(cs, sn, -sn, cs, sc.x * dpr, sc.y * dpr);
    var base = P[p.kind][p.tex], lite = P[p.kind === 'dust' ? 'dust' : 'light'][p.tex];
    ctx.globalAlpha = a * (1 - q * .7); ctx.drawImage(base, -r, -r, 2 * r, 2 * r);                     // starts dark and sooty
    if (p.kind !== 'dust') { ctx.globalAlpha = a * q * .8; ctx.drawImage(lite, -r, -r, 2 * r, 2 * r); } // turns pale as it thins out
    return true;
  });
  ctx.globalAlpha = 1; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}
function roundRect(x, y, w, h, r) { ctx.beginPath(); ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r); ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath(); }
function drawTunnel(t) { // a digger underground: a wobbling mound of earth with clods popping off
  var p = toScreen(t.x, t.y), s = cam.s, w = Math.sin(now() / 70 + t.x * 3) * .08;
  ctx.fillStyle = 'rgba(60,40,20,.35)'; ctx.beginPath(); ctx.ellipse(p.x, p.y + s * .04, s * .42, s * .2, 0, 0, 7); ctx.fill();
  ctx.fillStyle = '#8a5a2b'; ctx.beginPath(); ctx.ellipse(p.x, p.y - s * .06, s * (.34 + w), s * (.17 - w * .5), 0, Math.PI, 0); ctx.fill();
  ctx.fillStyle = '#a8743c'; ctx.beginPath(); ctx.ellipse(p.x - s * .05, p.y - s * .1, s * .18, s * .08, 0, Math.PI, 0); ctx.fill();
  for (var i = 0; i < 3; i++) { var q = (now() / 400 + i / 3 + t.x) % 1; ctx.fillStyle = '#6d4520';
    ctx.fillRect(p.x + Math.cos(i * 2.1 + t.y) * s * .3 * q - 2, p.y - s * .1 - Math.sin(q * Math.PI) * s * .35, 4, 4); }
}
function hpBar(x, y, z, k, color) {
  var p = toScreen(x, y, z), w = 34; ctx.fillStyle = 'rgba(20,30,40,.7)'; ctx.fillRect(p.x - w / 2 - 1, p.y - 1, w + 2, 6); ctx.fillStyle = color; ctx.fillRect(p.x - w / 2, p.y, w * k, 4);
}

// ---------- troop sheets sized for the phone ----------
// The original sheets are huge (the colonel's is 5670 px wide, wider than the 4096 px most phone GPUs can hold, so every
// frame he was drawn the slow way, and the dog's and egret's add ~50 MB more). Each sheet is copied once, a row at a time
// in the background, at the size the screen really needs (1/2, 3/4 or full) and cut into pieces no wider than 2048 px.
// Until a copy is ready the original is drawn.
var SHEETS = {}, SHEETQ = [], TILE_W = 2048;
function sheetLevel(need) { return need <= .5 ? .5 : need <= .75 ? .75 : 1; }
function sheetFor(im, cw, ch, need) {
  var level = sheetLevel(need), key = im.src + '@' + level, sh = SHEETS[key];
  if (sh && sh.done) return sh;
  if (!sh) { sh = SHEETS[key] = { im: im, level: level, cw: Math.max(1, Math.round(cw * level)), ch: Math.max(1, Math.round(ch * level)), scw: cw, sch: ch,
      cols: 0, dirs: 0, rows: [], next: 0, done: false };
    sh.per = Math.max(1, Math.floor(TILE_W / sh.cw)); SHEETQ.push(sh); }
  for (var l in { '.5': 1, '.75': 1, '1': 1 }) { var o = SHEETS[im.src + '@' + Number(l)]; if (o && o.done) return o; }   // another size of this sheet while the right one is made
  return null;
}
function sheetWork(rows) { // build a few sheet rows per frame
  while (rows-- > 0 && SHEETQ.length) {
    var sh = SHEETQ[0]; if (!ready(sh.im)) { SHEETQ.push(SHEETQ.shift()); return; }
    if (!sh.cols) { sh.cols = Math.round(sh.im.naturalWidth / sh.scw); sh.dirs = Math.round(sh.im.naturalHeight / sh.sch); }
    var d = sh.next++, tiles = [];
    try {
      for (var c0 = 0; c0 < sh.cols; c0 += sh.per) { var n = Math.min(sh.per, sh.cols - c0), cv = document.createElement('canvas'); cv.width = n * sh.cw; cv.height = sh.ch;
        var g = cv.getContext('2d'); g.imageSmoothingEnabled = true; g.imageSmoothingQuality = 'high';
        g.drawImage(sh.im, c0 * sh.scw, d * sh.sch, n * sh.scw, sh.sch, 0, 0, n * sh.cw, sh.ch); tiles.push(cv); }
    } catch (e) { tiles = null; }
    sh.rows[d] = tiles;
    if (!tiles) { SHEETQ.shift(); delete SHEETS[sh.im.src + '@' + sh.level]; continue; }
    if (sh.next >= sh.dirs) { sh.done = true; SHEETQ.shift();
      Object.keys(SHEETS).forEach(function (k) { var o = SHEETS[k]; if (o !== sh && o.im === sh.im && o.done) delete SHEETS[k]; }); }   // free the other sizes
  }
}
function troopNeed(u, a) { return u.h * cam.s * 1.05 / a.h * view.dpr * 1.35; }   // 1.35: room for the squash & stretch
function sheetPrime(kinds) { // queue the sheets a raid (or the home base) is about to show
  kinds.forEach(function (k) { var u = U[k] || CATS[k]; if (!u) return; var a = ART.troops[u.art], L = ART.troopLayout; if (!a) return;
    sheetFor(img(a.file), a.cw || L.cw, a.ch || L.ch, troopNeed(u, a)); });
}

// ---------- troops ----------
var SHADOW = null;   // one soft ellipse, stamped under every troop (a path + fill per duck was a big cost with hundreds on screen)
function shadowImg() { if (SHADOW) return SHADOW; var c = document.createElement('canvas'); c.width = 64; c.height = 32; var g = c.getContext('2d');
  g.fillStyle = 'rgb(30,60,30)'; g.beginPath(); g.ellipse(32, 16, 31, 15, 0, 0, 7); g.fill(); return SHADOW = c; }
function drawTroop(t) {
  var u = t.side === 'cat' ? CATS[t.kind] : t.side === 'hero' ? HEROES[t.kind] : U[t.kind], a = ART.troops[u.art], L = ART.troopLayout; if (!a) return;
  if (t.under) return drawTunnel(t);
  var im = img(a.file); if (!ready(im)) return;
  var dir = ((Math.round((t.face === undefined ? Math.PI / 2 : t.face) / (Math.PI / 4)) % 8) + 8) % 8, col, n = now(), alpha = 1;
  var atkQ = t.atk ? (n - t.atk) / 520 : 9;
  if (t.dead) { var dq = (n - t.deadAt) / 1000; col = L.death[0] + Math.min(L.death[1] - 1, Math.floor(dq / .14)); alpha = dq < 1.2 ? 1 : Math.max(0, 1 - (dq - 1.2) / .6); if (alpha <= 0) return; }
  else if (atkQ < 1) col = L.attack[0] + Math.min(L.attack[1] - 1, Math.floor(atkQ * L.attack[1]));
  else if (t.moving) col = L.walk[0] + Math.floor((t.walk || 0) * 9) % L.walk[1];
  else col = L.idle[0] + Math.floor(n / 180 + (t.x * 7 | 0)) % L.idle[1];
  var p = toScreen(t.x, t.y), k = u.h * cam.s * 1.05 / a.h, sx = 1, sy = 1, ox = 0, oy = 0, m = cam.s * 2;
  if (p.x < -m || p.x > view.w + m || p.y < -m * .5 || p.y > view.h + m * 1.5) return;   // off screen: skip
  if (!t.dead && atkQ < 1) { // wind-up stretch, then lunge and squash flat on the hit, spring back
    var hit = atkQ < .35 ? 0 : Math.sin(Math.min(1, (atkQ - .35) / .45) * Math.PI), up = atkQ < .35 ? Math.sin(atkQ / .35 * Math.PI) : 0;
    var fx = Math.cos(t.face) - Math.sin(t.face), fy = (Math.cos(t.face) + Math.sin(t.face)) * ISO, fl = Math.hypot(fx, fy) || 1;
    ox = fx / fl * hit * .3 * cam.s; oy = fy / fl * hit * .3 * cam.s; sx = 1 - .14 * up + .3 * hit; sy = 1 + .2 * up - .25 * hit;
  } else if (t.moving) { var b = Math.sin((t.walk || 0) * 9 * Math.PI / 4); sy = 1 + .06 * b; sx = 1 - .05 * b; }
  else if (!t.dead) { var br = Math.sin(n / 260 + t.x); sy = 1 + .025 * br; sx = 1 - .02 * br; }
  if (t.born && n - t.born < 400) { var bq = (n - t.born) / 400, bw = Math.exp(-5 * bq) * Math.sin(bq * 18); sx *= 1 + bw * .3; sy *= 1 - bw * .3; }
  if (t.invis > n) alpha *= .35 + Math.sin(n / 90) * .08;   // the queen's feather veil
  var dpr = view.dpr; ctx.globalAlpha = alpha;
  if (u.hero && !t.dead) { // a gold ring on the ground marks a hero; the colonel's shows how far his leadership reaches
    var rr = (u.aura || .75) * cam.s; ctx.strokeStyle = 'rgba(255,205,60,' + (u.aura ? .45 : .7) + ')'; ctx.lineWidth = 2.5; ctx.setLineDash(u.aura ? [8, 6] : []);
    ctx.beginPath(); ctx.ellipse(p.x, p.y, rr, rr * ISO, 0, 0, 7); ctx.stroke(); ctx.setLineDash([]); }
  if (t.fast > n && !t.dead) { ctx.fillStyle = 'rgba(255,120,40,.22)'; ctx.beginPath(); ctx.ellipse(p.x, p.y, .55 * cam.s, .3 * cam.s, 0, 0, 7); ctx.fill(); }
  var sh = u.air ? .14 : .32, rw = sh * cam.s * Math.min(u.h, 1.6); ctx.globalAlpha = alpha * (u.air ? .18 : .28); ctx.drawImage(shadowImg(), p.x - rw, p.y - rw * .5, rw * 2, rw); ctx.globalAlpha = alpha;
  ctx.setTransform(dpr * sx, 0, 0, dpr * sy, (p.x + ox) * dpr, (p.y + oy) * dpr);
  var cw = a.cw || L.cw, ch = a.ch || L.ch, sh = sheetFor(im, cw, ch, troopNeed(u, a)), row = sh && sh.rows[dir];
  if (row) { var gi = Math.floor(col / sh.per); ctx.drawImage(row[gi], (col - gi * sh.per) * sh.cw, 0, sh.cw, sh.ch, -a.ax * k, -a.ay * k, cw * k, ch * k); }
  else ctx.drawImage(im, col * cw, dir * ch, cw, ch, -a.ax * k, -a.ay * k, cw * k, ch * k);
  if (u.crown && !t.dead) { var ht = headTop(im, col, dir, cw, ch); if (ht) drawCrown((ht.x - a.ax) * k, (ht.y - a.ay) * k + cam.s * .1, cam.s * .5, u.crown); }
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.globalAlpha = 1;
  if (!t.dead && t.hp < t.max) hpBar(t.x, t.y, u.h * 1.45, t.hp / t.max, t.side === 'cat' ? '#ff6b5a' : '#7be36a');
}

// Where the crown sits = top of the head in each animation frame. Finding it means reading pixels back from the image,
// which took ~30 ms a time on phones and froze raids whenever the king or queen showed a new pose. Now whole sheet rows
// are measured a little at a time while nothing is happening (mostly at home), and remembered on the phone for good.
var HEADS_KEY = 'duckwar.heads.v1', HEADS = (function () { try { return JSON.parse(localStorage.getItem(HEADS_KEY)) || {}; } catch (e) { return {}; } })(), HEADQ = [], HEADT = 0;
function headKey(im) { return String(im.src || '').split('/').pop(); }
function headTop(im, col, dir, cw, ch) {
  var f = headKey(im), key = f + '|' + col + '|' + dir; if (key in HEADS) return HEADS[key];
  headQueue(im, dir, cw, ch);
  for (var c = 0; c < 32; c++) { var k2 = f + '|' + c + '|' + dir; if (HEADS[k2]) return HEADS[k2]; }   // borrow another pose facing the same way until measured
  return null;
}
function headQueue(im, dir, cw, ch) { var id = headKey(im) + '#' + dir; if (HEADQ.some(function (q) { return q.id === id; })) return; HEADQ.push({ id: id, im: im, dir: dir, cw: cw, ch: ch }); }
function headPrepare() { // crowned heroes: queue every direction of their sheets
  HERO_KEYS.forEach(function (k) { var u = U[k]; if (!u.crown) return; var a = ART.troops[u.art]; if (!a) return; var L = ART.troopLayout, im = img(a.file);
    for (var d = 0; d < L.dirs; d++) if (!(headKey(im) + '|0|' + d in HEADS)) headQueue(im, d, a.cw || L.cw, a.ch || L.ch); });
}
function headWork(raid) { // measure one sheet row now and then: often at home, rarely mid-raid
  if (!HEADQ.length) return; var t = now(); if (t < HEADT) return;
  if (raid) return;   // reading pixels back stalls the GPU: only ever at home (mid-raid the crown borrows a measured pose)
  var q = HEADQ[0]; if (!ready(q.im)) { HEADT = t + 300; return; }
  HEADQ.shift(); HEADT = t + 120;
  var cw = q.cw, ch = q.ch, cols = Math.floor(q.im.naturalWidth / cw), f = headKey(q.im);
  try {
    var c = headWork.c || (headWork.c = document.createElement('canvas')); c.width = cw * cols; c.height = ch; var g = c.getContext('2d', { willReadFrequently: true });
    g.clearRect(0, 0, c.width, ch); g.drawImage(q.im, 0, q.dir * ch, cw * cols, ch, 0, 0, cw * cols, ch); var d = g.getImageData(0, 0, cw * cols, ch).data, W = cw * cols;
    for (var col = 0; col < cols; col++) {
      // the king and queen wear the army helmet: its olive green marks the head (the dog's tail sticks up higher than his head)
      var scan = function (test) { for (var y = 0; y < ch; y++) { var sx = 0, n = 0; for (var x = col * cw; x < col * cw + cw; x++) { var i = (y * W + x) * 4; if (test(d[i], d[i + 1], d[i + 2], d[i + 3])) { sx += x - col * cw; n++; } } if (n >= 4) return { x: sx / n, y: y }; } return null; };
      HEADS[f + '|' + col + '|' + q.dir] = scan(function (R0, G, B0, A) { return A > 200 && G > R0 + 8 && G > B0 + 18 && G < 170 && R0 < 150; }) || scan(function (R0, G, B0, A) { return A > 140; });
    }
  } catch (e) { for (var k = 0; k < cols; k++) HEADS[f + '|' + k + '|' + q.dir] = null; }
  if (!HEADQ.length) try { localStorage.setItem(HEADS_KEY, JSON.stringify(HEADS)); } catch (e) {}
}
function drawCrown(x, y, s, kind) { // gold crown that sits on the king's and queen's heads, bobbing with them
  ctx.save(); ctx.translate(x, y + Math.sin(now() / 220) * s * .05);
  var w = s, hgt = s * (kind === 'queen' ? .8 : .62);
  ctx.fillStyle = '#ffcc2e'; ctx.strokeStyle = '#8a5a00'; ctx.lineWidth = Math.max(1.2, s * .07);
  ctx.beginPath(); ctx.moveTo(-w / 2, 0); ctx.lineTo(-w / 2, -hgt);
  var pts = kind === 'queen' ? 5 : 3;
  for (var i = 0; i < pts; i++) { var x0 = -w / 2 + w * i / pts, x1 = x0 + w / pts; ctx.lineTo(x0 + w / pts / 2, -hgt * (kind === 'queen' ? .55 : .45)); ctx.lineTo(x1, -hgt); }
  ctx.lineTo(w / 2, 0); ctx.closePath(); ctx.fill(); ctx.stroke();
  ctx.fillStyle = kind === 'queen' ? '#5ad1ff' : '#e8322a'; ctx.beginPath(); ctx.arc(0, -hgt * .3, s * .1, 0, 7); ctx.fill();
  ctx.fillStyle = 'rgba(255,255,255,.6)'; ctx.fillRect(-w / 2 + s * .08, -s * .14, w - s * .16, s * .06);
  ctx.restore();
}
// ---------- shots and effects ----------
var SHOT = { rock: ['#8a7a6a', 6], pebble: ['#c9b38f', 3.5], egg: ['#fff6e0', 7], water: ['#6fd0ff', 5], chili: ['#ff3d1f', 5], cracker: ['#e8322a', 4], magic: ['#b46bff', 5], feather: ['#ffffff', 4] };
function drawShot(s) {
  var p = toScreen(s.x, s.y, s.z), g = toScreen(s.x, s.y), st = SHOT[s.kind] || SHOT.pebble, r = st[1] * cam.s / 40;
  ctx.fillStyle = 'rgba(0,0,0,.18)'; ctx.beginPath(); ctx.ellipse(g.x, g.y, r, r * .5, 0, 0, 7); ctx.fill();
  ctx.fillStyle = st[0]; ctx.strokeStyle = 'rgba(60,40,20,.6)'; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.arc(p.x, p.y, r, 0, 7); ctx.fill(); ctx.stroke();
  if (s.kind === 'cracker') { ctx.fillStyle = '#ffd23f'; ctx.fillRect(p.x - r * .5, p.y - r * 1.6, r, r * .6); ctx.fillStyle = 'rgba(255,220,120,' + (.5 + Math.random() * .5) + ')'; ctx.beginPath(); ctx.arc(p.x, p.y - r * 2, r * .5, 0, 7); ctx.fill(); }   // lit fuse
  if (s.kind === 'feather') { var ang = Math.atan2((s.ty - s.fy) * ISO, s.tx - s.fx); ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(ang); ctx.fillStyle = '#fff'; ctx.strokeStyle = '#9fb3c8'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.ellipse(0, 0, r * 2.4, r * .7, 0, 0, 7); ctx.fill(); ctx.stroke(); ctx.beginPath(); ctx.moveTo(-r * 2.4, 0); ctx.lineTo(r * 2.4, 0); ctx.stroke(); ctx.restore(); }
  if (s.kind === 'water') { ctx.fillStyle = 'rgba(160,230,255,.5)'; ctx.beginPath(); ctx.arc(p.x - r * .3, p.y - r * .3, r * .45, 0, 7); ctx.fill(); }
}
function drawFx(f, dt) {
  f.life -= dt; var q = 1 - f.life / f.max; if (f.life <= 0) return false; var s = cam.s / 40;
  if (f.t === 'chip') { f.vz -= 9 * dt; f.x += f.vx * dt; f.y += f.vy * dt; f.z = Math.max(0, f.z + f.vz * dt); if (f.z === 0 && f.vz < 0) { f.vz *= -.45; f.vx *= .6; f.vy *= .6; }
    var p = toScreen(f.x, f.y, f.z); ctx.fillStyle = f.color; ctx.globalAlpha = Math.min(1, f.life * 3); ctx.fillRect(p.x - 2.5 * s, p.y - 2.5 * s, 5 * s, 4 * s); ctx.globalAlpha = 1; return true; }
  var c = toScreen(f.x, f.y);
  if (f.t === 'boom') { if (!f.done) { f.done = 1; var sz = f.size || 2; emitSmoke(f.x, f.y, .2, 'dust', .6 + sz * .35, 10 + sz * 3); emitSmoke(f.x, f.y, .4, 'dark', .5 + sz * .3, 4); } return false; }
  if (f.t === 'puff') { if (!f.done) { f.done = 1; emitSmoke(f.x, f.y, .1, 'dust', .55, f.small ? 2 : 5); } return false; }
  if (f.t === 'hit') { ctx.strokeStyle = f.kind === 'smash' ? 'rgba(255,240,150,' + (1 - q) + ')' : 'rgba(255,255,255,' + (1 - q) + ')'; ctx.lineWidth = 3 * s;
    ctx.beginPath(); for (var j = 0; j < 5; j++) { var b = j * 1.26 + q; ctx.moveTo(c.x + Math.cos(b) * 6 * s, c.y - 14 * s + Math.sin(b) * 4 * s); ctx.lineTo(c.x + Math.cos(b) * (10 + q * 14) * s, c.y - 14 * s + Math.sin(b) * (6 + q * 9) * s); } ctx.stroke(); return true; }
  if (f.t === 'splat') { ctx.fillStyle = f.kind === 'egg' ? 'rgba(255,214,80,' + (.7 * (1 - q)) + ')' : f.kind === 'chili' ? 'rgba(255,90,30,' + (.7 * (1 - q)) + ')' : 'rgba(130,210,255,' + (.6 * (1 - q)) + ')';
    ctx.beginPath(); ctx.ellipse(c.x, c.y, (f.size || 1) * cam.s * .7 * (.5 + q), (f.size || 1) * cam.s * .35 * (.5 + q), 0, 0, 7); ctx.fill(); return true; }
  if (f.t === 'heal') { ctx.fillStyle = 'rgba(110,230,120,' + (1 - q) + ')'; ctx.font = 'bold ' + (16 * s | 0) + 'px sans-serif'; ctx.textAlign = 'center'; ctx.fillText('+', c.x, c.y - 30 * s - q * 20 * s); return true; }
  return true;
}
