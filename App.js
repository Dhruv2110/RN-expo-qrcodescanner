import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, BackHandler, Vibration, Image  } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import BarcodeMask from 'react-native-barcode-mask';
// import SvgUri from 'react-native-svg-uri';

import QRcode from './screens/QRcode';
import Barcode from './screens/Barcode';

export default function App() {

  const [barCodeState, setBarCodeState] = useState({
    hasCameraPermissions: null,
    scanned: false,
    scannedData: '',
    buttonState: 'normal',
  })
  
  const [select,setSelect] = useState('')
  const [data,setData] = useState('')
  const [type,setType] = useState('')

  useEffect(() => {
    const backAction = () => {
      setBarCodeState({
        scanned: true,
        scannedData: data,
        buttonState: 'normal',
      });
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);


  const getCameraPermissions = async () => {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    console.log(status);
    setBarCodeState({
      hasCameraPermissions: status === 'granted',
      buttonState: 'clicked',
      scanned: false,
    });
  };

  const handleBarCodeScanned = async ({ type, data }) => {
    Vibration.vibrate(500, false);
    console.log("scanned", data);
    console.log("type",type)
    setData(data)
    setType(type)
    setBarCodeState({
      scanned: true,
      scannedData: data,
      buttonState: 'result',
    });
    // setSerialNo(data)
  };

  const goBack = () => {
    setBarCodeState({
      scanned: true,
      scannedData: data,
      buttonState: 'normal',
    });
  }

  if (barCodeState.hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (barCodeState.hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  if (barCodeState.buttonState === 'clicked' && barCodeState.hasCameraPermissions) {
    return (
      <>
        <StatusBar style="light" />
        <View style={{ flex: 1}}>
        <BarCodeScanner
          onBarCodeScanned={barCodeState.scanned ? undefined : handleBarCodeScanned}
          style={[StyleSheet.absoluteFillObject, styles.containerBarCode]}
        >
          <BarcodeMask edgeColor="#62B1F6" showAnimatedLine />
        </BarCodeScanner>
      </View>
      </>
    );
  }
  else if (barCodeState.buttonState === 'normal') {

    return (
      <View style={styles.homeContainer}>

        <View style={styles.heading}>
          <Text style={{fontSize:30,color:'blue',fontWeight:'bold'}}>QR And Barcode Scanner</Text>
        </View>
        <TouchableOpacity onPress={() => {setSelect('qr'); getCameraPermissions()}} style={{...styles.btnScan,marginTop:70,paddingTop:10}}>
          {/* <SvgUri
            width="110"
            height="130"
            source={require('./assets/qrcode.svg')}
          /> */}
          <Image
            source={require('./assets/qrcode.png')}
            style={{ width: 130, height: 130 }}
          />
          <Text style={{ fontSize: 18, color: 'grey',fontWeight:'bold' }}>Scan QR Code</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { setSelect('bar'); getCameraPermissions() }} style={styles.btnScan}>
          {/* <SvgUri
            width="130"
            height="130"
            source={require('./assets/barcode.svg')}
          /> */}
          <Image
            source={require('./assets/barcode.png')}
            style={{ width: 140, height: 140 }}
          />
          <Text style={{ fontSize: 18, color: 'grey', fontWeight: 'bold' }}>Scan Barcode</Text>
        </TouchableOpacity>
        <View style={{height:10}}>

        </View>
      </View>
    );
  }
  else if (barCodeState.buttonState === 'result') {

    return (

      <View style={styles.container}>
        {type == 256 ? 
          <QRcode data={data} backClick={goBack}/>
          : type == 512 ? 
            <Barcode data={data} backClick={goBack} />
          : <ScanAgain />
       }
        
      </View>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d9d9d9',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  homeContainer: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  heading:{
    width: '95%', 
    height: '10%', 
    alignItems: 'center',
    justifyContent:'center', 
    borderRadius: 10, 
    elevation: 10, 
    backgroundColor: '#fff'
  },
  containerBarCode: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnScan: {
    width: 170,
    height: 180,
    // margin: 50,
    // borderWidth: 1,
    // padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'space-around',
    // borderColor: 'black',
    elevation:7,
    backgroundColor:'white'
  },
});



const ScanAgain = () => {
  return (
    <View style={styles2.container}>
      <Text style={{fontSize:20}}>Scan Again</Text>
    </View>
  )
}

const styles2 = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

