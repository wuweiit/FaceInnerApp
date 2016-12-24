/**
 * Created by ROOT on 2016/10/11.
 */
import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableHighlight,
    ToastAndroid,
    ActivityIndicator,

} from 'react-native';
import Header from  '../widgets/Header';
import Button from '../widgets/Button';


import Login from  '../login/Login';

import Config from '../conifg';

import Ajax from  '../Ajax';



// 验证码获取等待时间
const WAIT_CODE_TIME = 10;


export default class Register extends Component {


    constructor(props) {
        super(props);
        this.state = {
            username :"",
            password :"",
            code:"",
            time: WAIT_CODE_TIME, // 剩余时间
            btnCode:"获取验证码",
            enableBtnCode:true,
            progress:0.5
        };

    }



    _onRegister(that){
        var navigator = that.props.navigator;


        var url = host + '/api/user/register.do';
        var data = {
            user: that.state.username ,
            pass: that.state.password ,
        }

        Ajax.post(url, data, function (res) {
            if (res.status == 0) {
                ToastAndroid.show('注册成功！', ToastAndroid.SHORT);


                navigator.push({
                    title: 'Login',
                    component: Login,
                    params:{
                        navigator: navigator
                    }
                });
            }else{
                ToastAndroid.show(res.msg, ToastAndroid.SHORT);

            }
        });
    }

    /**
     * 获取验证码
     * @param that
     * @private
     */
    _onGetCode(that){
        console.log("get code ... ")
        if(this.state.enableBtnCode){
            that.setState({enableBtnCode:false});
            var timer = setInterval(()=>{
                var time = this.state.time -1;
                that.setState({time:time,btnCode:'剩余('+ time+'s)'});
                if(time <= 0){
                    clearInterval(timer);
                    that.setState({
                        btnCode:'重新获取验证码',
                        time: WAIT_CODE_TIME,
                        enableBtnCode:true
                    });
                }
            },1000);
        }




    }

    render() {
        return (
            <View style={Config.STYLE_MAIN_VIEW}>
                <Header
                    navigator={this.props.navigator}
                    enableBackBtn={true}
                    title="注 册"
                ></Header>


                <View style={[styles.flexRow,{marginTop:10}]}>
                    <Text style={styles.flexRowLabel}>邮    箱  </Text>
                    <TextInput
                        style={styles.flexRowColunm}
                        underlineColorAndroid="transparent"
                        placeholder={'请输入电子邮箱'}
                        onChangeText={(text) => this.setState({username:text})}
                    ></TextInput>
                </View>
                <View style={[styles.flexRow,{marginTop:10}]}>
                    <Text style={styles.flexRowLabel}>密    码  </Text>
                    <TextInput
                        style={styles.flexRowColunm}
                        underlineColorAndroid="transparent"
                        secureTextEntry={true}
                        placeholder={'请输入密码'}
                        onChangeText={(text) => this.setState({password:text})}
                    ></TextInput>
                </View>
                <Button
                    onPress={()=>this._onRegister(this)}
                    style={styles.style_view_button}
                    title="注 册"
                >
                </Button>
            </View>
        )
    }
}


/*
 <View style={[styles.flexRow,{marginTop:10}]}>
 <Text style={styles.flexRowLabel}>验证码  </Text>
 <View style={[styles.flexRow,{flex:1.3,marginRight:10,padding:0,}]}>
 <TextInput
 style={[styles.flexRowColunm,{flex:0.5}]}
 underlineColorAndroid="transparent"
 placeholder={''}
 onChangeText={(text) => this.setState({code:text})}
 ></TextInput>
 <Button
 style={{flex:0.5}}
 enable={this.state.enableBtnCode}
 title={this.state.btnCode}
 onPress={()=>this._onGetCode(this)}
 ></Button>
 </View>
 </View>*/



const styles = StyleSheet.create({

    flexRow:{
        flexDirection: 'row'
    },
    flexRowLabel:{
        flex: 0.3,
        textAlignVertical:'center',
        textAlign:'right',
    },
    flexRowColunm:{
        marginRight:10,
        flex: 1.3,
        borderWidth:1,
        borderColor:'#eeeeee',

        height: 45,
        paddingLeft:10,
        paddingRight:10,
    },

    style_view_button:{
        marginTop:15,
        marginLeft:10,
        marginRight:10,
        backgroundColor:'#63B8FF',
        borderColor:'#5bc0de',
        height:45,
        borderRadius:5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    style_view_unlogin:{
        fontSize:15,
        color:'#63B8FF',
        marginLeft:10,
    },
    style_view_register:{
        fontSize:15,
        color:'#63B8FF',
        marginRight:10,
        alignItems:'flex-end',
        flex:1,
        flexDirection:'row',
        textAlign:'right',
    },
    style_view_button:{
        marginTop:15,
        marginLeft:10,
        marginRight:10,
        height:45,
        justifyContent: 'center',
        alignItems: 'center',
    },
})