// Duck War — the home base: resources, building/upgrading with builder ducks, training, offline progress.
var D = null;
function newGame() {
  var d = { v: 1, res: { honey: 1200, veggie: 1200, syrup: 0, coin: TEST ? 1000000 : 250 }, buildings: [], army: {}, queue: [], builders: 2, next: 1, t: now(), raid: 1, stars: 0, name: 'ฐานเป็ด' };
  function add(k, x, y, lv) { d.buildings.push({ id: d.next++, k: k, x: x + 8, y: y + 8, lv: lv || 1 }); }   // laid out round the middle of the 40x40 map
  add('hq', 10, 10); add('honeypump', 6, 9); add('veggieblender', 15, 10); add('honeyjar', 7, 13); add('veggiejar', 14, 14);
  add('camp', 5, 15); add('barracks', 10, 15); add('slingshot', 11, 6);
  d.army = { fork: 8 }; d.map = MAP;
  return d;
}
function migrateSave(d) { // saves from the 24x24 map: move the base to the middle of the bigger one
  if (!d.map) { d.buildings.forEach(function (b) { b.x += 8; b.y += 8; }); d.map = MAP; }
  return d;
}
function hqCenter() { var h = D.buildings.find(function (b) { return b.k === 'hq'; }); return h ? { x: h.x + 1.5, y: h.y + 1.5 } : { x: MAP / 2, y: MAP / 2 }; }
function hqLv() { var h = D.buildings.find(function (b) { return b.k === 'hq'; }); return h ? h.lv : 1; }
function capacity(r) {
  if (r === 'coin') return Infinity;
  var c = r === 'syrup' ? 0 : B.hq.store * Math.pow(1.4, hqLv() - 1);
  D.buildings.forEach(function (b) { var d = B[b.k]; if (d.kind === 'store' && d.store === r && !(b.up && b.lv === 0)) c += d.cap * Math.pow(1.7, b.lv - 1); });   // grows fast enough that every duck-house level stays affordable
  return Math.round(c);
}
function rate(b) { var d = B[b.k]; return d.rate * Math.pow(1.4, b.lv - 1); }   // per hour
function armySpace() { var s = 0; D.buildings.forEach(function (b) { if (B[b.k].kind === 'camp' && b.lv > 0) s += Math.round(B.camp.space * (1 + .25 * (b.lv - 1))); }); return s; }
function armyUsed(withQueue) { var s = 0; Object.keys(D.army).forEach(function (k) { s += (D.army[k] || 0) * U[k].space; }); if (withQueue) D.queue.forEach(function (q) { s += U[q.k].space; }); return s; }
function barracksLv() { var m = 0; D.buildings.forEach(function (b) { if (b.k === 'barracks') m = Math.max(m, b.lv); }); return m; }
// heroes: unlocked by the leaders' hall + duck-house level; one that falls in a raid rests a while before the next one
function hallLv() { var m = 0; D.buildings.forEach(function (b) { if (b.k === 'herohall') m = Math.max(m, b.lv); }); return m; }
function heroOpen(k) { return hallLv() > 0 && hqLv() >= U[k].hq; }
function heroRest(k) { var r = (D.heroRest || {})[k] || 0; return Math.max(0, r - now()); }
function heroRestMs(lv) { return TEST ? 30000 : (4 + lv) * 60000; }
function heroWake(k) { var ms = heroRest(k); if (!ms) return true; if (!pay('coin', coinsFor(ms))) return false; D.heroRest[k] = 0; writeSave(); return true; }
function busyBuilders() { return D.buildings.filter(function (b) { return b.up; }).length; }
function count(k) { return D.buildings.filter(function (b) { return b.k === k; }).length; }

// Advance the base to the current time (also after the app was closed).
function homeTick() {
  var t0 = D.t, t = now(), dt = Math.max(0, Math.min(t - t0, 30 * 864e5)) / 3600000; D.t = t;
  ['honey', 'veggie', 'syrup'].forEach(function (r) {
    var add = 0; D.buildings.forEach(function (b) { var d = B[b.k]; if (d.kind === 'make' && d.make === r && !b.up) {
      var boosted = b.boost ? Math.max(0, Math.min(t, b.boost) - Math.max(t0, t - dt * 3600000)) / 3600000 : 0;   // hours of this stretch under x2
      add += rate(b) * (dt + boosted); } });
    D.res[r] = Math.min(capacity(r), D.res[r] + add);
  });
  D.buildings.forEach(function (b) { if (b.up && b.up.until <= t) { b.lv = b.up.to; delete b.up; b.pop = now(); toast(B[b.k].name + ' เลเวล ' + b.lv + ' เสร็จแล้ว!'); sfx('done'); buzz('success'); dirty = true; } });
  while (D.queue.length && D.queue[0].until <= t) {
    var q = D.queue.shift(); D.army[q.k] = (D.army[q.k] || 0) + 1; dirty = true; sfx('quack');
    if (D.queue.length) D.queue[0].until = Math.max(D.queue[0].until, t);
  }
}
function canPay(r, n) { return D.res[r] >= n; }
function pay(r, n) { if (!canPay(r, n)) { toast(RES[r].name + 'ไม่พอ'); sfx('error'); buzz('heavy'); return false; } D.res[r] -= n; if (r === 'coin') sfx('coin'); return true; }
function coinsFor(ms) { return Math.max(1, Math.ceil(ms / 60000)); }   // 1 duck coin per remaining minute

