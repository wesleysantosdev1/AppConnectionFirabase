import React from "react";
import {View, Text, StyleSheet } from "react-native";
import { db } from "./src/firebaseConnection"

export default function App(){
  return(
    <View style={styles.container}>
      <Text style={{fontSize: 20}}>Seja Dominando firebase</Text>
    </View>
  )
} 

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    paddingTop: 40
  },


})