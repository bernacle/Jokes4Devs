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
          <ActivityIndicator size="large" color="#ccba3f" />
        ) : (
          <View>
            <Text style={styles.text}>Shake for new Joke!</Text>
            <Card
              containerStyle={{ borderRadius: 10 }}
              style={styles.card}
              title={`${joke.type} jokes`.toUpperCase()}
              titleStyle={{ color: '#ccba3f' }}
            >
              <Text style={styles.setup}>{joke.setup.toUpperCase()}</Text>
              <Text style={styles.punchline}>
                {joke.punchline.toUpperCase()}
              </Text>
            </Card>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EE3253',
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
    marginTop: 15
  },
  card: {
    flex: 1
  },
  text: {
    textAlign: 'center',
    color: 'white'
  }
});
