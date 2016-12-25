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


import Config from  '../conifg';
import Ajax from  '../Ajax';

/**
 * 意见反馈
 *
 *
 * @author marker
 *
 */
export default class FeedBack extends Component {

    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        this.state = { };

    }


    componentDidMount() {
        // 读取用户信息
        var that = this;
        storage.load({
            key: Config.STORAGE_LOGIN_INFO,  // 注意:请不要在key中使用_下划线符号!
        }).then(ret => {
            that.setState(ret);
        });
    }


    render() {
        return (
            <View style={{backgroundColor:'#ffffff',position:'absolute',bottom:0,right:0,top:0,left:0}}>
                <Header
                    navigator={this.props.navigator}
                    enableBackBtn={true}
                    title="意见反馈"
                />
                <View style={{margin:10}}>
                    <Text>反馈内容:</Text>
                    <TextInput
                        style={{height: 140, borderColor: '#ccc', borderWidth: 1, marginTop:10, borderRadius:3,padding:10}}
                        onChangeText={(content) => this.setState({content:content})}
                        value={this.state.content}
                        maxLength={100}
                        multiline = {true}
                        numberOfLines = {4}
                        underlineColorAndroid="transparent"
                    />

                    <Button onPress={this._onPress.bind(this)} style={{marginTop:20, height:45}} title="提交反馈"></Button>

                </View>



            </View>
        )
    }


    _onPress() {
        var that = this;
        console.log(that.state.content);
        if (!this.state.content) {
            ToastAndroid.show('请填写反馈内容哦!', ToastAndroid.SHORT);
            return;
        }
        var url = host + '/api/feedback/commit.do';
        var data = {
            content: that.state.content ,
            userId: that.state.id,
            nickname: that.state.nickname,
        }

        Ajax.post(url, data, function (res) {
            if(res.status == 0){
                ToastAndroid.show('感谢您的反馈哦! 嘿嘿!', ToastAndroid.SHORT);
                setTimeout(()=>{
                    that.setState({content: ""});
                },1);
            } else{

            }
        });
    }
}



const styles = StyleSheet.create({




})