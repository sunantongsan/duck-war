// Duck War — screens and panels (HTML over the canvas): home HUD, building panel, build menu, army, raid HUD, results.
var screen = 'home', selected = null, placing = null, moving = null;
function h(tag, cls, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html !== undefined) e.innerHTML = html; return e; }
function icon(r) { return '<i class="ic ic-' + r + '"></i>'; }
function costTag(r, n) { return '<span class="cost' + (D.res[r] >= n ? '' : ' short') + '">' + icon(r) + fmt(n) + '</span>'; }
function closeSheet() { $('sheet').classList.remove('open'); $('sheet').innerHTML = ''; }
function openSheet(title, body) {
  var s = $('sheet'), old = s.querySelector('.sheet-body'), keep = s.classList.contains('open') && s.dataset.title === title ? (old ? old.scrollTop : 0) : 0;   // refreshing the same sheet keeps its scroll
  s.dataset.title = title; s.innerHTML = ''; var head = h('div', 'sheet-head', '<b>' + title + '</b>'); var x = h('button', 'x', '✕'); x.onclick = closeSheet; head.appendChild(x);
  s.appendChild(head); var b = h('div', 'sheet-body'); s.appendChild(b); body(b); s.classList.add('open'); b.scrollTop = keep;
}

// ---------- HUD ----------
function hud() {
  var top = $('res'); top.innerHTML = '';
  ['honey', 'veggie', 'syrup', 'coin'].forEach(function (r) {
    if (r === 'syrup' && hqLv() < 5 && !D.res.syrup) return;
    var cap = capacity(r), pill = h('div', 'pill', icon(r) + '<b>' + fmt(D.res[r]) + '</b>' + (cap !== Infinity ? '<small>/' + fmt(cap) + '</small>' : ''));
    if (cap !== Infinity) { var bar = h('span', 'fill'); bar.style.width = Math.min(100, D.res[r] / cap * 100) + '%'; bar.style.background = RES[r].color; pill.appendChild(bar); }
    if (r !== 'coin') pill.onclick = function () { // tap a resource: jump to its maker to boost it
      if (screen !== 'home') return; var mk = D.buildings.filter(function (b) { return B[b.k].kind === 'make' && B[b.k].make === r && b.lv > 0; });
      if (!mk.length) { toast('ยังไม่มีอาคารผลิต' + RES[r].name); return; }
      mk.sort(function (a, b) { return (a.boost || 0) - (b.boost || 0); }); closeSheet(); selectBuilding(mk[0]); dirty = true; };
    top.appendChild(pill);
  });
  top.appendChild(h('div', 'pill', '🔨 <b>' + (D.builders - busyBuilders()) + '/' + D.builders + '</b>'));
  $('home-ui').hidden = screen !== 'home'; $('raid-ui').hidden = screen !== 'raid'; $('res').hidden = screen === 'raid';
  $('army-count').textContent = armyUsed() + '/' + armySpace();
}

