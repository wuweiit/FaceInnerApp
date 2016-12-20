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
    DatePickerAndroid,

} from 'react-native';


import Login from  '../login/Login';
import Location from  '../location/Location';


export default class Home extends Component {
    ds;
    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            movies:  [{title:"测试数据"}]
        }

    }


    _onPressButton(that){
        console.log("... ...4324324324.. ");
        fetch('https://www.jetmall.co.id/api/home/firstCategory/list')
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                setTimeout(()=>{
                    that.setState({
                        movies :  responseJson.data.recommendedList
                    });
                },10);
            })
    }
    _onLogin(that){
        var navigator = that.props.navigator;
        navigator.push({
            title: 'Login',
            component: Login,
        });
    }


    _onOpenDatePiker(that){



    }
    _onGeoLocation(that){
        var navigator = that.props.navigator;
        navigator.push({
            title: 'Location',
            component: Location,
        });
    }

    render() {
        return (


            <View style={{backgroundColor:'#ffffff'}}>

                <TouchableOpacity onPress={()=>this._onShopCar(this)}>
                    <Text>购物车</Text>
                </TouchableOpacity>

            </View>
        )
    }
}


const  styles = StyleSheet.create({

    flexRow:{
        flexDirection: 'row'
    },
    flexRowLabel:{
        flex: 0.3

    },
    flexRowColunm:{
        flex: 1.3
    }

})