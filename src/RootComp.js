import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import {
    Text,
    AsyncStorage
} from 'react-native';
import { NavigationContainer, CommonActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
    RegistryScreen,
    HomeScreen,
    SuccessScreen,
    LoginScreen,
    HosoScreen,
    SettingsScreen,
    ThemlichkhamScreen,
    QmkScreen,
    ThongtindangkykhamScreen,
    DangkykhamScreen,
    KiemtrathongtinScreen,
    AuthLoadingScreen,
    SigninScreen
} from './screens'
import CancelButton from './components/CancelButton'
import { Loading } from './components';
import { AntDesign } from '@expo/vector-icons';

//theme
import { Theme } from './utils/theme'

//redux
import { connect } from 'react-redux'
import { gvActions } from './redux/actions'

const RootStack = createStackNavigator();
const MainStack = createStackNavigator();
const Tab = createBottomTabNavigator();

const styleHeader = {
    headerStyle: {
        backgroundColor: '#fff',
    },
    headerTintColor: 'black',
    headerTitleAlign: 'center',
    headerTitleStyle: {
        fontWeight: '600',
        elevation: 0,
    },
}

const HomeStack = createStackNavigator();

const HomeTab = () => {
    return (
        <HomeStack.Navigator initialRouteName='HomeScreen'
            screenOptions={{
                headerLeft: null,
                headerStyle: {
                    backgroundColor: Theme.colors.primary,
                    height: 120,
                    elevation: 0,
                },
                headerTitleAlign: 'center',
                headerTitleStyle: {
                    fontWeight: '600',
                    color: '#fff',
                },
            }}
        >
            <HomeStack.Screen name='HomeScreen'
                component={HomeScreen}
                options={{
                    title: 'Trang chủ',
                }} />
        </HomeStack.Navigator>
    )
}

const DKKStack = createStackNavigator();

const DangkykhamTab = ({ navigation }) => {
    const resetAction = () => CommonActions.reset({
        index: 0,
        routes: [
            { name: 'DangkykhamScreen' }
        ],
    })
    return (
        <DKKStack.Navigator initialRouteName='DangkykhamScreen'
            screenOptions={{
                headerStyle: {
                    backgroundColor: Theme.colors.primary,
                    height: 120,
                    elevation: 0,
                },
                headerTitleAlign: 'center',
                headerTitleStyle: {
                    fontWeight: '600',
                    color: '#fff',
                },
                headerBackImage: () => {
                    return (
                        <AntDesign
                            name="left"
                            size={20}
                            color="#fff"
                            style={{ paddingLeft: 10 }}
                        />)
                },
            }}
        >
            <DKKStack.Screen name='DangkykhamScreen'
                component={DangkykhamScreen}
                options={{
                    title: 'Đối tượng đăng ký khám',
                }} />
            <DKKStack.Screen name='ThemlichkhamScreen'
                component={ThemlichkhamScreen}
                options={{
                    title: 'Thêm lịch khám',
                    headerRight: () => {
                        return (
                            <CancelButton resetAction={resetAction} navigation={navigation} />
                        )
                    }
                }} />
            <DKKStack.Screen name='ThongtindangkykhamScreen'
                component={ThongtindangkykhamScreen}
                options={{
                    title: 'Thông tin đăng ký khám',
                    headerRight: () => {
                        return (
                            <CancelButton resetAction={resetAction} navigation={navigation} />
                        )
                    }
                }} />
            <DKKStack.Screen name='KiemtrathongtinScreen'
                component={KiemtrathongtinScreen}
                options={{
                    title: 'Thông tin bệnh nhân',
                    headerRight: () => {
                        return (
                            <CancelButton resetAction={resetAction} navigation={navigation} />
                        )
                    }
                }} />

        </DKKStack.Navigator>
    )
}

const HosoStack = createStackNavigator();

const HosoTab = () => {
    return (
        <HosoStack.Navigator initialRouteName='HosoScreen' >
            <HosoStack.Screen name='HosoScreen'
                component={HosoScreen}
                options={{
                    title: 'Hồ sơ sức khỏe',
                    headerStyle: {
                        backgroundColor: Theme.colors.primary,
                        height: 120,
                        elevation: 0,
                    },
                    headerTitleAlign: 'center',
                    headerTitleStyle: {
                        fontWeight: '600',
                        color: '#fff',
                    },
                }} />
        </HosoStack.Navigator>
    )
}

const SettingsStack = createStackNavigator();

const SettingsTab = () => {
    return (
        <SettingsStack.Navigator initialRouteName='SettingsScreen' >
            <SettingsStack.Screen name='SettingsScreen'
                component={SettingsScreen}
                options={{
                    title: 'Cài đặt',
                    headerLeft: null,
                    headerStyle: {
                        backgroundColor: Theme.colors.primary,
                        elevation: 0,
                    },
                    headerTitleAlign: 'center',
                    headerTitleStyle: {
                        fontWeight: '600',
                        color: '#fff',
                    },
                }} />
        </SettingsStack.Navigator>
    )
}

