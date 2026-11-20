// Duck War — raids on cat bases: base generator, troop AI (targets, paths around buildings, breaking walls),
// turret aiming and shots, cat guards, stars and loot. Pure simulation: rendering lives in 05-render.js.
var R = null;   // the running raid
function rng(seed) { var s = seed >>> 0 || 1; return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }; }
function catBase(n) {
  var r = rng(n * 7919 + 13), hq = Math.min(10, 1 + Math.floor((n + 1) / 2)), list = [], id = 1;
  function lv(base) { return clamp(Math.round(base + (r() - .5) * 2), 1, MAX_LV); }
  function free(k, x, y) { var s = B[k].size; if (x < 2 || y < 2 || x + s > MAP - 2 || y + s > MAP - 2) return false; return !list.some(function (b) { var t = B[b.k].size; return x < b.x + t + (b.k === 'wall' || k === 'wall' ? 0 : 0) && b.x < x + s && y < b.y + t && b.y < y + s; }); }
  function put(k, x, y, l) { if (!free(k, x, y)) return false; list.push({ id: id++, k: k, x: x, y: y, lv: l || lv(hq) }); return true; }
  function scatter(k, l, rad) { for (var i = 0; i < 60; i++) { var a = r() * 6.28, d = rad[0] + r() * (rad[1] - rad[0]); if (put(k, Math.round(11 + Math.cos(a) * d), Math.round(11 + Math.sin(a) * d), l)) return; } }
  put('hq', 11, 11, hq);
  var def = ['slingshot', 'slingshot', 'boxtower', 'slingshot', 'mortar', 'boxtower', 'watergun', 'chili', 'mortar', 'boxtower', 'slingshot'];
  var nDef = Math.min(def.length, 1 + Math.floor(n * .8));
  for (var i = 0; i < nDef; i++) scatter(def[i], lv(hq - 1), [3, 5.5]);
  ['honeyjar', 'veggiejar'].forEach(function (k) { for (var j = 0; j < Math.min(3, 1 + Math.floor(n / 3)); j++) scatter(k, lv(hq - 1), [2.5, 5]); });
  if (hq >= 5) scatter('syrupjar', lv(hq - 2), [2, 4]);
  // wall ring around the core
  if (n >= 2) { var ring = n >= 6 ? 6 : 5, wl = clamp(Math.floor(n / 3) + 1, 1, MAX_LV);
    for (var t = -ring; t <= ring; t++) [[11 + t, 11 - ring], [11 + t, 11 + ring + 1], [11 - ring, 11 + t], [11 + ring + 1, 11 + t]].forEach(function (p) { put('wall', p[0] + 1, p[1], wl); }); }
  ['honeypump', 'veggieblender', 'honeypump', 'veggieblender', 'camp', 'barracks'].forEach(function (k, j) { if (j < 2 + Math.floor(n / 2)) scatter(k, lv(hq - 1), [7, 10]); });
  var loot = { honey: 2500 + n * 1800, veggie: 2500 + n * 1800, syrup: n >= 8 ? n * 40 : 0 };
  var cats = n >= 3 ? [n >= 10 ? 'cat_king' : n >= 6 ? 'cat_pan' : 'cat_spatula'] : [];
  if (n >= 5) cats.push('cat_spatula');
  return { level: n, buildings: list, loot: loot, cats: cats };
}

