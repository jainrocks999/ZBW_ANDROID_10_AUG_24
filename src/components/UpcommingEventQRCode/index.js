import React from "react";
import { View,Text,StyleSheet,TouchableOpacity,FlatList,Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Image from "react-native-scalable-image";

const CurrentEvent=({data})=>{
   const navigation=useNavigation()
    const renderDate = (date) => {
        const d = new Date(date);
        let day = d.getDate();
        let year=d.getFullYear()
        if (day.length < 2)
            day = '0' + day;
        const month = d.toLocaleString('default', { month: 'short' });
        return (
            <Text numberOfLines={2} style={{color: '#000', fontFamily: 'Montserrat-Medium', fontSize: 13}}>{`${day} ${month}, ${year}`}</Text>
        )
    }
    return(
        <View style={{flex:1}}>
            <View style={{padding:20}}>
                <FlatList
                data={data}
                style={{marginBottom:0}}
                showsVerticalScrollIndicator={false}
                renderItem={({item})=>(
                    <TouchableOpacity
                    onPress={()=>navigation.navigate('QREventDetails',{
                        item
                    })}
                     style={{ width: '99%',
                    borderWidth: 1,
                    borderColor: '#FCDA64',
                    marginBottom: 20,
                    borderRadius: 10,
                    shadowColor: '#fff',
                    shadowOpacity: 0.26,
                    shadowOffset: { width: 0, height: 2 },
                    shadowRadius: 20,
                    elevation: 5,
                    backgroundColor: '#FFFFFF',
                    paddingHorizontal: 10,
                    paddingVertical: 12,
                    marginHorizontal:2
                    }}>
                        {item.events.images[0].image?<Image
                            width={Dimensions.get('window').width - 65}
                            source={{ uri: item.events.images[0].image }}>
                        </Image>:
                         <View style={{
                            width:Dimensions.get('window').width - 65,
                            height:105,
                            alignItems:'center',
                            justifyContent:'center'
                            }}>
                            <Text>Image not Found</Text>
                            </View>
                        }
                        <Text style={{ 
                            fontSize: 14, 
                            fontFamily: 'Montserrat-SemiBold', 
                            color: '#000000' ,
                            marginTop:5
                            }}>{item.events.name}</Text>
                            <View style={{flexDirection:'row',alignItems:'center',marginTop:6}}>
                            {renderDate(item.events.date)}
                            <Text style={{color: '#000', fontFamily: 'Montserrat-Medium', fontSize: 13,marginLeft:10}}>{item.events.time}</Text>
                            </View>

                    </TouchableOpacity>
    )}
                />
            </View>
        
        </View>
    )
}
export default CurrentEvent;