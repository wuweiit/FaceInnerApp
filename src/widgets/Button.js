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

import Icon from 'react-native-vector-icons/FontAwesome';

export default class Button extends Component {

    constructor(props) {
        super(props);
    }


    componentDidMount(){

    }


    render() {
        return (
            <TouchableOpacity
                {...this.props}
                activeOpacity={0.8}
                style={[styles.button,this.props.style]}  >
                {/*<Icon name="chevron-left" size={20} color={'#ffffff'} />*/}
                <Text style={{color:'#ffffff'}}>{this.props.title}</Text>
            </TouchableOpacity>
        )
    }
}


const styles = StyleSheet.create({
    button:{
        backgroundColor:'#3CA352',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        height: 36,  borderRadius:5,

    },





})