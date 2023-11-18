import axios from "axios";
import { useState } from "react";
import { Image, Text, View, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Snackbar } from 'react-native-paper';

export default function SearchPage({ navigation, route }) {

    const { gadgetSearchName } = route.params;
    const [gadgetInfo, setGadgetInfo] = useState([]);
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

    const SelectProductInfo = () => {
        getToken().then((token) => {
            if (token) {
                axios({
                    method: 'get',
                    url: `http://bibizan12-001-site1.ctempurl.com/api/Product/FindByProductName?name=${gadgetSearchName}`,
                    headers: {
                        'Authorization': 'Bearer ' + token,
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                }).then((response) => {
                    setGadgetInfo(response.data);
                }).catch((error) => {
                    alert("You have a problem!")
                })
            }
        })
    };

    const TouchProdInfo = (productId) => {
        navigation.navigate("Product Information", { productId });
    };

    const AddOrder = (item) => {
        getToken().then((token) => {
            if (token) {
                axios({
                    method: 'post',
                    url: 'http://bibizan12-001-site1.ctempurl.com/api/Order/Create',
                    data: {
                        "orderId": 0,
                        "productId": item.productId,
                        "buyer": "buyer",
                        "quantity": 1,
                        "total": item.price,
                        "dateOrder": new Date().toISOString()
                    },
                    headers: {
                        'Authorization': 'Bearer ' + token,
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                }).then((response) => {
                    showSnackBar(`You succsessfull added ${item.name}`)
                }).catch((error) => {
                    console.error("Error fetching gadgets:", error);
                });
            }
        })
    };

    const showSnackBar = (message) => {
        setSnackBarText(message);
        setSnackBarVisible(true);
    };

    const hideSnackBar = () => {
        setSnackBarVisible(false);
    };

    useState(() => {
        SelectProductInfo();
        const intervalId = setInterval(() => {
            SelectProductInfo();
        }, 1000);
        return () => clearInterval(intervalId);
    }, []);

    return (
        <View style={styles.container}>
            <FlatList
                data={gadgetInfo}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.itemContainer} onPress={() => { TouchProdInfo(item.productId) }}>
                        <Image source={{ uri: item.image }} style={styles.image} />
                        <Text style={styles.name}>{item.name}</Text>
                        <Text style={styles.price}>{item.price} UAH</Text>
                        <TouchableOpacity style={styles.buttonBuy} onPress={() => {
                            if (item.quantity > 0) {
                                AddOrder(item);
                            } else {
                                showSnackBar(item.name + " is not avilable")
                            }
                        }}>
                            <Text style={styles.buttonTextBuy}>Buy</Text>
                        </TouchableOpacity>
                        <View style={styles.textContainer}>
                            {item.quantity > 0 ? (
                                <Text style={styles.obviousness}>Are available</Text>
                            ) : (
                                <Text style={styles.nobviousness}>Not available</Text>
                            )}
                            <Text style={styles.prodCode}>Product code: {item.productId}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />

            <Snackbar
                visible={snackBarVisible}
                onDismiss={hideSnackBar}
                action={{
                    label: 'OK',
                    onPress: hideSnackBar
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
        backgroundColor: '#f0f0f0',
    },
    itemContainer: {
        marginBottom: 16,
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 8,
        elevation: 4,
    },
    textContainer: {
        flexDirection: 'row',
        marginLeft: 8
    },
    image: {
        width: 300,
        height: 300,
        resizeMode: 'contain',
        borderRadius: 8,
        marginBottom: 8,
    },
    buttonBuy: {
        backgroundColor: '#27ae60',
        padding: 14,
        borderRadius: 8,
        width: '40%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
        marginLeft: 30,
        marginBottom: 30
    },
    buttonTextBuy: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    name: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 10,
        marginLeft: 30
    },
    price: {
        fontSize: 24,
        fontWeight: 'bold',
        marginLeft: 30
    },
    prodCode: {
        fontSize: 16,
        marginLeft: 90
    },
    obviousness: {
        fontSize: 16,
        color: 'green',
        marginLeft: 20
    },
    nobviousness: {
        fontSize: 16,
        color: 'red',
        marginLeft: 20
    },
})