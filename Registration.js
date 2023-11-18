import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useState } from 'react';
import { Snackbar } from 'react-native-paper';

const Registration = ({ navigation }) => {

    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [snackBarVisible, setSnackBarVisible] = useState(false);
    const [snackBarText, setSnackBarText] = useState('');

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
            showSnackBar('Account was create');
            navigation.navigate('Login');
        }).catch((error) => {
            showSnackBar("An error occurred. Please check correct data.");
        })
    };

    const LoginPage = () => {
        navigation.navigate("Login");
    };

    const showSnackBar = (message) => {
        setSnackBarText(message);
        setSnackBarVisible(true);
    };

    const hideSnackBar = () => {
        setSnackBarVisible(false);
    };

    return (
        <View style={styles.container}>
            <View style={styles.registrationElements}>
                <Text style={styles.textReg}>Name</Text>
                <TextInput style={styles.input} placeholder='Enter your name' value={name} onChangeText={(e) => (setName(e))} />
                <Text style={styles.textReg}>Password</Text>
                <TextInput style={styles.input} placeholder='Enter your password' secureTextEntry={true} value={password} onChangeText={(e) => (setPassword(e))} />
                <Text style={styles.textReg}>Email</Text>
                <TextInput style={styles.input} placeholder='Enter your email' keyboardType='email-address' value={email} onChangeText={(e) => (setEmail(e))} />
                <TouchableOpacity style={styles.button} onPress={RegistrationAccount}><Text style={styles.buttonText}>Enter</Text></TouchableOpacity>
            </View>
            <View style={styles.loginContainer}>
                <TouchableOpacity style={styles.buttonLog} onPress={LoginPage}><Text style={styles.buttonTextLog}>If you have a account</Text></TouchableOpacity>
            </View>
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
        justifyContent: 'center',
        backgroundColor: '#ffffff',
        padding: 16,
    },
    registrationElements: {
        backgroundColor: '#ffffff',
        padding: 20,
        borderRadius: 10,
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
        marginBottom: '10%'
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
    },
    loginContainer: {
        alignItems: 'center',
        justifyContent: 'center',
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