import React from 'react'; 
import {NavigationContainer} from '@react-navigation/native'; 
import {createNativeStackNavigator} from '@react-navigation/native-stack'; 
import { createDrawerNavigator} from '@react-navigation/drawer';
import Contacts from './screens/Contacts'; 
import Profile from './screens/Profile'; 
import Favorites from './screens/Favorites'; 
import User from './screens/User'; 
import { MaterialIcons } from '@expo/vector-icons'; 
import color from './utils/color';
import Options from './screens/Options';

const getDrawerItemIcon = icon => ({ tintColor }) => ( 
    <MaterialIcons name={icon} size={22} style={{ color: tintColor }} /> 
); 

const Stack = createNativeStackNavigator(); 

const ContactsScreens = () => { 
    return ( 
        <Stack.Navigator 
            initialRouteName="Contacts"  
            screenOptions={{ 
                headerShown: false,
                headerTintColor: 'white', 
                headerStyle: { backgroundColor: 'red' }, 
                headerTitleAlign:'center', 
            }} 
        > 
            <Stack.Screen 
                name='Contacts' 
                component={Contacts} 
                options={{title: "Contacts"}} 
            /> 
            <Stack.Screen  
                name='Profile'  
                component={Profile}  
                options={({ route }) => { 
                    const { contact } = route.params; 
                    const { name } = contact; 
                    return { 
                        title: name.split(' ')[0], 
                        headerTintColor: 'white', 
                        headerStyle: { backgroundColor: color.blue }, 
                    }; 
                }} 
            /> 
        </Stack.Navigator> 
    ); 
} 

const FavoritesScreens = () => { 
    return ( 
        <Stack.Navigator 
            initialRouteName="Favorites" 
            screenOptions={{ 
                headerShown: false, // Ẩn thanh tiêu đề
            }}> 
            <Stack.Screen 
                name='Favorites' 
                component={Favorites} 
                options={{title: "Favorites"}} 
            /> 
            <Stack.Screen 
                name='Profile' 
                component={Profile} 
                options={{ 
                    title: "Profile", 
                    headerStyle: { backgroundColor: 'orange' }, 
                }} 
            /> 
        </Stack.Navigator> 
    ); 
}
 

const UserScreens = ({ navigation }) => { 
    return ( 
        <Stack.Navigator 
            initialRouteName="User"> 
            <Stack.Screen 
                name='User' 
                component={User}  
                options={{ 
                    headerTitle: "Me", 
                    headerTintColor: 'white', 
                    headerStyle: { backgroundColor: color.blue }, 
                    headerRight: () => ( 
                        <MaterialIcons 
                            name="settings" 
                            size={24} 
                            style={{ color: 'white', marginRight: 10 }} 
                            onPress={() => navigation.navigate('Options')} 
                        /> 
                    ), 
                }} 
            /> 
            <Stack.Screen 
                name='Options' 
                component={Options} 
                options={{ title: "Options", headerStyle: { backgroundColor: 'darkblue' }}} 
            /> 
        </Stack.Navigator> 
    ); 
} 

const Drawer = createDrawerNavigator(); 
const DrawerNavigator = () => { 
    return ( 
        <NavigationContainer> 
            <Drawer.Navigator 
                initialRouteName='ContactsScreens'
                screenOptions={{ 
                    drawerStyle: { backgroundColor: 'white' }, // Màu nền của ngăn kéo
                    drawerActiveTintColor: 'tomato', // Màu khi item được chọn
                    drawerInactiveTintColor: 'black', // Màu khi item không được chọn
                }}
            > 
                <Drawer.Screen 
                    name="ContactsScreens" 
                    component={ContactsScreens}  
                    options={{ 
                        title: 'Contacts',
                        drawerIcon: getDrawerItemIcon('list'), 
                        headerStyle: { backgroundColor: 'blue' }, // Màu thanh tiêu đề cho Contacts
                        headerTintColor: 'white', // Màu chữ tiêu đề
                    }} 
                /> 
                <Drawer.Screen 
                    name="FavoritesScreens" 
                    component={FavoritesScreens}  
                    options={{ 
                        title: 'Favorites',
                        drawerIcon: getDrawerItemIcon('star'), 
                        headerStyle: { backgroundColor: 'orange' }, // Màu thanh tiêu đề cho Favorites
                        headerTintColor: 'white',
                    }} 
                /> 
                <Drawer.Screen 
                    name="UserScreens" 
                    component={UserScreens}  
                    options={{ 
                        title: 'User',
                        drawerIcon: getDrawerItemIcon('person'), 
                        headerStyle: { backgroundColor: 'purple' }, // Màu thanh tiêu đề cho User
                        headerTintColor: 'white',
                    }} 
                /> 
            </Drawer.Navigator> 
        </NavigationContainer> 
    ); 
}


export default DrawerNavigator;
