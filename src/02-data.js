// Duck War — what every building and troop is. Levels 1-15; the art changes shape every 3 levels (5 stages).
// cost(lv) = price to build (lv 1) or to upgrade to lv. res: which resource pays. time(lv) in seconds.
var STAGES = 5, MAX_LV = 15;
function stageOf(lv) { return Math.min(STAGES, Math.floor((Math.max(1, lv) - 1) / 3) + 1); }
function grow(base, lv, k) { return Math.round(base * Math.pow(k || 1.55, lv - 1)); }

var B = {
  hq:            { name: 'บ้านเป็ด',          size: 3, art: 'hq',            hp: 1500, res: 'honey', cost: 1000, time: 10, kind: 'hq', max: 1, store: 1500 },
  honeypump:     { name: 'ปั๊มน้ำผึ้ง',        size: 2, art: 'honeypump',     hp: 420, res: 'veggie', cost: 150, time: 5, kind: 'make', make: 'honey', rate: 400, max: [1, 2, 3, 4, 5, 6, 6, 7] },
  veggieblender: { name: 'เครื่องปั่นผัก',     size: 2, art: 'veggieblender', hp: 420, res: 'honey', cost: 150, time: 5, kind: 'make', make: 'veggie', rate: 400, max: [1, 2, 3, 4, 5, 6, 6, 7] },
  syrupstove:    { name: 'เตาเคี่ยวไซรัป',    size: 2, art: 'syrupstove',    hp: 600, res: 'veggie', cost: 20000, time: 60, kind: 'make', make: 'syrup', rate: 20, unlock: 5, max: [0, 0, 0, 0, 1, 2, 2, 3] },
  honeyjar:      { name: 'โหลน้ำผึ้ง',         size: 2, art: 'honeyjar',      hp: 500, res: 'veggie', cost: 300, time: 10, kind: 'store', store: 'honey', cap: 1500, max: [1, 1, 2, 2, 3, 3, 4, 4, 5] },
  veggiejar:     { name: 'โหลน้ำผัก',          size: 2, art: 'veggiejar',     hp: 500, res: 'honey', cost: 300, time: 10, kind: 'store', store: 'veggie', cap: 1500, max: [1, 1, 2, 2, 3, 3, 4, 4, 5] },
  syrupjar:      { name: 'โหลไซรัป',           size: 2, art: 'syrupjar',      hp: 700, res: 'veggie', cost: 25000, time: 60, kind: 'store', store: 'syrup', cap: 2000, unlock: 5, max: [0, 0, 0, 0, 1, 1, 1, 1] },
  camp:          { name: 'ค่ายพักเป็ด',        size: 3, art: 'camp',          hp: 400, res: 'veggie', cost: 200, time: 8, kind: 'camp', space: 20, max: [1, 2, 2, 3, 3, 4, 4, 4] },
  barracks:      { name: 'ลานฝึกเป็ด',         size: 2, art: 'barracks',      hp: 450, res: 'veggie', cost: 150, time: 6, kind: 'train', max: [1, 2, 2, 3, 3, 4, 4, 4] },
  lab:           { name: 'ห้องทดลองเป็ด',      size: 2, art: 'lab',           hp: 500, res: 'veggie', cost: 5000, time: 30, kind: 'lab', unlock: 3, max: [0, 0, 1, 1, 1, 1, 1, 1] },
  herohall:      { name: 'ศาลาผู้นำเป็ด',      size: 2, art: 'hero',          hp: 900, res: 'honey', cost: 8000, time: 40, kind: 'hero', unlock: 3, max: [0, 0, 1, 1, 1, 1, 1, 1] },
  workshop:      { name: 'โรงนาช่างเป็ด',      size: 2, art: 'workshop',      hp: 500, res: 'honey', cost: 4000, time: 30, kind: 'deco', unlock: 4, max: [0, 0, 0, 1, 1, 1, 1, 1] },
  slingshot:     { name: 'หนังสติ๊กยักษ์',      size: 2, turret: 'slingshot',  hp: 520, res: 'honey', cost: 250, time: 8, kind: 'defense', range: 6.5, dmg: 18, rate: 0.9, shot: 'rock', ground: true, max: [2, 2, 3, 3, 4, 4, 5, 5] },
  boxtower:      { name: 'หอกล่องเป็ดยิงไกล',   size: 2, turret: 'boxtower',   hp: 480, res: 'honey', cost: 1000, time: 15, kind: 'defense', range: 8, dmg: 11, rate: 0.75, shot: 'pebble', ground: true, air: true, unlock: 2, max: [0, 1, 2, 2, 3, 3, 4, 4] },
  mortar:        { name: 'หม้อความดันยิงไกล',  size: 2, turret: 'mortar',     hp: 500, res: 'honey', cost: 6000, time: 40, kind: 'defense', range: 10, minRange: 3, dmg: 30, rate: 4.5, shot: 'egg', splash: 1.5, ground: true, unlock: 3, max: [0, 0, 1, 1, 2, 2, 3, 3] },
  watergun:      { name: 'ปืนฉีดน้ำต่อสู้อากาศ', size: 2, turret: 'watergun',  hp: 600, res: 'honey', cost: 22000, time: 60, kind: 'defense', range: 9, dmg: 60, rate: 1, shot: 'water', air: true, unlock: 4, max: [0, 0, 0, 1, 1, 2, 2, 3] },
  chili:         { name: 'ป้อมเชฟพริกไฟ',       size: 2, turret: 'chili',      hp: 650, res: 'honey', cost: 40000, time: 90, kind: 'defense', range: 5, dmg: 40, rate: 0.55, shot: 'chili', ground: true, air: true, unlock: 6, max: [0, 0, 0, 0, 0, 1, 1, 2] },
  wall:          { name: 'กำแพง',               size: 1, wall: true,           hp: 300, res: 'honey', cost: 50, time: 0, kind: 'wall', max: [0, 25, 50, 75, 100, 125, 150, 175] }
};
Object.keys(B).forEach(function (k) { B[k].key = k; });
function maxCount(k, hqLv) { var m = B[k].max; return typeof m === 'number' ? m : (m[Math.min(m.length, hqLv) - 1] || 0); }
function bCost(k, lv) { var b = B[k]; return b.wall ? grow(b.cost, lv, 2.1) : grow(b.cost, lv, 1.9); }
function bTime(k, lv) { var b = B[k]; return lv === 1 && b.kind !== 'hq' ? b.time : Math.round(b.time * Math.pow(2.2, lv - 1)); }
function bHp(k, lv) { return grow(B[k].hp, lv, 1.2); }
function bMaxLv(k, hqLv) { return k === 'hq' ? MAX_LV : Math.min(MAX_LV, hqLv + (B[k].kind === 'wall' ? 0 : 1)); }

