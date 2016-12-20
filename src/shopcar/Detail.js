/**
 * Created by ROOT on 2016/10/11.
 */
import React , { Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Navigator,
    ListView,
    TouchableOpacity,
    Image,
ScrollView,
    TouchableHighlight,
WebView,

} from 'react-native';
import RadioButton from 'react-native-radio-button'
import Icon from 'react-native-vector-icons/FontAwesome';

import {PullList} from 'react-native-pull';

import Header from  '../widgets/Header';
import Config from  '../conifg';




export default class Detail extends Component {



    constructor(props) {
        super(props);
        this.state = {
            url:""
        }

    }
    componentDidMount(){
        // 加载网路数据
        var id = this.props.aid;
        this.setState({url:host + '/app/taolu/get.do?id='+id});

    }

    render() {
        return (
            <View style={{backgroundColor:'#EEEEEE',flex:1,}}>
                <Header
                    navigator={this.props.navigator}
                    enableBackBtn={true}
                    title="详情"
                    backgroundColor={Config.HEADER_BG_COLOR}
                />
                <WebView
                    source={{uri: this.state.url}}
                    automaticallyAdjustContentInsets={false}
                    style={styles.webView}
                    source={{uri: this.state.url}}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    decelerationRate="normal"
                    onNavigationStateChange={this.onNavigationStateChange}
                    onShouldStartLoadWithRequest={this.onShouldStartLoadWithRequest}
                    startInLoadingState={true}
                    scalesPageToFit={this.state.scalesPageToFit}
                />
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
        top:0,
        left:0,
        width:40,
        height:40,
        alignItems:'center',
        justifyContent: 'center',
    },

    footer:{
        position:'absolute',
        flexDirection:'row',
        backgroundColor:'#ffffff',
        height: 40,
        bottom:0,
        right:0,
        left:0,
    },
    webView:{

    }

})
