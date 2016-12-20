package com.awesomeproject2;

import android.widget.Toast;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.*;

import com.facebook.react.bridge.Callback;
import java.util.Map;
import com.awesomeproject2.MD5;




public class EncryptModule extends ReactContextBaseJavaModule {


    public EncryptModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "EncryptAndroid";
    }





    @ReactMethod
    public void encode(String str, Promise promise) {
        WritableMap map = Arguments.createMap();
        String code = Base64.encode(str.getBytes());
        map.putString("base64", code );
        promise.resolve(map);
    }


    @ReactMethod
    public void mdCode(String str, Promise promise) {
        WritableMap map = Arguments.createMap();
        String md5Str = MD5.getMD5Code(str);
        map.putString("md5", md5Str );
        promise.resolve(map);

    }
}