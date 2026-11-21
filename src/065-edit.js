// Duck War — editing the base the Clash of Clans way:
//  * tap a building to select it, then drag it; it drops where you let go if the spot is free,
//    otherwise it waits there in red until you drag it somewhere free (tap elsewhere = put it back)
//  * walls: "select row" grabs the whole straight run, which then drags, rotates and upgrades together
//  * building walls: after each wall the next one is offered on the next tile along the same line
var group = null;   // buildings selected together (a wall row); null = just `selected`
function selection() { return group && group.length ? group : selected ? [selected] : []; }
function footprintFreeFor(k, x, y, ignore) {
  var s = B[k].size; if (x < 1 || y < 1 || x + s > MAP - 1 || y + s > MAP - 1) return false;
  return !D.buildings.some(function (b) { if (ignore.indexOf(b) >= 0) return false; var t = B[b.k].size; return x < b.x + t && b.x < x + s && y < b.y + t && b.y < y + s; });
}
function moveOk(m) {
  var items = m.items.map(function (i) { return i.b; });
  return m.items.every(function (i, n) {
    if (!footprintFreeFor(i.b.k, i.x, i.y, items)) return false;
    return m.items.every(function (j, q) { if (q === n) return true; var s = B[i.b.k].size, t = B[j.b.k].size; return !(i.x < j.x + t && j.x < i.x + s && i.y < j.y + t && j.y < i.y + s); });
  });
}
function startDrag(w) { // press on a selected building: pick up the whole selection
  var sel = selection(); if (!sel.length) return false;
  var hit = sel.some(function (b) { var s = B[b.k].size; return w.x >= b.x - .3 && w.x < b.x + s + .3 && w.y >= b.y - .3 && w.y < b.y + s + .3; });
  if (!hit && !(moving && moving.items.some(function (i) { var s = B[i.b.k].size; return w.x >= i.x - .3 && w.x < i.x + s + .3 && w.y >= i.y - .3 && w.y < i.y + s + .3; }))) return false;
  if (!moving) moving = { items: sel.map(function (b) { return { b: b, x: b.x, y: b.y, ox: b.x, oy: b.y }; }) };
  moving.from = { x: w.x, y: w.y }; moving.base = moving.items.map(function (i) { return { x: i.x, y: i.y }; });
  $('panel').classList.remove('open'); sfx('tap'); return true;
}
function dragTo(w) {
  if (!moving || !moving.from) return; var dx = Math.round(w.x - moving.from.x), dy = Math.round(w.y - moving.from.y);
  moving.items.forEach(function (i, n) { i.x = moving.base[n].x + dx; i.y = moving.base[n].y + dy; }); dirty = true;
}
function dropDrag() {
  if (!moving) return; moving.from = null;
  if (moving.items.every(function (i) { return i.x === i.ox && i.y === i.oy; })) { moving = null; reopenPanel(); return; }
  if (moveOk(moving)) { moving.items.forEach(function (i) { i.b.x = i.x; i.b.y = i.y; i.b.pop = now() - 300; }); moving = null; writeSave(); sfx('thud'); buzz('light'); reopenPanel(); }
  else { sfx('error'); toast('วางตรงนี้ไม่ได้ ลากไปที่ว่าง'); }   // stays red where it was dropped
}
function cancelMove() { moving = null; dirty = true; }
function reopenPanel() { if (selected) selectBuilding(selected, true); }
// ---------- wall rows ----------
function wallAt(x, y) { return D.buildings.find(function (b) { return b.k === 'wall' && b.x === x && b.y === y; }); }
function wallRow(w) {
  function run(dx, dy) { var out = [w], x = w.x + dx, y = w.y + dy, b; while ((b = wallAt(x, y))) { out.push(b); x += dx; y += dy; } x = w.x - dx; y = w.y - dy; while ((b = wallAt(x, y))) { out.unshift(b); x -= dx; y -= dy; } return out; }
  var a = run(1, 0), b = run(0, 1), pick = a.length > b.length ? a : b.length > a.length ? b : (group && group[0] && group[0].x === group[group.length - 1].x ? a : b);
  return pick;
}
function selectRow() { if (!selected || selected.k !== 'wall') return; group = wallRow(selected); toast('เลือกกำแพง ' + group.length + ' ก้อน · ลากเพื่อย้ายทั้งแถว'); selectBuilding(selected, true); keepClearOfPanel(selected); dirty = true; }
function rotateRow() { // turn the row 90° round the wall you tapped
  if (!group || group.length < 2) return; var p = selected;
  moving = { items: group.map(function (b) { var rx = b.x - p.x, ry = b.y - p.y; return { b: b, x: p.x - ry, y: p.y + rx, ox: b.x, oy: b.y }; }) };
  dropDrag(); dirty = true;
}
function upgradeRow() {
  var lv = Math.min.apply(null, group.map(function (b) { return b.lv; })), ws = group.filter(function (b) { return b.lv === lv; });
  if (lv + 1 > bMaxLv('wall', hqLv())) { toast('อัปเกรดบ้านเป็ดก่อน'); return; }
  var cost = bCost('wall', lv + 1) * ws.length; if (!pay(B.wall.res, cost)) return;
  ws.forEach(function (b) { b.lv = lv + 1; b.pop = now(); }); writeSave(); sfx('done'); toast('อัปเกรดกำแพง ' + ws.length + ' ก้อนเป็นเลเวล ' + (lv + 1)); selectBuilding(selected, true); hud();
}
// ---------- placing walls one after another along a line ----------
function nextWallSpot(x, y, dir) {
  var tries = [dir, [dir[1], dir[0]], [-dir[1], -dir[0]], [-dir[0], -dir[1]]];
  for (var i = 0; i < tries.length; i++) { var nx = x + tries[i][0], ny = y + tries[i][1]; if (footprintFree('wall', nx, ny)) return { x: nx, y: ny, dir: tries[i] }; }
  return { x: x + dir[0], y: y + dir[1], dir: dir };
}
