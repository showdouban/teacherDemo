package com.anoah.youxueban.teacher;

import android.os.Bundle;

import com.umeng.message.PushAgent;

import org.apache.cordova.CordovaActivity;

/**
 * Created by liuwenxing on 2018/4/10.
 */

public class BaseWebActivity extends CordovaActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        PushAgent.getInstance(this).onAppStart();//推送使用的
    }

    @Override
    protected void onPause() {
        super.onPause();
    }

    @Override
    protected void onResume() {
        super.onResume();
    }
}
