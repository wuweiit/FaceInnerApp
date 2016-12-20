/**
 * Created by ROOT on 2016/10/11.
 */
import React , { Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,

} from 'react-native';
var RCTDeviceEventEmitter = require('RCTDeviceEventEmitter');


export default class NumberButton extends Component {

    onChangeNumberListener;

    constructor(props) {
        super(props);
        this.onChangeNumberListener = this.props.onChangeNumber;
        this.state = {
            number: props.value
        }

    }


    _onChnageNumber(that, number){
        var a = this.state.number + number;
        this.setState({number: a});
        this.onChangeNumberListener(a);

    }
    componentDidMount(){

    }


    render() {
        return (
            <View style={styles.btns}>
                <TouchableOpacity style={styles.btn_plus}
                      activeOpacity={1}
                      onPress={()=>this._onChnageNumber(this,-1)}>
                    <Text style={{fontSize:20,color:'#999999'}}>-</Text>
                </TouchableOpacity>
                <TextInput style={styles.input} value={this.state.number+''}
                   underlineColorAndroid="#ffffff"
                   keyboardType="numeric"
                ></TextInput>
                <TouchableOpacity style={styles.btn_plus}
                                  activeOpacity={1.0}
                    onPress={()=>this._onChnageNumber(this,1)}>
                    <Text style={{fontSize:20,color:'#999999'}}>+</Text>
                </TouchableOpacity>
            </View>
        )
    }
}


const styles = StyleSheet.create({


    btns:{
        flexDirection:'row',
        alignItems:'center',
        height:24,
    },

    input:{
        width:40,
        height:24,
        borderColor:'#E0E0E0',
        borderWidth:1,
        borderLeftWidth:0,
        borderRightWidth:0,
        textAlign:'center',
        padding:0,
        color:'#333333',
    },
    btn_plus:{
        width:24,
        borderColor:'#E0E0E0',
        borderWidth:1,
        height:24,
        justifyContent: 'center',
        alignItems:'center',

    }

})