<p align="center">
  <img src="src/assets/example.gif" alt="example" height="100"/>
</p>
<h3 align="center">
  React Native Type Animation
</h3>
<p align="center">
React Native Type Animation is a component library that allows you to create engaging typewriter-style text animations in your React Native applications.
<p>
<p align="center">
  <a href="https://www.npmjs.com/package/react-native-type-animation">
    <img alt="npm version" src="https://badge.fury.io/js/react-native-type-animation.svg"/>
  </a>
  <a title='License' href="https://github.com/benjamineruvieru/react-native-type-animation/blob/master/LICENSE" height="18">
    <img src='https://img.shields.io/badge/license-MIT-blue.svg' />
  </a>
  <a title='Tweet' href="https://twitter.com/intent/tweet?text=Check%20out%20this%20awesome%20React%20Native%20type%20animation%20package%20with%20simple%20trigonometry&url=https://github.com/benjamineruvieru/react-native-type-animation&via=benjamin_eru&hashtags=react,reactnative,opensource,github,ux" height="18">
    <img src='https://img.shields.io/twitter/url/http/shields.io.svg?style=social' />
  </a>
</p>

## Installation

```sh
npm install react-native-type-animation
```

Or, if you prefer yarn:

```sh
yarn add react-native-type-animation
```

## Documentation

The docs can be found here: [https://docs.benjamineruvieru.com/docs/react-native-type-animation/](https://docs.benjamineruvieru.com/docs/react-native-type-animation/)

## Usage

```js
import { TypeAnimation } from 'react-native-type-animation';

const MyComponent = () => {
  return (
    <TypeAnimation
      sequence={[
        { text: 'One' },
        { text: 'One Two' },
        {
          action: () => {
            console.log('Finished first two sequences');
          },
        },
        { text: 'One Two Three' },
        { text: 'One Two' },
        { text: 'One' },
      ]}
      loop
      style={{
        color: 'white',
        backgroundColor: 'green',
        fontSize: 30,
      }}
    />
  );
};

export default MyComponent;
```

## Props

The following props allows you to configure the properties for the type animation component. It allows you to define an animation sequence, control the speed and behavior of the animation, and customize the appearance of the cursor.

| Prop                   | Required | Type      | Default | Description                                                                                                                    |
| ---------------------- | -------- | --------- | ------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `blinkSpeed`           | no       | Number    | 500     | The speed at which the cursor blinks (in milliseconds).                                                                        |
| `cursor`               | no       | Boolean   | true    | Whether to display the cursor.                                                                                                 |
| `cursorStyle`          | no       | TextStyle |         | Additional styles for the cursor.                                                                                              |
| `delayBetweenSequence` | no       | Number    | 100     | Delay between animation sequences (in milliseconds).                                                                           |
| `direction`            | no       | String    | front   | Specifies the direction in which to perform the typing/deleting animation. It accepts two possible values: 'front' and 'back'. |
| `initialDelay`         | no       | Number    | 0       | The delay before the animation begins (in milliseconds).                                                                       |
| `loop`                 | no       | Boolean   | false   | Whether to loop the typing animation indefinitely.                                                                             |
| `onCharTyped`          | no       | Function  |         | Callback function triggered when a character is typed.                                                                         |
| `onCharDeleted`        | no       | Function  |         | Callback function triggered when a character is deleted.                                                                       |
| `preRenderText`        | no       | String    | None    | Specifies the initial text to display.                                                                                         |
| `repeat`               | no       | Number    | 1       | The number of times to repeat the sequence.                                                                                    |
| `sequence`             | yes      | Array     |         | An array of objects defining the text to be typed and animation options.                                                       |
| `splitter`             | no       | Function  |         | A function to split text into individual characters or chunks for typing.                                                      |
| `style`                | no       | TextStyle |         | Additional styles for the typewriter animation container.                                                                      |
| `typeSpeed`            | no       | Number    | 100     | The speed at which characters are typed.                                                                                       |
| `deletionSpeed`        | no       | Number    | 100     | The speed at which characters are deleted.                                                                                     |

#### `sequence` Array

The `sequence` prop is an array of objects, where each object defines a part of the animation sequence. It can contain the following properties:

- `action`: A function to execute as part of the sequence. This can be used as a callback to perform actions during the animation.

- `text`: The text to display or type in the sequence.

- `delayBetweenSequence`: The delay between the current sequence (in milliseconds) and the next. The default is 100, but you can specify a custom value for individual sequences.

- `deleteCount`: The number of characters to delete before typing (backspacing).

- `deletionSpeed`: The speed at which characters are deleted from this sequence (backspace speed, in milliseconds). The default is 100, but you can specify a custom value for individual sequences.

- `typeSpeed`: The speed at which characters are typed in this sequence(typing speed, in milliseconds). The default is 100, but you can specify a custom value for individual sequences.

#### `direction` String

The `direction` prop specifies the direction in which to perform the typing/deleting animation. It accepts two possible values: 'front' and 'back'.

#### `splitter` Function

The `splitter` prop is a function that can be used to split text into individual characters or chunks for typing. This allows you to control how the text is broken down during the animation.

#### `repeat` Number

The `repeat` prop determines how many times the entire animation sequence should be repeated. The default is 1, meaning the sequence is played once.

#### `loop` Boolean

The `loop` prop, when set to `true`, causes the typing animation to loop indefinitely. If set to `false` (the default), the animation will play only once.

#### `blinkSpeed` Number

The `blinkSpeed` prop controls the speed at which the cursor blinks. The default is 500 milliseconds, but you can adjust this value as needed.

#### `style` TextStyle

The `style` prop allows you to provide additional styles for the typewriter animation container. You can customize the appearance of the entire animation component using this prop.

#### `cursorStyle` TextStyle

The `cursorStyle` prop is used to apply additional styles to the cursor element. This lets you customize the appearance of the cursor, such as its color and size.

#### `cursor` Boolean

The `cursor` prop determines whether the cursor is displayed during the animation. By default, it is set to `true`, but you can set it to `false` if you don't want to display the cursor.

#### `onCharTyped` Callback

This callback function is triggered each time a character is typed. It receives an object as an argument containing two properties:

- character: The character that was just typed.
- currentText: The current state of the text after the character has been typed.

#### `onCharDeleted` Callback

This callback function is triggered each time a character is deleted. It receives an object as an argument containing two properties:

- character: The character that was just deleted.
- currentText: The current state of the text after the character has been deleted.

**Note:** When using the `sequence` prop, you can define complex typing animations with different text, delays, and actions. Each object in the `sequence` array represents a step in the animation.

Example usage of `TypeAnimationProps`:

```javascript
const animationProps = {
  sequence: [
    { text: 'Hello, ', typeSpeed: 100 },
    { text: 'World!', typeSpeed: 150, delayBetweenSequence: 500 },
  ],
  delayBetweenSequence: 200,
  repeat: 2,
  blinkSpeed: 400,
  cursorStyle: { color: 'red' },
};
```

```javascript
const animationProps = {
  sequence: [
    { text: 'Hello World!', typeSpeed: 100 },
    { text: 'Hola World!', typeSpeed: 150, delayBetweenSequence: 500 },
  ],
  delayBetweenSequence: 200,
  loop: true,
  blinkSpeed: 400,
  cursorStyle: { color: 'red' },
  direction: 'back',
};
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---
