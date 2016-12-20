



import {
    Dimensions,
    AsyncStorage,

} from 'react-native';
import Storage from 'react-native-storage';


import Login from  './login/Login';

var {height, width} = Dimensions.get('window');





host = "http://192.168.0.106:8085";
if(__DEV__){ // debug模式
    host = "http://192.168.0.106:8085";
}else{ // release模式
    host = "http://api.joggle.cn";
}


var storage = new Storage({
    // 最大容量，默认值1000条数据循环存储
    size: 1000,

    // 存储引擎：对于RN使用AsyncStorage，对于web使用window.localStorage
    // 如果不指定则数据只会保存在内存中，重启后即丢失
    storageBackend: AsyncStorage,

    // 数据过期时间，默认一整天（1000 * 3600 * 24 毫秒），设为null则永不过期
    defaultExpires: 1000 * 3600 * 24,

    // 读写时在内存中缓存数据。默认启用。
    enableCache: false,

    // 如果storage中没有相应数据，或数据已过期，
    // 则会调用相应的sync方法，无缝返回最新数据。
    // sync方法的具体说明会在后文提到
    // 你可以在构造函数这里就写好sync的方法
    // 或是写到另一个文件里，这里require引入
    // 或是在任何时候，直接对storage.sync进行赋值修改
    // sync: require('./sync')
})
// 全局变量
global.storage = storage;




export default class Config{

    /** 头部背景颜色 */
    static HEADER_BG_COLOR = "#3CA352";

    /** View背景颜色 */
    static VIEW_BG_COLOR = "#efefef";


    /** 存储登录数据 */
    static STORAGE_LOGIN_INFO = 'userInfo';



    /**
     * 跳转到登录界面
     *
     * @param component
     */
    static gotoLogin(navigator){
        navigator.push({
            title: 'LoginMain',
            component: Login,
            params:{
                navigator: navigator
            }
        });
    }


    /**
     * View样式
     * @type {{width, height, backgroundColor: string}}
     */
    static STYLE_MAIN_VIEW = {
        width : width,
        height: height,
        backgroundColor: "#f7f7f7",
    }
}
