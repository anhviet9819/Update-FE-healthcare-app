import React, { useState, useEffect } from 'react';
import {
    Text,
    View,
    StyleSheet,
    Modal,
    ActivityIndicator,
    Dimensions,
    TouchableOpacity
} from 'react-native';
import Timeline from "react-native-timeline-flatlist";
import { Theme } from '../../utils/theme'

//redux
import { connect } from 'react-redux'
import {
    fetchHosos2,
    selectHoso2,
    deleteHoso2,
} from '../../redux/hoso'
import {
    fetchBenhnhans,
    selectBenhnhan
} from '../../redux/dangkykham'

const dateStringHandler = (str) => new Date(str.slice(0, str.indexOf('+')).concat('Z'))

const dataHandler = (data) => {
    if (data) {
        data.sort((a, b) => (dateStringHandler(b.thoigiankham).getTime() - dateStringHandler(a.thoigiankham).getTime()))
        return data.map(item =>
            Object.create({
                time: `${dateStringHandler(item.thoigiankham).getHours()}:${dateStringHandler(item.thoigiankham).getMinutes()} \n${dateStringHandler(item.thoigiankham).getDate()}/${dateStringHandler(item.thoigiankham).getMonth()}/${dateStringHandler(item.thoigiankham).getFullYear()}`,
                title: `${item.benhnhan.ten}`,
                description: `${item.bacsi.trinhdo} ${item.bacsi.ten}\n${item.bacsi.khoa.cosoyte.ten}, ${item.bacsi.khoa.cosoyte.tinh.ten}\nChuyên khoa ${item.bacsi.khoa.ten}`,
            }))
    }
}

const SecondRoute = (props) => {
    const zeroDay = new Date(0)
    const currentDate = new Date(2021,1,1)
    const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0)
    let dataBenhnhans

    useEffect(() => {
        dataBenhnhans = props.benhnhans.slice()
        dataBenhnhans.forEach(item => props.fetchHosos2(zeroDay.toISOString(), currentDate.toISOString(), zeroDay.toISOString(), endOfMonth.toISOString(), true, item.benhnhanphu.id))
    }, [props.benhnhans])

    return (
        <View style={styles.container}>
            <Modal      
                animationType="fade"
                transparent={true}
                visible={props.loading}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                }}
            >
                <View style={styles.modalBox}>
                    <View style={styles.modal}>
                        <Text style={styles.modalText}> đang thực hiện</Text>
                        <ActivityIndicator color='white' />
                    </View>
                </View>
            </Modal>
            <Timeline
                style={styles.timeline}
                data={dataHandler(props.hoso)}
                innerCircle={'none'}
                circleSize={25}
                circleColor={Theme.colors.secondary}
                lineColor={Theme.colors.primary}
                timeContainerStyle={{ minWidth: 80, marginTop: 5 }}
                timeStyle={{
                    textAlign: 'center',
                    backgroundColor: Theme.colors.secondary,
                    color: 'white',
                    padding: 5,
                    borderRadius: 13,
                    fontWeight: 'bold'
                }}
                rowContainerStyle={{ color: "black" }}
                descriptionStyle={{
                    borderWidth: 0.5,
                    borderColor: "gray",
                    borderRadius: 5,
                    padding: 10
                }}
                options={{
                    style: { padding: 5 },
                }}
            />
        </View>
    );
}


const styles = StyleSheet.create({
    timeline: {
        flex: 1,
        backgroundColor:'white'
    },
    container: {
        flex: 1,
        borderColor: Theme.colors.secondary,
        borderTopWidth: 0.5,
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
    loading: state.benhnhans.loading || state.hoso2.loading,
    hoso: state.hoso2.data
})

const mapDispatchToProps = {
    fetchHosos2,
    selectHoso2,
    deleteHoso2,
    fetchBenhnhans,
    selectBenhnhan,
}

export default connect(mapStateToProps, mapDispatchToProps)(SecondRoute)