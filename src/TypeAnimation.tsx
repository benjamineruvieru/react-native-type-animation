import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import type { TextStyle } from 'react-native';
import { Animated, InteractionManager, Text } from 'react-native';
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
  }, [blinkSpeed, opacity]);

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
       * The speed at which characters are deleted from this sequence (backspace speed, in milliseconds). Default: 100
       */
      deletionSpeed?: number;

      /**
       * The speed at which characters are typed in this sequence (typing speed, in milliseconds). Default: 100
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
  preRenderText?: string;
  /**
   * The delay before the animation begins (in milliseconds). Default: 0
   */
  initialDelay?: number;
  /**
   * Callback function triggered when a character is typed.
   */
  onCharTyped?: (data: { character: string; currentText: string }) => void;
  /**
   * Callback function triggered when a character is deleted.
   */
  onCharDeleted?: (data: { character: string; currentText: string }) => void;
  /**
   * The speed at which characters are deleted (backspace speed, in milliseconds). Default: 100
   */
  deletionSpeed?: number;

  /**
   * The speed at which characters are typed (typing speed, in milliseconds). Default: 100
   */
  typeSpeed?: number;
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
  preRenderText = '',
  initialDelay = 0,
  onCharTyped,
  onCharDeleted,
  typeSpeed = 100,
  deletionSpeed = 100,
}) => {
  const [text, setText] = useState<string>(preRenderText);
  let currentText = preRenderText;

  /**
   * Type a sequence of letters with a specified speed.
   * @param textToType - The text to type.
   * @param speed - The typing speed.
   */
  const typeLetters = (textToType: string, speed = typeSpeed) => {
    const isFront = direction === 'front';
    const textArray = splitter(textToType);
    if (!isFront) {
      textArray.reverse();
    }
    return new Promise<void>(async (resolve) => {
      for (const character of textArray) {
        if (isFront) {
          setText((currText) => {
            const word = `${currText}${character??''}`;
            if (character) {
              const data = {
                character,
                currentText: word,
              };
              if (onCharTyped) {
                onCharTyped(data);
              }
            }
            return word;
          });
        } else {
          setText((currText) => {
            const word = `${character??""}${currText}`;
            if (character) {
              const data = {
                character,
                currentText: word,
              };
              if (onCharTyped) {
                onCharTyped(data);
              }
            }
            return word;
          });
        }
        await delay(speed);
      }
      resolve();
    });
  };

  /**
   * Delete a specified number of letters with a specified speed.
   * @param count - The number of letters to delete.
   * @param speed - The deletion speed.
   */
  const deleteLetters = (count: number, speed = deletionSpeed) => {
    return new Promise<void>((resolve) => {
      let i = 0;
      const interval = setInterval(() => {
        if (i >= count) {
          clearInterval(interval);
          resolve();
        } else {
          if (direction === 'front') {
            setText((currtext) => {
              const word = `${currtext.substring(0, currtext.length - 1)}`;
              const character = currtext[currtext.length - 1];
              if (character) {
                const data = {
                  character,
                  currentText: word,
                };
                if (onCharDeleted) {
                  onCharDeleted(data);
                }
              }
              return word;
            });
          } else {
            setText((currtext) => {
              const word = `${currtext.substring(1, currtext.length)}`;
              const character = currtext[0];
              if (character) {
                const data = {
                  character,
                  currentText: word,
                };
                if (onCharDeleted) {
                  onCharDeleted(data);
                }
              }
              return word;
            });
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
        // console.log('count', count, currentText);
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

  const firstFunction = useCallback(() => {
    if (loop) {
      const run = async () => {
        await runSequence();
        run();
      };
      run();
    } else {
      repeatFunctionNTimes(runSequence, repeat);
    }
    /* eslint-disable react-hooks/exhaustive-deps */
  }, []);

  useEffect(() => {
    const handle = InteractionManager.createInteractionHandle();
    if (initialDelay) {
      setTimeout(() => {
        firstFunction();
      }, initialDelay);
    } else {
      firstFunction();
    }

    return () => InteractionManager.clearInteractionHandle(handle);
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
