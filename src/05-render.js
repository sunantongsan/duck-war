// Duck War — drawing: grass field with tufts, flowers, rocks and trees, buildings (with contact shadows baked in), turrets that turn, walls that join,
// troops from 8-direction sheets with cartoon squash & stretch, shots and effects. Depth = x + y (back to front).
// Keep the visible terrain and deployment overlay in one screen-sized bitmap.
var groundCache = null;
function drawGround() {
  var raid = screen === 'raid' && R && !R.over && R.pick ? R : null;
  var flash = !!(raid && raid.redFlash && now() - raid.redFlash < 700);
  var revision = raid ? raid.groundRevision : 0, theme = groundTheme();
  if (!groundCache) groundCache = { image: document.createElement('canvas') };
  var cache = groundCache, image = cache.image;
  if (cache.x !== cam.x || cache.y !== cam.y || cache.scale !== cam.s ||
      cache.w !== view.w || cache.h !== view.h || cache.dpr !== view.dpr ||
      cache.raid !== raid || cache.revision !== revision || cache.flash !== flash || cache.theme !== theme) {
    if (image.width !== canvas.width) image.width = canvas.width;
    if (image.height !== canvas.height) image.height = canvas.height;
    var c = image.getContext('2d');
    c.setTransform(view.dpr, 0, 0, view.dpr, 0, 0);
    paintGround(c);
    if (raid) paintDeployZone(c, raid, flash);
    cache.x = cam.x; cache.y = cam.y; cache.scale = cam.s;
    cache.w = view.w; cache.h = view.h; cache.dpr = view.dpr;
    cache.raid = raid; cache.revision = revision; cache.flash = flash; cache.theme = theme;
  }
  ctx.save();
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(image, 0, 0);
  ctx.restore();
}
function paintDeployZone(c, raid, flash) {
  var red = flash ? 'rgba(255,60,60,.24)' : 'rgba(255,80,80,.12)', enc = enclosed();
  c.beginPath();
  for (var y = 0; y < MAP; y++) for (var x = 0; x < MAP; x++) if (enc[y * MAP + x]) { var a = toScreen(x, y), b = toScreen(x + 1, y), d = toScreen(x + 1, y + 1), e = toScreen(x, y + 1); c.moveTo(a.x, a.y); c.lineTo(b.x, b.y); c.lineTo(d.x, d.y); c.lineTo(e.x, e.y); c.closePath(); }
  c.fillStyle = red; c.fill();
  raid.buildings.forEach(function (b) {
    if (!b.dead && b.k !== 'wall' && !enc[(b.y - 1) * MAP + b.x - 1])
      tileDiamond(b.x - 1, b.y - 1, B[b.k].size + 2, red, null, c);
  });
}
// ---------- terrain: 5 map looks the player picks on first start (D.ground); cat bases in raids rotate through them ----------
// Decorations are placed once per look from a fixed seed (same spot every visit) and drawn from small pre-painted stamps,
// so panning only re-blits a few hundred tiny images. Tall things (trees, boulders) live outside the 40x40 base
// so they never sit under a building; inside there are only flat things: tufts, flowers, pebbles, leaves, worn patches.
var GU = 64;                       // stamp resolution: px per tile edge
var GROUNDS = [
  { name: 'สนามฟุตบอล', desc: 'หญ้าตัดเป็นแถบ มีเส้นปูนขาว', outer: ['#4f9132', '#5ea33b', '#4c8c30'], lawn: ['#a6e46e', '#8fd65c', '#79c64f'], rim: '#9c8452', edge: 'rgba(60,95,30,.55)',
    stripes: 'rows', stripeA: .11, chalk: true, grass: ['#3f8423', '#4f9a2e', '#86cf4f'], petals: ['#ffffff', '#ffe14d', '#ff8fb8', '#b79bff', '#ff6a5a'], leaf: ['#8fd457', '#3f8a26', '#2f6d1f'],
    berry: ['#e0313a', '#fff4f8'], trees: ['round', 'fruit', 'pine'], patch: ['rgba(150,120,60,.1)', 'rgba(220,255,160,.1)'],
    inside: { tuft: .07, flower: .025, pebble: .015, rock: .004 }, outside: { tree: .2, bush: .1, rock: .07, stump: .02, mushroom: .02, tuft: .17, flower: .08 } },
  { name: 'ทุ่งดอกไม้', desc: 'ดอกไม้บานทั้งทุ่ง ต้นซากุระสีชมพู', outer: ['#5a9c3a', '#69ad43', '#57953a'], lawn: ['#b4e87e', '#9edc6a', '#8ccd5c'], rim: '#b39a6a', edge: 'rgba(80,120,45,.5)',
    stripes: 'check', stripeA: .06, grass: ['#4a8f2a', '#5aa536', '#98d862'], petals: ['#ffffff', '#ffe14d', '#ff8fb8', '#b79bff', '#ff6a5a', '#7fc8ff'], leaf: ['#9ad95f', '#4a9a2c', '#33722a'],
    berry: ['#ff8fb8', '#fff4f8'], trees: ['blossom', 'blossom', 'round'], patch: ['rgba(255,200,230,.12)', 'rgba(230,255,170,.12)'],
    inside: { tuft: .04, flower: .1, pebble: .01, rock: .003 }, outside: { tree: .16, bush: .14, rock: .04, stump: .01, mushroom: .01, tuft: .12, flower: .25 } },
  { name: 'ป่าสน', desc: 'ป่าสนทึบ เห็ด ตอไม้ หินมีมอส', outer: ['#2f6a27', '#3b7a2e', '#2d6426'], lawn: ['#8fcf5e', '#79bd50', '#66aa45'], rim: '#7d6440', edge: 'rgba(40,75,25,.6)',
    stripes: 'check', stripeA: .05, grass: ['#2f6d1f', '#3f8423', '#73bb46'], petals: ['#ffffff', '#ffe14d'], leaf: ['#6fb84a', '#2c6e22', '#1f5218'],
    berry: ['#3a5fd0', '#e0313a'], trees: ['pine', 'pine', 'pine', 'round'], patch: ['rgba(110,85,50,.12)', 'rgba(200,240,150,.08)'],
    inside: { tuft: .08, flower: .01, pebble: .02, rock: .006, mushroom: .006 }, outside: { tree: .34, bush: .08, rock: .07, stump: .04, mushroom: .05, tuft: .14, flower: .02 } },
  { name: 'ใบไม้ร่วง', desc: 'หญ้าสีทอง ต้นไม้สีส้มแดง ใบไม้โปรย', outer: ['#8a8f35', '#9aa03c', '#858a32'], lawn: ['#d2dc74', '#bfcd62', '#aabc52'], rim: '#9c7448', edge: 'rgba(110,100,40,.55)',
    stripes: 'rows', stripeA: .07, grass: ['#7f8a2a', '#9aa638', '#d6d878'], petals: ['#ffcf3a', '#ff8a2a', '#ffffff'], leaf: ['#ffb347', '#c9521f', '#8e3a17'],
    berry: ['#e0313a', '#ffd23a'], trees: ['autumnO', 'autumnR', 'autumnY', 'pine'], patch: ['rgba(170,110,50,.14)', 'rgba(255,230,140,.12)'], fallen: ['#e8741f', '#cf3d1f', '#f2b330', '#a8551c'],
    inside: { tuft: .05, flower: .008, pebble: .012, rock: .004, leaves: .07 }, outside: { tree: .26, bush: .1, rock: .05, stump: .03, mushroom: .02, tuft: .1, leaves: .2 } },
  { name: 'หิมะ', desc: 'หิมะขาวโพลน ต้นสนมีหิมะเกาะ', outer: ['#c9d8e6', '#d6e2ee', '#c6d5e4'], lawn: ['#edf3f9', '#e0e9f2', '#d3dfeb'], rim: '#a9bccd', edge: 'rgba(120,150,180,.55)',
    stripes: 'check', stripeA: -.035, grass: ['#8a8a5a', '#a6a274', '#c9c7a0'], petals: [], leaf: ['#e9f2f8', '#9fb7c9', '#7f98ad'],
    berry: ['#e0313a', '#e0313a'], trees: ['snowpine', 'snowpine', 'snowpine', 'bare'], patch: ['rgba(150,180,210,.12)', 'rgba(255,255,255,.3)'], snow: true,
    inside: { mound: .035, tuft: .015, pebble: .012, rock: .004 }, outside: { tree: .3, bush: .08, rock: .08, stump: .02, mound: .14, tuft: .05 } },
  { name: 'ทุ่งทานตะวัน', desc: 'ทานตะวันบานเหลืองอร่ามรอบฐาน', outer: ['#5f9a34', '#6ca83b', '#5a9232'], lawn: ['#b9e477', '#a3d765', '#8fc957'], rim: '#a9864e', edge: 'rgba(80,115,40,.55)',
    stripes: 'rows', stripeA: .06, grass: ['#4a8f2a', '#5aa536', '#a2dc66'], petals: ['#ffd21f', '#ffe14d', '#ffffff'], leaf: ['#8fd457', '#3f8a26', '#2f6d1f'],
    berry: ['#ffd21f', '#ffe14d'], trees: ['sunflowers', 'sunflowers', 'sunflowers', 'round'], sun: true, patch: ['rgba(150,120,60,.1)', 'rgba(255,240,150,.12)'],
    inside: { tuft: .05, flower: .04, sunflower: .012, pebble: .01, rock: .003 }, outside: { tree: .3, sunflower: .3, bush: .05, rock: .03, tuft: .1, flower: .06 } },
  { name: 'ทุ่งนาข้าว', desc: 'นาข้าวเขียวขจี คันนา ต้นตาล หุ่นไล่กา', outer: ['#5f9d6b', '#6aa877', '#5b9767'], lawn: ['#c4df7a', '#b0d268', '#9cc458'], rim: '#a88a56', edge: 'rgba(100,110,45,.55)',
    stripes: 'check', stripeA: .05, grass: ['#4f8f22', '#68aa2c', '#b5df5a'], petals: ['#ffffff', '#ffe14d'], leaf: ['#8fd457', '#3f8a26', '#2f6d1f'],
    berry: ['#e0313a', '#ffe14d'], trees: ['palm', 'palm', 'palm', 'round'], paddy: true, patch: ['rgba(150,120,60,.12)', 'rgba(240,255,170,.12)'],
    inside: { tuft: .06, flower: .015, pebble: .012, rock: .004 }, outside: { tree: .07, scarecrow: .006, bush: .015, rice: .9 } }
];
var DECOR = {}, STAMPS = {};
function rnd(seed) { return function () { seed |= 0; seed = seed + 0x6D2B79F5 | 0; var t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
function stampCanvas(w, h, paint) { var cv = document.createElement('canvas'); cv.width = w; cv.height = h; var g = cv.getContext('2d'); try { paint(g, w, h); } catch (e) {} return { cv: cv, w: w, h: h, ax: w / 2, ay: h - 10 }; }
function blade(g, x, y, len, lean, w, col) { g.beginPath(); g.moveTo(x - w, y); g.quadraticCurveTo(x + lean * .3, y - len * .6, x + lean, y - len); g.quadraticCurveTo(x + lean * .3 + w * .4, y - len * .5, x + w, y); g.closePath(); g.fillStyle = col; g.fill(); }
function snowCap(g, cx, cy, rw, rh) { g.fillStyle = '#ffffff'; g.beginPath(); g.ellipse(cx, cy, rw, rh, 0, Math.PI, 0); g.quadraticCurveTo(cx + rw * .5, cy + rh * .9, cx, cy + rh * .4); g.quadraticCurveTo(cx - rw * .5, cy + rh * .9, cx - rw, cy); g.fill(); }
function makeStamps(T) {
  var r = rnd(7), S = {}, G = T.grass;
  function many(n, f) { var out = []; for (var i = 0; i < n; i++) out.push(f(i)); return out; }
  S.tuft = many(4, function (v) { return stampCanvas(56, 46, function (g, w, h) {
    var n = 5 + v * 2; for (var i = 0; i < n; i++) { var x = w / 2 + (r() - .5) * 26, l = 14 + r() * 20 + (v === 3 ? 6 : 0);
      blade(g, x, h - 10, l, (x - w / 2) * .7 + (r() - .5) * 10, 2.6, i % 3 ? G[1] : G[0]); }
    for (i = 0; i < n - 2; i++) { x = w / 2 + (r() - .5) * 18; blade(g, x, h - 10, 10 + r() * 12, (x - w / 2) * .6, 2, G[2]); }
    if (T.snow) { g.fillStyle = '#fff'; g.beginPath(); g.ellipse(w / 2, h - 10, 16, 5, 0, 0, 7); g.fill(); } }); });
  S.flower = T.petals.length ? many(T.petals.length, function (v) { return stampCanvas(60, 42, function (g, w, h) {
    for (var i = 0; i < 6; i++) blade(g, w / 2 + (r() - .5) * 30, h - 10, 6 + r() * 8, (r() - .5) * 8, 1.6, G[1]);
    var n = 3 + Math.floor(r() * 3), col = T.petals[v];
    for (i = 0; i < n; i++) { var x = w / 2 + (r() - .5) * 34, y = h - 14 - r() * 14;
      g.strokeStyle = G[0]; g.lineWidth = 1.4; g.beginPath(); g.moveTo(x, y); g.lineTo(x + (r() - .5) * 3, h - 10); g.stroke();
      g.fillStyle = col; for (var k = 0; k < 5; k++) { var a = k / 5 * 6.283; g.beginPath(); g.ellipse(x + Math.cos(a) * 3, y + Math.sin(a) * 2.3, 2.6, 2.1, 0, 0, 7); g.fill(); }
      g.fillStyle = col === '#ffe14d' || col === '#ffcf3a' ? '#e07a10' : '#ffcc22'; g.beginPath(); g.arc(x, y, 1.7, 0, 7); g.fill(); } }); }) : null;
  S.pebble = many(3, function (v) { return stampCanvas(50, 30, function (g, w, h) {
    var n = 2 + v; for (var i = 0; i < n; i++) { var x = w / 2 + (r() - .5) * 26, y = h - 12 + (r() - .5) * 8, rx = 3 + r() * 4, ry = rx * .62;
      g.fillStyle = T.snow ? 'rgba(90,120,150,.25)' : 'rgba(40,70,20,.28)'; g.beginPath(); g.ellipse(x + 1, y + 1.5, rx + 1, ry + .8, 0, 0, 7); g.fill();
      g.fillStyle = ['#a9a59a', '#bdb7a8', '#8f8b80'][i % 3]; g.beginPath(); g.ellipse(x, y, rx, ry, 0, 0, 7); g.fill();
      g.fillStyle = T.snow ? '#fff' : 'rgba(255,255,255,.45)'; g.beginPath(); g.ellipse(x - rx * .3, y - ry * .35, rx * .45, ry * .35, 0, 0, 7); g.fill(); } }); });
  function boulder(g, cx, by, rw, rh, moss) {
    g.fillStyle = T.snow ? 'rgba(80,110,140,.3)' : 'rgba(30,60,15,.35)'; g.beginPath(); g.ellipse(cx + rw * .15, by, rw * 1.1, rw * .45, 0, 0, 7); g.fill();
    var pts = [], n = 9; for (var i = 0; i < n; i++) { var a = Math.PI + i / (n - 1) * Math.PI, k = .82 + r() * .2; pts.push([cx + Math.cos(a) * rw * k, by - 2 + Math.sin(a) * rh * k]); }
    g.beginPath(); g.moveTo(cx - rw, by - 2); pts.forEach(function (p) { g.lineTo(p[0], p[1]); }); g.lineTo(cx + rw, by - 2); g.quadraticCurveTo(cx, by + rw * .28, cx - rw, by - 2); g.closePath();
    var gr = g.createLinearGradient(cx - rw, by - rh, cx + rw, by); gr.addColorStop(0, '#d2cdbf'); gr.addColorStop(.55, '#9d988b'); gr.addColorStop(1, '#6d695f'); g.fillStyle = gr; g.fill();
    g.strokeStyle = 'rgba(50,45,40,.55)'; g.lineWidth = 2; g.stroke();
    g.strokeStyle = 'rgba(60,55,50,.45)'; g.lineWidth = 1.5; g.beginPath(); g.moveTo(cx - rw * .2, by - rh * .75); g.lineTo(cx + rw * .05, by - rh * .4); g.lineTo(cx - rw * .1, by - rh * .15); g.stroke();
    g.fillStyle = 'rgba(255,255,255,.35)'; g.beginPath(); g.ellipse(cx - rw * .35, by - rh * .6, rw * .25, rh * .14, -.4, 0, 7); g.fill();
    if (T.snow) snowCap(g, cx - rw * .05, by - rh * .72, rw * .78, rh * .3);
    else if (moss) { g.fillStyle = G[1]; g.beginPath(); g.ellipse(cx - rw * .1, by - rh * .86, rw * .42, rh * .14, .1, 0, 7); g.fill(); g.fillStyle = G[2]; g.beginPath(); g.ellipse(cx - rw * .2, by - rh * .9, rw * .22, rh * .07, .1, 0, 7); g.fill(); }
    if (!T.snow) for (i = 0; i < 4; i++) blade(g, cx - rw + r() * rw * 2, by + 2, 6 + r() * 8, (r() - .5) * 6, 1.8, G[1]);
  }
  S.rock = many(4, function (v) { return stampCanvas(110, 90, function (g, w, h) {
    var big = 26 + v * 4; boulder(g, w / 2 + (v % 2 ? 8 : -6), h - 12, big, big * (.8 + r() * .25), v !== 2);
    if (v % 2) boulder(g, w / 2 - 24, h - 9, 13, 11, false); }); });
  var L = T.leaf;
  S.bush = many(3, function (v) { return stampCanvas(120, 90, function (g, w, h) {
    g.fillStyle = T.snow ? 'rgba(80,110,140,.3)' : 'rgba(25,55,10,.35)'; g.beginPath(); g.ellipse(w / 2 + 4, h - 10, 42, 15, 0, 0, 7); g.fill();
    var blobs = many(7, function () { return [w / 2 + (r() - .5) * 56, h - 22 - r() * 26, 14 + r() * 10]; }).sort(function (a, b) { return a[1] - b[1]; });
    blobs.forEach(function (b) { g.fillStyle = L[2]; g.beginPath(); g.arc(b[0], b[1] + 2, b[2], 0, 7); g.fill(); });
    blobs.forEach(function (b) { var gr = g.createRadialGradient(b[0] - b[2] * .4, b[1] - b[2] * .5, 2, b[0], b[1], b[2]); gr.addColorStop(0, L[0]); gr.addColorStop(1, L[1]); g.fillStyle = gr; g.beginPath(); g.arc(b[0], b[1], b[2] - 2, 0, 7); g.fill(); });
    if (v) for (var i = 0; i < 7; i++) { g.fillStyle = T.berry[v - 1]; g.beginPath(); g.arc(w / 2 + (r() - .5) * 50, h - 26 - r() * 26, 2.7, 0, 7); g.fill(); } }); });
  function roundTree(g, cx, by, c0, c1, c2, dots) {
    var blobs = many(8, function () { return [cx + (r() - .5) * 70, by - 96 - r() * 62, 22 + r() * 14]; }).sort(function (a, b) { return a[1] - b[1]; });
    blobs.forEach(function (b) { g.fillStyle = c2; g.beginPath(); g.arc(b[0] + 2, b[1] + 4, b[2], 0, 7); g.fill(); });
    blobs.forEach(function (b) { var gr = g.createRadialGradient(b[0] - b[2] * .45, b[1] - b[2] * .5, 3, b[0], b[1], b[2]); gr.addColorStop(0, c0); gr.addColorStop(1, c1); g.fillStyle = gr; g.beginPath(); g.arc(b[0], b[1], b[2] - 2, 0, 7); g.fill(); });
    if (dots) for (var i = 0; i < 9; i++) { g.fillStyle = dots; g.beginPath(); g.arc(cx + (r() - .5) * 64, by - 100 - r() * 50, 3.5, 0, 7); g.fill(); }
  }
  S.tree = T.trees.map(function (kind) { return stampCanvas(150, 200, function (g, w, h) {
    var cx = w / 2, by = h - 12;
    g.fillStyle = T.snow ? 'rgba(70,100,130,.3)' : 'rgba(20,50,10,.38)'; g.beginPath(); g.ellipse(cx + 14, by, 50, 18, 0, 0, 7); g.fill();
    var tg = g.createLinearGradient(cx - 8, 0, cx + 8, 0); tg.addColorStop(0, '#9a6a3c'); tg.addColorStop(1, '#5e3c1e'); g.fillStyle = tg;
    g.beginPath(); g.moveTo(cx - 9, by); g.quadraticCurveTo(cx - 5, by - 40, cx - 6, by - 70); g.lineTo(cx + 6, by - 70); g.quadraticCurveTo(cx + 5, by - 40, cx + 11, by); g.closePath(); g.fill();
    if (kind === 'pine' || kind === 'snowpine') {
      for (var t = 0; t < 4; t++) { var y0 = by - 40 - t * 30, hw = 46 - t * 9; g.fillStyle = '#245a24'; g.beginPath(); g.moveTo(cx - hw, y0 + 4); g.lineTo(cx, y0 - 54); g.lineTo(cx + hw, y0 + 4); g.quadraticCurveTo(cx, y0 + 14, cx - hw, y0 + 4); g.fill();
        g.fillStyle = '#3d8a33'; g.beginPath(); g.moveTo(cx - hw + 6, y0); g.lineTo(cx, y0 - 50); g.lineTo(cx + 4, y0 + 6); g.quadraticCurveTo(cx - hw * .5, y0 + 8, cx - hw + 6, y0); g.fill();
        if (kind === 'snowpine') { g.fillStyle = '#fff'; g.beginPath(); g.moveTo(cx, y0 - 54); g.lineTo(cx - hw * .55, y0 - 22); g.quadraticCurveTo(cx - hw * .2, y0 - 14, cx, y0 - 24); g.quadraticCurveTo(cx + hw * .3, y0 - 12, cx + hw * .6, y0 - 20); g.closePath(); g.fill();
          g.beginPath(); g.ellipse(cx, y0 + 6, hw * .8, 4, 0, 0, 7); g.fill(); } }
      return; }
    if (kind === 'bare') { g.strokeStyle = '#5e3c1e'; g.lineCap = 'round'; for (var i = 0; i < 6; i++) { var a = -Math.PI / 2 + (r() - .5) * 1.8, y1 = by - 60 - r() * 20, l = 30 + r() * 30;
        g.lineWidth = 5; g.beginPath(); g.moveTo(cx, y1); g.lineTo(cx + Math.cos(a) * l, y1 + Math.sin(a) * l); g.stroke();
        g.fillStyle = '#fff'; g.beginPath(); g.ellipse(cx + Math.cos(a) * l * .7, y1 + Math.sin(a) * l * .7 - 3, 7, 3, a + Math.PI / 2, 0, 7); g.fill(); } return; }
    if (kind === 'sunflowers') { g.clearRect(0, 0, w, h); return sunflowerClump(g, cx, by, 5, 60); }
    if (kind === 'palm') { // a Thai sugar palm: tall thin trunk, round crown of fan leaves
      g.clearRect(0, 0, w, h); g.fillStyle = 'rgba(20,50,20,.32)'; g.beginPath(); g.ellipse(cx + 18, by, 36, 12, 0, 0, 7); g.fill();
      var tg2 = g.createLinearGradient(cx - 6, 0, cx + 6, 0); tg2.addColorStop(0, '#8a6a4a'); tg2.addColorStop(1, '#4e3826'); g.fillStyle = tg2;
      g.beginPath(); g.moveTo(cx - 6, by); g.lineTo(cx - 3.5, by - 140); g.lineTo(cx + 3.5, by - 140); g.lineTo(cx + 7, by); g.closePath(); g.fill();
      g.fillStyle = '#2f5f22'; g.beginPath(); g.arc(cx, by - 150, 15, 0, 7); g.fill();
      for (var f = 0; f < 13; f++) { var fa = -Math.PI + f / 12 * Math.PI * 1.0 + (r() - .5) * .2, fx = cx + Math.cos(fa) * 30, fy = by - 150 + Math.sin(fa) * 26 + (f % 2) * 4;
        g.save(); g.translate(fx, fy); g.rotate(fa + Math.PI / 2); g.fillStyle = f % 2 ? '#3f8a2e' : '#5aa83a';
        g.beginPath(); g.moveTo(0, 14); for (var p2 = 0; p2 <= 6; p2++) { var pa = Math.PI + p2 / 6 * Math.PI; g.lineTo(Math.cos(pa) * 15, Math.sin(pa) * 15 + 2); } g.closePath(); g.fill(); g.restore(); }
      g.fillStyle = '#3a6e28'; for (f = 0; f < 4; f++) { g.beginPath(); g.ellipse(cx + (f - 1.5) * 9, by - 140, 6, 14, (f - 1.5) * .3, 0, 7); g.fill(); }
      return; }
    if (kind === 'blossom') return roundTree(g, cx, by, '#ffd3e6', '#f28ab7', '#c9638f', '#ffffff');
    if (kind === 'autumnO') return roundTree(g, cx, by, '#ffc25a', '#e8741f', '#a84a14');
    if (kind === 'autumnR') return roundTree(g, cx, by, '#ff8a5a', '#cf3d1f', '#8e2614');
    if (kind === 'autumnY') return roundTree(g, cx, by, '#ffe680', '#e9b52a', '#a87a14');
    roundTree(g, cx, by, kind === 'fruit' ? '#b6e264' : '#94d85a', kind === 'fruit' ? '#4e9a2a' : '#3a8526', '#285f1c', kind === 'fruit' ? '#ff9a1f' : null); }); });
  S.stump = [stampCanvas(70, 50, function (g, w, h) { var cx = w / 2, by = h - 12;
    g.fillStyle = 'rgba(30,60,15,.33)'; g.beginPath(); g.ellipse(cx + 3, by, 22, 8, 0, 0, 7); g.fill();
    g.fillStyle = '#7a4f2a'; g.fillRect(cx - 14, by - 16, 28, 16); g.beginPath(); g.ellipse(cx, by, 14, 5, 0, 0, 7); g.fill();
    g.fillStyle = T.snow ? '#ffffff' : '#d9b27a'; g.beginPath(); g.ellipse(cx, by - 16, 14, 5.5, 0, 0, 7); g.fill(); if (!T.snow) { g.strokeStyle = '#a77a45'; g.lineWidth = 1; g.beginPath(); g.ellipse(cx, by - 16, 8, 3, 0, 0, 7); g.stroke(); }
    blade(g, cx - 16, by + 1, 10, -3, 2, G[1]); blade(g, cx + 15, by + 1, 12, 3, 2, G[1]); })];
  S.mushroom = many(2, function (v) { return stampCanvas(46, 40, function (g, w, h) {
    for (var i = 0; i < 2 + v; i++) { var x = w / 2 + (i - .5) * 11, by = h - 10, s = 1 - i * .25;
      g.fillStyle = '#f3ead6'; g.fillRect(x - 2.5 * s, by - 10 * s, 5 * s, 10 * s);
      g.fillStyle = v ? '#c0742f' : '#e2392f'; g.beginPath(); g.ellipse(x, by - 10 * s, 9 * s, 6.5 * s, 0, Math.PI, 0); g.fill();
      g.fillStyle = '#fff'; g.beginPath(); g.arc(x - 3 * s, by - 13 * s, 1.5 * s, 0, 7); g.arc(x + 3 * s, by - 12 * s, 1.2 * s, 0, 7); g.fill(); } }); });
  if (T.sun) S.sunflower = many(3, function (v) { return stampCanvas(70, 90, function (g, w, h) { sunflowerClump(g, w / 2, h - 10, 2 + v, 34 + v * 6); }); });
  function sunflowerClump(g, cx, by, n, tall) {
    g.fillStyle = 'rgba(30,60,15,.3)'; g.beginPath(); g.ellipse(cx + 3, by, 10 + n * 6, 5 + n, 0, 0, 7); g.fill();
    var heads = many(n, function (i) { return [cx + (i - (n - 1) / 2) * 14 + (r() - .5) * 8, by - tall * (.75 + r() * .35), 7 + r() * 2.5]; }).sort(function (a, b) { return a[1] - b[1]; });
    heads.forEach(function (q) {
      g.strokeStyle = '#3f8423'; g.lineWidth = 2.6; g.beginPath(); g.moveTo(q[0], q[1]); g.quadraticCurveTo(q[0] + 3, (q[1] + by) / 2, q[0] - 1, by); g.stroke();
      g.fillStyle = '#4f9a2e'; g.beginPath(); g.ellipse(q[0] - 6, (q[1] + by) / 2 + 4, 6, 3, .5, 0, 7); g.ellipse(q[0] + 6, (q[1] + by) / 2 - 2, 6, 3, -.5, 0, 7); g.fill();
      g.fillStyle = '#ffc21a'; for (var k = 0; k < 12; k++) { var a = k / 12 * 6.283; g.beginPath(); g.ellipse(q[0] + Math.cos(a) * q[2] * .95, q[1] + Math.sin(a) * q[2] * .8, q[2] * .5, q[2] * .22, a, 0, 7); g.fill(); }
      g.fillStyle = '#ffe14d'; for (k = 0; k < 12; k++) { a = (k + .5) / 12 * 6.283; g.beginPath(); g.ellipse(q[0] + Math.cos(a) * q[2] * .8, q[1] + Math.sin(a) * q[2] * .66, q[2] * .4, q[2] * .17, a, 0, 7); g.fill(); }
      g.fillStyle = '#6b3d14'; g.beginPath(); g.ellipse(q[0], q[1], q[2] * .55, q[2] * .48, 0, 0, 7); g.fill();
      g.fillStyle = '#4a2a0c'; g.beginPath(); g.ellipse(q[0] + 1, q[1] + 1, q[2] * .3, q[2] * .25, 0, 0, 7); g.fill(); });
  }
  if (T.paddy) {
    S.rice = many(4, function (v) { return stampCanvas(80, 50, function (g, w, h) {
      g.fillStyle = 'rgba(170,220,235,.45)'; g.beginPath(); g.ellipse(w / 2, h - 10, 30, 10, 0, 0, 7); g.fill();
      for (var row = -1; row <= 1; row++) for (var col = -1; col <= 1; col++) { var x = w / 2 + (col - row) * 9, y = h - 10 + (col + row) * 3.4;
        for (var i = 0; i < 6; i++) blade(g, x + (r() - .5) * 4, y, 12 + r() * 8 + v * 2, (r() - .5) * 10, 1.2, i % 2 ? (v === 3 ? '#c9c43a' : '#5fae2c') : (v === 3 ? '#a8a02a' : '#3f8a1f'));
        if (v === 3) { g.fillStyle = '#e6c24a'; g.beginPath(); g.ellipse(x + 3, y - 18, 2, 4, .4, 0, 7); g.fill(); } } }); });
    S.scarecrow = [stampCanvas(80, 110, function (g, w, h) { var cx = w / 2, by = h - 10;
      g.fillStyle = 'rgba(30,60,30,.3)'; g.beginPath(); g.ellipse(cx + 6, by, 18, 6, 0, 0, 7); g.fill();
      g.fillStyle = '#7a4f2a'; g.fillRect(cx - 2, by - 70, 4, 70); g.fillRect(cx - 26, by - 58, 52, 4);
      g.fillStyle = '#c0392b'; g.beginPath(); g.moveTo(cx - 14, by - 58); g.lineTo(cx + 14, by - 58); g.lineTo(cx + 11, by - 30); g.lineTo(cx - 11, by - 30); g.closePath(); g.fill();
      g.fillStyle = '#e6c56a'; for (var i = 0; i < 5; i++) { g.fillRect(cx - 28 + i * 1.5, by - 56 + i, 3, 8); g.fillRect(cx + 24 - i * 1.5, by - 56 + i, 3, 8); g.fillRect(cx - 10 + i * 4, by - 31, 2, 6); }
      g.fillStyle = '#f2deb0'; g.beginPath(); g.arc(cx, by - 66, 8, 0, 7); g.fill();
      g.fillStyle = '#333'; g.fillRect(cx - 4, by - 68, 2, 2); g.fillRect(cx + 2, by - 68, 2, 2);
      g.fillStyle = '#d9b25a'; g.beginPath(); g.ellipse(cx, by - 72, 16, 4, 0, 0, 7); g.fill(); g.beginPath(); g.moveTo(cx - 8, by - 72); g.lineTo(cx, by - 84); g.lineTo(cx + 8, by - 72); g.fill(); })];
  }
  if (T.fallen) S.leaves = many(4, function () { return stampCanvas(70, 40, function (g, w, h) {
    for (var i = 0; i < 9; i++) { var x = w / 2 + (r() - .5) * 52, y = h - 12 + (r() - .5) * 18; g.fillStyle = T.fallen[Math.floor(r() * T.fallen.length)];
      g.beginPath(); g.ellipse(x, y, 4.5, 2.4, r() * 3, 0, 7); g.fill(); } }); });
  if (T.snow) S.mound = many(3, function (v) { return stampCanvas(80, 44, function (g, w, h) {
    g.fillStyle = 'rgba(120,150,185,.28)'; g.beginPath(); g.ellipse(w / 2 + 4, h - 9, 26 + v * 5, 8, 0, 0, 7); g.fill();
    var gr = g.createLinearGradient(0, h - 30, 0, h - 8); gr.addColorStop(0, '#ffffff'); gr.addColorStop(1, '#d6e4f0'); g.fillStyle = gr;
    g.beginPath(); g.ellipse(w / 2, h - 11, 22 + v * 5, 9 + v * 2, 0, Math.PI, 0); g.quadraticCurveTo(w / 2, h - 5, w / 2 - 22 - v * 5, h - 11); g.fill();
    if (v === 2) { g.fillStyle = '#6b4a2a'; g.fillRect(w / 2 + 8, h - 30, 2, 14); } }); });
  return S;
}
function makeDecor(T, S) {
  var r = rnd(20261124), out = [], M = MAP, E = 9;
  function add(k, x, y, sc) { var list = S[k]; if (!list) return; out.push({ st: list[Math.floor(r() * list.length)], x: x, y: y, s: sc || 1, small: k === 'tuft' || k === 'flower' || k === 'pebble' || k === 'mushroom' || k === 'leaves' || k === 'mound', flip: r() < .5 }); }
  function pick(w, q) { for (var k in w) { if (q < w[k]) return k; q -= w[k]; } return null; }
  var ring = { tuft: .22, flower: .08, pebble: .06 }; if (T.snow) ring = { mound: .14, pebble: .06, tuft: .04 }; if (T.fallen) ring.leaves = .14; if (T.sun) ring.sunflower = .08; if (T.paddy) ring = { tuft: .3, flower: .05, pebble: .05 };
  for (var ty = -E; ty < M + E; ty++) for (var tx = -E; tx < M + E; tx++) {
    var inside = tx >= 0 && ty >= 0 && tx < M && ty < M, x = tx + r(), y = ty + r(), q = r(), k;
    if (inside) { k = pick(T.inside, q); if (k) add(k, x, y, k === 'rock' ? .32 + r() * .12 : k === 'sunflower' ? .55 + r() * .15 : k === 'tuft' ? .8 + r() * .4 : .8 + r() * .3); continue; }
    var edge = Math.max(-tx - 1, -ty - 1, tx - M, ty - M);            // 0 = the ring right next to the base
    var back = tx < 0 || ty < 0;                                      // behind the base on screen: tall trees are fine there
    if (edge === 0) { k = pick(ring, q); if (k) add(k, x, y); continue; }
    k = pick(T.outside, q);
    if (k === 'rice') { add('rice', tx + .5 + (r() - .5) * .08, ty + .5 + (r() - .5) * .08, 1.45); continue; }   // paddy rows: planted on the grid
    if (k === 'tree' && !(back && edge >= 2)) k = 'bush';
    if (k) add(k, x, y, k === 'tree' ? (T.paddy ? 1 + r() * .3 : .85 + r() * .35) : k === 'rice' ? 1 + r() * .15 : k === 'sunflower' ? .9 + r() * .3 : k === 'bush' ? .7 + r() * .5 : k === 'rock' ? .6 + r() * .6 : 1);
  }
  out.sort(function (a, b) { return (a.x + a.y) - (b.x + b.y); });
  var patches = []; for (var i = 0; i < 18; i++) patches.push({ x: 2 + r() * (M - 4), y: 2 + r() * (M - 4), rx: .8 + r() * 1.6, ry: .6 + r() * 1.2, a: r() * 3, dirt: r() < .35 });
  return { items: out, patches: patches };
}
function groundTheme() { var i = screen === 'raid' && R ? (R.level + 1) % GROUNDS.length : (D && D.ground) || 0; return clamp(i | 0, 0, GROUNDS.length - 1); }
function paintGround(c, themeIndex) {
  var ti = themeIndex === undefined ? groundTheme() : themeIndex, T = GROUNDS[ti];
  if (!STAMPS[ti]) STAMPS[ti] = makeStamps(T);
  if (!DECOR[ti]) DECOR[ti] = makeDecor(T, STAMPS[ti]);
  var DEC = DECOR[ti], p = [toScreen(0, 0), toScreen(MAP, 0), toScreen(MAP, MAP), toScreen(0, MAP)], s = cam.s;
  var bg = c.createLinearGradient(0, 0, 0, view.h); bg.addColorStop(0, T.outer[0]); bg.addColorStop(.5, T.outer[1]); bg.addColorStop(1, T.outer[2]);
  c.fillStyle = bg; c.fillRect(0, 0, view.w, view.h);
  if (T.paddy) { // rice paddies: water-green plots split by raised dikes (คันนา)
    c.fillStyle = 'rgba(160,215,230,.18)'; c.beginPath(); for (var px = -12; px < MAP + 12; px += 4) for (var py = -12; py < MAP + 12; py += 4) { var q0 = toScreen(px + .3, py + .3), q1 = toScreen(px + 3.7, py + .3), q2 = toScreen(px + 3.7, py + 3.7), q3 = toScreen(px + .3, py + 3.7); c.moveTo(q0.x, q0.y); c.lineTo(q1.x, q1.y); c.lineTo(q2.x, q2.y); c.lineTo(q3.x, q3.y); c.closePath(); } c.fill();
    c.strokeStyle = '#9c8a52'; c.lineWidth = Math.max(1.5, s * .22); c.lineCap = 'round'; c.beginPath();
    for (var dk = -12; dk <= MAP + 12; dk += 4) { var d0 = toScreen(dk, -12), d1 = toScreen(dk, MAP + 12), d2 = toScreen(-12, dk), d3 = toScreen(MAP + 12, dk); c.moveTo(d0.x, d0.y); c.lineTo(d1.x, d1.y); c.moveTo(d2.x, d2.y); c.lineTo(d3.x, d3.y); } c.stroke();
    c.strokeStyle = 'rgba(190,230,110,.6)'; c.lineWidth = Math.max(1, s * .07); c.stroke(); }
  // a dirt rim around the base (like a trampled edge), then the lawn inside
  var rim = [toScreen(-.35, -.35), toScreen(MAP + .35, -.35), toScreen(MAP + .35, MAP + .35), toScreen(-.35, MAP + .35)];
  c.beginPath(); c.moveTo(rim[0].x, rim[0].y); for (var i = 1; i < 4; i++) c.lineTo(rim[i].x, rim[i].y); c.closePath(); c.fillStyle = T.rim; c.fill();
  c.save(); c.beginPath(); c.moveTo(p[0].x, p[0].y); for (i = 1; i < 4; i++) c.lineTo(p[i].x, p[i].y); c.closePath();
  var g = c.createLinearGradient(p[0].x, p[0].y, p[2].x, p[2].y); g.addColorStop(0, T.lawn[0]); g.addColorStop(.5, T.lawn[1]); g.addColorStop(1, T.lawn[2]); c.fillStyle = g; c.fill();
  c.clip();
  var A = Math.abs(T.stripeA), tone = T.stripeA < 0 ? '120,150,190' : '255,255,255', a, b, d, e;
  function band(x0, y0, x1, y1, x2, y2, x3, y3) { a = toScreen(x0, y0); b = toScreen(x1, y1); d = toScreen(x2, y2); e = toScreen(x3, y3); c.moveTo(a.x, a.y); c.lineTo(b.x, b.y); c.lineTo(d.x, d.y); c.lineTo(e.x, e.y); c.closePath(); }
  if (T.stripes === 'rows') { // wide mown bands, football-pitch style
    c.fillStyle = 'rgba(' + tone + ',' + A + ')'; c.beginPath(); for (var row = 0; row < MAP; row += 4) band(row, 0, row + 2, 0, row + 2, MAP, row, MAP); c.fill();
    c.fillStyle = 'rgba(0,40,0,.035)'; c.beginPath(); for (var col = 0; col < MAP; col += 2) band(0, col, MAP, col, MAP, col + 1, 0, col + 1); c.fill();
  } else { // soft checkerboard
    c.fillStyle = 'rgba(' + tone + ',' + A + ')'; c.beginPath(); for (var x = 0; x < MAP; x++) for (var y = (x & 1); y < MAP; y += 2) band(x, y, x + 1, y, x + 1, y + 1, x, y + 1); c.fill();
  }
  DEC.patches.forEach(function (q) { var o = toScreen(q.x, q.y); c.fillStyle = q.dirt ? T.patch[0] : T.patch[1];
    c.beginPath(); c.ellipse(o.x, o.y, q.rx * s, q.ry * s * ISO, q.a, 0, 7); c.fill(); });
  if (T.chalk) { // white pitch lines: a border, the halfway line and the centre circle
    c.strokeStyle = 'rgba(255,255,255,.55)'; c.lineWidth = Math.max(1.5, s * .08); c.beginPath(); band(1, 1, MAP - 1, 1, MAP - 1, MAP - 1, 1, MAP - 1);
    a = toScreen(MAP / 2, 1); b = toScreen(MAP / 2, MAP - 1); c.moveTo(a.x, a.y); c.lineTo(b.x, b.y); c.stroke();
    var o = toScreen(MAP / 2, MAP / 2); c.beginPath(); c.ellipse(o.x, o.y, 5 * s * H * 2 * .72, 5 * s * H * 2 * ISO * .72, 0, 0, 7); c.stroke(); }
  c.restore();
  c.strokeStyle = T.edge; c.lineWidth = Math.max(1.5, s * .06); c.beginPath(); c.moveTo(p[0].x, p[0].y); for (i = 1; i < 4; i++) c.lineTo(p[i].x, p[i].y); c.closePath(); c.stroke();
  // decorations (culled to the screen; the tiniest ones skipped when zoomed far out)
  var k = s / GU, tiny = s < 13, W = view.w, Hh = view.h;
  c.imageSmoothingEnabled = true;
  for (i = 0; i < DEC.items.length; i++) {
    var it = DEC.items[i]; if (tiny && it.small) continue;
    var q = toScreen(it.x, it.y), st = it.st, z = k * it.s, w = st.w * z, hh = st.h * z;
    if (q.x + w < 0 || q.x - w > W || q.y - hh > Hh || q.y + hh < 0) continue;
    if (it.flip) { c.save(); c.translate(q.x, q.y); c.scale(-1, 1); c.drawImage(st.cv, -st.ax * z, -st.ay * z, w, hh); c.restore(); }
    else c.drawImage(st.cv, q.x - st.ax * z, q.y - st.ay * z, w, hh);
  }
}
// a small picture of a map look for the picker: paints the whole base into a little canvas using a temporary camera
function groundPreview(ti, w, h) {
  var cv = document.createElement('canvas'), dpr = Math.min(2, window.devicePixelRatio || 1); cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr);
  var sv = { w: view.w, h: view.h }, sc = { x: cam.x, y: cam.y, s: cam.s };
  try { view.w = w; view.h = h; cam.s = w / (MAP * 2 * H) * 1.25; cam.x = cam.y = 0; var m = toScreen(MAP / 2, MAP / 2); cam.x = w / 2 - m.x; cam.y = h / 2 - m.y;
    var g = cv.getContext('2d'); g.setTransform(dpr, 0, 0, dpr, 0, 0); paintGround(g, ti); }
  catch (e) {}
  view.w = sv.w; view.h = sv.h; cam.x = sc.x; cam.y = sc.y; cam.s = sc.s;
  return cv;
}
function tileDiamond(x, y, s, fill, stroke, c) {
  c = c || ctx;
  var a = toScreen(x, y), b = toScreen(x + s, y), d = toScreen(x + s, y + s), e = toScreen(x, y + s);
  c.beginPath(); c.moveTo(a.x, a.y); c.lineTo(b.x, b.y); c.lineTo(d.x, d.y); c.lineTo(e.x, e.y); c.closePath();
  if (fill) { c.fillStyle = fill; c.fill(); } if (stroke) { c.strokeStyle = stroke; c.lineWidth = 2; c.stroke(); }
}
function sprite(a, wx, wy, opt) {
  var im = img(a.file); if (!ready(im)) return; var p = toScreen(wx, wy), k = cam.s / a.ppu * ((opt && opt.fit) || 1);
  var sx = 1, sy = 1; if (opt && opt.squash) { sx = opt.squash[0]; sy = opt.squash[1]; }
  ctx.save(); ctx.translate(p.x, p.y); ctx.scale(sx, sy); if (opt && opt.alpha !== undefined) ctx.globalAlpha = opt.alpha;
  ctx.drawImage(im, -a.ax * k, -a.ay * k, im.width * k, im.height * k); ctx.restore();
}
function wobble(o) { // jelly pop when placed / upgraded, squish when hit
  var t = (now() - (o.pop || 0)) / 1000, h = (now() - (o.hitAt || 0)) / 1000, sx = 1, sy = 1;
  if (t < .7) { var w = Math.exp(-6 * t) * Math.sin(t * 22); sx = 1 + w * .18; sy = 1 - w * .22; }
  if (h < .25) { var q = Math.sin(h / .25 * Math.PI) * .07; sx *= 1 + q; sy *= 1 - q; }
  return [sx, sy];
}
function drawBuilding(b, scene) {
  var d = B[b.k], s = d.size, c = { x: b.x + s / 2, y: b.y + s / 2 };
  if (d.wall) return drawWall(b, scene);
  if (b.dead) { var art = d.turret ? null : ART.buildings[d.art].rubble; if (art) sprite(art, c.x, c.y); else drawTurret(b, c, true); if (b.deadAt) smoulder(c, b); return; }
  var stage = stageOf(Math.max(1, b.lv));
  if (d.turret) drawTurret(b, c, false);
  else sprite(ART.buildings[d.art].stages[stage - 1], c.x, c.y, { squash: wobble(b), alpha: b.lv === 0 ? .55 : 1 });
  if (b.up) drawScaffold(b, c);
  else if (b.boost && b.boost > now()) drawBoost(b, c);
  if (b.max && b.hp < b.max * .5) smoke(c, b);
}
function drawTurret(b, c, dead) {
  var tu = ART.turrets[B[b.k].turret], st = tu.stages[stageOf(Math.max(1, b.lv)) - 1], im = img(st.file); if (!ready(im)) return;
  var p = toScreen(c.x, c.y), k = cam.s / st.ppu * (st.fit || tu.fit || 1), cs = st.cell, w = wobble(b);
  var dir = ((Math.round((b.aim === undefined ? 2.36 : b.aim) / (Math.PI / 8)) % 16) + 16) % 16, rec = b.fire ? Math.max(0, 1 - (now() - b.fire) / 220) : 0;
  function cell(n, dx, dy) { ctx.drawImage(im, (n % 6) * cs, Math.floor(n / 6) * cs, cs, cs, -st.ax * k + dx, -st.ay * k + dy, cs * k, cs * k); }
  ctx.save(); ctx.translate(p.x, p.y); ctx.scale(w[0], w[1]); if (b.lv === 0) ctx.globalAlpha = .55;
  if (dead) { cell(17, 0, 0); ctx.restore(); return; }
  cell(16, 0, 0);
  if (st.band) { slingHead(b, st, dir, k, cell); ctx.restore(); return; }
  var ax = Math.cos(b.aim || 0) - Math.sin(b.aim || 0), ay = (Math.cos(b.aim || 0) + Math.sin(b.aim || 0)) * ISO;
  cell(dir, -ax * rec * 4, -ay * rec * 4);
  ctx.restore();
}
// Giant slingshot: the frame stays put; the rubber band is drawn live. While reloading the duck stretches it back
// (band thins as it stretches), on firing it snaps forward past the fork, wobbles and settles; the stone leaves the pouch.
// At home the duck practises: a slow pull, a trembling hold, a dry snap.
function slingPull(b, rate) {
  var raid = screen === 'raid' && R, T = raid ? (R.now || now()) : now(), e, f, loaded = true;
  function spring(t) { return Math.exp(-t * 7) * Math.cos(t * 24); }
  if (raid) {
    if (!b.fire) return { f: 0, loaded: true, e: 9 };
    e = (T - b.fire) / 1000;
    if (e < .45) { f = spring(e); loaded = false; }
    else { var c = clamp((e - .45) / Math.max(.2, rate - .55), 0, 1); f = 1 - (1 - c) * (1 - c); }
    return { f: f, loaded: loaded, e: e };
  }
  var t = ((T / 1000) + (b.id || 0) * 1.37) % 6;
  if (t < 1.3) f = .85 * (1 - Math.pow(1 - t / 1.3, 2));
  else if (t < 1.9) f = .85 + Math.sin(t * 60) * .015;
  else { f = .85 * spring(t - 1.9); }
  return { f: f, loaded: false, e: t < 1.9 ? 9 : t - 1.9 };
}
function slingHead(b, st, dir, k, cell) {
  var B0 = st.band, D = B0.dirs[dir], s = stageOf(Math.max(1, b.lv)), p = slingPull(b, B[b.k].rate);
  var tw = p.e < .3 ? Math.sin(p.e * 70) * (1 - p.e / .3) * 1.6 : 0;   // the fork twangs right after a release
  cell(dir, tw, 0);
  var f = p.f, px = (D.R[0] + (D.P[0] - D.R[0]) * f) * k - st.ax * k, py = (D.R[1] + (D.P[1] - D.R[1]) * f) * k - st.ay * k;
  var w = Math.max(1.1, B0.bw * k * (1 - .35 * Math.max(0, f)));
  var col = s >= 4 ? '#8e1010' : '#d2401c', dark = s >= 4 ? '#3a0505' : '#6e1a08';
  ctx.lineCap = 'round';
  D.tips.forEach(function (t) { var tx = t[0] * k - st.ax * k + tw, ty = t[1] * k - st.ay * k;
    ctx.strokeStyle = dark; ctx.lineWidth = w + 1.2; ctx.beginPath(); ctx.moveTo(tx, ty); ctx.lineTo(px, py); ctx.stroke();
    ctx.strokeStyle = col; ctx.lineWidth = w; ctx.beginPath(); ctx.moveTo(tx, ty); ctx.lineTo(px, py); ctx.stroke(); });
  var pr = B0.pw * k * .55;
  ctx.fillStyle = '#4a2810'; ctx.beginPath(); ctx.ellipse(px, py, pr * 1.25, pr * .85, 0, 0, 7); ctx.fill();
  if (p.loaded) { var rr = pr * .75; ctx.fillStyle = s === 5 ? '#ff7a1a' : s === 4 ? '#2a2a30' : '#8f8b84'; ctx.beginPath(); ctx.arc(px, py - rr * .35, rr, 0, 7); ctx.fill();
    ctx.fillStyle = s === 5 ? 'rgba(255,230,120,.9)' : 'rgba(255,255,255,.35)'; ctx.beginPath(); ctx.arc(px - rr * .3, py - rr * .7, rr * .35, 0, 7); ctx.fill(); }
  if (screen !== 'raid' || (p.f > .02 && p.f < .99) || p.e < .45) dirty = true;   // keep animating while the band moves
}
var WALLSET = null;   // live wall tiles of the scene being drawn, rebuilt each frame (was a scan of every building per wall)
function buildWallSet(list) { var set = new Set(); for (var i = 0; i < list.length; i++) { var o = list[i]; if (o.k === 'wall' && !o.dead) set.add(o.x * 1000 + o.y); } WALLSET = { list: list, set: set }; }
function drawWall(b, scene) {
  var tier = clamp(Math.ceil(b.lv * 6 / MAX_LV), 1, 6), set = ART.walls[tier] || ART.walls['1']; if (!set) return;
  var list = scene.buildings, set2 = WALLSET && WALLSET.list === list ? WALLSET.set : null,
      has = set2 ? function (x, y) { return set2.has(x * 1000 + y); } : function (x, y) { return list.some(function (o) { return o.k === 'wall' && !o.dead && o.x === x && o.y === y; }); };
  if (b.dead) return;
  var cx = b.x + .5, cy = b.y + .5, w = wobble(b), f = {}, fw = { squash: w };
  if (has(b.x, b.y - 1) && set.linky) { sprite(set.linky, cx, cy - .5, f); sprite(set.linky, cx, cy, f); }
  if (has(b.x - 1, b.y) && set.linkx) { sprite(set.linkx, cx - .5, cy, f); sprite(set.linkx, cx - 1, cy, f); }
  if (set.post) sprite(set.post, cx, cy, fw);
}
function drawScaffold(b, c) {
  var p = toScreen(c.x, c.y), left = b.up.until - now(), tot = b.up.until - b.up.start, k = clamp(1 - left / tot, 0, 1);
  var w = 60, x = p.x - w / 2, y = p.y - cam.s * 2.2;
  ctx.fillStyle = 'rgba(20,40,60,.75)'; roundRect(x - 4, y - 18, w + 8, 26, 8); ctx.fill();
  ctx.fillStyle = '#ffe36b'; roundRect(x, y, w * k, 5, 3); ctx.fill();
  ctx.fillStyle = '#fff'; ctx.font = 'bold 12px sans-serif'; ctx.textAlign = 'center'; ctx.fillText('🔨 ' + clock(left), p.x, y - 4);
}
// ---------- smoke: soft billowing puffs that rise, drift, grow, lighten and fade ----------
function puffTexture(rgb, seed) {
  var c = document.createElement('canvas'); c.width = c.height = 96; var g = c.getContext('2d'), r = rng(seed);
  for (var i = 0; i < 11; i++) {
    var x = 48 + (r() - .5) * 36, y = 50 + (r() - .5) * 30, rr = 16 + r() * 16, gr = g.createRadialGradient(x - rr * .25, y - rr * .3, rr * .1, x, y, rr);
    gr.addColorStop(0, 'rgba(' + rgb + ',.62)'); gr.addColorStop(.55, 'rgba(' + rgb + ',.35)'); gr.addColorStop(1, 'rgba(' + rgb + ',0)');
    g.fillStyle = gr; g.beginPath(); g.arc(x, y, rr, 0, 7); g.fill();
  }
  return c;
}
var PUFFS = null, SMOKE = [], FDT = 0;
function puffs() { if (!PUFFS) PUFFS = { dark: [puffTexture('58,54,52', 3), puffTexture('62,58,55', 9)], grey: [puffTexture('140,136,134', 5), puffTexture('150,146,142', 11)], light: [puffTexture('236,232,226', 7), puffTexture('242,238,230', 13)], dust: [puffTexture('214,196,160', 17), puffTexture('226,210,176', 19)] }; return PUFFS; }
var SMOKE_MAX = 140;   // a huge brawl makes lots of dust: keep the newest puffs within budget
function emitSmoke(x, y, z, kind, size, n) {
  n = n || 1; if (SMOKE.length >= SMOKE_MAX) return; if (SMOKE.length > SMOKE_MAX * .6) n = Math.max(1, Math.ceil(n / 3));
  for (var i = 0; i < n; i++) SMOKE.push({ x: x + (Math.random() - .5) * .3 * size, y: y + (Math.random() - .5) * .3 * size, z: z, vz: kind === 'dust' ? .5 + Math.random() * .6 : .7 + Math.random() * .4,
    vx: (Math.random() - .5) * (kind === 'dust' ? 1.6 : .15), vy: (Math.random() - .5) * (kind === 'dust' ? 1.6 : .15), age: 0, life: kind === 'dust' ? .9 + Math.random() * .6 : 2.2 + Math.random() * 1.2,
    size: size * (.45 + Math.random() * .3), kind: kind, tex: Math.random() < .5 ? 0 : 1, rot: Math.random() * 6.28, spin: (Math.random() - .5) * .6 });
}
function drawBoost(b, c) { // little ⚡x2 tag with time left over a boosted maker
  var p = toScreen(c.x, c.y), y = p.y - cam.s * 1.9 - Math.sin(now() / 300) * 3, txt = '⚡x2 ' + clock(b.boost - now());
  ctx.font = 'bold 12px sans-serif'; var w = ctx.measureText(txt).width + 14;
  ctx.fillStyle = 'rgba(255,190,30,.92)'; roundRect(p.x - w / 2, y - 16, w, 20, 10); ctx.fill();
  ctx.fillStyle = '#5a3300'; ctx.textAlign = 'center'; ctx.fillText(txt, p.x, y - 2);
}
function smoke(c, b) { // a damaged building keeps smoking, thicker and darker the lower its HP
  var hurt = 1 - b.hp / b.max; b.smokeT = (b.smokeT || 0) - FDT; if (b.smokeT > 0) return;
  b.smokeT = .32 - hurt * .18; var s = B[b.k].size; emitSmoke(c.x + (Math.random() - .5) * s * .3, c.y + (Math.random() - .5) * s * .3, .5 + s * .25, hurt > .75 ? 'dark' : 'grey', .8 + s * .35);
}
function smoulder(c, b) { // rubble smoulders for a few seconds after it falls
  var t = (now() - b.deadAt) / 1000; if (t > 7) return; b.smokeT = (b.smokeT || 0) - FDT; if (b.smokeT > 0) return;
  b.smokeT = .35 + t * .12; var s = B[b.k].size; emitSmoke(c.x + (Math.random() - .5) * s * .5, c.y + (Math.random() - .5) * s * .5, .2, t < 2 ? 'dark' : 'grey', .5 + s * .22);
}
function drawSmoke(dt) {
  var P = puffs(), dpr = view.dpr;
  SMOKE = SMOKE.filter(function (p) {
    p.age += dt; if (p.age >= p.life) return false; var q = p.age / p.life;
    p.z += p.vz * dt; p.vz *= p.kind === 'dust' ? .96 : .995; p.x += (p.vx + .18) * dt; p.y += (p.vy - .18) * dt; p.vx *= .97; p.vy *= .97; p.rot += p.spin * dt;   // gentle breeze
    var sc = toScreen(p.x, p.y, p.z), r = p.size * cam.s * (.55 + q * (p.kind === 'dust' ? 1.1 : 1.6)), a = Math.min(1, p.age / .18) * (1 - q) * (1 - q);
    var cs = Math.cos(p.rot) * dpr, sn = Math.sin(p.rot) * dpr; ctx.setTransform(cs, sn, -sn, cs, sc.x * dpr, sc.y * dpr);
    var base = P[p.kind][p.tex], lite = P[p.kind === 'dust' ? 'dust' : 'light'][p.tex];
    ctx.globalAlpha = a * (1 - q * .7); ctx.drawImage(base, -r, -r, 2 * r, 2 * r);                     // starts dark and sooty
    if (p.kind !== 'dust') { ctx.globalAlpha = a * q * .8; ctx.drawImage(lite, -r, -r, 2 * r, 2 * r); } // turns pale as it thins out
    return true;
  });
  ctx.globalAlpha = 1; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}
function roundRect(x, y, w, h, r) { ctx.beginPath(); ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r); ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath(); }
function drawTunnel(t) { // a digger underground: a wobbling mound of earth with clods popping off
  var p = toScreen(t.x, t.y), s = cam.s, w = Math.sin(now() / 70 + t.x * 3) * .08;
  ctx.fillStyle = 'rgba(60,40,20,.35)'; ctx.beginPath(); ctx.ellipse(p.x, p.y + s * .04, s * .42, s * .2, 0, 0, 7); ctx.fill();
  ctx.fillStyle = '#8a5a2b'; ctx.beginPath(); ctx.ellipse(p.x, p.y - s * .06, s * (.34 + w), s * (.17 - w * .5), 0, Math.PI, 0); ctx.fill();
  ctx.fillStyle = '#a8743c'; ctx.beginPath(); ctx.ellipse(p.x - s * .05, p.y - s * .1, s * .18, s * .08, 0, Math.PI, 0); ctx.fill();
  for (var i = 0; i < 3; i++) { var q = (now() / 400 + i / 3 + t.x) % 1; ctx.fillStyle = '#6d4520';
    ctx.fillRect(p.x + Math.cos(i * 2.1 + t.y) * s * .3 * q - 2, p.y - s * .1 - Math.sin(q * Math.PI) * s * .35, 4, 4); }
}
function hpBar(x, y, z, k, color) {
  var p = toScreen(x, y, z), w = 34; ctx.fillStyle = 'rgba(20,30,40,.7)'; ctx.fillRect(p.x - w / 2 - 1, p.y - 1, w + 2, 6); ctx.fillStyle = color; ctx.fillRect(p.x - w / 2, p.y, w * k, 4);
}

