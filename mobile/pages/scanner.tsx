import {useEffect, useState} from "react";
import * as Permissions from "expo-permissions";
import {StyleSheet, Text, View} from "react-native";
import {BarCodeScanner} from "expo-barcode-scanner";
import {StatusBar} from "expo-status-bar";
import {styles} from "../styles";

const Scanner = () => {
    const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null)
    const [scanned, setScanned] = useState<boolean>(false)

    useEffect(() => {
        Permissions.askAsync(Permissions.CAMERA).then(res => {
            setHasCameraPermission(res.status === 'granted')
        })
    }, [])

    if (hasCameraPermission === null) {
        return (
            <View style={styles.container}>
                <Text>Requesting permission to use camera</Text>
            </View>
        )
    }
    if (!hasCameraPermission) {
        return (
            <View style={styles.container}>
                <Text>No access to camera</Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : ({type, data}) => {

                }}
                style = {StyleSheet.absoluteFillObject}
            />
            <StatusBar style="auto" />
        </View>
    );
}
export default Scanner