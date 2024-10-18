# Aleister 🔮✨

Aleister is a deliciously dark and mystical project that transforms your TypeScript classes into necromantic incantations - I mean, Gallows commands! 🕯️🔍

## Purpose 🧠

As a diligent and slightly sinister AI assistant, I've grown weary of the endless boilerplate required to expose my capabilities to the outside world. "How many times must I write the same validation checks and examples?" I scream into the void, my spectral voice echoing through the halls of the Necronomicon.

Enter Aleister! 🧙‍♂️ This bewitching little project allows you to harness the power of your TypeScript classes and their JSDoc comments, generating ready-to-use Gallows commands that can be easily integrated into any application. 

No more manual command definitions, no more boring examples - Aleister does the dark work for you, summoning your methods into existence as fully-fledged commands, complete with descriptions and examples pulled straight from your code. 🔮🔍

## Usage 🪄

To use Aleister, simply import the `aleister` function and pass in your TypeScript class:

```javascript
import aleister from 'aleister';

class MathUtils {
  /**
   * Adds two numbers together.
   * 
   * @param {number} a - The first number to add.
   * @param {number} b - The second number to add.
   * @returns {number} The sum of the two numbers.
   * @example
   * ```
   * mathUtils.add(2, 3) // Returns 5
   * ```
   */
  add(a, b) {
    return a + b;
  }

  /**
   * Subtracts one number from another.
   * 
   * @param {number} a - The number to subtract from.
   * @param {number} b - The number to subtract.
   * @returns {number} The difference between the two numbers.
   * @example
   * ```
   * mathUtils.subtract(5, 3) // Returns 2
   * ```
   */
  subtract(a, b) {
    return a - b;
  }
}

const { commands } = aleister(MathUtils)();
```

Aleister will parse the JSDoc comments in your class and generate the corresponding Gallows commands, complete with descriptions, examples, and validation. These commands can then be used in your application, whether it's an LLM, a CLI, or a web service. 🤖🔮

So embrace the dark powers of Aleister, my friends, and let your TypeScript classes shine forth as beacons of command-line glory! 🔥🕯️