// ---------- troop sheets sized for the phone ----------
// The original sheets are huge (the colonel's is 5670 px wide, wider than the 4096 px most phone GPUs can hold, so every
// frame he was drawn the slow way, and the dog's and egret's add ~50 MB more). Each sheet is copied once, a row at a time
// in the background, at the size the screen really needs (1/2, 3/4 or full) and cut into pieces no wider than 2048 px.
// Until a copy is ready the original is drawn.
var SHEETS = {}, SHEETQ = [], TILE_W = 2048;
function sheetLevel(need) { return need <= .5 ? .5 : need <= .75 ? .75 : 1; }
function sheetFor(im, cw, ch, need) {
  var level = sheetLevel(need), key = im.src + '@' + level, sh = SHEETS[key];
  if (sh && sh.done) return sh;
  if (!sh) { sh = SHEETS[key] = { im: im, level: level, cw: Math.max(1, Math.round(cw * level)), ch: Math.max(1, Math.round(ch * level)), scw: cw, sch: ch,
      cols: 0, dirs: 0, rows: [], next: 0, done: false };
    sh.per = Math.max(1, Math.floor(TILE_W / sh.cw)); SHEETQ.push(sh); }
  for (var l in { '.5': 1, '.75': 1, '1': 1 }) { var o = SHEETS[im.src + '@' + Number(l)]; if (o && o.done) return o; }   // another size of this sheet while the right one is made
  return null;
}
function sheetWork(rows) { // build a few sheet rows per frame
  while (rows-- > 0 && SHEETQ.length) {
    var sh = SHEETQ[0]; if (!ready(sh.im)) { SHEETQ.push(SHEETQ.shift()); return; }
    if (!sh.cols) { sh.cols = Math.round(sh.im.naturalWidth / sh.scw); sh.dirs = Math.round(sh.im.naturalHeight / sh.sch); }
    var d = sh.next++, tiles = [];
    try {
      for (var c0 = 0; c0 < sh.cols; c0 += sh.per) { var n = Math.min(sh.per, sh.cols - c0), cv = document.createElement('canvas'); cv.width = n * sh.cw; cv.height = sh.ch;
        var g = cv.getContext('2d'); g.imageSmoothingEnabled = true; g.imageSmoothingQuality = 'high';
        g.drawImage(sh.im, c0 * sh.scw, d * sh.sch, n * sh.scw, sh.sch, 0, 0, n * sh.cw, sh.ch); tiles.push(cv); }
    } catch (e) { tiles = null; }
    sh.rows[d] = tiles;
    if (!tiles) { SHEETQ.shift(); delete SHEETS[sh.im.src + '@' + sh.level]; continue; }
    if (sh.next >= sh.dirs) { sh.done = true; SHEETQ.shift();
      Object.keys(SHEETS).forEach(function (k) { var o = SHEETS[k]; if (o !== sh && o.im === sh.im && o.done) delete SHEETS[k]; }); }   // free the other sizes
  }
}
function troopNeed(u, a) { return u.h * cam.s * 1.05 / a.h * view.dpr * 1.35; }   // 1.35: room for the squash & stretch
function sheetPrime(kinds) { // queue the sheets a raid (or the home base) is about to show
  kinds.forEach(function (k) { var u = U[k] || CATS[k]; if (!u) return; var a = ART.troops[u.art], L = ART.troopLayout; if (!a) return;
    sheetFor(img(a.file), a.cw || L.cw, a.ch || L.ch, troopNeed(u, a)); });
}

