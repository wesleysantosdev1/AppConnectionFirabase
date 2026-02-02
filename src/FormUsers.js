import React, { useEffect, useState, useRef, cloneElement } from "react";
import {View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList } from "react-native";
import { db } from "./firebaseConnection";
import { doc, getDoc, onSnapshot, setDoc, collection, addDoc, getDocs, snapshotEqual, updateDoc } from "firebase/firestore";
import  { UsersList } from "./users"

export function FormUsers(){
const [nome, setNome] = useState("");
const [idade, setIdade] = useState("");
const [cargo, setCargo] = useState("");
const [users, setUsers] = useState([]);

const [showForm, setShowForm] = useState(true);
const [isEditing, setIsEditing] = useState("");

useEffect(() => {
    async function getDados() {
    const usersRef = collection(db, "users");

    onSnapshot(usersRef, (snapshot) => {
        let lista = [];

        snapshot.forEach((doc) => {
        lista.push({
            id: doc.id, 
            nome: doc.data().nome,
            idade: doc.data().idade,
            cargo: doc.data().cargo
        })
        })
        setUsers(lista);
    })
    }

    getDados();
}, [])

async function handleRegister(){
    await addDoc(collection(db, "users"), {
    nome: nome, 
    idade: idade, 
    cargo: cargo
    })
    .then(() => {
    console.log("Cadastardo com sucesso")
    setNome("")
    setIdade("")
    setCargo("")
    })
    .catch((error) => {
    console.log(error)
    })
}

function handleToggleForm(){
    setShowForm(!showForm);
}

function editUsers(data){
    setNome(data.nome);
    setCargo(data.cargo);
    setIdade(data.idade);
    setIsEditing(data.id);
}

async function handleEditUsers(){
    const docRef = doc(db, "users", isEditing)
    await updateDoc(docRef, {
    nome: nome, 
    cargo: cargo, 
    idade: idade,
    })

    setNome("")
    setCargo("")
    setIdade("")
    setIsEditing("");
}


return(
    <View style={styles.container}>
    { showForm && (
        <View>
        <View>
            <Text style={styles.label}>Nome</Text>
            <TextInput 
            style={styles.input1}
            placeholder="Digite seu nome"
            value={nome}
            onChangeText={ (text) => setNome(text)}
            />

            <Text style={styles.label}>Cargo</Text>
            <TextInput 
            style={styles.input1}
            placeholder="Digite seu cargo"
            value={cargo}
            onChangeText={ (text) => setCargo(text)}
            />

            <Text style={styles.label}>Idade</Text>
            <TextInput 
            style={styles.input1}
            placeholder="Digite sua idade"
            value={idade}
            onChangeText={ (text) => setIdade(text)}
            />      
        </View>
        
        {isEditing !== "" ? (
            <TouchableOpacity style={styles.button} onPress={handleEditUsers}>
            <Text style={styles.text1}>Editar Usuarios</Text>
            </TouchableOpacity>
        ) : (
            <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.text1}>Adicionar</Text>
            </TouchableOpacity>
        )}

    </View>
    )}
    <TouchableOpacity onPress={handleToggleForm} style={{marginTop: 8}}>
            <Text style={{ textAlign: "center", color: "#000"}}> {showForm ? "Esconder Formulario" : "Mostrar Formulario"} </Text>
    </TouchableOpacity>

    <Text style={{ marginTop: 14, marginLeft: 8, fontSize: 20, color: "#000"}}>Usuarios: </Text>

    <FlatList 
    style={styles.list}
    data={users}
    keyExtractor={ (item) => String(item.id)}
    renderItem={ ({ item}) => <UsersList  data={item}  handleEdit={ (item) => editUsers(item) }/> }
    />
    </View>
);
} 

const styles = StyleSheet.create({ 
container: {
    flex: 1, 
},

button: {
    backgroundColor: '#000',  
    alignItems: 'center', 
    justifyContent: 'center', 
    marginLeft: 8,
    marginRight: 8, 
    borderRadius: 4
}, 

text1: {
    fontSize: 15, 
    color: "white", 
    padding: 8, 
}, 

label: {
    color: "#000", 
    fontSize: 16, 
    marginBottom: 4, 
    marginLeft: 8,
},

input1: {
    borderWidth: 1, 
    borderRadius: 10, 
    marginLeft: 8, 
    marginRight: 8,
    marginBottom: 8,
}, 

list: {
    marginTop: 8,
    marginLeft: 8,
    marginRight: 8,
}
})