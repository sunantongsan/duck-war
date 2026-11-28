package com.sunantongsan.duckwar;

import android.os.Bundle;
import android.os.SystemClock;
import android.webkit.JavascriptInterface;
import com.google.android.gms.ads.*;
import com.google.android.gms.ads.interstitial.*;
import com.google.android.gms.ads.rewarded.*;
import com.google.ads.mediation.admob.AdMobAdapter;
import com.google.android.ump.*;

/** Interstitials only at transitions; rewarded ads only after an explicit request. No reward on dismissal. */
final class GameAds {
    private final MainActivity activity;
    private final ConsentInformation consent;
    private InterstitialAd ready;
    private RewardedAd rewardReady;
    private boolean rewardLoading;
    private long rewardLoadedAt;
    private static final long REWARD_TTL_MS = 3500000L;
    private static final long REWARD_RETRY_MS = 30000L;
    private long rewardRetryAt;
    private final android.os.Handler adHandler = new android.os.Handler(android.os.Looper.getMainLooper());
    private final Runnable rewardRetry = this::preloadReward;
    private boolean privacyFormOpen;
    private boolean bannerAllowed;
    private long bannerRetryAt;
    /** During a raid no ad is loaded: an ad load builds a hidden WebView on the main thread and made battles stutter. */
    private boolean inBattle;
    @JavascriptInterface public void battle(boolean on) {
        activity.runOnUiThread(() -> {
            if (destroyed || inBattle == on) return;
            inBattle = on;
            if (on) { adHandler.removeCallbacks(rewardRetry); adHandler.removeCallbacks(bannerRetry); }
            else if (sdkReady) load();
        });
    }


