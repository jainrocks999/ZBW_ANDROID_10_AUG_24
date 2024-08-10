// import { StyleSheet } from 'react-native';

// export default StyleSheet.create({
//   view: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginTop: 80
//   },
//   lottie: {
//     height: 306,
//     width: 306
//   },
//   main: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginTop: 0,
//   },
//   yellow: {
//     height: 240,
//     width: '90%',
//     backgroundColor: '#FCDA64',
//     borderRadius: 40
//   },
//   backView: {
//     paddingHorizontal: 40,
//     paddingVertical: 15,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center'
//   },
//   back: {
//     fontFamily: 'Montserrat-Bold',
//     fontSize: 18,
//     color: '#000'
//   },
//   arrow: {
//     width: 42,
//     height: 38,
//     backgroundColor: '#000000',
//     borderTopLeftRadius: 80,
//     borderTopRightRadius: 40,
//     borderBottomLeftRadius: 80,
//     borderBottomRightRadius: 40,
//     alignItems: 'center',
//     justifyContent: 'center'
//   },
//   black: {
//     backgroundColor: '#000000',
//     width: '94%',
//     height: 223,
//     borderTopLeftRadius: 40,
//     borderTopRightRadius: 80,
//     borderBottomLeftRadius: 40,
//     borderBottomRightRadius: 80,
//   },
//   view1: {
//     paddingHorizontal: 40,
//     marginTop: 10
//   },
//   setup: {
//     color: '#FCDA64',
//     fontSize: 10,
//     fontFamily: 'Montserrat-Regular'
//   },
//   mpin: {
//     fontFamily: 'Montserrat-Bold',
//     color: '#fff',
//     fontSize: 18,
//     marginTop: 2
//   },
//   inputView: {
//     borderBottomWidth: 1,
//     borderColor: '#FFFFFF',
//     flexDirection: 'row',
//     alignItems: 'center',
//     width: '90%',
//     marginTop: 15,
//     height: 30
//   },
//   input: {
//     color: '#FFFFFF',
//     height: 35,
//     borderColor: '#fff',
//     marginTop: 4,
//     width: '90%',
//     fontSize: 12,
//     fontFamily: 'Montserrat-Regular'
//   },
//   buttonContainer: {
//     marginTop: 52,
//     alignItems: 'flex-end'
//   },
//   button: {
//     height: 65,
//     width: 130,
//     borderRadius: 20,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#FCDA64',
//     flexDirection: 'row',
//   },
//   verify: {
//     color: '#000000',
//     fontSize: 18,
//     fontFamily: 'Montserrat-Bold',
//     marginRight: 14
//   }
// });
import {Platform, StyleSheet} from 'react-native';

export default StyleSheet.create({
  main:{ 
    alignItems: 'center', 
    justifyContent: 'center', 
    marginTop: 60 
  },
  logo:{
    height:315,
    width:315
  },
  container:{ 
    alignItems: 'center', 
    justifyContent: 'flex-start', 
    marginTop: 0,
  },
  yellow:{ 
    height: 250, 
    width: '90%', 
    backgroundColor: '#FCDA64', 
    borderRadius: 40 
  },
  view:{
    paddingHorizontal: 40,
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  signup:{ 
    fontFamily: 'Montserrat-Bold', 
    fontSize: 18, 
    color: '#000' 
  },
  free:{ 
    fontFamily: 'Montserrat-Bold', 
    fontSize: 18, 
    color: '#fff' 
  },
  arrowContainer:{
    width: 42,
    height: 38,
    backgroundColor: '#000000',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 80,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 80,
    alignItems: 'center',
    justifyContent: 'center'
  },
  black:{
    backgroundColor: '#000000',
    width: '94%',
    height: 250,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 80,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 80,
  },
  already:{ 
    color: '#FCDA64', 
    fontSize: 10, 
    fontFamily: 'Montserrat-Regular' 
  },
  login:{ 
    fontFamily: 'Montserrat-Bold', 
    color: '#fff', 
    fontSize: 18, 
    marginTop: 2 
  },
  country:{
    borderBottomWidth: 1,
    borderColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    marginTop: 20,
    height: 30
  },
  ninety:{
    color: '#FFFFFF',
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
    marginTop:5
  },
  input:{
    color: '#FFFFFF',
    height: 35,
    borderColor: '#fff',
    marginTop: 4,
    width: '90%',
    marginLeft: 10,
    fontSize: 12,
    fontFamily: 'Montserrat-Regular'
  },
  inputContainer:{
    borderBottomWidth: 1,
    borderColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    marginTop: 15,
    height: 30
  },
  pass:{
    color: '#FFFFFF',
    height: 35,
    borderColor: '#fff',
    marginTop: 4,
    width: '90%',
    fontSize: 12,
    fontFamily: 'Montserrat-Regular'
  },
  forgot:{ 
    color: '#FCDA64', 
    fontSize: 10, 
    fontFamily: 'Montserrat-Regular' 
  },
  mpin:{ 
    color: '#FCDA64', 
    fontSize: 10, 
    fontFamily: 'Montserrat-Regular', 
    marginTop: 10 
  },
  button:{
    height: 65,
    width: 130,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FCDA64',
    flexDirection: 'row',
  },
  text:{ 
    color: '#000000', 
    fontSize: 18, 
    fontFamily: 'Montserrat-Bold',
    marginRight: 14 
  },
  error:
  {
      width:'90%',
      justifyContent:'center',
      alignItems:'flex-start',
      paddingHorizontal:8,
      marginTop:6
  },
  warn:
  {
      fontSize:12,
      color:'red'
  },
});
