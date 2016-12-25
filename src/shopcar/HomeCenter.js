/**
 * Created by ROOT on 2016/10/11.
 */
import React , { Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    AsyncStorage,
    Text,
    View,
    Navigator,
    ListView,
    TouchableOpacity,
    Image,
    TouchableHighlight,
    ToastAndroid,

} from 'react-native';
import RadioButton from 'react-native-radio-button'
import Icon from 'react-native-vector-icons/FontAwesome';
import {PullList} from 'react-native-pull';



import Detail from  './Detail';
import Header from  '../widgets/Header';
import UserCenter from  '../user/UserCenter';


import Config from  '../conifg';
import Ajax from  '../Ajax';


export default class HomeCenter extends Component {



    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state ={
            isSelected: true,
            totalPrice: 0 ,
            data:[ ],
            endId:0
        }


        storage.load({
            key: Config.STORAGE_LOGIN_INFO,
        }).then(ret => {
            // 如果找到数据，则在then方法中返回
            //console.log(ret);
        }).catch(err => { // 如果没有找到数据且没有sync方法，或者有其他异常，则在catch中返回

            switch (err.name) {
                case 'NotFoundError':
                    // TODO;
                    break;
                case 'ExpiredError':
                    // TODO
                    break;
            }
        })
    }

    __fetchData(that,callback){
        var url = host + '/api/taolu/list.do';
        var data = {
            endId: that.state.endId,
            drection: -1,
            keyword: ""
        }

        Ajax.get(url, data, function(responseJson){


            //do something
            setTimeout(() => {
                var data = responseJson.data;
                var stateCopy = {};
                if(data.length == 0){
                    ToastAndroid.show('拉完了,已经没有数据了!', ToastAndroid.SHORT);
                }
                for(var i=0; i<data.length; i++){
                    var item = data[i];


                    that.state.data.splice(0,-1,{
                        id: item.id,
                        title: item.title,
                        desc: item.description,
                        icon: item.icon
                    });
                    if(i  == (data.length-1)){
                        stateCopy.endId = item.id;
                    }
                }
                stateCopy.data = that.state.data;

                that.setState(stateCopy);


                callback();
            }, 1);


        });
    }



    componentDidMount(){
       // 加载网路数据

       // this.__fetchData(this,function(){ });




    }





    _onPullRelease(resolve) {
        this.__fetchData(this,resolve);
    }





    _onGoToDetail(that, rowData){
        var navigator = that.props.navigator;
        setTimeout(()=>{
            navigator.push({
                title: 'Detail',
                component: Detail,
                params:{
                    aid:rowData.id
                }
            });
        },1);

    }




    _onUserCenter(){
        var navigator = this.props.navigator;

        storage.load({
            key: Config.STORAGE_LOGIN_INFO,
            autoSync:false,
        }).then(ret => { // 如果找到数据，则在then方法中返回

            navigator.push({
                title: 'UserCenter',
                component: UserCenter,
                params:{
                    navigator: navigator
                }
            });
            console.log(ret);
        }).catch(err => { // 如果没有找到数据且没有sync方法，或者有其他异常，则在catch中返回
            // 登录跳转
            Config.gotoLogin(navigator);
        })






    }


    /**
     * 渲染ListView 行
     * @param rowData
     * @param sectionID
     * @param rowID
     * @returns {XML}
     */
    renderRow(rowData, sectionID, rowID){
        return (
            <TouchableOpacity onPress={()=>this._onGoToDetail(this, rowData)}>
                <View style={styles.product_item}>
                    <Image source={{uri:rowData.icon}}
                    style={{width:60,height:60}}
                    ></Image>
                    <View style={styles.product_item_desc}>
                        <Text style={styles.article_title}>{rowData.title}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }







    render() {
        return (
            <View style={{backgroundColor:'#EEEEEE',flex:1,}}>
                <Header
                    enableBackBtn={false}
                    title="列表"
                    backgroundColor={Config.HEADER_BG_COLOR}
                    rightBtnIcon="user"
                    rightBtnIconOnPress={()=>{
                        this._onUserCenter(this);
                    }}
                />

                <PullList
                    enableEmptySections={true}
                    style={{ }}
                    onPullRelease={this._onPullRelease.bind(this)}
                      dataSource={this.ds.cloneWithRows(this.state.data)}
                      onEndReached={()=>{
                          console.log("dsadsad");
                      }}
                      renderRow={this.renderRow.bind(this)}
                />

            </View>
        )
    }
}


const styles = StyleSheet.create({
    header:{
        flexDirection:'row',
        backgroundColor:'#3CA352',
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

    footer:{
        position:'absolute',
        flexDirection:'row',
        backgroundColor:'#ffffff',
        height: 40,
        bottom:0,
        right:0,
        left:0,
    },



    product_item:{
        flexDirection:'row',
        flex:1,
        backgroundColor:'#ffffff',
        padding:10,
        borderBottomWidth:1,
        borderColor:'#E7E7E7',

    },
    product_item_desc:{
      flexDirection:'column',
        flex:1,
        paddingLeft:10,
    },
    article_title:{
        fontSize:14,
        fontWeight: 'bold',
        flexWrap:'wrap',
    },






})
