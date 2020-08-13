import firebase from 'firebase'
require('@firebase/firestore') 

var firebaseConfig = {
  apiKey: "AIzaSyBm3HorF5uhRSlp8VoYVPx3JZhqMTig8WY",
  authDomain: "booksanta-bae7d.firebaseapp.com",
  databaseURL: "https://booksanta-bae7d.firebaseio.com",
  projectId: "booksanta-bae7d",
  storageBucket: "booksanta-bae7d.appspot.com",
  messagingSenderId: "417677342462",
  appId: "1:417677342462:web:ca7ea5dccf61a734cd97af"
};

  firebase.initializeApp(firebaseConfig)
  export default firebase.firestore();