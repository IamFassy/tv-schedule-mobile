import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Navigation from './source/Navigation/Navigation';

export class App extends Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Navigation />
      </SafeAreaView>
    )
  }
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
