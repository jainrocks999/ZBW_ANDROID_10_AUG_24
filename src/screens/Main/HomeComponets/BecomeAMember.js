import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity, ScrollView,ImageBackground } from "react-native";
import Header from "../../../components/CustomHeader";
import { useNavigation } from "@react-navigation/native";
import BusinessDetail from "../../../components/BusinessDetail";
import Documentation from "../../../components/Documentation";
import PersonalDetail from "../../../components/PersonalDetail";
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';

const BecomeaMember = () => {
    const navigation = useNavigation()
    const [selectedId, setSelectedId] = useState(1)

    const onSwipeLeft = (gestureState) => {
        if (selectedId == 3) {
            setSelectedId(3)
        }
        else if (selectedId == 2) {
            setSelectedId(selectedId + 1)
            flatList.current.scrollToEnd();
        }
        else {
            setSelectedId(selectedId + 1)
        }
    }

    const onSwipeRight = (gestureState) => {
        if (selectedId == 1) {
            setSelectedId(1)
        }
        else if (selectedId == 2) {
            setSelectedId(selectedId - 1)
            flatList.current.scrollToOffset({ animated: true, offset: 0 });
        }
        else {
            setSelectedId(selectedId - 1)
        }
    }
    const config = {
        velocityThreshold: 0.3,
        directionalOffsetThreshold: 80,
        detectSwipeUp: false,
        detectSwipeDown: false,
    };
    const flatList = React.useRef(null)
    const managePress = (item) => {
        if (item.id == 1) {
            setSelectedId(item.id)
            flatList.current.scrollToOffset({ animated: true, offset: 0 });
        }
        else if (item.id == 3) {
            setSelectedId(item.id)
            flatList.current.scrollToEnd();
        }
        else {
            setSelectedId(item.id)
        }
    }
    return (
        <ImageBackground source={require('../../../assets/Logo/background.png')} style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
            <Header
                title={"Become a Member"}
                onPress={() => navigation.goBack()}
                onPress2={()=>navigation.navigate('Notification')}
            />
            <View style={{ flex: 1 }}>
                <View>
                    <FlatList
                        ref={flatList}
                        data={data}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                onPress={() => managePress(item)}
                                style={{ marginHorizontal: 20, paddingVertical: 10, }}>
                                {selectedId == item.id ?
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <View style={{ height: 15, width: 14, backgroundColor: '#FCDA64', borderTopLeftRadius: 20, borderBottomLeftRadius: 20, marginTop: 1 }} />
                                        <Text style={[{
                                            color: selectedId == item.id ? '#000000' : 'grey', fontFamily: selectedId == item.id ? 'Montserrat-SemiBold' : 'Montserrat-Medium', marginLeft: -10, fontSize: 14
                                        }]}>
                                            {item.title}
                                        </Text>
                                    </View> :
                                    <Text style={{
                                        fontSize: 14,
                                        fontFamily: selectedId == item.id ? 'Montserrat-SemiBold' : 'Montserrat-Medium',
                                        color: 'grey'
                                    }}>{item.title}</Text>
                                }
                            </TouchableOpacity>
                        )}
                    />
                </View>
                <ScrollView style={{flexGrow:1}}>
                <GestureRecognizer
                    onSwipeLeft={(state) => onSwipeLeft(state)}
                    onSwipeRight={(state) => onSwipeRight(state)}
                    config={config}
                    style={{
                        flex: 1,
                    }}>
                    <View style={{ flex: 1 }}>
                        {selectedId == 1 ? <PersonalDetail /> : null}
                        {selectedId == 2 ? <BusinessDetail onPress={() => onSwipeRight()} /> : null}
                        {selectedId == 3 ? <Documentation onPress={() => setSelectedId(selectedId - 1)} /> : null}
                    </View>
                </GestureRecognizer>
                </ScrollView>
            </View>
        </ImageBackground>
    )
}
export default BecomeaMember;
const data = [{ title: 'Personal Details', id: 1, }, { title: 'Business Details', id: 2, }, { title: 'Documentation', id: 3 }]