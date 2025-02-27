import React, { useEffect } from "react";
import { WebView } from "react-native-webview";
import { StyleSheet, SafeAreaView, PermissionsAndroid } from "react-native";

export default function App() {
    useEffect(() => {
        async function getPermissions() {
            PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA, {
                title: "CAMERA Access Permission",
                message: "We would like to use your CAMERA",
                buttonPositive: "Okay",
            });
            PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
                {
                    title: "RECORD_AUDIO Access Permission",
                    message: "We would like to use your RECORD_AUDIO",
                    buttonPositive: "Okay",
                }
            );
            PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
                {
                    title: "Location Access Permission",
                    message: "We would like to use your location",
                    buttonPositive: "Okay",
                }
            );
            PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: "Location Access Permission",
                    message: "We would like to use your location",
                    buttonPositive: "Okay",
                }
            );
        }

        getPermissions();
    }, []);

    return (
        <SafeAreaView style={styles.safeArea}>
            <WebView
                style={styles.container}
                geolocationEnabled={true}
                source={{ uri: "https://humanplus.netlify.app/" }}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    safeArea: {
        flex: 1,
        marginTop: 0,
    },
});
