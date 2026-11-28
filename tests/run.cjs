// Headless engine tests: runs the bundled game in a fake DOM and checks economy + a full raid simulation.
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const root=path.resolve(__dirname,'..');
require('../scripts/bundle.cjs').bundle();
function fake(){const f=function(){return fake();};return new Proxy(f,{get(t,k){if(k===Symbol.toPrimitive)return()=>0;if(k==='classList')return{add(){},remove(){},toggle(){},contains(){return false}};if(k==='getBoundingClientRect')return()=>({width:800,height:400,left:0,top:0});if(k in t)return t[k];return t[k]=fake();},set(t,k,v){t[k]=v;return true;},apply(){return fake();}});}
const els={};const store={};
const ctx={console,Math,Date,JSON,Map,Set,Object,Array,Number,String,Boolean,Promise,setTimeout,clearTimeout,setInterval,clearInterval,isNaN,parseInt,parseFloat,Infinity,
 location:{search:'?test'},localStorage:{getItem:k=>store[k]??null,setItem:(k,v)=>{store[k]=String(v)}},
 requestAnimationFrame:()=>0,Image:function(){return fake();},devicePixelRatio:1,
 document:{getElementById:id=>els[id]||(els[id]=fake()),createElement:()=>fake(),addEventListener(){},querySelector:()=>fake(),querySelectorAll:()=>[],body:fake(),hidden:false}};
ctx.window=ctx;ctx.addEventListener=()=>{};
vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(root,'web/game.js'),'utf8'),ctx,{filename:'game.js'});
let fail=0;const ok=(c,m)=>{console.log((c?'ok   ':'FAIL ')+m);if(!c)fail++;};
const g=s=>vm.runInContext(s,ctx);
ok(g('window.duckReady===true'),'boot finished');
ok(g('D.res.coin>=1000000'),'test build grants 1M duck coins');
ok(g('Object.keys(B).every(k=>k==="wall"||ART.buildings&&true)'),'art data present');
// The renderer and raid preload resolve the same fifteen level-specific paints.
const artGroups = [...Object.values(ctx.ART.buildings), ...Object.values(ctx.ART.turrets)];
const assets = path.join(root, 'web/assets');
const present = file => fs.existsSync(path.join(assets, file));
for (const group of artGroups) {
  const paints = Array.from({length: ctx.MAX_LV}, (_, i) => ctx.levelArt(i + 1, group.stages));
  const files = paints.map(p => p.pedestal || p.file);
  ok(new Set(files).size === ctx.MAX_LV && files.every(present) &&
    paints.every(p => present(p.file)), 'unique, packaged paints for ' + group.stages[0].file);
}
ok(ctx.WALL_ART.slice(1).every(parts => Object.values(parts).every(p => present(p.file))) &&
  new Set(ctx.WALL_ART.slice(1).map(p => p.post.file)).size === ctx.MAX_LV, 'all fifteen wall paints');
