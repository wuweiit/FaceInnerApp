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

import Header from  '../widgets/Header';
import Button from  '../widgets/Button';



export default class Map extends Component {

    constructor(props) {
        super(props);
        this.state = {
            initialPosition: 'unknown',
            lastPosition: 'unknown',
        };
    }

    getLocation(){
        console.log("获取位置")










    }
    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                var initialPosition = JSON.stringify(position);
                this.setState({initialPosition});
            },
            (error) => alert(error.message),
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
        );
        this.watchID = navigator.geolocation.watchPosition((position) => {
            var lastPosition = JSON.stringify(position);
            this.setState({lastPosition});
        });
    }

    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchID);
    }
    render() {
        return (
            <View style={{backgroundColor:'#ffffff'}}>
                <Header title="获取地理位置"
                        backgroundColor="#3CA352"
                        onPressBack={()=>{
                            this.props.navigator.pop();
                        }}
                ></Header>
                <View style={{marginTop:20}}></View>
                <Button
                    title="点击"
                    style={styles.btn}
                    onPress={()=>{this.getLocation() }}
                ></Button>


                <Text>
                    <Text style={styles.title}>Initial position: </Text>
                    {this.state.initialPosition}
                </Text>
                <Text>
                    <Text style={styles.title}>Current position: </Text>
                    {this.state.lastPosition}
                </Text>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    btn:{
        width: 80,
    }, title: {
        fontWeight: '500',
    },
})