package com.sunantongsan.duckwar;

import android.content.Intent;
import android.content.SharedPreferences;
import android.net.Uri;
import android.webkit.JavascriptInterface;
import android.util.Base64;
import org.json.JSONObject;
import org.json.JSONArray;
import java.net.URL;
import javax.net.ssl.HttpsURLConnection;
import java.nio.charset.StandardCharsets;
import java.security.KeyStore;
import java.security.MessageDigest;
import java.security.SecureRandom;
import javax.crypto.Cipher;
import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import javax.crypto.spec.GCMParameterSpec;
import android.security.keystore.KeyGenParameterSpec;
import android.security.keystore.KeyProperties;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

/** Optional private campaign backups. Tokens never enter JavaScript; PKCE browser login. */
final class DuckTransfer {
    private final MainActivity activity;
    private final SharedPreferences prefs;
    private final ExecutorService worker=Executors.newSingleThreadExecutor();
    private boolean closed;
    private static final String CALLBACK="novastriker://auth/callback";
    DuckTransfer(MainActivity activity){this.activity=activity;prefs=activity.getSharedPreferences("nova_cloud",0);}
    private void emit(String event,JSONObject data){activity.runOnUiThread(()->{if(!closed)activity.transferEvent(event,data);});}
    private void status(String text){try{emit("error",new JSONObject().put("message",text));}catch(Exception ignored){}}
    private String encode(byte[] bytes){return Base64.encodeToString(bytes,Base64.URL_SAFE|Base64.NO_WRAP|Base64.NO_PADDING);}
    private SecretKey encryptionKey() throws Exception {
        KeyStore store=KeyStore.getInstance("AndroidKeyStore");store.load(null);
        if(!store.containsAlias("nova_cloud_session")){
            KeyGenerator gen=KeyGenerator.getInstance(KeyProperties.KEY_ALGORITHM_AES,"AndroidKeyStore");
            gen.init(new KeyGenParameterSpec.Builder("nova_cloud_session",KeyProperties.PURPOSE_ENCRYPT|KeyProperties.PURPOSE_DECRYPT).setBlockModes(KeyProperties.BLOCK_MODE_GCM).setEncryptionPaddings(KeyProperties.ENCRYPTION_PADDING_NONE).build());gen.generateKey();
        }
        return ((KeyStore.SecretKeyEntry)store.getEntry("nova_cloud_session",null)).getSecretKey();
    }
    private void keep(JSONObject session)throws Exception {
        if(!session.has("expires_at"))session.put("expires_at",System.currentTimeMillis()/1000+session.optLong("expires_in",3600));
        Cipher cipher=Cipher.getInstance("AES/GCM/NoPadding");cipher.init(Cipher.ENCRYPT_MODE,encryptionKey());
        byte[] encrypted=cipher.doFinal(session.toString().getBytes(StandardCharsets.UTF_8));
        prefs.edit().putString("session",encode(encrypted)).putString("iv",encode(cipher.getIV())).commit();
    }
    private JSONObject read()throws Exception {
        String encrypted=prefs.getString("session","");if(encrypted.isEmpty())throw new Exception("login_required");
        Cipher cipher=Cipher.getInstance("AES/GCM/NoPadding");cipher.init(Cipher.DECRYPT_MODE,encryptionKey(),new GCMParameterSpec(128,Base64.decode(prefs.getString("iv",""),Base64.URL_SAFE)));
        return new JSONObject(new String(cipher.doFinal(Base64.decode(encrypted,Base64.URL_SAFE)),StandardCharsets.UTF_8));
    }
    private String request(String path,String method,JSONObject body,String token)throws Exception {
        HttpsURLConnection c=(HttpsURLConnection)new URL(BuildConfig.NOVA_CLOUD_URL+path).openConnection();
        c.setConnectTimeout(15000);c.setReadTimeout(15000);c.setInstanceFollowRedirects(false);c.setRequestMethod(method);c.setRequestProperty("apikey",BuildConfig.NOVA_CLOUD_KEY);c.setRequestProperty("Content-Type","application/json");c.setRequestProperty("Prefer","return=representation");
        if(token!=null)c.setRequestProperty("Authorization","Bearer "+token);
        try{if(body!=null){c.setDoOutput(true);try(java.io.OutputStream out=c.getOutputStream()){out.write(body.toString().getBytes(StandardCharsets.UTF_8));}}
            int code=c.getResponseCode();java.io.InputStream input=code>=200&&code<300?c.getInputStream():c.getErrorStream();
            java.io.ByteArrayOutputStream buffer=new java.io.ByteArrayOutputStream();if(input!=null)try(java.io.InputStream in=input){byte[] bytes=new byte[4096];int n;while((n=in.read(bytes))!=-1){buffer.write(bytes,0,n);if(buffer.size()>262144)throw new Exception("response_too_large");}}
            if(code<200||code>=300){
                String business=null;
                try{JSONObject err=new JSONObject(buffer.toString("UTF-8"));if("P0001".equals(err.optString("code")))business=err.optString("message");}catch(Exception ignored){}
                if(business!=null&&business.length()<200)throw new Exception("game:"+business);
                throw new Exception("http_"+code);
            }
            return buffer.toString("UTF-8");
        }finally{c.disconnect();}
    }
    private JSONObject session()throws Exception {
        JSONObject s=read();if(s.optLong("expires_at")*1000<System.currentTimeMillis()+60000){s=new JSONObject(request("/auth/v1/token?grant_type=refresh_token","POST",new JSONObject().put("refresh_token",s.getString("refresh_token")),null));keep(s);}return s;
    }
    @JavascriptInterface public void login(){

        activity.runOnUiThread(()->{try{
            byte[] bytes=new byte[32];new SecureRandom().nextBytes(bytes);String verifier=encode(bytes),challenge=encode(MessageDigest.getInstance("SHA-256").digest(verifier.getBytes(StandardCharsets.US_ASCII)));
            prefs.edit().putString("verifier",verifier).putLong("login_at",System.currentTimeMillis()).putBoolean("recovery",false).commit();
            Uri uri=Uri.parse(BuildConfig.NOVA_CLOUD_URL+"/auth/v1/authorize").buildUpon().appendQueryParameter("provider","google").appendQueryParameter("prompt","select_account").appendQueryParameter("redirect_to",CALLBACK).appendQueryParameter("code_challenge",challenge).appendQueryParameter("code_challenge_method","s256").build();
            activity.startActivity(new Intent(Intent.ACTION_VIEW,uri));
        }catch(Exception e){status("เปิดหน้าล็อกอินไม่ได้ กรุณาลองใหม่");}});
    }
    void callback(Uri uri){
        if(uri==null||!"novastriker".equals(uri.getScheme())||!"auth".equals(uri.getHost())||!"/callback".equals(uri.getPath()))return;
        String code=uri.getQueryParameter("code"),verifier=prefs.getString("verifier","");long age=System.currentTimeMillis()-prefs.getLong("login_at",0);
        boolean recovery=prefs.getBoolean("recovery",false);
        prefs.edit().remove("verifier").remove("login_at").remove("recovery").commit();
        if(code==null||verifier.isEmpty()||age<0||age>3600000){status("การล็อกอินหมดอายุหรือยกเลิก กรุณาลองใหม่");return;}
        worker.execute(()->{try{JSONObject s=new JSONObject(request("/auth/v1/token?grant_type=pkce","POST",new JSONObject().put("auth_code",code).put("code_verifier",verifier),null));keep(s);if(recovery){prefs.edit().putBoolean("recovery_ready",true).commit();emit("password_recovery",new JSONObject());}else emit("signed_in",new JSONObject().put("id",s.getJSONObject("user").getString("id")));}catch(Exception e){status("ล็อกอินไม่สำเร็จ ตรวจอินเทอร์เน็ตแล้วลองใหม่");}});
    }

