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
import UserEditText from  '../user/UserEditText';
import UserEditSex from  '../user/UserEditSex';
import HomeCenter from  '../shopcar/HomeCenter';
import Config from '../conifg';



const INPUT_TYPE_NONE = 0;
const INPUT_TYPE_TEXT = 1;
const INPUT_TYPE_SEXS = 2;
const INPUT_TYPE_AREA = 3;


/**
 * 意见反馈
 * @author marker
 *
 */
export default class UserInfo extends Component {

    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2,
            sectionHeaderHasChanged: (s1, s2) => s1 !== s2

        });

        this.state = {
            menus: {
                sectionID_1:[
                    {id: "id",type:INPUT_TYPE_NONE, name: "ID编号", color:"#666666", icon: "bookmark", value:"39849939" },
                ],
                sectionID_2:[
                    {id: "nickname",type:INPUT_TYPE_TEXT, name: "昵称", color:"#850C70", icon: "user", value:"marker" },
                    {id: "integral",type:INPUT_TYPE_NONE, name: "积分", color:"#F78F1E", icon: "star", value:"1134 分" },
                ],
                sectionID_3:[
                    {id: "sex",type:INPUT_TYPE_SEXS, name: "性别", color:"#666666", icon: "magnet", value:"男" },
                    {id: "address",type:INPUT_TYPE_AREA, name: "地区", color:"#A6A6A6", icon: "map-marker", value: "四川 成都"},
                    {id: "underwrite",type:INPUT_TYPE_TEXT, name: "个性签名", color:"#009AC8", icon: "edit", value: "我的地盘怎么会有你"},
                ]

            }
        };

    }



    componentDidMount(){
        // 读取用户名

        storage.load({
            key: Config.STORAGE_LOGIN_INFO,  // 注意:请不要在key中使用_下划线符号!
        }).then(ret => {
            // 如果找到数据，则在then方法中返回
            var data = {
                menus: {
                    sectionID_1:[
                        {key: "id",type:INPUT_TYPE_NONE, name: "ID编号", color:"#666666", icon: "bookmark", value: ret.id },
                    ],
                    sectionID_2:[
                        {key: "nickname",type:INPUT_TYPE_TEXT, name: "昵称", color:"#666666", icon: "user", value:  ret.nickname,maxlen:10 },
                        {key: "integral",type:INPUT_TYPE_NONE, name: "积分", color:"#F78F1E", icon: "star", value: ret.points +" 分" },
                    ],
                    sectionID_3:[
                        {key: "sex",type:INPUT_TYPE_SEXS, name: "性别", color:"#666666", icon: "magnet", value: ret.sexual },
                        //{id: "address",type:INPUT_TYPE_AREA, name: "地区", color:"#A6A6A6", icon: "map-marker", value: "四川 成都"},
                        {key: "underwrite",type:INPUT_TYPE_TEXT, name: "个性签名", color:"#666666", icon: "edit", value: ret.underwrite,maxlen:120},
                    ]

                }
            };
            this.setState(data);

        }).catch(err => { // 如果没有找到数据且没有sync方法，或者有其他异常，则在catch中返回

            console.warn(err.message);
            switch (err.name) {
                case 'NotFoundError':
                    // TODO;
                    break;
                case 'ExpiredError':
                    // TODO
                    break;
            }
        })

    }






    _onGoMenu(that,rowData){
        var navigator = that.props.navigator;

        if(INPUT_TYPE_TEXT == rowData.type ){// 文本编辑
            navigator.push({
                title: 'UserEditText',
                component: UserEditText,
                params:{
                    navigator: navigator,
                    name: rowData.name,
                    value: rowData.value,
                    maxlen: rowData.maxlen,
                    field: rowData.key, // 字段
                }
            });
        }else if(INPUT_TYPE_SEXS == rowData.type){// 性别编辑器
            navigator.push({
                title: 'UserEditSex',
                component: UserEditSex,
                params:{
                    navigator: navigator,
                    name: rowData.name,
                    value: rowData.value,
                    field: rowData.key, // 字段
                }
            });
        }
    }




    _quitLogin(){

        // 删除单个数据
        storage.remove({ key: Config.STORAGE_LOGIN_INFO });

        storage.save({
            key: Config.STORAGE_LOGIN_INFO,  // 注意:请不要在key中使用_下划线符号!
            rawData: null
        });



        ToastAndroid.show('退出成功!', ToastAndroid.SHORT);



        var navigator = this.props.navigator;
        navigator.push({
            title: 'HomeCenter',
            component: HomeCenter,
            params:{
                navigator: navigator,
            }
        });

    }



    renderRow(rowData, sectionID, rowID){
        return (
            <TouchableOpacity
                key={'menu_item' + rowID}
                style={[styles.button]}
                activeOpacity={0.7}
                onPress={()=>this._onGoMenu(this, rowData)}>
                <View style={styles.button_icon}>
                    <Icon name={rowData.icon} size={20} color={rowData.color} />
                </View>
                <View style={styles.button_text}>
                    <Text style={styles.btnLeftText}>{rowData.name}</Text>
                    <Text style={styles.btnRightText}>{rowData.value}</Text>
                </View>
                <View style={styles.button_right}>
                    <Icon name="chevron-right" size={18} color={'#cccccc'} />
                </View>
            </TouchableOpacity>
        )
    }


    render() {

        return (
            <View style={{backgroundColor:'#efefef',position:'absolute',bottom:0,right:0,top:0,left:0}}>
                <Header
                    navigator={this.props.navigator}
                    enableBackBtn={true}
                    title="个人信息"
                />
                <ListView
                    enableEmptySections={true}
                    dataSource={this.ds.cloneWithRowsAndSections(this.state.menus)}
                    renderRow={this.renderRow.bind(this)}
                    renderSectionHeader={this._renderSectionHeader.bind(this)}
                    renderSeparator={this._renderSeparator.bind(this)}
                />

                <Button
                    style={styles.style_view_button}
                    title="退出登录"
                    onPress={this._quitLogin.bind(this)}
                />




            </View>
        )
    }


    _renderSeparator(sectionID, rowID, adjacentRowHighlighted){
        return (<View key={'Separator_'+ rowID} style={{borderBottomWidth:1,borderColor:'#efefef'}}></View>)
    }




    _renderSectionHeader(sectionData, sectionID){
        var view = null;
        if(sectionID != "sectionID_1") {
            view = (
                <View key={'section_'+ sectionID} style={{height:20}}></View>
            )
        }else{
            view = (
                <View key={'section_'+ sectionID} style={{height:10}}></View>
            )
        }

        return view;
    }


    _onPress(){
        console.log(this.state.content);


    }
}



const styles = StyleSheet.create({

    button:{
        height:50,
        backgroundColor: '#ffffff',
        position: 'relative',
        justifyContent:'center',
        flexDirection: 'column',

    },
    button_icon:{
        height: 50,
        position:'absolute',
        top:0,
        left: 0,
        width: 50,
        justifyContent:'center',
        alignItems:'center',
    },
    button_text:{
        height: 50,
        marginLeft: 50,
        marginRight: 30,
        flexDirection:'row',
        justifyContent:'center'
    },


    btnLeftText:{
        height: 50,
        flex: 1,
        alignSelf:'flex-start',
        textAlignVertical:'center'

    },
    btnRightText:{
        height: 50,
        flex: 1,
        alignSelf:'flex-end',
        textAlignVertical:'center',
        textAlign:'right'
    },



    button_right:{
        position:'absolute',
        top:0,
        right: 10,
        height: 50,
        justifyContent:'center',


    },

    style_view_button:{
        height:45,
        borderRadius:0,
        backgroundColor:'#cccccc',
    },


})