// ---------- building panel ----------
function selectBuilding(b, keepGroup) {
  if (!keepGroup || b !== selected) group = null; if (moving && b !== selected) moving = null;
  var fresh = b !== selected; selected = b; var p = $('panel'); p.innerHTML = ''; if (!b) { p.classList.remove('open'); return; } var d = B[b.k];
  var lvTxt = b.lv ? 'เลเวล ' + b.lv : 'กำลังสร้าง';
  p.appendChild(h('div', 'p-title', '<b>' + d.name + '</b><small>' + lvTxt + '</small>'));
  var info = [];
  if (d.kind === 'make') info.push(icon(d.make) + ' ' + fmt(rate(b)) + '/ชม.');
  if (d.kind === 'store') info.push('จุ ' + icon(d.store) + ' ' + fmt(d.cap * Math.pow(1.7, b.lv - 1)));
  if (d.kind === 'defense') info.push('⚔ ' + grow(d.dmg, Math.max(1, b.lv), 1.17) + ' · ระยะ ' + d.range + (d.air && d.ground ? ' · ยิงพื้น+อากาศ' : d.air ? ' · ยิงอากาศ' : ''));
  if (d.kind === 'camp') info.push('จุทหาร ' + Math.round(B.camp.space * (1 + .25 * (b.lv - 1))));
  info.push('♥ ' + fmt(bHp(b.k, Math.max(1, b.lv))));
  p.appendChild(h('div', 'p-info', info.join(' · ')));
  var row = h('div', 'p-row');
  if (b.up) {
    var f = h('button', 'btn gold', 'เสร็จทันที ' + costTag('coin', coinsFor(b.up.until - now()))); f.onclick = function () { finishNow(b); selectBuilding(b); hud(); }; row.appendChild(f);
  } else if (b.lv < bMaxLv(b.k, hqLv())) {
    var c = bCost(b.k, b.lv + 1), u = h('button', 'btn green', 'อัปเกรด ' + costTag(d.res, c) + (d.time ? '<small>⏱ ' + clock(bTime(b.k, b.lv + 1) * 1000) + '</small>' : ''));
    u.onclick = function () { if (upgradeBuilding(b)) { selectBuilding(b); hud(); } }; row.appendChild(u);
  } else row.appendChild(h('span', 'note', b.k === 'hq' ? 'เลเวลสูงสุด' : 'อัปเกรดบ้านเป็ดเพื่อปลดล็อกเลเวลถัดไป'));
  if (b.k === 'wall') {
    if (group && group.length > 1) {
      var lv0 = Math.min.apply(null, group.map(function (w) { return w.lv; })), n0 = group.filter(function (w) { return w.lv === lv0; }).length;
      var ur = h('button', 'btn green', 'อัปเกรดทั้งแถว (' + n0 + ') ' + costTag(d.res, bCost('wall', lv0 + 1) * n0)); ur.onclick = upgradeRow; row.appendChild(ur);
      var rr = h('button', 'btn', '⟳ หมุนแถว'); rr.onclick = rotateRow; row.appendChild(rr);
    } else { var sr = h('button', 'btn', '▦ เลือกทั้งแถว'); sr.onclick = selectRow; row.appendChild(sr); }
  }
  if (d.kind === 'make' && b.lv > 0 && !b.up) {
    var on = b.boost && b.boost > now(), row2 = h('div', 'p-row boost'), r = d.make, fc = fillCoins(r);
    var bv = h('button', 'btn video', on ? '▶ ต่อเวลา x2 <small>⚡ ' + clock(b.boost - now()) + ' · เหลือ ' + videosLeft() + '</small>' : '▶ ดูวิดีโอ ผลิต x2 1 ชม. <small>เหลือ ' + videosLeft() + '</small>');
    bv.onclick = function () { boostWithVideo(b, function () { selectBuilding(b); }); }; row2.appendChild(bv);
    var bc = h('button', 'btn gold' + (fc ? '' : ' off'), fc ? 'เติม' + RES[r].name + 'เต็มทันที ' + costTag('coin', fc) : 'คลังเต็มแล้ว');
    bc.onclick = function () { if (fillWithCoins(r)) { selectBuilding(b); hud(); } }; row2.appendChild(bc);
    p.appendChild(row2);
  }
  if (d.kind === 'hero') { var hl = h('div', 'p-heroes');
    HERO_KEYS.forEach(function (k) { var u = U[k], open = b.lv > 0 && hqLv() >= u.hq, rest = heroRest(k), cell = h('div', 'hcell' + (open ? '' : ' off'));
      cell.innerHTML = '<span class="portrait" style="' + heroThumb(k) + '"></span><b>' + (u.crown ? '👑 ' : '🎖 ') + u.name + '</b><small>' +
        (!open ? 'ปลดล็อกบ้านเป็ดเลเวล ' + u.hq : rest ? '💫 พักฟื้น ' + clock(rest) : 'Lv' + b.lv + ' · ♥' + fmt(uHp(k, b.lv)) + ' · ⚔' + fmt(uDmg(k, b.lv))) + '</small><small class="sk">⚡ ' + u.skill + ': ' + u.skillTxt + '</small>';
      if (open && rest) { var wk = h('button', 'btn gold', 'ปลุกทันที ' + costTag('coin', coinsFor(rest))); wk.onclick = function () { if (heroWake(k)) { selectBuilding(b, true); hud(); } }; cell.appendChild(wk); }
      hl.appendChild(cell); });
    p.appendChild(hl); }
  if (d.kind === 'train' || d.kind === 'camp') { var a = h('button', 'btn', '🪖 กองทัพ'); a.onclick = armyMenu; row.appendChild(a); }
  p.appendChild(row); p.appendChild(h('div', 'note drag-hint', '✋ แตะค้างแล้วลากเพื่อย้าย' + (group && group.length > 1 ? 'ทั้งแถว' : ''))); p.classList.add('open');
  if (fresh) keepClearOfPanel(b);
}
function keepClearOfPanel(b) { // if the panel would cover the selected building, slide the view up a little
  var top = view.h - $('panel').offsetHeight - 14, s = B[b.k].size, c = toScreen(b.x + s / 2, b.y + s / 2);
  if (c.y > top - cam.s * .6) { cam.y -= c.y - (top - cam.s * .6); dirty = true; }
}