// ---------- troops ----------
var SHADOW = null;   // one soft ellipse, stamped under every troop (a path + fill per duck was a big cost with hundreds on screen)
function shadowImg() { if (SHADOW) return SHADOW; var c = document.createElement('canvas'); c.width = 64; c.height = 32; var g = c.getContext('2d');
  g.fillStyle = 'rgb(30,60,30)'; g.beginPath(); g.ellipse(32, 16, 31, 15, 0, 0, 7); g.fill(); return SHADOW = c; }
function drawTroop(t) {
  var u = t.side === 'cat' ? CATS[t.kind] : t.side === 'hero' ? HEROES[t.kind] : U[t.kind], a = ART.troops[u.art], L = ART.troopLayout; if (!a) return;
  if (t.under) return drawTunnel(t);
  var im = img(a.file); if (!ready(im)) return;
  var dir = ((Math.round((t.face === undefined ? Math.PI / 2 : t.face) / (Math.PI / 4)) % 8) + 8) % 8, col, n = now(), alpha = 1;
  var atkQ = t.atk ? (n - t.atk) / 520 : 9;
  if (t.dead) { var dq = (n - t.deadAt) / 1000; col = L.death[0] + Math.min(L.death[1] - 1, Math.floor(dq / .14)); alpha = dq < 1.2 ? 1 : Math.max(0, 1 - (dq - 1.2) / .6); if (alpha <= 0) return; }
  else if (atkQ < 1) { var AS = atkStyle(t, u), fr = AS.frames[Math.min(AS.frames.length - 1, Math.floor(atkQ * AS.frames.length))]; col = fr < 0 ? L.idle[0] : L.attack[0] + fr; }
  else if (t.moving) col = L.walk[0] + Math.floor((t.walk || 0) * 9) % L.walk[1];
  else col = L.idle[0] + Math.floor(n / 180 + (t.x * 7 | 0)) % L.idle[1];
  var p = toScreen(t.x, t.y), k = u.h * cam.s * 1.05 / a.h, sx = 1, sy = 1, ox = 0, oy = 0, m = cam.s * 2;
  if (p.x < -m || p.x > view.w + m || p.y < -m * .5 || p.y > view.h + m * 1.5) return;   // off screen: skip
  var alt = airAlt(t), rot = 0, pose = null, fx = Math.cos(t.face || 0) - Math.sin(t.face || 0), fy = (Math.cos(t.face || 0) + Math.sin(t.face || 0)) * ISO, fl = Math.hypot(fx, fy) || 1; fx /= fl; fy /= fl;
  if (u.air && !t.dead && t.moving) rot = Math.sin(n / 300 + t.x) * .05;   // flyers sway as they cruise
  if (!t.dead && atkQ < 1) { // every kind of troop attacks its own way (see ATK_POSE)
    pose = ATK_POSE[atkStyle(t, u).pose](atkQ, t, n);
    ox = fx * (pose.f || 0) * cam.s + (pose.jx || 0) * cam.s; oy = fy * (pose.f || 0) * cam.s - (pose.lift || 0) * ZUP * cam.s;
    sx = pose.sx || 1; sy = pose.sy || 1; rot += pose.rot || 0; if (pose.dir) dir = (dir + pose.dir) % 8;
  } else if (t.moving) { var b = Math.sin((t.walk || 0) * 9 * Math.PI / 4); sy = 1 + .06 * b; sx = 1 - .05 * b; }
  else if (!t.dead) { var br = Math.sin(n / 260 + t.x); sy = 1 + .025 * br; sx = 1 - .02 * br; }
  if (t.born && n - t.born < 400) { var bq = (n - t.born) / 400, bw = Math.exp(-5 * bq) * Math.sin(bq * 18); sx *= 1 + bw * .3; sy *= 1 - bw * .3; }
  if (t.invis > n) alpha *= .35 + Math.sin(n / 90) * .08;   // the queen's feather veil
  var dpr = view.dpr; ctx.globalAlpha = alpha;
  if (u.hero && !t.dead) { // a gold ring on the ground marks a hero; the colonel's shows how far his leadership reaches
    var rr = (u.aura || .75) * cam.s; ctx.strokeStyle = 'rgba(255,205,60,' + (u.aura ? .45 : .7) + ')'; ctx.lineWidth = 2.5; ctx.setLineDash(u.aura ? [8, 6] : []);
    ctx.beginPath(); ctx.ellipse(p.x, p.y, rr, rr * ISO, 0, 0, 7); ctx.stroke(); ctx.setLineDash([]); }
  if (t.fast > n && !t.dead) { ctx.fillStyle = 'rgba(255,120,40,.22)'; ctx.beginPath(); ctx.ellipse(p.x, p.y, .55 * cam.s, .3 * cam.s, 0, 0, 7); ctx.fill(); }
  var sh = u.air ? .3 / (1 + alt * .15) : .32, rw = sh * cam.s * Math.min(u.h, 1.6); ctx.globalAlpha = alpha * (u.air ? .3 : .28); ctx.drawImage(shadowImg(), p.x - rw, p.y - rw * .5, rw * 2, rw); ctx.globalAlpha = alpha;
  oy -= alt * ZUP * cam.s;
  if (pose && pose.under) pose.under(ctx, p.x + ox, p.y + oy + alt * ZUP * cam.s, fx, fy, atkQ, u);   // ground effects (slam ring, whirl)
  var cr = Math.cos(rot), sr = Math.sin(rot);
  ctx.setTransform(dpr * sx * cr, dpr * sx * sr, -dpr * sy * sr, dpr * sy * cr, (p.x + ox) * dpr, (p.y + oy) * dpr);
  var cw = a.cw || L.cw, ch = a.ch || L.ch, sh = sheetFor(im, cw, ch, troopNeed(u, a)), row = sh && sh.rows[dir];
  if (row) { var gi = Math.floor(col / sh.per); ctx.drawImage(row[gi], (col - gi * sh.per) * sh.cw, 0, sh.cw, sh.ch, -a.ax * k, -a.ay * k, cw * k, ch * k); }
  else ctx.drawImage(im, col * cw, dir * ch, cw, ch, -a.ax * k, -a.ay * k, cw * k, ch * k);
  if (u.crown && !t.dead) { var ht = headTop(im, col, dir, cw, ch); if (ht) drawCrown((ht.x - a.ax) * k, (ht.y - a.ay) * k + cam.s * .1, cam.s * .5, u.crown); }
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.globalAlpha = 1;
  if (pose && pose.over) pose.over(ctx, p.x + ox, p.y + oy, fx, fy, atkQ, u, k);   // weapon effects in front (thrust streaks, sparkles)
  if (!t.dead && t.hp < t.max) hpBar(t.x, t.y, u.h * 1.45 + alt, t.hp / t.max, t.side === 'cat' ? '#ff6b5a' : '#7be36a');
}
// ---------- attack styles: which baked frames to use (the shared atlas attack bows forward, which reads as a peck,
// so only birds and the dog keep that frame) and how the body moves. Frames: 0 ready, 1 wind-up, 2 forward bow, 3 recover, -1 idle.
var ATK_KIND = { egret: 'peck', h_queen: 'shoot', dog: 'bite', h_king: 'bite', mop: 'spin', pig: 'stomp', chef: 'throw', witch: 'magic', nurse: 'heal',
  plane: 'dive', kite: 'swoop', prop: 'hover', fan: 'blow', fanlet: 'blow', balloon: 'flail', bomber: 'blast', duckling: 'stab' };
