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
            <View style={{backgroundColor:'#ffffff'}}>
                <View style={styles.header}>
                    <Text style={styles.header_title}>移动管理平台</Text>
                    <TouchableOpacity style={styles.back} onPress={()=>this._onBack()}>
                        <Icon name="chevron-left" size={20} color={'#ffffff'} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.settings}>
                        <Icon name="cog" size={20} color={'#ffffff'} />
                    </TouchableOpacity>
                </View>
                <View style={styles.normals}>
                    <Text style={{marginLeft:20,fontSize:14,}}>常用事项</Text>
                </View>
                <View style={{marginTop:16, marginBottom:16,flexDirection:'row',justifyContent:'space-around'}}>
                    <View style={styles.row_item}>
                        <Image source={require('../img/ab.png')} style={styles.icon} />
                        <Text style={{marginTop:5,fontSize:12,textAlign:'center'}}>待办事项</Text>
                    </View>
                    <View style={styles.row_item}>
                        <Image source={require('../img/ac.png')} style={styles.icon} />
                        <Text style={{marginTop:5,fontSize:12,textAlign:'center'}}>我的申请</Text>
                    </View>
                    <View style={styles.row_item}>
                        <Image source={require('../img/ad.png')} style={styles.icon} />
                        <Text style={{marginTop:5,fontSize:12,textAlign:'center'}}>上级指示</Text>
                    </View>
                </View>
                <View style={styles.normals}>
                    <Text style={{marginLeft:20,fontSize:14,}}>所有事项</Text>
                </View>

            </View>
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