import axios from "axios";
import { useEffect, useState } from "react";
import { Image, Text, View, FlatList, TouchableOpacity, StyleSheet, TextInput } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Snackbar } from "react-native-paper";

export default function MainMenu({ navigation }) {

    const [gadgets, setGadgets] = useState([]);
    const [gadgetSearchName, setGadgetSearchName] = useState('');
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

    const SelectGadgets = () => {
        getToken().then((token) => {
            if (token) {
                axios({
                    method: 'get',
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
    }

    const hideSnackBar = () => {
        setSnackBarVisible(false);
    }

    const TouchProdInfo = (productId) => {
        navigation.navigate("Product Information", { productId });
    };

    const TouchSearchListInfo = () => {
        navigation.navigate("Search Product", { gadgetSearchName });
    };

    useEffect(() => {
        SelectGadgets();
        const intervalId = setInterval(() => {
            SelectGadgets();
        }, 1000);
        return () => clearInterval(intervalId);
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Enter name gadget"
                    value={gadgetSearchName}
                    onChangeText={(e) => { setGadgetSearchName(e) }} />
                <TouchableOpacity style={styles.searchButton} onPress={() => { TouchSearchListInfo() }}>
                    <Text style={styles.searchButtonText}>🔍</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={gadgets}
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
                                showSnackBar(item.name + " not avilable")
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
    searchContainer: {
        flexDirection: 'row',
        marginBottom: 16,
        backgroundColor: '#fff',
        borderRadius: 8,
        elevation: 4,
        paddingHorizontal: 16,
        alignItems: 'center',
    },
    searchInput: {
        flex: 1,
        paddingVertical: 12,
        fontSize: 16,
    },
    searchButton: {
        backgroundColor: 'transparent',
        padding: 12,
        borderRadius: 8,
        marginLeft: 10,
    },
    searchButtonText: {
        color: '#3498db',
        fontSize: 20,
    },
});