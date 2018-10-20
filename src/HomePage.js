import React, { Component } from 'react';
import { Notifications } from 'expo';
import { View, Text, TouchableOpacity,StyleSheet } from 'react-native';

export default class HomePage extends Component {
  constructor(props){
    super(props);
    this.state = {
      notification: {},
    };
  }

  componentDidMount() {
    this.props.registerForPushNotificationsAsync();

    // Handle notifications that are received or selected while the app
    // is open. If the app was closed and then opened by tapping the
    // notification (rather than just tapping the app icon to open it),
    // this function will fire on the next tick after the app starts
    // with the notification data.
    this._notificationSubscription = Notifications.addListener(this._handleNotification);
  }

  _handleNotification = (notification) => {
    this.setState({notification: notification});
  };

  render(){
    return(
      <View>
        <Text style={styles.buttonText}>Welcome to Noteefy app</Text>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text>Origin: {this.state.notification.origin}</Text>
          <Text>Data: {JSON.stringify(this.state.notification.data)}</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={this.closeApp}>
          <Text style={styles.buttonText}>Close App</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding:10
  },
  button: {
    width: 320,
    paddingVertical: 20,
    backgroundColor: 'rgba(41, 128, 185, 1.0)',
    marginBottom: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.51,
    shadowRadius: 13.16,
    elevation: 10
  },
  buttonText: {
    color: 'rgba(255,255,255, 0.9)',
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  titleText: {
    color: 'rgba(255,255,255, 0.9)',
    alignSelf: 'center',
    fontWeight: 'bold',
    padding:20
  }
});