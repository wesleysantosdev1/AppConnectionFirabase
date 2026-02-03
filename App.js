import React, { use, useEffect, useState } from "react";
import {View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList } from "react-native";
import { FormUsers } from "./src/FormUsers"
import { auth } from './src/firebaseConnection'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut} from 'firebase/auth'

export default function App(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if(user){
        setAuthUser({
          email: user.email, 
          uid: user.uid
        })
        return;
      }
    })
  },[])

  async function handleCreateUser() {
    const user = await createUserWithEmailAndPassword(auth, email, password)
    console.log(user);
  }

  function handleLogin(){
    signInWithEmailAndPassword(auth, email, password)
    .then((user) => {
      console.log(user);
      setAuthUser({
        email: user.user.email,
        uid: user.user.uid
      })
    })
    .catch(erro => {
      if(erro.code === "auth/missing-password"){
        console.log("Senha obrigatoria")
        return;
      }
      console.log(erro.code)
    })
  }

  async function handleLogout(){
    await signOut(auth)
    setAuthUser(null);
  }

  return(
    <View style={styles.container}>
      <Text style={styles.userLoga}>Usuario logado: {authUser && authUser.email}</Text>

      <Text style={styles.text1}>Email: </Text>
      <TextInput 
        style={styles.textInput1}
        placeholder="Digite seu email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />

      <Text style={styles.text1}>Senha: </Text>
      <TextInput 
        style={styles.textInput1}
        placeholder="Digite sua senha"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry={true}
      />

      <TouchableOpacity style={styles.buttonLogin} onPress={handleLogin}>
        <Text style={styles.buttonText}> Fazer Login</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleCreateUser}>
        <Text style={styles.buttonText}>Criar uma conta</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonLogin1} onPress={handleLogout}>
        <Text style={styles.buttonText}> Sair da conta</Text>
      </TouchableOpacity>
    </View>
  );
} 

const styles = StyleSheet.create({ 
  container: {
    flex: 1, 
    paddingTop: 40
  },

  userLoga: {
    fontSize: 16, 
    color: "#000", 
    marginLeft: 8, 
    marginBottom: 14
  },

  text1: {
    marginLeft: 8, 
    fontSize: 18, 
    color: "#000",
  }, 

  textInput1: {
    marginLeft: 8, 
    marginRight: 8, 
    borderWidth: 1, 
    marginBottom: 14,
  },

  button: {
    backgroundColor: "#000", 
    marginLeft: 8, 
    marginRight: 8, 
    padding: 8
  },

  buttonText: {
    color: '#fff', 
    textAlign: 'center',
  }, 

  buttonLogin: {
    backgroundColor: "green", 
    marginLeft: 8, 
    marginRight: 8, 
    padding: 8, 
    marginBottom: 10
  }, 

  buttonLogin1: {
    backgroundColor: "red", 
    marginLeft: 8, 
    marginRight: 8, 
    padding: 8, 
    marginTop: 10,
  },
})