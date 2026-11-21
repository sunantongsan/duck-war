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
function selectBuilding(b) {
  selected = b; var p = $('panel'); p.innerHTML = ''; if (!b) { p.classList.remove('open'); return; } var d = B[b.k];
  var lvTxt = b.lv ? 'เลเวล ' + b.lv : 'กำลังสร้าง';
  p.appendChild(h('div', 'p-title', '<b>' + d.name + '</b><small>' + lvTxt + '</small>'));
  var info = [];
  if (d.kind === 'make') info.push(icon(d.make) + ' ' + fmt(rate(b)) + '/ชม.');
  if (d.kind === 'store') info.push('จุ ' + icon(d.store) + ' ' + fmt(d.cap * Math.pow(1.6, b.lv - 1)));
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
  var mv = h('button', 'btn', '↔ ย้าย'); mv.onclick = function () { moving = { b: b, x: b.x, y: b.y }; p.classList.remove('open'); setMode('move'); }; row.appendChild(mv);
  if (d.kind === 'make' && b.lv > 0 && !b.up) {
    var on = b.boost && b.boost > now(), row2 = h('div', 'p-row boost'), r = d.make, fc = fillCoins(r);
    var bv = h('button', 'btn video', on ? '▶ ต่อเวลา x2 <small>⚡ ' + clock(b.boost - now()) + ' · เหลือ ' + videosLeft() + '</small>' : '▶ ดูวิดีโอ ผลิต x2 1 ชม. <small>เหลือ ' + videosLeft() + '</small>');
    bv.onclick = function () { boostWithVideo(b, function () { selectBuilding(b); }); }; row2.appendChild(bv);
    var bc = h('button', 'btn gold' + (fc ? '' : ' off'), fc ? 'เติม' + RES[r].name + 'เต็มทันที ' + costTag('coin', fc) : 'คลังเต็มแล้ว');
    bc.onclick = function () { if (fillWithCoins(r)) { selectBuilding(b); hud(); } }; row2.appendChild(bc);
    p.appendChild(row2);
  }
  if (d.kind === 'train' || d.kind === 'camp') { var a = h('button', 'btn', '🪖 กองทัพ'); a.onclick = armyMenu; row.appendChild(a); }
  p.appendChild(row); p.classList.add('open');
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
  var bar = $('confirm'); bar.hidden = !(m === 'place' || m === 'move');
  $('confirm-text').textContent = m === 'place' ? 'ลากเพื่อเลือกที่วาง ' + B[placing.k].name : m === 'move' ? 'ลากเพื่อย้าย ' + B[moving.b.k].name : '';
  dirty = true;
}
function confirmPlace() {
  if (placing) { var b = placeBuilding(placing.k, placing.x, placing.y); if (!b) return; if (B[placing.k].wall && count('wall') < maxCount('wall', hqLv())) { placing.x += 1; setMode('place'); hud(); return; } placing = null; selectBuilding(b); }
  if (moving) { if (!moveBuilding(moving.b, moving.x, moving.y)) { toast('วางตรงนี้ไม่ได้'); return; } moving = null; }
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
      var u = U[k], locked = (u.unlock || 1) > barracksLv(), card = h('button', 'card troop' + (locked ? ' off' : ''));
      card.innerHTML = '<span class="n">' + (D.army[k] || 0) + '</span><span class="portrait p-' + u.art + '"></span><b>' + u.name + '</b>' +
        (locked ? '<small>ลานฝึกเลเวล ' + u.unlock + '</small>' : costTag(u.res, u.cost) + '<small>🏠' + u.space + ' · ⏱' + u.time + 'ว.</small>');
      card.onclick = function () { if (locked) { toast('อัปเกรดลานฝึกเป็ดเป็นเลเวล ' + u.unlock); return; } train(k); armyMenu(); hud(); };
      grid.appendChild(card);
    });
    body.appendChild(grid);
  });
}

// ---------- attack ----------
function attackMenu() {
  if (!armyUsed()) { toast('ยังไม่มีทหาร ไปฝึกที่ลานฝึกเป็ดก่อน'); armyMenu(); return; }
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
function enterRaid(n) { startRaid(n); screen = 'raid'; selectBuilding(null); centerCamera(); raidBar(); hud(); dirty = true; }
function raidBar() {
  var bar = $('troops'); bar.innerHTML = '';
  Object.keys(R.army).forEach(function (k) {
    if (!(R.army[k] > 0) && R.pick !== k) return;
    var c = h('button', 'tcard' + (R.pick === k ? ' on' : '') + (R.army[k] > 0 ? '' : ' off'), '<span class="cnt">x' + (R.army[k] || 0) + '</span><span class="portrait p-' + U[k].art + '"></span><small>' + U[k].name + '</small>');
    c.onclick = function () { if (R.army[k] > 0) { R.pick = k; raidBar(); } }; bar.appendChild(c);
  });
}
function raidHud() {
  if (!R) return; var s = $('raid-top');
  s.innerHTML = '<span class="stars">' + '★★★'.slice(0, R.stars || 0) + '<em>' + '★★★'.slice(R.stars || 0) + '</em></span><b>' + Math.floor((R.pct || 0) * 100) + '%</b>' +
    '<span>⏱ ' + clock(R.time * 1000) + '</span><span>' + icon('honey') + fmt(R.taken.honey) + ' ' + icon('veggie') + fmt(R.taken.veggie) + (R.lootTotal.syrup ? ' ' + icon('syrup') + fmt(R.taken.syrup) : '') + '</span>';
}
function showResult() {
  var r = R.result; openSheet(r.stars ? 'ชนะ!' : 'แพ้แล้ว', function (body) {
    body.appendChild(h('div', 'result-stars', '★★★'.slice(0, r.stars) + '<em>' + '★★★'.slice(r.stars) + '</em>'));
    body.appendChild(h('p', 'result', 'ทำลาย ' + Math.floor(r.pct * 100) + '% · ได้ ' + icon('honey') + fmt(r.got.honey) + ' ' + icon('veggie') + fmt(r.got.veggie) + (r.got.syrup ? ' ' + icon('syrup') + fmt(r.got.syrup) : '') + (r.coins ? ' ' + icon('coin') + r.coins : '')));
    var b = h('button', 'btn green big', 'กลับบ้าน'); b.onclick = goHome; body.appendChild(b);
  });
}
function goHome() { closeSheet(); screen = 'home'; R = null; SMOKE = []; centerCamera(0, hqCenter()); hud(); dirty = true; }
