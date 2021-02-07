import React, { Component } from 'react';
import { ActivityIndicator, SafeAreaView, StatusBar } from 'react-native';
import Colors from './Colors';

export default class Loading extends Component {
  shouldComponentUpdate() {
    return false;
  }
  render() {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <StatusBar
          backgroundColor={Colors.primary}
          animated={true}
          barStyle="light-content"
        />
        <ActivityIndicator
          hidesWhenStopped={true}
          size="large"
          color={Colors.highlight}
        />
      </SafeAreaView>
    );
  }
}
