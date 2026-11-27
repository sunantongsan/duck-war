package com.sunantongsan.duckwar;

import android.app.Activity;
import android.graphics.Color;
import android.graphics.drawable.GradientDrawable;
import android.os.Bundle;
import android.view.Gravity;
import android.view.View;
import android.view.WindowInsets;
import android.webkit.*;
import android.widget.FrameLayout;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.ProgressBar;
import android.widget.TextView;
import androidx.webkit.WebViewAssetLoader;

/** Duck War: a full-screen WebView game. The welcome screen checks for a content patch, then starts the game. */
public class MainActivity extends Activity {
    private static final String GAME_URL = "https://appassets.androidplatform.net/assets/index.html";
    private WebView game;
    private GamePatcher patcher;
    private DuckTransfer transfer;
    void transferEvent(String event, org.json.JSONObject data) {
        if (!destroyed) game.evaluateJavascript("window.novaAccountEvent && window.novaAccountEvent(" +
            org.json.JSONObject.quote(event) + "," + data.toString() + ")", null);
    }
    @Override protected void onNewIntent(android.content.Intent intent) {
        super.onNewIntent(intent); setIntent(intent); transfer.callback(intent.getData());
    }
    private FrameLayout welcome;
    private TextView status;
    private ProgressBar progress;
    private boolean ready, destroyed, rolledBack;

