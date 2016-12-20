package com.awesomeproject2;

import android.app.Application;
import android.util.Log;

import com.facebook.react.ReactApplication;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;

import java.util.Arrays;
import java.util.List;
import com.oblador.vectoricons.VectorIconsPackage;
import org.lovebing.reactnative.baidumap.BaiduMapPackage;
import com.awesomeproject2.EncryptPackage;



import com.microsoft.codepush.react.CodePush;

public class MainApplication extends Application implements ReactApplication {

    // 生产环境
  String Production = "oPcTkBB7RiL4aVAPbicGRpCGjQ3o4JQqCSpbG";

    // 测试测试
  String Staging    = "3WSozO6JQQscupNHCj56LLIJHppw4JQqCSpbG";



  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    protected boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }


    @Override
    protected List<ReactPackage> getPackages() {
        String codePushSgin = Production;
        if(getUseDeveloperSupport()){
            codePushSgin = Staging;
        }


      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
              new EncryptPackage(),
              new VectorIconsPackage(),
              new BaiduMapPackage(getApplicationContext()),
              new CodePush(codePushSgin , getApplicationContext() , getUseDeveloperSupport())
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
      return mReactNativeHost;
  }
}
