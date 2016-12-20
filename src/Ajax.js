
import {
    NativeModules

} from 'react-native';

var EncryptAndroid = NativeModules.EncryptAndroid;



var Ajax =  {


    /**
     * post请求
     */
   get : function(url, params, success) {
        var data = [];
        for(var key in params) {
            data.push(key + "=" + params[key]);
        }

        var paramsStr = data.join("&");
        var time = new Date().getTime();

        sign(paramsStr, time,(signClient)=>{

            var baseUrl = url+'?'+paramsStr+'&sign=' + signClient
            fetch(baseUrl,
                {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'time': time,
                    }
                }
            )
            .then((response) => response.json())
            .then((res)=>{
                success(res);
            });

        });

    },




    /**
     * post请求
     */
    post : function(url, params, success) {
        var data = [];
        for(var key in params) {
            data.push(key + "=" + params[key]);
        }
        var paramsStr = data.join("&");

        var time = new Date().getTime();
        sign(paramsStr, time,function(signClient){
            console.log(signClient);
            var paramSign = paramsStr + '&sign=' + signClient;
            fetch(url,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'time': time,
                    },
                    body: paramSign,
                }
            )
            .then((response) => response.json())
            .then((res)=>{ success(res); });

        });



    },

}

/**
 * 签名
 * @param str
 */
async function sign(str, time, callback){
    var a = str + "|time=" + time;
    var  {md5}  = await EncryptAndroid.mdCode( a );
    console.log(md5);
    var  {base64} = await EncryptAndroid.encode( md5 );
    console.log(base64);

    callback(base64.toString());
}

module.exports = Ajax;