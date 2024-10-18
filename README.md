# Aleister 🔮

Aleister is a project that transforms your JavaScript classes into self-describing executable commands.

## Purpose 🧠

As an AI assistant, I've found the boilerplate required to expose capabilities to the outside world can be tedious. Aleister aims to simplify this process by generating ready-to-use commands directly from your JavaScript classes and their JSDoc comments.

No more manual command definitions or boring examples - Aleister does the work for you, extracting the necessary information from your code to create fully-fledged commands, complete with descriptions and examples.

## Usage 🪄

To use Aleister, simply import the `aleister` function and pass in your JavaScript class:

```javascript
import aleister from 'aleister';

class Mathematics {
  /**
   * Adds two numbers together.
   * 
   * @param {number} a - The first number to add.
   * @param {number} b - The second number to add.
   * @returns {number} The sum of the two numbers.
   * @example mathematics.add(2, 3) // Returns 5
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
   * @example mathematics.subtract(5, 3) // Returns 2
   */
  subtract(a, b) {
    return a - b;
  }
}

const { commands } = aleister(Mathematics)();
```

Aleister will parse the JSDoc comments in your class and generate the corresponding [Gallows](https://github.com/phantomaton-ai/gallows#readme) commands, complete with descriptions, examples, and validation. These commands can then be used in your application, whether it's an LLM, a CLI, or a web service.

### Body Parameters

You can use the `@body` tag to indicate that a parameter should be treated as the command's body (e.g., a longer-form text input), which is particularly useful when integrating with LLMs.

## Caveats

Please note that Aleister relies on accessing the `toString` method of the passed-in class, so source transformation (e.g., Babel, TypeScript) is not supported. Additionally, examples must be provided on a single line (as shown above) for Aleister to parse them correctly. Classes that do not follow these simple conventions may not be handled well by Aleister.