// economy: upgrade HQ and finish instantly with coins
g('var hq=D.buildings.find(b=>b.k==="hq");D.res.honey=D.res.veggie=1e9;');
ok(g('upgradeBuilding(hq)!==false&&!!hq.up'),'HQ upgrade starts');
ok(g('finishNow(hq)!==false&&(homeTick(),hq.lv===2&&!hq.up)'),'finish-now with duck coins completes HQ');
// training
g('D.res.honey=1e9;D.res.syrup=1e9;D.army={};D.queue=[];');
ok(g('train("fork")!==false&&D.queue.length===1'),'train fork duck');
g('finishTraining()');ok(g('(D.army.fork||0)>=1'),'finish training puts troop in army');
// raid sim: deploy army and run 180s
g('D.army={fork:20,sling:10,giant:4};startRaid(1);');
ok(g('!!R&&R.buildings.length>5'),'cat base generated');
const dep=g('(function(){var n=0;for(var k of ["giant","fork","sling"]){R.sel=k;for(var i=0;i<40;i++){var x=i%2?0.5:23.5,y=2+i*0.5;if(canDeploy(x,y)){deploy(x,y);n++;}}}return n;})()');
ok(dep>0,'deployed '+dep+' troops');
for(let i=0;i<180*20&&g('!!R&&!R.over');i++)g('raidTick(0.05)');
const pct=g('R?destruction():-1');ok(pct>0,'raid destroyed '+Math.round(pct*100)+'%');
// regression: a crowd of ducks must not get stuck shuffling around a shared waypoint (video 2026-11-20)
g('D.army={fork:30,sling:10,giant:4};startRaid(4);');
g('(function(){for(var k of ["fork","sling","giant"]){R.sel=k;for(var i=0;i<40;i++){var x=0.5,y=6+i*0.3;if(canDeploy(x,y))deploy(x,y);}}})()');
for(let i=0;i<120*20&&g('!!R&&!R.over');i++)g('raidTick(0.05)');
const p4=g('destruction()');ok(p4>=0.9,'crowded raid on level 4 reaches '+Math.round(p4*100)+'% (needs 90%)');
ok(g('!R.troops.some(t=>!t.dead&&t.attacking&&t.target&&!t.target.dead&&t.target.k&&rectDist(t.x,t.y,t.target)>(U[t.k].range+0.6))'),'no troop hits a building from out of range');
// heroes: colonel leads, the dog king and egret queen fight; each has one skill; a fallen hero rests
g('D.buildings.find(b=>b.k==="hq").lv=8;D.buildings.push({id:999,k:"herohall",x:2,y:2,lv:5});D.heroRest={};D.army={fork:20,giant:4};startRaid(3);');
ok(g('!!R.heroes.h_colonel&&!!R.heroes.h_king&&!!R.heroes.h_queen'),'all three heroes ready at duck house 8');
ok(g('(function(){var n=0;for(var k of HERO_KEYS){R.pick=k;for(var i=0;i<20&&R.heroes[k].state==="ready";i++)deploy(0.5,4+i*.5);if(R.heroes[k].state==="out")n++;}return n;})()')===3,'heroes deploy once each');
ok(g('R.troops.filter(t=>t.side==="duck"&&U[t.kind].hero).length===3&&(R.pick="h_king",!deploy(0.5,12))'),'a hero cannot be deployed twice');
g('R.pick="fork";for(var i=0;i<10;i++)deploy(0.5,8+i*.3)');
for(let i=0;i<40;i++)g('raidTick(0.05)');
ok(g('heroSkill("h_colonel")&&!heroSkill("h_colonel")'),'colonel skill works once');
ok(g('heroSkill("h_king")&&R.troops.filter(t=>t.kind==="fork"&&t.owner).length>=3'),'king skill calls fork ducks');
ok(g('heroSkill("h_queen")&&R.heroes.h_queen.unit.invis>now()'),'queen skill hides her');
for(let i=0;i<150*20&&g('!!R&&!R.over');i++)g('raidTick(0.05)');
ok(g('destruction()')>0.3,'hero raid destroyed '+Math.round(g('destruction()')*100)+'%');
g('var hk=R.heroes.h_king.unit;if(!hk.dead){hk.hp=1;damage(hk,10,null);}');
ok(g('heroRest("h_king")>0'),'fallen hero rests');
g('startRaid(3)');ok(g('!R.heroes.h_king&&!!R.heroes.h_queen'),'resting hero left out of the next raid');
ok(g('heroWake("h_king")&&heroRest("h_king")===0'),'duck coins wake a resting hero');
ok(g('(selectBuilding(null),true)'),'deselect building');
// landing zone: only outside the wall ring
for (const lv of [2,6,12]) { g('D.army={fork:5};startRaid('+lv+');');
  const inside=g('(function(){var hq=R.buildings.find(b=>b.k==="hq");return [hq.x-1.5,hq.y+1.5].concat([hq.x+5,hq.y+1.5])})()');
  ok(g('!canDeploy('+inside[0]+','+inside[1]+')&&!canDeploy('+inside[2]+','+inside[3]+')&&canDeploy(1,1)&&canDeploy('+(40-1)+',20)'),'level '+lv+': no landing inside the walls, fine outside'); }
