import { StyleSheet } from "react-native";

export default StyleSheet.create({
   container:{backgroundColor:'#FDE48B',flex:1},
   view:{paddingLeft:15,paddingTop:10,flexDirection:'row',justifyContent:'space-between',paddingRight:10},
   about:{fontSize:16,color:'#000000',fontFamily:'Montserrat-Medium'},
   same:{fontSize:16,color:'#000000',fontFamily:'Montserrat-Medium',marginTop:20},
   bottom:{bottom:15,left:0,right:0,position:'absolute',paddingLeft:20},
   view1:{paddingLeft:15,marginTop:30},
   row: { 
      flexDirection: 'row', 
      justifyContent: 'space-between', 
      alignItems: 'center' 
  },
  contact: { 
      fontSize: 16, 
      fontFamily: 'Montserrat-SemiBold', 
      color: '#000000', 
      marginTop: 20 
  },
  touch: { 
      marginRight: 5, 
      marginTop:5
  },
})