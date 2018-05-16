package com.anoah.youxueban.teacher;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;

import org.apache.cordova.CordovaActivity;

/**
 * Created by liuwenxing on 2018/4/16.
 */

public class CordDemoActitivy extends CordovaActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        loadUrl(launchUrl);
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent intent) {
        super.onActivityResult(requestCode, resultCode, intent);
        Log.e("BBBB","BBB");
    }
}
