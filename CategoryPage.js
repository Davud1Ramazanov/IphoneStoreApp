import axios from "axios";
import { useEffect, useState } from "react";
import { Image, Text, View, FlatList, TouchableOpacity, StyleSheet, TextInput } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CategoryPage({ navigation }) {

    const [category, setCategory] = useState([]);

    const getToken = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            return token;
        } catch (error) {
            console.error("Error retrieving token:", error);
            return null;
        }
    };

    const SelectCategories = () => {
        getToken().then((token) => {
            if (token) {
                axios({
                    method: 'get',
                    url: 'http://bibizan12-001-site1.ctempurl.com/api/Category/Select',
                    headers: {
                        'Authorization': 'Bearer ' + token,
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                }).then((response) => {
                    setCategory(response.data);
                }).catch((error) => {
                    console.error("Error fetching gadgets:", error);
                });
            }
        });
    };

    const TouchCategoryInfo = (categoryId) => {
        navigation.navigate("Category Information", { categoryId });
    };

    useEffect(() => {
        SelectCategories();
        const intervalId = setInterval(() => {
            SelectCategories();
        }, 1000);
        return () => clearInterval(intervalId);
    }, [])

    return (
        <View style={styles.container}>
            <FlatList
                data={category}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.itemContainer} onPress={() => { TouchCategoryInfo(item.categoryId) }}>
                        <Text style={styles.name}>{item.name}</Text>
                        <Image source={{ uri: item.image }} style={styles.image} />
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
        width: 400,
        height: 200,
        resizeMode: 'contain',
        borderRadius: 8,
        marginBottom: 8,
    },
    name: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 10,
        marginLeft: 30
    },
});