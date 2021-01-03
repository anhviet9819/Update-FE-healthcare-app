import React, { useState, useEffect } from 'react';
import {
    Text,
    View,
    StyleSheet,
    Dimensions,
    TouchableOpacity
} from 'react-native';
import FirstRoute from './FirstRoute'
import SecondRoute from './SecondRoute'
import ThirdRoute from './ThirdRoute'
import { TabBar, TabView, SceneMap } from 'react-native-tab-view';
import Timeline from "react-native-timeline-flatlist";
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


const initialLayout = { width: Dimensions.get('window').width };

const HosoScreen = (props) => {
    const [index, setIndex] = useState(0);

    const [routes] = useState([
        { key: 'first', title: 'Lịch hẹn khám' },
        { key: 'second', title: 'Các lần khám trước' },
        { key: 'third', title: 'Hồ sơ cá nhân' },
    ]);

    const renderScene = SceneMap({
        first: FirstRoute,
        second: SecondRoute,
        third: ThirdRoute,
    });


    return (
        <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            renderTabBar={props =>
                <TabBar {...props}
                    renderLabel={({ route, focused, color }) => {
                        let color1;
                        let color2;
                        color1 = focused ? 'white' : Theme.colors.secondary;
                        color2 = focused ? 'black' : 'white'
                        return (
                            <View style={{ flex: 1, backgroundColor: color1, borderRadius: 10, borderColor: Theme.colors.secondary, borderWidth: 0.5 }}>
                                <Text style={{ backgroundColor: "transparent", color: color2, margin: 8, fontSize: 12 }}>
                                    {route.title}
                                </Text>
                            </View>
                        )
                    }}
                    pressColor='white'
                    indicatorStyle={{ backgroundColor: 'white', width: 0, height: 0, elevation: 0, }}
                    contentContainerStyle={{ justifyContent: 'center', }}
                    tabStyle={styles.tab}
                    style={styles.bar} />}
            onIndexChange={setIndex}
            initialLayout={[initialLayout]}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: "white",
    },
    list: {
        flex: 1,
    },
    scene: {
        flex: 1,
        backgroundColor: '#fff',
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
    }
});

const mapStateToProps = (state) => ({
    benhnhans: state.benhnhans.data,
    tinhs: state.tinhs,
    cosoytes: state.cosoytes,
    khoas: state.khoas,
    bacsis: state.bacsis,
    loading: state.benhnhans.loading || state.hoso.loading,
    noidungkham: state.noidungkham.selected,
    loaikham: state.loaikham.selected,
    thoigiankham: state.thoigiankham.selected,
    hoso: state.hoso.data
})

const mapDispatchToProps = {
    fetchHosos,
    selectHoso,
    deleteHoso,
    fetchBenhnhans,
    selectBenhnhan,
}

export default connect(mapStateToProps, mapDispatchToProps)(HosoScreen)