function footprintFree(k, x, y, ignoreId) {
  var s = B[k].size; if (x < 1 || y < 1 || x + s > MAP - 1 || y + s > MAP - 1) return false;
  return !D.buildings.some(function (b) { if (b.id === ignoreId) return false; var t = B[b.k].size; return x < b.x + t && b.x < x + s && y < b.y + t && b.y < y + s; });
}
function placeBuilding(k, x, y) {
  var d = B[k];
  if (count(k) >= maxCount(k, hqLv())) { toast('สร้างครบแล้ว อัปเกรดบ้านเป็ดเพื่อสร้างเพิ่ม'); return false; }
  if (!footprintFree(k, x, y)) { toast('วางตรงนี้ไม่ได้'); return false; }
  if (d.time > 0 && busyBuilders() >= D.builders) { toast('เป็ดช่างไม่ว่าง'); return false; }
  if (!pay(d.res, bCost(k, 1))) return false;
  var b = { id: D.next++, k: k, x: x, y: y, lv: d.time > 0 ? 0 : 1 };
  if (d.time > 0) b.up = { to: 1, until: now() + bTime(k, 1) * 1000, start: now() };
  b.pop = now(); D.buildings.push(b); writeSave(); buzz('medium'); return b;
}
function upgradeBuilding(b) {
  var to = b.lv + 1, d = B[b.k];
  if (b.up) return false;
  if (to > bMaxLv(b.k, hqLv())) { toast(b.k === 'hq' ? 'เลเวลสูงสุดแล้ว' : 'อัปเกรดบ้านเป็ดก่อน'); return false; }
  if (d.time > 0 && busyBuilders() >= D.builders) { toast('เป็ดช่างไม่ว่าง'); return false; }
  if (!pay(d.res, bCost(b.k, to))) return false;
  var t = bTime(b.k, to);
  if (t > 0) b.up = { to: to, until: now() + t * 1000, start: now() }; else { b.lv = to; b.pop = now(); }
  writeSave(); sfx('build'); buzz('medium'); return true;
}
function finishNow(b) {
  if (!b.up) return; var c = coinsFor(b.up.until - now());
  if (!pay('coin', c)) return; b.up.until = now(); homeTick(); writeSave();
}
function train(k) {
  var u = U[k]; if ((u.unlock || 1) > barracksLv()) { toast('อัปเกรดลานฝึกเป็ดก่อน'); return; }
  if (armyUsed(true) + u.space > armySpace()) { toast('ค่ายพักเต็ม'); return; }
  if (!pay(u.res, u.cost)) return;
  var start = D.queue.length ? D.queue[D.queue.length - 1].until : now();
  D.queue.push({ k: k, until: start + u.time * 1000 }); writeSave(); sfx('train'); buzz('light');
}
function finishTraining() {
  if (!D.queue.length) return; var c = coinsFor(D.queue[D.queue.length - 1].until - now());
  if (!pay('coin', c)) return; D.queue.forEach(function (q) { q.until = now(); }); homeTick(); writeSave();
}
function moveBuilding(b, x, y) { if (!footprintFree(b.k, x, y, b.id)) return false; b.x = x; b.y = y; writeSave(); return true; }