// ---------- build menu ----------
function buildMenu() {
  openSheet('สร้างและพัฒนาฐาน', function (body) {
    var grid = h('div', 'cards');
    Object.keys(B).forEach(function (k) {
      var d = B[k]; if (k === 'hq') return;
      var have = count(k), max = maxCount(k, hqLv()), card = h('button', 'card' + (have >= max ? ' off' : ''));
      var art = d.turret ? ART.turrets[d.turret].stages[0] : d.wall ? null : ART.buildings[d.art].stages[0];
      card.innerHTML = '<span class="n">' + have + '/' + max + '</span>' + (art ? '<span class="thumb" style="background-image:url(assets/' + art.file + ')' + (d.turret ? ';background-size:600% 300%;background-position:80% 100%' : '') + '"></span>' : '<span class="thumb wallthumb">🧱</span>') +
        '<b>' + d.name + '</b>' + (have >= max ? '<small>' + (d.unlock && d.unlock > hqLv() ? 'ปลดล็อกบ้านเป็ดเลเวล ' + d.unlock : 'ครบแล้ว') + '</small>' : costTag(d.res, bCost(k, 1)));
      card.onclick = function () { if (have >= max) { toast(d.unlock && d.unlock > hqLv() ? 'ต้องมีบ้านเป็ดเลเวล ' + d.unlock : 'สร้างครบแล้ว'); return; } closeSheet(); startPlacing(k); };
      grid.appendChild(card);
    });
    body.appendChild(grid);
  });
}
function startPlacing(k) {
  var c = toWorld(view.w / 2, view.h / 2), s = B[k].size; placing = { k: k, x: Math.round(c.x - s / 2), y: Math.round(c.y - s / 2) };
  selectBuilding(null); setMode('place');
}
function setMode(m) {
  var bar = $('confirm'); bar.hidden = m !== 'place';
  $('confirm-text').textContent = m === 'place' ? (B[placing.k].wall && placing.last ? 'วางกำแพงต่อ? ' + count('wall') + '/' + maxCount('wall', hqLv()) : 'ลากเพื่อเลือกที่วาง ' + B[placing.k].name) : '';
  dirty = true;
}
function confirmPlace() {
  if (placing) { var b = placeBuilding(placing.k, placing.x, placing.y); if (!b) return;
    if (B[placing.k].wall && count('wall') < maxCount('wall', hqLv())) {   // offer the next wall on the next tile of the line
      var dir = placing.last ? [Math.sign(b.x - placing.last.x) || 0, Math.sign(b.y - placing.last.y) || 0] : (placing.dir || [1, 0]);
      if (!dir[0] && !dir[1] || dir[0] && dir[1]) dir = placing.dir || [1, 0];
      var nx = nextWallSpot(b.x, b.y, dir); placing.last = { x: b.x, y: b.y }; placing.dir = nx.dir; placing.x = nx.x; placing.y = nx.y; setMode('place'); hud(); return; }
    placing = null; selectBuilding(b); }
  setMode(null); hud();
}
function cancelPlace() { placing = null; moving = null; setMode(null); }

