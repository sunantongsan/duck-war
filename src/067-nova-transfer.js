// The store update keeps Nova's WebView origin. The old save remains intact.
// Special compensation is only issued for a server-identified legacy account.
var novaTransferMessage = 'เพื่อเป็นการปลอบใจ ผู้พันเป็ดจึงมอบ Duck ให้ทุกคนอีกคนละ 500 สู้ต่อไป พลทหารเป็ดเป็ด!';
function oldNovaSave() {
  var raw = localStorage.getItem('novaRTS1');
  if (!raw) return null;
  var save = JSON.parse(raw);
  if (save.version !== 1 || !Array.isArray(save.buildings) || !save.buildings.some(function (b) { return b.type === 'hq'; }) ||
      !Number.isSafeInteger(save.gems) || save.gems < 0 || !Number.isSafeInteger(save.gems + 500)) {
    throw new Error('อ่านยอด NOVA เดิมไม่ได้ ข้อมูลเดิมยังเก็บอยู่ในเครื่อง');
  }
  return { nova: save.gems, owner: save.onlineCrystal && save.onlineCrystal.owner };
}
function transferPanel(continueGame) {
  var receipt = D.novaTransfer;
  openSheet('จดหมายจากผู้พันเป็ด', function (body) {
    if (receipt.bonus) body.appendChild(h('p', 'note', novaTransferMessage));
    body.appendChild(h('p', 'result', 'ยอด NOVA เดิม ' + receipt.nova.toLocaleString() + ' → ' + receipt.nova.toLocaleString() + ' Duck'));
    if (receipt.welcome) body.appendChild(h('p', 'note', 'โบนัสต้อนรับ +500 Duck'));
    if (receipt.bonus) body.appendChild(h('p', 'note', 'ของขวัญพิเศษจากผู้พันเป็ด +500 Duck'));
    body.appendChild(h('p', 'result', 'รวมได้รับ ' + (receipt.nova + receipt.bonus + receipt.welcome).toLocaleString() + ' Duck'));
    var ok = h('button', 'btn gold', 'รับทราบครับ ผู้พัน!');
    ok.onclick = function () { receipt.seen = true; writeSave(); closeSheet(); if (continueGame && D.ground === undefined) groundPicker(true); };
    body.appendChild(ok);
  });
}
function transferDuck(nova, owner, bonus, welcome) {
  if (D.novaTransfer) return false;
  if (!Number.isSafeInteger(nova) || nova < 0) throw new Error('ยอด NOVA ไม่ถูกต้อง');
  if (![0,500].includes(bonus) || ![0,500].includes(welcome)) throw new Error('โบนัสไม่ถูกต้อง');
  var total = D.res.coin + nova + bonus + welcome;
  if (!Number.isSafeInteger(total) || total < 0) throw new Error('ไม่สามารถยืนยันยอด Duck');
  var next = Object.assign({}, D, { res: Object.assign({}, D.res, {coin:total}),
    novaTransfer:{owner:owner,nova:nova,bonus:bonus,welcome:welcome,seen:false} });
  localStorage.setItem(SAVE_KEY, JSON.stringify(next)); // commit receipt and money together
  D = next;
  return true;
}
function novaAccountEvent(event, data) {
  if (event === 'signed_in') { beginNovaTransfer(); return; }
  if (event === 'error') { toast(data.message); return; }
  if (event !== 'claim' || D.novaTransfer) return;
  if (data.state === 'ready' && data.owner === window.DuckTransfer.owner()) {
    try { if (transferDuck(data.nova, data.owner, data.bonus, data.welcome)) { hud(); transferPanel(true); } }
    catch (e) { toast('ยังบันทึกยอดไม่ได้ เปิดเมนูย้ายยอดเพื่อลองอีกครั้ง'); }
  } else if (data.state === 'needs_reconciliation') toast('ยอดในเครื่องกับยอดที่บันทึกไว้ต่างกัน ระบบพักการโอนเพื่อรักษายอดเดิม');
  else if (data.state === 'already_delivered') toast('บัญชีนี้เคยรับยอดย้ายแล้วบนอีกเครื่อง');
  else if (data.state === 'not_open') toast('ระบบย้ายยอดจะเปิดพร้อมอัปเดต Duck War บน Google Play');
  else if (data.state === 'no_opening') toast('ยังไม่พบยอดย้ายที่เปิดรับสำหรับบัญชีนี้');
}
function beginNovaTransfer(manual) {
  if (!window.DuckTransfer) return false;
  if (D.novaTransfer) {
    if (manual || !D.novaTransfer.seen) { transferPanel(!manual); return true; }
    return false;
  }
  try {
    var old = oldNovaSave(), bridge = window.DuckTransfer, owner = bridge.owner();
    if (owner && (!old || !old.owner || old.owner === owner)) {
      var nonce = D.novaDeliveryKey;
      if (!nonce) {
        nonce = crypto.randomUUID();
        // Persist the request id before the server can reserve the transfer.
        var next = Object.assign({},D,{novaDeliveryKey:nonce});
        localStorage.setItem(SAVE_KEY,JSON.stringify(next)); D=next;
      }
      bridge.claim(nonce,owner,old && old.owner === owner ? String(old.nova) : '');
    } else if (manual || (old && old.owner)) {
      openSheet('ย้ายยอดจาก Nova War', function (body) {
        body.appendChild(h('p','note','ใช้บัญชีเดิมเพื่อย้าย NOVA หรือเข้าสู่ระบบเพื่อรับโบนัสต้อนรับตามสิทธิ์'));
        var google=h('button','btn gold','เข้าสู่ระบบด้วย Google'); google.onclick=function(){bridge.login();};body.appendChild(google);
        var email=document.createElement('input'), pass=document.createElement('input');
        email.type='email'; email.placeholder='อีเมลเดิม'; pass.type='password'; pass.placeholder='รหัสผ่านเดิม';
        body.appendChild(email); body.appendChild(pass);
        var sign=h('button','btn','เข้าสู่ระบบด้วยอีเมล');sign.onclick=function(){bridge.emailLogin(email.value,pass.value);pass.value='';};body.appendChild(sign);
        var signup=h('button','btn','สมัครบัญชี Duck War ด้วยอีเมล');signup.onclick=function(){bridge.emailSignup(email.value,pass.value);pass.value='';};body.appendChild(signup);
      });
      return true;
    }
  } catch(e) { toast('ยังย้ายยอดไม่ได้ กรุณาเก็บข้อมูล Nova เดิมไว้แล้วลองอีกครั้ง'); }
  return false;
}
