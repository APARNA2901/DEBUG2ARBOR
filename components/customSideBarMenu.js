import React,{Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {DrawerItems} from 'react-navigation-drawer';
import firebase from 'firebase';

export default class CustomSideBarMenu extends Component{
    render(){
        return(
            <View style= {{flex: 1}}>
                <Text>Custom side bar menu</Text>
            </View>
        );
    }
}