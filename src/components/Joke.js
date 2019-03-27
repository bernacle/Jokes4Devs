import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  ActivityIndicator
} from 'react-native';

import { Card, ListItem, Button, Icon } from 'react-native-elements';
import RNShake from 'react-native-shake';
import * as API from '../utils/API';

export default class Joke extends Component {
  constructor(props) {
    super(props);
    this.state = {
      joke: null,
      isLoading: false
    };
  }

  componentWillMount() {
    this.setState({ isLoading: true });

    API.getJoke()
      .then(res => {
        this.setState({ joke: res, isLoading: false });
      })
      .catch(err => console.log(err));

    RNShake.addEventListener('ShakeEvent', () => {
      this.moreJokes();
    });
  }

  componentWillUnmount() {
    RNShake.removeEventListener('ShakeEvent');
  }

  moreJokes() {
    this.setState({ isLoading: true });

    API.getJoke()
      .then(res => {
        this.setState({ joke: res, isLoading: false });
      })
      .catch(err => console.log(err));
  }

  render() {
    const { joke, isLoading } = this.state;
    //let description = `${joke.type} jokes`.toUpperCase();

    return (
      <View style={styles.container}>
        {isLoading ? (
          <ActivityIndicator size="large" color="#EE3253" />
        ) : (
          <Card style={styles.card} title={`${joke.type} jokes`.toUpperCase()}>
            <Text style={styles.setup}>{joke.setup}</Text>
            <Text style={styles.punchline}>{joke.punchline}</Text>
          </Card>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center'
  },
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 50
  },
  setup: {
    color: 'black',
    fontWeight: 'bold'
  },
  punchline: {
    color: 'black',
    marginTop: 30
  },
  card: {
    flex: 1
  }
});

// secondary: {
//     ...COMMON,
//     backgroundColor: "#EE3253",
//     backgroundDarker: "#ccba3f",
//     textColor: "#FFE11D",
//     borderWidth: 1,
//     borderColor: "#FFE11D"
//   },
