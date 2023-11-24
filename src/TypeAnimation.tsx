import React, { useEffect, useMemo, useRef, useState } from 'react';
import type { TextStyle } from 'react-native';
import { Animated, Text } from 'react-native';
import {
  countMatchingCharacters,
  delay,
  repeatFunctionNTimes,
} from './utilis/helper_functions';

/**
 * Props for the blinking cursor component.
 */
type CursorProps = {
  blinkSpeed: number | undefined;
  cursorStyle: TextStyle | undefined;
  style: TextStyle | undefined;
};

/**
 * A blinking cursor component that animates its opacity.
 */
const Cursor: React.FC<CursorProps> = ({
  blinkSpeed = 500,
  cursorStyle,
  style,
}) => {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 0,
          useNativeDriver: false,
          isInteraction: false,
        }),
        Animated.delay(blinkSpeed),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 0,
          useNativeDriver: false,
          isInteraction: false,
        }),
        Animated.delay(blinkSpeed),
      ])
    ).start();
  }, []);

  return (
    <Animated.Text style={{ opacity, ...style, ...cursorStyle }}>
      |
    </Animated.Text>
  );
};

/**
 * Props for the typewriter animation component.
 */
type TypeAnimationProps = {
  /**
   * An array of objects defining the text to be typed and animation options.
   */
  sequence: Array<
    {
      /**
       * A function to execute as part of the sequence. Can be used as a callback to perform actions.
       */
      action?: () => void;
      /**
       * The text to display or type in the sequence.
       */
      text?: string;
      /**
       * The delay between the current sequence (in milliseconds) and the next. Default: 100
       */
      delayBetweenSequence?: number;
      /**
       * The number of characters to delete before typing (backspacing).
       */
      deleteCount?: number;
      /**
       * The speed at which characters are deleted (backspace speed, in milliseconds). Default: 100
       */
      deletionSpeed?: number;

      /**
       * The speed at which characters are typed (typing speed, in milliseconds). Default: 100
       */
      typeSpeed?: number;
    } & (
      | {
          text: string; // Ensure 'text' is required
          action?: never; // 'action' cannot be provided
        }
      | {
          action: () => void; // Ensure 'action' is required
          text?: never; // 'text' cannot be provided
        }
      | {
          text: string; // Both can be provided
          action: () => void; // Both can be provided
        }
    )
  >;
  /**
   * The delay between sequences (in milliseconds) when not specified in the sequence. Default: 100
   */
  delayBetweenSequence?: number;
  /**
   * A function to split text into individual characters or chunks for typing.
   */
  splitter?: (str: string) => string[];
  /**
   * The number of times to repeat the sequence. Default: 1
   */
  repeat?: number;
  /**
   * Whether to loop the typing animation indefinitely. Default: false
   */
  loop?: boolean;
  /**
   * The speed at which the cursor blinks (in milliseconds). Default: 500
   */
  blinkSpeed?: number;
  /**
   * Additional styles for the typewriter animation container.
   */
  style?: TextStyle;
  /**
   * Additional styles for the cursor.
   */
  cursorStyle?: TextStyle;
  /**
   * Whether to display the cursor. Default: true
   */
  cursor?: boolean;
  /**
   * Specifies the direction in which to perform the typing/deleting animation. It accepts two possible values: 'front' and 'back'. Default: front
   */
  direction?: 'front' | 'back';
  /**
   * Specifies the initial text to display.
   */
  preRender?: string;
  /**
   * The delay before the animation begin (in milliseconds). Default: 0
   */
  initialDelay?: number;
};

/**
 * Typewriter animation component that displays text with typing animations.
 */
const TypeAnimation: React.FC<TypeAnimationProps> = ({
  sequence,
  delayBetweenSequence = 100,
  splitter = (str) => str.split(/(?=\S)/),
  repeat = 1,
  loop,
  blinkSpeed,
  style,
  cursorStyle,
  cursor = true,
  direction = 'front',
  preRender = '',
  initialDelay = 0,
}) => {
  const [text, setText] = useState<string>(preRender);
  let currentText = preRender;

  /**
   * Type a sequence of letters with a specified speed.
   * @param textToType - The text to type.
   * @param speed - The typing speed.
   */
  const typeLetters = (textToType: string, speed = 100) => {
    return new Promise<void>((resolve) => {
      let i = 0;
      const textArray = splitter(textToType);
      const interval = setInterval(() => {
        if (i >= textArray.length) {
          clearInterval(interval);
          resolve();
        } else {
          if (direction === 'front') {
            setText((currText) => `${currText}${textArray[i]}`);
          } else {
            setText(
              (currText) => `${textArray[textArray.length - i - 1]}${currText}`
            );
          }
        }
        i++;
      }, speed);
    });
  };

  /**
   * Delete a specified number of letters with a specified speed.
   * @param count - The number of letters to delete.
   * @param speed - The deletion speed.
   */
  const deleteLetters = (count: number, speed = 100) => {
    return new Promise<void>((resolve) => {
      let i = 0;
      const interval = setInterval(() => {
        if (i >= count) {
          clearInterval(interval);
          resolve();
        } else {
          if (direction === 'front') {
            setText(
              (currtext) => `${currtext.substring(0, currtext.length - 1)}`
            );
          } else {
            setText((currtext) => `${currtext.substring(1, currtext.length)}`);
          }
        }
        i++;
      }, speed);
    });
  };

  /**
   * Run the typing and deletion sequence based on the provided data.
   */
  const runSequence = async () => {
    for (const data of sequence) {
      if (data?.action) {
        data.action();
        if (data?.delayBetweenSequence) {
          await delay(data?.delayBetweenSequence ?? delayBetweenSequence);
        }
      } else if (currentText) {
        const count = countMatchingCharacters(
          currentText,
          data?.text ?? '',
          direction
        );

        const del = data?.deleteCount ?? currentText.length - count;

        await deleteLetters(del, data?.deletionSpeed);
        if (direction === 'front') {
          currentText =
            currentText.substring(0, currentText.length - del) +
            data?.text?.substring(count, data?.text?.length);
        } else {
          currentText =
            data?.text?.substring(0, data?.text?.length - count) +
            currentText.substring(del, currentText.length);
        }

        await typeLetters(
          direction === 'front'
            ? data?.text?.substring(count, data?.text?.length)
            : data?.text?.substring(0, data?.text?.length - count),
          data?.typeSpeed
        );
        await delay(data?.delayBetweenSequence ?? delayBetweenSequence);
      } else {
        currentText = data?.text;
        await typeLetters(data?.text, data?.typeSpeed);
        await delay(data?.delayBetweenSequence ?? delayBetweenSequence);
      }
    }
  };

  const firstFunction = () => {
    if (loop) {
      const run = async () => {
        await runSequence();
        run();
      };
      run();
    } else {
      repeatFunctionNTimes(runSequence, repeat);
    }
  };
  useEffect(() => {
    if (initialDelay) {
      setTimeout(() => {
        firstFunction();
      }, initialDelay);
    } else {
      firstFunction();
    }
  }, []);

  const cursorComponent = useMemo(() => {
    return cursor ? (
      <Cursor blinkSpeed={blinkSpeed} style={style} cursorStyle={cursorStyle} />
    ) : null;
  }, [cursor, blinkSpeed, style, cursorStyle]);

  return (
    <Text style={{ ...style }}>
      {direction === 'back' && cursorComponent}
      {text}
      {direction === 'front' && cursorComponent}
    </Text>
  );
};

export default TypeAnimation;