    private static final String REWARD_UNIT = "ca-app-pub-3940256099942544/5224354917";
    @JavascriptInterface public void showRewarded() {
        activity.runOnUiThread(() -> {
            if (destroyed) return;
            if (!enabled() || !consent.canRequestAds() || !foreground || showing || rewardReady == null
                    || SystemClock.elapsedRealtime() - rewardLoadedAt >= REWARD_TTL_MS) {
                activity.rewardResult("unavailable");
                preloadReward();
                return;
            }
            RewardedAd ad = rewardReady;
            rewardReady = null;
            showing = true;
            final boolean[] earned = {false};
            ad.setFullScreenContentCallback(new FullScreenContentCallback() {
                @Override public void onAdDismissedFullScreenContent() {
                    showing = false;
                    if (!destroyed) activity.rewardResult(earned[0] ? "earned" : "closed");
                    preloadReward();
                }
                @Override public void onAdFailedToShowFullScreenContent(AdError error) {
                    rewardFailedToShow();
                }
            });
            try {
                ad.show(activity, item -> earned[0] = true);
            } catch (RuntimeException error) {
                rewardFailedToShow();
            }
        });
    }
    private void rewardFailedToShow() {
        showing = false;
        if (!destroyed) activity.rewardResult("unavailable");
        retryReward();
    }
    private void retryReward() {
        rewardRetryAt = SystemClock.elapsedRealtime() + REWARD_RETRY_MS;
        scheduleReward(REWARD_RETRY_MS);
    }
    private void scheduleReward(long delay) {
        adHandler.removeCallbacks(rewardRetry);
        if (foreground && !destroyed && !privacyFormOpen && !inBattle) adHandler.postDelayed(rewardRetry, delay);
    }
    private void preloadReward() {
        long now = SystemClock.elapsedRealtime();
        if (!sdkReady || destroyed || privacyFormOpen || !foreground || inBattle || !consent.canRequestAds() || showing || rewardLoading) return;
        long nextLoad = rewardReady == null ? rewardRetryAt : rewardLoadedAt + REWARD_TTL_MS;
        if (nextLoad > now) {
            scheduleReward(nextLoad - now);
            return;
        }
        rewardReady = null;
        rewardLoading = true;
        int gen = generation;
        Bundle extras = new Bundle();
        extras.putString("npa", "1");
        try {
            RewardedAd.load(activity, REWARD_UNIT, new AdRequest.Builder().addNetworkExtrasBundle(AdMobAdapter.class, extras).build(), new RewardedAdLoadCallback() {
                @Override public void onAdLoaded(RewardedAd ad) {
                    rewardLoading = false;
                    if (destroyed) return;
                    if (gen != generation) { preloadReward(); return; }
                    if (consent.canRequestAds()) {
                        rewardReady = ad;
                        rewardLoadedAt = SystemClock.elapsedRealtime();
                        scheduleReward(REWARD_TTL_MS);
                    }
                }
                @Override public void onAdFailedToLoad(LoadAdError error) {
                    rewardLoading = false;
                    if (destroyed) return;
                    if (gen != generation) { preloadReward(); return; }
                    retryReward();
                }
            });
        } catch (RuntimeException e) {
            rewardLoading = false;
            retryReward();
        }
    }
    private static final String TEST_BANNER = "ca-app-pub-3940256099942544/6300978111", TEST_INTERSTITIAL = "ca-app-pub-3940256099942544/1033173712";
    @JavascriptInterface public void bannerLayoutAllowed(boolean allowed) {
        activity.runOnUiThread(() -> { if (destroyed) return;
            bannerAllowed = allowed;
            activity.showBanner(allowed && foreground && bannerLoaded ? banner : null);
            if (allowed) {
                if (banner != null && foreground) banner.resume();
                loadBanner();
            } else {
                adHandler.removeCallbacks(bannerRetry);
                if (banner != null) banner.pause();
            } });
    }
    private AdView banner;
    private boolean bannerLoaded;
    private final Runnable bannerRetry = this::loadBanner;
    private void clearBanner() {
        adHandler.removeCallbacks(bannerRetry);
        bannerLoaded=false;
        activity.showBanner(null);
        if (banner!=null) { banner.destroy(); banner=null; }
    }
    private void loadBanner() {
        if (!sdkReady || !foreground || inBattle || !bannerAllowed || !enabled() || !consent.canRequestAds() || banner!=null) return;
        adHandler.removeCallbacks(bannerRetry);
        long remaining = bannerRetryAt - SystemClock.elapsedRealtime();
        if (remaining > 0) {
            adHandler.postDelayed(bannerRetry, remaining);
            return;
        }
        final AdView view=new AdView(activity);
        final int gen=generation;
        banner=view;
        view.setAdSize(AdSize.BANNER);
        view.setAdUnitId(TEST_BANNER);
        view.setAdListener(new AdListener() {
            @Override public void onAdLoaded() {
                if (banner!=view || destroyed || gen!=generation) return;
                if (!enabled() || !consent.canRequestAds()) { clearBanner(); return; }
                bannerLoaded=true;
                if (foreground && bannerAllowed) activity.showBanner(view);
            }
            @Override public void onAdFailedToLoad(LoadAdError error) {
                if (banner!=view || destroyed) return;
                clearBanner();
                long delay = error.getCode() == AdRequest.ERROR_CODE_NETWORK_ERROR ? 15000L : 60000L;
                bannerRetryAt = SystemClock.elapsedRealtime() + delay;
                if (foreground && bannerAllowed && !inBattle) adHandler.postDelayed(bannerRetry, delay);
            }
        });
        Bundle extras=new Bundle(); extras.putString("npa","1");
        view.loadAd(new AdRequest.Builder().addNetworkExtrasBundle(AdMobAdapter.class,extras).build());
    }
    private boolean sdkReady, initialized, loading, showing, destroyed, foreground;
    private long lastShown = SystemClock.elapsedRealtime();
    private int generation;
    GameAds(MainActivity activity) {
        this.activity = activity;
        consent = UserMessagingPlatform.getConsentInformation(activity);
    }
    void begin() {
        if (enabled()) requestConsent();
    }
    private boolean enabled() { return !destroyed && !privacyFormOpen; }
    // Ads are on by default, like other games. Google's consent form (UMP) appears by itself only
    // where the law requires it; this opens Google's privacy options there and does nothing elsewhere.
    @JavascriptInterface public boolean privacyRequired() {
        return consent.getPrivacyOptionsRequirementStatus() == ConsentInformation.PrivacyOptionsRequirementStatus.REQUIRED;
    }
    @JavascriptInterface public void settings() {
        activity.runOnUiThread(() -> {
            if (!enabled() || showing || !privacyRequired()) return;
            privacyFormOpen=true;
            adHandler.removeCallbacks(rewardRetry);
            ready=null; rewardReady=null; generation++; clearBanner();
            UserMessagingPlatform.showPrivacyOptionsForm(activity, error -> { privacyFormOpen=false; initialize(); });
        });
    }
    private void requestConsent() {
        if (!enabled()) return;
        consent.requestConsentInfoUpdate(activity, new ConsentRequestParameters.Builder().build(),
            () -> UserMessagingPlatform.loadAndShowConsentFormIfRequired(activity, error -> initialize()),
            error -> initialize());
        initialize();
    }
    private void initialize() {
        if (!enabled() || !consent.canRequestAds()) return;
        if (initialized) { if (sdkReady) load(); return; }
        initialized=true;
        MobileAds.setRequestConfiguration(new RequestConfiguration.Builder()
            .setMaxAdContentRating(RequestConfiguration.MAX_AD_CONTENT_RATING_PG).build());
        new Thread(() -> MobileAds.initialize(activity, status -> activity.runOnUiThread(() -> { sdkReady = true; load(); }))).start();
    }
    private void load() {
        preloadReward();
        loadBanner();
        if (!sdkReady || !foreground || inBattle || !enabled() || !consent.canRequestAds() || loading || ready!=null) return;
        loading=true;
        final int requestGeneration=generation;
        Bundle extras = new Bundle(); extras.putString("npa", "1");
        AdRequest request = new AdRequest.Builder().addNetworkExtrasBundle(AdMobAdapter.class, extras).build();
        InterstitialAd.load(activity, TEST_INTERSTITIAL, request, new InterstitialAdLoadCallback() {
            @Override public void onAdLoaded(InterstitialAd ad) {
                loading=false;
                if (enabled() && consent.canRequestAds() && generation==requestGeneration) ready=ad;
            }
            @Override public void onAdFailedToLoad(LoadAdError error) { loading=false; ready=null; }
        });
    }
    @JavascriptInterface public void levelComplete() {
        activity.runOnUiThread(() -> {
            if (showing || destroyed) return;
            if (!enabled() || !foreground || !consent.canRequestAds() || ready==null || SystemClock.elapsedRealtime()-lastShown<90000) {
                if (sdkReady) load(); return;
            }
            InterstitialAd ad=ready; ready=null; showing=true;
            ad.setFullScreenContentCallback(new FullScreenContentCallback() {
                @Override public void onAdDismissedFullScreenContent() { showing=false; lastShown=SystemClock.elapsedRealtime();load(); }
                @Override public void onAdFailedToShowFullScreenContent(AdError error) { showing=false;load(); }
            });
            try { ad.show(activity); }
            catch (RuntimeException error) { showing=false;load(); }
        });
    }
    void resume() { foreground=true; if (sdkReady) load(); if(banner!=null && bannerAllowed) { banner.resume(); if(bannerLoaded && enabled() && consent.canRequestAds()) activity.showBanner(banner); } else loadBanner(); }
    void pause() { foreground=false; adHandler.removeCallbacks(rewardRetry); adHandler.removeCallbacks(bannerRetry); if(banner!=null) banner.pause(); activity.showBanner(null); }
    void destroy() { destroyed=true; adHandler.removeCallbacksAndMessages(null); generation++; ready=null; rewardReady=null; clearBanner(); }
}
