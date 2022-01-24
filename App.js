/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler'
import React, { useRef, useState } from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity,
  Image
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { RNCamera } from 'react-native-camera';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';


const cameraScreen = ({navigation, route}) =>{
 
  let cameraRef = useRef(null) ; 
  const [camType, setCam] = useState(RNCamera.Constants.Type.back)
  const [flash,setFlash] = useState(RNCamera.Constants.FlashMode.off)
  
  const takePicture = async () => {
    if (cameraRef) {
      const options = { quality: 0.5, base64: true };
      const data = await cameraRef.current.takePictureAsync(options);
      console.log(data.uri);
      navigation.navigate("Home", {uri:data.uri}) 
    }
  };

  const flipCamera = () =>{
    if(camType === RNCamera.Constants.Type.back ){
        setCam(RNCamera.Constants.Type.front)
    }else{
        setCam(RNCamera.Constants.Type.back) 
    }
  }

  const toggleFlash = () =>{
    // let tstate = this.state.torchon;
    if(flash === RNCamera.Constants.FlashMode.off){
        setFlash(RNCamera.Constants.FlashMode.on)
    }else{
        setFlash(RNCamera.Constants.FlashMode.off)
    }
  }

  return(
    <View style={styles.container}>
        <RNCamera
          ref={cameraRef}
          style={styles.preview}
          type={camType}
          flashMode={flash}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
         
        >
        <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
          <TouchableOpacity onPress={()=> toggleFlash()} style={styles.capture}>
            <Text style={{ fontSize: 14 }}> FLASH </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> takePicture()} style={styles.capture}>
            <Text style={{ fontSize: 14 }}> SNAP </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> flipCamera()} style={styles.capture}>
            <Text style={{ fontSize: 14 }}> TYPE </Text>
          </TouchableOpacity>
        </View>
        </RNCamera>
      </View>
  )
}

function HomeScreen ({route}) { 
  return(
    <View>
      <Image style={{width:120, height:120 }} 
          source={{uri:route.params.uri}}
      />
    </View>
  )
}

const Stack = createStackNavigator();

function App() {
  return (

    <NavigationContainer>
    <Stack.Navigator initialRouteName="Camera">
      <Stack.Screen name="Home" component={HomeScreen} /> 
      <Stack.Screen name="Camera" component={cameraScreen} /> 
    </Stack.Navigator>
    </NavigationContainer> 
   );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});



export default App;
