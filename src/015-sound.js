// Duck War — sound: every effect and the music are synthesized with Web Audio (no audio files, nothing to download).
// sfx('name') plays an effect; busy sounds are rate-limited so a 40-duck brawl stays pleasant.
var SND = { ctx: null, master: null, sfxBus: null, musicBus: null, last: {}, on: true, music: true, noiseBuf: null, voices: 0 };
(function () { try { var s = JSON.parse(localStorage.getItem('duckwar.sound') || '{}'); if (s.on === false) SND.on = false; if (s.music === false) SND.music = false; } catch (e) {} })();
function soundSave() { try { localStorage.setItem('duckwar.sound', JSON.stringify({ on: SND.on, music: SND.music })); } catch (e) {} }
function audio() {
  if (SND.ctx) return SND.ctx;
  var AC = window.AudioContext || window.webkitAudioContext; if (!AC) return null;
  var c = SND.ctx = new AC();
  SND.master = c.createGain(); SND.master.gain.value = .9;
  var comp = c.createDynamicsCompressor(); comp.threshold.value = -14; comp.ratio.value = 6; SND.master.connect(comp); comp.connect(c.destination);
  SND.sfxBus = c.createGain(); SND.sfxBus.gain.value = SND.on ? 1 : 0; SND.sfxBus.connect(SND.master);
  SND.musicBus = c.createGain(); SND.musicBus.gain.value = SND.music ? .32 : 0; SND.musicBus.connect(SND.master);
  var n = c.sampleRate, b = c.createBuffer(1, n, n), d = b.getChannelData(0); for (var i = 0; i < n; i++) d[i] = Math.random() * 2 - 1; SND.noiseBuf = b;
  loadSamples(c);
  return c;
}
// browsers (and the Android WebView) only allow sound after a touch
['pointerdown', 'touchstart', 'keydown'].forEach(function (ev) { window.addEventListener(ev, function () { var c = audio(); if (c && c.state !== 'running') c.resume(); startMusic(); }, { passive: true }); });
document.addEventListener('visibilitychange', function () { if (!SND.ctx) return; if (document.hidden) SND.ctx.suspend(); else SND.ctx.resume(); });

