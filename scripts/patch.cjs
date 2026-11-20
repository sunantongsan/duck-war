// Static, content-addressed game patches (same format as the Android GamePatcher expects).
//   node scripts/patch.cjs                      -> patch-dist/ (what Vercel publishes)
//   node scripts/patch.cjs --android --native-version N   -> also fills app/build/generated/* for the APK
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const root=path.resolve(__dirname,'..');
const chunker=require('./patch-chunks.cjs');
const hash=b=>crypto.createHash('sha256').update(b).digest('hex');
require('./bundle.cjs').bundle();
function build(output=path.join(root,'patch-dist')){
 const config=JSON.parse(fs.readFileSync(path.join(root,'patch-config.json')));
 if(config.schema!==1||!['test','live'].includes(config.channel)||!Number.isSafeInteger(config.nativeVersion)||!Number.isSafeInteger(config.contentVersion))throw Error('Invalid patch configuration');
 const web=path.join(root,'web'),info={contentVersion:config.contentVersion,label:config.label,channel:config.channel};
 const content=p=>{const bytes=fs.readFileSync(path.join(web,p));
  if(p==='game.js')return Buffer.from('window.DuckContent='+JSON.stringify(info)+';\n'+bytes.toString('utf8'));return bytes;};
 const paths=['index.html','game.js',...fs.readdirSync(path.join(web,'assets')).filter(p=>p.endsWith('.webp')).sort().map(p=>'assets/'+p)];
 const files=paths.map(p=>{const bytes=content(p),file={path:p,sha256:hash(bytes),size:bytes.length};if(bytes.length>=chunker.THRESHOLD)file.chunks=chunker.chunks(bytes).map(({size,sha256})=>({size,sha256}));return file;});
 const size=files.reduce((n,f)=>n+f.size,0);if(size>67108864)throw Error('Patch too large');
 const manifest={schema:1,channel:config.channel,nativeVersion:config.nativeVersion,contentVersion:config.contentVersion,label:config.label,files};
 manifest.id=hash(Buffer.from(JSON.stringify(manifest)));
 fs.rmSync(output,{recursive:true,force:true});fs.mkdirSync(path.join(output,'objects'),{recursive:true});
 for(const f of files){const bytes=content(f.path);fs.writeFileSync(path.join(output,'objects',f.sha256),bytes);let o=0;for(const c of f.chunks||[]){fs.writeFileSync(path.join(output,'objects',c.sha256),bytes.subarray(o,o+c.size));o+=c.size;}}
 const dir=path.join(output,'patches',config.channel,'native-'+config.nativeVersion);fs.mkdirSync(dir,{recursive:true});
 fs.writeFileSync(path.join(dir,'manifest.json'),JSON.stringify(manifest));
 // the playable web build (for quick tests in a browser): /play/
 const play=path.join(output,'play');fs.mkdirSync(path.join(play,'assets'),{recursive:true});
 for(const f of files)fs.writeFileSync(path.join(play,f.path),content(f.path));
 fs.writeFileSync(path.join(output,'index.html'),'<!doctype html><meta charset="utf-8"><title>Duck War updates</title><p>Duck War game content. <a href="play/">Play in the browser</a></p>');
 return manifest;
}
function android(expectedNative){
 const config=JSON.parse(fs.readFileSync(path.join(root,'patch-config.json'),'utf8'));
 if(config.nativeVersion!==expectedNative)throw Error('Android versionCode and patch nativeVersion must match');
 const output=path.join(root,'patch-dist'),m=build(output);
 const contentDir=path.join(root,'app/build/generated/gameAssets'),manifestDir=path.join(root,'app/build/generated/patchAssets');
 fs.rmSync(contentDir,{recursive:true,force:true});fs.mkdirSync(contentDir,{recursive:true});fs.mkdirSync(manifestDir,{recursive:true});
 for(const f of m.files){const dest=path.join(contentDir,f.path);fs.mkdirSync(path.dirname(dest),{recursive:true});fs.copyFileSync(path.join(output,'objects',f.sha256),dest);}
 fs.writeFileSync(path.join(manifestDir,'patch-bundled.json'),JSON.stringify(m));
 return m;
}
if(require.main===module){const i=process.argv.indexOf('--native-version');const m=process.argv.includes('--android')?android(Number(process.argv[i+1])):build();console.log('Patch',m.label,m.files.length,'files');}
module.exports={build,android};
