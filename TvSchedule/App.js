import React, { Component } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import Navigation from './source/Navigation/Navigation';
import Colors from './source/Utils/Colors';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSearch, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
library.add(faSearch, faArrowLeft)

export class App extends Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor={Colors.primary} barStyle="light-content" />
        <Navigation />
      </SafeAreaView>
    )
  }
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary
  }
})
