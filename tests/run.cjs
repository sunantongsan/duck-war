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
ok(g('(selectBuilding(null),true)'),'deselect building');
// production boost: x2 only for the boosted hour, coins charged
g('D.res.honey=0;var pm=D.buildings.find(b=>b.k==="honeypump");pm.up=null;delete pm.boost;D.t=Date.now()-3600000;homeTick();');
const base=g('D.res.honey');
g('D.res.honey=0;var c0=D.res.coin;boostWithCoins(pm);D.t=Date.now()-3600000;homeTick();');
const boosted=g('D.res.honey');
ok(Math.abs(boosted-2*base)<base*0.02,'boost doubles an hour of honey ('+Math.round(base)+' -> '+Math.round(boosted)+')');
ok(g('c0-D.res.coin===boostCoins(pm)'),'boost costs duck coins');
g('D.res.honey=0;pm.boost=Date.now()-3600000-5000;D.t=Date.now()-3600000;homeTick();');
ok(Math.abs(g('D.res.honey')-base)<base*0.02,'expired boost gives normal rate');
ok(g('videosLeft()')===5,'5 videos a day');
g('colonelTick(0.1);for(let i=0;i<200;i++)colonelTick(0.1);');ok(g('!!COLONEL&&!insideBuilding(COLONEL.x,COLONEL.y)'),'colonel strolls outside buildings');
console.log(fail?fail+' failed':'all passed');process.exit(fail?1:0);
