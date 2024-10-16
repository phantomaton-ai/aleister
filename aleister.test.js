import { gallows } from 'gallows';
import { expect } from 'chai';

/**
 * A simple math utility class.
 */
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

describe('Aleister', () => {
  it('should generate Gallows commands from JSDoc', () => {
    const mathUtils = new MathUtils();

    const commands = gallows([
      {
        name: 'add',
        validate: (attributes) => typeof attributes.a === 'number' && typeof attributes.b === 'number',
        execute: (attributes) => mathUtils.add(attributes.a, attributes.b),
        example: {
          attributes: { a: 2, b: 3 },
          body: ''
        },
        description: 'Adds two numbers together.'
      },
      {
        name: 'subtract',
        validate: (attributes) => typeof attributes.a === 'number' && typeof attributes.b === 'number',
        execute: (attributes) => mathUtils.subtract(attributes.a, attributes.b),
        example: {
          attributes: { a: 5, b: 3 },
          body: ''
        },
        description: 'Subtracts one number from another.'
      }
    ]);

    expect(commands).to.have.length(2);

    expect(commands[0].name).to.equal('add');
    expect(commands[0].description).to.equal('Adds two numbers together.');
    expect(commands[0].example).to.deep.equal({ attributes: { a: 2, b: 3 }, body: '' });

    expect(commands[1].name).to.equal('subtract');
    expect(commands[1].description).to.equal('Subtracts one number from another.');
    expect(commands[1].example).to.deep.equal({ attributes: { a: 5, b: 3 }, body: '' });
  });
});