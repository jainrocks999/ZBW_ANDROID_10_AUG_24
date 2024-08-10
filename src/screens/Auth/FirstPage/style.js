import {Platform, StyleSheet} from 'react-native';

export default StyleSheet.create({
  main:{ 
    alignItems: 'center', 
    justifyContent: 'center', 
    marginTop: 52 
  },
  logo:{
    // height:315,
    // width:315
    height:315,
    width:315,
    resizeMode:'contain'
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
    marginTop:Platform.OS=='ios'?5:0
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
  }
});
