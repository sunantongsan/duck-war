// web/game.js = art data + recorded sound clips (web/sounds/*.ogg, base64) + every src/*.js file in name order (01-*.js, 02-*.js, ...).
const fs=require('node:fs'),path=require('node:path');const root=path.resolve(__dirname,'..');
function bundle(){const art=fs.readFileSync(path.join(root,'web/data/art.json'),'utf8');
 const parts=fs.readdirSync(path.join(root,'src')).filter(f=>f.endsWith('.js')).sort().map(f=>'// ---- src/'+f+' ----\n'+fs.readFileSync(path.join(root,'src',f),'utf8'));
 const sd=path.join(root,'web/sounds'),snd={};if(fs.existsSync(sd))for(const f of fs.readdirSync(sd).filter(f=>f.endsWith('.ogg')).sort())snd[f.slice(0,-4)]=fs.readFileSync(path.join(sd,f)).toString('base64');
 fs.writeFileSync(path.join(root,'web/game.js'),'"use strict";\nvar ART='+art.trim()+';\nvar SOUND_DATA='+JSON.stringify(snd)+';\n'+parts.join('\n'));}
if(require.main===module)bundle();module.exports={bundle};
