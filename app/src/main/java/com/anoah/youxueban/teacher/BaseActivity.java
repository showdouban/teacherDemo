package com.anoah.youxueban.teacher;

import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;

import com.umeng.message.PushAgent;

/**
 * Created by liuwenxing on 2018/4/10.
 */

public class BaseActivity extends AppCompatActivity {
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