function env(g, t, a, peak, dec) { g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(peak, t + a); g.gain.exponentialRampToValueAtTime(0.0001, t + a + dec); }
function tone(o) { // o: f, f2, type, vol, a, d, at, q (bandpass formant), dest
  var c = SND.ctx, t = c.currentTime + (o.at || 0), osc = c.createOscillator(), g = c.createGain(), out = g;
  osc.type = o.type || 'sine'; osc.frequency.setValueAtTime(o.f, t); if (o.f2) osc.frequency.exponentialRampToValueAtTime(o.f2, t + (o.a || .005) + (o.d || .15));
  if (o.vib) { var l = c.createOscillator(), lg = c.createGain(); l.frequency.value = o.vib; lg.gain.value = o.vibAmt || 20; l.connect(lg); lg.connect(osc.frequency); l.start(t); l.stop(t + (o.a || .005) + (o.d || .15) + .05); }
  osc.connect(g);
  if (o.bp) { var f = c.createBiquadFilter(); f.type = 'bandpass'; f.frequency.value = o.bp; f.Q.value = o.q || 3; g.connect(f); out = f; }
  out.connect(o.dest || SND.sfxBus); env(g, t, o.a || .005, o.vol || .3, o.d || .15); osc.start(t); osc.stop(t + (o.a || .005) + (o.d || .15) + .05);
}
function noise(o) { // o: vol, a, d, at, type (lowpass/highpass/bandpass), f, f2, q
  var c = SND.ctx, t = c.currentTime + (o.at || 0), s = c.createBufferSource(), f = c.createBiquadFilter(), g = c.createGain();
  s.buffer = SND.noiseBuf; s.loop = true; f.type = o.type || 'lowpass'; f.frequency.setValueAtTime(o.f || 1200, t); if (o.f2) f.frequency.exponentialRampToValueAtTime(o.f2, t + (o.a || .005) + (o.d || .2)); f.Q.value = o.q || 1;
  s.connect(f); f.connect(g); g.connect(o.dest || SND.sfxBus); env(g, t, o.a || .005, o.vol || .3, o.d || .2);
  s.start(t, Math.random() * .5); s.stop(t + (o.a || .005) + (o.d || .2) + .05);
}
function quack(at, pitch, vol) { // a cartoon quack: buzzy saw through two formants, falling pitch
  var p = pitch || 1;
  tone({ f: 560 * p, f2: 380 * p, type: 'sawtooth', vol: (vol || .22), a: .01, d: .13, at: at, bp: 1150 * p, q: 5 });
  tone({ f: 560 * p, f2: 380 * p, type: 'square', vol: (vol || .22) * .5, a: .01, d: .11, at: at, bp: 2500 * p, q: 6 });
}
// ---------- recorded sounds: real quacks, barks, punches, pans, booms (web/sounds, see SOUND CREDITS below) ----------
// Clips ship inside game.js and are decoded a few at a time after the first touch; until a clip is ready its synth version plays.
var SBUF = {};
function loadSamples(c) {
  if (typeof SOUND_DATA === 'undefined') return; var names = Object.keys(SOUND_DATA), i = 0;
  (function next() { if (i >= names.length) return; var nm = names[i++];
    try { var bin = atob(SOUND_DATA[nm]), u = new Uint8Array(bin.length); for (var k = 0; k < bin.length; k++) u[k] = bin.charCodeAt(k);
      var done = function (buf) { SBUF[nm] = buf; setTimeout(next, 15); }, fail = function () { setTimeout(next, 15); };
      var pr = c.decodeAudioData(u.buffer, done, fail); if (pr && pr.catch) pr.catch(fail); } catch (e) { setTimeout(next, 15); } })();
}
function samp(name, o) { // play a clip: o.rate (pitch/speed), o.vol, o.at (delay s); false if not loaded yet
  var b = SBUF[name]; if (!b) return false; var c = SND.ctx, s = c.createBufferSource(), g = c.createGain();
  s.buffer = b; s.playbackRate.value = o && o.rate || 1; g.gain.value = o && o.vol !== undefined ? o.vol : .5; s.connect(g); g.connect(SND.sfxBus); s.start(c.currentTime + (o && o.at || 0)); return true;
}
function one(list) { return list[Math.floor(Math.random() * list.length)]; }
function jit(a, b) { return a + Math.random() * (b - a); }
var QK = ['quack1', 'quack2', 'quack3'];
var REAL = {   // each returns false when its main clip isn't decoded yet, so the synth version plays instead
  quack: function () { return samp(one(QK), { rate: jit(1, 1.15), vol: .55 }); },
  quackHi: function () { return samp(one(QK), { rate: jit(1.3, 1.6), vol: .5 }); },
  quackLo: function () { return samp(one(QK), { rate: jit(.68, .78), vol: .75 }); },
  peep: function () { return samp(one(QK), { rate: jit(1.9, 2.2), vol: .3 }); },
  deploy: function () { return samp(one(QK), { rate: jit(1.1, 1.35), vol: .42 }); },
  train: function () { return samp(one(QK), { rate: 1.45, vol: .35 }); },
  duckdie: function () { return samp('quack4', { rate: jit(1.15, 1.3), vol: .4 }); },
  bark: function () { return samp(one(['bark1', 'bark2']), { rate: jit(.95, 1.1), vol: .7 }); },
  squawk: function () { return samp('squawk', { rate: jit(1.05, 1.2), vol: .5 }); },
  oink: function () { return samp('oink', { rate: jit(1.05, 1.2), vol: .5 }); },
  cackle: function () { return samp('laugh', { rate: jit(1.5, 1.65), vol: .45 }); },
  wee: function () { if (!samp('whoosh1', { rate: 1.4, vol: .45 })) return false; samp(one(QK), { rate: 1.65, vol: .3, at: .05 }); return true; },
  stab: function () { if (!samp('blade', { rate: jit(1.3, 1.5), vol: .3 })) return false; samp('punch2', { rate: 1.6, vol: .28 }); return true; },
  smash: function () { if (!samp(one(['punch3', 'punch4']), { rate: jit(.88, 1.02), vol: .7 })) return false; samp(one(['pan1', 'pan2']), { rate: jit(.95, 1.1), vol: .3 }); return true; },
  bite: function () { return samp('punch2', { rate: jit(1.25, 1.4), vol: .6 }); },
  swing: function () { return samp('whoosh2', { rate: jit(.85, 1.1), vol: .6 }); },
  swoosh: function () { return samp('swoosh1', { rate: jit(.95, 1.1), vol: .55 }); },
  whirl: function () { if (!samp('swoosh2', { rate: 1.2, vol: .55 })) return false; samp('swoosh2', { rate: 1.35, vol: .45, at: .26 }); return true; },
  gust: function () { return samp('swoosh1', { rate: .6, vol: .6 }); },
  pew: function () { return samp('boing2', { rate: jit(2.1, 2.4), vol: .28 }); },
  twang: function () { if (!samp('boing1', { rate: jit(.66, .74), vol: .55 })) return false; samp('kick', { rate: .9, vol: .45 }); return true; },
  cooker: function () { if (!samp('hiss', { rate: 1.1, vol: .6 })) return false; samp('lowboom', { rate: 1, vol: .8, at: .05 }); return true; },
  spray: function () { return samp('splash', { rate: jit(1.3, 1.45), vol: 1.4 }); },
  flame: function () { return samp('fire', { rate: jit(.95, 1.1), vol: .5 }); },
  sizzle: function () { return samp('fire', { rate: 1.6, vol: .3 }); },
  stone: function () { if (!samp('thump1', { rate: jit(.9, 1.05), vol: .7 })) return false; samp('punch1', { rate: .8, vol: .28 }); return true; },
  thud: function () { return samp('thump1', { rate: jit(1.1, 1.3), vol: .45 }); },
  boom: function () { return samp(one(['blast2', 'blast3']), { rate: jit(.92, 1.05), vol: .8 }); },
  cracker: function () { return samp('blast1', { rate: jit(1.2, 1.35), vol: .65 }); },
  squish: function () { if (!samp('squish', { rate: jit(1.05, 1.2), vol: .75 })) return false; samp('splash', { rate: .9, vol: 1.1 }); return true; },
  splat: function () { if (!samp('splash', { rate: jit(.95, 1.1), vol: 1.4 })) return false; samp('thump1', { rate: .8, vol: .35 }); return true; },
  water: function () { return samp('splash', { rate: 1.25, vol: 1.3 }); },
  chime: function () { return samp('magic', { rate: 1.25, vol: .4 }); },
  heal: function () { return samp('magic', { rate: 1.1, vol: .4 }); },
  crash: function () { if (!samp('wood', { rate: jit(.9, 1.05), vol: .8 })) return false; samp('blast1', { rate: .7, vol: .4 }); return true; },
  wall: function () { return samp('wood', { rate: jit(1.4, 1.6), vol: .5 }); }
};
var SFX = {
  tap: function () { tone({ f: 880, f2: 660, type: 'triangle', vol: .12, d: .05 }); },
  quack: function () { quack(0, .9 + Math.random() * .25); },
  colonel: function () { quack(0, .72, .3); quack(.16, .78, .3); tone({ f: 523, type: 'triangle', vol: .12, d: .12, at: .34 }); tone({ f: 784, type: 'triangle', vol: .12, d: .25, at: .44 }); },
  stab: function () { noise({ type: 'highpass', f: 2500, vol: .12, d: .05 }); tone({ f: 1400, f2: 900, type: 'triangle', vol: .08, d: .06 }); },
  smash: function () { tone({ f: 140, f2: 55, type: 'sine', vol: .5, d: .22 }); noise({ type: 'lowpass', f: 900, f2: 200, vol: .3, d: .2 }); tone({ f: 620, f2: 600, type: 'triangle', vol: .06, d: .3, vib: 30, vibAmt: 8 }); },
  bite: function () { noise({ type: 'bandpass', f: 1800, q: 2, vol: .25, d: .06 }); noise({ type: 'bandpass', f: 1200, q: 2, vol: .2, d: .06, at: .07 }); tone({ f: 180, f2: 120, type: 'square', vol: .06, d: .08 }); },
  shot: function () { noise({ type: 'bandpass', f: 3000, f2: 900, q: 1.5, vol: .14, d: .12 }); tone({ f: 300, f2: 900, type: 'triangle', vol: .05, d: .08 }); },
  fire: function () { noise({ type: 'bandpass', f: 600, f2: 2200, q: .8, vol: .22, a: .03, d: .3 }); },
  egg: function () { tone({ f: 220, f2: 90, type: 'sine', vol: .35, d: .18 }); noise({ type: 'lowpass', f: 600, vol: .15, d: .12 }); },
  water: function () { noise({ type: 'bandpass', f: 1800, f2: 3500, q: 3, vol: .12, d: .15 }); },
  thud: function () { tone({ f: 190, f2: 120, type: 'sine', vol: .2, d: .08 }); noise({ type: 'lowpass', f: 700, vol: .08, d: .05 }); },
  cracker: function () { noise({ type: 'highpass', f: 1500, vol: .35, d: .06 }); noise({ type: 'highpass', f: 1500, vol: .3, d: .05, at: .07 }); noise({ type: 'lowpass', f: 900, vol: .3, d: .2, at: .02 }); },
  splat: function () { noise({ type: 'lowpass', f: 1200, f2: 300, vol: .3, d: .25 }); tone({ f: 120, f2: 60, type: 'sine', vol: .3, d: .25 }); },
  crash: function () { // a building falls: crunch, rumble, tumbling bits
    noise({ type: 'lowpass', f: 2500, f2: 150, vol: .5, a: .01, d: .9 }); tone({ f: 90, f2: 35, type: 'sine', vol: .55, d: .7 });
    for (var i = 0; i < 5; i++) tone({ f: 300 + Math.random() * 500, f2: 150, type: 'triangle', vol: .08, d: .07, at: .12 + i * .09 + Math.random() * .05 });
  },
  wall: function () { noise({ type: 'bandpass', f: 1400, q: 1.2, vol: .3, d: .18 }); tone({ f: 260, f2: 140, type: 'square', vol: .06, d: .12 }); },
  duckdie: function () { quack(0, 1.25, .16); tone({ f: 700, f2: 180, type: 'triangle', vol: .1, d: .35, at: .1 }); },
  meow: function () { tone({ f: 620, f2: 880, type: 'triangle', vol: .16, a: .06, d: .12, vib: 7, vibAmt: 25, bp: 1400, q: 1.5 }); tone({ f: 880, f2: 520, type: 'triangle', vol: .15, a: .01, d: .25, at: .17, vib: 7, vibAmt: 25, bp: 1300, q: 1.5 }); },
  hiss: function () { noise({ type: 'highpass', f: 3000, vol: .15, a: .02, d: .3 }); },
  deploy: function () { quack(0, 1 + Math.random() * .3, .18); noise({ type: 'lowpass', f: 500, vol: .12, d: .1 }); },
  dig: function () { noise({ type: 'lowpass', f: 260, f2: 160, vol: .22, a: .04, d: .3 }); },
  surface: function () { noise({ type: 'lowpass', f: 1500, f2: 300, vol: .3, d: .25 }); tone({ f: 300, f2: 700, type: 'triangle', vol: .12, d: .12 }); },
  heal: function () { [1046, 1318, 1568].forEach(function (f, i) { tone({ f: f, type: 'sine', vol: .08, d: .25, at: i * .06 }); }); },
  build: function () { for (var i = 0; i < 3; i++) { tone({ f: 420, f2: 300, type: 'square', vol: .07, d: .05, at: i * .16 }); noise({ type: 'bandpass', f: 1600, q: 2, vol: .15, d: .04, at: i * .16 }); } },
  done: function () { [523, 659, 784, 1046].forEach(function (f, i) { tone({ f: f, type: 'triangle', vol: .16, d: i === 3 ? .4 : .12, at: i * .09 }); }); },
  coin: function () { tone({ f: 1318, type: 'square', vol: .07, d: .08 }); tone({ f: 1760, type: 'square', vol: .07, d: .3, at: .08 }); tone({ f: 2637, type: 'sine', vol: .05, d: .3, at: .08 }); },
  train: function () { tone({ f: 500, f2: 900, type: 'sine', vol: .14, d: .08 }); quack(.06, 1.3, .1); },
  boost: function () { tone({ f: 300, f2: 1400, type: 'sawtooth', vol: .07, a: .02, d: .35, bp: 1600, q: 2 }); [1046, 1568].forEach(function (f, i) { tone({ f: f, type: 'sine', vol: .1, d: .2, at: .3 + i * .08 }); }); },
  horn: function () { [[392, 0], [392, .18], [523, .36]].forEach(function (n) { tone({ f: n[0], type: 'sawtooth', vol: .1, a: .02, d: n[1] === .36 ? .55 : .14, at: n[1], bp: 1200, q: 1 }); }); },
  win: function () { [523, 659, 784, 1046, 784, 1046].forEach(function (f, i) { tone({ f: f, type: 'triangle', vol: .17, d: i === 5 ? .6 : .13, at: i * .12 }); }); quack(.8, 1.1, .2); quack(.95, 1.2, .2); },
  lose: function () { [392, 370, 349, 262].forEach(function (f, i) { tone({ f: f, type: 'triangle', vol: .15, d: i === 3 ? .7 : .22, at: i * .25, vib: i === 3 ? 6 : 0, vibAmt: 6 }); }); },
  // ---------- duck war cries ----------
  quackHi: function () { var p = 1.15 + Math.random() * .3; quack(0, p, .17); if (Math.random() < .4) quack(.1, p * 1.06, .13); },
  quackLo: function () { var p = .62 + Math.random() * .1; quack(0, p, .26); tone({ f: 110, f2: 80, type: 'sine', vol: .12, d: .15 }); },
  peep: function () { tone({ f: 1900, f2: 2500, type: 'sine', vol: .07, d: .06 }); tone({ f: 2100, f2: 2700, type: 'sine', vol: .06, d: .05, at: .08 }); },
  cackle: function () { for (var i = 0; i < 4; i++) tone({ f: 900 - i * 60, f2: 700 - i * 60, type: 'sawtooth', vol: .07, d: .06, at: i * .085, bp: 1600, q: 4 }); },
  bark: function () { tone({ f: 420, f2: 230, type: 'sawtooth', vol: .2, a: .01, d: .11, bp: 900, q: 2 }); noise({ type: 'bandpass', f: 700, q: 1.5, vol: .12, d: .08 }); if (Math.random() < .5) tone({ f: 460, f2: 250, type: 'sawtooth', vol: .16, d: .1, at: .17, bp: 900, q: 2 }); },
  squawk: function () { tone({ f: 1300, f2: 700, type: 'sawtooth', vol: .14, a: .01, d: .2, bp: 1800, q: 3, vib: 25, vibAmt: 80 }); },
  oink: function () { tone({ f: 260, f2: 200, type: 'sawtooth', vol: .16, a: .02, d: .14, bp: 600, q: 4, vib: 30, vibAmt: 25 }); },
  wee: function () { tone({ f: 900, f2: 1600, type: 'triangle', vol: .08, a: .03, d: .25, vib: 9, vibAmt: 40 }); },
  // ---------- duck weapons ----------
  pew: function () { tone({ f: 900, f2: 300, type: 'triangle', vol: .09, d: .09 }); noise({ type: 'highpass', f: 3000, vol: .05, d: .03 }); },
  whirl: function () { noise({ type: 'bandpass', f: 500, f2: 2400, q: 2, vol: .16, a: .05, d: .3 }); noise({ type: 'bandpass', f: 2400, f2: 600, q: 2, vol: .12, a: .02, d: .25, at: .3 }); },
  swoosh: function () { noise({ type: 'bandpass', f: 2600, f2: 500, q: 1.5, vol: .16, a: .04, d: .28 }); },
  gust: function () { noise({ type: 'lowpass', f: 900, f2: 300, vol: .18, a: .08, d: .4 }); },
  swing: function () { noise({ type: 'bandpass', f: 400, f2: 1800, q: 1.2, vol: .14, a: .03, d: .14 }); },
  // ---------- defenses ----------
  twang: function () { tone({ f: 180, f2: 120, type: 'sawtooth', vol: .14, a: .003, d: .3, vib: 22, vibAmt: 18, bp: 700, q: 2 }); noise({ type: 'bandpass', f: 1800, q: 2, vol: .12, d: .05 }); tone({ f: 70, f2: 45, type: 'sine', vol: .25, d: .12 }); },
  cooker: function () { noise({ type: 'highpass', f: 2500, vol: .22, a: .01, d: .35 }); tone({ f: 120, f2: 50, type: 'sine', vol: .45, d: .2, at: .02 }); noise({ type: 'lowpass', f: 500, vol: .2, d: .12, at: .02 }); tone({ f: 1900, f2: 2100, type: 'sine', vol: .05, d: .25, at: .05 }); },
  spray: function () { noise({ type: 'bandpass', f: 3200, f2: 1800, q: 1.5, vol: .16, a: .02, d: .3 }); tone({ f: 200, f2: 140, type: 'sine', vol: .12, d: .1 }); },
  flame: function () { noise({ type: 'bandpass', f: 400, f2: 1600, q: .7, vol: .3, a: .04, d: .35 }); for (var i = 0; i < 4; i++) noise({ type: 'highpass', f: 4000, vol: .06, d: .02, at: .05 + Math.random() * .25 }); },
  // ---------- impacts ----------
  stone: function () { tone({ f: 160, f2: 70, type: 'sine', vol: .32, d: .12 }); noise({ type: 'bandpass', f: 1200, q: 1.5, vol: .2, d: .07 }); for (var i = 0; i < 2; i++) tone({ f: 600 + Math.random() * 600, type: 'triangle', vol: .05, d: .04, at: .07 + i * .06 }); },
  boom: function () { tone({ f: 110, f2: 32, type: 'sine', vol: .6, d: .55 }); noise({ type: 'lowpass', f: 1800, f2: 120, vol: .45, a: .005, d: .6 }); noise({ type: 'highpass', f: 3000, vol: .12, d: .08 }); },
  sizzle: function () { noise({ type: 'highpass', f: 4500, vol: .14, a: .02, d: .4 }); noise({ type: 'lowpass', f: 600, f2: 200, vol: .18, d: .15 }); },
  squish: function () { noise({ type: 'lowpass', f: 1500, f2: 250, vol: .32, d: .22 }); tone({ f: 260, f2: 90, type: 'sine', vol: .22, d: .18 }); tone({ f: 900, f2: 1300, type: 'sine', vol: .05, d: .08, at: .12 }); },
  chime: function () { [1568, 2093].forEach(function (f, i) { tone({ f: f, type: 'sine', vol: .07, d: .2, at: i * .05 }); }); },
  error: function () { tone({ f: 220, type: 'square', vol: .08, d: .12 }); tone({ f: 180, type: 'square', vol: .08, d: .16, at: .12 }); }
};
var SFX_GAP = { quackHi: 140, quackLo: 220, peep: 150, cackle: 500, bark: 260, squawk: 300, oink: 300, wee: 250, pew: 70, whirl: 300, swoosh: 160, gust: 300, swing: 90,
  twang: 90, cooker: 300, spray: 140, flame: 180, stone: 80, boom: 160, sizzle: 200, squish: 120, chime: 160, crash: 120, cracker: 90, quack: 90, deploy: 70, stab: 60, smash: 80, bite: 80, shot: 50, fire: 120, egg: 90, water: 60, thud: 50, wall: 80, duckdie: 150, meow: 400, dig: 250, heal: 300, hiss: 300 };
