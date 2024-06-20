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
          {
            action: () => {
              console.log('Finished first two sequences');
            },
          },
          { text: 'One Two Three' },
          {
            text: 'One Two',
          },
          { text: 'One' },
        ]}
        onCharDeleted={({ character, currentText }) => {
          console.log('char deleted', { character, currentText });
        }}
        onCharTyped={({ character, currentText }) => {
          console.log('char typed', { character, currentText });
        }}
        loop
        style={styles.text}
      />
      <TypeAnimation
        sequence={[
          { text: 'One' },
          {
            text: 'One Two',
          },
          {
            action: () => {
              console.log('Finished first two sequences');
            },
          },
          { text: 'One Two Three' },
          {
            text: 'One Two',
          },
          { text: 'One' },
        ]}
        loop
        direction="back"
        style={styles.text}
        onCharDeleted={({ character, currentText }) => {
          console.log('char deleted', { character, currentText });
        }}
        onCharTyped={({ character, currentText }) => {
          console.log('char typed', { character, currentText });
        }}
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
