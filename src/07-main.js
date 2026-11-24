// Duck War — start-up, the main loop, and what taps do on each screen.
var last = 0;
function scene() { return screen === 'raid' ? R : D; }
function buildingAt(w, list) {
  var hit = null; list.forEach(function (b) { var s = B[b.k].size; if (w.x >= b.x && w.x < b.x + s && w.y >= b.y && w.y < b.y + s) hit = b; }); return hit;
}
input.tap = function (w) {
  if (screen === 'home') {
    if (placing) { var s = B[placing.k].size; placing.x = Math.round(w.x - s / 2); placing.y = Math.round(w.y - s / 2); placing.last = null; dirty = true; return; }
    if (moving) { cancelMove(); }   // tapping away from a red, unplaced move puts the buildings back
    if (COLONEL && Math.hypot(w.x - COLONEL.x, w.y - COLONEL.y) < 1.3) { // tap the colonel: he salutes and says something
      COLONEL.atk = now(); COLONEL.salutes = 1; COLONEL.wait = 2; COLONEL.face = Math.PI / 4; sfx('colonel'); buzz('light'); toast('🎖 ผู้พันเป็ด: ' + COLONEL_LINES[Math.floor(Math.random() * COLONEL_LINES.length)]); return; }
    var b = buildingAt(w, D.buildings); selectBuilding(b); if (b) { b.pop = now() - 450; sfx('tap'); buzz('light'); } dirty = true;
  } else if (screen === 'raid' && R && !R.over) { dropTroop(w.x, w.y); }
};
input.press = function (w) {
  if (screen === 'home' && placing) { var o = placing, s = B[placing.k].size; return w.x >= o.x - .5 && w.x <= o.x + s + .5 && w.y >= o.y - .5 && w.y <= o.y + s + .5; }
  if (screen === 'home' && (selected || moving)) return startDrag(w);
  if (screen === 'raid' && R && !R.over && R.pick) { stream = { x: w.x, y: w.y, next: now() + 350 }; return true; }
  return false;
};
var stream = null;
input.drag = function (w) {
  if (screen === 'home' && placing) { var o = placing, s = B[placing.k].size; o.x = Math.round(w.x - s / 2); o.y = Math.round(w.y - s / 2); o.last = null; dirty = true; }
  if (screen === 'home' && moving && moving.from) dragTo(w);
  if (stream) { stream.x = w.x; stream.y = w.y; }
};
input.release = function () { stream = null; if (screen === 'home' && moving && moving.from) dropDrag(); };

