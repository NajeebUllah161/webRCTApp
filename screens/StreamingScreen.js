import React, { useState } from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';
import {
    RTCPeerConnection,
    RTCIceCandidate,
    RTCSessionDescription,
    RTCView,
    MediaStream,
    MediaStreamTrack,
    mediaDevices,
    registerGlobals
} from 'react-native-webrtc';

export default function StreamingScreen() {

    const [localStream, setLocalStream] = useState({ toURL: () => null });

    const goLive = () => {
        // alert('alert message');
        let isFront = true;
        mediaDevices.enumerateDevices().then(sourceInfos => {
            console.log("sourceInfo: ", sourceInfos);
            let videoSourceId;
            for (let i = 0; i < sourceInfos.length; i++) {
                const sourceInfo = sourceInfos[i];
                if (sourceInfo.kind == "videoinput" && sourceInfo.facing == (isFront ? "front" : "environment")) {
                    videoSourceId = sourceInfo.deviceId;
                }
            }
            mediaDevices.getUserMedia({
                audio: true,
                video: {
                    width: 640,
                    height: 480,
                    frameRate: 30,
                    facingMode: (isFront ? "user" : "environment"),
                    deviceId: videoSourceId
                }
            })
                .then(stream => {
                    // Got stream!
                    console.log("Stream is : ", stream);
                    setLocalStream(stream);
                })
                .catch(error => {
                    // Log error
                    console.log('error is : ', error);
                });
        });
    }

    return (
        <View style={styles.root}>
            <View style={styles.inputField}>
                <Button title={'Go Live'} onPress={() => goLive()} />
            </View>
            <View style={styles.videoContainer}>
                <View style={[styles.videos, styles.localVideos]}>
                    <Text>Your Video</Text>
                    <RTCView streamURL={localStream.toURL()} style={styles.localVideo} />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    inputField: {
        marginBottom: 10,
        flexDirection: 'column',
    },
    root: {
        backgroundColor: '#fff',
        flex: 1,
        padding: 20,
    },
    videoContainer: {
        flex: 1,
        minHeight: 450,
    },
    videos: {
        width: '100%',
        flex: 1,
        position: 'relative',
        overflow: 'hidden',

        borderRadius: 6,
    },
    localVideos: {
        height: 100,
        marginBottom: 10,
    },
    localVideo: {
        backgroundColor: '#f2f2f2',
        height: '100%',
        width: '100%',
    },
}); 