const TabsScreen = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === "HomeScreen") {
                        iconName = focused ? "ios-home" : "ios-home";
                    } else if (route.name === "DangkykhamScreen") {
                        iconName = focused ? "md-medkit" : "md-medkit";
                    } else if (route.name === "HosoScreen") {
                        iconName = focused ? "ios-list" : "ios-list";
                    } else {
                        iconName = focused ? "ios-settings" : "ios-settings";
                    }

                    // You can return any component that you like here!
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarLabel: ({ color }) => {
                    let labelName;
                    if (route.name === "HomeScreen") {
                        labelName = "Home";
                    } else if (route.name === "DangkykhamScreen") {
                        labelName = "Đăng ký khám";
                    } else if (route.name === "HosoScreen") {
                        labelName = "Hồ sơ";
                    } else {
                        labelName = "Cài đặt";
                    }
                    return <Text style={{ color: color, fontSize: 12, marginBottom: 3 }}> {labelName} </Text>
                }
            })}
            tabBarOptions={{
                activeBackgroundColor: '#fff',
                inactiveBackgroundColor: Theme.colors.primary,
                activeTintColor: 'gray',
                inactiveTintColor: '#fff',
                style: {
                    height: 65
                },
            }}
        >
            <Tab.Screen name="HomeScreen" component={HomeTab} />
            <Tab.Screen name="DangkykhamScreen" component={DangkykhamTab} />
            <Tab.Screen name="HosoScreen" component={HosoTab} />
            <Tab.Screen name="Settings" component={SettingsTab} />
        </Tab.Navigator>
    )
}

const MainStackScreen = () => {
    return (
        <MainStack.Navigator initialRouteName="Home" screenOptions={styleHeader}>
            <MainStack.Screen name="Home"
                component={TabsScreen}
                options={{
                    title: 'Trang tab',
                    headerShown: false,
                }} />
        </MainStack.Navigator>

    )
}

function RootComp(props) {

    useEffect(() => {
        props.dispatch({ type: gvActions.PENDING });
        const bootstrapAsync = async () => {
            let userToken;

            try {
                userToken = await AsyncStorage.getItem('userToken');
            } catch (e) {
                console.log('Restoring token failed', e)
            }

            // After restoring token, we may need to validate it in production apps

            // This will switch to the App screen or Auth screen and this loading
            // screen will be unmounted and thrown away.
            props.dispatch({ type: gvActions.SUCCESSFUL_USERTOKEN, payload: userToken });
        };

        bootstrapAsync();
    }, [])

    useEffect(()=>{
        console.log("ut",props.userToken)
    },[props.userToken])

    if (props.loading) {
        return (
            <Loading size="large" />
        )
    }

    return (
        <>
            <StatusBar hidden={true} />
            <NavigationContainer>
                <RootStack.Navigator >
                    {(props.userToken == null || props.userToken == 'a-way-out') ? (
                        <>
                            <RootStack.Screen name="Login"
                                component={SigninScreen}
                                options={{
                                    title: 'Login page',
                                    headerShown: false,
                                }}
                            />
                            <RootStack.Screen name="Registry"
                                component={RegistryScreen}
                                options={{
                                    title: 'Thông tin tài khoản',
                                    headerStyle: {
                                        backgroundColor: '#fff',
                                        height: 150,
                                        elevation: 0,
                                    },
                                    headerTitleAlign: 'center',
                                    headerTitleStyle: {
                                        fontWeight: '600',
                                        color: '#000',
                                    },
                                    headerBackImage: () => {
                                        return (
                                            <AntDesign
                                                name="left"
                                                size={20}
                                                color="#000"
                                                style={{ paddingLeft: 10 }}
                                            />)
                                    },
                                }}
                            />
                            <RootStack.Screen name="SuccessScreen"
                                component={SuccessScreen}
                                options={{
                                    headerShown: false,
                                    headerStyle: {
                                        backgroundColor: Theme.colors.primary,
                                        elevation: 0,
                                    },
                                }}
                            />
                            <RootStack.Screen name="QmkScreen"
                                component={QmkScreen}
                                options={{
                                    title: 'Quên mật khẩu'
                                }}
                            />
                        </>
                    ) : (
                            <RootStack.Screen
                                name="Main"
                                options={{ headerShown: false }}
                                component={MainStackScreen}
                            />
                        )}

                </RootStack.Navigator>
            </NavigationContainer>
        </>
    )
}

const mapStateToProps = state => ({
    userToken: state.global.userToken,
    loading: state.global.loading
})

export default connect(mapStateToProps)(RootComp);