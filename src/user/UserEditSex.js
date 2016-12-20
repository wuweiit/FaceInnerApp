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

} from 'react-native';

import {PullList} from 'react-native-pull';


import Icon from 'react-native-vector-icons/FontAwesome';

var {height, width} = Dimensions.get('window');



import Login from  '../login/Login';
import Location from  '../location/Location';
import Button from  '../widgets/Button';
import Header from  '../widgets/Header';

/**
 * 意见反馈
 * @author marker
 *
 */
export default class UserEditSex extends Component {

    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        this.state = {
            content: ''
        };

    }




    render() {
        return (
            <View style={{backgroundColor:'#efefef',position:'absolute',bottom:0,right:0,top:0,left:0}}>
                <Header
                    navigator={this.props.navigator}
                    enableBackBtn={true}
                    title={this.props.name + '修改'}
                    rightBtnText="保存"
                    rightBtnIconOnPress={()=>{

                    }}
                />
                <View>


                </View>



            </View>
        )
    }


    _onPress(){
        console.log(this.state.content);


    }
}



const styles = StyleSheet.create({




})