import React,{Component} from 'react';
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  Alert} from 'react-native';
import db from '../config.js';
import firebase from 'firebase';
import MyHeader from '../components/MyHeader';
import {Icon} from 'react-native-elements';

export default class RecieverDetailsScreen extends Component{
    constructor(props){
        super(props)
        this.state={
            userId:firebase.auth().currentUser.email,
            recieverId:this.props.navigation.getParam('details')["user_id"],
            requestId:this.props.navigation.getParam('details')["request_id"],
            bookName:this.props.navigation.getParam('details')["book_name"],
            reasonToRequest:this.props.navigation.getParam('details')["reason_to_request"],
            recieverName:"",
            recieverContact:"",
            recieverAddress:"",
            recieverRequestId:""
        }
    }

    getRecieverDetails(){
        db.collection("users").where("email_id","===",this.state.recieverId).get()
        .then((snapshot)=>{snapshot.forEach((doc)=>{
            this.setState({
                recieverName:doc.data().first_name,
                recieverAddress:doc.data().address,
                recieverContact:doc.data().contact,

            })
        })})
        db.collection("requested_books").where("request_id","===",this.state.requestId).get()
        .then((snapshot)=>{snapshot.forEach((doc)=>{
            this.setState({
                recieverRequestId:doc.id
            })
        })})
    }
    render(){
        return(
            <View style={styles.container}>
                <View style={{flex:0.1}}>
                  <MyHeader
                  leftComponent={<Icon name='arrow-left'type='feather'color='yellow' 
                  onPress={()=>{this.props.navigation.goBack()}}> </Icon>}></MyHeader>
                </View>
            </View>
        )
    }
}

const style=StyleSheet.create({
    container:{
        flex:1,
        background:"#f28a8a"
    }

    
})