function startRaid(n) {
  var base = catBase(n);
  R = { level: n, buildings: base.buildings.map(function (b) { var hp = bHp(b.k, b.lv); return Object.assign({}, b, { hp: hp, max: hp, cool: 0, aim: Math.PI * .75, dead: false }); }),
        troops: [], shots: [], fx: [], time: 180, deployed: 0, over: false, result: null, taken: { honey: 0, veggie: 0, syrup: 0 }, army: Object.assign({}, D.army), pick: null };
  var share = { honey: 0, veggie: 0, syrup: 0 }, holders = R.buildings.filter(function (b) { var d = B[b.k]; return d.kind === 'store' || d.kind === 'make' || d.kind === 'hq'; });
  holders.forEach(function (b) { var d = B[b.k]; b.loot = {};
    ['honey', 'veggie', 'syrup'].forEach(function (r) { var w = d.kind === 'hq' ? .15 : d.store === r ? 1 : d.make === r ? .25 : 0; share[r] += w; b.loot[r] = w; }); });
  holders.forEach(function (b) { ['honey', 'veggie', 'syrup'].forEach(function (r) { b.loot[r] = share[r] ? Math.round(base.loot[r] * b.loot[r] / share[r]) : 0; }); });
  R.lootTotal = base.loot;
  var hq = R.buildings.find(function (b) { return b.k === 'hq'; });
  base.cats.forEach(function (k, i) { var c = CATS[k]; R.troops.push({ side: 'cat', kind: k, x: hq.x + 1.5 + Math.cos(i * 2) * 2.5, y: hq.y + 1.5 + Math.sin(i * 2) * 2.5, hp: c.hp, max: c.hp, cool: 0, home: { x: hq.x + 1.5, y: hq.y + 1.5 }, dir: 2 }); });
  R.pick = Object.keys(R.army).find(function (k) { return R.army[k] > 0; }) || null;
}

function rectDist(px, py, b) { var s = B[b.k].size, dx = Math.max(b.x - px, 0, px - (b.x + s)), dy = Math.max(b.y - py, 0, py - (b.y + s)); return Math.hypot(dx, dy); }
function center(b) { var s = B[b.k].size / 2; return { x: b.x + s, y: b.y + s }; }
function alive(list) { return list.filter(function (o) { return !o.dead; }); }
function canDeploy(x, y) {
  if (x < 0.3 || y < 0.3 || x > MAP - .3 || y > MAP - .3) return false;
  return !R.buildings.some(function (b) { return !b.dead && rectDist(x, y, b) < 1; });   // red zone: one tile around every building
}
function deploy(x, y) {
  var k = R.pick; if (!k || !(R.army[k] > 0) || R.over) return false;
  if (!canDeploy(x, y)) { R.redFlash = now(); toast('วางในเขตสีแดงไม่ได้'); return false; }
  var u = U[k]; R.army[k]--; R.deployed++; R.started = true;
  R.troops.push({ side: 'duck', kind: k, x: x, y: y, hp: uHp(k), max: uHp(k), cool: 0.2, dir: 2, born: now() });
  R.fx.push({ t: 'puff', x: x, y: y, life: .5, max: .5 });
  if (!(R.army[k] > 0)) R.pick = Object.keys(R.army).find(function (q) { return R.army[q] > 0; }) || null;
  buzz('light'); return true;
}

