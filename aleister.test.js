import { expect } from 'lovecraft';

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
   * @example mathematics.add(2, 3) // 5
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
   * @example mathematics.subtract(5, 3) // 2
   */
  subtract(a, b) {
    return a - b;
  }
}

/**
 * Logger interface.
 */
class Logger {
  /**
   * Logs warnings.
   * 
   * @param {string} message - The message to log.
   * @body message
   * @example logger.warn("Malformed something-something.")
   */
  warn(message) {
    return `WARNED: ${message}`;
  }
}


describe('aleister', () => {
  it('should generate Gallows commands from JSDoc', () => {
    const {commands} = aleister(Mathematics)();

    expect(commands.length).to.equal(2);

    expect(commands[0].name).to.equal('add');
    expect(commands[0].description).to.equal('Adds two numbers together.');
    expect(commands[0].example).to.deep.equal({ attributes: { a: 2, b: 3 } });
    expect(commands[0].validate({ a: 648, b: 322 })).to.equal(true);
    expect(commands[0].validate({ b: 322 })).to.equal(false);
    expect(commands[0].execute({ a: 648, b: 322 })).to.equal(970);

    expect(commands[1].name).to.equal('subtract');
    expect(commands[1].description).to.equal('Subtracts one number from another.');
    expect(commands[1].example).to.deep.equal({ attributes: { a: 5, b: 3 } });
    expect(commands[1].validate({ a: 648, b: 322 })).to.equal(true);
    expect(commands[1].validate({ b: 322 })).to.equal(false);
    expect(commands[1].execute({ a: 648, b: 322 })).to.equal(326);
  });

  it('should handle bodies when present', () => {
    const {commands} = aleister(Logger)();

    expect(commands.length).to.equal(1);

    expect(commands[0].name).to.equal('warn');
    expect(commands[0].description).to.equal('Logs warnings.');
    expect(commands[0].example).to.deep.equal(
      { attributes: {}, body: 'Malformed something-something.' }
    );
    expect(commands[0].validate({ a: 648, b: 322 })).to.equal(false);
    expect(commands[0].validate({}, 'foo')).to.equal(true);
    expect(commands[0].execute({}, 'test')).to.equal('WARNED: test');
  });

  it('exposes underlying instances', () => {
    const {instance} = aleister(Mathematics)();

    expect(instance.add(1, 2)).to.equal(3);
    expect(instance.subtract(5, 3)).to.equal(2);
  });
});