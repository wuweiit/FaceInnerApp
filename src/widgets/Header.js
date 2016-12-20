/**
 * 通用头部
 *
 *
 *
 * @author marker
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

export default class Header extends Component {





    constructor(props) {
        super(props);
        this.rightBtnIconOnPress = props.rightBtnIconOnPress;// 右边按钮
        this.leftBtnIconOnPress  = props.leftBtnIconOnPress; // 左边按钮
    }


    componentDidMount(){

    }



    render() {
        return (
            <View style={styles.header}
                  {...this.props}>
                <Text style={styles.header_title}>{this.props.title}</Text>
                {this.props.enableBackBtn?
                    <TouchableOpacity
                        activeOpacity={0.6}
                        style={styles.back} onPress={this._onBack.bind(this)}>
                        <Icon name="chevron-left" size={20} color={'#ffffff'} />
                    </TouchableOpacity> : null
                }

                {this.props.leftBtnIcon?
                    <TouchableOpacity
                        activeOpacity={0.6}
                        style={styles.back} onPress={this.leftBtnIconOnPress.bind(this)}>
                        <Icon name={this.props.leftBtnIcon} size={20} color={'#ffffff'} />
                    </TouchableOpacity> : null
                }




                { this.props.rightBtnIconOnPress ?
                    (this.props.rightBtnText?
                        <TouchableOpacity
                            activeOpacity={0.6}
                            style={styles.settings} onPress={this.rightBtnIconOnPress}>
                            <Text style={{color:'#ffffff'}} >{this.props.rightBtnText}</Text>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity
                            activeOpacity={0.6}
                            style={styles.settings} onPress={this.rightBtnIconOnPress}>
                            <Icon name={this.props.rightBtnIcon} size={20} color={'#ffffff'} />
                        </TouchableOpacity>
                    )


                    :null
                }
            </View>
        )
    }




    _onBack(){
        this.props.navigator.pop();

    }
}

// 头部高度
const header_height = 46;



const styles = StyleSheet.create({
    header:{
        flexDirection:'row',
        backgroundColor:'#3CA352',
        height: header_height,
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
        top: 0,
        right: 0,
        width: 45,
        height: header_height,
        alignItems: 'center',
        justifyContent: 'center',
    },
    back:{
        position:'absolute',
        top: 0,
        left:0,
        width:45,
        height: header_height,
        alignItems: 'center',
        justifyContent: 'center',
    },





})