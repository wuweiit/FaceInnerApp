/**
 * Created by ROOT on 2016/10/11.
 */
import React , { Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    AsyncStorage,
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
import Header from  '../widgets/Header';
import FeedBack from  '../user/FeedBack';
import UserInfo from  '../user/UserInfo';
import HomeCenter from  '../shopcar/HomeCenter';

import Config from  '../conifg';



export default class UserCenter extends Component {

    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            movies:  [{ }]
        }
    }


    componentDidMount(){
        // 读取用户名

        storage.load({
            key: Config.STORAGE_LOGIN_INFO,  // 注意:请不要在key中使用_下划线符号!
        }).then(ret => {
            // 如果找到数据，则在then方法中返回
            console.log(ret);
            this.setState(ret);

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



    _onPullRelease(resolve) {
        setTimeout(()=>{
            resolve();
        },10);
    }



    _onFeedBack(){
        var navigator = this.props.navigator;
        navigator.push({
            title: 'FeedBack',
            component: FeedBack,
            params:{
                navigator: navigator
            }
        });
    }


    _onPressUserInfo(){
        var navigator = this.props.navigator;
        navigator.push({
            title: 'UserInfo',
            component: UserInfo,
            params:{
                navigator: navigator
            }
        });
    }






    renderRow(rowData, sectionID, rowID){
        return (
            <View>
                <Image style={styles.banner} source={require('../../img/banner.png')}></Image>
                <TouchableOpacity style={styles.userInfo}
                                  activeOpacity={0.8}
                                  onPress={this._onPressUserInfo.bind(this)}>
                    <Image style={styles.userhead} source={require('../../img/ac.png')}></Image>
                    <View style={styles.username}>
                        <Text style={styles.usernameText}>{this.state.nickname}</Text>
                    </View>
                </TouchableOpacity>



                <TouchableOpacity style={[styles.button,{marginTop: 30}]}
                    onPress={this._onFeedBack.bind(this)}
                    >
                    <View style={styles.button_icon}>
                        <Icon name="user" size={20} color={'#cccccc'} />
                    </View>
                    <View style={styles.button_text}>
                        <Text>意见反馈</Text>
                    </View>
                    <View style={styles.button_right}>
                        <Icon name="chevron-right" size={20} color={'#cccccc'} />
                    </View>
                </TouchableOpacity>

            </View>
        )
    }





    render() {
        return (
            <View style={{backgroundColor:'#efefef'}}>
                {this.props.from == 'Login'?(// 登录过来的
                    <Header
                        navigator={this.props.navigator}
                        leftBtnIcon="home"
                        leftBtnIconOnPress={()=>{
                            var navigator = this.props.navigator;
                            navigator.push({
                                title: 'HomeCenter',
                                component: HomeCenter,
                                params:{
                                    navigator: navigator
                                }
                            });

                        }}
                        title="我的"
                        rightBtnIcon="cog"
                        rightBtnIconOnPress={()=>{

                    }}
                    />
                ):(// 非登录过来的可返回
                    <Header
                        navigator={this.props.navigator}
                        enableBackBtn={true}
                        title="我的"
                        rightBtnIcon="cog"
                        rightBtnIconOnPress={()=>{

                    }}
                    />
                )}



                <PullList
                    enableEmptySections={true}
                    dataSource={this.ds.cloneWithRows(this.state.movies)}
                    renderRow={this.renderRow.bind(this)}
                    onPullRelease={this._onPullRelease.bind(this)}
                />
            </View>
        )
    }
}

const userhead_size = 80;
const banner_height = 160;


const styles = StyleSheet.create({

    flexRow:{
        flexDirection: 'row'
    },
    flexRowLabel:{
        flex: 0.3

    },
    flexRowColunm:{
        flex: 1.3
    },
    banner:{
        height: banner_height,
        resizeMode: 'stretch',
    },
    userInfo:{
        position: 'absolute',
        top: (banner_height/2 - userhead_size/2 - 20),
        left: width/2 - userhead_size/2,
        width: userhead_size,
        height: userhead_size + 31,

    },
    userhead:{
        width: userhead_size,
        height: userhead_size,
        borderRadius: userhead_size/2,
        borderWidth:2,
        borderColor: 'white',
    },
    username:{
        marginTop:10,
        justifyContent: 'center',
        alignItems:'center',
        borderWidth:1,
        borderColor:'#efefef',
        borderRadius:10,
        backgroundColor:'rgba(255, 255, 255, 0.29)'
    },
    usernameText:{
        color: 'white',
    },
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
        width: 60,
        justifyContent:'center',
        alignItems:'center',
    },
    button_text:{
        height: 50,
        marginLeft: 60,
        width: 80,
        justifyContent:'center',
    },
    button_right:{
        position:'absolute',
        top:0,
        right: 10,
        height: 50,
        justifyContent:'center',
        flex: 1,

    }




})