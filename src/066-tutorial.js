// Duck War — Clash-style tutorial: the duck colonel walks a new player through building, training and the first raid,
// then drops a one-time tip whenever something new unlocks. D.tut = step number while it runs, 'done' afterwards; D.tips = tips seen.
var BUILD_TITLE = 'สร้างและพัฒนาฐาน', ARMY_TITLE = 'กองทัพเป็ด', ATTACK_TITLE = 'บุกฐานแมว';
var TUT_EL = null, TUT_SHOWN = -1, TUT_KEY = '', TUT_BASE = {}, TIP = null;
function tutQ(sel) { return document.querySelector(sel); }
function sheetOpen() { return $('sheet').classList.contains('open'); }
function sheetIs(title) { return sheetOpen() && $('sheet').dataset.title === title; }
function hqB() { return D.buildings.find(function (b) { return b.k === 'hq'; }); }
function bRect(b) { // a building on the canvas, as a screen box the finger can point at
  if (!b) return null; var s = B[b.k].size, c = toScreen(b.x + s / 2, b.y + s / 2), r = canvas.getBoundingClientRect(), w = s * cam.s * 1.25;
  return { left: r.left + c.x - w / 2, top: r.top + c.y - w * .75, width: w, height: w * .9 };
}
function tutBase(key, fn) { if (TUT_BASE[key] === undefined) TUT_BASE[key] = fn(); return TUT_BASE[key]; }
function topUp(r, n) { if (D.res[r] < n) D.res[r] = n; }   // the tutorial never stalls on a short purse
function forkCount() { return (D.army.fork || 0) + D.queue.filter(function (q) { return q.k === 'fork'; }).length; }
function newSling() { return D.buildings.find(function (b) { return b.id === TUT_BASE.slingId; }); }
function closeOr(el) { return sheetOpen() ? tutQ('#sheet .x') : el; }

