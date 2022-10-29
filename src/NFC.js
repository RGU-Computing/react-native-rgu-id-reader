import React, { Component } from 'react';
import { View, Text, Alert } from 'react-native';
import NfcManager, {NfcTech} from 'react-native-nfc-manager';

// class NFC extends Component {
// export default class NFC {

    export const stopReadingNFC = async() => {
        try{
            NfcManager.cancelTechnologyRequest();
        }
        catch (ex) {
            console.warn('Oops!', ex);
        }
    }

    export const isNFCSupported = async() => {
        try{
            return NfcManager.isSupported();
        }
        catch (ex) {
            return false;
        }
    }

    export const isNFCEnabled = async() => {
        try{
            return NfcManager.isEnabled();
        }
        catch (ex) {
            return false;
        }
    }

   export const readNFC = async() => {
        try {
            // Pre-step, call this before any NFC operations
            NfcManager.start();
            // register for the NFC tag with NDEF in it
            await NfcManager.requestTechnology(NfcTech.Ndef);
            // the resolved tag object will contain `ndefMessage` property
            const tag = await NfcManager.getTag();
            console.warn('Tag found', tag);
            // stop the nfc scanning
            NfcManager.cancelTechnologyRequest();
            return tag.id;//{"SCAN_STATUS":"SUCCESS","NFC_ID":tag.id};
            //Alert.alert(tag.id)
        } catch (ex) {
            console.warn('Oops!', ex);
            // stop the nfc scanning
            NfcManager.cancelTechnologyRequest();
            return ex;//{"SCAN_STATUS":"ERROR","ERROR":ex};
        } 
    }
// }

// const styles = {
//   container: {
//     flex: 1
//   },
// };

// export default NFC;
