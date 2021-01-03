import React, { useEffect, useState, useRef } from 'react'
import { Image, TouchableOpacity, View, Text, StyleSheet, ScrollView, Modal, FlatList, ActivityIndicator } from 'react-native'
import RBSheet from "react-native-raw-bottom-sheet";
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Theme } from '../../utils/theme'
import { chuyenLoaiQuanHe } from '../../services/xuly'
import { handleUploadPhoto } from '../../services/fetchPOST'

//redux
import { connect } from 'react-redux'
import { fetchBenhnhans, selectBenhnhan } from '../../redux/dangkykham'

const DangkykhamScreen = (props) => {
    const refRBSheet = useRef();

    useEffect(() => {
        props.fetchBenhnhans()
    }, []);

    const [image, setImage] = useState(null);

    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
                const { status2 } = await ImagePicker.requestCameraPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
                // if (status2 !== 'granted') {
                //     alert('Sorry, we need camera permissions to make this work!');
                // }
            }
        })();
    }, []);

    useEffect(() => {
        if (image) {
            handleUploadPhoto(image)
        }
    }, [image])

    const pickImageCR = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [3, 4],
            quality: 0.5,
            base64: false,
        });

        console.log(result);

        if (!result.cancelled) {
            setImage(result);
        }
    };

    const pickImageC = async () => {
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [3, 4],
            quality: 0.5,
            base64: false,
        });

        console.log(result);

        if (!result.cancelled) {
            setImage(result);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}> Bạn đang đặt lịch khám cho ai ?</Text>
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
            <RBSheet
                ref={refRBSheet}
                closeOnDragDown={true}
                closeOnPressMask={true}
                height={200}
                customStyles={{
                    wrapper: {
                        backgroundColor: 'rgba(0,0,0,0.4)'
                    },
                    container: {
                        backgroundColor: 'rgba(0,0,0,0.5)',
                    },
                    draggableIcon: {
                        backgroundColor: Theme.colors.primary
                    }
                }}
            >
                <>
                    <TouchableOpacity onPress={pickImageC} style={styles.rbsheetBox} >
                        <Text style={styles.rbsheetText}>Chụp ảnh với camera</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={pickImageCR} style={styles.rbsheetBox} >
                        <Text style={styles.rbsheetText}>Lấy ảnh từ thư viện máy</Text>
                    </TouchableOpacity>
                </>
            </RBSheet>
            <FlatList
                data={props.benhnhans}
                style={{ flexGrow: 0 }}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => {
                            props.selectBenhnhan(item)
                            props.navigation.navigate('ThongtindangkykhamScreen')
                        }}
                    >
                        <View style={styles.barBox} >
                            <View style={styles.imageBox}>
                                <Image source={require("../../../assets/imgs/user_icon.png")} style={styles.image} />
                            </View>

                            <View style={styles.contentBNBox}>
                                <Text style={{ fontWeight: "600", fontSize: 16 }} >{item.benhnhanphu.ten.toUpperCase()}</Text>
                                <Text style={{ fontSize: 10, color: "gray" }}>{chuyenLoaiQuanHe(item.loaiquanhe)}</Text>
                            </View>

                            <View style={styles.rightIconBox}>
                                <AntDesign name="right" size={15} color="gray" style={{ alignSelf: 'center' }} />
                            </View>
                        </View>
                    </TouchableOpacity>
                )}
            />
            <Text style={styles.headerText}> Đăng ký mới</Text>

            <TouchableOpacity
                onPress={() => refRBSheet.current.open()}
            >
                <View style={styles.barBox} >
                    <View style={styles.imageBox}>
                        <Image source={require("../../../assets/imgs/green_background_add_icon.png")} style={styles.image} />
                    </View>

                    <View style={styles.contentBNBox}>
                        <Text style={{ fontWeight: "600", fontSize: 16 }} >Người đã có giấy tờ tùy thân</Text>
                        <Text style={{ fontSize: 10, color: "gray" }}>(CMND, CCCD, Hộ chiếu)</Text>
                    </View>

                    <View style={styles.rightIconBox}>
                        <AntDesign name="right" size={15} color="gray" style={{ alignSelf: 'center' }} />
                    </View>
                </View>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => refRBSheet.current.open()}
            >
                <View style={styles.barBox} >
                    <View style={styles.imageBox}>
                        <Image source={require("../../../assets/imgs/green_background_add_icon.png")} style={styles.image} />
                    </View>

                    <View style={styles.contentBNBox}>
                        <Text style={{ fontWeight: "600", fontSize: 16 }} >Người có giấy tờ khác</Text>
                        <Text style={{ fontSize: 10, color: "gray" }}>(Giấy khai sinh, Bằng lái xe...)</Text>
                    </View>

                    <View style={styles.rightIconBox}>
                        <AntDesign name="right" size={15} color="gray" style={{ alignSelf: 'center' }} />
                    </View>
                </View>
            </TouchableOpacity>
            <Text style={styles.footerText} > Vui lòng chuẩn bị giấy tờ tùy thân và thẻ BHYT (nếu có) cho công việc{"\n"}đăng ký khám </Text>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10,
        paddingBottom: 10
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
    rbsheetBox: {
        flex: 1,
        backgroundColor: Theme.colors.secondary,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'stretch',
    },
    rbsheetText: {
        color: 'white',
        fontWeight: 'bold'
    },
    headerText: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 18,
        margin: 10
    },
    barBox: {
        flexDirection: "row",
        backgroundColor: "#fff",
        alignItems: "center",
        marginBottom: 5,
        height: 60
    },
    imageBox: {
        flex: 1,
        justifyContent: "center",
        marginLeft: 10,
        marginRight: 20,
    },
    image: {
        height: 50,
        width: 50
    },
    contentBNBox: {
        flex: 6,
        alignSelf: "stretch",
        justifyContent: "space-around"
    },
    rightIconBox: {
        flex: 1
    },
    footerText: {
        margin: 5,
        fontSize: 12,
        color: "gray"
    }
})

const mapStateToProps = state => ({
    benhnhans: state.benhnhans.data,
    loading: state.benhnhans.loading
})

const mapDispatchToProps = {
    fetchBenhnhans,
    selectBenhnhan,
}

export default connect(mapStateToProps, mapDispatchToProps)(DangkykhamScreen);