    @JavascriptInterface public boolean hasStoredSession() { return prefs.contains("session"); }
    @JavascriptInterface public String owner() {
        try { return read().getJSONObject("user").getString("id"); }
        catch (Exception e) { return ""; }
    }
    @JavascriptInterface public void emailLogin(String email,String password) {
        if (email == null || password == null || !android.util.Patterns.EMAIL_ADDRESS.matcher(email).matches() || password.length() > 128) return;
        worker.execute(() -> {
            try {
                JSONObject result = new JSONObject(request("/auth/v1/token?grant_type=password", "POST",
                    new JSONObject().put("email",email).put("password",password),null));
                keep(result); emit("signed_in",new JSONObject());
            } catch (Exception e) { status("เข้าสู่ระบบไม่สำเร็จ กรุณาตรวจบัญชี Nova เดิมและอินเทอร์เน็ต"); }
        });
    }
    @JavascriptInterface public void claim(String device,String owner,String visible) {
        worker.execute(() -> {
            try {
                JSONObject auth=session();
                if (!auth.getJSONObject("user").getString("id").equals(owner)) throw new Exception("account_mismatch");
                JSONObject args=new JSONObject().put("device_id",device).put("expected_owner",owner);
                if (!visible.isEmpty()) args.put("visible_nova",Long.parseLong(visible));
                JSONObject result=new JSONObject(request("/rest/v1/rpc/duck45_claim","POST",args,auth.getString("access_token")));
                emit("claim",result);
            } catch (Exception e) { status("ยังตรวจยอดย้ายไม่ได้ กรุณาเชื่อมต่อแล้วลองอีกครั้งในเมนูย้ายยอด"); }
        });
    }
    @JavascriptInterface public void emailSignup(String email,String password) {
        if (email==null || password==null || !android.util.Patterns.EMAIL_ADDRESS.matcher(email).matches() ||
                password.length()<8 || password.length()>128) { status("ตรวจอีเมลและตั้งรหัสผ่านอย่างน้อย 8 ตัวอักษร"); return; }
        worker.execute(() -> {
            try {
                byte[] bytes=new byte[32]; new SecureRandom().nextBytes(bytes);
                String verifier=encode(bytes);
                String challenge=encode(MessageDigest.getInstance("SHA-256").digest(verifier.getBytes(StandardCharsets.US_ASCII)));
                prefs.edit().putString("verifier",verifier).putLong("login_at",System.currentTimeMillis()).commit();
                JSONObject args=new JSONObject().put("email",email).put("password",password)
                    .put("code_challenge",challenge).put("code_challenge_method","s256");
                JSONObject result=new JSONObject(request("/auth/v1/signup?redirect_to="+Uri.encode(CALLBACK),"POST",args,null));
                if (result.has("access_token")) { keep(result); emit("signed_in", new JSONObject()); }
                else status("ตรวจอีเมลเพื่อยืนยันบัญชี แล้วกลับมาเข้าสู่ระบบด้วยอีเมลนี้");
            } catch (Exception e) { status("สมัครบัญชีไม่สำเร็จ กรุณาลองเข้าสู่ระบบหรือลองใหม่"); }
        });
    }
    void destroy() { closed=true;worker.shutdownNow(); }
}