// ---------- speed-ups for resources ----------
// a rewarded video doubles one maker's output for an hour; duck coins fill that resource's storage right away
var BOOST_MS = 3600000, VIDEO_PER_DAY = 5;
function totalRate(r) { var t = 0; D.buildings.forEach(function (b) { var d = B[b.k]; if (d.kind === 'make' && d.make === r && b.lv > 0 && !b.up) t += rate(b); }); return t; }
function fillMissing(r) { return Math.max(0, Math.floor(capacity(r) - D.res[r])); }
function fillCoins(r) { // priced like any other speed-up: 1 duck coin per minute the makers would need
  var miss = fillMissing(r), tr = totalRate(r); if (!miss) return 0;
  return tr > 0 ? coinsFor(miss / tr * 3600000) : Math.max(1, Math.ceil(miss / 50));
}
function fillWithCoins(r) {
  var miss = fillMissing(r), c = fillCoins(r);
  if (!miss) { toast('คลัง' + RES[r].name + 'เต็มอยู่แล้ว'); return false; }
  if (D.res.coin < c) { toast('เหรียญเป็ดไม่พอ'); buzz('heavy'); return false; }
  D.res.coin -= c; D.res[r] += miss; sfx('coin'); buzz('success'); toast('🪙 เติม' + RES[r].name + ' +' + fmt(miss) + ' เต็มคลังแล้ว!');
  D.buildings.forEach(function (b) { var d = B[b.k]; if ((d.kind === 'store' && d.store === r) || (d.kind === 'make' && d.make === r)) b.pop = now(); });
  writeSave(); dirty = true; return true;
}
function videosLeft() { var day = new Date().toDateString(); if (D.vidDay !== day) { D.vidDay = day; D.vids = 0; } return VIDEO_PER_DAY - (D.vids || 0); }
function applyBoost(b) { b.boost = Math.max(now(), b.boost || 0) + BOOST_MS; b.pop = now(); sfx('boost'); buzz('success'); toast('⚡ ' + B[b.k].name + ' ผลิตเร็ว x2 นาน 1 ชั่วโมง'); writeSave(); dirty = true; }
function boostWithVideo(b, done) {
  if (videosLeft() <= 0) { toast('ดูวิดีโอครบ ' + VIDEO_PER_DAY + ' ครั้งแล้ววันนี้'); return; }
  showRewardedVideo(function (ok) { if (!ok) { toast('ต้องดูวิดีโอจนจบถึงได้รางวัล'); return; } D.vids = (D.vids || 0) + 1; applyBoost(b); if (done) done(); });
}
// Rewarded video: the Android app provides window.DuckAds once an ad network is wired in.
// Until then test builds show a 5-second stand-in so the flow can be tried end to end.
function showRewardedVideo(cb) {
  if (window.DuckAds && window.DuckAds.showRewarded) { window.duckAdResult = function (ok) { window.duckAdResult = null; cb(!!ok); }; window.DuckAds.showRewarded(); return; }
  if (!TEST) { toast('วิดีโอยังไม่พร้อม ลองใหม่ภายหลัง'); return; }
  var o = document.createElement('div'); o.className = 'adfake'; document.body.appendChild(o); var left = 5;
  (function tick() { o.innerHTML = '<div>📺 วิดีโอโฆษณา (ตัวอย่างสำหรับทดสอบ)</div><b>' + left + '</b>'; if (left-- > 0) setTimeout(tick, 1000); else { o.remove(); cb(true); } })();
}

// ---------- the colonel: strolls round the duck house, stops to look about ----------
var COLONEL = null;
function colonelTick(dt) {
  var hq = D.buildings.find(function (b) { return b.k === 'hq'; }); if (!hq) return;
  var hc = { x: hq.x + 1.5, y: hq.y + 1.5 };
  if (!COLONEL) COLONEL = { side: 'hero', kind: 'colonel', x: hc.x + 2.8, y: hc.y + .4, face: 2.36, hp: 1, max: 1, wait: 1 };
  var c = COLONEL; c.moving = false;
  if (c.wait > 0) { c.wait -= dt; return; }
  if (!c.goal) {
    for (var i = 0; i < 20 && !c.goal; i++) { var a = Math.random() * 6.28, r = 2.6 + Math.random() * 2.2, g = { x: hc.x + Math.cos(a) * r, y: hc.y + Math.sin(a) * r };
      if (g.x > .5 && g.y > .5 && g.x < MAP - .5 && g.y < MAP - .5 && !insideBuilding(g.x, g.y)) c.goal = g; }
    if (!c.goal) { c.wait = 1; return; }
  }
  var dx = c.goal.x - c.x, dy = c.goal.y - c.y, d = Math.hypot(dx, dy), st = HEROES.colonel.speed * dt;
  if (d < .05) { c.goal = null; c.wait = 1.5 + Math.random() * 3; if (Math.random() < .4) c.atk = now(); return; }   // pause, sometimes a salute
  var nx = c.x + dx / d * Math.min(st, d), ny = c.y + dy / d * Math.min(st, d);
  if (insideBuilding(nx, ny)) { c.goal = null; c.wait = .5; return; }
  c.x = nx; c.y = ny; c.face = Math.atan2(dy, dx); c.moving = true; c.walk = (c.walk || 0) + st; dirty = true;
}
function insideBuilding(x, y) { return D.buildings.some(function (b) { var s = B[b.k].size; return x > b.x - .45 && y > b.y - .45 && x < b.x + s + .45 && y < b.y + s + .45; }); }
var COLONEL_LINES = ['ทหารเป็ด! เตรียมพร้อม!', 'แมวจะไม่ได้แตะไข่ของเราแม้แต่ฟองเดียว', 'อัปเกรดฐานให้แข็งแรงไว้นะ', 'ก๊าบ! ผู้พันตรวจแถว', 'น้ำผึ้งพร้อม น้ำผักพร้อม บุกได้!'];
