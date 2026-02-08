import React, { use, useEffect, useState } from "react";
import {View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList } from "react-native";
import { FormUsers } from "./src/FormUsers"
import { auth } from './src/firebaseConnection'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut} from 'firebase/auth'
import { loadBundle } from "firebase/firestore";

export default function App(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [authUser, setAuthUser] = useState(null);
  const [laoding, setLaoding] = useState(true)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if(user){
        setAuthUser({
          email: user.email, 
          uid: user.uid
        })

        setLaoding(false);
        return;
      }

      setAuthUser(null);
      setLaoding(false);

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

  if(authUser){
    return(
      <View style={styles.container}>
        <FormUsers />
      </View>
    )
  }

  return(
    <View style={styles.container}>
      {laoding && (
        <Text style={styles.loading}>Carregando informacoes...</Text>
      )}

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

      {authUser && (
        <TouchableOpacity style={styles.buttonLogin1} onPress={handleLogout}>
          <Text style={styles.buttonText}> Sair da conta</Text>
        </TouchableOpacity>
      )}

    </View>
  );
} 

const styles = StyleSheet.create({ 
  container: {
    flex: 1, 
    paddingTop: 40
  },

  loading: {
    fontSize: 20, 
    marginLeft: 8, 
    marginBottom: 8,
    color: "#000"
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