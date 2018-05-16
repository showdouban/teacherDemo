package com.anoah.youxueban.teacher;

import android.Manifest;
import android.app.AlertDialog;
import android.content.Intent;
import android.os.Build;
import android.os.Bundle;
import android.os.CountDownTimer;
import android.support.annotation.NonNull;
import android.support.v4.app.ActivityCompat;
import android.support.v7.app.AppCompatActivity;
import android.widget.TextView;

import com.anoah.commonlibrary.base.utils.PermissionsDialog;
import com.umeng.analytics.MobclickAgent;

import permissions.dispatcher.NeedsPermission;
import permissions.dispatcher.OnNeverAskAgain;
import permissions.dispatcher.OnShowRationale;
import permissions.dispatcher.PermissionRequest;
import permissions.dispatcher.PermissionUtils;
import permissions.dispatcher.RuntimePermissions;
import pub.devrel.easypermissions.AppSettingsDialog;

/**
 * Created by liuwenxing on 2018/4/10.
 */
@RuntimePermissions
public class WelcomeActivity extends BaseActivity {
    public static final int REQUEST_PERM = 123;
    private TextView tv_time;
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_welcome);
        //审核权限
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            WelcomeActivityPermissionsDispatcher.startActivityWithPermissionCheck(this);
        }else{
            startActivity();
        }
    }

    @NeedsPermission(value = {Manifest.permission.READ_PHONE_STATE,Manifest.permission.WRITE_EXTERNAL_STORAGE})
    protected void startActivity(){
        tv_time = findViewById(R.id.tv_time);
        CountDownTimer cdt = new CountDownTimer(1000, 1000) {
            @Override
            public void onTick(long millisUntilFinished) {
                tv_time.setText((millisUntilFinished/1000)+"秒");
            }
            @Override
            public void onFinish() {
                tv_time.setText(0+"秒");
                startActivity(new Intent(WelcomeActivity.this,CordDemoActitivy.class));
                finish();
            }
        };

        cdt.start();
    }

    @OnNeverAskAgain(value = {Manifest.permission.READ_PHONE_STATE,Manifest.permission.WRITE_EXTERNAL_STORAGE})
    protected void onPermissionsDeniedActivity(){
        new AppSettingsDialog.Builder(this)
                .setRationale("启动应用需要权限")
                .setTitle("权限申请")
                .setPositiveButton("确认")
                .setNegativeButton("取消")
                .setRequestCode(REQUEST_PERM)
                .build()
                .show();
    }

    @OnShowRationale(value = {Manifest.permission.READ_PHONE_STATE,Manifest.permission.WRITE_EXTERNAL_STORAGE})
    //给用户解释要请求什么权限，为什么需要此权限
    protected void showRationaleService(final PermissionRequest request) {
        PermissionsDialog.getInstance().show(this, "启动应用需要权限",false,true, new PermissionsDialog.IPermissionClickCallback() {
            @Override
            public void onClickYes() {
                request.proceed();//继续执行请求
            }

            @Override
            public void onClickNo() {
                request.cancel();//取消执行请求
            }
        });
    }


//    @Override
//    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
//        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
////        if(!PermissionUtils.verifyPermissions(grantResults)){
////            mToastUtil.showToast("权限申请失败!");
////            finish();
////            return;
////        }
//        WelcomeActivityPermissionsDispatcher.onRequestPermissionsResult(this,requestCode,grantResults);
//    }


    @Override
    protected void onPause() {
        super.onPause();
        //如果该activity包含fragment，就不调用MobclickAgent.onPageEnd(this.getClass().getSimpleName())在fragment中使用
        MobclickAgent.onPageEnd(this.getClass().getSimpleName()); //手动统计页面，必须保证 onPageEnd 在 onPause 之前调用，因为SDK会在 onPause 中保存onPageEnd统计到的页面数据。
        MobclickAgent.onPause(this);
    }

    @Override
    protected void onResume() {
        super.onResume();
        MobclickAgent.onPageStart(this.getClass().getSimpleName()); //手动统计页面
        MobclickAgent.onResume(this); //统计时长
    }
}
