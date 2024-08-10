import react from "react";
import { View, Text, StyleSheet,ImageBackground } from "react-native";
import Header from "../../../components/CustomHeader";
import { useNavigation } from "@react-navigation/native";
import Metal from "../../../assets/LocalImage/Metal.svg";

const Market = () => {
  const navigation = useNavigation()
  return (
    <ImageBackground source={require('../../../assets/Logo/background.png')} style={styles.container}>
      <Header
        title={'Market'}
        onPress={() => navigation.goBack()}
        onPress2={()=>navigation.navigate('Notification')}
      />
      <View style={styles.main}>
        <View style={styles.row}>
          <View style={[styles.view, { backgroundColor: '#CDAA35' }]}>
            <Metal />
            <Text style={styles.title}>Gold</Text>
            <Text style={styles.doller}>$1887.51</Text>
          </View>
          <View style={[styles.view, { backgroundColor: '#808080' }]}>
            <Metal />
            <Text style={styles.title}>Silver</Text>
            <Text style={styles.doller}>$22.15</Text>
          </View>
          <View style={[styles.view, { backgroundColor: '#E5E4E2' }]}>
            <Metal />
            <Text style={styles.title1}>Platinum</Text>
            <Text style={styles.doller1}>$870.79</Text>
          </View>
        </View>
        <View style={styles.row1}>
          <Text style={{ width: '30%' }}></Text>
          <Text style={styles.heading}>Buy</Text>
          <Text style={styles.heading}>Sell</Text>
        </View>
        <View style={styles.row2}>
          <View style={styles.row3}>
            <View style={[styles.round, { backgroundColor: '#CDAA35' }]}></View>
            <Text style={styles.text}>Gold</Text>
          </View>
          <View style={styles.view1}>
            <Text style={styles.amount}>$1887.51</Text>
            <Text style={styles.amount1}>$1887.41</Text>
          </View>

          <View style={styles.view1}>
            <Text style={styles.amount}>$1887.51</Text>
            <Text style={styles.amount2}>$1887.55</Text>
          </View>
        </View>

        <View style={styles.row2}>
          <View style={styles.row3}>
            <View style={[styles.round, { backgroundColor: '#808080' }]}></View>
            <Text style={styles.text}>Silver</Text>
          </View>
          <View style={styles.view1}>
            <Text style={styles.amount}>$22.11</Text>
            <Text style={styles.amount1}>$22.15</Text>
          </View>

          <View style={styles.view1}>
            <Text style={styles.amount}>$22.12</Text>
            <Text style={styles.amount2}>$22.34</Text>
          </View>
        </View>


        <View style={styles.row2}>
          <View style={styles.row3}>
            <View style={[styles.round, { backgroundColor: '#E5E4E2' }]}></View>
            <Text style={styles.text}>Platinum</Text>
          </View>
          <View style={styles.view1}>
            <Text style={styles.amount}>$865.04</Text>
            <Text style={styles.amount1}>$865.01</Text>
          </View>

          <View style={styles.view1}>
            <Text style={styles.amount}>$865.35</Text>
            <Text style={styles.amount2}>$865.40</Text>
          </View>
        </View>


      </View>
    </ImageBackground>
  )
}
export default Market;
const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#FFFFFF' 
  },
  main: { 
    paddingHorizontal: 20, 
    marginTop: 30 
  },
  row: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center' 
  },
  view: { 
    width: '30%', 
    height: 100, 
    borderRadius: 10, 
    alignItems: 'center', 
    paddingVertical: 10 
  },
  title: { 
    fontFamily: 'Montserrat-SemiBold', 
    color: '#FFFFFF',
    fontSize: 14, 
    marginTop: 10 
  },
  title1: { 
    fontFamily: 'Montserrat-SemiBold',
    color: '#000000', 
    fontSize: 14, 
    marginTop: 10 
  },
  doller: { 
    color: '#FFFFFF', 
    fontSize: 12, 
    fontFamily: 'Montserrat-Medium', 
    marginTop: 15 
  },
  doller1: { 
    color: '#000000', 
    fontSize: 12, 
    fontFamily: 'Montserrat-Medium', 
    marginTop: 15 
  },
  row1: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    marginTop: 60 
  },
  heading: { 
    color: '#000000', 
    fontFamily: 'Montserrat-SemiBold', 
    fontSize: 14, 
    width: '30%', 
    textAlign: 'center' 
  },
  row2: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    marginTop: 20 
  },
  row3: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    width: '30%' 
  },
  round: { 
    height: 16, 
    width: 16, 
    borderRadius: 16 
  },
  text: { 
    marginLeft: 15, 
    fontFamily: 'Montserrat-SemiBold', 
    fontSize: 14, 
    color: '#000000' 
  },
  view1: { 
    alignItems: 'center', 
    width: '30%' 
  },
  amount: { 
    color: '#000000', 
    fontFamily: 'Montserrat-Medium', 
    fontSize: 14 
  },
  amount1: { 
    color: '#FF0A0A', 
    fontFamily: 'Montserrat-Regular', 
    fontSize: 10, 
    marginTop: 4 
  },
  amount2: { 
    color: '#05FF00', 
    fontFamily: 'Montserrat-Regular', 
    fontSize: 10, 
    marginTop: 4 
  }
})
