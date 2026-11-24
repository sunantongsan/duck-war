// Duck War — raids on cat bases: base generator, troop AI (targets, paths around buildings, breaking walls),
// turret aiming and shots, cat guards, stars and loot. Pure simulation: rendering lives in 05-render.js.
var R = null;   // the running raid
function rng(seed) { var s = seed >>> 0 || 1; return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }; }
function catBase(n) {
  var C = MAP / 2 - 1, r = rng(n * 7919 + 13), hq = Math.min(10, 1 + Math.floor((n + 1) / 2)), list = [], id = 1;
  function lv(base) { return clamp(Math.round(base + (r() - .5) * 2), 1, MAX_LV); }
  function free(k, x, y) { var s = B[k].size; if (x < 2 || y < 2 || x + s > MAP - 2 || y + s > MAP - 2) return false; return !list.some(function (b) { var t = B[b.k].size; return x < b.x + t + (b.k === 'wall' || k === 'wall' ? 0 : 0) && b.x < x + s && y < b.y + t && b.y < y + s; }); }
  function put(k, x, y, l) { if (!free(k, x, y)) return false; list.push({ id: id++, k: k, x: x, y: y, lv: l || lv(hq) }); return true; }
  function scatter(k, l, rad) { for (var i = 0; i < 60; i++) { var a = r() * 6.28, d = rad[0] + r() * (rad[1] - rad[0]); if (put(k, Math.round(C + Math.cos(a) * d), Math.round(C + Math.sin(a) * d), l)) return; } }
  put('hq', C, C, hq);
  var def = ['slingshot', 'slingshot', 'boxtower', 'slingshot', 'mortar', 'boxtower', 'watergun', 'chili', 'mortar', 'boxtower', 'slingshot'];
  var nDef = Math.min(def.length, 1 + Math.floor(n * .8));
  for (var i = 0; i < nDef; i++) scatter(def[i], lv(hq - 1), [3, 5.5]);
  ['honeyjar', 'veggiejar'].forEach(function (k) { for (var j = 0; j < Math.min(3, 1 + Math.floor(n / 3)); j++) scatter(k, lv(hq - 1), [2.5, 5]); });
  if (hq >= 5) scatter('syrupjar', lv(hq - 2), [2, 4]);
  // wall ring around the core
  if (n >= 2) { var ring = n >= 6 ? 6 : 5, wl = clamp(Math.floor(n / 3) + 1, 1, MAX_LV);
    for (var t = -ring; t <= ring; t++) [[C + 1 + t, C + 1 - ring], [C + 1 + t, C + 2 + ring], [C + 1 - ring, C + 1 + t], [C + 2 + ring, C + 1 + t], [C + 2 + ring, C + 2 + ring]].forEach(function (p) { put('wall', p[0], p[1], wl); }); }
  ['honeypump', 'veggieblender', 'honeypump', 'veggieblender', 'camp', 'barracks'].forEach(function (k, j) { if (j < 2 + Math.floor(n / 2)) scatter(k, lv(hq - 1), [7, 10]); });
  var loot = { honey: 2500 + n * 1800, veggie: 2500 + n * 1800, syrup: n >= 8 ? n * 40 : 0 };
  var cats = n >= 3 ? [n >= 10 ? 'cat_king' : n >= 6 ? 'cat_pan' : 'cat_spatula'] : [];
  if (n >= 5) cats.push('cat_spatula');
  return { level: n, buildings: list, loot: loot, cats: cats };
}

function startRaid(n) {
  var base = catBase(n);
  R = { level: n, buildings: base.buildings.map(function (b) { var hp = bHp(b.k, b.lv); return Object.assign({}, b, { hp: hp, max: hp, cool: 0, aim: Math.PI * .75, dead: false }); }),
        routeCache: new Map(), groundRevision: 0, troops: [], shots: [], fx: [], time: 180, deployed: 0, over: false, result: null, taken: { honey: 0, veggie: 0, syrup: 0 }, army: Object.assign({}, D.army), pick: null };
  var share = { honey: 0, veggie: 0, syrup: 0 }, holders = R.buildings.filter(function (b) { var d = B[b.k]; return d.kind === 'store' || d.kind === 'make' || d.kind === 'hq'; });
  holders.forEach(function (b) { var d = B[b.k]; b.loot = {};
    ['honey', 'veggie', 'syrup'].forEach(function (r) { var w = d.kind === 'hq' ? .15 : d.store === r ? 1 : d.make === r ? .25 : 0; share[r] += w; b.loot[r] = w; }); });
  holders.forEach(function (b) { ['honey', 'veggie', 'syrup'].forEach(function (r) { b.loot[r] = share[r] ? Math.round(base.loot[r] * b.loot[r] / share[r]) : 0; }); });
  R.lootTotal = base.loot;
  var hq = R.buildings.find(function (b) { return b.k === 'hq'; });
  base.cats.forEach(function (k, i) { var c = CATS[k], sp = freeSpot(hq.x + 1.5, hq.y + 1.5, 2.2 + i * .6, i); R.troops.push({ side: 'cat', kind: k, x: sp.x, y: sp.y, hp: c.hp, max: c.hp, cool: 0, home: { x: hq.x + 1.5, y: hq.y + 1.5 }, dir: 2 }); });
  R.heroes = {}; HERO_KEYS.forEach(function (k) { if (heroOpen(k) && !heroRest(k)) R.heroes[k] = { state: 'ready', lv: hallLv() }; });
  R.pick = nextPick();
}
function nextPick() { return Object.keys(R.army).find(function (q) { return R.army[q] > 0; }) || HERO_KEYS.find(function (q) { return R.heroes[q] && R.heroes[q].state === 'ready'; }) || null; }

