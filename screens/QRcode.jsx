import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Linking,Clipboard } from "react-native"
// import Clipboard from 'expo-clipboard';

const QRcode = ({data,backClick}) => {

    const isLink = data.toString().startsWith('http')
    console.log(isLink)

    const copy = () => {
      console.log(typeof data)
      Clipboard.setString(data.toString())
    }


    return (
        <View style={styles.container}>
            <Text style={{fontSize:25,color:'grey'}}>Scanned QR Code : </Text>
            <Text style={{fontSize:20,padding:15}}>"{data}"</Text>
            {isLink && 
            <TouchableOpacity onPress={() => {Linking.openURL(data)}} style={{...styles.btnLink,marginBottom:20}}>
            <Text style={{ fontSize: 20, color: 'white' }}>Open Link</Text>
            </TouchableOpacity>
            }

            <TouchableOpacity onPress={copy} style={styles.btnLink}>
            <Text style={{ fontSize: 20, color: 'white' }}>Copy Data</Text>
            </TouchableOpacity>
        {/* </View> */}
         <TouchableOpacity onPress={backClick} style={styles.btnScan}>
          <Text style={{ fontSize: 20, color: 'black' }}>Start Again</Text>
        </TouchableOpacity>
        </View>
        
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnContainer: {
    // flex: 1,
    flexDirection:'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
    btnLink: {
    width: '70%',
    height: '7%',
    // marginTop: 60,
    // borderWidth: 1,
    // padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'space-around',
    borderColor: 'black',
    elevation:7,
    backgroundColor:'#00b300'
  },
    btnScan: {
    width: '70%',
    height: '7%',
    marginTop: 40,
    // borderWidth: 1,
    // padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'space-around',
    borderColor: 'black',
    elevation:7,
    backgroundColor:'#66ff66'
  },
})

export default QRcode