// ---------- army ----------
function armyMenu() {
  openSheet('กองทัพเป็ด', function (body) {
    body.appendChild(h('div', 'army-head', '<b>ค่ายพัก ' + armyUsed() + '/' + armySpace() + '</b>' + (D.queue.length ? ' · กำลังฝึก ' + D.queue.length + ' ตัว (เสร็จใน ' + clock(D.queue[D.queue.length - 1].until - now()) + ')' : '')));
    if (D.queue.length) { var f = h('button', 'btn gold', 'ฝึกเสร็จทันที ' + costTag('coin', coinsFor(D.queue[D.queue.length - 1].until - now()))); f.onclick = function () { finishTraining(); armyMenu(); hud(); }; body.appendChild(f); }
    var grid = h('div', 'cards');
    Object.keys(U).forEach(function (k) {
      if (U[k].hidden) return;
      var u = U[k], locked = (u.unlock || 1) > barracksLv(), card = h('button', 'card troop' + (locked ? ' off' : ''));
      card.innerHTML = '<span class="n">' + (D.army[k] || 0) + '</span><span class="portrait" style="background-image:url(assets/p_' + u.art + '.webp)"></span><b>' + u.name + '</b>' +
        (locked ? '<small>ลานฝึกเลเวล ' + u.unlock + '</small>' : costTag(u.res, u.cost) + '<small>🏠' + u.space + ' · ⏱' + u.time + 'ว.</small>');
      card.onclick = function () { if (locked) { toast('อัปเกรดลานฝึกเป็ดเป็นเลเวล ' + u.unlock); return; } train(k); armyMenu(); hud(); };
      grid.appendChild(card);
    });
    body.appendChild(grid);
  });
}

