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
  error: function () { tone({ f: 220, type: 'square', vol: .08, d: .12 }); tone({ f: 180, type: 'square', vol: .08, d: .16, at: .12 }); }
};
var SFX_GAP = { quack: 90, deploy: 70, stab: 60, smash: 80, bite: 80, shot: 50, fire: 120, egg: 90, water: 60, thud: 50, wall: 80, duckdie: 150, meow: 400, dig: 250, heal: 300, hiss: 300 };
function sfx(name) {
  if (!SND.on) return; var c = audio(); if (!c || c.state !== 'running' || !SFX[name]) return;
  var t = performance.now(); if (t - (SND.last[name] || 0) < (SFX_GAP[name] || 30)) return; SND.last[name] = t;
  try { SFX[name](); } catch (e) {}
}
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
