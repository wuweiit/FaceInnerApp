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
//import MapView from 'react-native-baidumap';
//import KKLocation from 'react-native-baidumap/KKLocation';



export default class Map extends Component {

    constructor(props) {
        super(props);
    }


    componentDidMount() {
        //this.refs["mapView"].zoomToLocs([[39.918541, 116.4835]]);
        //KKLocation.getCurrentPosition((position) => {
        //    console.log("location get current position: ", position);
        //}, (error) => {
        //    console.log("location get current position error: ", error);
        //});
        //this.watchID = KKLocation.watchPosition((position) => {
        //    console.log("watch position: ", position);
        //});
    }




    render() {
        //return (
        //    <MapView
        //        style={{flex: 1, width: 300}}
        //        ref="mapView"
        //        showsUserLocation={true}
        //        userLocationViewParams={{accuracyCircleFillColor: 'red', image: require('../img/favicon.png')}}
        //        annotations={[{latitude: 39.832136, longitude: 116.34095, title: "start", subtile: "hello", image: require('../img/favicon.png')}, {latitude: 39.902136, longitude: 116.44095, title: "end", subtile: "hello", image: require('../img/favicon.png')}]}
        //        overlays={[{coordinates: [{latitude: 39.832136, longitude: 116.34095}, {latitude: 39.832136, longitude: 116.42095}, {latitude: 39.902136, longitude: 116.42095}, {latitude: 39.902136, longitude: 116.44095}], strokeColor: '#666666', lineWidth: 3}]}
        //    />
        //)
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