// ---------- attack ----------
function attackMenu() {
  if (!armyUsed() && !HERO_KEYS.some(function (k) { return heroOpen(k) && !heroRest(k); })) { toast('ยังไม่มีทหาร ไปฝึกที่ลานฝึกเป็ดก่อน'); armyMenu(); return; }
  openSheet('บุกฐานแมว', function (body) {
    body.appendChild(h('p', 'note', 'เลือกด่าน ด่านต่อไปเปิดเมื่อได้อย่างน้อย 1 ดาว'));
    var grid = h('div', 'levels');
    for (var n = 1; n <= Math.min(60, D.raid + 2); n++) (function (n) {
      var b = h('button', 'lvl' + (n > D.raid ? ' off' : ''), '<b>' + n + '</b><small>' + (n < D.raid ? '⭐' : n === D.raid ? 'ใหม่' : '🔒') + '</small>');
      b.onclick = function () { if (n > D.raid) return; closeSheet(); enterRaid(n); }; grid.appendChild(b);
    })(n);
    body.appendChild(grid);
  });
}
// start unpacking every picture this raid can show (troops, their summons, heroes, cats, the cat base) before it is needed
function raidPreload() {
  var files = [], troop = function (k) { var u = U[k] || CATS[k]; if (u && ART.troops[u.art]) files.push(ART.troops[u.art].file); if (U[k]) { if (U[k].split) troop(U[k].split); if (U[k].summon) troop(U[k].summon); } };
  Object.keys(R.army).forEach(function (k) { if (R.army[k] > 0) troop(k); }); Object.keys(R.heroes).forEach(troop);
  R.troops.forEach(function (t) { troop(t.kind); });
  R.buildings.forEach(function (b) { var d = B[b.k], st = stageOf(Math.max(1, b.lv)) - 1;
    if (d.turret && ART.turrets[d.turret]) files.push(ART.turrets[d.turret].stages[st].file);
    else if (d.art && ART.buildings[d.art]) { var ab = ART.buildings[d.art]; files.push(ab.stages[st].file); if (ab.rubble) files.push(ab.rubble.file); } });
  preload(files);
}
function enterRaid(n) { clearFx(); startRaid(n); raidPreload(); screen = 'raid'; sfx('horn'); selectBuilding(null); centerCamera(); sheetPrime(Object.keys(R.army).filter(function (k) { return R.army[k] > 0; }).concat(Object.keys(R.heroes), R.troops.map(function (t) { return t.kind; }))); raidBar(); hud(); dirty = true; }
function heroThumb(k) { // portrait for a hero card: the dog and egret have their own; the colonel is cut from his sheet (front-facing idle)
  var u = U[k]; if (u.art !== 'colonel') return 'background-image:url(assets/p_' + u.art + '.webp)';
  var L = ART.troopLayout, a = ART.troops.colonel, cols = 21; return 'background-image:url(assets/' + a.file + ');background-size:' + cols * 100 + '% ' + L.dirs * 100 + '%;background-position:0% ' + (2 / (L.dirs - 1) * 100) + '%';
}
// An ordinary drop only changes one count. Rebuild when a card disappears
// or a hero changes state, which also refreshes the automatically selected card.
function dropTroop(x, y) {
  var k = R.pick;
  if (!deploy(x, y)) return;
  if (R.pick === k && R.pickedCount) R.pickedCount.textContent = 'x' + R.army[k];
  else raidBar();
}
function raidBar() {
  R.pickedCount = null;
  if (R.pick) {
    var art = ART.troops[U[R.pick].art];
    if (art && !IMG[art.file]) {
      var sheet = img(art.file);
      if (typeof sheet.decode === 'function') Promise.resolve(sheet.decode()).catch(function () {});
    }
  }
  var bar = $('troops'); bar.innerHTML = '';
  HERO_KEYS.forEach(function (k) {
    var hs = R.heroes[k]; if (!hs) return; var u = U[k], dead = hs.unit && hs.unit.dead, st = hs.state === 'ready' ? (R.pick === k ? ' on' : '') : dead || hs.used ? ' off' : ' skill';
    var lab = hs.state === 'ready' ? 'Lv' + hs.lv : dead ? '💫' : hs.used ? '✓' : '⚡สกิล';
    var c = h('button', 'tcard hero' + st, '<span class="cnt">' + lab + '</span><span class="portrait" style="' + heroThumb(k) + '"></span>' + (u.crown ? '<span class="crown">👑</span>' : '<span class="crown">🎖</span>') + '<small>' + u.name + '</small>');
    c.onclick = function () { if (hs.state === 'ready') { R.pick = k; raidBar(); } else if (heroSkill(k)) raidBar(); }; bar.appendChild(c);
  });
  Object.keys(R.army).forEach(function (k) {
    if (!(R.army[k] > 0) && R.pick !== k) return;
    var c = h('button', 'tcard' + (R.pick === k ? ' on' : '') + (R.army[k] > 0 ? '' : ' off'), '<span class="cnt">x' + (R.army[k] || 0) + '</span><span class="portrait" style="background-image:url(assets/p_' + U[k].art + '.webp)"></span><small>' + U[k].name + '</small>');
    if (R.pick === k) R.pickedCount = c.querySelector('.cnt');
    c.onclick = function () { if (R.army[k] > 0) { R.pick = k; raidBar(); } }; bar.appendChild(c);
  });
}
function raidHud() {
  if (!R) return; var s = $('raid-top');
  var html = '<span class="stars">' + '★★★'.slice(0, R.stars || 0) + '<em>' + '★★★'.slice(R.stars || 0) + '</em></span><b>' + Math.floor((R.pct || 0) * 100) + '%</b>' +
    '<span>⏱ ' + clock(R.time * 1000) + '</span><span>' + icon('honey') + fmt(R.taken.honey) + ' ' + icon('veggie') + fmt(R.taken.veggie) + (R.lootTotal.syrup ? ' ' + icon('syrup') + fmt(R.taken.syrup) : '') + '</span>';
  if (html !== R.hudHtml) { s.innerHTML = html; R.hudHtml = html; }
}
function showResult() {
  var r = R.result; sfx(r.stars ? 'win' : 'lose'); openSheet(r.stars ? 'ชนะ!' : 'แพ้แล้ว', function (body) {
    body.appendChild(h('div', 'result-stars', '★★★'.slice(0, r.stars) + '<em>' + '★★★'.slice(r.stars) + '</em>'));
    body.appendChild(h('p', 'result', 'ทำลาย ' + Math.floor(r.pct * 100) + '% · ได้ ' + icon('honey') + fmt(r.got.honey) + ' ' + icon('veggie') + fmt(r.got.veggie) + (r.got.syrup ? ' ' + icon('syrup') + fmt(r.got.syrup) : '') + (r.coins ? ' ' + icon('coin') + r.coins : '')));
    var b = h('button', 'btn green big', 'กลับบ้าน'); b.onclick = goHome; body.appendChild(b);
  });
}
function goHome() { clearFx(); closeSheet(); screen = 'home'; R = null; SMOKE = []; centerCamera(0, hqCenter()); hud(); dirty = true; }

