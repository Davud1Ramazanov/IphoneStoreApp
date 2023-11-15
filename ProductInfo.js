import axios from "axios";
import { useState } from "react";
import { Image, Text, View, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProductInfo({ route }) {

    const { productId } = route.params;
    const [productInfo, setProductInfo] = useState([]);

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
                    url: `http://bibizan12-001-site1.ctempurl.com/api/Product/FindByProductId?productId=${productId}`,
                    headers: {
                        'Authorization': 'Bearer ' + token,
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                }).then((response) => {
                    setProductInfo(response.data);
                }).catch((error) => {
                    alert("You have a problem!")
                })
            }
        })
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
                        "dateOrder": new Date().toDateString
                    },
                    headers: {
                        'Authorization': 'Bearer ' + token,
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                }).then((response) => {
                    alert(`You succsessfull added ${item.name}`)
                }).catch((error) => {
                    console.error("Error fetching gadgets:", error);
                });
            }
        })
    };

    useState(() => {
        SelectProductInfo();
    }, [productId]);

    return (
        <View style={styles.CardInfo}>
            <FlatList
                data={productInfo}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View>
                        <Image source={{ uri: item.image }} style={styles.image} />
                        <Text style={styles.name}>Name: {item.name}</Text>
                        <Text style={styles.price}>Price: {item.price} UAH</Text>
                        <Text style={styles.detailProd}>Detail:</Text>
                        <Text style={styles.detail}>Color: {item.color}</Text>
                        <Text style={styles.detail}>Pixel: {item.pixel}</Text>
                        <Text style={styles.detail}>Description: {item.description}</Text>
                        <TouchableOpacity style={styles.buttonBuy} onPress={() => { AddOrder(item) }}>
                            <Text style={styles.buttonTextBuy}>Buy</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    CardInfo: {
        marginBottom: 16,
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 8,
        elevation: 4,
        borderRadius: 20
    },
    image: {
        width: 300,
        height: 300,
        resizeMode: 'contain',
        borderRadius: 8,
        marginBottom: 8,
        marginBottom: 20
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
        fontSize: 27,
        fontWeight: 'bold',
        marginBottom: 10,
        marginLeft: 30,
    },
    price: {
        fontSize: 26,
        fontWeight: 'bold',
        marginLeft: 30
    },
    detailProd: {
        fontSize: 30,
        fontWeight: 'bold',
        marginLeft: 30,
        marginTop: 25
    },
    detail: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 30,
        marginTop: 10
    },
})