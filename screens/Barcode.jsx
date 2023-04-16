import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Linking } from "react-native"

const Barcode = ({data,backClick}) => {



    return (
        <View style={styles.container}>
            <Text style={{fontSize:25,color:'grey'}}>Scanned Bar Code : </Text>
            <Text style={{fontSize:20,padding:15}}>"{data}"</Text>
        <TouchableOpacity onPress={() => {Linking.openURL(data)}} style={styles.btnLink}>
            <Text style={{ fontSize: 20, color: 'white' }}>Copy Data</Text>
            </TouchableOpacity>
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
    btnLink: {
    width: '70%',
    height: '7%',
    marginTop: 60,
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
export default Barcode