function inBuilding(x, y) { return R.buildings.some(function (b) { if (b.dead || b.k === 'wall') return false; var s = B[b.k].size; return x > b.x - .15 && y > b.y - .15 && x < b.x + s + .15 && y < b.y + s + .15; }); }
function freeSpot(cx, cy, r, seed) { // open ground near (cx, cy), so a guard is never hidden inside a building
  for (var ring = 0; ring < 6; ring++) for (var i = 0; i < 16; i++) { var a = (i + seed * 5) / 16 * 6.283, rr = r + ring * .7, x = cx + Math.cos(a) * rr, y = cy + Math.sin(a) * rr;
    if (x > 1 && y > 1 && x < MAP - 1 && y < MAP - 1 && !inBuilding(x, y)) return { x: x, y: y }; }
  return { x: cx + r, y: cy };
}
function rectDist(px, py, b) { var s = B[b.k].size, dx = Math.max(b.x - px, 0, px - (b.x + s)), dy = Math.max(b.y - py, 0, py - (b.y + s)); return Math.hypot(dx, dy); }
function center(b) { var s = B[b.k].size / 2; return { x: b.x + s, y: b.y + s }; }
function alive(list) { return list.filter(function (o) { return !o.dead; }); }
// Ducks land only outside the walls: tiles fenced in by walls are off limits, and so is one tile round every building.
function enclosed() {
  if (R.enc) return R.enc;   // fixed when the raid starts: a breach doesn't open the inside for landing
  var wall = new Uint8Array(MAP * MAP), seen = new Uint8Array(MAP * MAP), q = [], n = 0;
  R.buildings.forEach(function (b) { if (b.k === 'wall' && !b.dead && b.x >= 0 && b.y >= 0 && b.x < MAP && b.y < MAP) { wall[b.y * MAP + b.x] = 1; n++; } });
  for (var i = 0; i < MAP; i++) [i, (MAP - 1) * MAP + i, i * MAP, i * MAP + MAP - 1].forEach(function (c) { if (!wall[c] && !seen[c]) { seen[c] = 1; q.push(c); } });
  while (q.length) { var c = q.pop(), x = c % MAP, y = (c / MAP) | 0;
    [[1, 0], [-1, 0], [0, 1], [0, -1]].forEach(function (d) { var nx = x + d[0], ny = y + d[1]; if (nx < 0 || ny < 0 || nx >= MAP || ny >= MAP) return; var k = ny * MAP + nx; if (!wall[k] && !seen[k]) { seen[k] = 1; q.push(k); } }); }
  var enc = new Uint8Array(MAP * MAP); for (var k = 0; k < MAP * MAP; k++) enc[k] = !seen[k] ? 1 : 0;
  R.enc = enc; return enc;
}
function canDeploy(x, y) {
  if (x < 0.3 || y < 0.3 || x > MAP - .3 || y > MAP - .3) return false;
  if (enclosed()[Math.floor(y) * MAP + Math.floor(x)]) return false;
  return !R.buildings.some(function (b) { return !b.dead && b.k !== 'wall' && rectDist(x, y, b) < 1; });
}
function deploy(x, y) {
  var k = R.pick; if (!k || R.over) return false;
  var hero = R.heroes[k]; if (hero ? hero.state !== 'ready' : !(R.army[k] > 0)) return false;
  if (!canDeploy(x, y)) { R.redFlash = now(); sfx('error'); toast('ปล่อยทหารได้แค่นอกกำแพง และห่างอาคาร 1 ช่อง'); return false; }
  var lv = hero ? hero.lv : 1, t = { side: 'duck', kind: k, x: x, y: y, hp: uHp(k, lv), max: uHp(k, lv), lv: lv, cool: 0.2, dir: 2, born: now() };
  if (hero) { hero.state = 'out'; hero.unit = t; } else R.army[k]--;
  R.deployed++; R.started = true; R.troops.push(t);
  if (hero || R.fx.length < 120) R.fx.push({ t: 'puff', x: x, y: y, life: .5, max: .5, small: !hero && R.ducks && R.ducks.length > 60 });
  if (hero) { sfx(k === 'h_colonel' ? 'colonel' : k === 'h_king' ? 'bite' : 'heal'); buzz('medium'); toast((k === 'h_colonel' ? '🎖 ' : '👑 ') + U[k].name + ' ลงสนาม! แตะการ์ดอีกครั้งเพื่อใช้สกิล'); R.pick = nextPick(); return true; }
  if (!(R.army[k] > 0)) R.pick = nextPick();
  sfx('deploy'); buzz('light'); return true;
}
// a hero's one skill per raid
function heroSkill(k) {
  var h = R.heroes[k]; if (!h || h.state !== 'out' || h.used || R.over) return false;
  var t = h.unit; if (!t || t.dead) return false; h.used = true; t.atk = now(); var until = now() + 6000;
  if (k === 'h_colonel') { // whistle: every duck near him charges — faster, harder hits, a bit of health back
    alive(R.troops).forEach(function (o) { if (o.side === 'duck' && Math.hypot(o.x - t.x, o.y - t.y) < 6) { o.fast = until; o.hp = Math.min(o.max, o.hp + o.max * .2); R.fx.push({ t: 'heal', x: o.x, y: o.y, life: .6, max: .6 }); } });
    sfx('colonel'); sfx('horn'); toast('🎖 ผู้พันเป็ด: บุกกก! ทุกหน่วยตามข้ามา!');
  } else if (k === 'h_king') { // howl: heals, rages and calls fork ducks to his side
    t.hp = Math.min(t.max, t.hp + t.max * .35); t.fast = until; spawnAround(t, 'fork', 3 + Math.floor(h.lv / 3), 1.1);
    sfx('bite'); toast('👑 ราชาดัลเมเชียน: โฮ่งงง! ทหารเป็ดมาช่วยกัน!');
  } else { // feather veil: unseen by turrets and cats, double damage
    t.invis = now() + 4500; t.fast = until; t.hp = Math.min(t.max, t.hp + t.max * .15); sfx('heal'); toast('👑 ราชินีนกกระยาง: ม่านขนนก!');
  }
  R.fx.push({ t: 'boom', x: t.x, y: t.y, life: .5, max: .5, size: .8 }); buzz('heavy'); return true;
}