// ---------- path finding: Dijkstra on tiles; buildings block, walls are passable but cost a lot (troops break them) ----------
function grid() {
  var g = new Int16Array(MAP * MAP); R.buildings.forEach(function (b, i) { if (b.dead) return; var s = B[b.k].size; for (var x = b.x; x < b.x + s; x++) for (var y = b.y; y < b.y + s; y++) if (x >= 0 && y >= 0 && x < MAP && y < MAP) g[y * MAP + x] = i + 1; });
  return g;
}
function findPath(t, target, range) {
  var g = grid(), sx = clamp(Math.floor(t.x), 0, MAP - 1), sy = clamp(Math.floor(t.y), 0, MAP - 1), N = MAP * MAP;
  var cost = new Float32Array(N).fill(1e9), prev = new Int32Array(N).fill(-1), done = new Uint8Array(N), open = [sy * MAP + sx]; cost[open[0]] = 0;
  var goal = -1;
  while (open.length) {
    var bi = 0; for (var i = 1; i < open.length; i++) if (cost[open[i]] < cost[open[bi]]) bi = i;
    var c = open.splice(bi, 1)[0]; if (done[c]) continue; done[c] = 1;
    var cx = c % MAP, cy = (c / MAP) | 0;
    if (rectDist(cx + .5, cy + .5, target) <= range + .45) { goal = c; break; }
    for (var d = 0; d < 8; d++) {
      var nx = cx + [1, -1, 0, 0, 1, 1, -1, -1][d], ny = cy + [0, 0, 1, -1, 1, -1, 1, -1][d]; if (nx < 0 || ny < 0 || nx >= MAP || ny >= MAP) continue;
      var n = ny * MAP + nx, occ = g[n], step = d < 4 ? 1 : 1.414;
      if (occ) { var ob = R.buildings[occ - 1]; if (ob === target) continue; if (ob.k !== 'wall') continue; step += 6 + ob.hp / 60; }
      if (d >= 4 && (g[cy * MAP + nx] && R.buildings[g[cy * MAP + nx] - 1].k !== 'wall' || g[ny * MAP + cx] && R.buildings[g[ny * MAP + cx] - 1].k !== 'wall')) continue;
      if (cost[c] + step < cost[n]) { cost[n] = cost[c] + step; prev[n] = c; open.push(n); }
    }
  }
  if (goal < 0) return null;
  var path = []; for (var p = goal; p >= 0 && p !== sy * MAP + sx; p = prev[p]) path.unshift({ x: p % MAP + .5, y: (p / MAP | 0) + .5, wall: g[p] ? R.buildings[g[p] - 1] : null });
  return path;
}

