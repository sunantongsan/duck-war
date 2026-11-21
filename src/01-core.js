// Duck War — core: canvas, isometric camera (matches the Blender game camera: yaw 45°, elevation 48.6°),
// touch/mouse input, image loading, save data. Everything else builds on these helpers.
var $ = function (id) { return document.getElementById(id); };
var clamp = function (v, a, b) { return v < a ? a : v > b ? b : v; };
var now = function () { return Date.now(); };
var TEST = !!(window.DuckContent && (window.DuckContent.channel === 'test' || /test/.test(window.DuckContent.label || ''))) || /[?&]test/.test(location.search);
var ISO = 0.75, H = Math.SQRT1_2, ZUP = 0.661;           // sin/cos of the 48.6° camera elevation
var MAP = 24;                                            // the base is MAP x MAP tiles

var canvas = $('world'), ctx = canvas.getContext('2d');
var cam = { x: 0, y: 0, s: 40 };                         // s = screen px per world unit (one tile edge)
var view = { w: 800, h: 400, dpr: 1 };
function fit() {
  var r = canvas.getBoundingClientRect(); view.dpr = Math.min(2, window.devicePixelRatio || 1);
  view.w = r.width; view.h = r.height;
  canvas.width = Math.round(r.width * view.dpr); canvas.height = Math.round(r.height * view.dpr);
  dirty = true;
}
window.addEventListener('resize', fit);
function toScreen(x, y, z) { return { x: view.w / 2 + cam.x + (x - y) * H * cam.s, y: view.h / 2 + cam.y + ((x + y) * H * ISO - (z || 0) * ZUP) * cam.s }; }
function toWorld(sx, sy) {
  var a = (sx - view.w / 2 - cam.x) / (H * cam.s), b = (sy - view.h / 2 - cam.y) / (H * ISO * cam.s);
  return { x: (a + b) / 2, y: (b - a) / 2 };
}
function centerCamera(scale) {
  cam.s = scale || clamp(Math.min(view.w / (MAP * 1.0), view.h / (MAP * 0.55)), 22, 90); cam.x = cam.y = 0;
  var c = toScreen(MAP / 2, MAP / 2); cam.x += view.w / 2 - c.x; cam.y += view.h / 2 - c.y;
}

// ---------- images ----------
var IMG = {};
function img(file) {
  var i = IMG[file]; if (i) return i;
  i = IMG[file] = new Image(); i.onload = function () { dirty = true; }; i.src = 'assets/' + file; return i;
}
function ready(i) { return i && i.complete && i.naturalWidth > 0; }

// ---------- input: one finger pans, two fingers zoom, a short touch is a tap ----------
var pointers = new Map(), gesture = null, dirty = true;
var input = { tap: null, drag: null };   // the active screen sets these
canvas.addEventListener('pointerdown', function (e) {
  canvas.setPointerCapture(e.pointerId); pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
  if (pointers.size === 1) gesture = { x: e.clientX, y: e.clientY, cx: cam.x, cy: cam.y, t: now(), moved: false, id: e.pointerId, hold: null };
  else gesture = { pinch: dist2(), s: cam.s, cx: cam.x, cy: cam.y, mid: mid2() };
  if (pointers.size === 1 && input.press) { var w = toWorld(e.clientX - rect().left, e.clientY - rect().top); gesture.hold = input.press(w, e); }
});
canvas.addEventListener('pointermove', function (e) {
  if (!pointers.has(e.pointerId)) return; pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
  if (!gesture) return;
  if (gesture.pinch) {
    var s = clamp(gesture.s * dist2() / gesture.pinch, 14, 140), m = gesture.mid, r = rect();
    var wx = toWorld(m.x - r.left, m.y - r.top); cam.s = s; var after = toScreen(wx.x, wx.y);
    cam.x += m.x - r.left - after.x; cam.y += m.y - r.top - after.y; dirty = true; return;
  }
  var dx = e.clientX - gesture.x, dy = e.clientY - gesture.y;
  if (Math.abs(dx) + Math.abs(dy) > 8) gesture.moved = true;
  if (gesture.moved && gesture.hold && input.drag) { var r2 = rect(); input.drag(toWorld(e.clientX - r2.left, e.clientY - r2.top)); return; }
  if (gesture.moved) { cam.x = gesture.cx + dx; cam.y = gesture.cy + dy; dirty = true; }
});
function endPointer(e) {
  if (!pointers.has(e.pointerId)) return; pointers.delete(e.pointerId);
  if (gesture && !gesture.pinch && !gesture.moved && now() - gesture.t < 450 && input.tap) {
    var r = rect(); input.tap(toWorld(e.clientX - r.left, e.clientY - r.top), { x: e.clientX - r.left, y: e.clientY - r.top });
  }
  if (gesture && gesture.hold && input.release) input.release();
  if (pointers.size === 0) gesture = null;
}
canvas.addEventListener('pointerup', endPointer); canvas.addEventListener('pointercancel', endPointer);
canvas.addEventListener('wheel', function (e) {
  e.preventDefault(); var r = rect(), w = toWorld(e.clientX - r.left, e.clientY - r.top);
  cam.s = clamp(cam.s * (e.deltaY < 0 ? 1.1 : 0.9), 14, 140); var a = toScreen(w.x, w.y);
  cam.x += e.clientX - r.left - a.x; cam.y += e.clientY - r.top - a.y; dirty = true;
}, { passive: false });
function rect() { return canvas.getBoundingClientRect(); }
function dist2() { var p = Array.from(pointers.values()); return Math.hypot(p[0].x - p[1].x, p[0].y - p[1].y) || 1; }
function mid2() { var p = Array.from(pointers.values()); return { x: (p[0].x + p[1].x) / 2, y: (p[0].y + p[1].y) / 2 }; }

// ---------- haptics, toast ----------
function buzz(kind) { try { if (window.DuckHaptics) window.DuckHaptics.tap(kind || 'light'); } catch (e) {} }
function toast(text) { var t = $('toast'); t.textContent = text; t.classList.add('show'); clearTimeout(toast.h); toast.h = setTimeout(function () { t.classList.remove('show'); }, 2200); }
function fmt(n) { n = Math.floor(n); return n >= 999500 ? (Math.max(1, n / 1e6)).toFixed(n >= 1e7 ? 0 : 1).replace(/\.0$/, '') + 'M' : n >= 1e4 ? (n / 1e3).toFixed(n >= 99950 ? 0 : 1).replace(/\.0$/, '') + 'K' : n.toLocaleString(); }
function clock(ms) { var s = Math.max(0, Math.ceil(ms / 1000)), h = Math.floor(s / 3600), m = Math.floor(s % 3600 / 60); return h ? h + 'ชม. ' + m + 'น.' : m ? m + 'น. ' + (s % 60) + 'ว.' : s + 'ว.'; }

// ---------- save ----------
var SAVE_KEY = 'duckwar.save.v1';
function loadSave() { try { var d = JSON.parse(localStorage.getItem(SAVE_KEY)); if (d && d.v === 1) return d; } catch (e) {} return null; }
function writeSave() { try { localStorage.setItem(SAVE_KEY, JSON.stringify(D)); } catch (e) {} }
