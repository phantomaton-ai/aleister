import * as acorn from 'acorn';
import * as doctrine from 'doctrine';

function first(array, fn) {
  for (const element of array) {
    const value = fn(element);
    if (value) return value;
  }
}

function find(type, tree) {
  if (Array.isArray(tree)) return first(tree, subtree => find(type, subtree));
  if (tree.type === type) return tree;
  if (tree.body) return find(type, tree.body);
}

export default function aleister(Class) {
  const comments = [];
  const options = {ecmaVersion: 2022, sourceType: 'module', onComment: comments};
  const parsed = acorn.parse(Class.toString(), options);
  const root = find('ClassBody', parsed);
  const methods = root.body.filter(({ type }) => type === 'MethodDefinition');
  const commands = comments.filter(
    ({ type }) => type === 'Block'
  ).map(({ value, start, end }) => {
    const method = methods.find(m => m.start > end);
    return { method, value };
  }).filter(({ method }) => method).map(({ method, value }) => {
    const name = method.key.name;
    const { tags, description } = doctrine.parse(value, { unwrap: true });

    const parameters = tags
      .filter(({ title }) => title === 'param')
      .map(({ name }) => name);
    const bodex = parameters.findIndex(({ name }) => name === 'body');
    const code = tags.find(({ title }) => title === 'example').description;
    const call = find('ExpressionStatement', acorn.parse(code)).expression;
    const example = { attributes: {} };
    
    call.arguments.forEach(({ value }, index) => {
      if (index === bodex) example.body = value;
      else example.attributes[parameters[index]] = value;
    });
    const command = { name, description, example };
    if (bodex >= 0) command.body = true;
    return command;
  });
  return options => {
    const instance = new Class(options);
    return {
      commands: commands.map(command => ({
        ...command,
        execute: (attributes, body) => instance[command.name](
          ...parameters.map((parameter, index) => 
            index === bodex ? body : attributes[parameter]
          )
        ),
        validate: (attributes, body) => parameters.every(
          (parameter, index) =>
            index === body ? body : Object.hasOwn(attributes, parameter)
        )
      }))
    };
  };
}
