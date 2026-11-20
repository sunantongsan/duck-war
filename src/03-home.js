// Duck War — the home base: resources, building/upgrading with builder ducks, training, offline progress.
var D = null;
function newGame() {
  var d = { v: 1, res: { honey: 1200, veggie: 1200, syrup: 0, coin: TEST ? 1000000 : 250 }, buildings: [], army: {}, queue: [], builders: 2, next: 1, t: now(), raid: 1, stars: 0, name: 'ฐานเป็ด' };
  function add(k, x, y, lv) { d.buildings.push({ id: d.next++, k: k, x: x, y: y, lv: lv || 1 }); }
  add('hq', 10, 10); add('honeypump', 6, 9); add('veggieblender', 15, 10); add('honeyjar', 7, 13); add('veggiejar', 14, 14);
  add('camp', 5, 15); add('barracks', 10, 15); add('slingshot', 11, 6);
  d.army = { fork: 8 };
  return d;
}
function hqLv() { var h = D.buildings.find(function (b) { return b.k === 'hq'; }); return h ? h.lv : 1; }
function capacity(r) {
  if (r === 'coin') return Infinity;
  var c = r === 'syrup' ? 0 : B.hq.store * Math.pow(1.4, hqLv() - 1);
  D.buildings.forEach(function (b) { var d = B[b.k]; if (d.kind === 'store' && d.store === r && !(b.up && b.lv === 0)) c += d.cap * Math.pow(1.6, b.lv - 1); });
  return Math.round(c);
}
function rate(b) { var d = B[b.k]; return d.rate * Math.pow(1.4, b.lv - 1); }   // per hour
function armySpace() { var s = 0; D.buildings.forEach(function (b) { if (B[b.k].kind === 'camp' && b.lv > 0) s += Math.round(B.camp.space * (1 + .25 * (b.lv - 1))); }); return s; }
function armyUsed(withQueue) { var s = 0; Object.keys(D.army).forEach(function (k) { s += (D.army[k] || 0) * U[k].space; }); if (withQueue) D.queue.forEach(function (q) { s += U[q.k].space; }); return s; }
function barracksLv() { var m = 0; D.buildings.forEach(function (b) { if (b.k === 'barracks') m = Math.max(m, b.lv); }); return m; }
function busyBuilders() { return D.buildings.filter(function (b) { return b.up; }).length; }
function count(k) { return D.buildings.filter(function (b) { return b.k === k; }).length; }

// Advance the base to the current time (also after the app was closed).
function homeTick() {
  var t = now(), dt = Math.max(0, Math.min(t - D.t, 30 * 864e5)) / 3600000; D.t = t;
  ['honey', 'veggie', 'syrup'].forEach(function (r) {
    var add = 0; D.buildings.forEach(function (b) { var d = B[b.k]; if (d.kind === 'make' && d.make === r && !b.up) add += rate(b) * dt; });
    D.res[r] = Math.min(capacity(r), D.res[r] + add);
  });
  D.buildings.forEach(function (b) { if (b.up && b.up.until <= t) { b.lv = b.up.to; delete b.up; b.pop = now(); toast(B[b.k].name + ' เลเวล ' + b.lv + ' เสร็จแล้ว!'); buzz('success'); dirty = true; } });
  while (D.queue.length && D.queue[0].until <= t) {
    var q = D.queue.shift(); D.army[q.k] = (D.army[q.k] || 0) + 1; dirty = true;
    if (D.queue.length) D.queue[0].until = Math.max(D.queue[0].until, t);
  }
}
function canPay(r, n) { return D.res[r] >= n; }
function pay(r, n) { if (!canPay(r, n)) { toast(RES[r].name + 'ไม่พอ'); buzz('heavy'); return false; } D.res[r] -= n; return true; }
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
  writeSave(); buzz('medium'); return true;
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
  D.queue.push({ k: k, until: start + u.time * 1000 }); writeSave(); buzz('light');
}
function finishTraining() {
  if (!D.queue.length) return; var c = coinsFor(D.queue[D.queue.length - 1].until - now());
  if (!pay('coin', c)) return; D.queue.forEach(function (q) { q.until = now(); }); homeTick(); writeSave();
}
function moveBuilding(b, x, y) { if (!footprintFree(b.k, x, y, b.id)) return false; b.x = x; b.y = y; writeSave(); return true; }
