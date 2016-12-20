/**
 * Created by ROOT on 2016/10/11.
 */
import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    AsyncStorage,
    TouchableHighlight,
    ToastAndroid,

} from 'react-native';


import Register from  '../login/Register';
import Header from  '../widgets/Header';
import Button from  '../widgets/Button';
import UserCenter from  '../user/UserCenter';

import Config from  '../conifg';
import Ajax from  '../Ajax';



export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username :"",
            password :""
        };

    }

    _onLogin(){
        var that = this;
        console.log("=======login========");


        var url = host + '/api/user/login.do';
        var data = {
            user: that.state.username ,
            pass: that.state.password ,
        }

        Ajax.post(url, data, function (res) {
            if(res.status == 0){
                ToastAndroid.show('登录成功!', ToastAndroid.SHORT);




                // 保存Token
                storage.save({
                    key: Config.STORAGE_LOGIN_INFO,  // 注意:请不要在key中使用_下划线符号!
                    rawData: {
                        token: 'some other site',
                        userId: 'some userid',
                    }
                });



                var navigator = this.props.navigator;
                navigator.push({
                    title: 'UserCenter',
                    component: UserCenter,
                    params:{
                        navigator: navigator,
                        from : "Login",
                    }
                });

            } else{
                ToastAndroid.show(res.msg, ToastAndroid.SHORT);
            }
        });






    }



    _onRegister(){
        var navigator = this.props.navigator;
        navigator.push({
            title: 'Register',
            component: Register,
        });
    }


    render() {
        return (
            <View style={Config.STYLE_MAIN_VIEW}>
                <Header
                    navigator={this.props.navigator}
                    enableBackBtn={true}
                    title="登 录"
                    backgroundColor={Config.HEADER_BG_COLOR}
                    rightBtnText="注册"
                    rightBtnIconOnPress={this._onRegister.bind(this)}

                />


                <View style={[styles.flexRow,{marginTop:10}]}>
                    <Text style={styles.flexRowLabel}>账号  </Text>
                    <TextInput
                        style={styles.flexRowColunm}
                        underlineColorAndroid="transparent"
                        placeholder={'请输入账号'}
                        onChangeText={(text) => this.setState({username:text})}
                    ></TextInput>
                </View>
                <View style={[styles.flexRow,{marginTop:10}]}>
                    <Text style={styles.flexRowLabel}>密码  </Text>
                    <TextInput
                        style={styles.flexRowColunm}
                        underlineColorAndroid="transparent"
                        secureTextEntry={true}
                        placeholder={'请输入密码'}
                        onChangeText={(text) => this.setState({password:text})}
                    ></TextInput>
                </View>

                <Button
                    onPress={this._onLogin.bind(this)}
                    title="登 录"
                    style={styles.style_view_button}
                />
                <View style={{ marginTop:10, flex:1, flexDirection:'row',alignItems:'flex-end',bottom:0}}>
                    <Text style={styles.style_view_unlogin}>
                        无法登录?
                    </Text>

                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    header:{
        flexDirection:'row',
        backgroundColor:'#3CA352',
        height: 40,
        justifyContent:'center',
        alignItems:'center',
    },
    header_title:{
        flex:1,
        color:'#ffffff',
        textAlign:'center',
    },
    settings:{
        position:'absolute',
        top: 10,
        right:10,
    },
    back:{
        position:'absolute',
        top: 10,
        left:10,
    },
    flexRow:{
        flexDirection: 'row',
    },
    flexRowLabel:{
        flex: 0.3,
        textAlignVertical:'center',
        textAlign:'right',
    },
    flexRowColunm:{
        flex: 1.3,
        borderWidth:1,
        borderColor:'#eeeeee',
        height: 45,
        paddingLeft:10,
        paddingRight:10,
        justifyContent: 'center',
    },

    style_view_button:{
        marginTop:15,
        marginLeft:10,
        marginRight:10,
        height:45,
        justifyContent: 'center',
        alignItems: 'center',
    },
    style_view_unlogin:{
        fontSize:15,
        color:'#63B8FF',
        marginLeft:10,
    }
})