function frame(t) {
  var dt = Math.min(.05, (t - last) / 1000 || 0); last = t;
  if (screen === 'home') { colonelTick(dt); homeTick(); if (Math.floor(t / 1000) !== Math.floor((t - dt * 1000) / 1000)) { hud(); if (selected && !moving) selectBuilding(selected, true); writeSave(); } }
  if (screen === 'raid' && R) {
    raidTick(dt); raidHud();
    if (stream && now() > stream.next && R.army[R.pick] > 0) { stream.next = now() + 110; dropTroop(stream.x + (Math.random() - .5) * .4, stream.y + (Math.random() - .5) * .4); }
  }
  draw(dt); headWork(screen === 'raid'); sheetWork(screen === 'raid' ? 1 : 3);
  requestAnimationFrame(frame);
}
function rangeRing(b) {
  var d = B[b.k], s = d.size, c = toScreen(b.x + s / 2, b.y + s / 2), t = now() / 1000;
  function ring(r) { ctx.beginPath(); ctx.ellipse(c.x, c.y, r * cam.s, r * cam.s * ISO, 0, 0, 7); }
  ctx.save(); ring(d.range); ctx.fillStyle = 'rgba(255,255,255,.12)'; ctx.fill();
  ctx.strokeStyle = 'rgba(255,255,255,.55)'; ctx.lineWidth = 2; ctx.setLineDash([10, 7]); ctx.lineDashOffset = -t * 12; ctx.stroke();
  if (d.minRange) { ring(d.minRange); ctx.fillStyle = 'rgba(255,80,60,.13)'; ctx.fill(); ctx.strokeStyle = 'rgba(255,90,70,.45)'; ctx.stroke(); }
  ctx.restore(); dirty = true;
}
function draw(dt) {
  FDT = dt || 0; ctx.setTransform(view.dpr, 0, 0, view.dpr, 0, 0); ctx.imageSmoothingQuality = 'high';
  drawGround();
  var sc = scene(), list = [];
  if (screen === 'home' && !moving) selection().forEach(function (b) { tileDiamond(b.x, b.y, B[b.k].size, 'rgba(255,255,255,.18)', 'rgba(255,255,255,.75)'); });
  // a defense that is tapped, being placed or moved shows how far it reaches: faint ring on the grass (and the mortar's blind spot)
  if (screen === 'home') { var rings = []; if (placing) rings.push(placing); if (moving) moving.items.forEach(function (i) { rings.push({ k: i.b.k, x: i.x, y: i.y }); }); else if (selected) rings.push(selected);
    rings.forEach(function (b) { if (B[b.k].kind === 'defense') rangeRing(b); }); }
  var mvOk = moving ? moveOk(moving) : true;
  if (screen === 'home' && moving) moving.items.forEach(function (i) { tileDiamond(i.x, i.y, B[i.b.k].size, mvOk ? 'rgba(120,255,140,.35)' : 'rgba(255,80,80,.4)', mvOk ? '#5fe07a' : '#ff5a5a'); });
  if (screen === 'home' && placing) { var pok = footprintFree(placing.k, placing.x, placing.y);
    tileDiamond(placing.x, placing.y, B[placing.k].size, pok ? 'rgba(120,255,140,.35)' : 'rgba(255,80,80,.35)', pok ? '#5fe07a' : '#ff5a5a'); }
  var movingSet = moving && screen === 'home' ? moving.items.map(function (i) { return i.b; }) : [], ghosts = moving && screen === 'home' ? moving.items.map(function (i) { return Object.assign({}, i.b, { x: i.x, y: i.y }); }) : [];
  if (moving && screen === 'home') sc = { buildings: D.buildings.filter(function (b) { return movingSet.indexOf(b) < 0; }).concat(ghosts) };   // walls join up with where the moved walls are now
  buildWallSet(sc.buildings);
  // rubble lies flat on the ground: drawn first and faded, so ducks walk over it instead of under it
  sc.buildings.forEach(function (b) { if (b.dead && b.k !== 'wall') { ctx.globalAlpha = .62; drawBuilding(b, sc); ctx.globalAlpha = 1; } });
  sc.buildings.forEach(function (b) { if (b.dead || movingSet.indexOf(b) >= 0) return; var s = B[b.k].size; list.push({ d: b.x + b.y + s, f: function () { drawBuilding(b, sc); } }); });
  if (placing && screen === 'home') { var gb = { id: -1, k: placing.k, x: placing.x, y: placing.y, lv: 1, aim: 2.36 }; list.push({ d: placing.x + placing.y + B[placing.k].size, f: function () { ctx.globalAlpha = .8; drawBuilding(gb, { buildings: D.buildings.concat([gb]) }); ctx.globalAlpha = 1; } }); }
  ghosts.forEach(function (g) { list.push({ d: g.x + g.y + B[g.k].size, f: function () { ctx.globalAlpha = mvOk ? .9 : .7; drawBuilding(g, sc); ctx.globalAlpha = 1; } }); });
  if (screen === 'home' && COLONEL && ART.troops.colonel) list.push({ d: COLONEL.x + COLONEL.y + .2, f: function () { drawTroop(COLONEL); } });
  if (screen === 'raid' && R) {
    R.troops.forEach(function (t) { list.push({ d: t.x + t.y + .2 + (t.side === 'duck' && U[t.kind].air ? 6 : 0), f: function () { drawTroop(t); } }); });   // flyers are drawn above the buildings
  }
  list.sort(function (a, b) { return a.d - b.d; }).forEach(function (o) { o.f(); });
  drawSmoke(dt || 0);
  if (screen === 'raid' && R) {
    R.buildings.forEach(function (b) { if (!b.dead && b.hp < b.max && b.k !== 'wall') { var c = center(b); hpBar(c.x, c.y, B[b.k].size * 1.3, b.hp / b.max, '#7be36a'); } });
    R.shots.forEach(drawShot); R.fx = R.fx.filter(function (f) { return drawFx(f, dt); });
  }
  if (PARTS.length || WORDS.length || SHAKE.on) drawParts(dt || 0);
}
function boot() {
  D = migrateSave(loadSave() || newGame()); if (TEST && !D.testCoins) { D.res.coin = Math.max(D.res.coin, 1000000); D.testCoins = 1; }   // test builds: 1M duck coins for trying upgrades
  fit(); centerCamera(0, hqCenter()); homeTick(); hud();
  $('btn-build').onclick = buildMenu; $('btn-army').onclick = armyMenu; $('btn-attack').onclick = attackMenu;
  $('btn-ok').onclick = confirmPlace; $('btn-no').onclick = cancelPlace;
  $('btn-end').onclick = function () { if (R && !R.over) endRaid(); };
  $('btn-sound').onclick = soundMenu;
  window.duckBack = function () { if ($('sheet').classList.contains('open')) closeSheet(); else if (placing) cancelPlace(); else if (moving) cancelMove(); else if (selected) selectBuilding(null); };
  window.duckPause = writeSave;
  document.addEventListener('visibilitychange', function () { if (document.hidden) writeSave(); });
  headPrepare(); sheetPrime(HERO_KEYS);   // the colonel walks the base, and all three heroes are ready for raids
  if (D.ground === undefined) groundPicker(true);   // first start (or a save from before map looks): let the player pick a map
  window.duckReady = true;
  requestAnimationFrame(frame);
}
window.addEventListener('error', function (e) { window.duckError = String(e.message || e); });
boot();
