import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({ navigation }) => {

    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const LoginAccount = () => {
        axios({
            method: 'post',
            url: 'http://bibizan12-001-site1.ctempurl.com/api/Authenticate/login',
            data: {
                'userName': name,
                'password': password
            }
        })
            .then((response) => {
                alert('You successfully authenticated');
                AsyncStorage.setItem('token', response.data.token)
                    .then(() => {
                        navigation.navigate('Main Tabs');
                    })
                    .catch((error) => {
                        console.error("Error storing token:", error);
                    });
            })
            .catch((error) => {
                console.error("Error during authentication:", error);
                alert("An error occurred. Please check the console for details.");
            });
    }


    return (
        <View style={styles.container}>
            <Text style={styles.textLog}>Name</Text>
            <TextInput style={styles.input} placeholder='Enter your name' value={name} onChangeText={(e) => (setName(e))} />
            <Text style={styles.textLog}>Password</Text>
            <TextInput style={styles.input} placeholder='Enter your password' value={password} onChangeText={(e) => (setPassword(e))} />
            <TouchableOpacity style={styles.button} onPress={() => (LoginAccount())} ><Text style={styles.buttonText}>Enter</Text></TouchableOpacity>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#ffffff',
        padding: 16,
    },
    input: {
        width: '100%',
        height: 50,
        borderColor: '#3498db',
        borderBottomWidth: 2,
        marginBottom: 20,
        fontSize: 18,
        color: '#2c3e50',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65
    },
    button: {
        backgroundColor: '#27ae60',
        padding: 14,
        borderRadius: 8,
        width: '100%',
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
        marginBottom: '30%'
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    textLog: {
        fontSize: 20,
        fontWeight: 'bold'
    }
});

export default Login;