var ATK_HIT = { stab: 'stab', shot: 'shoot', smash: 'smash', bite: 'bite', fire: 'throw', magic: 'magic', heal: 'heal', spin: 'spin', blast: 'blast', cracker: 'flail' };
var ATK_FRAMES = { stab: [1, 0, 1, 0], shoot: [1, 1, 0, 0], smash: [1, 1, 3, 3], stomp: [1, 1, 3, 3], throw: [1, 1, 0, 0], magic: [1, 1, 1, 0], heal: [1, 0, 0, 0],
  spin: [-1], peck: [0, 1, 1, 0], bite: [0, 2, 2, 3], dive: [-1], swoop: [-1], hover: [-1], blow: [-1], flail: [-1], blast: [1, 1, 3, 3], classic: [0, 1, 2, 3] };
function atkStyle(t, u) { var k = t.side === 'hero' ? 'classic' : t.side === 'cat' ? 'smash' : ATK_KIND[t.kind] || ATK_HIT[u.hit] || 'stab'; return { pose: k, frames: ATK_FRAMES[k] }; }
function bell(q, a, b) { return q < a || q > b ? 0 : Math.sin((q - a) / (b - a) * Math.PI); }
function streak(c, x, y, fx, fy, len, w, col, a) { c.strokeStyle = col; c.globalAlpha = a; c.lineWidth = w; c.lineCap = 'round'; c.beginPath(); c.moveTo(x, y); c.lineTo(x + fx * len, y + fy * len); c.stroke(); c.globalAlpha = 1; }
var ATK_POSE = {
  classic: function (q) { var hit = q < .35 ? 0 : Math.sin(Math.min(1, (q - .35) / .45) * Math.PI), up = q < .35 ? Math.sin(q / .35 * Math.PI) : 0;   // the colonel's salute at home
    return { f: .3 * hit, sx: 1 - .14 * up + .3 * hit, sy: 1 + .2 * up - .25 * hit }; },
  stab: function (q) { var j = bell(q, 0, .45) + bell(q, .5, .95); return { f: .32 * j, sx: 1 + .16 * j, sy: 1 - .1 * j,   // two quick fork jabs
    over: function (c, x, y, fx, fy, q, u) { var j2 = Math.max(bell(q, .1, .45), bell(q, .6, .95)); if (j2 > .4) streak(c, x + fx * cam.s * .35, y - u.h * cam.s * .45, fx, fy, cam.s * .45 * j2, 2.5 * cam.s / 40, '#ffffff', j2 * .9); } }; },
  shoot: function (q) { var back = q < .4 ? q / .4 : 0, kick = q >= .4 ? Math.exp(-(q - .4) * 12) : 0;   // draw back, let go, small kick back
    return { f: -.12 * back - .1 * kick, sx: 1 - .08 * back + .12 * kick, sy: 1 + .08 * back - .1 * kick, rot: -.08 * back }; },
  smash: function (q) { var up = q < .45 ? Math.sin(q / .45 * Math.PI / 2) : Math.max(0, 1 - (q - .45) / .1), land = q > .55 ? Math.exp(-(q - .55) * 9) : 0;   // jump, then slam down
    return { lift: .6 * up, f: .12 * up, sx: 1 - .12 * up + .4 * land, sy: 1 + .2 * up - .32 * land,
      under: function (c, x, y, fx, fy, q, u) { if (q < .55) return; var r = (q - .55) / .45; c.strokeStyle = 'rgba(255,240,190,' + (1 - r) * .9 + ')'; c.lineWidth = 4 * cam.s / 40 * (1 - r) + 1;
        c.beginPath(); c.ellipse(x + fx * cam.s * .3, y + fy * cam.s * .3, cam.s * (.3 + r * .9) * Math.min(1.5, u.h), cam.s * (.3 + r * .9) * Math.min(1.5, u.h) * ISO, 0, 0, 7); c.stroke(); } }; },
  stomp: function (q) { var up = bell(q, 0, .5), land = q > .5 ? Math.exp(-(q - .5) * 10) : 0;   // the pig rears up and stamps
    return { lift: .35 * up, rot: -.25 * up, f: .2 * land, sx: 1 + .3 * land, sy: 1 + .1 * up - .25 * land, under: ATK_POSE.smash(Math.max(.55, q)).under }; },
  throw: function (q) { var back = q < .35 ? q / .35 : 0, fling = bell(q, .35, .9);   // lean back, then fling the chili forward
    return { f: -.14 * back + .22 * fling, rot: -.15 * back + .12 * fling, sx: 1 + .12 * fling, sy: 1 - .06 * fling + .06 * back }; },
  magic: function (q, t, n) { var up = Math.sin(q * Math.PI); return { lift: .45 * up, sx: 1 - .05 * up, sy: 1 + .1 * up, dir: Math.floor(q * 8) % 8,   // floats up in a twirl
    over: function (c, x, y, fx, fy, q, u) { for (var i = 0; i < 7; i++) { var a = q * 9 + i * .9, rr = cam.s * (.35 + .2 * Math.sin(q * 6 + i));
      c.fillStyle = 'rgba(200,120,255,' + (1 - q) + ')'; c.beginPath(); c.arc(x + Math.cos(a) * rr, y - u.h * cam.s * .5 + Math.sin(a) * rr * .5, 2.5 * cam.s / 40 + 1, 0, 7); c.fill(); } } }; },
  heal: function (q) { var h = Math.sin(q * Math.PI); return { lift: .28 * h, sy: 1 + .12 * h, sx: 1 - .06 * h,
    under: function (c, x, y, fx, fy, q) { c.fillStyle = 'rgba(120,240,140,' + (.35 * (1 - q)) + ')'; c.beginPath(); c.ellipse(x, y, cam.s * (.4 + q), cam.s * (.4 + q) * ISO, 0, 0, 7); c.fill(); } }; },
  spin: function (q) { return { dir: Math.floor(q * 16) % 8, sx: 1.1, sy: .94, lift: .08 * Math.sin(q * Math.PI),   // the mop whirls round twice
    under: function (c, x, y, fx, fy, q, u) { c.strokeStyle = 'rgba(255,255,255,' + (.7 * Math.sin(q * Math.PI)) + ')'; c.lineWidth = 3 * cam.s / 40 + 1; var r = cam.s * (u.spin || 1);
      for (var i = 0; i < 2; i++) { var a0 = q * 14 + i * Math.PI; c.beginPath(); c.ellipse(x, y - cam.s * .2, r, r * ISO, 0, a0, a0 + 1.6); c.stroke(); } } }; },
  peck: function (q) { var up = q < .4 ? Math.sin(q / .4 * Math.PI / 2) : 0, hit = bell(q, .4, .85);   // the egret rears tall, then stabs its beak down
    return { f: .38 * hit, sx: 1 - .12 * up + .25 * hit, sy: 1 + .25 * up - .2 * hit, lift: .1 * up }; },
  bite: function (q) { var hit = bell(q, .2, .7); return { f: .34 * hit, rot: q > .35 && q < .9 ? Math.sin(q * 55) * .14 : 0, sx: 1 + .15 * hit, sy: 1 - .1 * hit }; },   // lunge and shake
  dive: function (q) { var d = Math.sin(q * Math.PI); return { lift: -.9 * d, f: .35 * d, rot: .3 * d }; },          // paper plane swoops at the target
  swoop: function (q) { var d = Math.sin(q * Math.PI); return { lift: -1.2 * d, f: .25 * d, rot: .18 * d, sx: 1 + .08 * d }; },
  hover: function (q) { var d = Math.sin(q * Math.PI); return { rot: .22 * d, f: .15 * d, jx: Math.sin(q * 70) * .03 }; },   // propeller duck tilts in to fire
  blow: function (q) { return { jx: Math.sin(q * 90) * .04, sx: 1 + .06 * Math.sin(q * 40), sy: 1 - .04 * Math.sin(q * 40),   // the fan shudders and blows
    over: function (c, x, y, fx, fy, q, u) { for (var i = -1; i <= 1; i++) streak(c, x + fx * cam.s * (.3 + q * .6) - fy * i * cam.s * .2, y - u.h * cam.s * .4 + fx * i * cam.s * .1, fx, fy, cam.s * .35, 2, '#e8f6ff', .8 * (1 - q)); } }; },
  flail: function (q) { return { rot: Math.sin(q * 30) * .2, jx: Math.sin(q * 23) * .03, lift: .15 * Math.sin(q * Math.PI) }; },   // dangling balloon duck kicks about as it drops the cracker
  blast: function (q) { var w = Math.sin(q * 50) * .5 + .5; return { sx: 1 + .2 * q + .06 * w, sy: 1 + .15 * q - .06 * w }; }
};

