import React, { Component } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { Permissions, Notifications } from 'expo';
import FBLoginButton from './src/FBLoginButton';
import HomePage from './src/HomePage';

const PUSH_ENDPOINT = 'http://localhost:3000/push-token'

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: null,
      loggedIn: false
    }
    this.FBlogIn = this.FBlogIn.bind(this);
    this.registerForPushNotificationsAsync = this.registerForPushNotificationsAsync.bind(this);
  }

  async registerForPushNotificationsAsync() {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
  
    // Stop here if the user did not grant permissions
    if (finalStatus !== 'granted') {
      return;
    }
  
    // Get the token that uniquely identifies this device
    let token = await Notifications.getExpoPushTokenAsync();
  
    // POST the token to your backend server from where you can retrieve it to send push notifications.
    return fetch(PUSH_ENDPOINT, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: {
          value: token,
        },
        user: {
          id: this.state.userInfo.id,
          name: this.state.userInfo.name,
          email: this.state.userInfo.email
        },
      }),
    });
  }
  async FBlogIn() {
    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync('1029836687195082', {
        permissions: ['public_profile'],
      });
    if (type === 'success') {
      // Get the user's name using Facebook's Graph API
      const response = await fetch(
        `https://graph.facebook.com/me?access_token=${token}&fields=id,name,email`);
        const userInfo = await response.json();
        this.setState({ userInfo, loggedIn: true }, () => {
          this.registerForPushNotificationsAsync();
        });
    }
  }
  render() {
    const {loggedIn} = this.state;
    return (
      <View style={styles.container}>
        { loggedIn ? <HomePage /> :<FBLoginButton FBlogIn={this.FBlogIn} /> }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3498db',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
