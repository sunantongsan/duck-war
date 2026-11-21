// Duck War — start-up, the main loop, and what taps do on each screen.
var last = 0;
function scene() { return screen === 'raid' ? R : D; }
function buildingAt(w, list) {
  var hit = null; list.forEach(function (b) { var s = B[b.k].size; if (w.x >= b.x && w.x < b.x + s && w.y >= b.y && w.y < b.y + s) hit = b; }); return hit;
}
input.tap = function (w) {
  if (screen === 'home') {
    if (placing || moving) { var o = placing || moving, s = B[placing ? placing.k : moving.b.k].size; o.x = Math.round(w.x - s / 2); o.y = Math.round(w.y - s / 2); dirty = true; return; }
    if (COLONEL && Math.hypot(w.x - COLONEL.x, w.y - COLONEL.y) < 1.3) { // tap the colonel: he salutes and says something
      COLONEL.atk = now(); COLONEL.wait = 2; COLONEL.goal = null; buzz('light'); toast('🎖 ผู้พันเป็ด: ' + COLONEL_LINES[Math.floor(Math.random() * COLONEL_LINES.length)]); return; }
    var b = buildingAt(w, D.buildings); selectBuilding(b); if (b) { b.pop = now() - 450; buzz('light'); } dirty = true;
  } else if (screen === 'raid' && R && !R.over) { if (deploy(w.x, w.y)) raidBar(); }
};
input.press = function (w) {
  if (screen === 'home' && (placing || moving)) { var o = placing || moving, s = B[placing ? placing.k : moving.b.k].size; return w.x >= o.x - .5 && w.x <= o.x + s + .5 && w.y >= o.y - .5 && w.y <= o.y + s + .5; }
  if (screen === 'raid' && R && !R.over && R.pick) { stream = { x: w.x, y: w.y, next: now() + 350 }; return true; }
  return false;
};
var stream = null;
input.drag = function (w) {
  if (screen === 'home' && (placing || moving)) { var o = placing || moving, s = B[placing ? placing.k : moving.b.k].size; o.x = Math.round(w.x - s / 2); o.y = Math.round(w.y - s / 2); dirty = true; }
  if (stream) { stream.x = w.x; stream.y = w.y; }
};
input.release = function () { stream = null; };

function frame(t) {
  var dt = Math.min(.05, (t - last) / 1000 || 0); last = t;
  if (screen === 'home') { colonelTick(dt); homeTick(); if (Math.floor(t / 1000) !== Math.floor((t - dt * 1000) / 1000)) { hud(); if (selected) selectBuilding(selected); writeSave(); } }
  if (screen === 'raid' && R) {
    raidTick(dt); raidHud();
    if (stream && now() > stream.next && R.army[R.pick] > 0) { stream.next = now() + 110; if (deploy(stream.x + (Math.random() - .5) * .4, stream.y + (Math.random() - .5) * .4)) raidBar(); }
  }
  draw(dt);
  requestAnimationFrame(frame);
}
function draw(dt) {
  FDT = dt || 0; ctx.setTransform(view.dpr, 0, 0, view.dpr, 0, 0); ctx.imageSmoothingQuality = 'high';
  drawGround();
  var sc = scene(), list = [];
  if (screen === 'raid' && R && !R.over && R.pick) { // red zone where ducks can't land
    var flash = R.redFlash && now() - R.redFlash < 700;
    sc.buildings.forEach(function (b) { if (!b.dead) tileDiamond(b.x - 1, b.y - 1, B[b.k].size + 2, flash ? 'rgba(255,60,60,.22)' : 'rgba(255,80,80,.10)', null); });
  }
  if (screen === 'home' && selected) tileDiamond(selected.x, selected.y, B[selected.k].size, 'rgba(255,255,255,.18)', 'rgba(255,255,255,.75)');
  var ghost = placing || moving;
  if (screen === 'home' && ghost) { var gk = placing ? placing.k : moving.b.k, ok = footprintFree(gk, ghost.x, ghost.y, moving && moving.b.id);
    tileDiamond(ghost.x, ghost.y, B[gk].size, ok ? 'rgba(120,255,140,.35)' : 'rgba(255,80,80,.35)', ok ? '#5fe07a' : '#ff5a5a'); }
  sc.buildings.forEach(function (b) { if (moving && moving.b === b) return; var s = B[b.k].size; list.push({ d: b.x + b.y + s, f: function () { drawBuilding(b, sc); } }); });
  if (ghost && screen === 'home') { var k2 = placing ? placing.k : moving.b.k, gb = { id: -1, k: k2, x: ghost.x, y: ghost.y, lv: placing ? 1 : moving.b.lv, aim: 2.36 }; list.push({ d: ghost.x + ghost.y + B[k2].size, f: function () { ctx.globalAlpha = .8; drawBuilding(gb, sc); ctx.globalAlpha = 1; } }); }
  if (screen === 'home' && COLONEL && ART.troops.colonel) list.push({ d: COLONEL.x + COLONEL.y + .2, f: function () { drawTroop(COLONEL); } });
  if (screen === 'raid' && R) {
    R.troops.forEach(function (t) { list.push({ d: t.x + t.y + .2, f: function () { drawTroop(t); } }); });
  }
  list.sort(function (a, b) { return a.d - b.d; }).forEach(function (o) { o.f(); });
  drawSmoke(dt || 0);
  if (screen === 'raid' && R) {
    R.buildings.forEach(function (b) { if (!b.dead && b.hp < b.max && b.k !== 'wall') { var c = center(b); hpBar(c.x, c.y, B[b.k].size * 1.3, b.hp / b.max, '#7be36a'); } });
    R.shots.forEach(drawShot); R.fx = R.fx.filter(function (f) { return drawFx(f, dt); });
  }
}
function boot() {
  D = loadSave() || newGame(); if (TEST && !D.testCoins) { D.res.coin = Math.max(D.res.coin, 1000000); D.testCoins = 1; }   // test builds: 1M duck coins for trying upgrades
  fit(); centerCamera(); homeTick(); hud();
  $('btn-build').onclick = buildMenu; $('btn-army').onclick = armyMenu; $('btn-attack').onclick = attackMenu;
  $('btn-ok').onclick = confirmPlace; $('btn-no').onclick = cancelPlace;
  $('btn-end').onclick = function () { if (R && !R.over) endRaid(); };
  window.duckBack = function () { if ($('sheet').classList.contains('open')) closeSheet(); else if (placing || moving) cancelPlace(); else if (selected) selectBuilding(null); };
  window.duckPause = writeSave;
  document.addEventListener('visibilitychange', function () { if (document.hidden) writeSave(); });
  window.duckReady = true;
  requestAnimationFrame(frame);
}
window.addEventListener('error', function (e) { window.duckError = String(e.message || e); });
boot();