// home: only on the base screen with nothing else open (e.g. waits for the first-start map picker)
var TUT_STEPS = [
  { home: true, say: 'ว่าไงทหาร! ข้าคือผู้พันเป็ด ผู้บังคับบัญชาฐานนี้ ต่อจากนี้ข้าจะพาเจ้าฝึกเองนะทหาร!', ok: 'รับทราบครับผู้พัน!' },
  { home: true, say: 'นี่คือบ้านเป็ด หัวใจของฐานเรา ยิ่งอัปเกรดสูง ยิ่งสร้างอะไรใหม่ๆ ได้เยอะนะทหาร', ok: 'ต่อไป', at: function () { return bRect(hqB()); } },
  { skip: function () { return count('slingshot') >= maxCount('slingshot', hqLv()); },
    enter: function () { TUT_BASE.sling = count('slingshot'); topUp(B.slingshot.res, bCost('slingshot', 1)); },
    say: function () {
      if (placing) return placing.k === 'slingshot' ? 'ลากไปวางตรงไหนก็ได้ที่ชอบ แล้วกด ✓ วาง นะทหาร!' : 'กด ✕ ยกเลิกอันนี้ก่อน แล้วไปสร้างหนังสติ๊กยักษ์นะทหาร';
      if (sheetIs(BUILD_TITLE)) return 'เลือก "หนังสติ๊กยักษ์" นะทหาร!';
      return 'พวกแมวจ้องจะมาขโมยน้ำผึ้งเราอยู่! กด 🔨 สร้าง แล้วสร้างหนังสติ๊กยักษ์เพิ่มอีกอันนะทหาร';
    },
    at: function () { return placing ? $(placing.k === 'slingshot' ? 'btn-ok' : 'btn-no') : sheetIs(BUILD_TITLE) ? tutQ('#sheet .card[data-k="slingshot"]') : closeOr($('btn-build')); },
    done: function () {
      if (count('slingshot') <= tutBase('sling', function () { return count('slingshot'); })) return false;
      TUT_BASE.slingId = Math.max.apply(null, D.buildings.filter(function (b) { return b.k === 'slingshot'; }).map(function (b) { return b.id; })); return true;
    } },
  { skip: function () { var b = newSling(); return !b || b.lv > 0; },
    say: 'เป็ดช่างกำลังสร้างอยู่ รอแป๊บเดียว! ถ้ารีบ แตะที่อาคารแล้วกด "เสร็จทันที" ใช้เหรียญเป็ดได้นะทหาร',
    at: function () { return selected && selected === newSling() ? tutQ('#panel .btn.gold') : bRect(newSling()); },
    done: function () { var b = newSling(); return !b || b.lv > 0; } },
  { skip: function () { return armyUsed(true) + U.fork.space > armySpace(); },
    enter: function () { TUT_BASE.forks = forkCount(); topUp(U.fork.res, U.fork.cost * 5); },
    say: function () { return sheetIs(ARMY_TITLE) ? 'แตะ "เป็ดส้อม" เพื่อฝึกทหารเพิ่ม แตะหลายทีได้หลายตัวนะทหาร!' : 'หนังสติ๊กพร้อมแล้ว! ต่อไปฝึกทหาร กด 🪖 กองทัพ นะทหาร'; },
    at: function () { return sheetIs(ARMY_TITLE) ? tutQ('#sheet .card[data-k="fork"]') : closeOr($('btn-army')); },
    done: function () { return forkCount() > tutBase('forks', forkCount); } },
  { say: function () { return sheetIs(ATTACK_TITLE) ? 'เลือกด่าน ' + D.raid + ' นะทหาร!' : sheetOpen() ? 'ปิดหน้าต่างก่อน แล้วกด ⚔ บุก! นะทหาร' : 'ทหารพร้อมรบแล้ว! กด ⚔ บุก! ไปถล่มฐานแมวกันนะทหาร!'; },
    at: function () { return sheetIs(ATTACK_TITLE) ? tutQ('#sheet .lvl[data-n="' + D.raid + '"]') : closeOr($('btn-attack')); },
    done: function () { return screen === 'raid'; } },
  { skip: function () { return screen !== 'raid'; },
    say: 'แตะพื้นหญ้ารอบฐานแมวเพื่อปล่อยเป็ดลงสนาม! แตะค้างไว้จะปล่อยรัวๆ เลยนะทหาร',
    at: function () { return $('troops'); },
    done: function () { return screen !== 'raid' || !!(R && R.troops.some(function (t) { return t.side === 'duck'; })); } },
  { hidden: true, done: function () { return screen === 'home'; } },   // let them fight in peace until they are back home
  { home: true, say: 'เก่งมากทหาร! น้ำผึ้งกับน้ำผักที่ปล้นมาจากแมว เอาไปอัปเกรดฐานกัน ลองแตะบ้านเป็ดดูนะทหาร',
    at: function () { return bRect(hqB()); }, done: function () { return selected && selected.k === 'hq'; } },
  { say: 'กด "อัปเกรด" ได้เลยถ้าน้ำผึ้งพอ ถ้ายังไม่พอ ไปบุกแมวเพิ่ม หรือรอปั๊มน้ำผึ้งผลิตนะทหาร', ok: 'รับทราบ!',
    at: function () { return selected && selected.k === 'hq' ? tutQ('#panel .btn.green') || $('panel') : bRect(hqB()); } },
  { home: true, say: 'ฐานนี้ฝากเจ้าด้วยนะทหาร! มีของใหม่เมื่อไหร่ ผู้พันจะมาบอกเอง ก๊าบ!', ok: 'ก๊าบ!' }
];
// one-time tips once the tutorial is over (each shown on the home screen when it first applies)
var TIPS = [
  { id: 'hq2', when: function () { return hqLv() >= 2; }, at: function () { return $('btn-build'); },
    say: 'บ้านเป็ดเลเวล 2 แล้วทหาร! ตอนนี้สร้างกำแพงกับหอกล่องเป็ดยิงไกลได้แล้ว กด 🔨 สร้าง ไปดูกันนะทหาร' },
  { id: 'hq3', when: function () { return hqLv() >= 3; }, at: function () { return $('btn-build'); },
    say: 'บ้านเป็ดเลเวล 3! สร้างศาลาผู้นำเป็ดได้แล้ว ผู้นำเป็ดจะได้ออกรบกับเรา ห้องทดลองกับป้อมเป็ดปิ้งขนมปังก็มาแล้วนะทหาร' },
  { id: 'hq5', when: function () { return hqLv() >= 5; }, at: function () { return $('btn-build'); },
    say: 'เลเวล 5 แล้วทหาร! สร้างเตาเคี่ยวไซรัปกับโหลไซรัปได้แล้ว ไซรัปเอาไว้ฝึกทหารตัวพิเศษนะทหาร' },
  { id: 'boost', any: true, when: function () { return selected && B[selected.k].kind === 'make' && selected.lv > 0 && !selected.up; }, at: function () { return tutQ('#panel .btn.video'); },
    say: 'ดูวิดีโอสั้นๆ ให้อาคารนี้ผลิตเร็ว x2 ได้ 1 ชั่วโมง หรือใช้เหรียญเป็ดเติมให้เต็มคลังทันทีก็ได้นะทหาร' }
];

function tutStart() { // new players get the tutorial; a base that is already past it only keeps future tips
  if (!D.tips) D.tips = {};
  if (D.tut !== undefined) return;
  var veteran = D.raid > 1 || hqLv() > 1 || D.buildings.length > 8;
  D.tut = veteran ? 'done' : 0;
  if (veteran) TIPS.forEach(function (t) { if (t.id !== 'boost' && t.when()) D.tips[t.id] = 1; });
  writeSave();
}
function tutReplay() { D.tut = 0; TUT_BASE = {}; TIP = null; TUT_SHOWN = -1; writeSave(); closeSheet(); }
function tutAdvance() { D.tut = typeof D.tut === 'number' ? D.tut + 1 : 'done'; if (D.tut >= TUT_STEPS.length) D.tut = 'done'; TUT_SHOWN = -1; writeSave(); }
function tutSkip() { D.tut = 'done'; TUT_SHOWN = -1; writeSave(); tutHide(); }
function tipDone() { if (TIP) D.tips[TIP.id] = 1; TIP = null; TUT_SHOWN = -1; writeSave(); tutHide(); }

