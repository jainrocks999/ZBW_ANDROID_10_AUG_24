import {StyleSheet} from 'react-native';
export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems:'center',
    justifyContent:'center'
  },
  view: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
  },
  modal: {
    width: 300,

    borderRadius: 10,
    padding: 10,
    justifyContent: 'center',
    flexDirection: 'column',
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  ModelBtntext: {
    color: '#000',
    fontSize: 15,
    alignSelf: 'center',
    fontFamily: 'Montserrat-Bold',
    fontWeight: 'bold',
    //padding: 16,
    textAlign: 'center',
  },
  popup: {
    height: 40,
    marginTop: 10,
    backgroundColor:'#FCDA64',
    justifyContent: 'center',
    borderRadius: 4,
    alignItems: 'center',
    alignSelf: 'center',
    paddingHorizontal:10
  },
});
