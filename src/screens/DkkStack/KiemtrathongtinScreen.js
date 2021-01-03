import React, { useState, useEffect } from 'react'
import {
    TouchableOpacity,
    View,
    Text,
    StyleSheet,
    ScrollView,
    ActivityIndicator,
    Modal,
    Image,
    CheckBox
} from 'react-native'
import { CommonActions } from '@react-navigation/native';
import Svg, { Line } from 'react-native-svg'
import { chuyenGioiTinh, chuyenLoaiQuanHe } from '../../services/xuly'
import { AntDesign } from '@expo/vector-icons';

//theme
import { Theme } from '../../utils/theme'

//redux
import { connect } from "react-redux"
import {
    postDangkykham,
    resetDangkykham
} from "../../redux/dangkykham"


const Textsao = (props) => {
    return (
        <View style={props.style}>
            <Text>{props.children}<Text style={{ color: 'red' }} >*    </Text></Text>
        </View>
    )
}

const KhongCoThongTin = ({ children }) => {
    return ((children == null) ? <Text style={{ color: 'red' }}> Không có thông tin</Text> : <Text> {children} </Text>)
}

const resetAction = (screen, navigation) => {
    navigation.dispatch(
        CommonActions.reset({
            index: 0,
            routes: [
                { name: screen }
            ],
        })
    )
}



