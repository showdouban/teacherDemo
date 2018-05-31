package com.anoah.youxueban.teacher;

import android.content.Context;
import android.content.Intent;
import android.os.Build;
import android.os.Bundle;
import android.os.Handler;
import android.util.Log;
import android.view.View;
import android.view.ViewGroup;
import android.view.Window;
import android.view.WindowManager;

import org.apache.cordova.CordovaActivity;
import org.crosswalk.engine.XWalkCordovaView;
import org.crosswalk.engine.XWalkWebViewEngine;
import org.json.JSONArray;
import org.xwalk.core.XWalkSettings;

/**
 * Created by liuwenxing on 2018/4/16.
 */

public class CordDemoActitivy extends CordovaActivity {
    private XWalkWebViewEngine xWalkWebViewEngine;
    private XWalkCordovaView xWalkCordovaView;
    @Override
    public void onCreate(Bundle savedInstanceState) {
        initWindows();
        super.onCreate(savedInstanceState);
        init();
        loadUrl(launchUrl);
    }
    private void initWindows() {
        Window window = getWindow();
        int color = getResources().getColor(android.R.color.transparent);
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            window.clearFlags(WindowManager.LayoutParams.FLAG_TRANSLUCENT_STATUS
                    | WindowManager.LayoutParams.FLAG_TRANSLUCENT_NAVIGATION);
            window.getDecorView().setSystemUiVisibility(View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN
                    | View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION
                    | View.SYSTEM_UI_FLAG_LAYOUT_STABLE);
            window.addFlags(WindowManager.LayoutParams.FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS);
            //设置状态栏颜色
            window.setStatusBarColor(color);
            //设置导航栏颜色
            window.setNavigationBarColor(color);
            ViewGroup contentView = ((ViewGroup) findViewById(android.R.id.content));
            View childAt = contentView.getChildAt(0);
            if (childAt != null) {
                childAt.setFitsSystemWindows(true);
            }
        } else if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {
            //透明状态栏
            window.addFlags(WindowManager.LayoutParams.FLAG_TRANSLUCENT_STATUS);
            //透明导航栏
            window.addFlags(WindowManager.LayoutParams.FLAG_TRANSLUCENT_NAVIGATION);
            //设置contentview为fitsSystemWindows
            ViewGroup contentView = (ViewGroup) findViewById(android.R.id.content);
            View childAt = contentView.getChildAt(0);
            if (childAt != null) {
                childAt.setFitsSystemWindows(true);
            }
            //给statusbar着色
            View view = new View(this);
            view.setLayoutParams(new ViewGroup.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, getStatusBarHeight(this)));
            view.setBackgroundColor(color);
            contentView.addView(view);
        }
    }

    @Override
    public Object onMessage(String id, Object data) {
        if(id.equals("OnXWalkReady")){
            initSetting();
        }
        return super.onMessage(id, data);
    }

    /**
     * 获取状态栏高度
     *
     * @param context context
     * @return 状态栏高度
     */
    private static int getStatusBarHeight(Context context) {
        // 获得状态栏高度
        int resourceId = context.getResources().getIdentifier("status_bar_height", "dimen", "android");
        return context.getResources().getDimensionPixelSize(resourceId);
    }
    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent intent) {
        super.onActivityResult(requestCode, resultCode, intent);
        Log.e("BBBB","BBB");
    }

    private void initSetting(){
        xWalkWebViewEngine = (XWalkWebViewEngine) appView.getEngine();
        xWalkCordovaView = (XWalkCordovaView) xWalkWebViewEngine.getView();
        if(xWalkCordovaView==null)return;
        xWalkCordovaView.setInitialScale(0);
        xWalkCordovaView.setVerticalScrollBarEnabled(false);
        // Enable JavaScript
        final XWalkSettings settings = xWalkCordovaView.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setJavaScriptCanOpenWindowsAutomatically(true);
        settings.setLayoutAlgorithm(XWalkSettings.LayoutAlgorithm.NORMAL);

//        //We don't save any form data in the application
//        settings.setSaveFormData(false);

        // Jellybean rightfully tried to lock this down. Too bad they didn't give us a whitelist
        // while we do this
        if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.JELLY_BEAN) {
            settings.setAllowUniversalAccessFromFileURLs(true);
        }
        if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.JELLY_BEAN_MR1) {
            settings.setMediaPlaybackRequiresUserGesture(false);
        }
        // Enable database
        settings.setDatabaseEnabled(true);

        // Enable DOM storage
        settings.setDomStorageEnabled(true);
        settings.setCacheMode(XWalkSettings.LOAD_DEFAULT);
        settings.setAllowFileAccess(true);
        settings.setAllowContentAccess(true);
        settings.setSaveFormData(true);
        settings.setLoadsImagesAutomatically(true);    //设置自动加载图片
    }
}