// ---------- path finding: Dijkstra on tiles; buildings block, walls are passable but cost a lot (troops break them) ----------
function grid() {
  if (R.occupancy) return R.occupancy;
  var g = new Int16Array(MAP * MAP); R.buildings.forEach(function (b, i) { if (b.dead) return; var s = B[b.k].size; for (var x = b.x; x < b.x + s; x++) for (var y = b.y; y < b.y + s; y++) if (x >= 0 && y >= 0 && x < MAP && y < MAP) g[y * MAP + x] = i + 1; });
  R.occupancy = g; return g;
}
function findPath(t, target, range) {
  var sx = clamp(Math.floor(t.x), 0, MAP - 1), sy = clamp(Math.floor(t.y), 0, MAP - 1);
  var key = (sy * MAP + sx) + ':' + target.id + ':' + range;
  if (!R.routeCache.has(key)) {
    if (R.pathBudget !== undefined && R.pathBudget <= 0) return undefined;   // enough searches this frame: ask again next frame (a big crowd re-routing at once used to freeze the game)
    if (R.pathBudget !== undefined) R.pathBudget--;
    if (R.routeCache.size >= 512) R.routeCache.clear();
    R.routeCache.set(key, searchPath(sx, sy, target, range));
  }
  var route = R.routeCache.get(key);
  return route && route.slice(); // troops advance independently through shared waypoints
}
var NDX = [1, -1, 0, 0, 1, 1, -1, -1], NDY = [0, 0, 1, -1, 1, -1, 1, -1], PATHBUF = null;
function wallBand(b) { return Math.ceil(b.hp / b.max * 4); }   // walls cost less to cross as they crumble, in 4 steps
function searchPath(sx, sy, target, range) {
  var g = grid(), N = MAP * MAP;
  if (!PATHBUF || PATHBUF.n !== N) PATHBUF = { n: N, cost: new Float32Array(N), prev: new Int32Array(N), done: new Uint8Array(N) };
  var cost = PATHBUF.cost.fill(1e9), prev = PATHBUF.prev.fill(-1), done = PATHBUF.done.fill(0), hk = [], hn = [];   // binary heap of (cost, cell)
  function push(n, k) { hk.push(k); hn.push(n); var i = hk.length - 1; while (i) { var p = (i - 1) >> 1; if (hk[p] <= k) break; hk[i] = hk[p]; hn[i] = hn[p]; i = p; } hk[i] = k; hn[i] = n; }
  function pop() { var top = hn[0], lk = hk.pop(), ln = hn.pop(), L = hk.length; if (L) { var i = 0; for (;;) { var l = 2 * i + 1, r = l + 1, m = i, mk = lk;
      if (l < L && hk[l] < mk) { m = l; mk = hk[l]; } if (r < L && hk[r] < mk) m = r; if (m === i) break; hk[i] = hk[m]; hn[i] = hn[m]; i = m; } hk[i] = lk; hn[i] = ln; } return top; }
  var start = sy * MAP + sx; cost[start] = 0; push(start, 0);
  var goal = -1;
  while (hk.length) {
    var c = pop(); if (done[c]) continue; done[c] = 1;
    var cx = c % MAP, cy = (c / MAP) | 0;
    if (rectDist(cx + .5, cy + .5, target) <= range + .45) { goal = c; break; }
    for (var d = 0; d < 8; d++) {
      var nx = cx + NDX[d], ny = cy + NDY[d]; if (nx < 0 || ny < 0 || nx >= MAP || ny >= MAP) continue;
      var n = ny * MAP + nx, occ = g[n], step = d < 4 ? 1 : 1.414;
      if (occ) { var ob = R.buildings[occ - 1]; if (ob === target) continue; if (ob.k !== 'wall') continue; step += 6 + ob.max * wallBand(ob) / 4 / 60; }
      if (d >= 4 && (g[cy * MAP + nx] && R.buildings[g[cy * MAP + nx] - 1].k !== 'wall' || g[ny * MAP + cx] && R.buildings[g[ny * MAP + cx] - 1].k !== 'wall')) continue;
      if (cost[c] + step < cost[n]) { cost[n] = cost[c] + step; prev[n] = c; push(n, cost[n]); }
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
  if (u.pref === 'airdef') { var aa = list.filter(function (b) { return B[b.k].kind === 'defense' && B[b.k].air; }); if (!aa.length) aa = list.filter(function (b) { return B[b.k].kind === 'defense'; }); if (aa.length) want = aa; }
  if (u.pref === 'wall') { var w = R.buildings.filter(function (b) { return !b.dead && b.k === 'wall'; }); if (w.length) want = w; }
  var best = null, bd = 1e9; want.forEach(function (b) { var dd = rectDist(t.x, t.y, b); if (dd < bd) { bd = dd; best = b; } });
  return best;
}
function damage(target, amount, from) {
  if (target.dead) return;
  if (from && U[from.kind] && U[from.kind].wallBonus && target.k === 'wall') amount *= U[from.kind].wallBonus;
  if (from && U[from.kind] && U[from.kind].resBonus && target.k && /store|make/.test(B[target.k].kind)) amount *= U[from.kind].resBonus;
  var band = target.k === 'wall' ? wallBand(target) : 0;
  target.hp -= amount; target.hitAt = R.now || now();
  if (target.k === 'wall' && target.hp > 0 && wallBand(target) !== band) R.routeCache.clear(); // a crumbling wall is cheaper to cross
  if (target.k) { // building: loot and debris
    if (target.loot) ['honey', 'veggie', 'syrup'].forEach(function (r) { var v = target.loot[r] || 0, give = Math.min(v, v * amount / target.max * 1.0001); target.loot[r] -= give; R.taken[r] += give; });
    var c = center(target), nChip = R.fx.length < 90 ? 3 : R.fx.length < 180 ? 1 : 0; for (var i = 0; i < nChip; i++) R.fx.push({ t: 'chip', x: c.x + (Math.random() - .5), y: c.y + (Math.random() - .5), z: .6, vx: (Math.random() - .5) * 3, vy: (Math.random() - .5) * 3, vz: 2 + Math.random() * 2, life: .9, max: .9, color: B[target.k].kind === 'wall' ? '#b98552' : ['#c58a52', '#f2e7c9', '#9b6b3a'][i % 3] });
  }
  if (target.hp <= 0) {
    target.hp = 0; target.dead = true; target.deadAt = now();
    if (target.k) {
      R.occupancy = null; R.routeCache.clear(); R.groundRevision++;
      sfx(target.k === 'wall' ? 'wall' : 'crash'); var c2 = center(target); R.fx.push({ t: 'boom', x: c2.x, y: c2.y, life: .9, max: .9, size: B[target.k].size }); buzz(target.k === 'hq' ? 'heavy' : 'medium');
      if (target.loot) ['honey', 'veggie', 'syrup'].forEach(function (r) { R.taken[r] += target.loot[r] || 0; target.loot[r] = 0; }); }
    else { if (target.side === 'duck' && U[target.kind].hero) { D.heroRest = D.heroRest || {}; D.heroRest[target.kind] = now() + heroRestMs(target.lv || 1); toast('💫 ' + U[target.kind].name + ' หมดแรง ต้องพักฟื้นก่อนบุกครั้งหน้า'); if (typeof raidBar === 'function') raidBar(); }
      if (target.side === 'duck' && U[target.kind].split) spawnAround(target, U[target.kind].split, 6, 1.0);
      sfx(target.side === 'cat' ? 'meow' : 'duckdie'); R.fx.push({ t: 'puff', x: target.x, y: target.y, life: 1.2, max: 1.2 }); }
  }
}
function shoot(from, to, kind, dmg, splash, speed, sx, sy, sz) {
  var tx = to.k ? center(to).x : to.x, ty = to.k ? center(to).y : to.y, d = Math.hypot(tx - sx, ty - sy);
  var tz = to.k ? 0 : airAlt(to) * .9; sz = (sz || .8) + (from && !from.k ? airAlt(from) * .85 : 0);
  R.shots.push({ kind: kind, x: sx, y: sy, z: sz, fx: sx, fy: sy, fz: sz, tz: tz, tx: tx, ty: ty, t: 0, dur: Math.max(.15, d / speed), target: to, dmg: dmg, splash: splash || 0, from: from, arc: kind === 'egg' ? 3 : kind === 'rock' ? .8 : .3 });
}
function troopTick(t, dt) {
  if (t.dead) return;
  t.cool -= dt; t.moving = false;
  if (t.pend && (t.pend.left -= dt) <= 0) { var pd = t.pend; t.pend = null; sfx(pd.kind === 'bite' ? 'bite' : pd.kind === 'smash' || pd.kind === 'spin' ? 'smash' : 'stab');
    if (pd.kind === 'spin') spinHit(t, pd.dmg); else damage(pd.target, pd.dmg, t); var pc = pd.target.k ? center(pd.target) : pd.target; if (R.fx.length < 160) R.fx.push({ t: 'hit', x: (pc.x + t.x) / 2, y: (pc.y + t.y) / 2, life: .3, max: .3, kind: pd.kind }); }
  if (t.side === 'cat') return catTick(t, dt);
  var u = U[t.kind];
  if (u.pref === 'heal') { // nurse: follow and heal the most hurt duck nearby
    var hurt = null, follow = null, ducks = R.ducks || R.troops;
    for (var hi = 0; hi < ducks.length; hi++) { var ho = ducks[hi]; if (ho === t || ho.dead || ho.side !== 'duck') continue; if (!follow) follow = ho; if (ho.hp < ho.max && (!hurt || ho.hp / ho.max < hurt.hp / hurt.max)) hurt = ho; }
    follow = hurt || follow;
    if (!follow) return; var dd = Math.hypot(follow.x - t.x, follow.y - t.y);
    if (dd > u.range * .8) return step(t, follow.x, follow.y, u.speed, dt);
    if (hurt && t.cool <= 0) { t.cool = u.rate; t.atk = now(); alive(R.troops).forEach(function (o) { if (o.side === 'duck' && Math.hypot(o.x - hurt.x, o.y - hurt.y) < 1.5) o.hp = Math.min(o.max, o.hp + u.heal); }); sfx('heal'); R.fx.push({ t: 'heal', x: hurt.x, y: hurt.y, life: .6, max: .6 }); }
    return;
  }
  if (u.summon) { t.sumT = (t.sumT === undefined ? 1 : t.sumT) - dt;
    if (t.sumT <= 0) { t.sumT = 7; var mine = R.troops.filter(function (o) { return !o.dead && o.owner === t; }).length;
      if (mine < 6) { spawnAround(t, u.summon, Math.min(3, 6 - mine), .8); t.atk = now(); sfx('heal'); } } }
  if (u.burrow) return digTick(t, u, dt);
  if (u.air) return flyTick(t, u, dt);
  // fight back against a cat guard close by
  var cat = null; if (u.hit !== 'blast') { var cr = Math.max(1.4, u.range + .6), cats = R.cats || R.troops;
    for (var ci = 0; ci < cats.length; ci++) { var co = cats[ci]; if (co.side === 'cat' && !co.dead && Math.abs(co.x - t.x) < cr && Math.hypot(co.x - t.x, co.y - t.y) < cr) { cat = co; break; } } }
  if (cat) { var cd = Math.hypot(cat.x - t.x, cat.y - t.y); t.face = Math.atan2(cat.y - t.y, cat.x - t.x);
    if (cd > u.range + .45) return step(t, cat.x, cat.y, u.speed, dt); return attack(t, cat, u); }
  if (!t.target || t.target.dead) { t.target = chooseTarget(t); t.path = t.target ? findPath(t, t.target, u.range) : null; t.wall = null; }
  if (!t.target) return;
  if (t.wall && !t.wall.dead) { t.face = Math.atan2(center(t.wall).y - t.y, center(t.wall).x - t.x); return attack(t, t.wall, u); }
  if (t.wall && t.wall.dead) { t.wall = null; t.path = findPath(t, t.target, u.range); }
  if (rectDist(t.x, t.y, t.target) <= u.range + .12) { var c = center(t.target); t.face = Math.atan2(c.y - t.y, c.x - t.x); return attack(t, t.target, u); }
  if (!t.path || !t.path.length) { var np = findPath(t, t.target, u.range); if (np === undefined) return; t.path = np; if (!np) { t.target = null; return; } }
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
// Flyers: straight over walls and buildings to the target; only anti-air defenses can hit them, cats can't reach
function flyTick(t, u, dt) {
  if (!t.target || t.target.dead) { t.target = chooseTarget(t); if (!t.target) return; }
  if (u.rage) t.rage = !(R.ducks || R.troops).some(function (o) { return o !== t && !o.dead && o.side === 'duck' && U[o.kind].air && Math.hypot(o.x - t.x, o.y - t.y) < 4; });
  var c = center(t.target), d = rectDist(t.x, t.y, t.target);
  if (d > u.range + .12) { var s = B[t.target.k].size; return step(t, u.range < 1 ? c.x : clamp(t.x, t.target.x, t.target.x + s), u.range < 1 ? c.y : clamp(t.y, t.target.y, t.target.y + s), u.speed * (t.rage ? 1.25 : 1), dt); }
  t.face = Math.atan2(c.y - t.y, c.x - t.x); attack(t, t.target, u);
}
// Digger: travels underground in a straight line (walls don't matter, nothing can hit it), pops up at the target.
function digTick(t, u, dt) {
  if (!t.target || t.target.dead) { t.target = chooseTarget(t); if (!t.target) return; }
  var s = B[t.target.k].size, ex = clamp(t.x, t.target.x, t.target.x + s), ey = clamp(t.y, t.target.y, t.target.y + s), d = rectDist(t.x, t.y, t.target);
  if (d > u.range + .12) {
    if (!t.under && d > 1.2) { t.under = true; t.digAt = now(); sfx('dig'); R.fx.push({ t: 'puff', x: t.x, y: t.y, life: .5, max: .5 }); }
    if (t.under) { t.dirtT = (t.dirtT || 0) - dt; if (t.dirtT <= 0) { t.dirtT = .12; emitSmoke(t.x, t.y, .05, 'dust', .35, 1); } if (Math.random() < dt * 2) sfx('dig'); }
    return step(t, ex, ey, u.speed * (t.under ? 1.15 : 1), dt);
  }
  if (t.under) { t.under = false; t.born = now(); t.cool = .35; sfx('surface'); emitSmoke(t.x, t.y, .1, 'dust', .6, 6); return; }   // burst out of the ground
  var c = center(t.target); t.face = Math.atan2(c.y - t.y, c.x - t.x); attack(t, t.target, u);
}
// wall-breaker duck: one big bang that wrecks walls (x40) and nearby buildings, and the duck with it
function blast(t, u, dmg) {
  R.buildings.forEach(function (b) { if (!b.dead && rectDist(t.x, t.y, b) <= u.splash) damage(b, dmg, t); });
  R.fx.push({ t: 'boom', x: t.x, y: t.y, life: .9, max: .9, size: 1.4 }); sfx('cracker'); sfx('crash');
  t.hp = 0; t.dead = true; t.deadAt = now();
}
// mop duck: the spin hits every building and cat around it
function spinHit(t, dmg) {
  var r = U[t.kind].spin;
  R.buildings.forEach(function (b) { if (!b.dead && rectDist(t.x, t.y, b) <= r) damage(b, dmg, t); });
  R.troops.forEach(function (o) { if (!o.dead && o.side === 'cat' && Math.hypot(o.x - t.x, o.y - t.y) <= r + .3) damage(o, dmg, t); });
  R.fx.push({ t: 'splat', x: t.x, y: t.y, life: .4, max: .4, kind: 'water', size: r });
}
function spawnAround(t, kind, n, r) { // witch's ducklings, the fan's little fans
  var u = U[kind];
  for (var i = 0; i < n; i++) { var a = i / n * 6.283 + Math.random() * .4, x = clamp(t.x + Math.cos(a) * r, .3, MAP - .3), y = clamp(t.y + Math.sin(a) * r, .3, MAP - .3);
    R.troops.push({ side: 'duck', kind: kind, x: x, y: y, hp: u.hp, max: u.hp, cool: .4, dir: 2, born: now(), owner: t }); R.fx.push({ t: 'puff', x: x, y: y, life: .5, max: .5 }); }
}
function step(t, x, y, speed, dt) {
  var dx = x - t.x, dy = y - t.y, d = Math.hypot(dx, dy); if (d < 1e-3) return;
  if (t.fast > (R.now || now())) speed *= 1.4;
  var m = Math.min(d, speed * dt); t.x += dx / d * m; t.y += dy / d * m; t.moving = true; t.face = Math.atan2(dy, dx); t.walk = (t.walk || 0) + m;
}
function attack(t, target, u) {
  if (t.cool > 0) return; var T = R.now || now(); t.cool = u.rate; t.atk = T;
  var dmg = t.side === 'cat' ? u.dmg : uDmg(t.kind, t.lv);
  if (t.rage) dmg *= 1.5;
  if (t.side === 'duck') {
    if (t.fast > T) dmg *= t.invis > T ? 2 : 1.4;
    if (!u.hero && R.heroes.h_colonel && R.heroes.h_colonel.unit) { var col = R.heroes.h_colonel.unit; if (!col.dead && Math.hypot(col.x - t.x, col.y - t.y) < U.h_colonel.aura) dmg *= 1.25; }   // the colonel leads: ducks by his side fight harder
  }
  if (u.shot === 'feather') { sfx('shot'); shoot(t, target, 'feather', dmg, 0, 11, t.x, t.y, 1.4); return; }
  if (u.hit === 'blast') { blast(t, u, dmg); return; }
  if (u.hit === 'magic') { sfx('heal'); shoot(t, target, 'magic', dmg, 0, 8, t.x, t.y, .9); return; }
  if (u.hit === 'tomato') { sfx('shot'); shoot(t, target, 'tomato', dmg, u.splash, 6, t.x, t.y, -.2); return; }   // dropped from under the fan
  if (u.hit === 'cracker') { sfx('shot'); shoot(t, target, 'cracker', dmg, u.splash, 5, t.x, t.y, 1.9); return; }
  if (u.hit === 'shot' || u.hit === 'fire') { sfx(u.hit === 'fire' ? 'fire' : 'shot'); shoot(t, target, u.hit === 'fire' ? 'chili' : 'pebble', dmg, u.splash, 9, t.x, t.y, .7); return; }
  t.pend = { target: target, dmg: dmg, left: .23, kind: u.hit }; if (t.side === 'cat') sfx('hiss');   // the blow lands when the swing does
}
function catTick(t, dt) {
  var c = CATS[t.kind], foe = null, fd = 4.5, T = R.now || now(), ducks = R.ducks || R.troops;
  for (var i = 0; i < ducks.length; i++) { var o = ducks[i]; if (o.dead || o.side !== 'duck' || o.under || U[o.kind].air || o.invis > T) continue; var dx = o.x - t.x, dy = o.y - t.y; if (Math.abs(dx) >= fd || Math.abs(dy) >= fd) continue; var d = Math.sqrt(dx * dx + dy * dy); if (d < fd) { fd = d; foe = o; } }
  if (foe) { t.face = Math.atan2(foe.y - t.y, foe.x - t.x); if (fd > c.range + .45) return step(t, foe.x, foe.y, c.speed, dt); return attack(t, foe, c); }
  if (!t.stroll || Math.hypot(t.stroll.x - t.x, t.stroll.y - t.y) < .1) { t.stroll = null;
    for (var i = 0; i < 12 && !t.stroll; i++) { var g = { x: t.home.x + (Math.random() - .5) * 7, y: t.home.y + (Math.random() - .5) * 7 }; if (!inBuilding(g.x, g.y)) t.stroll = g; }
    if (!t.stroll) return; }
  var sx0 = t.x, sy0 = t.y; step(t, t.stroll.x, t.stroll.y, c.speed * .35, dt);
  if (inBuilding(t.x, t.y) && !inBuilding(sx0, sy0)) { t.x = sx0; t.y = sy0; t.stroll = null; }   // walk round buildings, not through them
}
function turretTick(b, dt) {
  var d = B[b.k]; if (d.kind !== 'defense' || b.dead) return; b.cool -= dt;
  var c = center(b), lv = b.lv, range = d.range, r2 = range * range, m2 = (d.minRange || 0) * (d.minRange || 0), target = null, best = 1e9, T = R.now || now(), ducks = R.ducks || R.troops;
  for (var i = 0; i < ducks.length; i++) { var o = ducks[i]; if (o.dead || o.side !== 'duck' || o.under || o.invis > T) continue; var air = !!U[o.kind].air; if (air ? !d.air : !d.ground) continue;
    var dx = o.x - c.x, dy = o.y - c.y, dd = dx * dx + dy * dy; if (dd <= r2 && dd >= m2 && dd < best) { best = dd; target = o; } }
  if (!target) return;
  var want = Math.atan2(target.y - c.y, target.x - c.x), diff = Math.atan2(Math.sin(want - b.aim), Math.cos(want - b.aim));
  b.aim += clamp(diff, -6 * dt, 6 * dt);
  if (b.cool <= 0 && Math.abs(diff) < .35) {
    b.cool = d.rate; b.fire = T; sfx(d.shot === 'egg' ? 'egg' : d.shot === 'water' ? 'water' : 'shot');
    shoot(b, target, d.shot, grow(d.dmg, lv, 1.17), d.splash, d.shot === 'egg' ? 6 : 12, c.x + Math.cos(b.aim) * .6, c.y + Math.sin(b.aim) * .6, 1.2);
  }
}
function shotTick(s, dt) {
  s.t += dt; var k = Math.min(1, s.t / s.dur);
  if (s.target && !s.target.dead && !s.target.k) { s.tx = s.target.x; s.ty = s.target.y; }
  s.x = s.fx + (s.tx - s.fx) * k; s.y = s.fy + (s.ty - s.fy) * k; s.z = s.fz * (1 - k) + (s.tz || 0) * k + Math.sin(k * Math.PI) * s.arc;
  if (k < 1) return false;
  if (s.splash) { R.troops.concat(R.buildings).forEach(function (o) { if (o.dead) return; var ox = o.k ? center(o).x : o.x, oy = o.k ? center(o).y : o.y;
      if ((s.from.k ? !o.k && o.side === 'duck' && !o.under && (!U[o.kind].air || B[s.from.k].air) : o.k) && Math.hypot(ox - s.tx, oy - s.ty) <= s.splash) damage(o, s.dmg, s.from); });
    R.fx.push({ t: s.kind === 'cracker' ? 'boom' : 'splat', x: s.tx, y: s.ty, life: s.kind === 'tomato' ? .9 : .5, max: s.kind === 'tomato' ? .9 : .5, kind: s.kind, size: s.kind === 'cracker' ? 1 : s.splash, seed: Math.random() * 100 }); sfx(s.kind === 'cracker' ? 'cracker' : 'splat'); }
  else if (s.target) { sfx('thud'); damage(s.target, s.dmg, s.from); if (R.fx.length < 160) R.fx.push({ t: 'hit', x: s.tx, y: s.ty, life: .25, max: .25, kind: s.kind }); }
  return true;
}
// soft separation so ducks don't stack on one spot: a 1-tile bucket grid, so each duck only checks its neighbours
// (all pairs was 65,000 checks a frame with 360 ducks; push radii add up to at most 1 tile)
var SEP = null;
function separate() {
  var live = alive(R.troops), n = live.length, W = MAP + 2;
  if (!SEP || SEP.W !== W) SEP = { W: W, head: new Int32Array(W * W), next: new Int32Array(0), cell: new Int32Array(0), rad: new Float32Array(0) };
  if (SEP.next.length < n) { SEP.next = new Int32Array(n * 2); SEP.cell = new Int32Array(n * 2); SEP.rad = new Float32Array(n * 2); }
  var head = SEP.head.fill(-1), next = SEP.next, cell = SEP.cell, rad = SEP.rad;
  for (var i = 0; i < n; i++) { var o = live[i], cx = clamp(Math.floor(o.x) + 1, 0, W - 1), cy = clamp(Math.floor(o.y) + 1, 0, W - 1), c = cy * W + cx;
    cell[i] = c; rad[i] = big(o); next[i] = head[c]; head[c] = i; }
  for (i = 0; i < n; i++) {
    var a = live[i], ac = cell[i], ax = ac % W, ay = (ac / W) | 0;
    for (var yy = ay - 1; yy <= ay + 1; yy++) { if (yy < 0 || yy >= W) continue;
      for (var xx = ax - 1; xx <= ax + 1; xx++) { if (xx < 0 || xx >= W) continue;
        for (var j = head[yy * W + xx]; j >= 0; j = next[j]) { if (j <= i) continue;
          var b = live[j], dx = b.x - a.x, dy = b.y - a.y, squared = dx * dx + dy * dy, radius = rad[i] + rad[j];
          if (squared === 0 || squared >= radius * radius) continue;
          var distance = Math.sqrt(squared), push = (radius - distance) / (4 * distance);
          a.x -= dx * push; a.y -= dy * push; b.x += dx * push; b.y += dy * push; } } }
  }
}
function big(o) { var u = U[o.kind] || CATS[o.kind] || {}; return u.hero ? .5 : u.space >= 5 ? .35 : .2; }
function destruction() {
  var all = R.buildings.filter(function (b) { return b.k !== 'wall'; }), dead = all.filter(function (b) { return b.dead; }).length;
  return all.length ? dead / all.length : 0;
}
function raidTick(dt) {
  if (!R || R.over) return;
  if (R.started) R.time -= dt;
  R.now = now(); R.pathBudget = 6;   // one clock read per frame; at most 6 new route searches per frame
  // bodies stay ~2 s for the fall-and-dissolve, then leave the list so a 360-duck raid doesn't keep looping over the fallen
  if (R.troops.length > 40 && (!R.pruneAt || R.now > R.pruneAt)) { R.pruneAt = R.now + 500; R.troops = R.troops.filter(function (t) { return !t.dead || R.now - (t.deadAt || 0) < 2200; }); }
  var ducks = [], cats = []; for (var q = 0; q < R.troops.length; q++) { var o = R.troops[q]; if (!o.dead) (o.side === 'cat' ? cats : ducks).push(o); }
  R.ducks = ducks; R.cats = cats;
  for (q = 0; q < R.troops.length; q++) troopTick(R.troops[q], dt);
  for (q = 0; q < R.buildings.length; q++) turretTick(R.buildings[q], dt);
  R.shots = R.shots.filter(function (s) { return !shotTick(s, dt); });
  separate();
  var pct = destruction(), hqDead = R.buildings.some(function (b) { return b.k === 'hq' && b.dead; });
  R.stars = (pct >= .5 ? 1 : 0) + (hqDead ? 1 : 0) + (pct >= 1 ? 1 : 0); R.pct = pct;
  var ducksLeft = R.ducks.some(function (t) { return !t.dead; }) || R.troops.some(function (t) { return !t.dead && t.side === 'duck'; }) || Object.keys(R.army).some(function (k) { return R.army[k] > 0; }) || HERO_KEYS.some(function (k) { return R.heroes[k] && R.heroes[k].state === 'ready'; });
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
