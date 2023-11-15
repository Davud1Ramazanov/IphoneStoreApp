import axios from "axios";
import { useEffect, useState } from "react";
import { Image, Text, View, FlatList, TouchableOpacity, StyleSheet, TextInput } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function OrderPage({ navigation }) {

    const [orders, setOrders] = useState([]);

    const getToken = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            return token;
        } catch (error) {
            console.error("Error retrieving token:", error);
            return null;
        }
    };

    const SelectOrders = () => {
        getToken().then((token) => {
            if (token) {
                axios({
                    method: 'get',
                    url: 'http://bibizan12-001-site1.ctempurl.com/api/Order/SelectOrderByProd',
                    headers: {
                        'Authorization': 'Bearer ' + token,
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                }).then((response) => {
                    setOrders(response.data);
                }).catch((error) => {
                    alert("Error you don't have order")
                });
            }
        });
    };

    const RemoveOrder = (item) => {
        getToken().then((token) => {
            if (token) {
                axios({
                    method: 'post',
                    url: 'http://bibizan12-001-site1.ctempurl.com/api/Order/Remove',
                    data: {
                        "orderId": item.orderId,
                        "productId": item.productId,
                        "buyer": item.buyer,
                        "quantity": item.quantity,
                        "total": item.price,
                        "dateOrder": item.dateOrder
                    },
                    headers: {
                        'Authorization': 'Bearer ' + token,
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                }).then((response) => {
                    alert(`You succsessfull removed ${item.productName}`);
                }).catch((error) => {
                    console.error("Error fetching gadgets:", error);
                });
            }
        })
    };

    const TouchProdInfo = (productId) => {
        navigation.navigate("Product Information", { productId });
    };

    useEffect(() => {
        SelectOrders();
        const intervalId = setInterval(() => {
            SelectOrders();
        }, 5000);
        return () => clearInterval(intervalId);
    }, [])

    return (
        <View style={styles.container}>
            <FlatList
                data={orders}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.orderContainer} onPress={() => { TouchProdInfo(item.productId) }}>
                        <Image source={{ uri: item.image }} style={styles.image} />
                        <Text style={styles.detail}>Order number: {item.orderId}</Text>
                        <Text style={styles.detail}>Name: {item.productName}</Text>
                        <Text style={styles.detail}>Quantity: {item.quantity}</Text>
                        <Text style={styles.detail}>Total: {item.total} UAH</Text>
                        <Text style={styles.detail}>Date: {item.dateOrder}</Text>
                        <TouchableOpacity style={styles.buttonRemove} onPress={() => { RemoveOrder(item) }}>
                            <Text style={styles.buttonTextRemove}>Delete</Text>
                        </TouchableOpacity>
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
        backgroundColor: '#f4f4f4',
    },
    orderContainer: {
        backgroundColor: '#fff',
        marginBottom: 16,
        padding: 16,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    image: {
        width: 300,
        height: 300,
        resizeMode: 'contain',
        marginBottom: 40,
        borderRadius: 8,
    },

    detail: {
        fontSize: 20,
        fontWeight: 'bold',
        margin: 10,
        padding: 5,
        marginLeft: 25
    },
    buttonRemove: {
        backgroundColor: 'red',
        width: 100,
        padding: 13,
        borderRadius: 7,
        alignItems: 'center',
        marginLeft: 26
    },
    buttonTextRemove: {
        color: '#fff',
        fontWeight: 'bold',
    },
});