    private void showProgress(String message, int percent) {
        if (destroyed) return;
        status.setText(message); progress.setIndeterminate(percent < 0);
        if (percent >= 0) progress.setProgress(percent);
    }
    private void loadGame() { if (destroyed) return; game.getSettings().setCacheMode(WebSettings.LOAD_NO_CACHE); game.loadUrl(GAME_URL); }
    private void finishBoot() {
        game.evaluateJavascript("!!window.duckReady && !window.duckError", value -> {
            if (destroyed) return;
            if ("true".equals(value)) { if (!ready) transfer.callback(getIntent().getData()); ready = true; welcome.setVisibility(View.GONE); patcher.bootSucceeded(); }
            else if (!rolledBack && patcher.rollback()) { rolledBack = true; showProgress("กำลังกู้คืนข้อมูลเกมชุดก่อนหน้า…", -1); loadGame(); }
            else showProgress("เปิดเกมไม่สำเร็จ กรุณาปิดแล้วเปิดเกมอีกครั้ง", 0);
        });
    }
    private FrameLayout createWelcome() {
        FrameLayout scene = new FrameLayout(this); scene.setBackgroundColor(0xff7cc8f0);
        ImageView art = new ImageView(this); art.setScaleType(ImageView.ScaleType.CENTER_CROP);
        try (java.io.InputStream in = getAssets().open("assets/welcome.webp")) { art.setImageDrawable(android.graphics.drawable.Drawable.createFromStream(in, null)); } catch (Exception ignored) {}
        scene.addView(art, new FrameLayout.LayoutParams(-1, -1));
        int gap = (int) (10 * getResources().getDisplayMetrics().density);
        LinearLayout panel = new LinearLayout(this); panel.setOrientation(LinearLayout.VERTICAL); panel.setPadding(gap * 4, gap / 2, gap * 4, gap);
        panel.setBackground(new GradientDrawable(GradientDrawable.Orientation.TOP_BOTTOM, new int[]{0x0013365a, 0x8813365a}));
        status = new TextView(this); status.setText("กำลังตรวจสอบข้อมูลเกม…"); status.setTextColor(Color.WHITE); status.setTextSize(13); status.setGravity(Gravity.CENTER);
        status.setShadowLayer(4, 0, 2, 0xff13365a); panel.addView(status);
        progress = new ProgressBar(this, null, android.R.attr.progressBarStyleHorizontal); progress.setMax(100); progress.setIndeterminate(true);
        progress.setProgressTintList(android.content.res.ColorStateList.valueOf(0xffffd23a)); panel.addView(progress);
        scene.addView(panel, new FrameLayout.LayoutParams(-1, -2, Gravity.BOTTOM));
        return scene;
    }
    @Override public void onCreate(Bundle state) {
        super.onCreate(state);
        game = new WebView(this); game.setBackgroundColor(0xff7cc8f0);
        WebSettings s = game.getSettings();
        s.setJavaScriptEnabled(true); s.setDomStorageEnabled(true); s.setAllowFileAccess(false); s.setAllowContentAccess(false);
        s.setMixedContentMode(WebSettings.MIXED_CONTENT_NEVER_ALLOW); s.setMediaPlaybackRequiresUserGesture(false);
        WebViewAssetLoader assets = new WebViewAssetLoader.Builder().addPathHandler("/assets/", new WebViewAssetLoader.AssetsPathHandler(this)).build();
        transfer = new DuckTransfer(this);
        game.addJavascriptInterface(transfer,"DuckTransfer");
        game.addJavascriptInterface(new Haptics(game), "DuckHaptics");
        game.setWebViewClient(new WebViewClient() {
            @Override public void onPageFinished(WebView view, String url) { if (url.equals(GAME_URL)) { finishBoot(); immersive(); } }
            @Override public WebResourceResponse shouldInterceptRequest(WebView view, WebResourceRequest request) {
                WebResourceResponse response = null;
                if (patcher != null && "appassets.androidplatform.net".equals(request.getUrl().getHost())) {
                    String path = request.getUrl().getPath();
                    if (path != null && path.startsWith("/assets/")) response = patcher.resource(path.substring(8));
                }
                if (response == null) response = assets.shouldInterceptRequest(request.getUrl());
                return response != null ? response : new WebResourceResponse("text/plain", "UTF-8", new java.io.ByteArrayInputStream(new byte[0]));
            }
            @Override public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) { return true; }
        });
        FrameLayout root = new FrameLayout(this);
        root.addView(game, new FrameLayout.LayoutParams(-1, -1));
        welcome = createWelcome(); root.addView(welcome, new FrameLayout.LayoutParams(-1, -1));
        root.setOnApplyWindowInsetsListener((v, insets) -> {
            int l = 0, t = 0, r = 0, b = 0;
            if (android.os.Build.VERSION.SDK_INT >= 28 && insets.getDisplayCutout() != null) {
                android.view.DisplayCutout c = insets.getDisplayCutout(); l = c.getSafeInsetLeft(); t = c.getSafeInsetTop(); r = c.getSafeInsetRight(); b = c.getSafeInsetBottom();
            }
            float d = getResources().getDisplayMetrics().density;
            game.evaluateJavascript("document.documentElement.style.setProperty('--safe-l','" + (l / d) + "px');document.documentElement.style.setProperty('--safe-r','" + (r / d)
                + "px');document.documentElement.style.setProperty('--safe-t','" + (t / d) + "px');document.documentElement.style.setProperty('--safe-b','" + (b / d) + "px');", null);
            return insets;
        });
        setContentView(root); immersive(); root.requestApplyInsets();
        patcher = new GamePatcher(this, new GamePatcher.Listener() {
            public void progress(String text, int percent) { runOnUiThread(() -> showProgress(text, percent)); }
            public void ready() { runOnUiThread(() -> loadGame()); }
        });
        patcher.start();
        if (android.os.Build.VERSION.SDK_INT >= 33) getOnBackInvokedDispatcher().registerOnBackInvokedCallback(0, () -> game.evaluateJavascript("window.duckBack && window.duckBack()", null));
    }
    @Override public void onBackPressed() { game.evaluateJavascript("window.duckBack && window.duckBack()", null); }
    @Override protected void onPause() { game.evaluateJavascript("window.duckPause && window.duckPause()", null); game.onPause(); super.onPause(); }
    @Override protected void onResume() { super.onResume(); immersive(); game.onResume(); }
    @Override public void onWindowFocusChanged(boolean focused) { super.onWindowFocusChanged(focused); if (focused) immersive(); }
    @Override protected void onDestroy() { destroyed = true; if (transfer != null) transfer.destroy(); if (patcher != null) patcher.destroy(); game.destroy(); super.onDestroy(); }
    private void immersive() {
        android.view.Window w = getWindow(); View decor = w.getDecorView();
        if (android.os.Build.VERSION.SDK_INT >= 28) {
            android.view.WindowManager.LayoutParams p = w.getAttributes();
            p.layoutInDisplayCutoutMode = android.os.Build.VERSION.SDK_INT >= 30 ? android.view.WindowManager.LayoutParams.LAYOUT_IN_DISPLAY_CUTOUT_MODE_ALWAYS : android.view.WindowManager.LayoutParams.LAYOUT_IN_DISPLAY_CUTOUT_MODE_SHORT_EDGES;
            w.setAttributes(p);
        }
        if (android.os.Build.VERSION.SDK_INT >= 30) {
            w.setDecorFitsSystemWindows(false); android.view.WindowInsetsController c = w.getInsetsController();
            if (c != null) { c.setSystemBarsBehavior(android.view.WindowInsetsController.BEHAVIOR_SHOW_TRANSIENT_BARS_BY_SWIPE); c.hide(WindowInsets.Type.systemBars()); }
        } else decor.setSystemUiVisibility(View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY | View.SYSTEM_UI_FLAG_FULLSCREEN | View.SYSTEM_UI_FLAG_HIDE_NAVIGATION | View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN | View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION | View.SYSTEM_UI_FLAG_LAYOUT_STABLE);
    }
}
