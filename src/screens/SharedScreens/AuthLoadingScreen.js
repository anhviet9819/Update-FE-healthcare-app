import React, { useEffect } from 'react'
import {
    View,
    ActivityIndicator,
    AsyncStorage,
    StyleSheet,
    Image
} from 'react-native'

const AuthLoadingScreen = ({navigation}) => {
    
    return (
        <View style={styles.container}>
            <Image source={require('../../../assets/imgs/vncare.jpg')} style = {{width:100}} />
            <ActivityIndicator />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        backgroundColor: '#fff'
    },
});

export default AuthLoadingScreen;