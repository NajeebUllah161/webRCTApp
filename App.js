import React from 'react';
import { View, StyleSheet, Button, Text } from 'react-native';
import StreamingScreen from './screens/StreamingScreen';

export default function App() {
  return (
    <View style={styles.container}>
      <StreamingScreen />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'grey',
  }
});