const KiemtrathongtinScreen = (props) => {
    const [checkbox, setCheckbox] = useState(false);
    const currentDate = new Date();

    return (
        <View style={styles.container}>
            <ScrollView>
                <View>
                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={props.dangkykham.loading}
                    >
                        <View style={styles.modalBox}>
                            <View style={styles.modal}>
                                <Text style={styles.modalText}>đang thực hiện</Text>
                                <ActivityIndicator color='white' />
                            </View>
                        </View>
                    </Modal>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={props.dangkykham.result}
                        onRequestClose={() => {
                            props.resetDangkykham()
                            resetAction('HomeScreen', props.navigation)
                        }}
                    >
                        <View style={styles.modalBox2}>
                            <View style={styles.modal2}>
                                <TouchableOpacity
                                    onPress={() => {
                                        props.resetDangkykham()
                                        resetAction('HomeScreen', props.navigation)
                                    }}
                                    style={styles.cancelButton}
                                >
                                    <AntDesign name="closesquareo" size={24} color="white" />
                                </TouchableOpacity>

                                <View style={{}}>
                                    <Image source={require('../../../assets/imgs/check.png')} style={styles.img} />
                                    <Text style={styles.modalText2}>
                                        Bệnh nhân
                                    <Text style={{ fontWeight: "bold" }} > {props.benhnhan.benhnhanphu.ten} </Text>
                                    đã đặt lịch khám bệnh thành công.
                                    </Text>
                                </View>
                                <TouchableOpacity
                                    onPress={() => {
                                        props.resetDangkykham()
                                        resetAction('HosoScreen', props.navigation)
                                    }}
                                    style={styles.navigateButton}
                                >
                                    <Text style={{ color: 'white', fontWeight: 'bold' }}>Kiểm tra lịch khám bệnh  </Text>
                                    <AntDesign name="doubleright" size={14} color="white" style={{ alignSelf: 'center' }} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>

                    <Text style={styles.headerText}>Vui lòng kiểm tra thông tin lịch khám</Text>
                    <View style={styles.inforBox}>
                        <Text style={{ fontWeight: "bold" }}>Thông tin cá nhân</Text>
                        <Svg height="35" width="500" >
                            <Line x1="10" y1="12" x2="300" y2="12" stroke="gray" strokeWidth="1" />
                        </Svg>
                    </View>

                    <View style={styles.inforBox}>
                        <Textsao >Họ và tên</Textsao>
                        <Text>{props.benhnhan.benhnhanphu.ten}</Text>
                    </View>
                    <View style={styles.inforBox}>
                        <View style={styles.inforBox}>
                            <Textsao >Ngày sinh</Textsao>
                            <Text >{props.benhnhan.benhnhanphu.ngaysinh}</Text>
                        </View>
                        <View style={styles.inforBox}>
                            <Textsao>Giới tính</Textsao>
                            <Text> {chuyenGioiTinh(props.benhnhan.benhnhanphu.gioitinh)}</Text>
                        </View>
                    </View>
                    <View style={styles.inforBox}>
                        <Textsao >Số CMND/Hộ chiếu</Textsao>
                        <Text>{props.benhnhan.benhnhanphu.cmnd}</Text>
                    </View>

                    <View style={styles.inforBox}>
                        <View style={{ flex: 1 }}>
                            <Text>Nơi cấp: <KhongCoThongTin>{props.benhnhan.benhnhanphu.noicap}</KhongCoThongTin></Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text>Ngày cấp: <KhongCoThongTin>{props.benhnhan.benhnhanphu.ngaycap}</KhongCoThongTin></Text>
                        </View>
                    </View>

                    <View style={styles.inforBox}>
                        <View style={{ flex: 2 }}>
                            <Text>Số thẻ BHYT:</Text>
                        </View>
                        <View style={{ flex: 3 }}>
                            <KhongCoThongTin>{props.benhnhan.benhnhanphu.bhyt}</KhongCoThongTin>
                        </View>
                    </View>

                    <View style={styles.inforBox}>
                        <View style={{ flex: 2 }}>
                            <Text>Mối quan hệ : </Text >
                        </View>
                        <View style={{ flex: 3 }}>
                            <Text> {chuyenLoaiQuanHe(props.benhnhan.loaiquanhe)} </Text>
                        </View>
                    </View>

                    <View style={styles.inforBox}>
                        <Text style={{ fontWeight: "bold" }}>Thông tin liên lạc</Text>
                        <Svg height="35" width="500" >
                            <Line x1="10" y1="12" x2="300" y2="12" stroke="gray" strokeWidth="1" />
                        </Svg>
                    </View>

                    <View style={styles.inforBox}>
                        <View style={{ flex: 2 }}>
                            <Text>Địa chỉ:</Text>
                        </View>
                        <View style={{ flex: 3 }}>
                            <KhongCoThongTin>{props.benhnhan.benhnhanphu.diachi}</KhongCoThongTin>
                        </View>
                    </View>

                    <View style={styles.inforBox}>
                        <View style={{ flex: 2 }}>
                            <Text>Số điện thoại liên hệ :</Text>
                        </View>
                        <View style={{ flex: 3 }}>
                            <KhongCoThongTin></KhongCoThongTin>
                        </View>
                    </View>

                    <View style={styles.inforBox}>
                        <Text style={{ fontWeight: "bold" }}>Thông tin bác sĩ(dự kiến) </Text>
                        <Svg height="35" width="500" >
                            <Line x1="10" y1="12" x2="300" y2="12" stroke="gray" strokeWidth="1" />
                        </Svg>
                    </View>

                    <View style={styles.inforBox}>
                        <View style={{ flex: 2 }}>
                            <Text>Tên bác sĩ </Text>
                        </View>
                        <View style={{ flex: 3 }}>
                            <KhongCoThongTin>{props.bacsis.selected.ten}</KhongCoThongTin>
                        </View>
                    </View>

                    <View style={styles.inforBox}>
                        <View style={{ flex: 2 }}>
                            <Text>Khoa khám bệnh  </Text>
                        </View>
                        <View style={{ flex: 3 }}>
                            <KhongCoThongTin>Khoa {props.khoas.selected.ten}</KhongCoThongTin>
                        </View>
                    </View>

                    <View style={styles.inforBox}>
                        <View style={{ flex: 2 }}>
                            <Text>Bệnh viện </Text>
                        </View>
                        <View style={{ flex: 3 }}>
                            <KhongCoThongTin>{props.cosoytes.selected.ten}, {props.tinhs.selected.ten}</KhongCoThongTin>
                        </View>
                    </View>

                    <View style={styles.inforBox}>
                        <View style={{ flex: 2 }}>
                            <Text>Chuyên môn </Text>
                        </View>
                        <View style={{ flex: 3 }}>
                            <KhongCoThongTin>{props.bacsis.selected.chuyenkhoa}</KhongCoThongTin>
                        </View>
                    </View>


                    <View style={styles.inforBox}>
                        <View style={{ flex: 2 }}>
                            <Text>Trình độ</Text>
                        </View>
                        <View style={{ flex: 3 }}>
                            <KhongCoThongTin>{props.bacsis.selected.trinhdo}</KhongCoThongTin>
                        </View>
                    </View>

                    <View style={styles.inforBox}>
                        <View style={{ flex: 2 }}>
                            <Text>Mô tả :</Text>
                        </View>
                        <View style={{ flex: 3 }}>
                            <KhongCoThongTin></KhongCoThongTin>
                        </View>
                    </View>

                    <View style={styles.inforBox}>
                        <Text style={{ fontWeight: "bold" }}>Thông tin lịch khám</Text>
                        <Svg height="35" width="500" >
                            <Line x1="10" y1="12" x2="300" y2="12" stroke="gray" strokeWidth="1" />
                        </Svg>
                    </View>

                    <View style={styles.inforBox}>
                        <View style={{ flex: 2 }}>
                            <Text>Thời gian đăng ký</Text>
                        </View>
                        <View style={{ flex: 3 }}>
                            <KhongCoThongTin>
                                {currentDate.getHours()}:{currentDate.getMinutes()}:{currentDate.getSeconds()}   {currentDate.getDate()}/{currentDate.getMonth() + 1}/{currentDate.getUTCFullYear()}
                            </KhongCoThongTin>
                        </View>
                    </View>

                    <View style={[styles.inforBox]}>
                        <View style={{ flex: 2 }}>
                            <Text>Ngày khám</Text>
                        </View>
                        <View style={{ flex: 3 }}>
                            <KhongCoThongTin>Ngày {props.thoigiankham.getDate()} Tháng {props.thoigiankham.getMonth() + 1} Năm {props.thoigiankham.getFullYear()}</KhongCoThongTin>
                        </View>
                    </View>

                    <View style={[styles.inforBox]}>
                        <View style={{ flex: 2 }}>
                            <Text>Giờ khám</Text>
                        </View>
                        <View style={{ flex: 3 }}>
                            <KhongCoThongTin>{props.thoigiankham.getHours()} giờ {props.thoigiankham.getMinutes()} phút</KhongCoThongTin>
                        </View>
                    </View>

                    <View style={styles.inforBox}>
                        <View style={{ flex: 2 }}>
                            <Text>Loại khám</Text>
                        </View>
                        <View style={{ flex: 3 }}>
                            <KhongCoThongTin>{props.loaikham.ten}</KhongCoThongTin>
                        </View>
                    </View>

                    <View style={styles.inforBox}>
                        <View style={{ flex: 2 }}>
                            <Text>Nội dung khám </Text>
                        </View>
                        <View style={{ flex: 3 }}>
                            <KhongCoThongTin>{props.noidungkham}</KhongCoThongTin>
                        </View>
                    </View>
                    <Svg height="20" width="500" >
                        <Line x1="0" y1="3" x2="1000" y2="3" stroke="gray" strokeWidth="1" />
                    </Svg>

                    <View style={{ marginBottom: 20 }} >
                        <Text
                            style={{ fontStyle: 'italic' }}
                        > *** Vui lòng kiểm tra kết nối internet để chất lượng buổi tư vấn không bị gián đoạn {'\n'}
                            Nếu có thay đổi lịch, thông báo sẽ gửi đến hộp thư của bạn. Vui lòng kiểm tra hộp thư thường xuyên</Text>
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <CheckBox
                            value={checkbox}
                            onValueChange={setCheckbox}
                        />
                        <Text > Xác nhận thông tin </Text>
                    </View>

                    <View style={styles.buttonBox}>
                        <TouchableOpacity
                            style={styles.button}
                            disabled={!checkbox}
                            onPress={() => {
                                props.postDangkykham(currentDate, props.thoigiankham, props.noidungkham, props.loaikham.id, props.benhnhan.benhnhanphu.id, props.bacsis.selected.id)
                            }}
                        >
                            <Text style={styles.buttonText}>
                                ĐẶT LỊCH
                                </Text>
                        </TouchableOpacity>
                    </View>
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
    cancelButton: {
        borderRadius: 10,
        alignSelf: 'flex-end',
        padding: 4,
    },
    modalBox2: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: 'rgba(0,0,0,0.8)',
        alignItems: "center",
    },
    modal2: {
        width: 300,
        padding: 10,
        backgroundColor: Theme.colors.secondary,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: 'space-around',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.5,
        shadowRadius: 3.84,
        elevation: 5,
    },
    modalText2: {
        margin: 10,
        color: 'white',
        alignSelf: 'center'
    },
    navigateButton: {
        flexDirection: 'row',
        backgroundColor: Theme.colors.primary,
        borderRadius: 10,
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 10,
        paddingRight: 10,
        margin: 10
    },
    img: {
        width: 130,
        height: 130,
        margin: 20,
        alignSelf: 'center'
    },
    headerText: {
        color: '#0183fd',
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 15
    },
    inforBox: {
        flex: 1,
        flexDirection: 'row',
        height: 35,
    },
    box: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    buttonBox: {
        alignSelf: 'stretch',
        marginTop: 40,
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
    benhnhan: state.benhnhans.selected,
    tinhs: state.tinhs,
    cosoytes: state.cosoytes,
    khoas: state.khoas,
    bacsis: state.bacsis,
    loading: state.dangkykham.loading,
    noidungkham: state.noidungkham.selected,
    loaikham: state.loaikham.selected,
    thoigiankham: state.thoigiankham.selected,
    dangkykham: state.dangkykham
})

const mapDispatchToProps = {
    postDangkykham,
    resetDangkykham
}


export default connect(mapStateToProps, mapDispatchToProps)(KiemtrathongtinScreen)