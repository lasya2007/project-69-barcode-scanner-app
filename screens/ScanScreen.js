import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text, Image } from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default class ScanScreen extends React.Component{
    constructor(){
        super();
        this.state={
            hasCameraPermissions: null,
            scanned: false,
            scannedData:'',
            buttonState:'normal'
        };
    }
    getCameraPermissions=async ()=>{
        const {status} = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({
            hasCameraPermissions: status==='granted',
            buttonState:'clicked'
        }) 
    }
    handleBarCodeScanner= async ({type,data})=>{
        this.setState({
            scanned:true,
            scannedData:data,
            buttonState:'normal'
        })
    }
    render(){
        if(this.state.buttonState==='normal'){
            return(
                <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                    <Image style={styles.image} source={require('../assets/barcodeScannerImg.jpg')}></Image>
                    <TouchableOpacity
                    onPress={this.getCameraPermissions}
                    style={styles.scanButton}>
                        <Text style={styles.buttonText}>Scan BarCode</Text>
                    </TouchableOpacity>
                    <Text>{this.state.scannedData}</Text>
                </View>
            )
        }
        else if(this.state.buttonState==='clicked'&&this.state.hasCameraPermissions){
            return(
                <View>
                    <BarCodeScanner onBarCodeScanned={this.state.scanned?undefined:this.handleBarCodeScanner}/>
                </View>
                
            )
        }
    }
}

const styles=StyleSheet.create({
    scanButton:{
        backgroundColor:'blue',
        height:35,
        width:150,
        alignItems:'center',
        justifyContent:'center',
        marginTop:20
    },
    buttonText:{
        color:'yellow',
        fontSize:20,
        fontWeight:'bold'
    },
    image:{
        width:150,
        height:150,
    }
})