var SFX_MUST = { crash: 1, boom: 1, win: 1, lose: 1, horn: 1, tap: 1, done: 1, coin: 1, error: 1, colonel: 1, build: 1 };
function sfx(name) {
  if (!SND.on) return; var c = audio(); if (!c || c.state !== 'running' || !(SFX[name] || REAL[name])) return;
  var t = performance.now(); if (t - (SND.last[name] || 0) < (SFX_GAP[name] || 30)) return;
  var Q = SND.recent || (SND.recent = []); while (Q.length && t - Q[0] > 150) Q.shift();
  if (Q.length >= 9 && !SFX_MUST[name]) return; Q.push(t); SND.last[name] = t;
  try { if (!(REAL[name] && REAL[name]())) SFX[name](); } catch (e) {}
}
// SOUND CREDITS (shown in-game: ⚙ menu → อื่นๆ → เครดิต):
//   "Oculus Audio Pack 01" by Oculus VR, LLC (https://developers.meta.com/vr/downloads/package/oculus-audio-pack-1/), CC BY 4.0 — via facebookincubator/Meta-open-sound; clips trimmed, pitched and re-encoded.
//   Kenney Sci-Fi sounds (kenney.nl), CC0 — via ignition-bench/sound-library.  wyzowl/sfx-kit, CC0.
function setSound(on) { SND.on = on; if (SND.sfxBus) SND.sfxBus.gain.value = on ? 1 : 0; soundSave(); }
function setMusic(on) { SND.music = on; if (SND.musicBus) SND.musicBus.gain.setTargetAtTime(on ? .32 : 0, SND.ctx.currentTime, .2); soundSave(); if (on) startMusic(); }