// Where the crown sits = top of the head in each animation frame. Finding it means reading pixels back from the image,
// which took ~30 ms a time on phones and froze raids whenever the king or queen showed a new pose. Now whole sheet rows
// are measured a little at a time while nothing is happening (mostly at home), and remembered on the phone for good.
var HEADS_KEY = 'duckwar.heads.v1', HEADS = (function () { try { return JSON.parse(localStorage.getItem(HEADS_KEY)) || {}; } catch (e) { return {}; } })(), HEADQ = [], HEADT = 0;
function headKey(im) { return String(im.src || '').split('/').pop(); }
function headTop(im, col, dir, cw, ch) {
  var f = headKey(im), key = f + '|' + col + '|' + dir; if (key in HEADS) return HEADS[key];
  headQueue(im, dir, cw, ch);
  for (var c = 0; c < 32; c++) { var k2 = f + '|' + c + '|' + dir; if (HEADS[k2]) return HEADS[k2]; }   // borrow another pose facing the same way until measured
  return null;
}
function headQueue(im, dir, cw, ch) { var id = headKey(im) + '#' + dir; if (HEADQ.some(function (q) { return q.id === id; })) return; HEADQ.push({ id: id, im: im, dir: dir, cw: cw, ch: ch }); }
function headPrepare() { // crowned heroes: queue every direction of their sheets
  HERO_KEYS.forEach(function (k) { var u = U[k]; if (!u.crown) return; var a = ART.troops[u.art]; if (!a) return; var L = ART.troopLayout, im = img(a.file);
    for (var d = 0; d < L.dirs; d++) if (!(headKey(im) + '|0|' + d in HEADS)) headQueue(im, d, a.cw || L.cw, a.ch || L.ch); });
}
function headWork(raid) { // measure one sheet row now and then: often at home, rarely mid-raid
  if (!HEADQ.length) return; var t = now(); if (t < HEADT) return;
  if (raid) return;   // reading pixels back stalls the GPU: only ever at home (mid-raid the crown borrows a measured pose)
  var q = HEADQ[0]; if (!ready(q.im)) { HEADT = t + 300; return; }
  HEADQ.shift(); HEADT = t + 120;
  var cw = q.cw, ch = q.ch, cols = Math.floor(q.im.naturalWidth / cw), f = headKey(q.im);
  try {
    var c = headWork.c || (headWork.c = document.createElement('canvas')); c.width = cw * cols; c.height = ch; var g = c.getContext('2d', { willReadFrequently: true });
    g.clearRect(0, 0, c.width, ch); g.drawImage(q.im, 0, q.dir * ch, cw * cols, ch, 0, 0, cw * cols, ch); var d = g.getImageData(0, 0, cw * cols, ch).data, W = cw * cols;
    for (var col = 0; col < cols; col++) {
      // the king and queen wear the army helmet: its olive green marks the head (the dog's tail sticks up higher than his head)
      var scan = function (test) { for (var y = 0; y < ch; y++) { var sx = 0, n = 0; for (var x = col * cw; x < col * cw + cw; x++) { var i = (y * W + x) * 4; if (test(d[i], d[i + 1], d[i + 2], d[i + 3])) { sx += x - col * cw; n++; } } if (n >= 4) return { x: sx / n, y: y }; } return null; };
      HEADS[f + '|' + col + '|' + q.dir] = scan(function (R0, G, B0, A) { return A > 200 && G > R0 + 8 && G > B0 + 18 && G < 170 && R0 < 150; }) || scan(function (R0, G, B0, A) { return A > 140; });
    }
  } catch (e) { for (var k = 0; k < cols; k++) HEADS[f + '|' + k + '|' + q.dir] = null; }
  if (!HEADQ.length) try { localStorage.setItem(HEADS_KEY, JSON.stringify(HEADS)); } catch (e) {}
}
function drawCrown(x, y, s, kind) { // gold crown that sits on the king's and queen's heads, bobbing with them
  ctx.save(); ctx.translate(x, y + Math.sin(now() / 220) * s * .05);
  var w = s, hgt = s * (kind === 'queen' ? .8 : .62);
  ctx.fillStyle = '#ffcc2e'; ctx.strokeStyle = '#8a5a00'; ctx.lineWidth = Math.max(1.2, s * .07);
  ctx.beginPath(); ctx.moveTo(-w / 2, 0); ctx.lineTo(-w / 2, -hgt);
  var pts = kind === 'queen' ? 5 : 3;
  for (var i = 0; i < pts; i++) { var x0 = -w / 2 + w * i / pts, x1 = x0 + w / pts; ctx.lineTo(x0 + w / pts / 2, -hgt * (kind === 'queen' ? .55 : .45)); ctx.lineTo(x1, -hgt); }
  ctx.lineTo(w / 2, 0); ctx.closePath(); ctx.fill(); ctx.stroke();
  ctx.fillStyle = kind === 'queen' ? '#5ad1ff' : '#e8322a'; ctx.beginPath(); ctx.arc(0, -hgt * .3, s * .1, 0, 7); ctx.fill();
  ctx.fillStyle = 'rgba(255,255,255,.6)'; ctx.fillRect(-w / 2 + s * .08, -s * .14, w - s * .16, s * .06);
  ctx.restore();
}
// ---------- shots and effects ----------
var SHOT = { rock: ['#8a7a6a', 6], pebble: ['#c9b38f', 3.5], egg: ['#fff6e0', 7], water: ['#6fd0ff', 5], chili: ['#ff3d1f', 5], cracker: ['#e8322a', 4], magic: ['#b46bff', 5], feather: ['#ffffff', 4] };
function drawShot(s) {
  var p = toScreen(s.x, s.y, s.z), g = toScreen(s.x, s.y), st = SHOT[s.kind] || SHOT.pebble, r = st[1] * cam.s / 40;
  ctx.fillStyle = 'rgba(0,0,0,.18)'; ctx.beginPath(); ctx.ellipse(g.x, g.y, r, r * .5, 0, 0, 7); ctx.fill();
  ctx.fillStyle = st[0]; ctx.strokeStyle = 'rgba(60,40,20,.6)'; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.arc(p.x, p.y, r, 0, 7); ctx.fill(); ctx.stroke();
  if (s.kind === 'cracker') { ctx.fillStyle = '#ffd23f'; ctx.fillRect(p.x - r * .5, p.y - r * 1.6, r, r * .6); ctx.fillStyle = 'rgba(255,220,120,' + (.5 + Math.random() * .5) + ')'; ctx.beginPath(); ctx.arc(p.x, p.y - r * 2, r * .5, 0, 7); ctx.fill(); }   // lit fuse
  if (s.kind === 'feather') { var ang = Math.atan2((s.ty - s.fy) * ISO, s.tx - s.fx); ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(ang); ctx.fillStyle = '#fff'; ctx.strokeStyle = '#9fb3c8'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.ellipse(0, 0, r * 2.4, r * .7, 0, 0, 7); ctx.fill(); ctx.stroke(); ctx.beginPath(); ctx.moveTo(-r * 2.4, 0); ctx.lineTo(r * 2.4, 0); ctx.stroke(); ctx.restore(); }
  if (s.kind === 'water') { ctx.fillStyle = 'rgba(160,230,255,.5)'; ctx.beginPath(); ctx.arc(p.x - r * .3, p.y - r * .3, r * .45, 0, 7); ctx.fill(); }
}
function drawFx(f, dt) {
  f.life -= dt; var q = 1 - f.life / f.max; if (f.life <= 0) return false; var s = cam.s / 40;
  if (f.t === 'chip') { f.vz -= 9 * dt; f.x += f.vx * dt; f.y += f.vy * dt; f.z = Math.max(0, f.z + f.vz * dt); if (f.z === 0 && f.vz < 0) { f.vz *= -.45; f.vx *= .6; f.vy *= .6; }
    var p = toScreen(f.x, f.y, f.z); ctx.fillStyle = f.color; ctx.globalAlpha = Math.min(1, f.life * 3); ctx.fillRect(p.x - 2.5 * s, p.y - 2.5 * s, 5 * s, 4 * s); ctx.globalAlpha = 1; return true; }
  var c = toScreen(f.x, f.y);
  if (f.t === 'boom') { if (!f.done) { f.done = 1; var sz = f.size || 2; emitSmoke(f.x, f.y, .2, 'dust', .6 + sz * .35, 10 + sz * 3); emitSmoke(f.x, f.y, .4, 'dark', .5 + sz * .3, 4); } return false; }
  if (f.t === 'puff') { if (!f.done) { f.done = 1; emitSmoke(f.x, f.y, .1, 'dust', .55, f.small ? 2 : 5); } return false; }
  if (f.t === 'hit') { ctx.strokeStyle = f.kind === 'smash' ? 'rgba(255,240,150,' + (1 - q) + ')' : 'rgba(255,255,255,' + (1 - q) + ')'; ctx.lineWidth = 3 * s;
    ctx.beginPath(); for (var j = 0; j < 5; j++) { var b = j * 1.26 + q; ctx.moveTo(c.x + Math.cos(b) * 6 * s, c.y - 14 * s + Math.sin(b) * 4 * s); ctx.lineTo(c.x + Math.cos(b) * (10 + q * 14) * s, c.y - 14 * s + Math.sin(b) * (6 + q * 9) * s); } ctx.stroke(); return true; }
  if (f.t === 'splat') { ctx.fillStyle = f.kind === 'egg' ? 'rgba(255,214,80,' + (.7 * (1 - q)) + ')' : f.kind === 'chili' ? 'rgba(255,90,30,' + (.7 * (1 - q)) + ')' : 'rgba(130,210,255,' + (.6 * (1 - q)) + ')';
    ctx.beginPath(); ctx.ellipse(c.x, c.y, (f.size || 1) * cam.s * .7 * (.5 + q), (f.size || 1) * cam.s * .35 * (.5 + q), 0, 0, 7); ctx.fill(); return true; }
  if (f.t === 'heal') { ctx.fillStyle = 'rgba(110,230,120,' + (1 - q) + ')'; ctx.font = 'bold ' + (16 * s | 0) + 'px sans-serif'; ctx.textAlign = 'center'; ctx.fillText('+', c.x, c.y - 30 * s - q * 20 * s); return true; }
  return true;
}