// ---------- sound settings ----------
function soundMenu() {
  openSheet('เสียง', function (body) {
    var row = h('div', 'p-row sound-row');
    var a = h('button', 'btn ' + (SND.on ? 'green' : ''), (SND.on ? '🔊' : '🔇') + ' เสียงเอฟเฟกต์ ' + (SND.on ? 'เปิด' : 'ปิด')); a.onclick = function () { setSound(!SND.on); soundMenu(); sfx('quack'); };
    var m = h('button', 'btn ' + (SND.music ? 'green' : ''), '🎵 เพลง ' + (SND.music ? 'เปิด' : 'ปิด')); m.onclick = function () { setMusic(!SND.music); soundMenu(); };
    row.appendChild(a); row.appendChild(m); body.appendChild(row);
    var gr = h('div', 'p-row sound-row'), gb = h('button', 'btn', '🌳 พื้นแผนที่: ' + GROUNDS[D.ground || 0].name); gb.onclick = function () { groundPicker(false); }; gr.appendChild(gb); body.appendChild(gr);
  });
  $('btn-sound').textContent = SND.on || SND.music ? '🔊' : '🔇';
}
// ---------- map look: chosen on first start (and changeable later from the settings button) ----------
function groundPicker(first) {
  openSheet(first ? 'เลือกพื้นแผนที่ของฐานเป็ด' : 'เปลี่ยนพื้นแผนที่', function (body) {
    if (first) body.appendChild(h('div', 'gp-note', 'เลือกได้ 1 แบบ เปลี่ยนทีหลังได้ที่ปุ่ม 🔊'));
    var grid = h('div', 'gp-grid');
    GROUNDS.forEach(function (T, i) {
      var card = h('div', 'card gp-card' + ((D.ground || 0) === i && !first ? ' on' : ''));
      var pic = groundPreview(i, 220, 124); pic.className = 'gp-pic'; card.appendChild(pic);
      card.appendChild(h('b', '', T.name)); card.appendChild(h('small', '', T.desc));
      card.onclick = function () { D.ground = i; writeSave(); closeSheet(); dirty = true; toast('พื้นแผนที่: ' + T.name); };
      grid.appendChild(card);
    });
    body.appendChild(grid);
  });
  if (first) { var x = $('sheet').querySelector('.x'); if (x) x.onclick = function () { D.ground = 0; writeSave(); closeSheet(); dirty = true; }; }
}
document.addEventListener('click', function (e) { if (e.target.closest && e.target.closest('button')) sfx('tap'); }, true);
