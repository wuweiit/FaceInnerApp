/**
 *
 * 闪屏界面
 *
 * @author marker
 * @date 2016-11-26
 *
 * Created by marker on 16/11/26.
 */
'use strict'

import React , { Component} from 'react';

import {
    Image,
    StyleSheet,
} from 'react-native'

import CodePush from "react-native-code-push";


import MainPage from './shopcar/HomeCenter';





export default class SplashScreen extends Component {
    constructor(props) {
        super(props);
        var {navigator} = props;

        if(!__DEV__) { // debug模式
            CodePush.sync();
        }

        setTimeout(() => {
            navigator.replace({ name: 'MainPage', component: MainPage })
        }, 3000);
    }

    componentDidMount() {

    }


    render() {
        return(
            <Image source={require('image!welcome')} style={styles.backimagestyle}/>
        );
    }
}

const styles = StyleSheet.create({
    backimagestyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: null,
        height: null,
        resizeMode: 'cover'
    }
});