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
    ToastAndroid

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
 * 性别编辑器
 *
 * @author marker
 *
 */
export default class UserEditSex extends Component {

    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        this.state = {
            value : this.props.value,
        };

    }


    _selectItemMan(){
        this.setState({value:"男"});




    }

    _selectItemMen(){
        this.setState({value:"女"});


    }

    _updateField(){
        var navigator = this.props.navigator;
        var url = host + '/api/user/update.do';
        var data = {
            field: this.props.field ,
            value: this.state.value == "男"? 1 : 0 ,
        }


        storage.load({
            key: Config.STORAGE_LOGIN_INFO,
        }).then(ret => {
            ret.sexual = this.state.value;// 更新字段
            console.log(ret);
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
            <View style={{backgroundColor:'#ffffff',position:'absolute',bottom:0,right:0,top:0,left:0}}>
                <Header
                    navigator={this.props.navigator}
                    enableBackBtn={true}
                    title={this.props.name + '修改'}
                    rightBtnText="保存"
                    rightBtnIconOnPress={this._updateField.bind(this)}
                />
                <View>
                    <View style={{marginTop:50, flexDirection:'row',justifyContent:'space-around'}}>
                        <TouchableOpacity style={styles.row_item}
                                          activeOpacity={0.8}
                                          onPress={this._selectItemMan.bind(this)}>
                            <Image source={require('../../img/man.png')} style={styles.icon} />
                            <Text style={{marginTop:5,fontSize:12,textAlign:'center'}}>男</Text>
                            {this.state.value=="男"?
                                <View style={styles.selectItem}>
                                    <Image style={styles.selectItemImage} source={require('../../img/select.jpg')} />
                                </View>
                            :null}
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.row_item}
                                          activeOpacity={0.8}
                                          onPress={this._selectItemMen.bind(this)}>
                            <Image source={require('../../img/girl.png')} style={styles.icon} />
                            <Text style={{marginTop:5,fontSize:12,textAlign:'center'}}>女</Text>
                            {this.state.value=="女"?
                                <View style={styles.selectItem}>
                                    <Image style={styles.selectItemImage} source={require('../../img/select.jpg')} />
                                </View>
                            :null}
                        </TouchableOpacity>
                    </View>

                </View>



            </View>
        )
    }


    _onPress(){
        console.log(this.state.content);


    }
}



const styles = StyleSheet.create({

    row_item:{
        width: 60,
        flexDirection: 'column'
    },
    icon:{
        height: 60,
        width: 60,

    },
    selectItem:{
        alignItems:'center',
        flex:1
    },
    selectItemImage:{
        width:26,
        height:26,
    }

})