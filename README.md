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
yarn add react-native-typewriter-animation
```

## Documentation

The docs can be found here: [https://docs.benjamineruvieru.com/react-native-type-animation](https://docs.benjamineruvieru.com/react-native-type-animation)

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

| Prop                   | Required | Type      | Default | Description                                                               |
| ---------------------- | -------- | --------- | ------- | ------------------------------------------------------------------------- |
| `sequence`             | yes      | Array     |         | An array of objects defining the text to be typed and animation options.  |
| `delayBetweenSequence` | no       | Number    | 100     | Delay between animation sequences (in milliseconds).                      |
| `splitter`             | no       | Function  |         | A function to split text into individual characters or chunks for typing. |
| `repeat`               | no       | Number    | 1       | The number of times to repeat the sequence.                               |
| `loop`                 | no       | Boolean   | false   | Whether to loop the typing animation indefinitely.                        |
| `blinkSpeed`           | no       | Number    | 500     | The speed at which the cursor blinks (in milliseconds).                   |
| `style`                | no       | TextStyle |         | Additional styles for the typewriter animation container.                 |
| `cursorStyle`          | no       | TextStyle |         | Additional styles for the cursor.                                         |
| `cursor`               | no       | Boolean   | true    | Whether to display the cursor.                                            |

#### `sequence` Array

The `sequence` prop is an array of objects, where each object defines a part of the animation sequence. It can contain the following properties:

- `action`: A function to execute as part of the sequence. This can be used as a callback to perform actions during the animation.

- `text`: The text to display or type in the sequence.

- `delayBetweenSequence`: The delay between the current sequence (in milliseconds) and the next. The default is 100, but you can specify a custom value for individual sequences.

- `deleteCount`: The number of characters to delete before typing (backspacing).

- `deletionSpeed`: The speed at which characters are deleted (backspace speed, in milliseconds). The default is 100, but you can specify a custom value for individual sequences.

- `typeSpeed`: The speed at which characters are typed (typing speed, in milliseconds). The default is 100, but you can specify a custom value for individual sequences.

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

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---
