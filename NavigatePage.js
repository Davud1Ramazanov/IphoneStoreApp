import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./Login";
import Registration from "./Registration";
import MainMenu from "./MainMenu";

const Stack = createStackNavigator();

export default function NavigatePage() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="SpaceList">
                <Stack.Screen name="Registration" component={Registration} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Main Menu" component={MainMenu} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}