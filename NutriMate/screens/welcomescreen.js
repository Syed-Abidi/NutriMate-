// basic imports
import { View, StyleSheet, Text, Image, TouchableOpacity,SafeAreaView } from 'react-native';
import React, { useLayoutEffect } from 'react';

//navigation
import { useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// Create the tab navigator
const Tab = createBottomTabNavigator();

export default function WelcomeScreen() {
  const navigator = useNavigation();
  useLayoutEffect(() => {
    navigator.setOptions({ headerShown: false });
  }, [navigator]);

  return (
    <SafeAreaView style={style.container}>
      <Text style={style.WelcomeHeaderTxt}>Welcome to NutriMate</Text>
      <Text style={{ textAlign: 'center', fontSize: 16 }}>
        Your friend that makes<Text style={style.themespan}> nutrition </Text>easy!
      </Text>
      <View style={style.imgwrapper}>
        <Image
          style={style.wsimg}
          source={require('../assets/WS_PersonEating.png')}
        />
      </View>
      <TouchableOpacity
        style={style.startbutton}
        onPress={() => navigator.navigate('register')}>
        <Text style={{ color: '#fafcfe' }}>Start</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  container: {
    backgroundColor: '#fafcfe',
    flex: 1,
  },
  WelcomeHeaderTxt: {
    color: '#3eb07e',
    textAlign: 'center',
    paddingTop: 30,
    fontWeight: 'bold',
    fontSize: 18,
  },
  wsimg: {
    width: 300,
    height: 300,
  },
  imgwrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    top: '10%',
  },
  themespan: {
    color: '#3eb07e',
    fontWeight: 'bold',
  },
  startbutton: {
    borderRadius: 100,
    width: 80,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3eb07e',
    alignSelf: 'center',
    top: '15%',
  },
});
