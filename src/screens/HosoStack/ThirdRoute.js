import React, { useState, useEffect } from 'react';
import {
    Text,
    View,
    StyleSheet,
    Modal,
    ActivityIndicator,
    Dimensions,
    TouchableOpacity, 
    Image
} from 'react-native';
import { Theme } from '../../utils/theme'

//redux
import { connect } from 'react-redux'
import {
    fetchHosos,
    selectHoso,
    deleteHoso,
} from '../../redux/hoso'
import {
    fetchBenhnhans,
    selectBenhnhan
} from '../../redux/dangkykham'


const ThirdRoute = (props) => {
    return(
        <View style = {styles.container}>
            <Image source={{uri: 'http://e0a8164be5cf.ngrok.io/api/downloadFile/8f81d8ea-d7c9-4374-9ecc-5aef43b747ed.jpg' }}  />
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'white',
        justifyContent:'center',
        alignItems:'center'
    },
    bar: {
        backgroundColor: Theme.colors.primary,
        height: 30,
        elevation: 0,
    },
    tab: {
        width: 'auto',
        padding: 0,
        marginLeft: 5,
        marginRight: 5,
        borderWidth: 0.1,
        borderColor: Theme.colors.secondary,
        borderRadius: 10
    },
    modalBox: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
    },
    modal: {
        height: 35,
        width: 200,
        padding: 10,
        backgroundColor: "#0183fd",
        borderRadius: 10,
        alignItems: "center",
        flexDirection: 'row',
        justifyContent: 'space-around',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    modalText: {
        color: 'white'
    },
});

const mapStateToProps = (state) => ({
    benhnhans: state.benhnhans.data,
    loading: state.benhnhans.loading || state.hoso.loading,
    hoso: state.hoso.data
})


export default connect(mapStateToProps)(ThirdRoute)