/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
    Image
} from 'react-native';

import { MapView, MapTypes, MapModule, Geolocation } from 'react-native-baidu-map';
import Dimensions from 'Dimensions';

import Swiper from 'react-native-swiper';


import Header from  './src/widgets/Header';



import Config from  './src/conifg';


class AwesomeProject2 extends Component {


  constructor() {
    super();

    this.state = {
      mayType: MapTypes.NORMAL,
      zoom: 15,
      center: {
        longitude: 113.981718,
        latitude: 22.542449
      },
      trafficEnabled: false,
      baiduHeatMapEnabled: false,
      markers: [{
        longitude: 113.981718,
        latitude: 22.542449,
        title: "Window of the world"
      },{
        longitude: 113.995516,
        latitude: 22.537642,
        title: ""
      }]
    };
  }




  render() {
    return (
        <View>
            <Header
                enableBackBtn={false}
                title="列表"
                backgroundColor={Config.HEADER_BG_COLOR}

            />


            <Swiper style={styles.wrapper} showsButtons={true}
                    height={200} autoplay={true} loadMinimalSize={6}
            >
                <View style={styles.slide1}>
                    <Image source={require('./img/welcome.png')} />
                </View>
                <View style={styles.slide2}>
                    <Text style={styles.text}>Beautiful</Text>
                </View>
                <View style={styles.slide3}>
                    <Text style={styles.text}>And simple</Text>
                </View>
            </Swiper>
        </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height - 200,
        marginBottom: 16
    },



    wrapper: {
    },
    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9DD6EB',
    },
    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#97CAE5',
    },
    slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#92BBD9',
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
    }
});

AppRegistry.registerComponent('AwesomeProject2', () => AwesomeProject2);