function tutUi() {
  if (TUT_EL) return TUT_EL;
  var box = h('div', 'top'); box.id = 'tut';
  var face = h('span', 'tut-face'); face.setAttribute('style', heroThumb('h_colonel'));
  var talk = h('div', 'tut-talk', '<b>🎖 ผู้พันเป็ด</b>'), p = h('p'), btns = h('div', 'tut-btns');
  talk.appendChild(p); talk.appendChild(btns); box.appendChild(face); box.appendChild(talk);
  var ring = h('div', 'tut-ring'), hand = h('div', 'tut-hand', '👇');
  document.body.appendChild(ring); document.body.appendChild(box); document.body.appendChild(hand);
  TUT_EL = { box: box, p: p, btns: btns, ring: ring, hand: hand }; return TUT_EL;
}
// already hidden: no DOM writes every frame
function tutHide() { if (!TUT_EL || TUT_KEY === '' && !TUT_EL.box.classList.contains('show')) return; TUT_EL.box.classList.remove('show'); TUT_EL.ring.style.display = TUT_EL.hand.style.display = 'none'; TUT_KEY = ''; }
function tutShow(text, ok, onOk, skippable) {
  var u = tutUi(), key = text + '|' + (ok || '') + '|' + !!skippable;
  if (key !== TUT_KEY) {
    TUT_KEY = key; u.p.textContent = text; u.btns.innerHTML = '';
    if (skippable) { var s = h('button', 'skip', 'ข้ามการสอน'); s.onclick = tutSkip; u.btns.appendChild(s); }
    if (ok) { var b = h('button', 'btn green', ok); b.onclick = onOk; u.btns.appendChild(b); }
  }
  u.box.classList.add('show');
}
function rectOf(t) {
  if (!t) return null; var r = t.getBoundingClientRect ? t.getBoundingClientRect() : t;
  return r && r.width > 0 && r.height > 0 ? r : null;
}
var TUT_SCROLLED = null;
function tutPoint(target) { // ring + bouncing finger on the target; the speech box moves to the other half of the screen
  if (target && target !== TUT_SCROLLED && target.closest && target.closest('.sheet-body')) {   // a card further down the menu: bring it into view once
    TUT_SCROLLED = target; try { target.scrollIntoView({ block: 'end', behavior: 'smooth' }); } catch (e) {}
  }
  var u = TUT_EL, r = rectOf(target), vh = window.innerHeight || view.h;
  var low = r && r.top + r.height / 2 > vh * .5;
  u.box.classList.toggle('top', !r || low); u.box.classList.toggle('bottom', !!r && !low);
  if (!r) { u.ring.style.display = u.hand.style.display = 'none'; return; }
  var pad = 5; u.ring.style.display = 'block';
  u.ring.style.left = (r.left - pad) + 'px'; u.ring.style.top = (r.top - pad) + 'px'; u.ring.style.width = (r.width + pad * 2) + 'px'; u.ring.style.height = (r.height + pad * 2) + 'px';
  var up = r.top < 56; u.hand.textContent = up ? '👆' : '👇'; u.hand.style.display = 'block';
  u.hand.style.left = (r.left + r.width / 2 - 20) + 'px'; u.hand.style.top = (up ? r.top + r.height + 2 : r.top - 46) + 'px';
}
function tutStep() { // the current step, skipping any that no longer apply; null when the tutorial is over
  for (var guard = 0; typeof D.tut === 'number' && guard < TUT_STEPS.length; guard++) {
    var st = TUT_STEPS[D.tut];
    if (!st) { D.tut = 'done'; writeSave(); return null; }
    if (TUT_SHOWN !== D.tut) { TUT_SHOWN = D.tut; if (st.enter) st.enter(); if (!st.hidden && !st.home) sfx('colonel'); }
    if (st.done && st.done()) { tutAdvance(); continue; }   // done first: finishing a step can also make its skip test true
    if (st.skip && st.skip()) { tutAdvance(); continue; }
    return st;
  }
  return null;
}
function tutTick() {
  if (!D) return;
  var st = tutStep();
  if (st) {
    if (st.hidden || st.home && (screen !== 'home' || sheetOpen() || placing)) { tutHide(); return; }
    var fresh = TUT_KEY === '';
    tutShow(typeof st.say === 'function' ? st.say() : st.say, st.ok, tutAdvance, D.tut === 0);
    if (fresh && st.home) sfx('colonel');
    tutPoint(st.at ? st.at() : null); return;
  }
  if (D.tut !== 'done') return;
  if (!TIP && screen === 'home' && !sheetOpen() && !placing && !moving) TIP = TIPS.find(function (t) { return !D.tips[t.id] && (t.any || !selected) && t.when(); }) || null;
  if (!TIP || screen !== 'home' || sheetOpen()) { tutHide(); return; }
  if (TIP.any && !TIP.when()) { TIP = null; tutHide(); return; }   // the panel it talks about was closed
  if (TUT_KEY === '') sfx('colonel');
  tutShow(TIP.say, 'รับทราบ!', tipDone, false); tutPoint(TIP.at());
}