// Troops. size = housing space; time = training seconds; pref: what they go for first.
var U = {   // Clash counterpart in the comment; unlock = training-yard level
  fork:    { name: 'เป็ดส้อม',             art: 'fork',    h: 0.95, space: 1,  cost: 25,   res: 'veggie', time: 5,   hp: 45,   dmg: 9,   rate: 1,   range: 0.5, speed: 1.6,  pref: 'any',      hit: 'stab' },                                  // barbarian
  sling:   { name: 'เป็ดหนังสติ๊ก',         art: 'sling',   h: 0.95, space: 1,  cost: 50,   res: 'veggie', time: 6,   hp: 22,   dmg: 8,   rate: 1,   range: 3.5, speed: 1.5,  pref: 'any',      hit: 'shot', unlock: 2 },                       // archer
  giant:   { name: 'เป็ดยักษ์กระทะ',        art: 'giant',   h: 1.35, space: 5,  cost: 250,  res: 'veggie', time: 30,  hp: 320,  dmg: 12,  rate: 2,   range: 0.6, speed: 0.75, pref: 'defense',  hit: 'smash', unlock: 3 },                      // giant
  thief:   { name: 'เป็ดขโมย',             art: 'thief',   h: 0.95, space: 1,  cost: 30,   res: 'veggie', time: 6,   hp: 25,   dmg: 10,  rate: 1,   range: 0.5, speed: 2.6,  pref: 'resource', hit: 'stab', resBonus: 2, unlock: 3 },       // goblin: double damage on resource buildings
  bomber:  { name: 'เป็ดระเบิด',            art: 'bomber',  h: 0.95, space: 2,  cost: 100,  res: 'veggie', time: 12,  hp: 40,   dmg: 60,  rate: 1,   range: 0.5, speed: 2.4,  pref: 'wall',     hit: 'blast', splash: 1.3, wallBonus: 40, unlock: 4 },   // wall breaker: runs at a wall, blows itself up
  digger:  { name: 'เป็ดขุดดิน',            art: 'digger',  h: 0.95, space: 1,  cost: 40,   res: 'veggie', time: 7,   hp: 30,   dmg: 12,  rate: 1,   range: 0.5, speed: 2.2,  pref: 'resource', hit: 'stab', burrow: true, unlock: 5 },     // miner: tunnels under walls
  balloon: { name: 'เป็ดบอลลูนถุงก๊อบแก๊บ',  art: 'balloon', h: 2.7,  space: 5,  cost: 400,  res: 'veggie', time: 35,  hp: 260,  dmg: 72,  rate: 3,   range: 0.35, speed: 0.85, pref: 'defense', hit: 'cracker', splash: 1.2, air: true, unlock: 5 },   // balloon
  chef:    { name: 'เป็ดเชฟพริก',           art: 'chef',    h: 1.0,  space: 4,  cost: 600,  res: 'veggie', time: 40,  hp: 75,   dmg: 50,  rate: 1.5, range: 3,   speed: 1.4,  pref: 'any',      hit: 'fire', splash: 1, unlock: 6 },           // wizard
  nurse:   { name: 'เป็ดพยาบาล',            art: 'nurse',   h: 1.0,  space: 4,  cost: 500,  res: 'veggie', time: 40,  hp: 150,  dmg: 0,   heal: 18, rate: 1, range: 2.5, speed: 1.4, pref: 'heal', hit: 'heal', unlock: 6 },               // healer
  plane:   { name: 'เป็ดขี่จรวดพับ',         art: 'plane',   h: 1.25, space: 2,  cost: 90,   res: 'veggie', time: 10,  hp: 60,   dmg: 15,  rate: 1,   range: 2.5, speed: 2.4,  pref: 'any',      hit: 'shot', air: true, unlock: 7 },          // minion
  prop:    { name: 'เป็ดใบพัด',             art: 'prop',    h: 1.2,  space: 10, cost: 900,  res: 'veggie', time: 60,  hp: 260,  dmg: 32,  rate: 1.2, range: 2,   speed: 1.6,  pref: 'any',      hit: 'shot', splash: 0.8, air: true, rage: true, unlock: 7 },   // baby dragon: angrier alone
  pot:     { name: 'เป็ดหม้อ',              art: 'pot',     h: 1.25, space: 8,  cost: 450,  res: 'veggie', time: 60,  hp: 800,  dmg: 14,  rate: 2,   range: 0.6, speed: 0.65, pref: 'defense',  hit: 'smash', unlock: 7 },                      // golem-ish tank: soaks the shots
  kite:    { name: 'เป็ดว่าว',              art: 'kite',    h: 1.9,  space: 20, cost: 1800, res: 'veggie', time: 120, hp: 1200, dmg: 90,  rate: 1.5, range: 2.5, speed: 1.2,  pref: 'any',      hit: 'fire', splash: 1, air: true, unlock: 8 },   // dragon
  mop:     { name: 'เป็ดไม้ถูพื้น',          art: 'mop',     h: 1.0,  space: 8,  cost: 90,   res: 'syrup',  time: 60,  hp: 340,  dmg: 48,  rate: 1.8, range: 0.6, speed: 1.6,  pref: 'any',      hit: 'spin', spin: 1.1, unlock: 8 },          // valkyrie: spins, hits all round
  pig:     { name: 'เป็ดขี่หมู',             art: 'pig',     h: 1.2,  space: 5,  cost: 80,   res: 'syrup',  time: 45,  hp: 280,  dmg: 40,  rate: 1,   range: 0.6, speed: 2.0,  pref: 'defense',  hit: 'smash', jump: true, unlock: 8 },          // hog rider
  egret:   { name: 'นกกระยาง',              art: 'egret',   h: 1.6,  space: 25, cost: 1500, res: 'veggie', time: 150, hp: 1400, dmg: 180, rate: 2,   range: 0.7, speed: 0.9,  pref: 'any',      hit: 'stab', unlock: 9 },                       // P.E.K.K.A
  witch:   { name: 'เป็ดแม่มด',             art: 'witch',   h: 1.05, space: 12, cost: 150,  res: 'syrup',  time: 90,  hp: 160,  dmg: 25,  rate: 1.4, range: 3.5, speed: 1.3,  pref: 'any',      hit: 'magic', summon: 'duckling', unlock: 9 },   // witch: raises ducklings
  fan:     { name: 'เป็ดพัดลม',             art: 'fan',     h: 1.7,  space: 30, cost: 250,  res: 'syrup',  time: 120, hp: 2400, dmg: 6,   rate: 1,   range: 1,   speed: 1.0,  pref: 'airdef',   hit: 'shot', air: true, split: 'fanlet', unlock: 9 },   // lava hound: hunts anti-air, bursts into small fans
  dog:     { name: 'หมาดัลเมเชียน',          art: 'dog',     h: 1.45, space: 10, cost: 300,  res: 'syrup',  time: 90,  hp: 1100, dmg: 70,  rate: 1.2, range: 0.7, speed: 1.1,  pref: 'any',      hit: 'bite', unlock: 9 },                       // yeti
  // heroes: never trained; they come from the leaders' hall (ศาลาผู้นำเป็ด), one each per raid, and level with the hall
  h_colonel: { name: 'ผู้พันเป็ด',          art: 'colonel', h: 3.0,  space: 0, hp: 950,  dmg: 38,  rate: 1.2, range: 0.7, speed: 1.55, pref: 'defense', hit: 'smash', hero: true, hidden: true, hq: 3, aura: 3.5,
               skill: 'เป่านกหวีดบุก!', skillTxt: 'ทหารรอบตัวเร็วขึ้น ตีแรงขึ้น และฟื้นเลือด' },                          // grand warden: walks at the front, ducks near him hit harder
  h_king:    { name: 'ราชาดัลเมเชียน',      art: 'dog',     h: 2.2,  space: 0, hp: 1900, dmg: 95,  rate: 1.2, range: 0.8, speed: 1.25, pref: 'any',     hit: 'bite',  hero: true, hidden: true, hq: 5, crown: 'king',
               skill: 'หอนเรียกพล', skillTxt: 'ฟื้นเลือด คลั่ง และเรียกเป็ดส้อมมาช่วย' },                                    // barbarian king
  h_queen:   { name: 'ราชินีนกกระยาง',      art: 'egret',   h: 2.3,  space: 0, hp: 850,  dmg: 62,  rate: 0.9, range: 3.8, speed: 1.4,  pref: 'any',     hit: 'shot', shot: 'feather', hero: true, hidden: true, hq: 7, crown: 'queen',
               skill: 'ม่านขนนก', skillTxt: 'หายตัว ป้อมยิงไม่เห็น และยิงแรงขึ้นสองเท่า' },                                // archer queen: darts feathers from range
  // not trainable: made by other troops
  duckling: { name: 'ลูกเป็ด', art: 'fork', h: 0.55, space: 0, hp: 22, dmg: 6, rate: 1, range: 0.5, speed: 2.0, pref: 'any', hit: 'stab', hidden: true },
  fanlet:   { name: 'พัดลมจิ๋ว', art: 'fan',  h: 0.75, space: 0, hp: 45, dmg: 9, rate: 1, range: 2, speed: 2.0, pref: 'any', hit: 'shot', air: true, hidden: true }
};
Object.keys(U).forEach(function (k) { U[k].key = k; });
function uHp(k, lv) { return grow(U[k].hp, lv || 1, U[k].hero ? 1.1 : 1.18); }
function uDmg(k, lv) { return grow(U[k].dmg, lv || 1, U[k].hero ? 1.1 : 1.18); }
var HERO_KEYS = ['h_colonel', 'h_king', 'h_queen'];
var HEROES = { colonel: { name: 'ผู้พันเป็ด', art: 'colonel', h: 3.0, speed: 0.8 } };   // hero-sized, like a Clash king
var CATS = { cat_spatula: { art: 'cat_spatula', h: 1, hp: 120, dmg: 12, rate: 1, range: 0.6, speed: 1.5, hit: 'smash' },
             cat_pan: { art: 'cat_pan', h: 1.15, hp: 260, dmg: 16, rate: 1.3, range: 0.6, speed: 1.1, hit: 'smash' },
             cat_king: { art: 'cat_king', h: 1.35, hp: 900, dmg: 40, rate: 1.4, range: 0.7, speed: 1.0, hit: 'smash' } };
var RES = { honey: { name: 'น้ำผึ้ง', color: '#ffc93a' }, veggie: { name: 'น้ำผัก', color: '#77d957' }, syrup: { name: 'ไซรัป', color: '#e3425a' }, coin: { name: 'เหรียญเป็ด', color: '#ffb000' } };
