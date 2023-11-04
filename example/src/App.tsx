import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { TypeAnimation } from 'react-native-type-animation';

export default function App() {
  return (
    <View style={styles.container}>
      <TypeAnimation
        sequence={[
          { text: 'One' },
          {
            text: 'One Two',
          },

          { text: 'One Two Three' },
          {
            text: 'One Two',
          },
          { text: 'One' },
        ]}
        loop
        style={styles.text}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
  },
  text: {
    color: 'white',
    backgroundColor: 'green',
    fontSize: 30,
  },
});
