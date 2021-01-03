import React, { useState, useEffect } from 'react'
import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    Modal,
    Alert
} from 'react-native'
import { Picker } from '@react-native-community/picker';
import {
    ScrollView,
    TextInput,
    TouchableOpacity
} from 'react-native-gesture-handler'
import { connect } from "react-redux"
import { loaiKham } from '../../services/mockedData'
import { AntDesign } from '@expo/vector-icons';
import Svg, { Line } from 'react-native-svg'
import DateTimePicker from '@react-native-community/datetimepicker';
import { Theme } from '../../utils/theme'

import {
    fetchTinhs,
    fetchCosoytes,
    fetchKhoas,
    fetchBacsis,
    selectTinh,
    selectCosoyte,
    selectKhoa,
    selectBacsi,
    deleteTinh,
    deleteCosoyte,
    deleteKhoa,
    deleteBacsi,
    selectThoigiankham,
    selectLoaikham,
    selectNoidungkham,
} from "../../redux/dangkykham"


const ThongtindangkykhamScreen = (props) => {
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [textValue, setTextValue] = useState('');
    const [textLength, setTextLength] = useState(0);

    useEffect(() => {
        props.fetchTinhs()
    }, [])

    useEffect(() => {
        props.deleteCosoyte()
        props.deleteKhoa()
        props.deleteBacsi()
        if (props.tinhs.selected.id) {
            props.fetchCosoytes(props.tinhs.selected.id)
        }
    }, [props.tinhs.selected])


    useEffect(() => {
        props.deleteKhoa()
        props.deleteBacsi()
        if (props.cosoytes.selected.id) {
            props.fetchKhoas(props.cosoytes.selected.id)
        }
    }, [props.cosoytes.selected])

    useEffect(() => {
        props.deleteBacsi()
        if (props.khoas.selected.id) {
            props.fetchBacsis(props.khoas.selected.id)
        }
    }, [props.khoas.selected])


    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };

    const onPressDatLich = () => {
        if (props.tinhs.selected.id * props.cosoytes.selected.id * props.khoas.selected.id * props.bacsis.selected.id === 0) {
            //alert
            Alert.alert(
                "Cảnh báo",
                "Bạn cần chọn bác sĩ khám",
                [
                    { text: "OK" }
                ]
            )
        } else {
            props.selectThoigiankham(date)
            props.selectNoidungkham(textValue)
            props.navigation.navigate('KiemtrathongtinScreen')
        }
    }

    return (
        <View style={styles.container}>
            <ScrollView>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={props.loading}
                >
                    <View style={styles.modalBox}>
                        <View style={styles.modal}>
                            <Text style={styles.modalText}>đang thực hiện</Text>
                            <ActivityIndicator color='white' />
                        </View>
                    </View>
                </Modal>
                <Text style={styles.headerText}> Chọn cơ cở y tế</Text>
                <Text style={styles.labelText}> Tỉnh/thành phố <Text style={{ color: 'red' }} >*</Text></Text>
                <View style={styles.pickerBox}>
                    <Picker
                        mode="dropdown"
                        selectedValue={props.tinhs.selected.id}
                        style={styles.picker}
                        onValueChange={(itemValue, itemIndex) => {
                            props.selectTinh(props.tinhs.data[itemIndex])
                        }}
                    >
                        {props.tinhs.data.map((item) => (<Picker.Item key={item.id} label={item.ten} value={item.id} />))}
                    </Picker>
                </View>

                <Text style={styles.labelText}> Chọn Bệnh viện <Text style={{ color: 'red' }} >*</Text></Text>
                <View style={styles.pickerBox}>
                    <Picker
                        mode="dropdown"
                        selectedValue={props.cosoytes.selected.id}
                        style={styles.picker}
                        onValueChange={(itemValue, itemIndex) => {
                            props.selectCosoyte(props.cosoytes.data[itemIndex])
                        }}
                    >
                        {props.cosoytes.data.map((item) => (<Picker.Item key={item.id} label={item.ten} value={item.id} />))}
                    </Picker>
                </View>

                <Text style={styles.labelText}> Chọn Khoa khám bệnh <Text style={{ color: 'red' }} >*</Text></Text>
                <View style={styles.pickerBox}>
                    <Picker
                        mode="dropdown"
                        selectedValue={props.khoas.selected.id}
                        style={styles.picker}
                        onValueChange={(itemValue, itemIndex) => {
                            props.selectKhoa(props.khoas.data[itemIndex])
                        }}
                    >
                        {props.khoas.data.map((item) => (<Picker.Item key={item.id} label={item.ten} value={item.id} />))}
                    </Picker>
                </View>

                <Text style={styles.labelText}> Chọn bác sỹ <Text style={{ color: 'red' }} >*</Text></Text>
                <View style={styles.pickerBox}>
                    <Picker
                        mode="dropdown"
                        selectedValue={props.bacsis.selected.id}
                        style={styles.picker}
                        onValueChange={(itemValue, itemIndex) => {
                            props.selectBacsi(props.bacsis.data[itemIndex])
                        }}
                    >
                        {props.bacsis.data.map((item) => (<Picker.Item key={item.id} label={item.ten} value={item.id} />))}
                    </Picker>
                </View>

                <Text style={[styles.headerText, { marginTop: 30 }]}> Thông tin hẹn khám</Text>
                <Text style={styles.labelText}> Loại khám bệnh <Text style={{ color: 'red' }} >*</Text></Text>
                <View style={styles.pickerBox}>
                    <Picker
                        mode="dropdown"
                        selectedValue={props.loaikham.id}
                        style={styles.picker}
                        onValueChange={(itemValue, itemIndex) =>
                            props.selectLoaikham(loaiKham[itemIndex])
                        }
                    >
                        {loaiKham.map((item) => (<Picker.Item key={item.id} label={item.ten} value={item.id} />))}
                    </Picker>
                </View>
                {show && (
                    <DateTimePicker
                        style={{ color: Theme.colors.primary }}
                        testID="dateTimePicker"
                        value={date}
                        mode={mode}
                        is24Hour={true}
                        display="default"
                        onChange={onChange}
                    />
                )}

                <Text style={styles.labelText}> Ngày/giờ đăng ký <Text style={{ color: 'red' }} >*</Text></Text>
                <View style={styles.calendarBox}>
                    <Text> {date.getHours()} giờ {date.getMinutes()} phút - Ngày {date.getDate()} Tháng {date.getMonth() + 1} Năm {date.getFullYear()}</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity onPress={() => showTimepicker()}>
                            <AntDesign name="clockcircleo" size={24} color="#3bccbb" />
                        </TouchableOpacity>
                        <Svg height="25" width="20" >
                            <Line x1="10" y1="0" x2="10" y2="25" stroke="black" strokeWidth="1" />
                        </Svg>
                        <TouchableOpacity onPress={() => showDatepicker()}>
                            <AntDesign name="calendar" size={24} color="#3bccbb" />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={styles.labelText}> Nội dung khám</Text>
                    <Text style={styles.lengthText}> {textLength}/500</Text>
                </View>
                <View style={styles.inputBox}>
                    <TextInput
                        placeholder='Điền nội dung khám ( triệu chứng bệnh, yêu cầu khám ,...)'
                        underlineColorAndroid="transparent"
                        textAlignVertical='top'
                        multiline
                        numberOfLines={10}
                        onChangeText={text => {
                            setTextValue(text)
                            setTextLength(text.length)
                        }}
                        value={textValue}
                    />
                </View>

                <View style={styles.buttonBox}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={onPressDatLich}
                    >
                        <Text style={styles.buttonText}>
                            ĐẶT LỊCH
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: 'white',
        padding: 10
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
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',

    },
    labelText: {
        color: 'gray',
        marginTop: 15
    },
    picker: {
        marginTop: 15,
        height: 30,
        alignSelf: 'stretch',
        borderBottomWidth: 1,
        borderColor: 'gray'
    },
    pickerBox: {
        paddingBottom: 5,
        borderBottomWidth: 0.5,
        borderColor: 'gray'
    },
    calendarBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15,
        paddingBottom: 5,
        borderBottomWidth: 0.5,
        borderColor: 'gray'
    },
    inputBox: {
        marginTop: 20,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 5,
        padding: 10
    },
    lengthText: {
        alignSelf: 'flex-end',
        color: 'gray'
    },
    buttonBox: {
        alignSelf: 'stretch',
        marginTop: 50,
        marginBottom: 20
    },
    button: {
        backgroundColor: Theme.colors.primary,
        borderRadius: 10,
        borderColor: Theme.colors.primary,
        borderWidth: 0.5,
        alignItems: 'center',
        justifyContent: 'center',
        height: 50
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    }
})

const mapStateToProps = (state) => ({
    tinhs: state.tinhs,
    cosoytes: state.cosoytes,
    khoas: state.khoas,
    bacsis: state.bacsis,
    loading: state.tinhs.loading || state.cosoytes.loading || state.khoas.loading || state.bacsis.loading,
    noidungkham: state.noidungkham.selected,
    loaikham: state.loaikham.selected,
    thoigiankham: state.thoigiankham.selected
})

const mapDispatchToProps = {
    fetchTinhs,
    selectTinh,
    deleteTinh,
    fetchCosoytes,
    selectCosoyte,
    deleteCosoyte,
    fetchKhoas,
    selectKhoa,
    deleteKhoa,
    fetchBacsis,
    selectBacsi,
    deleteBacsi,
    selectThoigiankham,
    selectLoaikham,
    selectNoidungkham,
}

export default connect(mapStateToProps, mapDispatchToProps)(ThongtindangkykhamScreen)