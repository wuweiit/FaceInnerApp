/**
 * Created by ROOT on 2016/10/11.
 */
import React , { Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    ListView,
    TouchableOpacity,
    TouchableHighlight,
    Navigator,
    Dimensions,
    DatePickerAndroid,
    ToastAndroid,

} from 'react-native';

import {PullList} from 'react-native-pull';


import Icon from 'react-native-vector-icons/FontAwesome';

var {height, width} = Dimensions.get('window');



import Login from  '../login/Login';
import Location from  '../location/Location';
import Button from  '../widgets/Button';
import Header from  '../widgets/Header';

import UserInfo from './UserInfo';

import Config from '../conifg';
import Ajax from  '../Ajax';



/**
 * 文本编辑器
 * @author marker
 *
 */
export default class UserEditText extends Component {

    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        this.state = {
            value: this.props.value,
        };

    }



    _updateField(){
        var navigator = this.props.navigator;
        var url = host + '/api/user/update.do';
        var data = {
            field: this.props.field ,
            value: this.state.value ,
        }

        storage.load({
            key: Config.STORAGE_LOGIN_INFO,
        }).then(ret => {
            ret[data.field] = data.value;// 更新字段
            storage.save({
                key: Config.STORAGE_LOGIN_INFO,  // 注意:请不要在key中使用_下划线符号!
                rawData: ret,
            }).then(()=>{
                // 替换前一个页面
                navigator.replacePrevious({
                    title: 'UserInfo',
                    component: UserInfo,
                    params:{
                        navigator: navigator
                    }
                });
                setTimeout(()=>{ navigator.pop(); },1);
            });
        });

        Ajax.post(url, data, function (res) {
            if (res.status == 0) {
                ToastAndroid.show('修改成功!', ToastAndroid.SHORT);
            }
        });
    }


    render() {
        return (
            <View style={{backgroundColor:'#efefef',position:'absolute',bottom:0,right:0,top:0,left:0}}>
                <Header
                    navigator={this.props.navigator}
                    enableBackBtn={true}
                    title={this.props.name + '修改'}
                    rightBtnText="保存"
                    rightBtnIconOnPress={this._updateField.bind(this)}
                />
                <View>
                    <TextInput
                        style={{height: 45, borderColor: '#dedede',backgroundColor:'#ffffff',
                        borderWidth: 1, marginTop:5,
                        borderLeftWidth:0,
                        borderRightWidth:0,
                        paddingLeft:20,
                        paddingRight:20,
                        }}
                        onChangeText={(content) =>{this.setState({value:content})} }
                        value={this.state.value}
                        maxLength={this.props.maxlen}
                        multiline = {true}
                        numberOfLines = {4}
                        underlineColorAndroid="transparent"
                    />

                </View>



            </View>
        )
    }


    _onPress(){
        console.log(this.state.content);


    }
}



const styles = StyleSheet.create({




})