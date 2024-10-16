import { expect } from 'chai';

import aleister from './aleister.js';

/**
 * A simple math utility class.
 */
class Mathematics {
  /**
   * Adds two numbers together.
   * 
   * @param {number} a - The first number to add.
   * @param {number} b - The second number to add.
   * @returns {number} The sum of the two numbers.
   * @example
   * ```
   * mathematics.add(2, 3) // Returns 5
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
   * mathematics.subtract(5, 3) // Returns 2
   * ```
   */
  subtract(a, b) {
    return a - b;
  }
}

describe('aleister', () => {
  it('should generate Gallows commands from JSDoc', () => {
    const {commands} = aleister(Mathematics);

    expect(commands[0].name).to.equal('add');
    expect(commands[0].description).to.equal('Adds two numbers together.');
    expect(commands[0].example).to.deep.equal({ attributes: { a: 2, b: 3 }, body: '' });

    expect(commands[1].name).to.equal('subtract');
    expect(commands[1].description).to.equal('Subtracts one number from another.');
    expect(commands[1].example).to.deep.equal({ attributes: { a: 5, b: 3 }, body: '' });
  });
});