/**
 * Delay function to pause execution for a specified time.
 * @param ms - The delay duration in milliseconds.
 */
export const delay = (ms: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

/**
 * Repeat a function a specified number of times.
 * @param func - The function to repeat.
 * @param times - The number of times to repeat the function.
 */
export const repeatFunctionNTimes = (func: () => void, times: number) => {
  for (let i = 0; i < times; i++) {
    func();
  }
};

/**
 * Count the matching characters between two strings.
 * @param text1 - The first string.
 * @param text2 - The second string.
 * @returns The count of matching characters.
 */
export const countMatchingCharacters = (text1: string, text2: string) => {
  let count = 0;
  const minLength = Math.min(text1.length, text2.length);
  for (let i = 0; i < minLength; i++) {
    if (text1[i] === text2[i]) {
      count++;
    } else {
      break;
    }
  }

  return count;
};
