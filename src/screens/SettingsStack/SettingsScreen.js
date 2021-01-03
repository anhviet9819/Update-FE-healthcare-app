import React from 'react'
import { View, 
    Text, 
    StyleSheet, 
    Button,
    AsyncStorage 
} from 'react-native'

//redux
import { connect } from 'react-redux'
import { gvActions} from '../../redux/global_variables'

const SettingsScreen = (props) => {

    const signOut = async () =>{
        try {
            // big big problem : cant pass a item in AsyncStorage a null value ??

            await AsyncStorage.setItem('userToken', 'a-way-out' )
        } catch(e) {
            //handle it !

            console.log(e)
        }
        await props.dispatch({type: gvActions.REJECTED_USERTOKEN })
    }

    return (
        <View style={styles.container}>
            <Text> SETTINGS </Text>
            <Button
                onPress={() => signOut()}
                title="log out"
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

const mapStateToProps = state => ({

})

export default connect(mapStateToProps) (SettingsScreen);