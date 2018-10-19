import React, { Component } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default class FBLoginButton extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return(
      <TouchableOpacity style={styles.button} onPress={this.props.FBlogIn} >
        <Text style={styles.buttonText}>Connect Facebook</Text>
      </TouchableOpacity>
    )  
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
  }
});