import React, {useState} from 'react';
import { SafeAreaView, StyleSheet, AsyncStorage, TouchableOpacity, TextInput,Text, Alert } from 'react-native';

import api from '../services/api';

export default function Book({ navigation }) {
    const [date, setDate] = useState('');
    const id = navigation.getParam('id');

    async function handleSubmit(){
        const user_id = await AsyncStorage.getItem('user');

        await api.post(`/spots/${id}/bookings`,{
            date
        },{
            headers: { user_id }
        })

        Alert.alert('Solicitação de reserva enviada');

        navigation.navigate('List');
    }

    function handleCancel(){
        navigation.navigate('List');
    }
    return (
    <SafeAreaView style={styles.container}>
         <Text style={styles.label}>DATA DE INTERESSE *</Text>
                 <TextInput
                    style={styles.input}
                    placeholder="Qual data você quer reservar?"
                    placeholderTextColor="#999"
                    autoCapitalize="words"
                    autoCorrect={false}
                    value={date}
                    onChangeText={setDate}
                 />

                 <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                    <Text style={styles.buttonText}>Solicitar Reserva</Text>
                 </TouchableOpacity>

                 <TouchableOpacity onPress={handleCancel} style={[styles.button ,styles.cancelButton]}>
                    <Text style={styles.buttonText}>Cancelar</Text>
                 </TouchableOpacity>
    </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        marginTop: 50,
        margin: 30,
    },
    label: {
        fontWeight: "bold",
        color: '#444',
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        paddingHorizontal: 20,
        fontSize:16,
        color: '#444',
        height: 44,
        marginBottom: 20,
        borderRadius: 10,
    },
    button: {
        height: 42,
        backgroundColor: '#f05a5b',
        justifyContent:'center',
        alignItems: 'center',
        borderRadius:10,
    },
    cancelButton: {
        backgroundColor: '#ccc',
        marginTop: 10,
    },
    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
    },
})