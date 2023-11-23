import axios from "axios";
import { useEffect, useState } from "react";
import { Image, Text, View, FlatList, TouchableOpacity, StyleSheet, TextInput } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, Card, Snackbar } from 'react-native-paper';

export default function OrderPage({ navigation }) {

    const [orders, setOrders] = useState([]);
    const [snackBarVisible, setSnackBarVisible] = useState(false);
    const [snackBarText, setSnackBarText] = useState('');

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
                    setOrders([]);
                })
            }
        }, []);
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
                    showSnackBar(`You succsessfull removed ${item.productName}`);
                }).catch((error) => {
                    console.error("Error fetching gadgets:", error);
                });
            }
        })
    };

    const UpdateOrder = (item, updateQuantity) => {
        getToken().then((token) => {
            if (token) {
                axios({
                    method: 'post',
                    url: 'http://bibizan12-001-site1.ctempurl.com/api/Order/Update',
                    data: {
                        "orderId": item.orderId,
                        "productId": item.productId,
                        "buyer": item.buyer,
                        "quantity": updateQuantity,
                        "total": item.total / item.quantity * updateQuantity,
                        "dateOrder": new Date().toISOString()
                    },
                    headers: {
                        'Authorization': 'Bearer ' + token,
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                }).then((response) => {
                    showSnackBar(`You successfully added/removed count for ${item.productName}`);
                }).catch((error) => {
                    console.error("Error fetching gadgets:", error);
                });
            }
        });
    };

    const showSnackBar = (message) => {
        setSnackBarText(message);
        setSnackBarVisible(true);
    }

    const hideSnackBar = () => {
        setSnackBarVisible(false);
    }

    const AddQuantity = (item) => {
        if (item.productQuantity > 0) {
            UpdateOrder(item, item.quantity + 1);
        }
        else {
            showSnackBar("You have already selected the maximum quantity of goods.");
        }
    }


    const RemoveQuantity = (item) => {
        if (item.quantity <= 1) {
            showSnackBar("You have already selected the maximum quantity of goods.");
        } else {
            UpdateOrder(item, item.quantity - 1);
        }
    }

    const TouchProdInfo = (productId) => {
        navigation.navigate("Product Information", { productId });
    };

    useEffect(() => {
        SelectOrders();
        const intervalId = setInterval(() => {
            SelectOrders();
        }, 1000);
        return () => clearInterval(intervalId);
    }, [])

    return (
        <View style={styles.container}>
            {orders.length > 0 ? (
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
                            <Card.Actions style={{ marginRight: '20%' }}>
                                <Button onPress={() => { AddQuantity(item) }}>
                                    +
                                </Button>
                                <Button onPress={() => { RemoveQuantity(item) }}>
                                    -
                                </Button>
                                <Button buttonColor="red" icon="delete" onPress={() => { RemoveOrder(item) }}>
                                    Delete
                                </Button>
                            </Card.Actions>
                        </TouchableOpacity>
                    )}
                />
            ) : (
                <Text style={styles.textDetail}>You have no orders at this time</Text>
            )}

            <Snackbar
                visible={snackBarVisible}
                onDismiss={hideSnackBar}
                action={{
                    label: 'OK',
                    onPress: hideSnackBar,
                }}
                style={{ marginLeft: '10%' }}
            >
                {snackBarText}
            </Snackbar>

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
        margin: 5,
        marginLeft: 25,
        marginBottom: 10
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
    buttonQuantity: {
        backgroundColor: 'blue',
        width: 30,
        height: 30,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 26,
        marginTop: 10
    },
    buttonTextQuantity: {
        color: '#fff',
        fontWeight: 'bold',
    },
    textDetail: {
        fontSize: 20,
        textAlign: 'center',
        marginTop: '80%'
    }
});