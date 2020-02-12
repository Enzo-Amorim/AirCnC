import React, { useState, useEffect } from 'react';
import { withNavigation} from 'react-navigation';
import { View, StyleSheet, Text, FlatList, Image } from 'react-native';

import api from '../services/api';
import { TouchableOpacity } from 'react-native-gesture-handler';

function SpotList({ tech, navigation }) {
    const [spots, setSpots] = useState([]);
    
    useEffect(() => {
        async function loadSpots() {
            const response = await api.get('/spots', {
                params: { tech }
            })
            setSpots(response.data);
        }

        loadSpots();
    }, []);

    function handleNavigate(id) {
        navigation.navigate('Book', { id })
    }

    return (
        <View style={styles.container}>
            <Text style={styles.tittle}>Empresas que usam <Text style={styles.bold}>{tech}</Text></Text>


            <FlatList
                style={styles.list}
                data={spots}
                keyExtractor={spot => spot._id}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                    <View style={styles.listItem}>
                        <Image source={{ uri: "http://192.168.1.3:3333/files/" + item.thumbnail }} style={styles.thumbnail} />
                        <Text style={styles.company}>{item.company}</Text>
                        <Text style={styles.price}>{item.price ? `R$${item.price}/dia` : `GRATUITO`}</Text>
                        <TouchableOpacity onPress={() => handleNavigate(item._id)} style={styles.button}>
                            <Text style={styles.buttonText}>Solicitar Reserva</Text>
                        </TouchableOpacity>
                    </View>
                )}
                
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 30,
    },
    tittle: {
        fontSize: 20,
        color: '#444',
        paddingHorizontal: 20,
        marginBottom: 15,
    },
    bold: {
        fontWeight: 'bold',
    },
    list: {
        paddingHorizontal: 20,
    },
    listItem: {
        marginRight: 15,
    },
    thumbnail: {
        width: 300,
        height: 120,
        resizeMode: 'cover',
        borderRadius: 5,
    },
    company: {
        fontSize: 24,
        fontWeight:'bold',
        color: '#333',
        marginTop: 10,
    },
    price: {
        fontSize: 15,
        color: '#999',
        marginTop: 5,
    },
    button: {
        height: 34,
        backgroundColor: '#f05a5b',
        justifyContent:'center',
        alignItems: 'center',
        borderRadius:10,
        marginTop: 15,
    },
    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 15,
    },
});

export default withNavigation(SpotList);