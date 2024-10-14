import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Alert, StyleSheet } from 'react-native';
import { Camera, useCameraDevices } from 'react-native-vision-camera';

const Barcode = (props) => {
  const cameraRef = useRef(null); // Ref for camera
  const [cameraPermission, setCameraPermission] = useState(null); // State for camera permissions
  const devices = useCameraDevices(); // Get available camera devices
  const device = devices.back; // Choose back camera

  useEffect(() => {
    // Request camera permission when the component mounts
    (async () => {
      const status = await Camera.requestCameraPermission();
      setCameraPermission(status === 'authorized');
    })();
  }, []);

  // Function to handle barcode reading
  const onBarCodeRead = (barcode) => {
    if (!(props.stopReadingBarcodeValue)) {
      console.log(barcode);
      props.barcodeInput(barcode);
    }
  };

  // Function to handle taking a picture
  const takePicture = async () => {
    if (cameraRef.current) {
      const options = { quality: 0.5, base64: true };
      const data = await cameraRef.current.takePhoto(options);
      Alert.alert(data.uri);
    }
  };

  // Check if camera is ready
  if (device == null) return <Text>Loading...</Text>;
  if (cameraPermission === null) return <Text>Requesting camera permissions...</Text>;
  if (cameraPermission === false) return <Text>Camera permission denied.</Text>;

  return (
    <View style={styles.container}>
      <Camera
        ref={cameraRef}
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        torch={false} // or 'on' if you want flash mode
        onFrameProcessor={onBarCodeRead} // Frame processor used for barcode scanning
        frameProcessorFps={5} // Frame processor FPS
        audio={false} // Disable audio capturing
      />
      <View style={[styles.overlay, styles.topOverlay]}>
        <Text style={styles.scanScreenMessage}>Please scan the barcode.</Text>
      </View>
      <View style={[styles.overlay, styles.bottomOverlay]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  preview: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    padding: 16,
    right: 0,
    left: 0,
    alignItems: 'center',
  },
  topOverlay: {
    top: 0,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bottomOverlay: {
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanScreenMessage: {
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Barcode;
