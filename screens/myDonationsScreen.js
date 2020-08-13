import React ,{Component} from 'react';
import {View, Text,TouchableOpacity,ScrollView,FlatList,StyleSheet} from 'react-native';
import {Card,Icon,ListItem} from 'react-native-elements';
import MyHeader from '../components/MyHeader.js';
import firebase from 'firebase';
import db from '../config.js';


export default class MyDonationScreen extends Component {
   constructor(){
     super()
     this.state = {
       donorId : firebase.auth().currentUser.email,
       allDonations : []
     }
     this.requestRef= null
   }
   getAllDonations =()=>{
    this.requestRef = db.collection("all_donations").where("donorID" ,'==', this.state.donorId)
    .onSnapshot((snapshot)=>{
      var allDonations = snapshot.docs.map((doc) => doc.data());
      this.setState({
        allDonations : allDonations
      });
    })
  } 
   sendBook=(bookDetails)=>{
    if(bookDetails.requestStatus === "Book Sent"){
      var requestStatus = "Donor Interested"
      db.collection("allDonations").doc(bookDetails.doc_id).update({
        "requestStatus" : "Donor Interested"
      })
      this.sendNotification(bookDetails,requestStatus)
    }
    else{
      var requestStatus = "Book Sent"
      db.collection("allDonations").doc(bookDetails.doc_id).update({
        "requestStatus" : "Book Sent"
      })
      this.sendNotification(bookDetails,requestStatus)
    }
  }
  sendNotification=(bookDetails,requestStatus)=>{
    var requestId = bookDetails.requestID
        var donorId = bookDetails.donorID
    db.collection("allNotifications")
    .where("requestID","==", requestId)
    .where("donorID","==",donorId)
    .get()
    .then((snapshot)=>{
      snapshot.forEach((doc) => {
        var message = ""
        if(requestStatus === "Book Sent"){
          message = this.state.donorName + " sent you book"
        }else{
           message =  this.state.donorName  + " has shown interest in donating the book"
        }
        db.collection("allNotifications").doc(doc.id).update({
          "message": message,
          "notificationStatus" : "unread",
          "date"                : firebase.firestore.FieldValue.serverTimestamp()
        })
      });
    })
  }

keyExtractor = (item,index)=> index.toString()
renderItem = ({item,i})=>(
  <ListItem
  key = {i}
  title = {item.BookName}
  subtitle={"Requested By : " + item.RequestedBy +"\nStatus : " + item.RequestStatus}
       leftElement={<Icon name="book" type="font-awesome" color ='#696969'/>}
       titleStyle={{ color: 'black', fontWeight: 'bold' }}
       rightElement={
           <TouchableOpacity
            style={[
              styles.button,
              {
                backgroundColor : item.RequestStatus === "Book Sent" ? "green" : "#ff5722"
              }
            ]}
            onPress = {()=>{
              this.sendBook(item)
            }}
           >
             <Text style={{color:'#ffff'}}>{
               item.RequestStatus === "Book Sent" ? "Book Sent" : "Send Book"
             }</Text>
           </TouchableOpacity>
         }
       bottomDivider
  />
)

render(){
  return(
    <View style = {{flex : 1}}>
     <MyHeader 
     navigation = {this.props.navigation}
     title = "My Donation"
     />
     <View style =  {{flex :1}}>
      {this.state.allDonations.length === 0
      ? (
      <View style = {styles.subtitle}>
       <Text style = {{fontSize : 20}}> List Of All Book Donations </Text>
        </View>
        )
        : (
          <FlatList
          keyExtractor = {this.keyExtractor}
          data = {this.state.allDonations}
          renderItem = {this.renderItem}
          />
        
        )
      }
     </View>
    </View>
  )
}

}

const styles = StyleSheet.create({
button :{
flex : 1,
color : 'orange',
alignItems: 'center',
alignSelf: 'center',
margin : 20,
padding :10,
},
 subtitle : {
   flex:1,
   backgroundColor : 'grey',
   alignItems : 'center',
   margin  :20,
   padding : 10,
}
})