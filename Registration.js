import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useState } from 'react';

const Registration = ({ navigation }) => {

    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const RegistrationAccount = () => {
        axios({
            method: 'post',
            url: 'http://bibizan12-001-site1.ctempurl.com/api/Authenticate/regUser',
            data: {
                "userName": name,
                "password": password,
                "email": email
            }
        }).then((response) => {
            alert('Account was create');
            navigation.navigate('Login');
        }).catch((error) => {
            console.error("Error during registration:", error);
            alert("An error occurred. Please check the console for details.");
        })
    };

    const LoginPage = () => {
        navigation.navigate("Login");
    };

    return (
        <View style={styles.container}>
            <Text style={styles.textReg}>Name</Text>
            <TextInput style={styles.input} placeholder='Enter your name' value={name} onChangeText={(e) => (setName(e))} />
            <Text style={styles.textReg}>Password</Text>
            <TextInput style={styles.input} placeholder='Enter your password' value={password} onChangeText={(e) => (setPassword(e))} />
            <Text style={styles.textReg}>Email</Text>
            <TextInput style={styles.input} placeholder='Enter your email' value={email} onChangeText={(e) => (setEmail(e))} />
            <TouchableOpacity style={styles.button} onPress={RegistrationAccount}><Text style={styles.buttonText}>Enter</Text></TouchableOpacity>
            <TouchableOpacity style={styles.buttonLog} onPress={LoginPage}><Text style={styles.buttonTextLog}>If you have a account</Text></TouchableOpacity>
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
        shadowRadius: 4.65,
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
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    buttonLog: {
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
        marginTop: '30%'
    },
    buttonTextLog: {
        color: '#7f95ba',
        fontSize: 18,
        fontWeight: 'bold',
    },
    textReg: {
        fontSize: 20,
        fontWeight: 'bold'
    }
});

export default Registration;