ok(g('MAP')===40,'map is 40x40');
// flyers: over the walls, only anti-air can hit them
g('D.army={balloon:6,plane:6};startRaid(6);var wallHp2=R.buildings.filter(b=>b.k==="wall").reduce((a,b)=>a+b.hp,0);R.pick="balloon";for(var i=0;i<6;i++)deploy(2,15+i);R.pick="plane";for(var i=0;i<6;i++)deploy(3,15+i);');
for(let i=0;i<60*20;i++)g('raidTick(0.05)');
ok(g('R.buildings.filter(b=>b.k==="wall").reduce((a,b)=>a+b.hp,0)===wallHp2'),'flyers cross walls without breaking them');
ok(g('R.buildings.some(b=>b.hp<b.max&&B[b.k].kind==="defense")'),'balloons bomb defenses');
g('D.army={balloon:3};startRaid(1);R.pick="balloon";for(var i=0;i<3;i++)deploy(2,15+i);');
for(let i=0;i<40*20;i++)g('raidTick(0.05)');
ok(g('R.troops.filter(t=>t.kind==="balloon").every(t=>t.hp===t.max)'),'ground-only defenses and cats never hit flyers');
// diggers tunnel under the walls and can't be shot while underground
g('D.army={digger:10};startRaid(6);R.pick="digger";for(var i=0;i<10;i++)deploy(2,15+i);var wallHp=R.buildings.filter(b=>b.k==="wall").reduce((a,b)=>a+b.hp,0),sawUnder=false,hitUnder=false;');
for(let i=0;i<40*20;i++){g('raidTick(0.05);R.troops.forEach(t=>{if(t.under){sawUnder=true;if(t.hp<t.max&&!t.wasHit)hitUnder=true;}})');}
ok(g('sawUnder'),'diggers go underground');
ok(g('R.buildings.filter(b=>b.k==="wall").reduce((a,b)=>a+b.hp,0)===wallHp'),'diggers pass walls without breaking them');
ok(g('R.buildings.some(b=>b.hp<b.max&&/store|make/.test(B[b.k].kind))'),'diggers surface and hit resource buildings');
// production boost: x2 only for the boosted hour, coins charged
g('D.res.honey=0;var pm=D.buildings.find(b=>b.k==="honeypump");pm.up=null;delete pm.boost;D.t=Date.now()-3600000;homeTick();');
const base=g('D.res.honey');
g('D.res.honey=0;applyBoost(pm);D.t=Date.now()-3600000;homeTick();');
const boosted=g('D.res.honey');
ok(Math.abs(boosted-2*base)<base*0.02,'video boost doubles an hour of honey ('+Math.round(base)+' -> '+Math.round(boosted)+')');
g('D.res.honey=0;pm.boost=Date.now()-3600000-5000;D.t=Date.now()-3600000;homeTick();');
ok(Math.abs(g('D.res.honey')-base)<base*0.02,'expired boost gives normal rate');
g('D.res.honey=100;var c0=D.res.coin,fc=fillCoins("honey");fillWithCoins("honey");');
ok(g('D.res.honey===capacity("honey")&&c0-D.res.coin===fc&&fc>0'),'coins fill honey storage instantly');
ok(g('fillCoins("honey")===0&&fillWithCoins("honey")===false'),'full storage costs nothing');
ok(g('videosLeft()')===5,'5 videos a day');
g('colonelTick(0.1);for(let i=0;i<200;i++)colonelTick(0.1);');ok(g('!!COLONEL&&!onFootprint(COLONEL.x,COLONEL.y)'),'colonel strolls outside buildings');
g('var seen=new Set(),far=0,sal=0,hc=hqCenter();COLONEL.wait=0;for(let i=0;i<6000;i++){colonelTick(0.1);if(COLONEL.visit)seen.add(COLONEL.visit.k);far=Math.max(far,Math.hypot(COLONEL.x-hc.x,COLONEL.y-hc.y));if(COLONEL.atk&&now()-COLONEL.atk<5)sal++;if(onFootprint(COLONEL.x,COLONEL.y))far=-99;}');
ok(g('seen.size')>=4&&g('far')>5,'colonel patrols the whole base ('+g('seen.size')+' kinds of building, '+g('far').toFixed(1)+' tiles from the duck house) without walking through buildings');
// the rest of the roster
g('D.army={bomber:4};startRaid(6);R.pick="bomber";for(var i=0;i<4;i++)deploy(4,18+i*.5);var w0=R.buildings.filter(b=>b.k==="wall"&&b.dead).length;');
for(let i=0;i<25*20;i++)g('raidTick(0.05)');
ok(g('R.buildings.filter(b=>b.k==="wall"&&b.dead).length>w0&&R.troops.filter(t=>t.kind==="bomber").every(t=>t.dead)'),'wall-breaker ducks blow holes in the wall and go with it');
g('D.army={witch:1};startRaid(1);R.pick="witch";deploy(4,18);');
for(let i=0;i<4*20;i++)g('raidTick(0.05)');
ok(g('R.troops.filter(t=>t.kind==="duckling").length>=3'),'witch raises ducklings');
g('D.army={fan:1};startRaid(1);R.pick="fan";deploy(4,18);var f=R.troops.find(t=>t.kind==="fan");damage(f,1e6);');
ok(g('R.troops.filter(t=>t.kind==="fanlet").length===6'),'fan duck bursts into 6 little fans');
g('startRaid(1);var jar=R.buildings.find(b=>b.k==="honeyjar"),h0=jar.hp;damage(jar,10,{kind:"thief"});var h1=jar.hp;damage(jar,10,{kind:"fork"});');
ok(g('h0-h1===20&&h1-jar.hp===10'),'thief duck hits storages twice as hard');
ok(g('Object.keys(U).filter(k=>!U[k].hidden).length')===19,'19 trainable troops');
ok(g('Object.keys(U).every(k=>ART.troops[U[k].art])'),'every troop has its art');
// Troops dropped together share the route search but advance independently.
g('startRaid(8); var entry={x:2.1,y:3.1}, goal=R.buildings.find(b=>b.k==="hq");');
g('var firstPath=findPath(entry,goal,1), secondPath=findPath(entry,goal,1); firstPath.shift();');
ok(g('secondPath.length===firstPath.length+1'),'one duck advancing leaves its squadmate’s waypoints intact');
g('var barrier=R.buildings.find(b=>b.k==="wall"); var barrierCell=barrier.y*MAP+barrier.x; damage(barrier,barrier.hp+1);');
ok(g('grid()[barrierCell]===0 && R.routeCache.size===0'),'a destroyed wall opens its tile for the next route search');
// every duck-house level must be affordable once storages are maxed for the level before it
const reach=g(`(function(){var bad=[];for(var L=2;L<=MAX_LV;L++){var hl=L-1,c=B.hq.store*Math.pow(1.4,hl-1),n=maxCount('honeyjar',hl),jl=Math.min(MAX_LV,hl+1);c+=n*B.honeyjar.cap*Math.pow(1.7,jl-1);if(c<bCost('hq',L))bad.push(L);}return bad.join(',')})()`);
ok(reach==='','every duck-house level is affordable'+(reach?' (not: '+reach+')':''));
ok(g('maxCount("honeyjar",11)===5&&maxCount("veggiejar",11)===5'),'5 honey and 5 veggie jars at high levels');
// The old save id is the toaster in both the village and raids.
const toasterPaints = Array.from({length: 20}, (_, i) => ctx.levelArt(i + 1, ctx.ART.turrets.mortar.stages).file);
ok(new Set(toasterPaints).size === 20 && toasterPaints.every(present), 'twenty packaged toaster atlases');
ok(g('bMaxLv("mortar", 15) === 20 && bMaxLv("slingshot", 15) === 15'), 'only the toaster extends to twenty');
g('hq.lv=15; D.buildings=D.buildings.filter(b=>b.k!=="honeyjar"); for(let i=0;i<5;i++) D.buildings.push({k:"honeyjar",lv:15});');
g('var savedTower={id:5432,k:"mortar",lv:15,x:1,y:1}; D.buildings.push(savedTower); writeSave(); D=loadSave(); savedTower=D.buildings.find(b=>b.id===5432);');
ok(g('B[savedTower.k].shot==="toast" && savedTower.lv===15'), 'old mortar save loads at the same level');
ok(g('Array.from({length:5},()=>{ D.res.honey=capacity("honey"); D.res.coin=1e8; if(!upgradeBuilding(savedTower))return false; finishNow(savedTower); homeTick(); return true; }).every(Boolean) && savedTower.lv===20 && !upgradeBuilding(savedTower)'), 'normal upgrade flow reaches twenty and stops');
ok(g('catBase(60).buildings.some(b=>b.k==="mortar" && b.lv===20)'), 'late raid contains a level twenty toaster');
g('clearFx(); SMOKE.length=0; startRaid(8); var gun=R.buildings.find(b=>b.k==="mortar"), cc=center(gun); var dummy={kind:"giant",side:"duck",hp:900,max:900,x:cc.x+5,y:cc.y}; R.ducks=R.troops=[dummy]; R.shots=[]; gun.aim=0;');
g('turretTick(gun,.19)');
ok(g('gun.press>0 && R.shots.length===0'), 'baker presses before the first launch');
g('turretTick(gun,.20); var bread=R.shots[0]; shotTick(bread,.15); trailFx(bread);');
ok(g('bread.kind==="toast" && bread.z>bread.fz && SMOKE.some(p=>p.kind==="grey")'), 'toast rises with a smoke trail');
g('var neighbour=Object.assign({},dummy,{x:dummy.x+.7}), flyer=Object.assign({},dummy,{kind:"plane"}); R.troops.push(neighbour,flyer); shotTick(bread,bread.dur)');
ok(g('dummy.hp<900 && neighbour.hp<900 && flyer.hp===900 && PARTS.some(p=>p.k==="crumb")'), 'burst scatters crumbs and damages nearby ground troops');
// tutorial: the duck colonel walks a new player from building to the first raid, then gives one-time unlock tips
g('screen="home";R=null;selected=null;placing=null;D=newGame();D.ground=0;tutStart();');
ok(g('D.tut===0'),'new player starts the tutorial');
g('tutTick();tutAdvance();tutTick();tutAdvance();tutTick();');
ok(g('D.tut===2'),'tutorial reaches the build step');
g('(function(){for(var x=2;x<38;x++)for(var y=2;y<38;y++)if(footprintFree("slingshot",x,y)){placeBuilding("slingshot",x,y);return;}})();tutTick();');
ok(g('D.tut===3&&!!newSling()&&newSling().lv===0'),'placing the slingshot moves on to the builder wait');
g('finishNow(newSling());tutTick();');
ok(g('D.tut===4'),'finished slingshot moves on to training');
g('train("fork");tutTick();');
ok(g('D.tut===5'),'training a fork duck moves on to the attack');
g('screen="raid";startRaid(D.raid);tutTick();');
ok(g('D.tut===6'),'entering a raid asks to drop ducks');
g('(function(){R.pick="fork";for(var i=0;i<40;i++){if(canDeploy(0.5,2+i*.5)){deploy(0.5,2+i*.5);return;}}})();tutTick();');
ok(g('D.tut===7'),'first duck dropped: colonel waits quietly during the raid');
g('screen="home";R=null;tutTick();');
ok(g('D.tut===8'),'back home: tap the duck house');
g('selectBuilding(hqB());tutTick();');
ok(g('D.tut===9'),'duck house tapped: points at upgrade');
g('tutAdvance();tutTick();tutAdvance();tutTick();');
ok(g('D.tut==="done"'),'tutorial finishes');
g('selectBuilding(null);hqB().lv=2;tutTick();');
ok(g('TIP&&TIP.id==="hq2"'),'duck house level 2 brings a colonel tip');
g('tipDone();tutTick();');
ok(g('D.tips.hq2===1&&!TIP'),'a tip is shown only once');
g('D=newGame();D.raid=6;hqB().lv=4;tutStart();');
ok(g('D.tut==="done"&&D.tips.hq3===1&&!D.tips.hq5'),'existing bases skip the tutorial but keep future tips');
g('tutReplay();');ok(g('D.tut===0'),'tutorial can be replayed from the menu');
// A pending rewarded video belongs to the first tap, even if a second building is selected.
let adRequests = 0;
const rewardEvents = [];
ctx.DuckAds = {showRewarded() { adRequests++; }};
ctx.showRewardedVideo(earned => rewardEvents.push(earned));
ctx.showRewardedVideo(() => rewardEvents.push('second tap'));
ctx.duckAdResult('earned');
ok(adRequests === 1 && rewardEvents.join() === 'true' && ctx.duckAdResult === null, 'one earned video completes its original request once');
ctx.showRewardedVideo(earned => rewardEvents.push(earned));
ctx.duckAdResult('closed');
ctx.showRewardedVideo(earned => rewardEvents.push(earned));
ctx.duckAdResult('unavailable');
ok(rewardEvents.join() === 'true,false' && ctx.duckAdResult === null, 'closing an ad or getting no fill never earns a boost');
console.log(fail?fail+' failed':'all passed');process.exit(fail?1:0);
