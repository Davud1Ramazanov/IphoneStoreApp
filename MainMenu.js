import axios from "axios";
import { useEffect, useState } from "react";
import { Image, Text, View, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function MainMenu() {

    const [gadgets, setGadgets] = useState([]);

    const getToken = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            return token;
        } catch (error) {
            console.error("Error retrieving token:", error);
            return null;
        }
    }

    const SelectGadgets = () => {
        getToken().then((token) => {
            if (token) {
                axios({
                    method: 'post',
                    url: 'http://bibizan12-001-site1.ctempurl.com/api/Product/Select',
                    headers: {
                        'Authorization': 'Bearer ' + token,
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                }).then((response) => {
                    setGadgets(response.data);
                }).catch((error) => {
                    console.error("Error fetching gadgets:", error);
                });
            }
        });
    }

    useEffect(() => {
        SelectGadgets();
    }, [])

    return (
        <View style={styles.container}>
            <FlatList
                data={gadgets}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.itemContainer}>
                        <Image source={{ uri: item.image }} style={styles.image} />
                        <Text style={styles.name}>{item.name}</Text>
                        <Text style={styles.price}>{item.price} UAH</Text>
                        
                    </TouchableOpacity>
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f0f0f0', 
    },
    itemContainer: {
        marginBottom: 16,
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 8,
        elevation: 4,
        alignItems: 'center'
    },
    image: {
        width: 300,
        height: 300,
        resizeMode: 'contain',
        borderRadius: 8,
        marginBottom: 8,
    },
    
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    price: {
        fontSize: 16,
        color: 'green',
    },
});