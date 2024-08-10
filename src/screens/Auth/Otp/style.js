import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  inputView: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    width: '70%',
    marginTop: 8,
  },
  otp: {
    fontSize: 12,
    color: '#FFFFFF',
    width: 26,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    borderColor: '#FFFFFF',
    borderBottomWidth: 1,
    height: Platform.OS == 'ios' ? 34 : 34,
  },
  view: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 70
  },
  lottie: {
    height: 306,
    width: 306
  },
  main: {
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  yellow: {
    height: 240,
    width: '90%',
    backgroundColor: '#FCDA64',
    borderRadius: 40
  },
  backView: {
    paddingHorizontal: 40,
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  back: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 18,
    color: '#000'
  },
  arrow: {
    width: 42,
    height: 38,
    backgroundColor: '#000000',
    borderTopLeftRadius: 80,
    borderTopRightRadius: 40,
    borderBottomLeftRadius: 80,
    borderBottomRightRadius: 40,
    alignItems: 'center',
    justifyContent: 'center'
  },
  view1: {
    backgroundColor: '#000000',
    width: '94%',
    height: 223,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 80,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 80,
  },
  view2: {
    paddingHorizontal: 40,
    marginTop: 10
  },
  verify1: {
    color: '#FCDA64',
    fontSize: 10,
    fontFamily: 'Montserrat-Regular'
  },
  otp1: {
    fontFamily: 'Montserrat-Bold',
    color: '#fff',
    fontSize: 18,
    marginTop: 2
  },
  resend: {
    color: '#FCDA64',
    fontSize: 10,
    fontFamily: 'Montserrat-Regular'
  },
  buttonContainer: {
    alignItems: 'flex-end'
  },
  button: {
    height: 65,
    width: 130,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FCDA64',
    flexDirection: 'row',
  },
  verify: {
    color: '#000000',
    fontSize: 18,
    fontFamily: 'Montserrat-Bold',
    marginRight: 14
  },
  input:{
    color:'#FFFFFF',
    height:35,
    borderColor:'#fff',
    marginTop:4,
    width:'90%',
    fontSize:12,
    fontFamily:'Montserrat-Regular'
  },
  border:{
    borderBottomWidth:1,
    borderColor:'#FFFFFF',
    flexDirection:'row',
    alignItems:'center',
    width:'90%',
    height:30
  },
});