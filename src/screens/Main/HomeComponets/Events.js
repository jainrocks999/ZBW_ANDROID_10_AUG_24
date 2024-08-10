import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Arrow from "../../../assets/Icon/BlackArrow.svg";
import Computer from "../../../assets/Icon/computer.svg";
import { useNavigation } from "@react-navigation/native";
import Current from "../../../components/Current";
import Upcomming from "../../../components/Upcomming";
import Past from "../../../components/Past";
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import LottieView from 'lottie-react-native';

const renderScene = SceneMap({
    first: Current,
    second: Upcomming,
    third: Past
});


const Events = () => {

    const navigation = useNavigation()
    const [index, setIndex] = useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'Current ' },
        { key: 'second', title: 'Upcoming ' },
        { key: 'third', title: 'Past ' },
    ]);


    return (
        <View style={styles.container}>
            <View style={styles.main}>
                <View style={styles.view}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        activeOpacity={0.5}
                        style={styles.arrow}>
                        <Arrow />
                    </TouchableOpacity>
                    <Text style={styles.events}>Events</Text>
                    <View style={{ width: 46 }} />
                </View>
                <View style={styles.flex}>
                    <View style={{ marginTop: -20 }}>
                        <View style={{ height: 140 }}>
                            <LottieView style={styles.lottie}
                                source={require('../../../assets/Json/Event Animation.json')}
                                autoPlay loop />
                        </View>
                    </View>
                </View>
            </View>
            <View style={styles.flat}>
                <View style={{ flex: 1 }}>
                    <TabView
                        navigationState={{ index, routes }}
                        renderScene={renderScene}
                        onIndexChange={setIndex}
                        initialLayout={{ width: '100%', }}
                        renderTabBar={props => <TabBar
                            indicatorStyle={{
                                height: 0,

                            }}
                            renderLabel={({ route, color, focused }) => focused ? (
                                <View style={styles.row}>
                                    <View style={styles.view1} />
                                    <Text style={styles.focus}>
                                        {route.title}
                                    </Text>
                                </View>
                            ) : (
                                <Text style={styles.unFocus}>
                                    {route.title}
                                </Text>
                            )}
                            {...props}
                            style={styles.align} />}
                        sceneContainerStyle={{ backgroundColor: '#fff' }}
                    />
                </View>
            </View>
        </View>
    )
}
export default Events;
const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        backgroundColor: '#FFFFFF' 
    },
    main: { 
        width: '100%', 
        height: 215, 
        backgroundColor: '#FCDA64' 
    },
    view: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        paddingTop: 5 
    },
    arrow: {
        width: 50,
        alignItems: 'center',
        height: 40,
        justifyContent: 'center'
    },
    events: { 
        fontFamily: 'Montserrat-Bold', 
        fontSize: 16, 
        color: '#000000' 
    },
    flex: { 
        alignItems: 'center', 
        justifyContent: 'center' 
    },
    lottie: { 
        height: 140, 
        width: 140 
    },
    flat: { 
        backgroundColor: '#FFFFFF', 
        flex: 1, 
        marginTop: -60, 
        borderTopLeftRadius: 50, 
        borderTopRightRadius: 50 
    },
    row: { 
        flexDirection: 'row', 
        alignItems: 'center' 
    },
    view1: { 
        height: 15, 
        width: 14, 
        backgroundColor: '#FCDA64', 
        borderTopLeftRadius: 20, 
        borderBottomLeftRadius: 20, 
        marginTop: 1 
    },
    focus: {
        color: '#000000', 
        fontFamily: 'Montserrat-SemiBold', 
        marginLeft: -10, 
        fontSize: 14
    },
    unFocus: {
        color: 'grey', 
        fontFamily: 'Montserrat-Medium', 
        fontSize: 14
    },
    align: {
        backgroundColor: '#FFFFFF',
        marginVertical: 4,
        marginTop: 10,
        marginHorizontal: 5,
        elevation: 0,
        borderRadius: 60
    }
})
