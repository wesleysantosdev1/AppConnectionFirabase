import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { db } from "./firebaseConnection";
import { deleteDoc, doc } from "firebase/firestore";

export  function UsersList({ data, handleEdit }){

    async function handleDeleteItem(){
        const docRef = doc(db, "users", data.id)
        await deleteDoc(docRef)
    }

    async function handleEditUsers() {
        handleEdit(data);
    }
    return(
        <View style={styles.container}>
            <Text> Nome: {data.nome} </Text>
            <Text> Idade: {data.idade} </Text>
            <Text> Cargo: {data.cargo} </Text>

            <View style={styles.viewButtons}>
                <TouchableOpacity style={styles.button} onPress={handleDeleteItem}>
                    <Text style={styles.buttonText}>Deletar usuario</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button1} onPress={handleEditUsers}>
                    <Text style={styles.buttonText}>Editar usuario</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#f0f0f0",
        padding: 8,
        borderRadius: 4, 
        marginBottom: 14,
    }, 

    item: {
        color: "#000",
        fontSize: 16,
    },

    viewButtons: {
        flexDirection: 'row',
    },

    button: {
        backgroundColor: "#b3261e", 
        alignSelf: 'flex-start', 
        padding: 4,
        borderRadius: 6,
        marginTop: 16,
        marginRight: 16
    }, 

    buttonText: {
        color: "#fff", 
        paddingLeft: 8, 
        paddingRight: 8
    }, 

    button1: {
        backgroundColor: "#000", 
        alignSelf: 'flex-start', 
        padding: 4,
        borderRadius: 6,
        marginTop: 16
    }
})