function chooseTarget(t) {
  var u = U[t.kind], list = R.buildings.filter(function (b) { return !b.dead && b.k !== 'wall'; }), want = list;
  if (u.pref === 'defense') { var d = list.filter(function (b) { return B[b.k].kind === 'defense'; }); if (d.length) want = d; }
  if (u.pref === 'resource') { var r = list.filter(function (b) { return /store|make/.test(B[b.k].kind); }); if (r.length) want = r; }
  if (u.pref === 'wall') { var w = R.buildings.filter(function (b) { return !b.dead && b.k === 'wall'; }); if (w.length) want = w; }
  var best = null, bd = 1e9; want.forEach(function (b) { var dd = rectDist(t.x, t.y, b); if (dd < bd) { bd = dd; best = b; } });
  return best;
}
function damage(target, amount, from) {
  if (target.dead) return;
  if (from && U[from.kind] && U[from.kind].wallBonus && target.k === 'wall') amount *= U[from.kind].wallBonus;
  target.hp -= amount; target.hitAt = now();
  if (target.k) { // building: loot and debris
    if (target.loot) ['honey', 'veggie', 'syrup'].forEach(function (r) { var v = target.loot[r] || 0, give = Math.min(v, v * amount / target.max * 1.0001); target.loot[r] -= give; R.taken[r] += give; });
    var c = center(target); for (var i = 0; i < 3; i++) R.fx.push({ t: 'chip', x: c.x + (Math.random() - .5), y: c.y + (Math.random() - .5), z: .6, vx: (Math.random() - .5) * 3, vy: (Math.random() - .5) * 3, vz: 2 + Math.random() * 2, life: .9, max: .9, color: B[target.k].kind === 'wall' ? '#b98552' : ['#c58a52', '#f2e7c9', '#9b6b3a'][i % 3] });
  }
  if (target.hp <= 0) {
    target.hp = 0; target.dead = true; target.deadAt = now();
    if (target.k) { var c2 = center(target); R.fx.push({ t: 'boom', x: c2.x, y: c2.y, life: .9, max: .9, size: B[target.k].size }); buzz(target.k === 'hq' ? 'heavy' : 'medium');
      if (target.loot) ['honey', 'veggie', 'syrup'].forEach(function (r) { R.taken[r] += target.loot[r] || 0; target.loot[r] = 0; }); }
    else R.fx.push({ t: 'puff', x: target.x, y: target.y, life: 1.2, max: 1.2 });
  }
}
function shoot(from, to, kind, dmg, splash, speed, sx, sy, sz) {
  var tx = to.k ? center(to).x : to.x, ty = to.k ? center(to).y : to.y, d = Math.hypot(tx - sx, ty - sy);
  R.shots.push({ kind: kind, x: sx, y: sy, z: sz || .8, fx: sx, fy: sy, fz: sz || .8, tx: tx, ty: ty, t: 0, dur: Math.max(.15, d / speed), target: to, dmg: dmg, splash: splash || 0, from: from, arc: kind === 'egg' ? 3 : kind === 'rock' ? .8 : .3 });
}
function troopTick(t, dt) {
  if (t.dead) return;
  t.cool -= dt; t.moving = false;
  if (t.pend && (t.pend.left -= dt) <= 0) { var pd = t.pend; t.pend = null; damage(pd.target, pd.dmg, t); var pc = pd.target.k ? center(pd.target) : pd.target; R.fx.push({ t: 'hit', x: (pc.x + t.x) / 2, y: (pc.y + t.y) / 2, life: .3, max: .3, kind: pd.kind }); }
  if (t.side === 'cat') return catTick(t, dt);
  var u = U[t.kind];
  if (u.pref === 'heal') { // nurse: follow and heal the most hurt duck nearby
    var hurt = alive(R.troops).filter(function (o) { return o.side === 'duck' && o !== t && o.hp < o.max; }).sort(function (a, b) { return a.hp / a.max - b.hp / b.max; })[0];
    var follow = hurt || alive(R.troops).filter(function (o) { return o.side === 'duck' && o !== t; })[0];
    if (!follow) return; var dd = Math.hypot(follow.x - t.x, follow.y - t.y);
    if (dd > u.range * .8) return step(t, follow.x, follow.y, u.speed, dt);
    if (hurt && t.cool <= 0) { t.cool = u.rate; t.atk = now(); alive(R.troops).forEach(function (o) { if (o.side === 'duck' && Math.hypot(o.x - hurt.x, o.y - hurt.y) < 1.5) o.hp = Math.min(o.max, o.hp + u.heal); }); R.fx.push({ t: 'heal', x: hurt.x, y: hurt.y, life: .6, max: .6 }); }
    return;
  }
  // fight back against a cat guard close by
  var cat = alive(R.troops).filter(function (o) { return o.side === 'cat' && Math.hypot(o.x - t.x, o.y - t.y) < Math.max(1.4, u.range + .6); })[0];
  if (cat) { var cd = Math.hypot(cat.x - t.x, cat.y - t.y); t.face = Math.atan2(cat.y - t.y, cat.x - t.x);
    if (cd > u.range + .45) return step(t, cat.x, cat.y, u.speed, dt); return attack(t, cat, u); }
  if (!t.target || t.target.dead) { t.target = chooseTarget(t); t.path = t.target ? findPath(t, t.target, u.range) : null; t.wall = null; }
  if (!t.target) return;
  if (t.wall && !t.wall.dead) { t.face = Math.atan2(center(t.wall).y - t.y, center(t.wall).x - t.x); return attack(t, t.wall, u); }
  if (t.wall && t.wall.dead) { t.wall = null; t.path = findPath(t, t.target, u.range); }
  if (rectDist(t.x, t.y, t.target) <= u.range + .12) { var c = center(t.target); t.face = Math.atan2(c.y - t.y, c.x - t.x); return attack(t, t.target, u); }
  if (!t.path || !t.path.length) { t.path = findPath(t, t.target, u.range); if (!t.path) { t.target = null; return; } }
  var wp = t.path[0];
  if (!wp) { // already in the goal cell: walk the last bit straight to the nearest edge of the building
    var s0 = B[t.target.k].size; return step(t, clamp(t.x, t.target.x, t.target.x + s0), clamp(t.y, t.target.y, t.target.y + s0), u.speed, dt); }
  if (wp.wall && !wp.wall.dead && Math.hypot(wp.x - t.x, wp.y - t.y) < 1.2) { t.wall = wp.wall; return; }
  // waypoints are tile centres shared by the whole squad: count one as reached when close, or when the next one is nearer,
  // otherwise ducks pushing each other around the same point never get there and just shuffle on the spot
  var wd = Math.hypot(wp.x - t.x, wp.y - t.y), nx = t.path[1];
  if (wd < .35 || (nx && Math.hypot(nx.x - t.x, nx.y - t.y) < Math.hypot(nx.x - wp.x, nx.y - wp.y))) { t.path.shift(); t.stuck = 0; return; }
  if (t.lastWd !== undefined && wd > t.lastWd - u.speed * dt * .25) t.stuck = (t.stuck || 0) + dt; else t.stuck = 0;
  t.lastWd = wd;
  if (t.stuck > 1.2) { t.path.shift(); t.stuck = 0; t.lastWd = undefined; return; }
  step(t, wp.x, wp.y, u.speed, dt);
}
function step(t, x, y, speed, dt) {
  var dx = x - t.x, dy = y - t.y, d = Math.hypot(dx, dy); if (d < 1e-3) return;
  var m = Math.min(d, speed * dt); t.x += dx / d * m; t.y += dy / d * m; t.moving = true; t.face = Math.atan2(dy, dx); t.walk = (t.walk || 0) + m;
}
function attack(t, target, u) {
  if (t.cool > 0) return; t.cool = u.rate; t.atk = now();
  var dmg = t.side === 'cat' ? u.dmg : uDmg(t.kind);
  if (u.hit === 'shot' || u.hit === 'fire') { shoot(t, target, u.hit === 'fire' ? 'chili' : 'pebble', dmg, u.splash, 9, t.x, t.y, .7); return; }
  t.pend = { target: target, dmg: dmg, left: .23, kind: u.hit };   // the blow lands when the swing does
}
function catTick(t, dt) {
  var c = CATS[t.kind], foe = null, fd = 4.5;
  alive(R.troops).forEach(function (o) { if (o.side === 'duck') { var d = Math.hypot(o.x - t.x, o.y - t.y); if (d < fd) { fd = d; foe = o; } } });
  if (foe) { t.face = Math.atan2(foe.y - t.y, foe.x - t.x); if (fd > c.range + .45) return step(t, foe.x, foe.y, c.speed, dt); return attack(t, foe, c); }
  if (!t.stroll || Math.hypot(t.stroll.x - t.x, t.stroll.y - t.y) < .1) t.stroll = { x: t.home.x + (Math.random() - .5) * 5, y: t.home.y + (Math.random() - .5) * 5 };
  step(t, t.stroll.x, t.stroll.y, c.speed * .35, dt);
}
function turretTick(b, dt) {
  var d = B[b.k]; if (d.kind !== 'defense' || b.dead) return; b.cool -= dt;
  var c = center(b), lv = b.lv, range = d.range, target = null, best = 1e9;
  alive(R.troops).forEach(function (o) { if (o.side !== 'duck') return; var air = !!U[o.kind].air; if (air ? !d.air : !d.ground) return;
    var dd = Math.hypot(o.x - c.x, o.y - c.y); if (dd <= range && dd >= (d.minRange || 0) && dd < best) { best = dd; target = o; } });
  if (!target) return;
  var want = Math.atan2(target.y - c.y, target.x - c.x), diff = Math.atan2(Math.sin(want - b.aim), Math.cos(want - b.aim));
  b.aim += clamp(diff, -6 * dt, 6 * dt);
  if (b.cool <= 0 && Math.abs(diff) < .35) {
    b.cool = d.rate; b.fire = now();
    shoot(b, target, d.shot, grow(d.dmg, lv, 1.17), d.splash, d.shot === 'egg' ? 6 : 12, c.x + Math.cos(b.aim) * .6, c.y + Math.sin(b.aim) * .6, 1.2);
  }
}
function shotTick(s, dt) {
  s.t += dt; var k = Math.min(1, s.t / s.dur);
  if (s.target && !s.target.dead && !s.target.k) { s.tx = s.target.x; s.ty = s.target.y; }
  s.x = s.fx + (s.tx - s.fx) * k; s.y = s.fy + (s.ty - s.fy) * k; s.z = s.fz * (1 - k) + Math.sin(k * Math.PI) * s.arc;
  if (k < 1) return false;
  if (s.splash) { R.troops.concat(R.buildings).forEach(function (o) { if (o.dead) return; var ox = o.k ? center(o).x : o.x, oy = o.k ? center(o).y : o.y;
      if ((s.from.k ? !o.k && o.side === 'duck' : o.k) && Math.hypot(ox - s.tx, oy - s.ty) <= s.splash) damage(o, s.dmg, s.from); });
    R.fx.push({ t: 'splat', x: s.tx, y: s.ty, life: .5, max: .5, kind: s.kind, size: s.splash }); }
  else if (s.target) { damage(s.target, s.dmg, s.from); R.fx.push({ t: 'hit', x: s.tx, y: s.ty, life: .25, max: .25, kind: s.kind }); }
  return true;
}
function destruction() {
  var all = R.buildings.filter(function (b) { return b.k !== 'wall'; }), dead = all.filter(function (b) { return b.dead; }).length;
  return all.length ? dead / all.length : 0;
}
function raidTick(dt) {
  if (!R || R.over) return;
  if (R.started) R.time -= dt;
  R.troops.forEach(function (t) { troopTick(t, dt); });
  R.buildings.forEach(function (b) { turretTick(b, dt); });
  R.shots = R.shots.filter(function (s) { return !shotTick(s, dt); });
  // soft separation so ducks don't stack on one spot
  var live = alive(R.troops); for (var i = 0; i < live.length; i++) for (var j = i + 1; j < live.length; j++) { var a = live[i], b = live[j], dx = b.x - a.x, dy = b.y - a.y, d = Math.hypot(dx, dy), r0 = ((U[a.kind] || CATS[a.kind] || {}).space >= 5 ? .35 : .2) + ((U[b.kind] || CATS[b.kind] || {}).space >= 5 ? .35 : .2); if (d > 0 && d < r0) { var p = (r0 - d) / 4 / d; a.x -= dx * p; a.y -= dy * p; b.x += dx * p; b.y += dy * p; } }
  var pct = destruction(), hqDead = R.buildings.some(function (b) { return b.k === 'hq' && b.dead; });
  R.stars = (pct >= .5 ? 1 : 0) + (hqDead ? 1 : 0) + (pct >= 1 ? 1 : 0); R.pct = pct;
  var ducksLeft = alive(R.troops).some(function (t) { return t.side === 'duck'; }) || Object.keys(R.army).some(function (k) { return R.army[k] > 0; });
  if (pct >= 1 || R.time <= 0 || (R.started && !ducksLeft)) endRaid();
}
function endRaid() {
  if (R.over) return; R.over = true;
  var got = {}; ['honey', 'veggie', 'syrup'].forEach(function (r) { got[r] = Math.floor(R.taken[r]); D.res[r] = Math.min(capacity(r), D.res[r] + got[r]); });
  // troops that were deployed are used up (Clash style); the rest go home
  D.army = {}; Object.keys(R.army).forEach(function (k) { if (R.army[k] > 0) D.army[k] = R.army[k]; });
  var coins = R.stars * (1 + Math.floor(R.level / 3)); D.res.coin += coins;
  if (R.stars > 0 && R.level >= D.raid) D.raid = R.level + 1;
  D.stars = (D.stars || 0) + R.stars;
  R.result = { stars: R.stars, pct: R.pct, got: got, coins: coins }; writeSave();
  setTimeout(showResult, 900);
}
