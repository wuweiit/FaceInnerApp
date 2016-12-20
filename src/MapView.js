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
    TouchableOpacity,
    Image,

} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { MapView, MapTypes, MapModule, Geolocation } from 'react-native-baidu-map';
import Dimensions from 'Dimensions';




export default class Map extends Component {

    constructor(props) {
        super(props);
    }


    _onBack(){
        console.log("register... ")
        this.props.navigator.pop();

    }




    render() {
        return (
          <MapView
              trafficEnabled={this.state.trafficEnabled}
              baiduHeatMapEnabled={this.state.baiduHeatMapEnabled}
              zoom={this.state.zoom}
              mapType={this.state.mapType}
              center={this.state.center}
              marker={this.state.marker}
              markers={this.state.markers}
              style={styles.map}
              onMapClick={(e) => {
          }}
          >
          </MapView>
    )
    }
}


const styles = StyleSheet.create({
    header:{
        flexDirection:'row',
        backgroundColor:'#0053B3',
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
        top: 10,
        left:10,
    },

    normals:{
        height:30,
        backgroundColor: '#EEEEEE',
        justifyContent:'center',
    }
    ,
    row_item:{
        width: 60,
    },
    icon:{
        height: 60,
        width: 60,

    }

})