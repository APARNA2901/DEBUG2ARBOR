import React, { Component } from 'react';
import {Text,View,StyleSheet,FlatList} from 'react-native';
import db from '../config.js';
import firebase from 'firebase';
import {Icon,ListItem} from 'react-native-elements';
import MyHeader from '../components/MyHeader.js';
import SwipeableFlatlist from '../components/SwipeableFlatlist';


export default class notificationScreen extends Component(){

  constructor(props) {
    super(props);

    this.state = {
      userId :  firebase.auth().currentUser.email,
      allNotification: []
    };

    this.notificationRef = null
  }



  getNotification = () =>{
      this.requestRef = db.collection('allNotifications')
      .where('notificationStatus', '=', 'unread')
      .where('targetedUserID', '==' ,this.state.userId)
      .onSnapshot((snapshot)=>{
        var allNotification=  []
        snapshot.docs.map((doc) =>{
          var notification = doc.data()
          notification["doc_id"] = doc.id
          allNotification.push(notification)
        });
        this.setState({
            allNotification : allNotification
        });
      })
    }
  
    componentDidMount(){
      this.getNotifications()
    }
  
    componentWillUnmount(){
      this.notificationRef()
    }
  
keyExtractor = (item,index) => index.toString()
renderItem = ({item,index}) => {
    return( 
        <ListItem
        key = {index}
        leftElement={<Icon name="book" type="font-awesome" color ='#696969'/>} 
        title={item.BookName} 
        titleStyle={{ color: 'black', fontWeight: 'bold' }} 
        subtitle={item.message}
         bottomDivider /> 
        )
}
        


 render(){
    return(
        <View style = {styles.container}>
        <View style = {{flex:0.1}}>
       <MyHeader title = {'notifications'}
       navigation = {this.props.navigation}/>
       
        </View>
        <View style = {{flex:0.9}}>
        {this.state.allNotification.length === 0
        ? (
        <View style = {{flex:1, justifyContent: 'center',alignItems:'center'}}>
          <Text style = {{fontSize : 20}}> You Have No Notifications </Text>
          </View>
            )
       : (
           <SwipeableFlatList allNotification={this.state.allNotification}/>
     
       )
       }

        </View>
        </View>
    )
}

}

const styles = StyleSheet.create({
    container:{
        flex:1
    }
})

