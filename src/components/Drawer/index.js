import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    FlatList,
    LayoutAnimation,
    Alert,
    ImageBackground,
    ScrollView,
} from 'react-native';
import DrawerLogo from "../../assets/Icon/DrawerLogo.svg";
import DrawerCross from "../../assets/Icon/DrawerCross.svg";
import { useNavigation, DrawerActions,useIsFocused } from "@react-navigation/native";
import styles from "./style";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Storage from "../../components/LocalStorage";
import CircleCross from "../../assets/Icon/CircleCross.svg";
import Download from "../../assets/Icon/download.svg";
import axios from "axios";
import Toast from "react-native-simple-toast";
import Loader from "../../components/Loader";
import Constants from "../../Redux/Constants";
import User from "../../assets/Icon/user.svg";
import Modal from "react-native-modal";
import moment from "moment";

const Drawer = () => {
    const navigation = useNavigation()
    const isFocus=useIsFocused()
    const [loader,setLoader]=useState(false)
    const [userName,setUserName]=useState('')
    const [visible,setVisible]=useState(false)
    const [user,setUser]=useState('')
    const [memberId,setMemberId]=useState('')
    const [MemberDob,setMemberDob]=useState('')
    const [MemberContact,setMemberContact]=useState('')
    const [data,setData]=useState('')
    const [showUpdateProfile,setShowUpdateProfile]=useState(false)



    const manageAbout=()=>{
        navigation.dispatch(DrawerActions.closeDrawer())
        navigation.navigate('About')
    }
    const manageEvents=()=>{
        navigation.dispatch(DrawerActions.closeDrawer())
        navigation.navigate('Events')
    }
    const managePartners=()=>{
        navigation.dispatch(DrawerActions.closeDrawer())
        navigation.navigate('OurPartner')
    } 
    const manageOrder=()=>{
        navigation.dispatch(DrawerActions.closeDrawer())
        navigation.navigate('OrderCopies')
       
    }
    const manageLegal=()=>{
        navigation.dispatch(DrawerActions.closeDrawer())
        navigation.navigate('LegalSupport')
    }
    const manageTeam=()=>{
        navigation.dispatch(DrawerActions.closeDrawer())
        navigation.navigate('OurTeam')
    }
    const manageAchievements=()=>{
        navigation.dispatch(DrawerActions.closeDrawer())
        Alert.alert('Comming soon.')
    }
    const manageMember=()=>{
        navigation.dispatch(DrawerActions.closeDrawer())
        Alert.alert('Comming soon.')
        // navigation.navigate('About')
    }
    const manageContact=()=>{
        navigation.dispatch(DrawerActions.closeDrawer())
        navigation.navigate('Contact')
    }
    const manageTerm=()=>{
        navigation.dispatch(DrawerActions.closeDrawer())
        navigation.navigate('Terms')
    }
    const manageQr=()=>{
        navigation.dispatch(DrawerActions.closeDrawer())
        navigation.navigate('MyQRCode')
    }
    const handleLogout=async()=>{
        const user_token=await AsyncStorage.getItem(Storage.user_token)
        let config = {
            method: 'post',
            url: `${Constants.MainUrl}user/logout`,
            headers: { 
              'Authorization': `${user_token}`,
            }
          };
          setLoader(true)
          axios.request(config)
          .then((response) => {
            if(response.data.code=='200'){
                AsyncStorage.setItem(Storage.user_token,'')
                AsyncStorage.setItem(Storage.username,'')
                AsyncStorage.setItem(Storage.user_id,'')
                // AsyncStorage.setItem(Storage.fcm_token,'')
                AsyncStorage.setItem(Storage.isPremium,'')
                AsyncStorage.setItem(Storage.qrcode,'')
                AsyncStorage.setItem(Storage.personalAddress,'')
                AsyncStorage.setItem(Storage.personalLocation,'')
                AsyncStorage.setItem(Storage.personalPincode,'')
                AsyncStorage.setItem(Storage.personalPhoneNumber,'')
                AsyncStorage.setItem(Storage.personalEmail,'')
                AsyncStorage.setItem(Storage.personalEmergencyNumber,'')
                AsyncStorage.setItem(Storage.personalDob,'')
                AsyncStorage.setItem(Storage.addMoreArray,'')
                AsyncStorage.setItem(Storage.businessName,'')
                AsyncStorage.setItem(Storage.businessGst,'')
                AsyncStorage.setItem(Storage.businessAddress,'')
                AsyncStorage.setItem(Storage.businessLocation,'')
                AsyncStorage.setItem(Storage.businessPhone,'')
                AsyncStorage.setItem(Storage.businessEmail,'')
                AsyncStorage.setItem("Member","")
                AsyncStorage.setItem("Member_id","")
                AsyncStorage.setItem("Member_dob","")
                AsyncStorage.setItem("Member_contact","")
                Toast.show(response.data.message)
                setLoader(false)
                navigation.replace('Login')
            }
            else{
                Toast.show(response.data.message)
                setLoader(false)
            }
          })
          .catch((error) => {
            setLoader(false)
          });
          
    }



    const handleDeleteUser=async()=>{
        const user_token=await AsyncStorage.getItem(Storage.user_token)
        let config = {
            method: 'post',
            url: `${Constants.MainUrl}user/delete/user`,
            headers: { 
              'Authorization': `${user_token}`,
            }
          };
          setLoader(true)
          axios.request(config)
          .then((response) => {
            if(response.data.code=='200'){
                AsyncStorage.setItem(Storage.user_token,'')
                AsyncStorage.setItem(Storage.username,'')
                AsyncStorage.setItem(Storage.user_id,'')
                // AsyncStorage.setItem(Storage.fcm_token,'')
                AsyncStorage.setItem(Storage.isPremium,'')
                AsyncStorage.setItem(Storage.qrcode,'')
                AsyncStorage.setItem(Storage.personalAddress,'')
                AsyncStorage.setItem(Storage.personalLocation,'')
                AsyncStorage.setItem(Storage.personalPincode,'')
                AsyncStorage.setItem(Storage.personalPhoneNumber,'')
                AsyncStorage.setItem(Storage.personalEmail,'')
                AsyncStorage.setItem(Storage.personalEmergencyNumber,'')
                AsyncStorage.setItem(Storage.personalDob,'')
                AsyncStorage.setItem(Storage.addMoreArray,'')
                AsyncStorage.setItem(Storage.businessName,'')
                AsyncStorage.setItem(Storage.businessGst,'')
                AsyncStorage.setItem(Storage.businessAddress,'')
                AsyncStorage.setItem(Storage.businessLocation,'')
                AsyncStorage.setItem(Storage.businessPhone,'')
                AsyncStorage.setItem(Storage.businessEmail,'')
                AsyncStorage.setItem("Member","")
                AsyncStorage.setItem("Member_id","")
                AsyncStorage.setItem("Member_dob","")
                AsyncStorage.setItem("Member_contact","")
                Toast.show(response.data.message)
                setLoader(false)
                navigation.replace('Login')
            }
            else{
                Toast.show(response.data.message)
                setLoader(false)
            }
          })
          .catch((error) => {
            setLoader(false)
          });
          
    }

    useEffect(()=>{
       manageSignIn()
    },[])

    const manageSignIn=async()=>{
      const userName=await AsyncStorage.getItem(Storage.username)
      const user=await AsyncStorage.getItem("Member")
      const memberId=await AsyncStorage.getItem("Member_id")
      const memberDob=await AsyncStorage.getItem("Member_dob")
      const memberContact=await AsyncStorage.getItem("Member_contact")
      setUser(user)
      setUserName(userName)
      setMemberId(memberId)
      setMemberDob(memberDob)
      setMemberContact(memberContact)
    }

    const manageViewId=()=>{
        navigation.dispatch(DrawerActions.closeDrawer())
        navigation.navigate('ViewId')
    }
    const manageProfile=()=>{
        navigation.dispatch(DrawerActions.closeDrawer())
        navigation.navigate('MyProfile')
    }
    const renderDate = (date) => {
        
        const d = new Date(date);
        var local = moment.utc(date).local().format('YYYY-MM-DD');
console.log(local,"this is local date");
           // Extract the day, month, and year
           const day = d.getUTCDate();           // getUTCDate() to get the day of the month (1-31)
           const month = d.getUTCMonth() + 1;    // getUTCMonth() returns month (0-11), so add 1
           const year = d.getUTCFullYear();      // getUTCFullYear() to get the four-digit year
        // let day = d.getDate();
        // let year = d.getFullYear()
        // if (day.length < 2)
        //   day = '0' + day;
        // const month = d.getMonth() + 1
        // console.log('this is day yesr mont',day,year,month);
        return (
          <Text numberOfLines={2} style={{ fontSize:14,color:'#000',fontFamily:'Montserrat-Medium' }}>{local}</Text>
        )
      }

    useEffect(() => {
        handleMember()
        // updateMemberdata()
    }, [isFocus])

    const handleMember=async()=>{
        const user_token = await AsyncStorage.getItem(Storage.user_token)
        let config = {
            method: 'get',
            url: `${Constants.MainUrl}user/check/my/status`,
            headers: {
                'Authorization': `${user_token}`
            }
        };
        setLoader(true)
        axios.request(config)
            .then((response) => {
                console.log('this is response from drawer',response.data);
                if (response.data.code == '200') {
                    setLoader(false)
                    setData(response.data)
                }
                else {  
                    setData(response.data)
                    setLoader(false)
                }
            })
            .catch((error) => {
                setLoader(false)
                console.log(error);
            });
    }
    const updateMemberdata = async () => {
        const user_token = await AsyncStorage.getItem(Storage.user_token)
        let config = {
            method: 'get',
            url: `${Constants.MainUrl}member/all/detail`,
            headers: {
                'Authorization': `${user_token}`
            }
        };
        setLoader(true)
        axios.request(config)
            .then((response) => {
                if (response.data.code == '200') {
                    setShowUpdateProfile(true)
                    const personalDetails=response?.data?.data?.memberDetail?.personalDetails
                    const dateString = personalDetails?.dob
                    const date = new Date(dateString);
                    
                    // Extract the day, month, and year
                    const day = date.getUTCDate();           // getUTCDate() to get the day of the month (1-31)
                    const month = date.getUTCMonth() + 1;    // getUTCMonth() returns month (0-11), so add 1
                    const year = date.getUTCFullYear();      // getUTCFullYear() to get the four-digit year
                     
                    var finalDate = [month , day, year].join('/');
                    var finalDate1=[year,month,day].join('-')
                    console.log('this is personal data',personalDetails);
                    console.log('this is day',finalDate);
                    var local = moment.utc(personalDetails?.dob).local().format('YYYY-MM-DD');

                    AsyncStorage.setItem(Storage.personalAddress,personalDetails?.addressLine1)
                    AsyncStorage.setItem(Storage.personalLocation,personalDetails?.city)
                    AsyncStorage.setItem(Storage.personalPincode,personalDetails?.zipcode)
                    AsyncStorage.setItem(Storage.personalPhoneNumber,personalDetails?.phone)
                    AsyncStorage.setItem(Storage.personalEmail,personalDetails?.email)
                    AsyncStorage.setItem(Storage.personalEmergencyNumber,personalDetails?.emergencyContact)
                    AsyncStorage.setItem(Storage.personalDob,local)
                    
                    AsyncStorage.setItem(Storage.addMoreArray,JSON.stringify(response?.data?.data?.memberDetail?.mem_asso))
                    
                    const businessDetails=response?.data?.data?.memberDetail?.businessDetails

                    AsyncStorage.setItem(Storage.businessName, businessDetails?.businessName)
                    AsyncStorage.setItem(Storage.businessGst, businessDetails?.gst)
                    AsyncStorage.setItem(Storage.businessAddress, businessDetails?.address)
                    AsyncStorage.setItem(Storage.businessLocation, businessDetails?.city)
                    AsyncStorage.setItem(Storage.businessPhone, businessDetails?.phone)
                    AsyncStorage.setItem(Storage.businessEmail, businessDetails?.email)

                    navigation.navigate('UpdateMemberDetails')
                    navigation.dispatch(DrawerActions.closeDrawer())
                    setLoader(false)
                }
                else {
                    setLoader(false)
                    setShowUpdateProfile(false)
                    Toast.show(response.data.message)
                    console.log('this is checking',response.data);
                }
            })
            .catch((error) => {
                setLoader(false)
                console.log(error);
            });
    }


    return (
        <View style={styles.container}>
            {loader?<Loader/>:null}
            <ScrollView  style={{marginBottom:50}}>
            <View style={styles.view}>
                <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                <DrawerLogo />
                
                </View>
                
                <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() => navigation.dispatch(DrawerActions.closeDrawer())}>
                    <DrawerCross />
                </TouchableOpacity>
            </View>
            <View style={{marginTop:20,paddingHorizontal:15,flexDirection:'row',alignItems:'center'}}>
                <User/>
                <TouchableOpacity
                 onPress={()=>manageProfile()}
                 style={{borderBottomWidth:1,marginLeft:6,borderColor:'#000'}}>
                <Text style={{fontSize:15,color:'#000',fontFamily:'Montserrat-SemiBold'}}>{userName}</Text>
                </TouchableOpacity>
            </View>
           
           <TouchableOpacity
            
             style={{marginLeft:15,marginTop:10,alignSelf:'flex-start',flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                <Image style={{height:18,width:18,tintColor:'#000'}} source={require('../../assets/Icon/edit1.png')}/>
                <TouchableOpacity
                 onPress={()=>
                    updateMemberdata()
                }
                 style={{borderBottomWidth:1,marginLeft:6,borderColor:'#000'}}>
                <Text style={{fontSize:15,color:'#000',fontFamily:'Montserrat-SemiBold',}}>Edit Profile</Text>
                </TouchableOpacity>
            </TouchableOpacity>
            {data?.data?.member_id!=0 && data?.data?.member_id!=null?<View style={{paddingLeft:15,marginTop:20}}>

              <View style={{flexDirection:'row',alignItems:'center'}}>
                <Text style={{fontSize:15,color:'#000',fontFamily:'Montserrat-SemiBold'}}>{`Member ID : `}</Text>
                <Text style={{fontSize:14,color:'#000',fontFamily:'Montserrat-Medium'}}>{`ZBW-${data?.data?.member_id}`}</Text>
                </View>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                <Text numberOfLines={2} style={{ fontSize:15,color:'#000',fontFamily:'Montserrat-SemiBold' }}>{`Date of Birth : `}</Text>
                {renderDate(data?.data?.dob)}
                </View>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                <Text style={{fontSize:15,color:'#000',fontFamily:'Montserrat-SemiBold'}}>{`Phone Number : `}</Text>    
                <Text style={{fontSize:14,color:'#000',fontFamily:'Montserrat-Medium'}}>{`${data?.data?.phoneNumber}`}</Text>    
                 </View>
                {/* <Text style={{fontSize:14,color:'#000',fontFamily:'Montserrat-Medium'}}>{`Member ID : ZBW-${data?.data?.member_id}`}</Text>
                {renderDate(data?.data?.dob)}
                <Text style={{fontSize:14,color:'#000',fontFamily:'Montserrat-Medium'}}>{`Phone Number : ${data?.data?.emergencyContactNumber}`}</Text>     */}
            
            </View>:null}
           
            <View style={styles.view1}>
            {data?.message=='Already a member'?<TouchableOpacity
                onPress={()=>manageViewId()}
                >
                <Text style={[styles.about,{marginBottom:20}]}>View ID Card</Text>
                </TouchableOpacity>:null}
                <TouchableOpacity
                onPress={()=>manageAbout()}
                >
                <Text style={styles.about}>About Us</Text>
                </TouchableOpacity>
                <TouchableOpacity
                onPress={()=>manageEvents()}
                >
                <Text style={styles.same}>Events</Text>
                </TouchableOpacity>
                <TouchableOpacity
                onPress={()=>managePartners()}
                >
                <Text style={styles.same}>Our Partners</Text>
                </TouchableOpacity>
                {data?.message=='Already a member'?<TouchableOpacity
                onPress={()=>manageOrder()}
                >
                <Text style={styles.same}>Order Copies</Text>
                </TouchableOpacity>:null}
                {data?.message=='Already a member'?<TouchableOpacity
                onPress={()=>manageLegal()}
                >
                <Text style={styles.same}>Legal Support</Text>
                </TouchableOpacity>:null}
                <TouchableOpacity
                onPress={()=>manageTeam()}
                >
                <Text style={styles.same}>Our Team</Text>
                </TouchableOpacity>
                <TouchableOpacity
                onPress={()=>manageAchievements()}
                >
                <Text style={styles.same}>Our Achievements</Text>
                </TouchableOpacity>
                <TouchableOpacity
                onPress={()=>manageMember()}
                >
                <Text style={styles.same}>WHY BECOME A MEMBER ?</Text>
                </TouchableOpacity>
                <TouchableOpacity
                onPress={()=>manageTerm()}
                >
                <Text style={styles.same}>Terms of Service</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                onPress={()=>manageContact()}
                >
                <Text style={styles.same}>Contact us</Text>
                </TouchableOpacity>
                <TouchableOpacity
                onPress={()=>{
                    // Alert.alert("Confirmation","Are you sure you want to sign out ") 
                    Alert.alert('Confirmation', 'Are you sure you want to sign out', [
                    {
                        text: 'Cancel',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                    },
                    {text: 'OK', onPress: () =>{
                       handleLogout()
                    }},
                    ]);
                }}
                >
                <Text style={styles.same}>Sign out</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                 onPress={()=>{
                    Alert.alert('Confirmation', 'Are you sure you want to Delete user?', [
                    {
                        text: 'Cancel',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                    },
                    {text: 'OK', onPress: () =>{
                        handleDeleteUser()
                    }},
                    ]);
                }}
                >
                <Text style={styles.same}>Delete user</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>manageQr()}>
                <Text style={styles.same}>My QR Code</Text>
                </TouchableOpacity>
            </View>
            </ScrollView>
            <View style={styles.bottom}>
                <Text style={styles.about}>Version 4.1.5</Text>
            </View>
            <Modal isVisible={visible}>
                <View style={{ backgroundColor: '#FDEDB1', 
                    height: 360, 
                    borderRadius: 16, 
                    // paddingLeft: 20, 
                    width: '94%', 
                    alignSelf: 'center' }}>
                         <View style={styles.row}>
                        <View/>
                        <View style={{flexDirection:'row'}}>
                        <TouchableOpacity
                            onPress={() => setVisible(false)}
                            style={[styles.touch,{marginRight:20}]}>
                            <Download/>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => setVisible(false)}
                            style={styles.touch}>
                            <CircleCross />
                        </TouchableOpacity>
                        </View>
                        
                    </View>
                        <View style={{alignItems:'center'}}>
                         <ImageBackground
                         style={{height:300,width:'98%'}}
                        source={require('../../assets/Icon/Background.png')}>

                        </ImageBackground>
                        </View>
                        </View>
                        </Modal>
                        {/* </ScrollView> */}
        </View>
    )
}

export default Drawer;