// ---------- music: a bouncy marimba loop over a plucky bass, calmer at home, punchier in raids ----------
var MUSIC = { timer: null, step: 0, next: 0 };
var SONG = { // 16 steps a bar, 4 bars; numbers are semitones from C4, null = rest
  lead: [0, null, 4, null, 7, null, 4, 7, 9, null, 7, null, 4, null, 2, null,  2, null, 5, null, 9, null, 5, 9, 11, null, 9, null, 7, null, 5, null,
         4, null, 7, null, 12, null, 11, 9, 7, null, 4, null, 7, 9, 7, null,  5, null, 4, null, 2, null, 4, 2, 0, null, null, null, 7, null, null, null],
  bass: [0, 7, 0, 7, 5, 12, 5, 12, 9, 4, 9, 4, 7, 2, 7, 2],   // one note per beat, 16 beats
  chordRoot: [0, 0, 0, 0, 5, 5, 5, 5, 9, 9, 9, 9, 7, 7, 7, 7]
};
function startMusic() {
  if (MUSIC.timer || !SND.ctx || SND.ctx.state !== 'running') return;
  MUSIC.next = SND.ctx.currentTime + .1;
  MUSIC.timer = setInterval(function () {
    var c = SND.ctx; if (!c || c.state !== 'running') return;
    var bpm = (typeof screen !== 'undefined' && screen === 'raid') ? 132 : 108, st = 60 / bpm / 4;
    while (MUSIC.next < c.currentTime + .25) { if (SND.music) playStep(MUSIC.step, MUSIC.next, st); MUSIC.step = (MUSIC.step + 1) % 64; MUSIC.next += st; }
  }, 60);
}
function midi(n) { return 261.63 * Math.pow(2, n / 12); }
function playStep(i, t, st) {
  var c = SND.ctx, at = t - c.currentTime, dst = SND.musicBus, raid = typeof screen !== 'undefined' && screen === 'raid';
  var n = SONG.lead[i]; if (n !== null && n !== undefined) { // marimba: sine + a quick high partial
    tone({ f: midi(n + 12), type: 'sine', vol: .22, a: .004, d: .28, at: at, dest: dst }); tone({ f: midi(n + 12) * 4, type: 'sine', vol: .05, a: .002, d: .05, at: at, dest: dst }); }
  if (i % 4 === 0) { var b = SONG.bass[(i / 4) % 16]; tone({ f: midi(b - 24), type: 'triangle', vol: .32, a: .006, d: st * 3, at: at, dest: dst }); }
  if (i % 8 === 4) { var r = SONG.chordRoot[(i / 4) % 16]; [0, 4, 7].forEach(function (k) { tone({ f: midi(r + k), type: 'triangle', vol: .05, a: .01, d: st * 2.5, at: at, dest: dst }); }); }
  if (raid && i % 4 === 0) noise({ type: 'lowpass', f: 180, vol: .25, d: .08, at: at, dest: dst });          // kick
  if (raid && i % 8 === 4) noise({ type: 'bandpass', f: 1800, q: .8, vol: .14, d: .1, at: at, dest: dst });   // snare
  if (i % 2 === 1) noise({ type: 'highpass', f: 7000, vol: raid ? .05 : .025, d: .03, at: at, dest: dst });   // hat
}
